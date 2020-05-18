import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../../Contexts/userContext';
import '../../App.css'
import { logoutOpr } from '../Admin/CrudFunctions/Data';

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
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/"><li>About</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/"><li>Library</li></Link>
            <li><button onClick={ handleLogout } className="authBtn">Logout</button></li>
        </ul>
    );
}
