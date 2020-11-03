import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Nav from "./components/Nav";
import SearchPage from "./components/SearchPage";
import DrinkPage from "./components/DrinkPage";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={() => <RegisterPage />} />
            <Route
              exact
              path="/login"
              component={() => <div>Login placeholder</div>}
            />
            <Route exact path="/browse" component={SearchPage} />
            <Route exact path="/drink/:id" component={DrinkPage} />
            <Route component={() => <div>404 Not found</div>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
