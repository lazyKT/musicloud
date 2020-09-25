import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { userContext } from "../Contexts/userContext";
import { withRouter } from "react-router-dom";
import Tick from "../Imgs/tick.png";
import Error from "../Imgs/close.png";
import "../App.css";
import { RegisterForm } from "./RegisterForm";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameerror, setusernameError] = useState(null);
  const [emailerror, setemailError] = useState(null);
  const [pwderror, setPwderror] = useState(null);
  const [pwderror2, setPwderror2] = useState(false);
  const [ready, setReady] = useState(false);
  const [loginOK, setLoginOK] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [loginReady, setLoginReady] = useState(false);
  const [httperror, setHttperror] = useState(null);
  const [msg, setMsg] = useState(null);

  const Auth = useContext(userContext);

  const setCookies = () => {
    Auth.setAuth(true);
    Cookies.set("user", "login");
    Cookies.set("tokens", loginUser);
    setLoginReady(true);
    console.log("All cookies are set!!1");
  };

  // onClick Event on Back to Home Button
  const backBtnClick = (e) => {
    console.log("Back Button Clicked");
    e.preventDefault();
    props.history.push("/");
  };

  // Register Button Click Event
  const handleRegister = (e, data) => {
    e.preventDefault();
    console.log("Register Payload", data);
  };

  useEffect(() => {
    console.log("1st render!!");
    const login = Cookies.get("user");
    const tokens = Cookies.get("tokens");
    if (login && tokens) props.history.push("/dashboard");
  }, [loginReady]);

  useEffect(() => {
    if (loginOK && loginUser) {
      // proceed to Home Page
      console.log("Login loz ya p!!");
      setCookies();
    } else {
      console.log("Login loz mya woo");
    }
  }, [loginUser]);

  return (
    <>
      <div className="mainDiv">
        <h4 className="registerTitle">Registeration</h4>
        <RegisterForm backFunc={backBtnClick} regFunc={handleRegister} />
      </div>
    </>
  );
};

export default withRouter(Register);
