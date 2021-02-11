import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Layout from "./Layout";
import Loader from "./Loader";
import { getSound } from "./redux/sounds";

import style from "./Vibration.module.scss";

const Vibration = () => {
  const [countDown, setCountDown] = useState(5);
  const [isPlaying, play] = useState(false);
  const audio = useRef();

  const interval = useRef();
  const history = useHistory();

  const { index } = useParams();

  const sound = useSelector(getSound(parseInt(index, 10) - 1));

  useEffect(() => {
    if (!sound) return;

    const { filename, repetition } = sound;
    audio.current = new Audio(`/content/sounds/${filename}.wav`);

    audio.current.addEventListener("ended", (event) => {
      setTimeout(() => {
        history.push(`/vibration/${index}/feel`);
      }, 2000);
    });

    interval.current = setInterval(() => {
      if (countDown === 1) {
        clearInterval(interval.current);
        play(true);

        audio.current.play();
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
