/** footer component */
import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="footer">
      <div>
        <span className="app-name">MusiCloud</span>
        <span className="version-number">~Beta</span>
      </div>
      <ul>
        <li>Contact</li>
        <li>About</li>
        <li>Feedback</li>
      </ul>
    </div>
  );
}

export default Footer;
