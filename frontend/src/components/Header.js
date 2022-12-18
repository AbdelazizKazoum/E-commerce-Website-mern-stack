import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LinkContainer from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const loginUser = useSelector((state) => state.userLogin);

  const { userInfo } = loginUser;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar
        style={{ position: "absolute", width: "100%", zIndex: "10000" }}
        bg="light"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/">Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              //style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer className="mx-2" style={{ border: "none" }}>
                <Link to="/cart/1">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer style={{ border: "none" }} to="/profile">
                    <NavDropdown.Item>
                      {" "}
                      <Link to="/profile">Profile</Link>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer className="mx-2" style={{ border: "none" }}>
                  <Link to="/login">
                    <i className="fas fa-user"></i> Sign In
                  </Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
