import axios from 'axios';
import { config } from '../Config';


/**
 * Fetching User's Songs
 */
export async function fetchMySongsReq(token) {

    console.log(token);
    try {
        const response = await axios.get(`http://13.212.2.7/mysongs`, { headers: { "Authorization": `Bearer ${token}` }});
        return response;
    } catch (error) {
        return error;
    }
}
