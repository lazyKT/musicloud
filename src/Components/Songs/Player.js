import React, { useEffect, useState } from 'react';

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

    const { pSong, allSong } = props;

    const [ currentSong, setCurrentSong ] = useState(null);


    /* -- Skip Song */
    function skip(event) {
        event.preventDefault();
        console.log("Skip", allSong.length);
        let idf = currentSong.id;
        console.log(allSong[idf]);
        setCurrentSong(allSong[idf]);
    }

    useEffect(() => {
        console.log("render");
        if (pSong) {
            setCurrentSong(pSong);
        }        
    }, [pSong])


    /* -- Rendering of Player -- */
    return(
        <div style={styles.contianer}>
            <div style={styles.bDiv}>
                <ShuffleIcon style={styles.shuffle}/>
                <SkipPreviousIcon style={styles.previous}/>
                <PlayCircleFilledOutlinedIcon style={styles.play}/>
                <SkipNextIcon style={styles.skip} onClick={skip}/>
                <RepeatIcon style={styles.repeat}/>
            </div>
            <p style={styles.title}>Song Name : {currentSong ? currentSong.title : "---"}</p>
        </div>
    )
}