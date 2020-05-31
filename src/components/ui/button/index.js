import React from "react";

import classes from "./button.module.css";

export default (props) => (
  <button
    disabled={props.disabled}
    className={[classes.button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
