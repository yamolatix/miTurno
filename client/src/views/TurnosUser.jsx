import React from "react";
import CustomNavbar from "../commons/CustomNavbar";
import AppointmentDetails from "../commons/AppointmentDetails"
import style from "../styles/Users.module.css";
import BranchOfficeSelector from "../commons/BranchOfficeSelector";

const TurnosUsers = () => {

  return (
    <>
      <CustomNavbar />

      <div className={style.mainContainer}>
        <div className={style.sideContainer}>
          <AppointmentDetails
          />
        </div>

        <div className={style.contentContainer}>
          <div className={style.tableContainer}>
            <BranchOfficeSelector />
          </div>
        </div>

      </div>
    </>
  );
};

export default TurnosUsers;
