import React, { useState } from 'react';
import { AddSong } from './Songs/AddSong'

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
    }
}

export function UserDashboard() {

    const [ adding, setAdding ] = useState(false);

    // Toggle the "Add Song Form"
    function toggleAddForm() {
        console.log("Adding")
        setAdding(!adding);
    }


    return(
        <div className="mainDiv">
            <div style={styles.div}>
                <pre style={styles.pre}>It's empty here. </pre>
                <p onClick={toggleAddForm} style={styles.p}>
                    Try to add something to listen.
                </p>
            </div>
            {
                adding ?
                (<AddSong addDiv={styles.addDiv} toggle={toggleAddForm}/>)
                : ""
            }
        </div>
    );
}
