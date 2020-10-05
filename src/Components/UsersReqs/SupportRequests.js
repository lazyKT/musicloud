import axios from 'axios';


const url = "http://127.0.0.1:800/"

/** Reporting issues or Feedback Suggestions Requests */
export default async function ReportRequests(data) {

    // const { email, title, subject, type } = data;

    try {
        const response = await axios.post(`${url}report`, data);
        console.log('Response', response);
        return response;
    } catch (error) {
        console.log('error encountered', error);
        return error.response;
    }
}