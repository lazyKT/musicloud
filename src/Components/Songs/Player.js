import React, { useEffect, useState, useReducer, useRef } from 'react';
import { firstSongURL, formatTimeStamps } from './Utilities';
import PlayerControls from './PlayerControls';

import sample2 from "../../Samples/Sample2.mp3";

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
    },
    progress: {
        width: "300px",
        display: "block",
        margin: "auto"
    },  
    timeDiv: {
        display: "flex",
        width: "320px",
        margin: "auto"
    },
    durationDiv: {
        marginLeft: "75%",
        width: "45px"
    },
    currentDiv: {
        width: "45px"
    }
}

/** Initialise Reducer */
const init = {
    repeat: 0,
    shuffle: true,
    currentSong: null,
    playing: false,
    duration: 0,
    adjustTime : false
}

/** Reducer Function */
function reducer(state, action) {
    // destructure the state object
    const { repeat, shuffle, playing, adjustTime } = state;

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
            return { ...state, playing: false, currentSong: null };
        
        case "play_song":
            return { ...state, playing: true };

        case "adjustTime":
            return { ...state, adjustTime: !adjustTime }
             
        default:
            throw new Error();
    }
  }


export function Player(props) {

    const { pSong, allSong, next_song, prev_song, shuffle_all } = props;

    const dev_url = "http://127.0.0.1:8000/listen/";

    // define useReducer
    const [ state, dispatch ] = useReducer(reducer, init);
    const { repeat, shuffle, currentSong, playing } = state;

    /**
     * 0 = no repeat
     * 1 = repeat all
     * 2 = repeat single
     */
    const currentRef = useRef(0);
    const songRef = useRef(null);

    const [ hover, setHover ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState(0);


    /* -- play/pause song */
    function play_or_pause(event) {
        event.preventDefault();
        // if playing, pause the song. if not playing, play the song
        if (currentSong) dispatch({ type: "play_pause" });
    }


    /** set hover effects */
    function onHover(event) {
        setHover( !hover );
        (pSong && hover) ? event.target.style.background = "#000" 
            : event.target.style.background = "#d3d3d3";
    }


    // onClick event on shuffle btn
    const shuffleClk = () => currentSong && dispatch({ type: "shuffleClk" });

    // onClick event on repeat btn
    const repeatClk = () =>  currentSong && dispatch({ type: "repeatClk" });

    // onClick event on skip btn
    const skipClk = (e) => currentSong && next_song(e, allSong.indexOf(currentSong) + 1, state);

    const prevClk = (e) => currentSong && prev_song(e, allSong.indexOf(currentSong) - 1, state)


    /** -- onChange Progress bar -- 
     * Move to desired position (time) of a song using progress bar
    */
    function onChangeProgress(event) {
       let time = (event.target.value * duration) / 100;
       setCurrentTime(time);
       songRef.current.currentTime = time;
    }

     /** -- side effects on playing state */
     useEffect(() => {

        // only if there is a song to play, start the play/pause operation
        if (currentSong) {
            if (playing) {
                songRef.current.play();
            } else {
                songRef.current.pause();
            }
        }

        if (repeat % 3 === 2 && currentSong) songRef.current.loop = true;


    }, [playing, currentSong, repeat]);


    /** -- side effects on Song Card Click or Shuffle All --  */
    useEffect(() => {

        console.log("pSong");

        if (pSong) {
            dispatch({ type: "load_song", song: pSong }); // set currentSong
            dispatch({ type: "play_song"});
        } else {
            dispatch({ type: "stop" });
            songRef.current.pause();
        }

        return () => { if(pSong) {
            songRef.current.pause();
            songRef.current.currentTime = 0;
        }}

    }, [pSong, shuffle_all]);

    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>

            {/* Player Control buttons */}
            <PlayerControls allSong={allSong} next_song={next_song} onHover={onHover} 
             shuffleClk={shuffleClk} repeatClk={repeatClk} currentSong={currentSong}
             prev_song={prev_song} play_or_pause={play_or_pause} shuffle={shuffle} 
             repeat={repeat} playing={playing} skipClk={skipClk} prevClk={prevClk}/>


            {/* audio tag */}
            <audio ref={songRef} type="audio/mpeg" preload="true" id="song"
             onTimeUpdate = { e => setCurrentTime(e.target.currentTime) }
             onCanPlay={ e => setDuration(e.target.duration) }
             onEnded={ e =>  repeat%3 !== 2 && next_song(e, allSong.indexOf(currentSong) + 1, state) }
             src={ sample2 }
             />
            
            {/* audio progress bar */}
            { (currentSong || pSong) && 
                <input type="range" style={styles.progress}
                value={duration ? (currentTime * 100)/duration : 0} 
                onChange={onChangeProgress}/>}

            {/* display timestamps of song */}
            { (currentSong) && 
                <div style={styles.timeDiv}>
                    <div ref={currentRef} style={styles.currentDiv}>{formatTimeStamps(currentTime)}</div>
                    <div style={styles.durationDiv}>{formatTimeStamps(duration)}</div>
                </div>}
            
            {/* song name */}
            <p style={styles.title}>{currentSong ? currentSong.title : "---"}</p>
        </div>
    )
}