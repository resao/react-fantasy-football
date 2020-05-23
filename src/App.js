import React, { Component } from 'react';
import Layout from './components/layout/';
import TeamBuilder from './containers/team-builder/'

class App extends Component {
  render() {
    return <Layout><TeamBuilder/></Layout>;
  }
}

export default App;
