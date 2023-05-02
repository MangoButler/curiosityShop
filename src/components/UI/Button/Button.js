import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.Button} ${props.className}`}
      disabled={props.disabled}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
};

export default Button;
