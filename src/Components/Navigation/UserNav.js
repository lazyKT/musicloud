import React, { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../../Contexts/userContext';
import '../../App.css';
import { logoutUser } from '../UsersReqs/Users'


// Styling of nav elements
const styles = {
    div: {
        width: "50%"
    },
    h3: {
        width: "fit-content",
        margin: "15px auto",
        fontFamily: "fantasy",
        color: "wheat",
        textDecoration: "none",
        cursor: "pointer"
    },
    ul: {
        display: "flex",
        justifyContent: "space-around",
        listStyle: "none",
        width: "50%",
        float: "right"
    },
    link: {
        display: "block",
        margin: "auto",
        textDecoration: "none",
        color: "white",
        fontWeight: "600",
        fontFamily: "sans-serif"
    }
}

export const UesrNav = (props) => {
    
    const Auth = useContext(userContext);
    const login = Cookies.get("user");
    let user = Cookies.get("tokens");
    const [ cookies, setCookies ] = useState({});

    useEffect(() => {
        if (login && user)
            setCookies(JSON.parse(user));
        else
            Auth.setAuth(false); 
    },[user]);

    const handleLogout = async () => {
        const res = await logoutUser(cookies.access_token);
        console.log(res);
        if (res.status === 200) {
            console.log("success");
            user = null; // Initiate Logout, so that the effect will be updated
            Auth.setAuth(false); // set false to Auth Context
            // Remove Cookies
            Cookies.remove("user");
            Cookies.remove("tokens");
        } else {
            //alert('Logout from API - Failed!');
            console.log("Logout Failed");
        }
    }

    return(
        <>
            {/* rediect */}
            { !user && <Redirect to='/'/>}
            <div style={styles.div}>
                <Link to="/">
                    <h3 style={styles.h3}>MusiCloud</h3>
                </Link>
            </div>
            <ul style={styles.ul}>
                <Link style={styles.link} to="/"><li>Contact</li></Link>
                <Link style={styles.link} to="/profile"><li>Profile</li></Link>
                <li style={styles.link}><button onClick={ handleLogout } className="authBtn">Logout</button></li>
            </ul>
        </>
    );
}
