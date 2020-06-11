import React, { useEffect, Suspense } from "react";
import Layout from "./containers/layout/";
import TeamBuilder from "./containers/team-builder/";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/auth/logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/";

const Save = React.lazy(() => {
  return import("./containers/save-team/");
});

const Saves = React.lazy(() => {
  return import("./containers/saves/");
});

const Auth = React.lazy(() => {
  return import("./containers/auth/");
});

const App = props => {
  const { onTryAutoSignIn } = props
  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn])

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" component={TeamBuilder} exact />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/save" render={props => <Save {...props} />} />
        <Route path="/saves" render={props => <Saves {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" component={TeamBuilder} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>;
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
