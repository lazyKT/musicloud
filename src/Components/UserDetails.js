import React,{ useState,useEffect, useReducer } from 'react';
import UpdateUser from './UpdateUser';
import '../App.css'
import { useCookies } from './Hooks/useCookies';
import { EditOpr } from './Admin/CrudFunctions/Data';
import Cookies from 'js-cookie';

function init (){
  return {
    user: {},
    loaded: false,
    edit: false,
    error: false,
    updateVal : "",
    readySumit : false
  }
}

function reducer (state, action) {

  switch (action.type) {
    case 'userDetails':
      return {
        ...state,
        user: action.user, 
        loaded: true
      };
    case 'editClick':
      return {
        ...state,
        edit: !state.edit
      }
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
      console.log(state.updateVal);
      return {...state, updateVal: state.updateVal}
    default:
      throw new Error();
  }
}


const UserDetails = () => {

  const [ finishupdate, setFinishupdate ] = useState(0);
  const [ error, setError ] = useState(false);

  const { cookies, login } = useCookies();
  const [ state, dispatch ] = useReducer(reducer, init); 

  useEffect(() => {
    console.log("Cookies Effect!!!");
    if (cookies && login) {
      console.log(cookies.username)
      dispatch({type: "userDetails", user: cookies});
      dispatch({type: 'updateValue'});
    }
  },[cookies, setFinishupdate]);

  const onChangeListender = event =>{
    console.log(error);
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
    console.log("Save Button Clicked!!!")
    let updateData = { username: state.updateVal, email: state.user.email};
    const res = await EditOpr(state.user.access_token, state.user.id,updateData);
    if (res.status === 200) {
      console.log("Updated!!!");
      dispatch({ type: 'editClick' });
      dispatch({ type: 'save' });
      const { id, access_token, refresh_token, email, role, uuid, profile_pic, created_on } = state.user;
      let newCookies = {id, access_token, refresh_token, email, role, uuid, profile_pic, created_on, 
        username: state.updateVal}
      setCookies(newCookies);
      setFinishupdate(prevState => prevState+1);
    }
  }

  const editHandler = event => {
    event.preventDefault();
    dispatch({ type: 'editClick' });
    //dispatch({ type: 'updateValue' });
  }

  const cancelHandler = event => {
    event.preventDefault();
    dispatch({ type: 'editClick' });
    dispatch({ type: 'updateValue' });
  }

  return(
      <>
        {state.loaded ? state.updateVal : "nothing"}
        <div id="userDetails">
          <h3>User Details</h3>
          { state.loaded ? 
            (<UpdateUser onChange={ onChangeListender } afterUpdate={ finishupdate }
                update={state.edit}  inputValue={state.user.username} value={state.updateVal} 
                isInputChanged={ state.readySumit }
                hasError={ state.error } onClick={ editHandler } saveOnClick={ saveHandler }
                cancelHandler={cancelHandler}/>)
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