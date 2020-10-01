import axios from 'axios';

const url = 'https://www.musicloud-api.site/';
// const url = 'http://127.0.0.1:8000/';

/* 
: This is a helper function to Post a video url for the conversion of mp3
: This function takes song object which includes video url, song title, posted user_id
: The server takes the video url and convert to mp3 file with the help of youtube-dl python
*/
export async function postSongForProcess(song, token) {

    const { title, user_id } = song;
    console.log(token);

    try {
        const res = await axios.post(`${url}process`,
            {url: song.url, title, posted_by: user_id, genre_id: 1},
            { headers: { "Authorization": `Bearer ${token}` }});
        //console.log(res);
        return res;
    } catch(error) {
        console.log(error);
        return error;
    }

}

/*
: This is a helper function to check the conversion status of a song on the server.
: This is a 'GET' request.
: This function takes task_id(conversion_id) and check the conversion status on the server.
*/
export async function checkTaskStatus(task_id, token) {
    try {
        const res = await axios.get(`${url}mp3Convert/status/${task_id}`,
            { headers: { "Authorization": `Bearer ${token}` }});
        //console.log(res)
        return res;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Fetching User's Songs
 */
export async function fetchMySongsReq(token) {

    try {
        const response = await axios.get(`${url}mysongs`, { headers: { "Authorization": `Bearer ${token}` }});
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}


/**
 * Get A Song's Blob Data from server to play
 */
export async function getSong(id) {
    const songurl = `${url}listen/${id}`;
    //console.log("url", url);
    try {
        const response = await axios.get(songurl, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'audio/mp3'
            }
        });
        console.log(response);
        const blob = new Blob([response.data], {
            type: 'audio/mpeg'
        });
        const bloburl = URL.createObjectURL(blob);
        console.log("url", bloburl)
        return bloburl;
    } catch (error) {
        console.log("get song error", error);
    }
}