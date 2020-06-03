import React from "react";
import Backdrop from "../backdrop/";

import classes from "./modal.module.css";

const modal = (props) => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default modal;
