import React from "react";

import Layout from "./Layout";
import Button from "./Button";

import ButtonList from "./ButtonList";

const SubMenu = () => (
  <Layout>
    <ButtonList>
      <Button.Link to="/setup">Experiment</Button.Link>
      <Button.Link to="/file-list">List</Button.Link>
    </ButtonList>
  </Layout>
);

export default SubMenu;
