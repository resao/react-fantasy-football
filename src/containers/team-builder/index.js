import React, { Component } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";
import Modal from "../../components/ui/modal/";
import Summary from "../../components/team/summary/";
import Spinner from "../../components/ui/spinner";
import ErrorHandler from "../../hoc/error-handler/";
import axios from "../../axios-team-data";

const PLAYER_PRICES = {
  goalkeeper: 1000,
  defender: 2000,
  midfielder: 3000,
  forward: 4000,
};

class TeamBuilder extends Component {
  state = {
    players: null,
    totalPrice: 30000,
    loading: false,
    saving: false,
    valid: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get("players.json")
      .then((res) => {
        this.setState({ players: res.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  saveHandler = () => {
    this.setState({ saving: true });
  };

  updateValidState = (players) => {
    const sum = Object.keys(players)
      .map((key) => {
        return players[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ valid: sum > 0 });
  };

  addPlayerHandler = (type) => {
    const players = {
      ...this.state.players,
    };

    players[type]++;

    const totalPrice = this.state.totalPrice + PLAYER_PRICES[type];

    this.setState({
      totalPrice,
      players,
    });

    this.updateValidState(players);
  };

  removePlayerHandler = (type) => {
    const players = {
      ...this.state.players,
    };

    if (players[type] <= 0) {
      return;
    }

    players[type]--;

    const totalPrice = this.state.totalPrice - PLAYER_PRICES[type];

    this.setState({
      totalPrice,
      players,
    });

    this.updateValidState(players);
  };

  saveCancelHandler = () => {
    this.setState({ saving: false });
  };

  saveContinueHandler = () => {
    const query = {
      ...this.state.players,
      price: this.state.totalPrice,
    };

    this.props.history.push({
      pathname: "save",
      search: Object.keys(query)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
        })
        .join("&"),
    });
  };

  render() {
    let summary = null;
    let team = this.state.error ? <p>Players failed to load </p> : <Spinner />;

    const players = {
      ...this.state.players,
    };

    for (let player in players) {
      players[player] = players[player] <= 0;
    }

    if (this.state.players) {
      summary = (
        <Summary
          players={this.state.players}
          price={this.state.totalPrice}
          saveCancelled={this.saveCancelHandler}
          saveContinued={this.saveContinueHandler}
        />
      );

      team = (
        <React.Fragment>
          <Team players={this.state.players} />
          <Controls
            playerAdded={this.addPlayerHandler}
            playerRemoved={this.removePlayerHandler}
            players={players}
            price={this.state.totalPrice}
            saved={this.saveHandler}
            valid={this.state.valid}
          />
        </React.Fragment>
      );
    }

    if (this.state.loading) {
      summary = <Spinner />;
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

export default ErrorHandler(TeamBuilder, axios);
