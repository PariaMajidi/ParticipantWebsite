import React from "react";

import style from "./Layout.module.scss";

const Layout = ({ title, children }) => (
  <div className={style.Layout}>
    <div>
      <div className={style.title}>{title}</div>
      {children}
    </div>
  </div>
);

export default Layout;
