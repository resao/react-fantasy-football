import axios from "axios";
import * as actions from "./types";

const API_KEY = process.env.REACT_APP_API_KEY;

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAILED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return async (dispatch) => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = isSignUp
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    try {
      const response = await axios.post(url, authData);
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      const token = response.data.idToken;
      const userId = response.data.localId;

      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", userId);

      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (e) {
      dispatch(authFail(e.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");

        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
