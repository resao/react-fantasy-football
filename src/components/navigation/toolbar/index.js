import React from "react";
import Logo from "../../logo/";
import classes from "./toolbar.module.css";

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default toolbar;
