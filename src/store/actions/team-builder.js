import * as actions from "./types";
import axios from "../../axios-team-data";

export const addPlayer = (name) => {
  return {
    name,
    type: actions.ADD_PLAYER,
  };
};

export const removePlayer = (name) => {
  return {
    name,
    type: actions.REMOVE_PLAYER,
  };
};

export const setPlayers = (players) => {
  return {
    players,
    type: actions.SET_PLAYERS,
  };
};

export const fetchPlayersFailed = () => {
  return {
    type: actions.FETCH_PLAYERS_FAILED,
  };
};

export const initPlayers = () => {
  return async (dispatch) => {
    try {
      const players = await axios.get("players.json");
      dispatch(setPlayers(players.data));
    } catch (e) {
      dispatch(fetchPlayersFailed());
    }
  };
};
