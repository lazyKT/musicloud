import React, { useState, useReducer } from 'react';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import { postSongForProcess, checkTaskStatus } from './SongRequests';

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

// Initial state for the useReducer Hook
const init = {
    song: [],
    url: "",
    title: ""
}

// reduser function for useReducer Hook
function reducer(state, action) {

    const { song, url, title } = state;

    switch(action.type) {
        case 'urlChange':
            return {...state, url: action.url};
        case 'titleChange':
            return {...state, title: action.title};
        case 'add-queue':
            return {...state, song: song.push(action.song)}
        default:
            throw new Error('reducer error!');
    }
}

/* This is a helper function for AddSong Component to check status of mp3 conversion process*/
async function checkStatus(task_id) {
    const response = await checkTaskStatus(task_id);
    if (response.status === 201) {
        console.log("Good To Go");
    } else {
        checkStatus(task_id);
    }
}

/* This is a helper component to post a song to server */
export function AddSong(props) {

    const [ hover, setHover ] = useState(false);
    const [ urlHelp, setUrlHelp ] = useState(false);
    const [ titleHelp, setTitleHelp ] = useState(false);

    // Reducer
    const [state, dispatch] = useReducer(reducer, init);

    const { addDiv, toggle } = props;

    const urlhelpTxt = "Please enter the desired youtube video url.";
    const titlehelpTxt = "Please enter the title for the song. Make sure you enter the right title.";


    // onChange function for url input
    function urlOnChange(event) {
        const url = event.target.value;
        // dispatch function to assign url in reducer!
        dispatch({type: 'urlChange', url});
    }

    // onChange function for title input
    function titleOnChange(event) {
        const title = event.target.value;
        // dispatch function to assign title in reducer!
        dispatch({type: 'titleChange', title});
    }

    function onHoverURLTitle() {
        setUrlHelp(!urlHelp);
    }

    function onHoverSongTitle() {
        setTitleHelp(!titleHelp);
    }

    // Trigerring hover effects on POST button
    function onHoverPostBtn(event) {
        setHover(!hover);
        hover ? event.target.style.background = 'green' :
            event.target.style.background = 'darkgreen'
    }

    /* 
    Post a video url to server for the converion of video to mp3
    This is just a POST request to the server for the conversion.
    The ideal response will be 200, acknowledgement from the server has received the task and start processing.
    Upon Successful POST, the app will check the conversion status in every 5 seconds.(5 times).
    Processes which finished processing in 25 seconds will be alert back to the user that the mp3 is ready to play.
    Processes which exeeds more than 25-second processing time will be regarded as an error and 
    prompt the user to try again.
    */
    async function postSong(event) {
        event.preventDefault();
        
        const { url, title } = state;

        const song = { url, title, user_id: 1, genre_id: 1};

        const response = await postSongForProcess(song);
        console.log(response);
        if (response.status === 201) {
            // add song to status check queue
            dispatch({type: 'add-queue', song});
            // Need to fetch conversion status
        }
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
                    <input style={styles.input} name="url" value={state.url}
                     onChange={urlOnChange}
                     required/>
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
                    <input style={styles.input} name="title" value={state.title}
                     onChange={titleOnChange}
                     required/>
                    <button style={styles.cancelBtn}
                     onClick={toggle}>
                        CANCEL
                    </button>
                    <button style={styles.postBtn}
                        onClick={postSong}
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