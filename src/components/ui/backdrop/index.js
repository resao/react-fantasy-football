import React from "react";
import classes from "./backdrop.module.css";

export default (props) =>
  props.show ? (
    <div className={classes.backdrop} onClick={props.clicked}></div>
  ) : null;
