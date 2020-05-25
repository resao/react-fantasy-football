import React from "react";
import PropTypes from "prop-types";

import styles from "./player.module.css";

const player = (props) => {
  let player = null;

  switch (props.type) {
    case "goalkeeper":
      player = <div className={styles.keeper}>Keeper</div>;
      break;
    case "defender":
      player = (
        <div className={styles[`defender${props.index + 1}`]}>Defender</div>
      );
      break;
    case "midfielder":
      player = (
        <div className={styles[`midfielder${props.index + 1}`]}>Midfielder</div>
      );
      break;
    case "forward":
      player = (
        <div className={styles[`forward${props.index + 1}`]}>Forward</div>
      );
      break;
    default:
      player = null;
  }

  return player;
};

player.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default player;
