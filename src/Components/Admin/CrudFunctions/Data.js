import axios from 'axios';
import { config } from '../../Conf/Config'

const url = config.API_URL;

export const PostOpr = async (accessToken, newData) => {

    try {
        console.log(accessToken);
        const response = await axios.post(`${url}/genres`, newData,
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
        const response = await axios.delete(`${url}/genre/${deleteData}`, 
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
        const response = await axios.put(`${url}/user/${id}`,
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
        const response = await axios.put(`${url}/upload/avatar`, data, {headers});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const logoutOpr = async accessToken => {
    console.log(accessToken);
    try {
        const response = await axios.post(`${url}/logout`, 
        { headers: { "Authorization": `Bearer ${accessToken}` }});
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    } 
}