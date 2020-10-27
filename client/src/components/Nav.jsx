import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => (
  <Navbar bg="dark" variant="dark" expand="sm">
    <Navbar.Brand href="/">Drinkr</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/register">Sign Up</Nav.Link>
        <Nav.Link href="/login">Log In</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
