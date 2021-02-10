import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Ready from "./Ready";
import Start from "./Start";
import Vibration from "./Vibration";
import VibrationFeel from "./VibrationFeel";
import Confidence from "./Confidence";
import End from "./End";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/ready">
          <Ready />
        </Route>

        <Route path="/vibration/:index/feel" exact>
          <VibrationFeel />
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
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
