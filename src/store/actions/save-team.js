import * as actions from "./types";
import axios from "../../axios-team-data";

export const saveTeamSuccess = (id, data) => {
  return {
    type: actions.SAVE_TEAM_SUCCESS,
    id,
    data,
  };
};

export const saveTeamFail = (error) => {
  return {
    type: actions.SAVE_TEAM_FAIL,
    error,
  };
};

export const saveTeamStart = () => {
  return {
    type: actions.SAVE_TEAM_START,
  };
};

export const saveTeam = (saveData) => {
  return async (dispatch) => {
    try {
      dispatch(saveTeamStart());
      const response = await axios.post("/saves.json", saveData);
      dispatch(saveTeamSuccess(response.data.name, saveData));
    } catch (e) {
      dispatch(saveTeamFail(e));
    }
  };
};

export const saveInit = () => {
  return {
    type: actions.SAVE_INIT,
  };
};

export const fetchSavesSuccess = (saves) => {
  return {
    type: actions.FETCH_SAVES_SUCCESS,
    saves,
  };
};

export const fetchSavesFail = (error) => {
  return {
    type: actions.FETCH_SAVES_FAIL,
    error,
  };
};

export const fetchSavesStart = () => {
  return {
    type: actions.FETCH_SAVES_START,
  };
};

export const fetchSaves = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchSavesStart());
      const saves = await axios.get("/saves.json");
      const fetchedSaves = [];

      for (let key in saves.data) {
        fetchedSaves.push({
          ...saves.data[key],
          id: key,
        });
      }
      dispatch(fetchSavesSuccess(fetchedSaves));
    } catch (e) {
      dispatch(fetchSavesFail(e));
    }
  };
};
