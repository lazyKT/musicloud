/** All the user guides, user support and contact will be available in this component */
import React from "react";
import { withRouter, Link } from "react-router-dom";

import AboutApp from "./SupportContents/AboutApp";
import Guide from "./SupportContents/Guide";
import Rules from './SupportContents/Rules';
import SupportSection from "./SupportSection";
import "../Support.css";


const supportsContents = [
  {
    name: "about",
    header: "About",
    component: <AboutApp/>
  },
  {
    name: "guide",
    header: "Guide",
    component: <Guide/>
  },
  {
    name: "rules",
    header: "Rules & Regulations",
    component: <Rules/>
  },
  {
    name: "terms",
    header: "Terms & Condition",
    component: <AboutApp/>
  },
  {
    name: "privacy",
    header: "Privacy",
    component: <AboutApp/>
  },
]

function Support(props) {

  const { hash } = props.location;

  return (
    <div className="sup-div">
      <h3 className="header"> User Support</h3>
    </div>
  );
}

export default withRouter(Support);
