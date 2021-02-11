import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import Loader from "./Loader";
import { getSound, setCurrentSound } from "./redux/sounds";
import getTime from "./utils/date";

import style from "./Vibration.module.scss";

const Vibration = () => {
  const [countDown, setCountDown] = useState(5);
  const [isPlaying, play] = useState(false);
  const audio = useRef();

  const interval = useRef();
  const history = useHistory();

  const { index } = useParams();

  const filename = useSelector(getSound(parseInt(index, 10) - 1));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!filename) return;
    audio.current = new Audio(`/content/sounds/${filename}.wav`);

    audio.current.addEventListener("ended", (event) => {
      dispatch(
        setCurrentSound({ vibration: filename, endAudioTime: getTime() })
      );
      setTimeout(() => {
        history.push(`/vibration/${index}/feel`);
      }, 2000);
    });

    interval.current = setTimeout(() => {
      if (countDown === 1) {
        clearInterval(interval.current);
        play(true);

        audio.current
          .play()
          .then(() => {})
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);

    return () => clearInterval(interval.current);
  }, [filename, countDown]);

  return (
    <Layout title={`Vibration Number ${index}`}>
      <div className={style.countDown}>
        {isPlaying ? <Loader /> : countDown}
      </div>
    </Layout>
  );
};

export default Vibration;
