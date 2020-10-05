import React from 'react';
import { Link } from 'react-router-dom';

// Styling for nav elements
const styles = {
    ul: {
        display: "flex",
        width: "50%",
        height: "80px",
        margin: "auto",
        justifyContent: "space-around",
        listStyle: "none"
    },
    link: {
        display: "block",
        margin: "auto",
        textDecoration: "none",
        color: "white",
        fontWeight: "600",
        fontFamily: "sans-serif"
    }
}

export const PublicNav = () => {
    return(
       <ul style={styles.ul}>
            <Link style={styles.link} to="/"><li>Home</li></Link>
            <Link style={styles.link} to="/contact"><li>Contact</li></Link>
            <Link style={styles.link} to="/support"><li>Support</li></Link>
        </ul>
    );
}