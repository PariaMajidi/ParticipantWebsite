import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./Layout";
import Button from "./Button";
import { setSounds, getFolderId } from "../redux/sounds";
import { fetchSounds } from "../utils/google";
import shuffle from "../utils/shuffle";

import style from "./Setup.module.scss";

const Setup = () => {
  const [repetitions, setRepetitions] = useState(
    parseInt(localStorage.getItem("repetitions")) || 4
  );

  const folderId = useSelector(getFolderId);

  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchSounds(folderId).then((files) => {
      setFiles(files);
    });
  }, [folderId]);

  const onSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("repetitions", repetitions);

    const pool = files
      .map(({ id, name, webContentLink }) => ({
        id,
        name,
        url: webContentLink,
      }))
      .reduce(
        (acc, file) => [
          ...acc,
          ...new Array(repetitions).fill(0).map((r) => file),
        ],
        []
      );

    console.log("pool", pool.length, repetitions);

    dispatch(setSounds(shuffle(pool)));
    history.push("/start");
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className={style.form}>
        <span className={style.detected}>{files.length} sounds detected</span>
        <input
          placeholder="Repetitions"
          type="number"
          defaultValue={repetitions}
          className={style.input}
          onChange={(e) => setRepetitions(parseInt(e.target.value))}
        />
        <Button type="submit">Select repetitions</Button>
      </form>
    </Layout>
  );
};

export default Setup;
