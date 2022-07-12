import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import style from "../styles/Users.module.css";
import { getFullDate } from "../utils/getFullDate";
import { getFixedTime } from "../utils/getFixedTime";
import parseJwt from "../hooks/parseJwt";

const AppointmentDetails = () => {

  //const initialSelectedDate = new Date()
  const pickedDate = useSelector(state => state.appointment)
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)
  //const [selectedDate, setSelectedDate] = useState(initialSelectedDate.getDate().toString());
  
  // let auxDate = ''
  
  //console.log('SELECTED DATE EN APPOINTMENT DETAILS ES ', selectedDate)
  //console.log('PICKED DATE EN APPOINTMENT DETAILS ES ', pickedDate)
  //console.log('PICKED BRANCH EN APPOINTMENT DETAILS ES ', pickedBranchOffice)
  //console.log('USER EN APPOINTMENT DETAILS ES ', user)
  
  const handleSaveAppointment = () => {
    axios.post(`http://localhost:3001/api/appointment/${user.id}`, {
      date: pickedDate.date,
      month: pickedDate.month,
      year: pickedDate.year,
      day: pickedDate.day,
      time: getFixedTime(pickedDate),
      id: pickedBranchOffice.id
    })
    .then(() => alert('Turno reservado exitosamente'))
    .catch(err => console.log(err))
  }

  
  /* if (pickedDate.date === auxDate) {
    console.log('LA COMPARACION DE GLOBAL Y AUX DA ', pickedDate.date == auxDate)
    console.log('FECHA LOCAL ANTES DE INTENTAR RESETEARLA ES ', selectedDate)
    setSelectedDate(pickedDate.date)
    console.log('FECHA LOCAL DESPUES DE INTENTAR RESETEARLA ES ', selectedDate)
  } */

  //if (pickedDate.date) auxDate = pickedDate.date

  //console.log('FECHA GLOBAL ES ', pickedDate.date)
  //console.log('FECHA LOCAL ES ', selectedDate)
  //console.log('FECHA AUXILIAR ES ', auxDate)

  //console.log('LOS DATES SON IGUALES ?', pickedDate.date == selectedDate)

  /* useEffect(() => {
    console.log('DISPARÓ EL USE EFFECT')
  }, [!pickedDate.date])
 */
  return pickedDate.date ? (
    <div className={style.userDetails}>
      <h5>Detalle del turno</h5>
      <ul>
        <li>Sucursal: {pickedBranchOffice.location.toUpperCase()}</li>
        <li>Dirección: {pickedBranchOffice.address}</li>
        <li>Teléfono: {pickedBranchOffice.phone}</li>
        <li>Email: {pickedBranchOffice.email}</li>
        <li>Fecha: {getFullDate(pickedDate)}</li>
        <li>Hora: {getFixedTime(pickedDate)} hs</li>
        <li>Precio: ${pickedBranchOffice.price.$numberDecimal}</li>
      </ul>
      
        <>
          <Button
            variant="secondary"
            className={style.sideButton}
            onClick={() => handleSaveAppointment()}
          >
            Reservar
          </Button>
          <Button
            variant="secondary"
            className={style.sideButton}

            onClick={() => {}}

          >
            Cancelar
          </Button>
        </>
      
    </div>
  ) : //selectedDate.setDate(Number(pickedDate.date)) 
  (
    <></>
  ) ;
};

export default AppointmentDetails;
