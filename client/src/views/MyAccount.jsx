import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";

import style from "../styles/MyAccount.module.css";

const myAccount = () => {
  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.contentContainer}>
          
        </div>
      </div>
    </>
  );
};

export default myAccount;
