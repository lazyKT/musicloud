/**
 * Input Component for Registeration Form
 */
import React, { useState } from "react";
import { validate, Messages } from "./RegisterValidation";

const styles = {
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
  }
};

function RegisterInput(props) {
  const { name, title, setPayload } = props;

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // handle onChange Event of Input Element
  const handleOnChange = (event) => {
    setValue(event.target.value);
    if (name !== "cPwd" && validate(name, event.target.value)) {
      setError(false);
      setPayload(name, event.target.value);
    } else {
      setError(true);
      setErrMsg(Messages[name]);
    }
  };

  // render
  return (
    <>
      <span style={styles.title}>{title}</span>
      {error && <span style={styles.error}>{errMsg}</span>}
      <input
        style={styles.input}
        name={name}
        value={value}
        onChange={handleOnChange}
        type={name === "password" || name === "cPwd" ? "password" : "text"}
      />
    </>
  );
}

export default RegisterInput;
