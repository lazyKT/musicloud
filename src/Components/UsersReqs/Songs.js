import axios from 'axios';
import { config } from '../Conf/DevConfig';


/**
 * Fetching User's Songs
 */
export async function fetchMySongsReq(token) {

    console.log(token);
    try {
        const response = await axios.get(`${config.API_URL}/mysongs`, { headers: { "Authorization": `Bearer ${token}` }});
        return response;
    } catch (error) {
        return error;
    }
}
