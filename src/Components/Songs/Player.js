import React, { useEffect, useState, useReducer, useRef } from 'react';
import { firstSongURL, formatTimeStamps } from './Utilities';

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

        case "setDuration":
            return { ...state, duration: action.duration }
        
        case "adjustTime":
            return { ...state, adjustTime: !adjustTime }
             
        default:
            throw new Error();
    }
  }


export function Player(props) {

    const { pSong, allSong, next_song, prev_song, shuffle_all, repeat_one } = props;

    let song = document.getElementById("song");

    const dev_url = "http://127.0.0.1:8000/listen/";

    // define useReducer
    const [ state, dispatch ] = useReducer(reducer, init);
    const { repeat, shuffle, currentSong, playing, duration } = state;

    /**
     * 0 = no repeat
     * 1 = repeat all
     * 2 = repeat single
     */
    const repeatRef = useRef(0);
    const shuffleRef = useRef(null);
    const skipRef = useRef(null);
    const prevRef = useRef(null);
    const currentRef = useRef(0);
    const songRef = useRef(null);

    const [ hover, setHover ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);


    /** handle shuffle and repeat click -- */
    function handleShuffleRepeat(s, r) {
        /** shuffle */
        s ? ( shuffleRef.current.style.color = "blue" ) 
        : ( shuffleRef.current.style.color = "grey" );
        /** repeat */
        (r % 3) === 0 && ( repeatRef.current.style.color = "grey" );
        (r % 3) > 0 && ( repeatRef.current.style.color = "black" );
    }


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

    /** -- onChange Progress bar -- 
     * Move to desired position (time) of a song using progress bar
    */
    function onChangeProgress(event) {
       let time = (event.target.value * duration) / 100;
       setCurrentTime(time);
       songRef.current.currentTime = time;
    }


    function handleEnd(event) {
        console.log("current song", songRef.current, currentSong);
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

        /** handle shuffle and repeat ops */
        handleShuffleRepeat(shuffle, repeat);

    }, [playing, currentSong, shuffle, repeat]);


    /** -- side effects on Song Card Click or Shuffle All --  */
    useEffect(() => {

        console.log("pSong");

        if (pSong) {
            dispatch({ type: "load_song", song: pSong }); // set currentSong
            dispatch({ type: "play_song"});
            toggleSkipRev_Btn(true);
        } else {
            dispatch({ type: "stop" });
            toggleSkipRev_Btn(false);
        }

    }, [pSong, shuffle_all]);

    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>
            <div style={styles.bDiv}>

                {/* shuffle button */}
                <ShuffleIcon style={styles.shuffle} ref={ shuffleRef } 
                    onClick={() => currentSong && dispatch({ type: "shuffleClk" }) }/>

                {/* previous button */}
                <SkipPreviousIcon style={styles.previous} ref={prevRef} onMouseOver={onHover} onMouseLeave={onHover} 
                    onClick={(event) => 
                    currentSong && prev_song(event, allSong.indexOf(currentSong) - 1, state)}/>

                {/* Pause or Play */}
                {
                    playing 
                    ? <PauseCircleFilledOutlinedIcon style={styles.play} onClick={currentSong && play_or_pause}/>
                    : <PlayCircleFilledOutlinedIcon style={styles.play} onClick={currentSong && play_or_pause}/>
                }

                {/* next button */}
                <SkipNextIcon style={styles.skip} ref={skipRef} disabled={true}
                    onClick={(event) => 
                        currentSong && next_song(event, allSong.indexOf(currentSong) + 1, state)} 
                    />

                {/* repeat btn state */}
                {
                    (repeat%3) === 2 
                    ? <RepeatOneIcon ref={repeatRef} style={styles.repeat} 
                        onClick={() => currentSong && dispatch({ type: "repeatClk" })}/>
                    : <RepeatIcon ref={repeatRef} style={styles.repeat} 
                        onClick={() => currentSong && dispatch({ type: "repeatClk" })}/>
                }
            </div>

            {/* audio tag */}
            <audio id="song" ref={songRef} type="audio/mp3" preload="true"
             onTimeUpdate={e => setCurrentTime(e.target.currentTime)}
             onCanPlay={e => dispatch({ type: "setDuration", duration: e.target.duration }) }
             src={currentSong ? `${dev_url}${currentSong.id}` 
                : firstSongURL(allSong, dev_url)} 
             onEnded={ (event) => 
               repeat%3 === 2 ? handleEnd(event)
               : next_song(event, allSong.indexOf(currentSong) + 1, state) }/>
            
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