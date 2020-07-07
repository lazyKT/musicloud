import React, { useState, useEffect, useReducer } from 'react';
import { AddSong } from './Songs/AddSong'
import { useCookies } from './Hooks/useCookies';
import { fetchMySongsReq } from './UsersReqs/SongRequests'

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

/* -- Initial Values for useReducer -- */
const init = {
    songs: [],
    empty: true
}


/* -- Reducer Function for useReducer Hook -- */
function reducer(action, state) {
    switch(action.type) {
        case 'get-songs':
            return {...state, songs: action.songs, empty: false};
        default:
            throw new Error('Invalid Case for MySongs');
    }
}


/* -- User DashBoard After Login -- */
export function UserDashboard() {

    // Get Cookies
    const { login, cookies } = useCookies();

    const [ adding, setAdding ] = useState(false);
    const [ hover, setHover ] = useState(false);
    const [ state, dispatch ] = useReducer(reducer, init);

    /* -- Fetch User's Songs */
    async function fetchMySongs(cookies) {
        const { access_token } = cookies;
        const resp = await fetchMySongsReq(access_token);
        const { data } = resp;
        
        // if user has songs, display songs
        if (data.status === 200) {
            dispatch({type: 'get-songs', songs: data.msg});
        } 
    }

    // Toggle the "Add Song Form"
    function toggleAddForm() {
        console.log("Adding")
        setAdding(!adding);
    }

    /* -- Hover the text button -- */
    function onHover(event) {
        setHover(!hover);
        hover ? (event.target.style.textDecoration = 'none') :
            (event.target.style.textDecoration = 'underline');
    }


    /* -- Side Effects -- */
    useEffect(()=> {
        console.log(cookies);
        if (cookies && login) {
            fetchMySongs(cookies);
        }
    },[cookies]);


    /* -- Renders -- */
    return(
        <div className="mainDiv">

            {/* If user has no songs, show default empty message */}
            { state.empty && (
                <div style={styles.div}>
                    <pre style={styles.pre}>It's empty here. </pre>
                    <p onClick={toggleAddForm} style={styles.p}
                    onMouseOver={onHover} onMouseLeave={onHover}>
                        Try to add something to listen.
                    </p>
                </div>
            )}
    
            {
                adding ?
                (<AddSong addDiv={styles.addDiv} toggle={toggleAddForm}/>)
                : ""
            }
        </div>
    );
}
