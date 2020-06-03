import React from "react";
import Logo from "../../logo/";
import NavigationItems from "../items/";
import Backdrop from "../../ui/backdrop/";

import classes from "./side-drawer.module.css";

export default (props) => {
  let attachedClasses = [classes["side-drawer"], classes.close];

  if (props.open) {
    attachedClasses = [classes["side-drawer"], classes.open];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};
