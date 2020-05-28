import React, { Component } from "react";
import Layout from "./containers/layout/";
import TeamBuilder from "./containers/team-builder/";
import SaveTeam from "./containers/save-team/";
import Saves from "./containers/saves/";
import { Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/save" component={SaveTeam} />
          <Route path="/saves" component={Saves} />
          <Route path="/" component={TeamBuilder} exact />
        </Switch>
      </Layout>
    );
  }
}
