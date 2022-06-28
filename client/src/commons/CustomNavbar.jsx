import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import style from "../styles/CustomNavbar.module.css";

const CustomNavbar = () => {
  return (
    <div>
      <Navbar variant="dark" expand="lg" className={style.navbar}>
        <Container fluid className="mx-4">
          <Navbar.Brand href="#home">
            <img
              src={require("../images/3.png")}
              height="36px"
              className="d-inline-block align-top"
              alt="Logo mi turno"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#link" className="mx-3 fs-5">Sucursales</Nav.Link>
              <Nav.Link href="#link" className="mx-3 fs-5">Usuarios</Nav.Link>
              <Nav.Link href="#link" className="mx-3 fs-5">Turnos</Nav.Link>
              <Nav.Link href="#link" className="mx-3 fs-5">Mi Perfil</Nav.Link>
              <Nav.Link href="#link" className="mx-3 fs-5">LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
