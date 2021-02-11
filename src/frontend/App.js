import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import Ready from "./Ready";
import Start from "./Start";
import Vibration from "./Vibration";
import VibrationFeedback from "./VibrationFeedback";
import Confidence from "./Confidence";
import End from "./End";
import Login from "./Login";

import { fetchSounds } from "./redux/sounds";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSounds());
  }, []);

  return (
    <Router>
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
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
