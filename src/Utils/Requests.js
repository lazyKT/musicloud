
/**********************************************************
 * This file contains all the network requests to the API.* 
 **********************************************************/

import axios from 'axios';


/*
 * This is a Sign In request to the app.
 */                    
export async function SignIn(user)
{   
    const { username, password } = user;

    try 
    {
        const response = await axios.post('http://127.0.0.1:8000/login', {username, password});
        return response;
    }
    catch (error)
    {
        console.log(error);
        return error;
    }
}


/**
 * This is a Sign Up request into the app.
 */
export async function SignUp(user) 
{
    const { username, email, password, role } = user;
    try 
    {
        const response = await axios.post('http://127.0.0.1:8000/register', { username, email, password, role });
        console.log(response);
        return response;
    }  
    catch (error)
    {
        console.log(error);
        return error;
    }
}


/**
 * This ia a Sign Out request from the app.
 */
export async function SignOut(token)
{
    try
    {
        const response = await axios.post(
            'http://127.0.0.1:8000/logout',
            {
                headers: { "Authorization" : `Bearer ${token}` }
            }
        );

        console.log(response);

        return response;
    }   
    catch (error)
    {
        console.log(error);
        return error;
    }
}




