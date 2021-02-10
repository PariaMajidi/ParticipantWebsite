import React from "react";
import { useHistory } from "react-router-dom";

import Layout from "./Layout";
import Button from "./Button";
import useEventListener from "./hooks/useEventListener";
import style from "./Start.module.scss";

const Start = () => {
  const history = useHistory();

  const nextPage = () => history.push("/ready");

  useEventListener(
    "fullscreenchange",
    () => document.fullscreenElement && nextPage(),
    document.documentElement
  );

  const start = () => {
    if (
      document.documentElement &&
      document.documentElement.requestFullscreen
    ) {
      document.documentElement.requestFullscreen();
    } else {
      nextPage();
    }
  };
  return (
    <Layout>
      <Button className={style.button} onClick={start}>
        Start
      </Button>
    </Layout>
  );
};

export default Start;
