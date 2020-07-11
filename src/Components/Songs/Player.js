import React, { useEffect } from 'react';

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
        fontSize: "35px",
        display: "inline-block",
        marginBottom: "10px"
    },
    previous: {
        fontSize: "35px",
        display: "inline-block",
        marginBottom: "10px"
    },
    shuffle: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px"
    },
    repeat: {
        marginBottom: "10px",
        padding: "0px 40px",
        fontSize: "18px"
    },
    title: {
        display: "block",
        width: "fit-content",
        margin: "auto",
    }
}


export function Player(props) {

    const { pSong } = props;

    useEffect(() => {
        
    }, [pSong])


    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>
            <div style={styles.bDiv}>
                <ShuffleIcon style={styles.shuffle}/>
                <SkipNextIcon style={styles.skip}/>
                <PlayCircleFilledOutlinedIcon style={styles.play}/>
                <SkipPreviousIcon style={styles.previous}/>
                <RepeatIcon style={styles.repeat}/>
            </div>
            <p style={styles.title}>Song Name : {pSong ? pSong.title : "---"}</p>
        </div>
    )
}