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
          <li><Link to="/support#About">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/support#Guide">Guide</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/support#report">Feedback & Request</Link></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><Link to="/support#rules">Rules & Regulations</Link></li>
          <li><Link to="/support#terms">Terms & Condition</Link></li>
          <li><Link to="/support#privacy">Privacy</Link></li>
          <li><Link to="/support">Technical Information</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
