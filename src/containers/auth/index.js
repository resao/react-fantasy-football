import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/ui/input/";
import Button from "../../components/ui/button/";
import Spinner from "../../components/ui/spinner/";
import classes from "./auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      type: "input",
      config: {
        type: "email",
        placeholder: "E-Mail",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    password: {
      type: "input",
      config: {
        type: "password",
        placeholder: "Password",
      },
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      value: "",
    },
  })

  const [isSignUp, setIsSignUp] = useState(false)

  const { building, authRedirectPath, onSetAuthRedirectPath } = props

  useEffect(() => {
    if (!building && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedhandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        touched: true,
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
      }),
    });

    setControls(updatedControls)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  };

  const formElements = Object.keys(controls).map((key) => ({
    id: key,
    data: controls[key],
  }));

  let form = formElements.map((element) => (
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
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  const errorMessage = props.error ? (
    <p>{props.error.message}</p>
  ) : null;

  const authRedirect = props.isAuthenticated ? (
    <Redirect to={props.authRedirectPath} />
  ) : null;

  return (
    <div className={classes.auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="danger">
        SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.teamBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
