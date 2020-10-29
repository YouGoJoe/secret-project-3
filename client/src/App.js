import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage"
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/register"
              component={() => <RegisterPage />}
            />
            <Route
              exact
              path="/login"
              component={() => <div>Login placeholder</div>}
            />
            <Route component={() => <div>404 Not found</div>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
