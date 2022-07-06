import React from "react";
//import { useState, useEffect } from "react";
import CustomNavbar from "../commons/CustomNavbar";
import Calendar from "./Calendar";

import style from "../styles/Users.module.css";

const TurnosUsers = () => {

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.sideContainer}>
          
        </div>
        <div className={style.contentContainer}>
          <div className={style.tableContainer}>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default TurnosUsers;
