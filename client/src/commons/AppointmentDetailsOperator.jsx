import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../styles/Users.module.css";
import { getFullDate } from "../utils/getFullDate";
import { getFixedTime } from "../utils/getFixedTime";
import parseJwt from "../hooks/parseJwt";


const AppointmentDetailsOperator = () => {

  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)

  const pickedDate = useSelector(state => state.appointment)
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const [appointmentUsers, setAppointmentUsers] = useState([])
  //const branchOffices = JSON.parse(localStorage.getItem('branches')).branches

  /* const asignedOffice = branchOffices.find(branch => 
    user.branchOffice.includes(branch._id))
  console.log('LA SUCURSAL A SETEAR ES ', asignedOffice) */
  
  // VER URL DE ACA ABAJO !!!!!!!!
  const getAppointmentUsers = () => {
    axios.get(`http://localhost:3001/api/appointment/${user.id}/dayAppointments`, {
      headers: {
        date: pickedDate.date,
        month: pickedDate.month,
        year: pickedDate.year,
        time: getFixedTime(pickedDate),
        id: pickedBranchOffice.id
      }
    })
    .then(arr => {
      console.log('USUARIOS CON ESTE TURNO SON ', arr.data.data)
      setAppointmentUsers(arr.data.data)
    })
    .catch(err => console.log(err))
  }

  const handleAssitance = () => {
    /* axios.put(`http://localhost:3001/api/appointment/${user.id}/showAppointments`, {
      id: 
  })
    .then */
}

  useEffect(()=> {
    getAppointmentUsers()
  },[pickedDate])

  return pickedDate.date ? (
    <div className={style.userDetails}>
      <h5>Detalles del turno:</h5>
      <ul>
        {<li>Sucursal: {pickedBranchOffice.location.toUpperCase()}</li>}
        {<li>Fecha: {getFullDate(pickedDate)}</li>}
        {<li>Hora: {getFixedTime(pickedDate)} hs</li>}
      </ul>
      {appointmentUsers.length
      ? (
        <>
        <h5>Usuarios agendados:</h5>
        <ul>
          {appointmentUsers.map(e => (
            <>  
            <li> {e.lname.toUpperCase()}, {e.fname.toUpperCase()}</li>
            <li> Teléfono: {e.phone}</li>
            <li> Email: {e.email}</li>
            <Button
              variant="secondary"
              className={style.sideButton}
              onClick={() => handleAssitance()}
            >
              Asistió
            </Button>
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

/*
router.put("/:operatorId/showAppointments", async (req, res) => {
  const { operatorId } = req.params;
  const appointmentId = req.body.id;
  /*