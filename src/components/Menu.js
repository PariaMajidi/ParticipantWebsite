import React from "react";
import { useHistory, useParams } from "react-router-dom";

import * as google from "../utils/google";

import Layout from "./Layout";
import Button from "./Button";

import style from "./Menu.module.scss";

const Menu = () => {
  const history = useHistory();

  return (
    <Layout>
      <div className={style.buttons}>
        <Button onClick={() => history.push("/select-folder")}>
          Experiment
        </Button>
        <Button onClick={() => google.writeSheet()}>Test</Button>

        <Button
          onClick={() => {
            google.signOut();
            history.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </Layout>
  );
};

export default Menu;
