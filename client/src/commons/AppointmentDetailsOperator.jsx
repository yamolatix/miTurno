import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import style from "../styles/Users.module.css";
import { getFullDate } from "../utils/getFullDate";
import { getFixedTime } from "../utils/getFixedTime";
import parseJwt from "../hooks/parseJwt";


const AppointmentDetailsOperator = () => {

  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)

  const pickedDate = useSelector(state => state.appointment)

  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)

  
  const fakeUsers = [
    {
      lname: 'Moura',
      fname: 'Federico',
      phone: '0303456',
      email: 'virus@mail.com'
    },
    {
      lname: 'Aznar',
      fname: 'Pedro',
      phone: '3415897456',
      email: 'musiquita@mail.com'
    },
    {
      lname: 'Abuelo',
      fname: 'Miguel',
      phone: '01145789143',
      email: 'delanada@mail.com'
    }
  ]
  
  const [appointmentUsers, setAppointmentUsers] = useState(fakeUsers)

  // VER URL DE ACA ABAJO !!!!!!!!
  const getAppointmentUsers = () => {
    if (pickedBranchOffice && pickedDate) {
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
    };
  };

  const handleAssitance = (appointment) => {
    /* axios.put(`http://localhost:3001/api/appointment/${user.id}/showAppointments`, {
      id: (appointmentId)
  })
    .then(() => {
      appointmentUsers.splice(appointmentUsers.indexOf(appointment), 1)
      Report.success('miTurno', 'Se confirmó la asistencia del usuario', 'Ok');
    })
    .catch(err => Report.failure('miTurno', {err}, 'Ok')) */
}

  useEffect(()=> {
    //getAppointmentUsers()
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
        <h5 className={style.agendados}> Usuarios agendados: </h5>
        <ul>
          {appointmentUsers.map(e => (
            <>
              <div className={style.asistentes}>  
                <li> {e.lname.toUpperCase()}, {e.fname.toUpperCase()}</li>
                <li> Teléfono: {e.phone}</li>
                <li> Email: {e.email}</li>
                <Button
                  variant="secondary"
                  className={style.sideButton}
                  onClick={(appointment) => {
                    //handleAssitance(appointment)
                    }
                  }
                >
                  Asistió
                </Button>
              </div>
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
  */