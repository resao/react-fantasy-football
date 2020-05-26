import React from "react";
import Logo from "../../logo/";
import Navigation from "../items/";
import Toggle from "../side-drawer/toggle/";
import classes from "./toolbar.module.css";

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <Toggle clicked={props.toggleSideDrawer} />
    <div className={classes.logo}>
      <Logo />
    </div>
    <nav className={classes["desktop-only"]}>
      <Navigation />
    </nav>
  </header>
);

export default toolbar;
