import React, { Component } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";
import Modal from "../../components/ui/modal/";
import Summary from "../../components/team/summary/";
import Spinner from "../../components/ui/spinner";
import ErrorHandler from "../../hoc/error-handler/";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import axios from "../../axios-team-data";

export class TeamBuilder extends Component {
  state = {
    saving: false,
  };

  componentDidMount() {
    this.props.onInitPlayers();
  }

  saveHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ saving: true });
    } else {
      this.props.onSetAuthRedirectPath("/save");
      this.props.history.push("/auth");
    }
  };

  updateValidState = (players) => {
    const sum = Object.keys(players)
      .map((key) => {
        return players[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  saveCancelHandler = () => {
    this.setState({ saving: false });
  };

  saveContinueHandler = () => {
    this.props.onInitSave();
    this.props.history.push("/save");
  };

  render() {
    let summary = null;
    let team = this.props.error ? <p>Players failed to load </p> : <Spinner />;

    const players = {
      ...this.props.players,
    };

    for (let player in players) {
      players[player] = players[player] <= 0;
    }

    if (this.props.players) {
      summary = (
        <Summary
          players={this.props.players}
          price={this.props.price}
          saveCancelled={this.saveCancelHandler}
          saveContinued={this.saveContinueHandler}
        />
      );

      team = (
        <React.Fragment>
          <Team players={this.props.players} />
          <Controls
            playerAdded={this.props.onPlayerAdded}
            playerRemoved={this.props.onPlayerRemoved}
            players={players}
            price={this.props.price}
            saved={this.saveHandler}
            isAuthenticated={this.props.isAuthenticated}
            valid={this.updateValidState(this.props.players)}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Modal show={this.state.saving} modalClosed={this.saveCancelHandler}>
          {summary}
        </Modal>
        {team}
      </React.Fragment>
    );
  }
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
