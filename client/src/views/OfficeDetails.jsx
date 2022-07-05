import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";
import Button from "react-bootstrap/esm/Button";
import parseJwt from "../hooks/parseJwt";
import { useNavigate } from "react-router-dom";

import style from "../styles/OfficeDetails.module.css";

const BranchOffices = ({ office }) => {
  console.log(office);

  const [edited, setEdited] = useState(false);
  const [isEditingBranch, setIsEditingBranch] = useState(false);
  const [isEditingManager, setIsEditingManager] = useState(false);
  const [isEditingAppointments, setIsEditingAppointments] = useState(false);
  const [isEditingOperators, setIsEditingOperators] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.contentContainer}>
          <div className={style.nameContainer}>
            <h4>Sucursal {office.location + " - " + office.address}</h4>
          </div>
          <div className={style.dataContainer}>
            <div className={style.leftDataContainer}>
              <div className={style.generalContainer}>
                <div className={style.generalContainerTitle}>
                  <h5>Datos de Sucursal</h5>
                  <Button
                    variant="secondary"
                    className={style.buttons}
                    onClick={() => {
                      setEdited(true);
                      setIsEditingBranch(true);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                    &nbsp;&nbsp;Editar
                  </Button>
                </div>
                <ul>
                  <li>ID Sucursal:&emsp;{office._id}</li>
                  <li>
                    Nombre:&emsp;{office.location + " - " + office.address}
                  </li>
                  <li>Dirección:&emsp;{isEditingBranch ? <input placeholder={office.address}></input> : office.address}</li>
                  <li>Localidad:&emsp;{office.location}</li>
                </ul>
              </div>
              <div className={style.generalContainer}>
                <div className={style.generalContainerTitle}>
                  <h5>Datos de Responsable de Sucursal</h5>
                  <Button
                    variant="secondary"
                    className={style.buttons}
                    onClick={() => setEdited(true)}
                  >
                    <i className="bi bi-pencil-square"></i>
                    &nbsp;&nbsp;Editar
                  </Button>
                </div>
                <ul>
                  <li>Responsable:&emsp;{office.managerName}</li>
                  <li>Teléfono:&emsp;{office.managerPhone}</li>
                  <li>Dirección:&emsp;{office.managerAddress}</li>
                </ul>
              </div>
              <div className={style.generalContainer}>
                <div className={style.generalContainerTitle}>
                  <h5>Datos de Atención</h5>
                  <Button
                    variant="secondary"
                    className={style.buttons}
                    onClick={() => setEdited(true)}
                  >
                    <i className="bi bi-pencil-square"></i>
                    &nbsp;&nbsp;Editar
                  </Button>
                </div>
                <ul>
                  <li>Hora de apertura:&emsp;{office.startTime}:00 hs</li>
                  <li>Hora de cierre:&emsp;{office.endTime}:00 hs</li>
                  <li>Turnos en simultáneo:&emsp;{office.simultAppointment}</li>
                  <li>
                    Precio del turno:&emsp;ARS {office.price.$numberDecimal}
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.rightDataContainer}>
              <div className={style.generalContainer}></div>
              <div className={style.generalContainer}>
                <div className={style.generalContainerTitle}>
                  <h5>Operadores asignados a la sucursal</h5>
                  <Button
                    variant="secondary"
                    className={style.buttons}
                    onClick={() => setEdited(true)}
                  >
                    <i className="bi bi-pencil-square"></i>
                    &nbsp;&nbsp;Editar
                  </Button>
                </div>
                <ul>
                  <li>- Juancho</li>
                  <li>- Juancho</li>
                  <li>- Juancho</li>
                  <li>- Juancho</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={style.buttonsContainer}>
            <div className={style.startButtons}>
              <Button
                variant="secondary"
                className={style.buttons}
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left-circle-fill"></i>
                &nbsp;&nbsp;Volver
              </Button>
            </div>
            <div className={style.endButtons}>
              {edited ? (
                <>
                  <Button variant="secondary" className={style.buttons}>
                    Descartar Cambios
                  </Button>
                  <Button variant="secondary" className={style.buttons}>
                    Confirmar Cambios
                  </Button>
                </>
              ) : (
                <></>
              )}
              <Button variant="secondary" className={style.buttons}>
                + Agregar sucursal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchOffices;
