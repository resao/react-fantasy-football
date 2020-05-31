import React from "react";
import classes from "./input.module.css";

export default (props) => {
  let inputElement = null;
  const inputClasses = [classes.input];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
  }

  switch (props.type) {
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes["form-element"]}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
