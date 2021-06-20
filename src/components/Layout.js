import React from 'react'

import style from './Layout.module.scss'

const Layout = ({ title, className, children, onClick }) => (
  <div className={style.Layout} onClick={onClick}>
    <div className={className}>
      <div className={style.title}>{title}</div>
      {children}
    </div>
  </div>
)

export default Layout
