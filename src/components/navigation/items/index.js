import React from "react";
import Item from "./item/";
import classes from "./items.module.css";

export default () => (
  <ul className={classes.items}>
    <Item link="/" exact>
      Team Builder
    </Item>
    <Item link="/save">Save</Item>
    <Item link="/saves">Saves</Item>
  </ul>
);
