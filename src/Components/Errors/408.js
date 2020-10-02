/** this is an error page for the HTTP 408 status code: Connection TimeOut */
import React from 'react';
import './errors.css';

import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

/** component styling */
const styles = {
    icon: {
        display: "block",
        fontSize: "50px",
        width: "fit-content",
        margin: "auto",
        color: "gray"
    }
}

export default function ConnectionTimeOut() {

    return (
        <div className="errorContainer">
            <h3 className="error-status">Error: 408</h3>
            <p className="error-title">Connection TimeOut:(</p>
            <SentimentDissatisfiedIcon style={styles.icon}/>
            <div className="options-div">
                <h4>What are the options I can do?</h4>
                <ul>
                    <li>Check the network connection.</li>
                    <li>Refresh the Page.</li>
                    <li>Log Out the App and log in again!</li>
                </ul>
                <p>
                    If the above options do not solve the problem, please contact and
                    &nbsp;<a href="/support#report">report the problem </a>
                    to the site admin.
                </p>
            </div>
        </div>
    )
}