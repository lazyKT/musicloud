import React, { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../../Contexts/userContext";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { AdminNav } from "./AdminNav";
import { UesrNav } from "./UserNav";
import './Navigation.css';
import Cookies from "js-cookie";

/**
 * Host Top Navigation Bar Component
 * The contents of navigation bar may vary 
 * depends on the site state (not-log-in, logged-in, admin)
 * This component computes the states at the very start of the render 
 * and define the contents and structure of the navigation bar
 */
export const Nav = () => {


  const Auth = useContext(userContext);
  const navRef = useRef();
  const [type, setType] = useState("");
  const [showBurger, setShowBurger] = useState(false);

  // onClick event on humburger button 
  function burgerClick() {

    setShowBurger(prevState => !prevState);

    navRef.current.classList.toggle('show');

  }


  useEffect(() => {
    const tokens = Cookies.get("tokens");
    if (tokens) {
      setType(JSON.parse(tokens).role);
    }
  }, []);

  return (
    <nav className="navBar nav">
      {Auth.auth ? (
        type && type === "admin" ? (
          <AdminNav />
        ) : (
          <UesrNav />
        )
      ) : (
            // Navigation bar when the user not log in
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
                    <Link className="nav-element" to="/support"><li>Support</li></Link>
                </ul>
          </div>
      )}
    </nav>
  );
};
