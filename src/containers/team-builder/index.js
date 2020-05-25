import React, { Component } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";

const PLAYER_PRICES = {
  goalkeeper: 1000,
  defender: 2000,
  midfielder: 3000,
  forward: 4000,
};

class TeamBuilder extends Component {
  state = {
    players: {
      goalkeeper: 1,
      defender: 3,
      midfielder: 5,
      forward: 2,
    },
    totalPrice: 30000,
    valid: false,
  };

  updateValidState(players) {
    const sum = Object.keys(players)
      .map((key) => {
        return players[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ valid: sum > 0 });
  }

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

  render() {
    const players = {
      ...this.state.players,
    };

    for (let player in players) {
      players[player] = players[player] <= 0;
    }

    return (
      <React.Fragment>
        <Team players={this.state.players} />
        <Controls
          playerAdded={this.addPlayerHandler}
          playerRemoved={this.removePlayerHandler}
          players={players}
          price={this.state.totalPrice}
          valid={this.state.valid}
        />
      </React.Fragment>
    );
  }
}

export default TeamBuilder;
