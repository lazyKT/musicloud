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
    title: "Email Address"
  },
  {
    name: "username",
    title: "Username"
  },
  {
    name: "password",
    title: "Password"
  },
  {
    name: "cPwd",
    title: "Confirm Password"
  }
];

export const RegisterForm = (props) => {
  const regBtn = useRef("");
  const backBtn = useRef("");

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
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

  // initial render
  useEffect(() => {
    //regBtn && toggleRegBtn(false);
  }, []);

  return (
    <>
      <form style={styles.form}>
        {inputs.map((input, idx) => (
          <RegisterInput
            name={input.name}
            title={input.title}
            key={idx}
            setPayload={setPayload}
          />
        ))}

        {/** Back to Home */}
        <button
          style={styles.backToHome}
          ref={backBtn}
          onMouseEnter={() => (backBtn.current.style.background = "#d3d3d3")}
          onMouseLeave={() => (backBtn.current.style.background = "#fff")}
        >
          Back to Home
        </button>
        {/** Register Button */}
        <button
          style={styles.registerBtn}
          ref={regBtn}
          onMouseEnter={() => (regBtn.current.style.background = "green")}
          onMouseLeave={() => (regBtn.current.style.background = "lightgreen")}
        >
          Register
        </button>
      </form>
    </>
  );
};
