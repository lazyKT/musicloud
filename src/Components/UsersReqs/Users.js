import axios from 'axios';


export async function logoutUser(token) {
    console.log("token", token);
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