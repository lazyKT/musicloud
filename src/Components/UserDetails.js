import React,{ useEffect, useReducer } from 'react';
import UpdateUser from './UpdateUser';
import '../App.css'
import { useCookies } from './Hooks/useCookies';
import { EditOpr } from './Admin/CrudFunctions/Data';
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

// material ui styles

const useStyles = makeStyles( theme => ({
  profilePicDiv:{
    width: "100%",
    display: "flex",
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


const UserDetails = () => {

  const classes = useStyles(); // material ui styles class

  const { cookies, login } = useCookies();
  const [ state, dispatch ] = useReducer(reducer, init); 

  useEffect(() => {
    console.log("Cookies Effect!!!");
    if (cookies && login) {
      console.log(cookies.username)
      dispatch({type: "userDetails", user: cookies});
      dispatch({type: 'updateValue'});
    }
  },[cookies]);

  const onChangeListender = event =>{
    if((event.target.value).length < 4)
      dispatch({ type: 'setError' });
    else
      dispatch({ type: 'removeError' });

    if(event.target.value != state.user.username)
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
                  <Avatar alt="Remy Sharp" className={classes.large}>OP</Avatar>
                  <Button className={classes.uploadBtn} variant="outlined" endIcon={<CameraAltIcon/>}>
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