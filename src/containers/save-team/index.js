import React, { Component } from "react";
import Summary from "../../components/save/summary/";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./contact-data";
import { connect } from "react-redux";

class SaveTeam extends Component {
  saveCancelledHandler = () => {
    this.props.history.goBack();
  };

  saveContinuedHandler = () => {
    this.props.history.replace("/save/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.players) {
      const savedRedirect = this.props.saved ? <Redirect to="/" /> : null;

      summary = (
        <React.Fragment>
          {savedRedirect}
          <Summary
            players={this.props.players}
            saveCancelled={this.saveCancelledHandler}
            saveContinued={this.saveContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => ({
  players: state.teamBuilder.players,
  saved: state.saveTeam.saved,
});

export default connect(mapStateToProps)(SaveTeam);
