import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/ui/input/";
import Button from "../../components/ui/button/";
import Spinner from "../../components/ui/spinner/";
import classes from "./auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: false,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.onSetAuthRedirectPath();
    }
  }

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

  inputChangedhandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        touched: true,
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
      },
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElements = Object.keys(this.state.controls).map((key) => ({
      id: key,
      data: this.state.controls[key],
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
        changed={(event) => this.inputChangedhandler(event, element.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    const authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div className={classes.auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="danger">
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
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
