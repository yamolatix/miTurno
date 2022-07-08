import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import { useEffect, useState } from 'react';
import TurnosUsers from '../views/TurnosUser';
import Calendar from '../views/Calendar';
import style from "../styles/Users.module.css";



function BranchOfficeSelector() {
    /* const branchOffices = axios.get('http://localhost:3001/api/branchOffice/showBranch')
        .then(arr => console.log('ARR ES ', arr.data)) */

    const [selectedBranchOffice, setSelectedBranchOffice] = useState({})

    const branchOffices = [
        {
            location: "rosario",
            address: "Av. Pellegrini 3345",
            phone: 3415358877,
            email: "rosario@correo.com",
            startTime: "09:00",
            endTime: "19:30",
            days: [0, 6],
            simultAppointment: 5,
            price: 500,
            id: 1
        },
        {
            location: "córdoba",
            address: "San Martín 2156",
            phone: 3514495621,
            email: "cordoba@correo.com",
            startTime: "09:00",
            endTime: "19:30",
            days: [0, 6],
            simultAppointment: 4,
            price: 500,
            id: 2
        },
        {
            location: "mendoza",
            address: "Av. Pellegrini 3345",
            phone: 2615458712,
            email: "mendoza@correo.com",
            startTime: "09:00",
            endTime: "19:30",
            days: [0, 6],
            simultAppointment: 4,
            price: 500,
            id: 3
        },
        {
            location: "belgrano",
            address: "Santa Fe 7253",
            phone: 1145358877,
            email: "belgrano@correo.com",
            startTime: "08:00",
            endTime: "19:30",
            days: [0],
            simultAppointment: 7,
            price: 700,
            id: 4
        },
        {
            location: "retiro",
            address: "Av. Illia 4651",
            phone: 1147854211,
            email: "retiro@correo.com",
            startTime: "08:00",
            endTime: "19:30",
            days: [0, 6],
            simultAppointment: 5,
            price: 700,
            id: 5
        }
    ]
  
  let clickedOffice = {}

  const handleSelection = (e) => {
    e.preventDefault();
    const location = e.target.innerText.toLowerCase()
    clickedOffice = branchOffices.find(branch => 
        branch.location === location);
    console.log('CLICKED ES ', clickedOffice)
    setSelectedBranchOffice(clickedOffice);
    localStorage.setItem('selectedBranchOffice', JSON.stringify(clickedOffice))
  }

  /* useEffect(() => {
    <TurnosUsers />
  }, [clickedOffice]) */

  return (
    <>
    <div id={style.dropBranches}>
    <DropdownButton variant="secondary" id="dropdown-basic-button" title="Seleccione una sucursal">
      {branchOffices.map(e => (
        <Dropdown.Item onClick={handleSelection}>{e.location.toUpperCase()}</Dropdown.Item>
        )
        )}
    </DropdownButton>
    </div>

    {localStorage.getItem('selectedBranchOffice')
    ? (
       <div className={style.calendarContainer}>
          <h5 >
            Turnos sucursal {selectedBranchOffice.location.toUpperCase()}
          </h5>
          <Calendar />
       </div>)
    : (<></>)
    }
    
    </>
  );
}

export default BranchOfficeSelector;