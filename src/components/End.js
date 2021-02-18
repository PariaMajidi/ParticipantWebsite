import React from "react";

import Layout from "./Layout";
import ButtonList from "./ButtonList";
import Button from "./Button";

const End = () => (
  <Layout title="Finished">
    <ButtonList>
      <Button.Link to="/menu">Menu</Button.Link>
      <Button.Link to="/start">New Participant</Button.Link>
    </ButtonList>
  </Layout>
);

export default End;
