import axios from 'axios';
import { config } from '../Conf/DevConfig';


/**
 * Fetching User's Songs
 */
export async function fetchMySongsReq(token) {

    try {
        console.log("success", token);
        const response = await axios.get('http://127.0.0.1:8000/mysongs', { headers: { "Authorization": `Bearer ${token}` }});
        return response;
    } catch (error) {
        console.log("error",token);
        return error;
    }
}
