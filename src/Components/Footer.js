/** footer component */
import React from "react";
import { Link } from 'react-router-dom';
import "../App.css";

function Footer() {
  return (
    <div className="footer">
      <div className="brand">
        <span className="app-name">MusiCloud</span>
        <span className="version-number">&nbsp; ~ beta</span>
      </div>
      <div>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/contact">Feedback & Request</Link></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><Link to="/about">Terms & Condition</Link></li>
          <li><Link to="/contact">Privacy</Link></li>
          <li><Link to="/support">Technical Information</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
