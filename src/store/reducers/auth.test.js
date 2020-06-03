import reducer, { initialState } from "./auth";
import * as actions from "../actions/types";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store token and userId upen login", () => {
    expect(
      reducer(initialState, {
        type: actions.AUTH_SUCCESS,
        idToken: "token is awesome",
        userId: "my user id",
      })
    ).toEqual({
      token: "token is awesome",
      userId: "my user id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
