import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../../Contexts/userContext';
import '../../App.css'

export const UesrNav = () => {
    
    const Auth = useContext(userContext);

    const handleLogout = () => {
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
