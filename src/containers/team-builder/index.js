import React, { Component } from "react";
import Team from "../../components/team/";
import Controls from "../../components/team/controls/";

const PLAYER_PRICES = {
  keeper: 1000,
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
  };

  removePlayerHandler = (type) => {
    const players = {
      ...this.state.players,
    };

    players[type]--;

    const totalPrice = this.state.totalPrice - PLAYER_PRICES[type];

    this.setState({
      totalPrice,
      players,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Team players={this.state.players} />
        <Controls
          playerAdded={this.addPlayerHandler}
          playerRemoved={this.removePlayerHandler}
          players={this.state.players}
        />
      </React.Fragment>
    );
  }
}

export default TeamBuilder;
