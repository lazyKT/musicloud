import React, { useState, useEffect, useReducer } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AddSong } from './Songs/AddSong'
import { useCookies } from './Hooks/useCookies';
import { fetchMySongsReq, getSong } from './UsersReqs/SongRequests';
import { SongCard } from './Songs/SongCard';
import { Player } from './Songs/Player';
import { shuffleSongs } from './Songs/Utilities';

import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import Button from '@material-ui/core/Button';
import RequestLoader from './Songs/RequestLoader';

// Styling for the DOM elements
const styles = {
    div: {
        width: "fit-content",
        height: "200%",
        padding: "20px",
        margin: "auto"
    },
    pre: {
        width: "fit-content",
        margin: "10px auto"
    },
    p: {
        width: "fit-content",
        margin: "10px auto",
        fontStyle: "italic",
        cursor: "pointer"
    },
    addDiv: {
        zIndex: "1",
        position: "absolute",
        top: "0",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(0,0,0,0.5)", // Opacity 0.5
    },
    heading: {
        width: "fit-content",
        margin: "20px auto",
        fontFamily: "fantasy"
    },
    headers: {
        height: "100px"
    },
    player: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        padding: "10px",
        boxShadow: "5px 0px 15px 5px gainsboro",
        height: "15%"
    },
    topASDiv: {
        width: "fit-content",
        margin: "10px auto",
    },
    addBtn: {
        // width: "100px",
        // marginLeft: "80%",
        // display: "block",
        // padding: "5px",
        // background: "coral",
        // border: "solid coral 0.2px",
        // borderRadius: "10px",
        // color: "white"
    },
    shuffleBtn: {
        margin: "0px 10px",
    }
}

/* -- Initial Values for useReducer -- */
const init = {
    songs: [],  // this is the original songs fetched from server
    playlist: [],  // this is the play list the users gonna play, with/without shuffle
    empty: true,
    pointed: null,
    playing: null,  // Clicked Song :: Individual
    shuffle_all : false
}


/* -- Reducer Function for useReducer Hook -- */
function reducer(state, action) {

    const { shuffle_all } = state;

    switch(action.type) {
        case 'getSongs':
            return { ...state, songs: action.songs, empty: false };
        case 'assignPL': // PL stands for PlayList
            return { ...state, playlist: action._playlist };
        case 'pointed':
            return { ...state, pointed: action.song };
        case 'currentPlaying':
            return { ...state, playing: action.id };
        case 'shuffle_all_clk':
            return { ...state, shuffle_all: !shuffle_all };
        default:
            throw new Error('reducer error!');
    }
}


/* -- User DashBoard After Login -- */
export function UserDashboard() {

    // Get Cookies
    const { login, cookies } = useCookies();

    const [ adding, setAdding ] = useState(false);
    const [ hover, setHover ] = useState(false);
    const [ state, dispatch ] = useReducer(reducer, init);
    const [ added, setAdded ] = useState(false);
    const [ request, setRequest ] = useState(null);

    const { playing, pointed, empty, songs, shuffle_all, playlist } = state;

    /* -- Fetch User's Songs */
    async function fetchMySongs(cookies) {
        console.log("Fetching Songs");
        const { access_token } = cookies;
        const resp = await fetchMySongsReq(access_token);
        const { data } = resp;

        if (data.status === 200) {
            dispatch({ type: 'getSongs', songs: (data.msg).reverse() });
            
            // array.prototype.concat prevent mutation on original objects
            dispatch({ type: 'assignPL', _playlist: playlist.concat((data.msg).reverse()) });
        }
    }

    function requestAdded(request) {
        setAdded(true);
        setRequest(request);
        setAdding(false);
        toast.success('A new song request has been sent to server!');
    }

    // add song upon request finished
    function addSongOnReq(success) {
        if (success) {
            const newList = [ request, ...songs ];
            dispatch({ type: "getSongs", songs: newList });
            toast.success(`Hoo Yay! New Song added to the library.`);
        } else {
            toast.error(`New Song Request Failed. :(`);
        }
        setAdded(false);
    }

    // Toggle the "Add Song Form"
    function toggleAddForm() {

        setAdding(!adding);
    }

    /* -- Hover the text button -- */
    function onHoverText(event) {
        setHover(!hover);
        hover ? (event.target.style.textDecoration = 'none') :
            (event.target.style.textDecoration = 'underline');
    }

    
    /** -- on Shuffle All click -- */
    function shuffleAllClk(event) {

        event.preventDefault();
        dispatch({ type: "shuffle_all_clk" });

        // if user click shuffle all
        if (!shuffle_all) {
            shuffleSongs(playlist);
            dispatch({ type: "assignPL", _playlist: playlist });

            // auto play shuffled songs
            
            dispatch({ type: "pointed", song: playlist[0] });
            dispatch({ type: "currentPlaying", id: songs.indexOf(playlist[0]) });
        } else {
            // spread operator ... also prevents the mutation on original state
            dispatch({ type: "assignPL", _playlist: [...songs] })
        }
    }


    /* -- OnClick Song Cards */
    function onClickCards(event, key) {
        event.preventDefault();
        getSong(songs[key].id);
        console.log("click on", key);
        dispatch({ type: "pointed", song: songs[key]});
        dispatch({ type: "currentPlaying", id: key });
    }

    /** -- next song -- */
    function next_song(event, id, options) {

        console.log("skip");

        const { shuffle, repeat } = options;
        //console.log("repeat", repeat%3);
        
        event.preventDefault();

        // get the index of current playing song in 'songs' array
        const current_playing_id = songs.indexOf(playlist[id]);
        //console.log("current id", current_playing_id, id);

        if ( current_playing_id  >= 0 ) {
            //console.log("id", playlist[id]);
            dispatch({ type: "pointed", song: playlist[id] });

            dispatch({ type: "currentPlaying", id: current_playing_id });
        } else {
            dispatch({ type: "pointed", song: null });
            dispatch({ type: "currentPlaying", id: null });
        }

        // if repeat all option was on
        if ( repeat%3 === 1 && id === playlist.length ) {
            dispatch({ type: "pointed", song: playlist[0] });
            dispatch({ type: "currentPlaying", id: songs.indexOf(playlist[0]) });
        }   
    }

    /** -- repeat one song -- */
    function repeat_song(current_song) {
        console.log("repeat one");
        dispatch({ type: "pointed", song: current_song });
        dispatch({ type: "currentPlaying", id: songs.indexOf(current_song) });
    }

    /** -- previous song -- */
    function prev_song(event, id, options) {
        event.preventDefault();

        console.log("prev");

        const { shuffle, repeat } = options;

        const current_playing_id = songs.indexOf(playlist[id]);

        // previous button click on first song 
        // -2 indicates that no song is playing currently
        if ( id < 1 && id !== -2 ) {
            
            dispatch({ type: "pointed", song: playlist[0] });
            dispatch({ type: "currentPlaying", id: songs.indexOf(playlist[0]) });
        } else if ( current_playing_id !== -2 ) {
            
            dispatch({ type: "pointed", song: playlist[id] });
            dispatch({ type: "currentPlaying", id: current_playing_id });
        }

        // if repeat all option was on
        if ( repeat%3 === 1 && id === -1 ) {
            const last_song = playlist[playlist.length - 1];

            dispatch({ type: "pointed", song: last_song });
            dispatch({ type: "currentPlaying", id: songs.indexOf(last_song) })
        }
    }


    /* -- Side Effects -- */
    useEffect(()=> {
        if (cookies && login) {
            fetchMySongs(cookies);
        }
    },[cookies]);


    /* -- Renders -- */
    return(
        <div className="">
            
            <div style={styles.headers}>
                <h3 style={styles.heading}>My Songs</h3>
                <ToastContainer/>
                {/* display add song button above song cards */}
                {( !empty ) &&
                (
                    <div style={styles.topASDiv}>
                        <Button
                            variant="contained" color={shuffle_all ? "primary" : "default"}
                            style={styles.shuffleBtn} endIcon={<ShuffleOutlinedIcon />}
                            onClick={shuffleAllClk}>
                            Shuffle All
                        </Button>
                        <Button
                            variant="contained" color="secondary"
                            style={styles.addBtn} endIcon={<ShuffleOutlinedIcon />}
                            onClick={toggleAddForm}
                            disabled={added ? true : false}>
                            Add Song
                        </Button>
                        
                    </div>
                )}
            </div>

            <div>
                <div>
                    { (added && request) && 
                        <RequestLoader title={request.title} addSong={addSongOnReq}/>
                    }

                    {/* If user has no songs, show default empty message */}
                    { empty ? (
                        <div style={styles.div}>
                            <pre style={styles.pre}>It's empty here. </pre>
                            <p onClick={toggleAddForm} style={styles.p}
                            onMouseOver={onHoverText} onMouseLeave={onHoverText}>
                                Try to add something to listen.
                            </p>
                        </div>
                    )
                    : (
                        songs.map( ( song, idx ) => <SongCard 
                            title={song.title} key={song.id} id={idx} playing={playing}
                            user={song.posted_by} click={onClickCards}/>)
                    )}
                </div>

                {/* Music Player */}
                <div style={styles.player}>
                    <Player pSong={pointed} allSong={playlist} shuffle_all={shuffle_all}
                        next_song={next_song} prev_song={prev_song} repeat_one={repeat_song} />
                </div>
            </div>   

            {/* Add Song Option */}
            {
                adding ?
                (<AddSong addDiv={styles.addDiv} 
                    toggle={toggleAddForm} requestAdded={requestAdded} token={cookies}/>)
                : ""
            }
        </div>
    );
}
