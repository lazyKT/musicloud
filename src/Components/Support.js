/** All the user guides, user support and contact will be available in this component */
import React from "react";
import { withRouter } from "react-router-dom";

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
        <ul>
          <li>Contact</li>
          <li>User Support</li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Support);
