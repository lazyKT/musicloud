import React, { useState, useRef, useEffect } from "react";

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
  input: {
    display: "block",
    minWidth: "150px",
    width: "100%",
    lineHeight: "20px",
    padding: "5px 10px",
    margin: "5px auto",
    border: "solid 1px #d3d3d3",
    borderRadius: "5px",
    boxSizing: "border-box"
  },
  title: {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold"
  },
  error: {
    display: "block",
    width: "fit-content",
    paddingLeft: "5px",
    paddingRight: "5px",
    background: "lightcoral",
    fontSize: "13px",
    borderRadius: "5px",
    color: "#fff"
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

export const RegisterForm = (props) => {
  const regBtn = useRef("");
  const backBtn = useRef("");

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

  // initial render
  useEffect(() => {
    //regBtn && toggleRegBtn(false);
  }, []);

  return (
    <>
      <form style={styles.form}>
        {/* Email Address */}
        <span style={styles.title}>Email Address</span>
        <span style={styles.error}>Error</span>
        <input style={styles.input} />
        {/* Username */}
        <span style={styles.title}>Email Address</span>
        <span style={styles.error}>Error</span>
        <input style={styles.input} />
        {/* Password */}
        <span style={styles.title}>Email Address</span>
        <span style={styles.error}>Error</span>
        <input style={styles.input} />
        {/* Confirm Password */}
        <span style={styles.title}>Email Address</span>
        <span style={styles.error}>Error</span>
        <input style={styles.input} />

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
