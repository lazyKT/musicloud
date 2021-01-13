import React, { useContext, useEffect, useState, useRef } from "react";
import Cookies from 'js-cookie';
import { userContext } from "../../Contexts/userContext";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { AdminNav } from "./AdminNav";
import './Navigation.css';
import AuthPopUp from "../Auth/AuthPopUp";
import { logoutUser } from "../UsersReqs/Users";

/**
 * Host Top Navigation Bar Component
 * The contents of navigation bar may vary 
 * depends on the site state (not-log-in, logged-in, admin)
 * This component computes the states at the very start of the render 
 * and define the contents and structure of the navigation bar
 */
export const Nav = () => {


  const {auth, setAuth} = useContext(userContext);
  const navRef = useRef();
  const [type, setType] = useState("");
  const [token, setToken] = useState(null);
  const [showBurger, setShowBurger] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // onClick event on humburger button 
  function burgerClick() {

    setShowBurger(prevState => !prevState);

    navRef.current.classList.toggle('show');

  }

  // handle sign out
  async function handleSignOut() {
    try {
      const response = await logoutUser(token);

      if (response.status === 200) {
        Cookies.remove("user");
        Cookies.remove("tokens");
        setAuth(false);
        window.location.href = "/";
      }
      else {
        throw new Error("Sign Out Failed!");
      }
    }
    catch(error) {
      throw new Error(`Sign Out Failed: ${error}`);
    }
  }  


  useEffect(() => {
    const tokens = Cookies.get("tokens");
  
    if (tokens) {
      setToken(JSON.parse(tokens).access_token);
      setType(JSON.parse(tokens).role);
    }
  }, [auth, type]);

  return (
    <>

      {
      showSignIn && <AuthPopUp close={() => setShowSignIn(false)} />
      }
      
      <nav className="navBar nav">
        { auth &&
          type && type === "admin" ? (
            <AdminNav />
          ) :  (
              // Navigation bar for normal user
              <div className="nav-container">
                  <Link className="left-nav" to="/">MusiCloud</Link>
                  <button className="hamburger" id="humburger" onClick={burgerClick}>
                      {
                        showBurger ? <CloseIcon/> : <MenuIcon/>
                      }
                  </button>
                  <ul className="right-nav nav-container" ref={navRef} id="right-nav">         
                      <Link className="nav-element" to="/"><li>Home</li></Link>
                      <Link className="nav-element" to="/contact"><li>Contact</li></Link>
                      {
                        auth && type &&
                        <Link className="nav-element" to="/profile"><li>Profile</li></Link>
                      }
                      <div className="btn-container">
                        { auth && type ?
                          <button 
                            className="btn"
                            onClick={handleSignOut}>
                            Sign Out
                          </button>
                          :
                          <button className="btn"
                            onClick={() => {
                              burgerClick();
                              setShowSignIn(true);
                            }}
                          >
                              Sign Up
                          </button>
                        }
                      </div>
                  </ul>
            </div>
        )}
      </nav>
    </>
  );
};
