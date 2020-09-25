/** All the user guides, user support and contact will be available in this component */
import React from "react";
import { withRouter, Link } from "react-router-dom";

import SupportSection from "./SupportSection";
import "../Support.css";

const supports = ["About", "Guide", "Report"];

function Support() {
  return (
    <div className="sup-div">
      <div className="support-contents">
        <h3>Support Contents</h3>

        {supports.map((s, i) => (
          <SupportSection header={s} key={i} />
        ))}
      </div>

      {/* Footer */}
      <div className="support-footer">
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
    </div>
  );
}

export default withRouter(Support);
