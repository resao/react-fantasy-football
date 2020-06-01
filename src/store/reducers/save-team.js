import * as actions from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  saves: [],
  saved: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_INIT:
      return updateObject(state, { saved: false });
    case actions.SAVE_TEAM_START:
      return updateObject(state, { loading: true });
    case actions.SAVE_TEAM_SUCCESS:
      const newSave = updateObject(action.data, { id: action.id });

      return updateObject(state, {
        loading: false,
        saved: true,
        saves: state.saves.concat(newSave),
      });
    case actions.SAVE_TEAM_FAIL:
      return updateObject(state, { loading: false });
    case actions.FETCH_SAVES_START:
      return updateObject(state, { loading: true });
    case actions.FETCH_SAVES_SUCCESS:
      return updateObject(state, { saves: action.saves, loading: false });
    case actions.FETCH_SAVES_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};
