import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Layout from "./Layout";
import Button from "./Button";

import style from "./VibrationFeel.module.scss";

const VibrationFeel = () => {
  const history = useHistory();

  const { index } = useParams();

  const nextVibration = () => history.push(`/vibration/${index}/confidence`);

  const onClickLeftButton = nextVibration;

  const onClickRightButton = nextVibration;

  return (
    <Layout title="What did you feel?">
      <div className={style.buttons}>
        <div className={style.left}>
          <Button className={style.button} onClick={onClickLeftButton}>
            <i className="fas fa-arrow-left"></i>
          </Button>
          <div className={style.label}>Left</div>
        </div>
        <div className={style.right}>
          <Button className={style.button} onClick={onClickRightButton}>
            <i className="fas fa-arrow-right"></i>
          </Button>
          <div className={style.label}>Right</div>
        </div>
      </div>
    </Layout>
  );
};

export default VibrationFeel;
