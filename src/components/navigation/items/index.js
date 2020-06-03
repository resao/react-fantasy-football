import React from "react";
import Item from "./item/";
import classes from "./items.module.css";

export default (props) => (
  <ul className={classes.items}>
    <Item link="/" exact>
      Team Builder
    </Item>
    {props.isAuthenticated ? <Item link="/saves">Saves</Item> : null}
    {!props.isAuthenticated ? (
      <Item link="/auth">Authenticate</Item>
    ) : (
      <Item link="/logout">Logout</Item>
    )}
  </ul>
);
