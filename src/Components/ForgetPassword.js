import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'
import { resetPwd } from './Profile/Utils/ChangePassword'


/**
 * The below is the styling of the Forget Password DOM Elements.
 */
const styles = {
    container: {
        width: "40%",
        height: "fit-content",
        margin: "10% auto"
    },
    h1: {
        width: "fit-content",
        margin: "10px auto",
        color: "brown"
    },
    form: {
        padding: "30px",
        border: "brown solid 0.2px",
        borderRadius: "5px",
        background: "coral"
    },
    input: {
        display: "block",
        width: "70%",
        margin: "10px auto",
        lineHeight: "15px",
        border: "coral solid 0.2px",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "18px"
    },
    p: {
        display: "block",
        width: "70%",
        margin: "10px auto",
        lineHeight: "20px",
        fontSize: "18px"
    },
    button: {
        display: "block",
        width: "70%",
        height: "fit-content",
        margin: "20px auto",
        padding: "10px",
        fontSize: "18px",
        border: "coral",
        borderRadius: "5px",
        background: "brown",
        color: "white"
    },
    success: {
        width: "fit-content",
        margin: "auto",
        padding: "10px",
        background: "limegreen",
        borderRadius: "5px",
        color: "white",
    },
    error: {
        width: "fit-content",
        margin: "auto",
        padding: "10px",
        background: "crimson",
        borderRadius: "5px",
        color: "white",
    }
} 

/**
 * This is a helper function to request a password-reset link to the server.
 */
function ForgetPassword() {

    const [ email, setEmail ] = useState('');
    const [ response, setResponse ] = useState(null); // Response Message from reset-password link request
    const [ restype, setResType ] = useState(false); // Response Type: true for success, false for error

    function emailOnChange(event) {
        setEmail(event.target.value);
    }

    async function sendResetLink(event) {
        event.preventDefault();
        console.log(email);
        const res = await resetPwd(email);
        console.log(res);
        if (res.status === 200) {
            setResponse(res.data);
            setResType(true); // Set Response Type to Success
        } else {
            console.log('error');
            setResType(false); // Set Response type to Error
            res.status === 500 ? setResponse(res.data) : setResponse("No User Found, Related to this email address.")
        }
    }

    return (
        <>
            <div className="mainDiv">
                <div style={styles.container}>
                    <h1 style={styles.h1}>Forget Password</h1>
                    <form style={styles.form}>
                        <p style={styles.p}>Enter Your Email Address</p>
                        <input style={styles.input} onChange={ emailOnChange } value={email} name={email}/>
                        <button style={styles.button} onClick={sendResetLink}>Send Password Reset Link</button>
                    </form>
                </div>
                {
                    response && 
                    (<div style={ restype ? (styles.success) : (styles.error)}>{response}</div>)
                }
            </div>
        </>
    )
}

export default withRouter(ForgetPassword)