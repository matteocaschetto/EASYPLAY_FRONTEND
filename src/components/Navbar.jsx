import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/EASYPLAY_FIXED.svg";
import "../css/Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar expand="md" bg="light" variant="light" className="px-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="EasyPlay"
            style={{ width: "150px", marginRight: "10px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link as={Link} to="/eventi" className="text-black fs-5">
              Eventi
            </Nav.Link>
            <Nav.Link as={Link} to="/accedi" className="text-black fs-5">
              Accedi
            </Nav.Link>

            <Nav.Link as={Link} to="/chiSiamo" className="text-black fs-5">
              Cosa Facciamo
            </Nav.Link>
            <Nav.Link as={Link} to="/areapersonale" className="text-black fs-5">
              <i class="bi bi-person-fill-gear"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
