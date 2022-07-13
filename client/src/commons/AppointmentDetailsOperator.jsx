import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import style from "../styles/Users.module.css";
import { getFullDate } from "../utils/getFullDate";
import { getFixedTime } from "../utils/getFixedTime";

const AppointmentDetailsOperator = () => {

  const pickedDate = useSelector(state => state.appointment)
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  
  // VER URL DE ACA ABAJO !!!!!!!!
  const getAppointmentUsers = () => {
    axios.get(`http://localhost:3001/api/appointment/`, {
      date: pickedDate.date,
      month: pickedDate.month,
      year: pickedDate.year,
      day: pickedDate.day,
      time: getFixedTime(pickedDate),
      id: pickedBranchOffice.id
    })
    .then(users => console.log(users.data))
    .catch(err => console.log(err))
  }

  return pickedDate.date ? (
    <div className={style.userDetails}>
      <h5>Detalles del turno:</h5>
      <ul>
        <li>Fecha: {getFullDate(pickedDate)}</li>
        <li>Hora: {getFixedTime(pickedDate)} hs</li>
      </ul>
      {getAppointmentUsers().length
      ? (
        <>
        <h5>Usuarios agendados:</h5>
        <ul>
          {getAppointmentUsers().map(e => (
            <>  
            <li> {e.lname.toUpperCase()}, {e.fname.toUpperCase()}</li>
            <li> Teléfono: {e.phone}</li>
            <li> Email: {e.email}</li>
            {/* agregar para marcar si asistió o no */}
            </>
            )
          )}  
        </ul>
        </>
        )
      : (
        <h5>NO HAY USUARIOS PARA ESTE TURNO</h5>
        )
      }
    </div>
    )
    : //selectedDate.setDate(Number(pickedDate.date)) 
    (
    <></>
    );
};

export default AppointmentDetailsOperator;