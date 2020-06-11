import React, { useState } from "react";
import axios from "../../../axios-team-data";
import Button from "../../../components/ui/button/";
import Spinner from "../../../components/ui/spinner/";
import classes from "./contact-data.module.css";
import Input from "../../../components/ui/input/";
import { connect } from "react-redux";
import ErrorHandler from "../../../hoc/error-handler/";
import * as actions from "../../../store/actions/";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {
  const [saveForm, setSaveForm] = useState({
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
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const saveHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let element in saveForm) {
      formData[element] = saveForm[element].value;
    }

    const save = {
      players: props.players,
      price: props.price,
      saveData: formData,
      userId: props.userId,
    };

    props.onSaveTeam(save, props.token);
  };

  const inputChangedhandler = (event, id) => {
    const updatedFormElement = updateObject(saveForm[id], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        saveForm[id].validation
      ),
      touched: true,
    });

    const updatedSaveForm = updateObject(saveForm, {
      [id]: updatedFormElement,
    });

    updatedSaveForm[id] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedSaveForm) {
      formIsValid = updatedSaveForm[inputIdentifier].valid && formIsValid;
    }

    setSaveForm(updatedSaveForm)
    setFormIsValid(formIsValid)
  };

  const formElements = Object.keys(saveForm).map((key) => ({
    id: key,
    data: saveForm[key],
  }));

  let form = (
    <form onSubmit={saveHandler}>
      {formElements.map((element) => (
        <Input
          key={element.id}
          type={element.data.type}
          config={element.data.config}
          value={element.data.value}
          invalid={!element.data.valid}
          shouldValidate={element.data.validation}
          touched={element.data.touched}
          changed={(event) => inputChangedhandler(event, element.id)}
        />
      ))}
      <Button btnType="success" disabled={!formIsValid}>
        SAVE
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes["contact-data"]}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
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
