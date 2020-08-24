import React, { useEffect, useState, useReducer, useRef } from 'react';

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
        
        case "play_song":
            return { ...state, playing: true };
             
        default:
            throw new Error();
    }
  }


export function Player(props) {

    const { pSong, allSong } = props;

    // define useReducer
    const [ state, dispatch ] = useReducer(reducer, init);
    const { repeat, shuffle, currentSong, playing } = state;

    /**
     * 0 = no repeat
     * 1 = single repeat
     * 2 = repeat all
     */
    const repeatRef = useRef(0);
    const shuffleRef = useRef(null);

    const [ hover, setHover ] = useState(false);


    /* -- Skip Song */
    function next(event) {
        event.preventDefault();
        let next_id = allSong.indexOf(currentSong) + 1;

        if ( next_id < allSong.length)
            dispatch({ type: "load_song", song: allSong[next_id] });
    }


    /* -- previous Song -- */
    function previous(event) {
        event.preventDefault();
        console.log("current id", currentSong.id - 1);
        let prev_id = allSong.indexOf(currentSong) - 1;

        if (prev_id >= 0)
            dispatch({ type: "load_song", song: allSong[prev_id] });
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
        hover ? event.target.style.background = "#000" 
            : event.target.style.background = "#d3d3d3";
    }


    /** -- side effects on Song Card Click --  */
    useEffect(() => {
        if (pSong) {
            dispatch({ type: "load_song", song: pSong });
            dispatch({ type: "play_song" });
        }        
    }, [pSong])


    /** Side Effects on Repeat and Play Btn Click */
    useEffect(() => {
        
        /** play btn operation */
        if (!pSong && playing)
            dispatch({ type: "load_song", song: allSong[0] });
        
        /** toggle shuffle  */
        shuffle ? ( shuffleRef.current.style.color = "blue" ) 
            : ( shuffleRef.current.style.color = "grey" );

        /** repeat operation  */
        repeat%3 === 0 && ( repeatRef.current.style.color = "grey" );
        repeat%3 > 0 && ( repeatRef.current.style.color = "black" ); 
        
    }, [playing, repeat, shuffle]);


    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>
            <div style={styles.bDiv}>
                <ShuffleIcon style={styles.shuffle} ref={ shuffleRef } onClick={() => dispatch({ type: "shuffleClk" }) }/>
                <SkipPreviousIcon style={styles.previous} onClick={previous}
                 onMouseOver={onHover} onMouseLeave={onHover} />

                {/* Pause or Play */}
                {
                    playing 
                    ? <PauseCircleFilledOutlinedIcon style={styles.play} onClick={play_or_pause}
                        />
                    : <PlayCircleFilledOutlinedIcon style={styles.play} onClick={play_or_pause}/>
                }

                <SkipNextIcon style={styles.skip} onClick={next} onMouseOver={onHover} onMouseLeave={onHover}/>

                {/* repeat btn state */}
                {
                    (repeat%3) === 2 
                    ? <RepeatOneIcon ref={repeatRef} style={styles.repeat} onClick={() => dispatch({ type: "repeatClk" })}/>
                    : <RepeatIcon ref={repeatRef} style={styles.repeat} onClick={() => dispatch({ type: "repeatClk" })}/>
                }
            </div>
            <p style={styles.title}>{currentSong ? currentSong.title : "---"}</p>
        </div>
    )
}