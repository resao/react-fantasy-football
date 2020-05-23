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

  console.log(controlData);

  return (
    <div className={classes.controls}>
      {controlData.map((control) => (
        <Control
          key={control.label}
          label={control.label}
          added={() => props.playerAdded(control.type)}
          removed={() => props.playerRemoved(control.type)}
        />
      ))}
    </div>
  );
};

export default controls;
