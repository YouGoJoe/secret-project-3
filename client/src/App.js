import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Nav from "./components/Nav";
import SearchPage from "./components/SearchPage";
import DrinkPage from "./components/DrinkPage";
import setAuthToken from "./utils/setAuthToken"
import "./App.css";

export const UserContext = createContext(null);

if(localStorage.getItem("token")){
  setAuthToken(localStorage.getItem("token"))
}

export default function App() {
  return (
    <UserContext.Provider value={null}>
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
    </UserContext.Provider>
  );
}
