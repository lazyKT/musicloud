import axios from 'axios';

export const tokenRefresh = async (pwd, refreshToken) => {

    try {
        const response = await axios.post(`http://127.0.0.1:8000/refresh`, {password: pwd}, 
        { headers: { "Authorization": `Bearer ${refreshToken}` } });
        return response.data.access_token;
    } catch(error) {
        return error.response ? error.response : "Server Faulted!!";
    }
}

export const changePwd = async (authToken, id, newPwd) => {

    try {
        const response = await axios.put(`http://127.0.0.1:8000/changepwd/${id}`, {password: newPwd},
        { headers: { "Authorization": `Bearer ${authToken}` } });
        return response;
    } catch (error) {
        return error.response ? error.response : "Server Fault!!!";
    }
}