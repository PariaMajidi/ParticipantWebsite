import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";

import Ready from "./Ready";
import Start from "./Start";
import Vibration from "./Vibration";
import VibrationFeedback from "./VibrationFeedback";
import Confidence from "./Confidence";
import End from "./End";
import Login from "./Login";
import SelectFolder from "./SelectFolder";
import Setup from "./Setup";
import Menu from "./Menu";

import { fetchSounds } from "../redux/sounds";
import * as google from "../utils/google";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(fetchSounds());
    dispatch(
      google.initialize(() => {
        history.push("/menu");
      })
    );
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/ready">
          <Ready />
        </Route>

        <Route path="/vibration/:index/feel" exact>
          <VibrationFeedback />
        </Route>
        <Route path="/vibration/:index/confidence" exact>
          <Confidence />
        </Route>
        <Route path="/vibration/:index" exact>
          <Vibration />
        </Route>
        <Route path="/end" exact>
          <End />
        </Route>
        <Route path="/start">
          <Start />
        </Route>
        <Route path="/select-folder">
          <SelectFolder />
        </Route>
        <Route path="/setup">
          <Setup />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default App;
