import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Layout from "./Layout";
import Loader from "./Loader";

import style from "./Vibration.module.scss";

const Vibration = () => {
  const [countDown, setCountDown] = useState(5);
  const [isPlaying, play] = useState(false);

  const interval = useRef();
  const history = useHistory();

  const { index } = useParams();

  useEffect(() => {
    interval.current = setInterval(() => {
      if (countDown === 1) {
        clearInterval(interval.current);
        play(true);
        setTimeout(() => {
          history.push(`/vibration/${index}/feel`);
        }, 5000);
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);

    return () => clearInterval(interval.current);
  }, [countDown, history, index]);

  return (
    <Layout title={`Vibration Number ${index}`}>
      <div className={style.countDown}>
        {isPlaying ? <Loader /> : countDown}
      </div>
    </Layout>
  );
};

export default Vibration;
