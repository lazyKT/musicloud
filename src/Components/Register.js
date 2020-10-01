import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { userContext } from "../Contexts/userContext";
import { withRouter } from "react-router-dom";
import "../App.css";
import { RegisterForm } from "./RegisterForm";
import { registerUser } from "./UsersReqs/Users";
import Footer from "./Footer";

// styling for Register Component
const styles = {
  registerDiv: {
    marginTop: "70px",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  errorDiv: {
    display: "block",
    width: "300px",
    height: "30px",
    margin: "10px auto",
    padding: "0px 20px",
    background: "lightcoral",
    borderRadius: "5px"
  },
  successDiv: {
    display: "block",
    width: "300px",
    height: "fit-content",
    margin: "10px auto",
    padding: "0px 20px",
    background: "lightgreen",
    borderRadius: "5px"
  },
  message: {
    padding: "5px",
    fontSize: "14px"
  }
};

// Register new user
const Register = (props) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  // const [loginOK, setLoginOK] = useState(false);
  // const [loginUser, setLoginUser] = useState(null);
  // const [loginReady, setLoginReady] = useState(false);

  const Auth = useContext(userContext);

  // const setCookies = () => {
  //   Auth.setAuth(true);
  //   Cookies.set("user", "login");
  //   Cookies.set("tokens", loginUser);
  //   setLoginReady(true);
  //   console.log("All cookies are set!!1");
  // };

  // onClick Event on Back to Home Button
  const backBtnClick = (e) => {
    console.log("Back Button Clicked");
    e.preventDefault();
    props.history.push("/");
  };

  // Register Button Click Event
  const handleRegister = async (e, data) => {
    e.preventDefault();
    console.log("Register Payload", data);
    try {
      const response = await registerUser(data);
      console.log("response");
      if (response.status === 201) {
        console.log("register ok");
        setError(null);
        setSuccess(true);
      } else {
        setSuccess(null);
        response ? setError(response.data.msg) : setError("Network Error!");
      }
    } catch (error) {
      console.log("error", error);
      setSuccess(false);
      if (error.response) setError("Non Network Error!");
      else setError("Network Error");
    }
  };

  // useEffect(() => {
  //   console.log("1st render!!");
  //   const login = Cookies.get("user");
  //   const tokens = Cookies.get("tokens");
  //   if (login && tokens) props.history.push("/dashboard");
  // }, [loginReady]);

  // useEffect(() => {
  //   if (loginOK && loginUser) {
  //     // proceed to Home Page
  //     console.log("Login loz ya p!!");
  //     setCookies();
  //   } else {
  //     console.log("Login loz mya woo");
  //   }
  // }, [loginUser]);

  return (
    <>
      <div className="mainDiv">
        <h4 className="registerTitle">Registeration</h4>
        {error && (
          <div style={styles.errorDiv}>
            <span style={styles.message}>Error! {error}</span>
          </div>
        )}

        {success && (
          <div style={styles.successDiv}>
            <span style={styles.message}>Success! {success}</span>
          </div>
        )}

        <RegisterForm backFunc={backBtnClick} regFunc={handleRegister} />
        <Footer />
      </div>
    </>
  );
};

export default withRouter(Register);
