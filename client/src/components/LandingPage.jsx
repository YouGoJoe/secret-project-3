import React from "react";
import { Navbar, Jumbotron } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Drinkr</Navbar.Brand>
      </Navbar>
      <Jumbotron>
        <h1>Drinkr</h1>
        <p>Consume and compare liquids with friends</p>
      </Jumbotron>
    </div>
  );
};

export default LandingPage;
