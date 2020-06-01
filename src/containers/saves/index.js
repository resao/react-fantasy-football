import React, { Component } from "react";
import Save from "../../components/save/";
import axios from "../../axios-team-data";
import ErrorHandler from "../../hoc/error-handler/";
import * as actions from "../../store/actions/";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/";

class Saves extends Component {
  componentDidMount() {
    this.props.onFetchSaves();
    // axios
    //   .get("/saves.json")
    //   .then((res) => {
    //     const fetchedSaves = [];
    //     for (let key in res.data) {
    //       fetchedSaves.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({ loading: false, saves: fetchedSaves });
    //   })
    //   .catch((e) => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    console.log(this.props);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSaves: () => dispatch(actions.fetchSaves()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Saves, axios));
