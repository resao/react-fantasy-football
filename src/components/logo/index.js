import React from "react";
import footballLogo from "../../assets/images/logo.png";

import classes from "./logo.module.css";

export default (props) => (
  <div className={classes.logo}>
    <img src={footballLogo} alt="logo" />
  </div>
);
