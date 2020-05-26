import React from "react";
import classes from "./toggle.module.css";

const toggle = (props) => (
  <div className={classes.toggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggle;
