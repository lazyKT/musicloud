import React,{ useState,useEffect } from 'react';
import { useFetchUser } from './useFetchUser';
import UpdateUser from './UpdateUser';
import axios from 'axios';
import '../App.css'

const UserDetails = (props) => {

  const [ username, setUsername ] = useState('');
  const [ preUpdateVal, setPreUpdateVal ] = useState('');
  const [ finishupdate, setFinishupdate ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ submit, setSubmit ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ email, setEmail ] = useState('');

  const { data, loading } = useFetchUser(props.id,props.token);
  
  useEffect(() => {
    if(!loading){
      setUsername(data.username);
      setPreUpdateVal(data.username);
      setEmail(data.email);
    }
  },[data])

  useEffect(() => {
    if(finishupdate)
      alert("Username Updated!!!");
    console.log(username);
  },[finishupdate])

  const updateUsername = (id,token,updatedUsername) => {
    axios.put(`http://127.0.0.1:8000/user/${id}`,{username:updatedUsername, email:data.email},
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(resp => {
        console.log(resp.status);
        if (resp.status === 200){
          setFinishupdate(!finishupdate);
          setUsername(updatedUsername);
          setPreUpdateVal(updatedUsername);
        }
      })
  }

  const onChangeListender = event =>{
    console.log(error);
    if((event.target.value).length < 4){
      setError(true);
    }else{
      setError(false);
    }

    if(event.target.value === preUpdateVal){
      setSubmit(false);
    }else{
      setSubmit(true);
    }

    setUsername(event.target.value);
  }

  const saveHandler = event => {
    event.preventDefault();
    setUpdate(!update);
    setSubmit(false);
    updateUsername(props.id,props.token,username);
  }

  const editHandler = event => {
    event.preventDefault();
    setUpdate(!update);
    setError(false);
    setSubmit(false);
    if(update)
      setUsername(data.username);
  }

  return(
      <>
        <div>
          <h3>User Details</h3>
          { loading ? "Token Expired.." :
            <UpdateUser onChange={ onChangeListender } afterUpdate={ finishupdate }
                update={update}  value={username} isInputChanged={ submit } hasError={ error }
                onClick={ editHandler } saveOnClick={ saveHandler }/>
          }
          <div className="updateField">
              <h4>Email Address</h4>
              {
                loading ? "Unable to load.." : <span>{email}</span>
              }
          </div>
        </div>
      </>
  );

}

export default UserDetails;