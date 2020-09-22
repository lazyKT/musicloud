import React, { useContext, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { userContext } from '../Contexts/userContext';
import { Dashboard } from './Dashboard';
import Home from './Home';
import { useCookies } from './Hooks/useCookies';

function Interchange(){

    const { cookies, login } = useCookies();
    const { auth, setAuth } = useContext(userContext);
    console.log("About", auth);


    /** 
     * this is honestly used for the back up
     * when the logout button doesn't do its job.
     */
    useEffect(() => {
        console.log("login state at about", login);
        if (!login || !cookies) setAuth(false);
    }, [cookies, login])

    

    return(
       auth ? <Dashboard/> : <Home/>
    )
}

export default withRouter(Interchange)