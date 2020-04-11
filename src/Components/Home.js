import React,{ useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../Contexts/userContext';
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';
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

  const performLogin = () => {
    //save login state
    Auth.setAuth(true);
    Cookies.set("user","login");
  }

  const setCookies = () => {
    Cookies.set("tokens",loginUser);
  }

  useEffect(() => {
    setCookies();
  })

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(user.username,user.password);
    axios.post("http://127.0.0.1:8000/login",{username: user.username, password: user.password})
      .then( response => {
        const data = response.data;
        setLoginUser(data);
        performLogin()
      }).catch(error => {
        Promise.reject(error.response);
        setError(error.response.data.msg);
      })
  }
  
  return(
    <>
        <form className="authForm" onSubmit={handleSubmit}>
            <input value={ user.username } name="username" 
                placeholder="Username" onChange={handleChange} required/><br/>
            <input value={ user.password } type="password" name="password" 
                placeholder="Password" onChange={handleChange} required/><br/>
            <button type="submit">Login</button>
            <button className="registerBtn" onClick={handleRegister}>
              Register
            </button>
            { error ? 
              <div className="errorResponse">
                { error }
              </div>:null}
        </form>
    </>
  );
}

export default withRouter(Home);