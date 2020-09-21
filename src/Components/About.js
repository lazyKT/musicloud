import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { userContext } from '../Contexts/userContext';
import { Dashboard } from './Dashboard';
import Home from './Home';

function About(){

    const { auth } = useContext(userContext);
    console.log("About", auth);

    return(
       auth ? <Dashboard/> : <Home/>
    )
}

export default withRouter(About)