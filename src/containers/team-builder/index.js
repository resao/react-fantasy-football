import React, { useState, useEffect } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";
import Modal from "../../components/ui/modal/";
import Summary from "../../components/team/summary/";
import Spinner from "../../components/ui/spinner";
import ErrorHandler from "../../hoc/error-handler/";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import axios from "../../axios-team-data";

const TeamBuilder = props => {
  const [saving, setSaving] = useState(false)
  const { onInitPlayers } = props

  useEffect(() => {
    onInitPlayers();
  }, [onInitPlayers])

  const saveHandler = () => {
    if (props.isAuthenticated) {
      setSaving(true)
    } else {
      props.onSetAuthRedirectPath("/save");
      props.history.push("/auth");
    }
  };

  const updateValidState = (players) => {
    const sum = Object.keys(players)
      .map((key) => {
        return players[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const saveCancelHandler = () => {
    setSaving(false)
  };

  const saveContinueHandler = () => {
    props.onInitSave();
    props.history.push("/save");
  };

  let summary = null;
  let team = props.error ? <p>Players failed to load </p> : <Spinner />;

  const players = {
    ...props.players,
  };

  for (let player in players) {
    players[player] = players[player] <= 0;
  }

  if (props.players) {
    summary = (
      <Summary
        players={props.players}
        price={props.price}
        saveCancelled={saveCancelHandler}
        saveContinued={saveContinueHandler}
      />
    );

    team = (
      <React.Fragment>
        <Team players={props.players} />
        <Controls
          playerAdded={props.onPlayerAdded}
          playerRemoved={props.onPlayerRemoved}
          players={players}
          price={props.price}
          saved={saveHandler}
          isAuthenticated={props.isAuthenticated}
          valid={updateValidState(props.players)}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Modal show={saving} modalClosed={saveCancelHandler}>
        {summary}
      </Modal>
      {team}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    players: state.teamBuilder.players,
    price: state.teamBuilder.totalPrice,
    error: state.teamBuilder.error,
    isAuthenticated: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayerAdded: (name) => dispatch(actions.addPlayer(name)),
    onPlayerRemoved: (name) => dispatch(actions.removePlayer(name)),
    onInitPlayers: () => dispatch(actions.initPlayers()),
    onInitSave: () => dispatch(actions.saveInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(TeamBuilder, axios));
