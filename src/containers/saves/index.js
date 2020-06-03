import React, { Component } from "react";
import Save from "../../components/save/";
import axios from "../../axios-team-data";
import ErrorHandler from "../../hoc/error-handler/";
import * as actions from "../../store/actions/";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/";

class Saves extends Component {
  componentDidMount() {
    this.props.onFetchSaves(this.props.token, this.props.userId);
  }

  render() {
    let saves = <Spinner />;

    if (!this.props.loading) {
      saves = (
        <div>
          {this.props.saves.map((save) => (
            <Save key={save.id} {...save} />
          ))}
        </div>
      );
    }

    return saves;
  }
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
