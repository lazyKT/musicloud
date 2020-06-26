import React, { useState } from 'react';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import zIndex from '@material-ui/core/styles/zIndex';

// Stylings for the AddSong DOM Elements
const styles = {
    formTitle: {
        display: "block",
        width: "fit-content",
        margin: "5px auto",
        color: "coral",
        fontFamily: "sans-serif"
    },
    formDiv: {
        width: "350px",
        background: "white",
        borderRadius: "10px"
    },
    form: {
        width: "80%",
        padding: "10px",
        margin: "auto"
    },
    input: {
        width: "100%",
        padding: "5px",
        height: "30px",
        borderRadius: "5px",
        boxSizing: "border-box",
        fontSize: "15px"
    },
    cancelBtn: {
        width: "fit-content",
        height: "fit-content",
        margin: "20px 0px",
        padding: "7px 20px"
    },
    postBtn: {
        width: "fit-content",
        height: "fit-content",
        margin: "20px 0px",
        float: "right",
        background: "green",
        padding: "10px 30px",
        borderRadius: "5px",
        border: "none",
        color: "white"
    },
    icon: {
        width: "20px",
        verticalAlign: "middle"
    },
    titleDiv: {
        display: "block",
        margin: "10px 0px",
        cursor: "pointer"
    },
    help: {
        width: "80%",
        height: "fit-content",
        borderRadius: "5px",
        padding: "5px",
        fontSize: "12px",
        zIndex: "1",
        display: "flex",
        background: "coral",
        color: "white",
        margin: "5px 0px"
    },
    regulationDiv: {
        padding: "10px",
        fontSize: "12px"
    }
}

const Regulations = _ => {
    return(
        <div style={styles.regulationDiv}>
            <p>Before Posting the new Song</p>
            <ul>
                <li>Make sure the url is valid.</li>
                <li>The song quality is based on the url provided.</li>
                <li>Make sure you choose the correct tilte, once created, no reversing.</li>
            </ul>
            Thanks for your supports :)
        </div>
    );
}

export function AddSong(props) {

    const [ hover, setHover ] = useState(false);
    const [ urlHelp, setUrlHelp ] = useState(false);
    const [ titleHelp, setTitleHelp ] = useState(false);

    const { addDiv, toggle } = props;

    const urlhelpTxt = "Please enter the desired youtube video url.";
    const titlehelpTxt = "Please enter the title for the song. Make sure you enter the right title.";

    function onHoverURLTitle() {
        setUrlHelp(!urlHelp);
    }

    function onHoverSongTitle() {
        setTitleHelp(!titleHelp);
    }

    // Trigerring hover effects
    function onHoverPostBtn(event) {
        setHover(!hover);
        hover ? event.target.style.background = 'green' :
            event.target.style.background = 'darkgreen'
    }

    return(
        <div style={addDiv}>
            <div style={styles.formDiv}>
                <h4 style={styles.formTitle}>Add a new Song</h4>
                <form style={styles.form}>
                    { urlHelp && 
                        <div style={styles.help}>
                            {urlhelpTxt}
                        </div>
                    }

                    {/* URL Input */}
                    <div style={styles.titleDiv}
                     onClick={onHoverURLTitle}>
                        <span>Video URL</span>
                        <HelpOutlinedIcon style={styles.icon}/>
                    </div>
                    <input style={styles.input} required/>
                    { titleHelp && 
                        <div style={styles.help}>
                            {titlehelpTxt}
                        </div>
                    }

                    {/* Title Input */}
                    <div style={styles.titleDiv}
                     onClick={onHoverSongTitle}>
                        <span>Song Title</span>
                        <HelpOutlinedIcon style={styles.icon}/>
                    </div>
                    <input style={styles.input} required/>
                    <button style={styles.cancelBtn}
                     onClick={toggle}>
                        CANCEL
                    </button>
                    <button style={styles.postBtn}
                        onMouseOver={onHoverPostBtn}
                        onMouseLeave={onHoverPostBtn}>
                        POST
                    </button>
                </form>
                <hr></hr>
                <Regulations/>
            </div>
        </div>
    );
}