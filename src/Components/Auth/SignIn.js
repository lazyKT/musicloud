/**
 * Sign In to the app
 */

import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import './Auth.css';
import { loginUserReq } from '../UsersReqs/Users';
import { userContext } from '../../Contexts/userContext';


function SignIn() {

    // Auth Context
    const Auth = useContext(userContext);
    // login user
    const [ user, setUser ] = useState({
        username: '',
        password: ''
    });
    // destructuring user state
    const { username, password } = user;
    // const [ signinData, setSigninData ] = useState(null);
    const [ error, setError ] = useState(null);
    // loading state during sign in process
    const [ loading, setLoading ] = useState(false);

    async function handleLoginClick(event) {
        event.preventDefault();

        if (username === '' || password === '')
            return;

        setLoading(true);
        try {
            const response = await loginUserReq(username, password);
            
            if (response.status === 200) {
                setError(null);
                
                setUser({username: '', password: ''});
                Auth.setAuth(true);
                Cookies.set("user", "login");
                Cookies.set("tokens", response.data);
                window.location.href = '/dashboard';
            }
            else 
                response ? setError(response.data.msg) : setError("Network Error!");
              
        }
        catch (error) {
            if (error.response) 
                setError(error.response.data.msg);
            else 
                setError("Network Error");
        }
        setLoading(false);
    }


    // // effect refresh on loginData changes
    // useEffect(() => {
    //     if (signinData !== null) {
    //         // set cookies and login user
    //         (function() {
    //             Auth.setAuth(true);
    //             Cookies.set("user", "login");
    //             Cookies.set("tokens", signinData);
    //             window.location.href = '/dashboard';
    //         })()
    //     }
    //     setSigninData(null);
    // }, [signinData, Auth]);
    

    return (
        <>
            <h3 className="auth-header">Sign in to MusiCloud</h3>
            {
                error !== null && 
                <span className="auth-error">
                    {error}
                </span>
            }
            <form className="auth-form">
            
                <span>Username</span>
                <input 
                    value={username} 
                    name="username" 
                    onChange={e => setUser({ ...user, [e.target.name] : e.target.value})}/>


                <span>Password</span>
                <input 
                    value={password} 
                    name="password" 
                    type="password"
                    onChange={e => setUser({ ...user, [e.target.name] : e.target.value})}/>

                <button onClick={handleLoginClick}>
                    { loading ? "Loading ..." : "Sign in" }
                </button>

                <a href='/forget-password'>
                    <p className="forgot-password">Forget Password?</p>
                </a>

            </form>

        </>
    )
} 



export default SignIn;
