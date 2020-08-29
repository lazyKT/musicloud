import React, { useState, useEffect, useReducer } from 'react';
import { AddSong } from './Songs/AddSong'
import { useCookies } from './Hooks/useCookies';
import { fetchMySongsReq } from './UsersReqs/SongRequests';
import { SongCard } from './Songs/SongCard';
import { Player } from './Songs/Player';

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
    player: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        padding: "10px",
        boxShadow: "5px 0px 15px 5px gainsboro"
    },
    addBtnDiv: {
        width: "50%",
        margin: "10px auto"
    },
    addBtn: {
        width: "100px",
        marginLeft: "80%",
        display: "block",
        padding: "5px",
        background: "coral",
        border: "solid coral 0.2px",
        borderRadius: "10px",
        color: "white"
    }
}

/* -- Initial Values for useReducer -- */
const init = {
    songs: [],
    empty: true,
    pointed: null   // Clicked Song :: Individual
}


/* -- Reducer Function for useReducer Hook -- */
function reducer(state, action) {

    switch(action.type) {
        case 'getSongs':
            return {...state, songs: action.songs, empty: false};
        case 'pointed':
            return {...state, pointed: action.song};
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

    /* -- Fetch User's Songs */
    async function fetchMySongs(cookies) {
        const { access_token } = cookies;
        const resp = await fetchMySongsReq(access_token);
        const { data } = resp;
        
        console.log(data.status);

        if (data.status === 200)
            dispatch({type: 'getSongs', songs: data.msg});
    }

    // Toggle the "Add Song Form"
    function toggleAddForm() {
        console.log("Adding")
        setAdding(!adding);
    }

    /* -- Hover the text button -- */
    function onHoverText(event) {
        setHover(!hover);
        hover ? (event.target.style.textDecoration = 'none') :
            (event.target.style.textDecoration = 'underline');
    }

    /** -- Hover effect on add button -- */
    function onHoverBtn(event) {
        setHover(!hover);
        hover ? (event.target.style.background = "coral")
            : (event.target.style.background = "chocolate");
    }


    /* -- OnClick Song Cards */
    function onClickCards(event, key) {
        event.preventDefault();
        console.log("click on", key);
        dispatch({type: "pointed", song: state.songs[key-1]});
    }


    /* -- Side Effects -- */
    useEffect(()=> {
        console.log(cookies);
        if (cookies && login) {
            fetchMySongs(cookies);
        }
    },[cookies]);


    /* -- Renders -- */
    return(
        <div className="">
            <h3 style={styles.heading}>My Songs</h3>

            {/* display add song button above song cards */}
            {( !state.empty ) &&
            (
                <div style={styles.addBtnDiv}>
                    <button style={styles.addBtn} onClick={toggleAddForm}
                        onMouseOver={onHoverBtn} onMouseLeave={onHoverBtn}>
                        Add Song
                    </button>
                </div>
            )}

            {/* If user has no songs, show default empty message */}
            { state.empty ? (
                <div style={styles.div}>
                    <pre style={styles.pre}>It's empty here. </pre>
                    <p onClick={toggleAddForm} style={styles.p}
                    onMouseOver={onHoverText} onMouseLeave={onHoverText}>
                        Try to add something to listen.
                    </p>
                </div>
            )
            : (
                state.songs.map(song => <SongCard 
                    title={song.title} key={song.id} id={song.id}
                    user={song.posted_by} click={onClickCards}/>)
            )}

            {/* Music Player */}
            <div style={styles.player}>
                <Player pSong={state.pointed} allSong={state.songs}/>
            </div>

            {/* Add Song Option */}
            {
                adding ?
                (<AddSong addDiv={styles.addDiv} toggle={toggleAddForm}/>)
                : ""
            }
        </div>
    );
}
