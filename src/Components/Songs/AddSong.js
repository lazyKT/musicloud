import React, { useState } from 'react';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

// Stylings for the AddSong DOM Elements
const styles = {
    formDiv: {
        width: "300px",
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
        height: "30px",
        margin: "20px 0px"
    },
    postBtn: {
        width: "fit-content",
        height: "fit-content",
        margin: "20px 0px",
        float: "right",
        background: "green",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        color: "white"
    },
    icon: {
        width: "20px",
        verticalAlign: "middle"
    },
    titleDiv: {
        display: "inline-block",
        margin: "10px 0px"
    }
}

export function AddSong(props) {

    const [ hover, setHover ] = useState(false);

    const { addDiv, toggle } = props;

    // Trigerring hover effects
    function onHoverPostBtn(event) {
        setHover(!hover);
        hover ? event.target.style.background = 'green' :
            event.target.style.background = 'darkgreen'
    }

    return(
        <div style={addDiv}>
            <div style={styles.formDiv}>
                <form style={styles.form}>
                    <div style={styles.titleDiv}>
                        <span>Video URL</span>
                        <HelpOutlinedIcon style={styles.icon}/>
                    </div>
                    <input style={styles.input}/>
                    <div style={styles.titleDiv}>
                        <span>Video URL</span>
                        <HelpOutlinedIcon style={styles.icon}/>
                    </div>
                    <input style={styles.input}/>
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
            </div>
        </div>
    );
}