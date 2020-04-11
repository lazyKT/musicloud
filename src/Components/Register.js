import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';
import { withRouter } from 'react-router-dom';
import Tick from '../Imgs/tick.png';
import Error from '../Imgs/close.png'
import '../App.css'

const valid_icon = {
    width: "15px",
    marginLeft: "10px"
}

const Register_btn_disable = {
    background: "grey",
    color: "white",
    border: "grey"
}

const Register = props => {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ usernameerror, setusernameError ] = useState(null);
    const [ emailerror, setemailError ] = useState(null);
    const [ pwderror, setPwderror] = useState(null);
    const [ pwderror2, setPwderror2] = useState(false);
    const [ ready, setReady ] = useState(false);
    const [ loginOK, setLoginOK ] = useState(false);
    const [ loginUser, setLoginUser ] = useState(null);
    const [ loginReady, setLoginReady ] = useState(false);
    const [ httperror, setHttperror ] = useState(null);

    const Auth = useContext(userContext);

    const setCookies = () => {
        Auth.setAuth(true);
        Cookies.set("user","login");
        Cookies.set("tokens",loginUser);
        setLoginReady(true);
        console.log("All cookies are set!!1");
    }

    useEffect(() => {
        console.log("1st render!!");
        const login = Cookies.get("user");
        const tokens = Cookies.get("tokens");
        if(login && tokens)
            props.history.push("/dashboard");
    },[loginReady])

    useEffect(() => {
        if(loginOK && loginUser){
            // proceed to Home Page
            console.log("Login loz ya p!!");
            setCookies();
        }else{
            console.log("Login loz mya woo");
        }
    },[loginUser])

    const usernameHandler = event => {
        if((event.target.value).length < 4){
            setusernameError(true);
            setReady(false);
          }else{
            setusernameError(false);
            setReady(true);
          }      
          setUsername(event.target.value);
    }

    const emailHandler = event => {
        if(!(event.target.value).includes("@")){
            setemailError(true);
            setReady(false);
          }else{
            setemailError(false);
            setReady(true);
          }      
          setEmail(event.target.value);
    }

    const validatePassword = pwd => {
        let format = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;
        return format.test(pwd);
    }

    const passwordHandler1 = event => {
        if((event.target.value).length < 8){
            setPwderror(true);
            setReady(false);
        }else{
            if(validatePassword(event.target.value)){
                setPwderror(false);
                setReady(true);
            }
        }      
    
        setPassword1(event.target.value);
    }

    const passwordHandler2 = event => {
        if(event.target.value === password1){
            setPwderror2(false);
            setReady(true);
        }else{
            setPwderror2(true);
            setReady(false);
        }
        setPassword2(event.target.value);
    }

    const Performlogin = (username,password) => {
        axios.post("http://127.0.0.1:8000/login",{username, password})
        .then( res => {
            if(res.status === 200){
                setLoginOK(true);
                setLoginUser(res.data);
                console.log(res.data);
            }
      })
    }

     const onSubmitHandler = event => {
         event.preventDefault();
         axios.post('http://127.0.0.1:8000/register',{
                    username,
                    email,
                    password: password1,
                    role: ''
                }).then(response => {
                    if(response.status === 201){
                        Performlogin(username,password1);
                    }
                }).catch(e => {
                    Promise.reject(e.response);
                    setHttperror(e.response.data.msg)
                })
     }

    return(
        <>
            <h4>register</h4>
            <form className="authForm" onSubmit={onSubmitHandler}>
                <input value={ username } name="username" 
                    placeholder="Username" onChange={usernameHandler} required/>
                { usernameerror && <img style={valid_icon} src={Error} alt="Credit to Flaticon" />}
                { !usernameerror && username ? <img style={valid_icon} src={Tick} alt="Credit to Flaticon"/>:null}
                { usernameerror && <span style={{color:'red'}}>Username should have at least 4 charactors!!</span>}    
                <br/>

                <input value={ email } name="email" 
                    placeholder="Email" onChange={emailHandler} required/>
                { emailerror && <img style={valid_icon} src={Error} alt="Credit to Flaticon" />}
                { !emailerror && email ? <img style={valid_icon} src={Tick} alt="Credit to Flaticon"/>:null}
                { emailerror && <span style={{color:'red'}}>Invalid Email</span>}    
                <br/>

                <input value={ password1 } name="password1" type="password"
                    placeholder="Password" onChange={passwordHandler1} required/>
                { pwderror && <img style={valid_icon} src={Error} alt="Credit to Flaticon"/> } 
                { !pwderror && password1 ? <img style={valid_icon} src={Tick} alt="Credit to Flaticon"/> : null} 
                { pwderror && 
                    <span style={{color:'red'}}>
                        Password should have at least 8 charactors, 1 uppercase letter, 1 lowercase and 1 digit.
                    </span>}    
                <br/>

                <input value={ password2 } name="password2" type="password"
                    placeholder="Re-enter Password" onChange={passwordHandler2} required/>
                { pwderror2 && <img style={valid_icon} src={Error} alt="Credit to Flaticon" />}
                { !pwderror2 && password2 ? <img style={valid_icon} src={Tick} alt="Credit to Flaticon"/>:null}
                { pwderror2 && 
                    <span style={{color:'red'}}>
                        Password Doesn't Match!!!
                    </span>}    
                <br/>

                <button disabled={!ready} type="submit" style={ready?null:Register_btn_disable}>
                    Register
                </button>
                {
                    httperror ? 
                    <div>
                        { httperror }
                    </div> : null
                }
            </form>
        </>
    );
} 


export const Validate = (user) => {

    const validation = {
        username: /^(?=.{4,})/,
        email: /^([a-z]|[A-Z]).*$/,
        password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    }

    var returnVal = "pass";

    if (!validation.password.test(user.password))
        returnVal = "Password should have at least 1 uppercase letter, 1 lowercase and 1 digit.";
    else{
        if(!validation.username.test(user.username))
            returnVal ="Username's should have at least 4 charactors!!";
    }
    return returnVal;        
}

export default withRouter(Register);
