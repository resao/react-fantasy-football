import React from "react";
import Team from "../../team/";
import Button from "../../ui/button/";
import classes from "./summary.module.css";

export default (props) => {
  return (
    <div className={classes.summary}>
      <h1>We hope your team wins</h1>
      <div>
        <Team players={props.players} />
      </div>
      <Button btnType="danger" clicked={props.saveCancelled}>
        Cancel
      </Button>
      <Button btnType="success" clicked={props.saveContinued}>
        Continue
      </Button>
    </div>
  );
};
