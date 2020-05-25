import React from "react";
import Control from "./control/";

import classes from "./controls.module.css";

const controls = (props) => {
  const controlData = Object.keys(props.players).map((key) => {
    return {
      label: key,
      type: key,
    };
  });

  return (
    <div className={classes.controls}>
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
      <button disabled={!props.valid} onClick={props.saved}>
        SAVE TEAM
      </button>
    </div>
  );
};

export default controls;
