import React from "react";
import classes from "./item.module.css";
import { NavLink } from "react-router-dom";

export default (props) => (
  <li className={classes.item}>
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);
