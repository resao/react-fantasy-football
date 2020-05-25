import React from "react";
import Player from "./player/";
import PropTypes from "prop-types";

import styles from "./team.module.css";

const team = (props) => {
  let transformedPlayers = Object.keys(props.players)
    .map((key) => {
      return [...Array(props.players[key])].map((_, i) => {
        return <Player key={key + i} type={key} index={i} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (!transformedPlayers.length) {
    transformedPlayers = <p>No players selected</p>;
  }

  return <div className={styles.team}> {transformedPlayers} </div>;
};

team.propTypes = {
  players: PropTypes.object.isRequired,
};

export default team;
