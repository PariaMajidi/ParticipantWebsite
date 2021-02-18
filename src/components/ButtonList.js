import React from "react";

import style from "./ButtonList.module.scss";

const ButtonList = ({ children }) => (
  <div className={style.ButtonList}>{children}</div>
);

export default ButtonList;
