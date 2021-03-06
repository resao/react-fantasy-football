import React from "react";

import classes from "./control.module.css";

export default (props) => (
  <div className={classes.control}>
    <div>{props.label}</div>
    <button onClick={props.added}>Add</button>
    <button onClick={props.removed} disabled={props.disabled}>
      Remove
    </button>
  </div>
);
