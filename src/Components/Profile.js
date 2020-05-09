import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';
import UserDetails from './UserDetails';
import '../App.css';
import Security from './Profile/Secuirty';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Notifications } from './Profile/Notifications';
import { Connect } from './Profile/Connect';
import { ChangePwd } from './Profile/ChangePwd';
import { Button } from '@material-ui/core';

const styles = {
    mainDiv: {
        width: "100%",
        display: "flex",
        paddingTop: "60px"
    },
    setting: {
        marginLeft: "25%",
        width: "70%"
    }
} 


const Profile = (props) => {

    const Auth = useContext(userContext);
    const login = Cookies.get("user");
    const user = Cookies.get("tokens");
    const [ showModal, setShowModal ] = useState(false);
    const [ cookies, setCookies ] = useState({});
    const [ logout, setLogout ] = useState(false);
    
    useEffect(()=>{
        if(!login){
            Auth.setAuth(false);
            props.history.push('/');
        }
        setCookies(JSON.parse(user));
    },[user])

    const changePwdClick = () => {
        console.log("Change Password Button Clicked!!!");
        setShowModal(!showModal);
    }

    const logoutClick = () => {
        console.log("Logout!!!");
    }


    return(

        <Router>
            <div styles={styles.mainDiv} className="mainDiv">
                <div>
                    <div className="sideDiv">
                        <Link to='/profile'>UserDetails</Link>
                        <Link to='/profile/notifications'>Notifications</Link>
                        <Link to='/profile/connections'>Connect</Link>
                        <Link to='/profile/security'>Secuirty</Link>
                    </div>
                </div>
                <div style={styles.setting}>
                    <Route path="/profile" exact component={ UserDetails } />
                    <Route path="/profile/security" exact
                     render={(props) => 
                     <Security {...props} changePwdClick={changePwdClick}/>}/>
                    <Route path="/profile/notifications" exact component={ Notifications } />
                    <Route path="/profile/connections" exact component={ Connect } />
                </div>
                { showModal ? 
                (<div className="bg-modal">
                    <ChangePwd changePwdClick={changePwdClick} cookies={cookies}/>
                </div>) : null}
                { logout && 
                (<div className="bg-modal-logout">
                    <div>
                        <p><b>You have successfully changed your password!</b></p>
                        <p>Click <b>Ok</b> to logout and log in back. :D</p>
                        <Button onClick={logoutClick}>OKAY</Button>
                    </div>
                </div>)
                }
            </div>
        </Router>
    );
}

export default withRouter(Profile);