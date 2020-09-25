import React, { useState, useReducer, useRef, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import { postSongForProcess, checkTaskStatus } from '../UsersReqs/SongRequests';

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
        background: "#d3d3d3",
        padding: "10px 30px",
        borderRadius: "5px",
        border: "none",
        color: "black"
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

    const { song } = state;

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

/* This is a helper component to post a song to server */
export function AddSong(props) {

    const [ hover, setHover ] = useState(false);
    const [ urlHelp, setUrlHelp ] = useState(false);
    const [ titleHelp, setTitleHelp ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    // Reducer
    const [state, dispatch] = useReducer(reducer, init);

    const { addDiv, toggle } = props;

    const postBtn = useRef('');
    const urlRef = useRef('');

    const urlhelpTxt = "Please enter the desired youtube video url.";
    const titlehelpTxt = "Please enter the title for the song. Make sure you enter the right title.";

    // toggle POST button state
    function togglePostBtn(enable) {
        if (enable) {
            postBtn.current.style.color = "white";
            postBtn.current.style.background = "green";
            postBtn.current.disabled = false; 
        } else {
            postBtn.current.style.color = "black";
            postBtn.current.style.background = "#d3d3d3";
            postBtn.current.disabled = true;
        }
    } 


    // onChange function for url input
    function urlOnChange(event) {
        const url = event.target.value;
        // dispatch function to assign url in reducer!
        dispatch({type: 'urlChange', url});
        if (event.target.value && state.title) togglePostBtn(true);
        else togglePostBtn(false);
    }

    // onChange function for title input
    function titleOnChange(event) {
        const title = event.target.value;
        // dispatch function to assign title in reducer!
        dispatch({type: 'titleChange', title});
        if (event.target.value && state.url) togglePostBtn(true);
        else togglePostBtn(false);
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
        console.log("added");
        const { requestAdded, token } = props;
        console.log("token", token);
    
        const { title, url } = state;
        // setLoading(true);
    
        const song = { url, title, user_id: token.id, genre_id: 1};

        try {
            const response = await postSongForProcess(song, token.access_token);
            console.log(response);
            if (response.status === 201) {
                requestAdded(response.data);
            } else {
                console.log("request error");
                //setLoading(false);
            }
        } catch (err) {
            console.log(err.status);
        } 
        
    }

    useEffect(() => {
        togglePostBtn(false);
        urlRef && urlRef.current.focus();
    }, [])

    return(
        <div style={addDiv}>
            <div style={styles.formDiv}>
                <h4 style={styles.formTitle}>Add a new Song</h4>
                <div style={styles.form}>
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
                     onChange={urlOnChange} ref={urlRef}
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
                        onClick={ postSong }
                        onMouseOver={onHoverPostBtn}
                        onMouseLeave={onHoverPostBtn}
                        ref={postBtn}>
                        { loading ? 
                            <Loader type="ThreeDots" color="#00BFFF" height={10} width={10} timeout={5000}/>
                            : "POST" }
                    </button>
                </div>
                <hr></hr>
                <Regulations/>
            </div>
        </div>
    );
}