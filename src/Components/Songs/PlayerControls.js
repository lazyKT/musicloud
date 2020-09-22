import React, { useRef, useEffect } from 'react'

/** imports from Material UI icons */
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import PauseCircleFilledOutlinedIcon from '@material-ui/icons/PauseCircleFilledOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';

/** styling */
const styles = {
    bDiv: {
        width: "fit-content",
        margin: "auto"
    },
    play: {
        fontSize: "50px",
        margin: "0px 30px"
    },
    skip: {
        fontSize: "18px",
        padding: "5px",
        display: "inline-block",
        marginBottom: "5px",
        borderRadius: "50%",
        background: "black",
        color: "white"
    },
    previous: {
        fontSize: "18px",
        padding: "5px",
        display: "inline-block",
        marginBottom: "5px",
        borderRadius: "50%",
        background: "black",
        color: "white"
    },
    shuffleOn: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px",
        color: "blue"
    },
    shuffleOff: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px",
        color: "grey"
    },
    norepeat: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px",
        color: 'grey'
    },
    repeat: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px",
        color: 'black'
    }
}


function PlayerControls(props) {

    /** destructuring props */
    const { onHover, currentSong, prevClk, repeat, shuffle, skipClk, play_or_pause, shuffleClk, repeatClk, playing } = props;

    const prevRef = useRef('');
    const skipRef = useRef('');

    const toggleSkipRev_btn = (enable = false) => {
        if (enable) {
            skipRef.current.style.background = "#000";
            prevRef.current.style.background = "#000";
        } else {
            skipRef.current.style.background = "#d3d3d3";
            prevRef.current.style.background = "#d3d3d3";
        }
    }

    useEffect(() => {
        console.log("current song", currentSong);
        currentSong ? toggleSkipRev_btn(true) : toggleSkipRev_btn(false);
    }, [currentSong])


    /** rendering player buttons */
    return (
        <div style={styles.bDiv}>

            {/* shuffle button */}
            <ShuffleIcon style={shuffle ? styles.shuffleOn : styles.shuffleOff}
                onClick={ shuffleClk }/>

            {/* previous button */}
            <SkipPreviousIcon style={styles.previous} ref={prevRef} onMouseOver={onHover} onMouseLeave={onHover} 
                onClick={e => prevClk(e)}/>

            {/* Pause or Play */}
            {
                playing 
                ? <PauseCircleFilledOutlinedIcon style={styles.play} onClick={e => play_or_pause(e)}/>
                : <PlayCircleFilledOutlinedIcon style={styles.play} onClick={e => play_or_pause(e)}/>
            }

            {/* next button */}
            <SkipNextIcon style={styles.skip} ref={skipRef} disabled={true}
                onClick={e => skipClk(e)} 
                />

            {/* repeat btn state */}
            {
                (repeat%3) === 2 
                ? <RepeatOneIcon style={styles.repeat} 
                    onClick={repeatClk}/>
                : <RepeatIcon style={repeat ? styles.repeat : styles.norepeat} 
                    onClick={repeatClk}/>
            }
        </div>
    );
}



export default PlayerControls;