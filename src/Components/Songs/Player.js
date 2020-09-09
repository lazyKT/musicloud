import React, { useEffect, useState, useReducer, useRef } from 'react';
import { firstSongURL } from './Utilities';

/* Icons From Material UI */
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import PauseCircleFilledOutlinedIcon from '@material-ui/icons/PauseCircleFilledOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';

/* -- Styling for Player */
const styles = {
    contianer: {
        width: "60%",
        margin: "auto",
        padding: "10px"
    },
    bDiv: {
        width: "fit-content",
        margin: "auto"
    },
    play: {
        fontSize: "60px",
        margin: "0px 30px"
    },
    skip: {
        fontSize: "23px",
        padding: "7px",
        display: "inline-block",
        marginBottom: "10px",
        borderRadius: "50%",
        background: "black",
        color: "white"
    },
    previous: {
        fontSize: "23px",
        padding: "7px",
        display: "inline-block",
        marginBottom: "10px",
        borderRadius: "50%",
        background: "black",
        color: "white"
    },
    shuffle: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px"
    },
    repeat: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px",
        color: 'grey'
    },
    title: {
        display: "block",
        width: "fit-content",
        margin: "auto",
    }
}

/** Initialise Reducer */
const init = {
    repeat: 0,
    shuffle: true,
    currentSong: null,
    playing: false
}

/** Reducer Function */
function reducer(state, action) {
    // destructure the state object
    const { repeat, shuffle, playing } = state;

    switch (action.type) {
        case "repeatClk":
            return { ...state, repeat: repeat + 1 };

        case "shuffleClk":
            return { ...state, shuffle: !shuffle };

        case "load_song":
            return { ...state, currentSong: action.song };

        case "play_pause":
            return { ...state, playing: !playing };   

        case "stop":
            return { ...state, playing: false };
        
        case "play_song":
            return { ...state, playing: true };
             
        default:
            throw new Error();
    }
  }


export function Player(props) {

    const { pSong, allSong, next_song, prev_song, shuffle_all, repeat_one } = props;

    let song = document.getElementById("song");
    let prog = document.getElementById("progress-bar");

    const dev_url = "http://127.0.0.1:8000/listen/";

    // define useReducer
    const [ state, dispatch ] = useReducer(reducer, init);
    const { repeat, shuffle, currentSong, playing } = state;

    /**
     * 0 = no repeat
     * 1 = repeat all
     * 2 = repeat single
     */
    const repeatRef = useRef(0);
    const shuffleRef = useRef(null);
    const skipRef = useRef(null);
    const prevRef = useRef(null);
    const progRef = useRef(null);

    const [ hover, setHover ] = useState(false);


    /* -- play/pause song */
    function play_or_pause(event) {
        event.preventDefault();
        // if playing, pause the song. if not playing, play the song
        dispatch({ type: "play_pause" });
    }


    /** set hover effects */
    function onHover(event) {
        setHover( !hover );
        (pSong && hover) ? event.target.style.background = "#000" 
            : event.target.style.background = "#d3d3d3";
    }

    /** -- disable/enable skip/rev buttons -- */
    function toggleSkipRev_Btn(enable = false) {
        if (enable) {
            skipRef.current.style.background = "#000";
            prevRef.current.style.background = "#000";
        } else {
            skipRef.current.style.background = "#d3d3d3";
            prevRef.current.style.background = "#d3d3d3";
        }
    }

    // /** -- onChange Progress bar -- */
    // function onChangeProgress() {
    //     //console.log(song.currentTime,"/",song.duration);
    //     song.currentTime = prog.value;
    // }


    // /** -- change progress bar on playing -- */
    // function changeProgOnPlay() {
    //     prog.max = song.duration;
    //     prog.value = song.currentTime;
    // }

    /** -- load progress bar on play -- */
    function loadProgBar() {
        prog.max = song.duration;
        prog.value = song.currentTime;
    }


    /** -- clean up useEffect of play/pause -- */
    function clean_up_lastSong() {
        console.log("clean up", song);
        if (currentSong && allSong.indexOf(currentSong) === (allSong.length - 1)
            && repeat%3 !== 1) {
            // console.log("last song");
            // stop the song
            song.pause();
            song.currentTime = 0;
            dispatch({ type: "load_song", song: null });
        }
    }


    /** -- side effects on Song Card Click or Shuffle All --  */
    useEffect(() => {

        console.log("playing", pSong);

        // if shuffle_all was on
        if (shuffle_all)
            dispatch({ type: "shuffleClk" });
        else 
            dispatch({ type: "shuffleClk" });

        if (pSong) {
        
            dispatch({ type: "load_song", song: pSong });
            dispatch({ type: "play_song" });

            toggleSkipRev_Btn(true);
        }        
        if (!pSong)
        {
            toggleSkipRev_Btn(false);
            dispatch({ type: "stop" });
        }

        /** -- clean up -- */
        return (clean_up_lastSong());

    }, [pSong, shuffle_all])


    /** Side Effects on Repeat, Shuffle and Play Btn Click */
    useEffect(() => {

        console.log("playing", playing);
        console.log("song", song);

        /** play btn operation */
        if (playing) {

            if (!currentSong)
                dispatch({ type: "load_song", song: allSong[0] });

            toggleSkipRev_Btn(true);
            // play the first song on play btn click
            song.play();
        } else {
            // pause the song
            currentSong && song.pause();
            
        }
                   
        /** toggle shuffle  */
        shuffle ? ( shuffleRef.current.style.color = "blue" ) 
            : ( shuffleRef.current.style.color = "grey" );

        /** repeat operation  */
        repeat%3 === 0 && ( repeatRef.current.style.color = "grey" );
        repeat%3 > 0 && ( repeatRef.current.style.color = "black" );
        
        /** -- clean up useEffect -- */
        
        
    }, [playing, repeat, shuffle]);


    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>
            <div style={styles.bDiv}>
                <ShuffleIcon style={styles.shuffle} ref={ shuffleRef } onClick={() => dispatch({ type: "shuffleClk" }) }/>
                <SkipPreviousIcon style={styles.previous} ref={prevRef}
                    onClick={(event) => prev_song(event, allSong.indexOf(currentSong) - 1, state)}
                    onMouseOver={onHover} onMouseLeave={onHover} />

                {/* Pause or Play */}
                {
                    playing 
                    ? <PauseCircleFilledOutlinedIcon style={styles.play} onClick={play_or_pause}
                        />
                    : <PlayCircleFilledOutlinedIcon style={styles.play} onClick={play_or_pause}/>
                }

                <SkipNextIcon style={styles.skip} ref={skipRef} disabled={true}
                    onClick={(event) => next_song(event, allSong.indexOf(currentSong) + 1, state)} 
                    />

                {/* repeat btn state */}
                {
                    (repeat%3) === 2 
                    ? <RepeatOneIcon ref={repeatRef} style={styles.repeat} onClick={() => dispatch({ type: "repeatClk" })}/>
                    : <RepeatIcon ref={repeatRef} style={styles.repeat} onClick={() => dispatch({ type: "repeatClk" })}/>
                }
            </div>

            {/* audio tag */}
            <audio id="song" 
             src={currentSong ? `${dev_url}${currentSong.id}` 
                : firstSongURL(allSong, dev_url)} 
             onEnded={ (event) => 
               repeat%3 === 2 ? repeat_one(currentSong) 
               : next_song(event, allSong.indexOf(currentSong) + 1, state) }/>
            
            {/* audio progress bar */}
            {/* <input id="progress-bar" type="range" min="0" max="" 
              value="" onChange={onChangeProgress}/>
            <div id="current"></div>
            <div id="duration"></div> */}
            
            {/* song name */}
            <p style={styles.title}>{currentSong ? currentSong.title : "---"}</p>
        </div>
    )
}