import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "../Contexts/userContext";
// import { config } from "./Conf/Config";
import Cookies from "js-cookie";
import { Link, withRouter } from "react-router-dom";
import "../App.css";
import Footer from "./Footer";

/**
 * Styling for Home DOM Elments
 */
const styles = {
  loginDiv: {
    width: "350px",
    margin: "auto",
    padding: "20px"
  },
  form: {
    border: "gray solid 0.2px",
    padding: "20px",
    borderRadius: "10px"
  },
  UsernameLabel: {
    fontSize: "15px",
    fontWeight: "800"
  },
  PwdLabel: {
    display: "inline",
    width: "fit-content",
    fontSize: "15px",
    fontWeight: "800",
    margin: "10px 0px",
    float: "left"
  },
  ForgetPwd: {
    display: "inline",
    width: "fit-content",
    fontSize: "15px",
    fontWeight: "800",
    color: "coral",
    margin: "10px 0px",
    float: "right"
  },
  input: {
    display: "block",
    width: "100%",
    height: "30px",
    lineHeight: "20px",
    fontSize: "15px",
    padding: "5px",
    border: "gray solid 0.2px",
    borderRadius: "5px",
    boxSizing: "border-box"
  },
  pre: {
    display: "inline",
    fontSize: "15px",
    fontFamily: "sans-serif"
  },
  error: {
    margin: "10px auto",
    height: "max-content",
    padding: "5px 15px",
    background: "firebrick",
    border: "0.1px solid",
    borderRadius: "5px",
    color: "white",
    fontSize: "13px",
    width: "fit-content"
  }
};

/**
 * Home Function. Sign In Page
 */
function Home() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginUser, setLoginUser] = useState(null);
  const [error, setError] = useState(null);

  const Auth = useContext(userContext);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const setCookies = () => {
    Auth.setAuth(true);
    Cookies.set("user", "login");
    Cookies.set("tokens", loginUser);
  };

  useEffect(() => {
    console.log(loginUser);
    if (loginUser) setCookies();
  }, [loginUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("https://www.musicloud-api.site/login", {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        const data = response.data;
        setLoginUser(data);
      })
      .catch((error) => {
        if (error.response) {
          Promise.reject(error.response);
          setError(error.response.data.msg);
        } else {
          console.log("No Response");
          setError("Failed to connect with Server!!");
        }
      });
  };

  /**
   * Rendering
   */
  return (
    <div className="mainDiv">
      <div style={styles.loginDiv}>
        <div className="innerDiv">
          {process.env.REACT_APP_API_URL}
          <h4 className="registerTitle">Welcome to MusiCloud</h4>
          {error ? <div style={styles.error}>{error}</div> : null}
          <form style={styles.form} onSubmit={handleSubmit}>
            <p style={styles.UsernameLabel}>Username or email address</p>
            <input
              style={styles.input}
              value={user.username}
              name="username"
              onChange={handleChange}
              required
            />
            <p style={styles.PwdLabel}>Password</p>
            <Link to="/forget-password" style={styles.ForgetPwd}>
              Forget Password?
            </Link>
            <input
              style={styles.input}
              value={user.password}
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {/* Link To register */}
            <pre style={styles.pre}>New to MusiCloud? </pre>
            <Link to="/register">Create Account...</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(Home);
