import axios from 'axios';
import { useState } from 'react';

export const tokenRefresh = async (pwd, refreshToken) => {

    console.log(pwd, refreshToken);

    try {
        const response = await axios.post(`http://127.0.0.1:8000/refresh`, {password: pwd}, 
        { headers: { "Authorization": `Bearer ${refreshToken}` } });
        console.log(response);
        return response.data.access_token;
    } catch(error) {
        console.log(error);
        return error.response ? error.response : "Server Faulted!!";
    }
}

export const changePwd = async (authToken, id, newPwd) => {
    console.log(authToken, id, newPwd);

    try {
        const response = await axios.put(`http://127.0.0.1:8000/changepwd/${id}`, {new_pwd: newPwd},
        { headers: { "Authorization": `Bearer ${authToken}` } });
        console.log(response);
    } catch (error) {
        console.log(error);
        return error.response ? error.response : "Server Fault!!!";
    }
}