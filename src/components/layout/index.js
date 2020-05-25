import React from "react";
import Toolbar from "../navigation/toolbar/";
import classes from "./layout.module.css";

const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
