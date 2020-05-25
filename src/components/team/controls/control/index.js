import React from "react";

import styles from "./control.module.css";

const control = (props) => (
  <div className={styles.control}>
    <div>{props.label}</div>
    <button onClick={props.added}>Add</button>
    <button onClick={props.removed} disabled={props.disabled}>
      Remove
    </button>
  </div>
);

export default control;
