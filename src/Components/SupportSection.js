import React, { useState, useEffect } from "react";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SupportSection(props) {
  const { header, name, hash, component } = props;

  const [expand, setExpand] = useState(false);
  

  const handleOnClick = () => {
    setExpand(!expand);
  }


  const handleExpanded = (hash) => {
    // console.log("inside handle Expanded");
    if ((hash.slice(1)).toLowerCase() === name) {
      //console.log("expaned");
      setExpand(true);
    } 
  }

  useEffect(() => {
    if (name) {
      handleExpanded(hash);
    }
  }, [hash, name]);


  return (
    <Accordion 
      expanded={expand}
      onClick={handleOnClick}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="">{header}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <b>Comming Soon</b><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.
          {component}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default SupportSection;
