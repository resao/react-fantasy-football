import React from "react";
import classes from "./toggle.module.css";

export default (props) => (
  <div className={classes.toggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
