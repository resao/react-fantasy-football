import React from "react";
import Control from "./control/";

import styles from "./controls.module.css";

const controls = (props) => {
  const controlData = Object.keys(props.players).map((key) => {
    return {
      label: key,
      type: key,
    };
  });

  return (
    <div className={styles.controls}>
      <p>
        Team value: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controlData.map((control) => (
        <Control
          key={control.label}
          label={control.label}
          added={() => props.playerAdded(control.type)}
          removed={() => props.playerRemoved(control.type)}
          disabled={props.players[control.type]}
        />
      ))}
      <button disabled={!props.valid}>SAVE TEAM</button>
    </div>
  );
};

export default controls;
