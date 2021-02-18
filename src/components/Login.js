import React from "react";

import * as google from "../utils/google";

import Layout from "./Layout";
import Button from "./Button";

const Login = () => {
  return (
    <Layout>
      <Button onClick={google.signIn}>Login</Button>

      <Button onClick={google.signOut}>Logout</Button>
    </Layout>
  );
};

export default Login;
