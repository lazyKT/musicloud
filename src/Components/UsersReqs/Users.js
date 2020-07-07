import axios from 'axios';


export async function logoutUser(token) {
    console.log(token);
    try {
        const response = await axios.post('http://127.0.0.1:8000/logout', { headers: { "Authorization": `Bearer ${token}` }});
        return response;
    } catch (error) {
        return error;
    }
}