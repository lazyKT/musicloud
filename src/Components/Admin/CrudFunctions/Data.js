import axios from 'axios';

export const PostOpr = async (accessToken, newData) => {

    try {
        const response = await axios.post(`http://127.0.0.1:8000/genres`, newData,
        { headers: { "Authorization": `Bearer ${accessToken}` } });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}


export const DeleteOpr = async (accessToken, deleteData) => {
    console.log(deleteData);
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