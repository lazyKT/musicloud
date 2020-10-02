/**
 * Network Requests related to users
 */
import axios from "axios";

// const url = 'https://musicloud-api.site/';
const url = "http://127.0.0.1:8000/"

// register new user
export async function registerUser(data) {
  const { email, username, password, role } = data;

  try {
    const response = await axios.post(`${url}register`, {
      email,
      username,
      password,
      role
    });
    return response;
  } catch (err) {
    console.log("Error Encoutered : ", err.response);
    return err.response;
  }
}


// log in user
export async function loginUserReq(username, password) {

  try {
    const response = await axios.post(`${url}login`, {
      username, password
    });
    return response;
  } catch(error) {
    console.log('Error Encountered', error);
    return error.response;
  }
}


// Log out user from API
export async function logoutUser(token) {
  //console.log("token", token);
  try {
    const res = await axios.post(`${url}logout`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log("Error Encountered", error);
    return error;
  }
}

// edit username, email, etc ..
export async function editUser(accessToken, id, updateData) {
  try {
    const response = await axios.put(`${url}/user/${id}`,
    updateData, { headers: { "Authorization": `Bearer ${accessToken}` }});
    console.log(response);
    return response;
} catch (error) {
    console.log(error);
    return error.response;
}
}

// get user's avatar
export async function getAvatar(user_id) {
  try {
    const response = await axios.get(`${url}avatar/${user_id}`);
    console.log(response);
    return response.status;
  } catch (err) {
    console.log("Error Encountered", err);
    return err.status;
  }
}

// upload user's avatar
export const uploadAvatarReq = async (accessToken, data) => {

  let headers = { "Authorization": `Bearer ${accessToken}`, "Content-Type": "multipart/form-data"}
  console.log(data);
  try {
      const response = await axios.put(`${url}/upload/avatar`, data, {headers});
      console.log(response);
      return response;
  } catch (error) {
      console.log(error);
  }
}
