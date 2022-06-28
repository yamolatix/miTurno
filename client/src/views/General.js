import React from "react";

import style from "../styles/General.module.css";

const General = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={require("../images/logo.png")} alt="miTurno"/>
      </div>
      <div className={style.contentContainer}>
        <div></div>
      </div>
    </div>
  );
};

export default General;
