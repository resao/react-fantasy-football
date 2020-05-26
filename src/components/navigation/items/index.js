import React from "react";
import Item from "./item/";
import classes from "./items.module.css";

const items = () => (
  <ul className={classes.items}>
    <Item link="/" active>
      Team Builder
    </Item>
    <Item link="/">Checkout</Item>
  </ul>
);

export default items;
