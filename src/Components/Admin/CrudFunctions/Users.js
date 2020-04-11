import axios from 'axios';

export const CreateOpr = async NewUser => {
    const { username, email, password, role } = NewUser;
    try {
        const response = await axios.post(`http://127.0.0.1:8000/register`, { username, email, password, role });
        return response;
    }
    catch (error) {
        console.log(error.reponse);
        return error.response;
    }
}

export const UpdateOpr = async (accessToken, updatedUser) => {
    const { id, username, email } = updatedUser;
    try {
        const resposne = await axios.put(`http://127.0.0.1:8000/user/${id}`,
        {username, email}, { headers: { "Authorization": `Bearer ${accessToken}` }});
        return resposne;
    }
    catch (error) {
        return error.response;
    } 
}

export const DeleteOpr = async (accessToken, index, Users) => {

    const { id } = Users[index];

    try {
        const response = await axios.delete(`http://127.0.0.1:8000/user/${id}`, 
            { headers: { "Authorization": `Bearer ${accessToken}` } });
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error.response.data);
        return error.response;
    }
}
