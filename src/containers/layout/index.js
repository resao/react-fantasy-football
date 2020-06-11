import React, { useState } from "react";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";
import { connect } from "react-redux";

import classes from "./layout.module.css";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  };

  return (
    <React.Fragment>
      <Toolbar
        toggleSideDrawer={sideDrawerToggleHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className={classes.content}>{props.children}</main>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
