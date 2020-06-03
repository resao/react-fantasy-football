import * as actions from "../actions/types";
import { updateObject } from "../../shared/utility";

const initialState = {
  players: null,
  totalPrice: 0,
  error: false,
  building: false,
};

const PLAYER_PRICES = {
  goalkeeper: 1000,
  defender: 2000,
  midfielder: 3000,
  forward: 4000,
};

const addPlayer = (state, action) => {
  const updatedPlayer = { [action.name]: state.players[action.name] + 1 };
  const updatedPlayers = updateObject(state.players, updatedPlayer);
  const updatedState = {
    players: updatedPlayers,
    totalPrice: state.totalPrice + PLAYER_PRICES[action.name],
    building: true,
  };

  return updateObject(state, updatedState);
};

const removePlayer = (state, action) => {
  const updatedPlayer = { [action.name]: state.players[action.name] - 1 };
  const updatedPlayers = updateObject(state.players, updatedPlayer);
  const updatedState = {
    players: updatedPlayers,
    totalPrice: state.totalPrice + PLAYER_PRICES[action.name],
    building: true,
  };

  return updateObject(state, updatedState);
};

const setPlayers = (state, action) => {
  return updateObject(state, {
    players: action.players,
    error: false,
    totalPrice: initialState.totalPrice,
    building: false,
  });
};

const fetchPlayersFailed = (state, action) => {
  return updateObject(state, { error: true });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PLAYER:
      return addPlayer(state, action);
    case actions.REMOVE_PLAYER:
      return removePlayer(state, action);
    case actions.SET_PLAYERS:
      return setPlayers(state, action);
    case actions.FETCH_PLAYERS_FAILED:
      return fetchPlayersFailed(state, action);
    default:
      return state;
  }
};
