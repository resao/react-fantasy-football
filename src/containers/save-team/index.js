import React, { Component } from "react";
import Summary from "../../components/save/summary/";
import { Route } from "react-router-dom";
import ContactData from "./contact-data";

export default class SaveTeam extends Component {
  state = {
    players: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const players = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        players[param[0]] = +param[1];
      }
    }

    this.setState({ players, totalPrice: price });
  }

  saveCancelledHandler = () => {
    this.props.history.goBack();
  };

  saveContinuedHandler = () => {
    this.props.history.replace("/save/contact-data");
  };

  render() {
    return (
      <div>
        <Summary
          players={this.state.players}
          saveCancelled={this.saveCancelledHandler}
          saveContinued={this.saveContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              players={this.state.players}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
