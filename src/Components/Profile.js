import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';
import UserDetails from './UserDetails';

const Profile = (props) => {

    const Auth = useContext(userContext);
    const login = Cookies.get("user");

    const [ userID, setUserID ] = useState('');
    const [ accessToken, setAccessToken ] = useState('');

    //const [ data, loading ] = useFetchUser(1,token.access_token);
    
    useEffect(()=>{
        if(!login){
            Auth.setAuth(false);
            props.history.push('/');
        }
    },[])

    useEffect(() => {
        const user = JSON.parse(Cookies.get("tokens"));
        setUserID(user.id);
        setAccessToken(user.access_token);
    },[])

    return(
        <>
            <UserDetails id={userID} token={accessToken}/>
        </>
    );
}

export default withRouter(Profile);