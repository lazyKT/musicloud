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
import { uploadAvatarOpr, logoutOpr } from '../Components/Admin/CrudFunctions/Data';

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
    const [ img, setImg] = useState(null);
    const [ updatedImg, setUpdatedImg] = useState(null);
    const [ showUpload, setShowUpload ] = useState(false);
    
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

    const showUploadModal = () => {
        setShowUpload(prevState => !prevState);
    }

    const uploadAvatar = async event => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("image", img, img.name);
        
        const res = await uploadAvatarOpr(cookies.access_token, formData);
        if (res.status === 201) {
            setShowUpload(prevState => !prevState);
            setUpdatedImg(img);
        }
    }

    const choosefile = event => {
        let filename = event.target.files[0];
        let reader = new FileReader();
        let img = document.getElementById("preview");
        setImg(filename);
        reader.addEventListener('load', event => {         
            img.src = event.target.result;
        });
        reader.readAsDataURL(filename);
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
                    <Route path="/profile" exact render={props =>
                     <UserDetails {...props} updatedImg={updatedImg} uploadAvatar={showUploadModal}/>}/>
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
                        <Button>OKAY</Button>
                    </div>
                </div>)
                }
                {showUpload && 
                (<div className="bg-modal">
                    <div className="upload-avatar">
                        <form id="form" onSubmit={uploadAvatar}>
                            <input className="file-input"
                             onChange={choosefile} id="input" type="file" required/>
                            <img id="preview"/>
                            <div className="btn-div">
                                <Button onClick={showUploadModal}>Cancel</Button>
                                <input type="submit" value="Upload"/>
                            </div>
                        </form>
                    </div>
                </div>)}
            </div>
        </Router>
    );
}

export default withRouter(Profile);