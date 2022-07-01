import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";
import Button from "react-bootstrap/Button";

import style from "../styles/MyAccount.module.css";

const myAccount = () => {
  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.contentContainer}>
          <div className={style.userDetails}>
            <h3>Mi Perfil</h3>
            <ul>
              <li>ID: iujcdjcnmdcasdc&emsp;&emsp;&emsp;&emsp;&emsp;Rol: CL</li>
              <li>Apellido: Jaliff</li>
              <li>Nombre: Toby</li>
              <li>DNI: 30121212</li>
              <li>E-mail: toby@mail.com</li>
              <li>Fecha de nacimiento: 26/04/1984</li>
              <li>Teléfono: 299 6666666</li>
              <li>Domicilio: Brown 145</li>
            </ul>
          </div>
          <div className={style.buttonsContainer}>
            <Button variant="secondary" className={style.buttons}>Guardar cambios</Button>
            <Button variant="secondary" className={style.buttons}>Descartar cambios</Button>
            <Button variant="secondary" className={style.buttons}>Eliminar mi cuenta</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default myAccount;
