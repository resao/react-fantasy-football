import React, { Component } from "react";
import Toolbar from "../navigation/toolbar/";
import SideDrawer from "../navigation/side-drawer/";

import classes from "./layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((state) => {
      return { showSideDrawer: !state.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
