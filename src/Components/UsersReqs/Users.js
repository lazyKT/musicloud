import axios from 'axios';


export async function logoutUser(token) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/mysongs', { headers: { "Authorization": `Bearer ${token}` }});
        return response;
    } catch (error) {
        return error;
    }
}