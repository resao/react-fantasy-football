import React, { Component } from "react";
import Save from "../../components/save/";
import axios from "../../axios-team-data";
import ErrorHandler from "../../hoc/error-handler/";

class Saves extends Component {
  state = {
    saves: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/saves.json")
      .then((res) => {
        const fetchedSaves = [];

        for (let key in res.data) {
          fetchedSaves.push({
            ...res.data[key],
            id: key,
          });
        }

        this.setState({ loading: false, saves: fetchedSaves });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.saves.map((save) => (
          <Save key={save.id} {...save} />
        ))}
      </div>
    );
  }
}

export default ErrorHandler(Saves, axios);
