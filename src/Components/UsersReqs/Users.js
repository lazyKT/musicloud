import axios from 'axios';


export async function logoutUser(token) {
    //console.log("token", token);
    try {
        const res = await axios.post('http://127.0.0.1:8000/logout', null,
            { headers: { "Authorization": `Bearer ${token}` }});
        console.log(res);
        return res;
    } catch(error) {
        console.log("Error Encountered",error);
        return error;
    }
}


export async function getAvatar(user_id) {
    
    try {
        const response = await axios.get(`http://127.0.0.1:8000/avatar/${user_id}`);
        console.log(response);
        return response.status;
    } catch (err) {
        console.log("Error Encountered", err);
        return err.status;
    }
}