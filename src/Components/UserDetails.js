import React,{ useEffect, useReducer, useState } from 'react';
import UpdateUser from './UpdateUser';
import '../App.css'
import { useCookies } from './Hooks/useCookies';
import { getAvatar } from './UsersReqs/Users';
import { EditOpr } from './Admin/CrudFunctions/Data';
import profile from '../Imgs/default_profile.png'

import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// ui styles
const useStyles = makeStyles( theme => ({
  profilePicDiv:{
    width: "100%",
    display: "flex",
  },
  avatar: {
    height: "150px",
    width: "150px",
    borderRadius: "50%"
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "auto",
    zIndex: "-1"
  },
  uploadBtn: {
    margin: "auto"
  }
}))

function init (){
  return {
    user: {},
    avatar: null,
    loaded: false,
    edit: false,
    error: false,
    updateVal : "",
    readySumit : false,
    msgTxt: "",
    msgType: null,
    display: false
  }
}

function reducer (state, action) {

  switch (action.type) {
    case 'setAvatar':
      return {...state,avatar: `user_${action.id}.png`}
    case 'userDetails':
      return {...state, user: action.user, loaded: true };
    case 'editClick':
      return {...state, edit: !state.edit }
    case 'setError':
      return { ...state, error: true }
    case 'removeError':
      return {...state, error:false}
    case 'updateValue':
      return {...state, updateVal: state.user.username}
    case 'updateOnChange':
      return {...state, updateVal: action.value}
    case 'validSumitBtn':
      return {...state, readySumit: true}
    case 'save':
      return {...state, user: action.user}
    case 'setHeader':
      return {...state, msgTxt: action.msgTxt, msgType: action.msgType, display: true}
    case 'hide':
      return {...state, display: false}
    default:
      throw new Error();
  }
}


const UserDetails = ({uploadAvatar, updatedImg}) => {

  const classes = useStyles(); // material ui styles class

  const { cookies, login } = useCookies();

  const [ state, dispatch ] = useReducer(reducer, init); 
  const [ avatar, setAvatar ] = useState("");
  const [ avatarHash, setAvatarHash ] = useState("");


  /** 
   * check user's avatar from server 
   * if the user has uploaded avatar, display that in profile
   * if not, display default avatar in profile
   * */
  async function checkAvatar(user_id) {
    
    try {
      const status = await getAvatar(user_id);
      console.log("Status", status);
      if (status === 200) setAvatar(`http://127.0.0.1:8000/avatar/${user_id}`);
    } catch(err) {
      console.log("error", err);
      setAvatar(null);
    }
  }


  useEffect(() => {
    console.log("Render!!")
    setAvatarHash(new Date().getTime());
  }, [updatedImg])

  useEffect(() => {
    if (cookies && login) {
      //fetchAvatar(cookies.access_token, cookies.id);
      checkAvatar(cookies.id);
      dispatch({type: "setAvatar", id: cookies.id})
      dispatch({type: "userDetails", user: cookies});
      dispatch({type: 'updateValue'});
    }
  },[cookies, updatedImg]);

  useEffect(() => console.log("avatar", avatar), [avatar]);

  const onChangeListender = event =>{
    if((event.target.value).length < 4)
      dispatch({ type: 'setError' });
    else
      dispatch({ type: 'removeError' });

    if(event.target.value !== state.user.username)
      dispatch({type: "validSumitBtn"})

    dispatch({type: 'updateOnChange', value: event.target.value});
  }

  const setCookies = userObj => {
    Cookies.set("tokens", userObj);
    console.log("New Cookies Set!!");
  }

  const saveHandler = async event => {
    event.preventDefault();
    let updateData = { username: state.updateVal, email: state.user.email};
    const res = await EditOpr(state.user.access_token, state.user.id,updateData);

    if (res.status === 200) {
      dispatch({ type: 'editClick' });
      const { id, access_token, refresh_token, email, role, uuid, profile_pic, created_on } = state.user;
      let newCookies = {id, access_token, refresh_token, email, role, uuid, profile_pic, created_on, 
        username: state.updateVal}
      setCookies(newCookies);
      dispatch({ type: 'save', user: newCookies });
    }
    dispatch({ 
      type: 'setHeader', 
      msgTxt: res.status === 200 ? "Updated" : "Error",
      msgType: res.status === 200 ? "success" : "error",
    });
  }

  const editHandler = event => {
    event.preventDefault();
    dispatch({ type: 'editClick' });
  }

  const cancelHandler = event => {
    event.preventDefault();
    dispatch({ type: 'editClick' });
    dispatch({ type: 'updateValue' });
  }

  const hideHeaderMsg = () => {
    dispatch({ type: "hide"});
  }

  return(
      <>
        <div id="userDetails">
          <h3>User Details</h3>
          { state.loaded ?
              (<>
                <div className={classes.profilePicDiv}>
                  <p id="test"></p>
                  <div className="pp-container">
                    {avatar ? 
                      <img id="avatar" className={classes.avatar} 
                      src={`${avatar}?${avatarHash}`}/>
                      : <AccountCircleIcon className={classes.avatar}/>
                    }
                  </div>
                  <Button onClick={uploadAvatar} 
                    className={classes.uploadBtn} variant="outlined" endIcon={<CameraAltIcon/>}>
                     Upload   
                  </Button>
                </div>
              </>
              )
              : null
          }
          { state.loaded ? 
            (<UpdateUser onChange={ onChangeListender } update={state.edit} value={state.updateVal} 
              isInputChanged={ state.readySumit } hasError={ state.error } onClick={ editHandler }
              saveOnClick={ saveHandler } cancelHandler={cancelHandler} hideHeaderMsg={hideHeaderMsg}
              header={state.msgTxt} headerType={state.msgType} showHeader={state.display}/>)
              : "loading..."
          }
          <div className="updateField">
              <h4>User ID</h4>
              {  state.loaded ? <span>{state.user.uuid}</span> : "Loading"  }
          </div>
          <div className="updateField">
              <h4>Email Address</h4>
              {  state.loaded ? <span>{state.user.email}</span> : "Loading"  }
          </div>
        </div>
      </>
  );

}

export default UserDetails;