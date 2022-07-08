import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import parseJwt from "../hooks/parseJwt";

import style from "../styles/Welcome.module.css";

const Welcome = () => {

  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img
          className={style.largeLogo}
          src={require("../images/1.png")}
          alt="miTurno"
        />
        <img
          className={style.smallLogo}
          src={require("../images/2.png")}
          alt="miTurno"
        />
      </div>
        <div className={style.contentContainer}>
            <div>
                <Link to="/calendar">
                    <h3>Sacar un turno</h3>
                </Link>
            </div>
            <div >
                <Link to="/">
                    <h3>Ver mis turnos</h3>
                </Link>
            </div>
            
        </div>
    </div>
  );
};

export default Welcome;