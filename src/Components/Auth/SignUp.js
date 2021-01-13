/**
 * Sign Up new user
 */
import React, { useState, useContext } from 'react';
import './Auth.css';
import Cookies from 'js-cookie';
import { registerUser, loginUserReq } from '../UsersReqs/Users';
import { userContext } from '../../Contexts/userContext';


function SignUp () {    

    // auth contexty
    const { setAuth } = useContext(userContext);
    // registraion data
    const [ user, setUser ] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    const [ error, setError ] = useState(null);
    // loading state during registration process
    const [ loading, setLoading ] = useState(false);
    // destruturing user state
    const { username, email, password } = user;

    // handle onChange event
    const handleInputOnChange = (event) => {

        setUser({
            ...user,
            [event.target.name] : event.target.value
        });
    }

    const validateInputs = () => {
        const email_rgx = /(\S|\s)+@\S+\.\S+/;
        if (username.length < 3) 
            return "Username must have at least 3 charactors!";

        if (! email_rgx.test(email))
            return "Invalid Email Format!";
        
        if (password.length < 8)
            return "Password should have at least 8 charactors!"

        return "success";
    }

    // perform signin on successful registration
    const signIn = async (username, password) => {

        try {
            const response = await loginUserReq(username, password);
            console.log(' sign in response', response);
            if (response.status === 200 && response.data != null) {
                setAuth(response.data);
                Cookies.set("user", "login");
                Cookies.set("tokens", response.data);
                window.location.href = '/dashboard';
            }
            else 
                throw new Error('Authentication Error!!!');
        }
        catch (error) {
            console.error('Sign In Error!');
        }

    };


    // handle register click event
    const handleRegisterOnClick = async event => {
        event.preventDefault();
        setLoading(true);
        const validation = validateInputs();

        // validation failed
        if (validation !== "success") {
            setError(validation);
            setLoading(false);
            return;
        }
            
        // register user
        try {
            const response = await registerUser(user);

            if (response.status === 201) {
                // success
                setError(null);
                await signIn(username, password);
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


    return (
        <>
            <h3 className="auth-header">Sign Up to MusiCloud</h3>
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
                    onChange={e => handleInputOnChange(e)}/>

                <span>Email Address</span>
                <input 
                    value={email} 
                    name="email" 
                    onChange={e => handleInputOnChange(e)}/>

                <span>Password</span>
                <input 
                    value={password} 
                    name="password" 
                    type="password"
                    onChange={e => handleInputOnChange(e)}/>

                <button onClick={handleRegisterOnClick}>
                    {loading ? "Loading ..." : "Register"}
                </button>
            </form>
        </>
    )
}


export default SignUp;