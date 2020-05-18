import axios from 'axios';

export const PostOpr = async (accessToken, newData) => {

    try {
        console.log(accessToken);
        const response = await axios.post(`http://127.0.0.1:8000/genres`, newData,
        { headers: { "Authorization": `Bearer ${accessToken}` } });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}


export const DeleteOpr = async (accessToken, deleteData) => {

    try {
        const response = await axios.delete(`http://127.0.0.1:8000/genre/${deleteData}`, 
        { headers: { "Authorization": `Bearer ${accessToken}` }});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}

export const EditOpr = async (accessToken, id,updateData) => {
    console.log(accessToken, updateData);
    try {
        const response = await axios.put(`http://127.0.0.1:8000/user/${id}`,
        updateData, { headers: { "Authorization": `Bearer ${accessToken}` }});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

// User Specified Network Requests

export const uploadAvatarOpr = async (accessToken, data) => {

    let headers = { "Authorization": `Bearer ${accessToken}`, "Content-Type": "multipart/form-data"}
    console.log(data);
    try {
        const response = await axios.put(`http://127.0.0.1:8000/upload/avatar`, data, {headers});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const logoutOpr = async accessToken => {
    console.log(accessToken);
    try {
        const response = await axios.post(`http://127.0.0.1:8000/logout`, 
        { headers: { "Authorization": `Bearer ${accessToken}` }});
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    } 
}