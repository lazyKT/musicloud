import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';
import UserDetails from './UserDetails';
import '../App.css';

const styles = {
    mainDiv: {
        width: "100%",
        display: "flex"
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
        marginLeft: "25%",
    },
    subSetting:{
        paddingTop: "20px"
    },
    subSettingOnScroll: {
        paddingTop: "60px",
    }
} 


const Profile = (props) => {

    const Auth = useContext(userContext);
    const login = Cookies.get("user");

    const [ scrolling, setScrolling ] = useState(false);
    const [ scrollColumn, setScrollColumn ] = useState(null);
    
    useEffect(()=>{
        if(!login){
            Auth.setAuth(false);
            props.history.push('/');
        }
    },[])

    const onScrollFunc = id => {
        console.log("On Scroll Clicked!!", id);
        let element = document.getElementById(id);
        if (element) {
            element.scrollIntoView();
            //setScrolling(true);
            setScrollColumn(id);
        }         
    }

    return(
        <>
            <div style={styles.mainDiv} className="mainDiv">
                <div style={styles.sideDiv}>
                    <h3>Side Navigation</h3>
                    <ul style={styles.sideItemsList}>
                        <li style={styles.sideItems}>
                            <a onClick={() => onScrollFunc("user")}>User Details</a>
                        </li>
                        <li style={styles.sideItems}>
                            <a onClick={() => onScrollFunc("noti")}>Notifications</a>
                        </li>
                        <li style={styles.sideItems}>
                            <a onClick={() => onScrollFunc("con")}>Connection</a>
                        </li>
                        <li style={styles.sideItems}>
                            <a onClick={() => onScrollFunc("sec")}>Security</a>
                        </li>
                    </ul>
                </div>
                <div style={styles.setting}>
                    <div id="user" style={ styles.subSetting}>
                        <UserDetails/>
                    </div>
                    <div id="noti" style={ styles.subSetting}>
                        <h3>Notifications</h3>
                    </div>
                    <div id="con" style={ scrollColumn === "con" ?
                            (scrolling ? styles.subSettingOnScroll : null) : null}>
                        <h3>Connection</h3>
                    </div>
                    <div id="sec">
                        <h3>Security</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Profile);