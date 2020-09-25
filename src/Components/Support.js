/** All the user guides, user support and contact will be available in this component */
import React from "react";
import { withRouter, Link, useParams } from "react-router-dom";

import SupportSection from "./SupportSection";
import "../Support.css";


const supportsContents = [
  {
    name: "about",
    header: "About"
  },
  {
    name: "guide",
    header: "Guide"
  },
  {
    name: "report",
    header: "Report"
  },
  {
    name: "rules",
    header: "Rules & Regulations"
  },
  {
    name: "terms",
    header: "Terms & Condition"
  },
  {
    name: "privacy",
    header: "Privacy"
  },
]

function Support(props) {

  const { hash } = props.location;

  return (
    <div className="sup-div">
      <div className="support-contents">
        <h3>Support Contents</h3>

        {supportsContents.map((s, i) => (
          <SupportSection name={s.name} header={s.header} key={i} hash={hash}/>
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
            <li><Link to="/support#About">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/support#Guide">Guide</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/contact#report">Feedback & Request</Link></li>
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
    </div>
  );
}

export default withRouter(Support);
