import React from "react";
import Summary from "../../components/save/summary/";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./contact-data";
import { connect } from "react-redux";

const SaveTeam = props => {
  const saveCancelledHandler = () => {
    props.history.goBack();
  };

  const saveContinuedHandler = () => {
    props.history.replace("/save/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.players) {
    const savedRedirect = props.saved ? <Redirect to="/" /> : null;

    summary = (
      <React.Fragment>
        {savedRedirect}
        <Summary
          players={props.players}
          saveCancelled={saveCancelledHandler}
          saveContinued={saveContinuedHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </React.Fragment>
    );
  }

  return summary;
}

const mapStateToProps = (state) => ({
  players: state.teamBuilder.players,
  saved: state.saveTeam.saved,
});

export default connect(mapStateToProps)(SaveTeam);
