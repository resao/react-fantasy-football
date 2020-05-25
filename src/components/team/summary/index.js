import React from "react";
import Button from "../../ui/button/";

const summary = (props) => {
  const teamSummary = Object.keys(props.players).map((key) => {
    return (
      <li key={key}>
        <strong>{key}</strong>: {props.players[key]}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>Team Summary</h3>
      <p>This is your selected team:</p>
      <ul>{teamSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Save?</p>
      <Button btnType="danger" clicked={props.saveCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={props.saveContinued}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default summary;
