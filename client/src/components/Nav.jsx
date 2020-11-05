import React, {useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import {UserContext} from "../App"

const Navigation = () => {

  const me = useContext(UserContext)
  
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">Drinkr</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!me.user ? (
            <>
              <Nav.Link href="/register">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </>
          ) : (
            <li style={{color: "white"}} >{me.user.email}</li>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Navigation;
