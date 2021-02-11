import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./Layout";
import Button from "./Button";
import { setCurrentSound } from "./redux/sounds";

import style from "./Login.module.scss";

const Login = () => {
  const [participant, setParticipant] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(setCurrentSound({ participant }));
    history.push("/start");
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className={style.form}>
        <input
          type="text"
          className={style.input}
          onChange={(e) => setParticipant(e.target.value)}
        />
        <Button type="submit" disabled={!participant}>
          Login
        </Button>
      </form>
    </Layout>
  );
};

export default Login;