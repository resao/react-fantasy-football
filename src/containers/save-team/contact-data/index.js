import React, { Component } from "react";
import axios from "../../../axios-team-data";
import Button from "../../../components/ui/button/";
import Spinner from "../../../components/ui/spinner/";
import classes from "./contact-data.module.css";
import Input from "../../../components/ui/input/";
import { connect } from "react-redux";
import ErrorHandler from "../../../hoc/error-handler/";
import * as actions from "../../../store/actions/";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    saveForm: {
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
  };

  saveHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let element in this.state.saveForm) {
      formData[element] = this.state.saveForm[element].value;
    }

    const save = {
      players: this.props.players,
      price: this.props.price,
      saveData: formData,
      userId: this.props.userId,
    };

    this.props.onSaveTeam(save, this.props.token);
  };

  inputChangedhandler = (event, id) => {
    const updatedFormElement = updateObject(this.state.saveForm[id], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.saveForm[id].validation
      ),
      touched: true,
    });

    const updatedSaveForm = updateObject(this.state.saveForm, {
      [id]: updatedFormElement,
    });

    updatedSaveForm[id] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedSaveForm) {
      formIsValid = updatedSaveForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ saveForm: updatedSaveForm, formIsValid });
  };

  render() {
    const formElements = Object.keys(this.state.saveForm).map((key) => ({
      id: key,
      data: this.state.saveForm[key],
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

    if (this.props.loading) {
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

const mapStateToProps = (state) => ({
  players: state.teamBuilder.players,
  price: state.teamBuilder.totalPrice,
  loading: state.saveTeam.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveTeam: (data, token) => dispatch(actions.saveTeam(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ContactData, axios));
