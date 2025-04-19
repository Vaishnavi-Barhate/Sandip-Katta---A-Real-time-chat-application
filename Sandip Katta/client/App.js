import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CampusCode from "./CampusCode";
import Chat from "./Chat"; // ChatRoom component you created earlier

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CampusCode} />
        <Route path="/Chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
