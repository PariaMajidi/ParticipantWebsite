import React from "react";

import style from "./Button.module.scss";

const Button = ({ children, className, ...props }) => (
  <button className={`${style.Button} ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
