import React from "react";
import { Link } from "react-router-dom";

import style from "./Button.module.scss";

const Button = ({ children, className, ...props }) => (
  <button className={`${style.Button} ${className}`} {...props}>
    {children}
  </button>
);

const ButtonLink = ({ children, className, ...props }) => (
  <Link className={`${style.Button} ${className}`} {...props}>
    {children}
  </Link>
);

Button.Link = ButtonLink;

export default Button;
