import React, { Component } from "react";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";
import { connect } from "react-redux";

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
        <Toolbar
          toggleSideDrawer={this.sideDrawerToggleHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
