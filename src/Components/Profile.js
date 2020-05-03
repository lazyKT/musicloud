import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';
import UserDetails from './UserDetails';
import '../App.css';

const styles = {
    mainDiv: {
        width: "100%",
        display: "flex",
    },
    sideDiv: {
        height: "50%",
        width: "160px",
        position: "fixed",
        zIndex: "1",
        fontSize: "large",
        overflowX: "hidden",
        padding: "20px"
    },
    sideItemsList: {
        listStyle: "none"
    },
    sideItems: {
        margin: "10px 0px",
        color: "gray"
    },
    setting: {
        marginLeft: "25%"
    }
}

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
        const user = JSON.parse(Cookies.get("tokens"));
        setUserID(user.id);
        setAccessToken(user.access_token);
    },[])

    return(
        <>
            <div style={styles.mainDiv} className="mainDiv">
                <div style={styles.sideDiv}>
                    Side Navigation
                    <ul style={styles.sideItemsList}>
                        <li style={styles.sideItems}>Account</li>
                        <li style={styles.sideItems}>Notifications</li>
                        <li style={styles.sideItems}>Connection</li>
                        <li style={styles.sideItems}>Security</li>
                    </ul>
                </div>
                <div style={styles.setting}>
                    <UserDetails id={userID} token={accessToken}/>
                </div>
            </div>
        </>
    );
}

export default withRouter(Profile);