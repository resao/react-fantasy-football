import React, { Component } from "react";
import axios from "../../../axios-team-data";
import Button from "../../../components/ui/button/";
import Spinner from "../../../components/ui/spinner/";
import classes from "./contact-data.module.css";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
    loading: false,
  };

  saveHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      players: this.props.players,
      price: this.props.price,
      customer: {
        name: "Smithy",
        address: {
          street: "Equality street",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/saves.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postCode" placeholder="Postcode" />
        <Button btnType="success" clicked={this.saveHandler}>
          SAVE
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes["contact-data"]}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
