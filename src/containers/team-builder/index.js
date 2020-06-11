import React, { useState, useEffect, useCallback } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";
import Modal from "../../components/ui/modal/";
import Summary from "../../components/team/summary/";
import Spinner from "../../components/ui/spinner";
import ErrorHandler from "../../hoc/error-handler/";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/";
import axios from "../../axios-team-data";

const TeamBuilder = props => {
  const [saving, setSaving] = useState(false)

  const dispatch = useDispatch()

  const players = useSelector(state => state.teamBuilder.players)
  const price = useSelector(state => state.teamBuilder.totalPrice)
  const error = useSelector(state => state.teamBuilder.error)
  const isAuthenticated = useSelector(state => !!state.auth.token)

  const onPlayerAdded = (name) => dispatch(actions.addPlayer(name))
  const onPlayerRemoved = (name) => dispatch(actions.removePlayer(name))
  const onInitPlayers = useCallback(() => dispatch(actions.initPlayers()), [dispatch])
  const onInitSave = () => dispatch(actions.saveInit())
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitPlayers();
  }, [onInitPlayers])

  const saveHandler = () => {
    if (isAuthenticated) {
      setSaving(true)
    } else {
      onSetAuthRedirectPath("/save");
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
    onInitSave();
    props.history.push("/save");
  };

  let summary = null;
  let team = error ? <p>Players failed to load </p> : <Spinner />;

  const playerTypes = {
    ...players,
  };

  for (let player in playerTypes) {
    playerTypes[player] = playerTypes[player] <= 0;
  }

  if (players) {
    summary = (
      <Summary
        players={players}
        price={price}
        saveCancelled={saveCancelHandler}
        saveContinued={saveContinueHandler}
      />
    );

    team = (
      <React.Fragment>
        <Team players={players} />
        <Controls
          playerAdded={onPlayerAdded}
          playerRemoved={onPlayerRemoved}
          players={playerTypes}
          price={price}
          saved={saveHandler}
          isAuthenticated={isAuthenticated}
          valid={updateValidState(players)}
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

export default ErrorHandler(TeamBuilder, axios);
