/** All the user guides, user support and contact will be available in this component */
import React from "react";
import { withRouter } from "react-router-dom";

import "../App.css";


const styles = {

    footer: {
        position: "absolute",
        bottom: "0",
        dispaly: "flex",
        width: "100%",
        height: "120px",
        backgroundColor: "#003",
        color: "#fff",
        padding: "10px auto",
        marginTop: "10px"
    }
}


function Support() {

    return (
        <div className="mainDiv">
            Support

            {/* Footer */}
            <div style={styles.footer}>
                <ul>
                    <li>Contact</li>
                    <li>User Support</li>
                </ul>
            </div>

        </div>
    )
}


export default withRouter(Support);