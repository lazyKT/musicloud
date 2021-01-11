import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Contexts/userContext";
import MenuIcon from '@material-ui/icons/Menu';
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
  const [type, setType] = useState("");

  useEffect(() => {
    const tokens = Cookies.get("tokens");
    if (tokens) {
      setType(JSON.parse(tokens).role);
    }
  }, []);

  return (
    <nav className="navBar">
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
                <button className="hamburger">
                    <MenuIcon />
                </button>
                <ul className="right-nav nav-container">         
                    <Link className="nav-element" to="/"><li>Home</li></Link>
                    <Link className="nav-element" to="/contact"><li>Contact</li></Link>
                    <Link className="nav-element" to="/support"><li>Support</li></Link>
                </ul>
          </div>
      )}
    </nav>
  );
};
