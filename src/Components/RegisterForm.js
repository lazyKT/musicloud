import React, { useState, useRef, useEffect } from "react";
import RegisterInput from "./RegisterInput";

// Styling for Registeration Components
const styles = {
  form: {
    width: "300px",
    padding: "20px",
    display: "block",
    margin: "auto",
    border: "solid 0.5px",
    borderRadius: "10px"
  },
  backToHome: {
    width: "50%",
    height: "30px",
    margin: "10px auto",
    border: "none",
    background: "white"
  },
  registerBtn: {
    width: "50%",
    height: "30px",
    margin: "10px auto",
    background: "lightgreen",
    border: "solid 0.2px lightgreen",
    borderRadius: "5px",
    color: "#fff"
  },
  msg: {
    width: "200px",
    fontSize: "13px",
    color: "white",
    background: "coral",
    padding: "10px"
  }
};

/** Input Fields */
const inputs = [
  {
    name: "email",
    title: "Email Address",
    ready: false
  },
  {
    name: "username",
    title: "Username",
    ready: false
  },
  {
    name: "password",
    title: "Password",
    ready: false
  },
  {
    name: "cPwd",
    title: "Confirm Password",
    ready: false
  }
];

export const RegisterForm = ({ backFunc, regFunc }) => {
  const regBtn = useRef("");
  const backBtn = useRef("");

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    cPwd: "",
    role: "user"
  });

  const toggleRegBtn = (enable) => {
    if (!enable) {
      regBtn.current.style.background = "#d3d3d3";
      regBtn.current.style.border = "none";
      regBtn.current.disabled = true;
    } else {
      regBtn.current.style.background = "lightgreen";
      regBtn.current.style.border = "solid 0.2px lightgreen";
      regBtn.current.disabled = false;
    }
  };

  // setPayload for registration Network Request
  const setPayload = (key, value) => {
    console.log("setPayload for", key);
    setData({
      ...data,
      [key]: value
    });
  };

  // check if the registration data are ready for the Network Post Requests
  const checkDataReady = () => {
    const dataArr = Object.values(data);
    console.log(dataArr);
    return dataArr.every((value) => value !== "");
  };

  // Register Button Click Event
  const handleRegister = (e) => {
    console.log("Ready to register", data);
  };

  // run Effects on "data" change
  useEffect(() => {
    console.log("register render");
    if (regBtn) {
      checkDataReady() ? toggleRegBtn(true) : toggleRegBtn(false);
    }
  }, [data]);

  return (
    <>
      <form style={styles.form}>
        {inputs.map((input, idx) => (
          <RegisterInput
            name={input.name}
            title={input.title}
            key={idx}
            pwd={input.name === "cPwd" && data.password}
            setPayload={setPayload}
          />
        ))}

        {/** Back to Home */}
        <button
          style={styles.backToHome}
          ref={backBtn}
          onClick={(e) => backFunc(e)}
          onMouseEnter={() => (backBtn.current.style.background = "#f9f9f9")}
          onMouseLeave={() => (backBtn.current.style.background = "#fff")}
        >
          Back to Home
        </button>
        {/** Register Button */}
        <button
          style={styles.registerBtn}
          ref={regBtn}
          onClick={(e) => regFunc(e, data)}
          onMouseEnter={() =>
            checkDataReady() && (regBtn.current.style.background = "green")
          }
          onMouseLeave={() =>
            checkDataReady() && (regBtn.current.style.background = "lightgreen")
          }
        >
          Register
        </button>
      </form>
    </>
  );
};
