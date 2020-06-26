import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../../Contexts/userContext';
import '../../App.css';


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

export const UesrNav = () => {
    
    const Auth = useContext(userContext);
    const login = Cookies.get("user");
    const user = Cookies.get("tokens");
    const [ cookies, setCookies ] = useState({});

    useEffect(() => {
        if (login && user)
            setCookies(JSON.parse(user));
    },[user]);

    const handleLogout = async () => {
        //const res = await logoutOpr(cookies.access_token)
        Auth.setAuth(false);
        Cookies.remove("user");
        Cookies.remove("tokens");
    }

    return(
        <>
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
