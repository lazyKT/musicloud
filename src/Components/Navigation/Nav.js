import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Contexts/userContext";
import { PublicNav } from "./PublicNav";
import { AdminNav } from "./AdminNav";
import { UesrNav } from "./UserNav";
import Cookies from "js-cookie";
//import '../../App.css';

/**
 * Navigation Styles
 */
const styles = {
  navBar: {
    display: "flex",
    background: "black",
    color: "wheat",
    width: "100%",
    position: "fixed",
    top: "0",
    paddingBottom: "10px",
    height: "50px"
  }
};

export const Nav = () => {
  //console.log(props);

  const Auth = useContext(userContext);
  const [type, setType] = useState("");

  useEffect(() => {
    const tokens = Cookies.get("tokens");
    if (tokens) {
      setType(JSON.parse(tokens).role);
    }
  });

  return (
    <nav style={styles.navBar}>
      {Auth.auth ? (
        type && type === "admin" ? (
          <AdminNav />
        ) : (
          <UesrNav />
        )
      ) : (
        <PublicNav />
      )}
    </nav>
  );
};
