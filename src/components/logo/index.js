import React from "react";
import footballLogo from "../../assets/images/logo.png";

import classes from "./logo.module.css";

const logo = (props) => (
  <div className={classes.logo}>
    <img src={footballLogo} alt="logo" />
  </div>
);

export default logo;
