import { combineReducers } from "redux";
import teamBuilderReducer from "./team-builder";
import saveTeamReducer from "./save-team";
import authReducer from "./auth";

export default combineReducers({
  auth: authReducer,
  teamBuilder: teamBuilderReducer,
  saveTeam: saveTeamReducer,
});
