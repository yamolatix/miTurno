import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import parseJwt from "../hooks/parseJwt";
import capitalize from "../hooks/capitalize"
import countdown from "../utils/countdown";

import style from "../styles/CustomNavbar.module.css";


const CustomNavbar = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user")).data.token;
  const payload = parseJwt(token);
  const role = payload.admin ? "AD" : payload.operator ? "OP" : "CL";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  

  return (
    <div>
      <Navbar variant="dark" expand="lg" className={style.navbar}>
        <Container fluid className="mx-4">
          <Navbar.Brand>
            <img
              src={require("../images/3.png")}
              height="36px"
              className="d-inline-block align-top"
              alt="Logo mi turno"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <a className="navbar-brand ms-5" href="#">Hola {capitalize(payload.fname)}</a>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {role === "AD" ? (
                <>
                  <Nav.Link href="/offices" className="mx-3 fs-5">
                    Sucursales
                  </Nav.Link>
                  <Nav.Link href="/users" className="mx-3 fs-5">
                    Usuarios
                  </Nav.Link>
                  <Nav.Link href="#link" className="mx-3 fs-5">
                    Turnos
                  </Nav.Link>
                </>
              ) : role === "OP" ? (
                <>
                  <Nav.Link href="#link" className="mx-3 fs-5">
                    Turnos
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Item className="navbar-brand ms-5">
                    {/* {countdown()} */}
                  </Nav.Item>
                  <Nav.Link href="/calendar" className="mx-3 fs-5">
                    Reservar
                  </Nav.Link>
                  <Nav.Link href="/myappointments" className="mx-3 fs-5">
                    Mis Turnos
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="/myaccount" className="mx-3 fs-5">
                Mi Perfil
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="mx-3 fs-5">
                LOGOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
