import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import { getSoundCount, sendFeedback, setCurrentSound } from "./redux/sounds";
import style from "./Confidence.module.scss";

const choices = [
  "Very confusing",
  "Confusing",
  "Neutral",
  "Clear",
  "Very clear",
];

const Confidence = () => {
  const history = useHistory();
  const { index } = useParams();

  const soundCount = useSelector(getSoundCount);
  const dispatch = useDispatch();

  const onClick = (choice, index) => async () => {
    const newIndex = parseInt(index, 10) + 1;

    dispatch(setCurrentSound({ likertScale: index + 1 }));
    await dispatch(sendFeedback());

    if (newIndex > soundCount) {
      history.push(`/end`);
    } else {
      history.push(`/vibration/${newIndex}`);
    }
  };

  return (
    <Layout title="How confident you answered the question?">
      <div className={style.choices}>
        <div className={style.bar} />
        {choices.map((choice, index) => (
          <button
            className={style.choice}
            key={choice}
            onClick={onClick(choice, index)}
          >
            <div className={style.disk}></div>
            <div className={style.label}>{choice}</div>
          </button>
        ))}
      </div>
      <div className={style.buttons}>...</div>
    </Layout>
  );
};

export default Confidence;
