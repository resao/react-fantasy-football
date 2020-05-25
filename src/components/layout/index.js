import React from "react";
import classes from "./layout.module.css";

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
