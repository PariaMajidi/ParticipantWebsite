import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./Layout";
import Button from "./Button";
import { setFolderId } from "../redux/sounds";

import style from "./Start.module.scss";

const SelectFolder = () => {
  const [folder, setFolder] = useState(localStorage.getItem("folderId"));

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("folderId", folder);

    dispatch(setFolderId(folder));
    history.push("/setup");
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className={style.form}>
        <input
          placeholder="Drive Folder id"
          type="text"
          defaultValue={folder}
          className={style.input}
          onChange={(e) => setFolder(e.target.value)}
        />
        <Button type="submit" disabled={!folder}>
          Select folder
        </Button>
      </form>
    </Layout>
  );
};

export default SelectFolder;
