import React from "react";
import styles from "./layout.module.css";

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={styles.content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
