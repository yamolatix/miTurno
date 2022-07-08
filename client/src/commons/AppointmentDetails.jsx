import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import style from "../styles/Users.module.css";

const AppointmentDetails = () => {

    /* console.log('SUCURSAL ES ', branchOffice)
    console.log('DATE ES ', date)
    console.log('TIME ES ', time) */

    const branchOffice = {
        location: "rawson",
        address: "Av. Illia 4651",
        phone: 1147854211,
        email: "rawson@correo.com",
        startTime: "08:00",
        endTime: "19:30",
        days: [0, 6],
        simultAppointment: 5,
        price: 700,
        id: 5
    }

    const time = "13:00"
    const date = 'viernes 08 de julio de 2022'

    const handleRoleChange = () => {
      const idUser = '62c712f4c261b4d23d5b93b6'
      const date = '08'
      const month = '06'
      const year = '2022'
      const day = '5'
      const sucId = '62c7105843c1b26ad3f3583b'
      axios.post(`http://localhost:3001/api/appointment/${idUser}`, {
        date,
        month,
        year,
        day,
        time,
        sucId
      })
    }

  return time ? (
    <div className={style.userDetails}>
      <h5>Detalle del turno</h5>
      <ul>
        <li>Sucursal: {branchOffice.location.toUpperCase()}</li>
        <li>Dirección: {branchOffice.address}</li>
        <li>Teléfono: {branchOffice.phone}</li>
        <li>Email: {branchOffice.email}</li>
        <li>Fecha: {date}</li>
        <li>Hora: {time}</li>
        <li>Precio: ${branchOffice.price}</li>
      </ul>
      
        <>
          <Button
            variant="secondary"
            className={style.sideButton}

            onClick={() =>
              handleRoleChange()
            }

          >
            Reservar
          </Button>
          <Button
            variant="secondary"
            className={style.sideButton}

            //onClick={() => handleDelete(user._id)}

          >
            Cancelar
          </Button>
        </>
      
    </div>
  ) : (
    <></>
  );
};

export default AppointmentDetails;
