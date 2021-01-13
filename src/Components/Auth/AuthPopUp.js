/**
 * Sign Up New Account
 */
import React from 'react';
import SignUp from './SignUp';
import './Auth.css';
import SignIn from './SignIn';
import CloseIcon from '@material-ui/icons/Close';


function AuthPopUp({ close }) {

    const signInRef = React.useRef();
    const signUpRef = React.useRef();
    const [menu, setMenu] = React.useState("sign-in");


    const chooseMenu = menu => {
        if (menu === "sign-up") {
            signUpRef.current.style.backgroundColor = '#192841';
            signUpRef.current.style.color = 'rgb(89, 98, 223)';
            signInRef.current.style.backgroundColor = '#112034';
            signInRef.current.style.color = 'white';
            setMenu("sign-up");
        }
        else {
            signInRef.current.style.backgroundColor = '#192841';
            signInRef.current.style.color = 'rgb(89, 98, 223)';
            signUpRef.current.style.backgroundColor = '#112034';
            signUpRef.current.style.color = 'rgb(255, 255, 255)';
            setMenu("sign-in");
        }
    }


    React.useEffect(() => {

        chooseMenu(menu);
            
    }, [menu]);


    return (
        <>  
            <div className="auth">
                <div className="auth-container">

                <button className="close-btn" onClick={close}>
                    <CloseIcon/>
                </button>
                <div className="auth-menu">

                    <div 
                        className="menu-item"
                        ref={signInRef}
                        onClick={() => setMenu("sign-in")}>
                        Sign In
                    </div>

                    <div 
                        className="menu-item"
                        ref={signUpRef}    
                        onClick={() => setMenu("sign-up")}>
                        Sign Up
                    </div>
                
                </div>
                <div>
                    {
                        menu === "sign-in" ?
                        <SignIn/> : 
                        <SignUp/>
                    }
                </div>

                </div>
            </div>
        </>
    )
}


export default AuthPopUp;