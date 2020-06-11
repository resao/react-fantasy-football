import React, { useEffect } from "react";
import Save from "../../components/save/";
import axios from "../../axios-team-data";
import ErrorHandler from "../../hoc/error-handler/";
import * as actions from "../../store/actions/";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/";

const Saves = props => {
  const { onFetchSaves, token, userId } = props

  useEffect(() => {
    onFetchSaves(token, userId);
  }, [onFetchSaves, token, userId])

  let saves = <Spinner />;

  if (!props.loading) {
    saves = (
      <div>
        {props.saves.map((save) => (
          <Save key={save.id} {...save} />
        ))}
      </div>
    );
  }

  return saves;
}

const mapStateToProps = (state) => {
  return {
    saves: state.saveTeam.saves,
    loading: state.saveTeam.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSaves: (token, userId) =>
      dispatch(actions.fetchSaves(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Saves, axios));
