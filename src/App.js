import React, { Component } from "react";
import Layout from "./containers/layout/";
import TeamBuilder from "./containers/team-builder/";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/auth/logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/";
import asyncComponent from "./hoc/async-component/";

const asyncSave = asyncComponent(() => {
  return import("./containers/save-team/");
});

const asyncSaves = asyncComponent(() => {
  return import("./containers/saves/");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/auth/");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={TeamBuilder} exact />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/save" component={asyncSave} />
          <Route path="/saves" component={asyncSaves} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={TeamBuilder} exact />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
