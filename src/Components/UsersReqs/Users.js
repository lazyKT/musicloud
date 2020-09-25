import axios from "axios";

// register new use
export async function registerUser(data) {
  const { email, username, password, role } = data;

  try {
    const response = await axios.post("http://127.0.0.1:8000/register", {
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

// Log out user from API
export async function logoutUser(token) {
  //console.log("token", token);
  try {
    const res = await axios.post("http://127.0.0.1:8000/logout", null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log("Error Encountered", error);
    return error;
  }
}

// get user's avatar
export async function getAvatar(user_id) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/avatar/${user_id}`);
    console.log(response);
    return response.status;
  } catch (err) {
    console.log("Error Encountered", err);
    return err.status;
  }
}
