import React, { Component } from "react";
import axios from "../../../axios-team-data";
import Button from "../../../components/ui/button/";
import Spinner from "../../../components/ui/spinner/";
import classes from "./contact-data.module.css";
import Input from "../../../components/ui/input/";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      street: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      zip: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Zip code",
        },
        validation: {
          minLength: 5,
          maxLength: 7,
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      email: {
        type: "input",
        config: {
          type: "email",
          placeholder: "E-Mail",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      deliveryMethod: {
        type: "select",
        config: {
          options: [
            {
              value: "fastest",
              title: "Fastest",
            },
            {
              value: "cheapest",
              title: "Cheapest",
            },
          ],
        },
        valid: true,
        value: "fastest",
      },
    },
    formIsValid: false,
    loading: false,
  };

  saveHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value;
    }

    const order = {
      players: this.props.players,
      price: this.props.price,
      orderData: formData,
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

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedhandler = (event, id) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[id],
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedOrderForm[id] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map((key) => ({
      id: key,
      data: this.state.orderForm[key],
    }));

    let form = (
      <form onSubmit={this.saveHandler}>
        {formElements.map((element) => (
          <Input
            key={element.id}
            type={element.data.type}
            config={element.data.config}
            value={element.data.value}
            invalid={!element.data.valid}
            shouldValidate={element.data.validation}
            touched={element.data.touched}
            changed={(event) => this.inputChangedhandler(event, element.id)}
          />
        ))}
        <Button btnType="success" disabled={!this.state.formIsValid}>
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
