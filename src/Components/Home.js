import React,{ useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../Contexts/userContext';
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import '../App.css';

function Home(props){
  const [ user, setUser ] = useState({username:'',password:''});
  const [ loginUser, setLoginUser ] = useState(null);
  const [ error, setError ] = useState(null);

  const Auth = useContext(userContext);

  const handleRegister = () => {
    console.log("register clcked!!");
    props.history.push("/register");
  }

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]:event.target.value
    })
  };

  const setCookies = () => {
    Auth.setAuth(true);
    Cookies.set("user","login");
    Cookies.set("tokens",loginUser);
  }

  useEffect(() => {
    console.log(loginUser);
    if(loginUser)
      setCookies();
  },[loginUser])

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(user.username,user.password);
    axios.post("http://127.0.0.1:8000/login",{username: user.username, password: user.password})
      .then( response => {
        const data = response.data;
        setLoginUser(data);
        //performLogin()
      }).catch(error => {
        if (error.response) {
          Promise.reject(error.response);
          setError(error.response.data.msg);
        } else {
          console.log("No Response");
          setError("Failed to connect with Server!!");
        }
      })
  }
  
  return(
    <div className="mainDiv">
      <div className="container">
        <div className="innerDiv">
          <form onSubmit={handleSubmit}>
              <h4 className="registerTitle">Login</h4>
              <input value={ user.username } name="username" 
                  placeholder="Username" onChange={handleChange} required/><br/>
              <input value={ user.password } type="password" name="password" 
                  placeholder="Password" onChange={handleChange} required/><br/>
              <button type="submit">Login</button>
              <button className="registerBtn" onClick={handleRegister}>
                Register
              </button>
              <Link to='/forget-password'>Forget Password?</Link>
              { error ? 
                <div className="errorResponse">
                  { error }
                </div>:null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);