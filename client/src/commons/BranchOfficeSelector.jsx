import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import { useEffect, useState } from 'react';
import TurnosUsers from '../views/TurnosUser';
import Calendar from '../views/Calendar';
import style from "../styles/Users.module.css";



function BranchOfficeSelector() {
  
  const initValueSelectedBranchOffice = localStorage.getItem('selectedBranchOffice')
    ? JSON.parse(localStorage.getItem('selectedBranchOffice'))
    : {}

  const [branchOffices, setBranchOffices] = useState([])
  const [selectedBranchOffice, setSelectedBranchOffice] = useState(initValueSelectedBranchOffice)

  const handleSelection = (e) => {
    e.preventDefault();
    const locationClon = e.target.innerText.toLowerCase()
    const clickedOffice = branchOffices.find(branch => 
        branch.location === locationClon);
    console.log('CLICKED ES ', clickedOffice)
    setSelectedBranchOffice(clickedOffice);
    localStorage.setItem('selectedBranchOffice', JSON.stringify(clickedOffice))
  }

  const getBranchOffices = async () => {   
    const res = await axios.get('http://localhost:3001/api/branchOffice/showBranch');     
    setBranchOffices(res.data.data)   
    }
        
  useEffect(() => {
    getBranchOffices()
  }, [])

  return (
    <>
    <div id={style.dropBranches}>
    <DropdownButton variant="secondary" id="dropdown-basic-button" title="Seleccione una sucursal">
      {branchOffices.map(e => (
        <Dropdown.Item 
          onClick={handleSelection}
          key={branchOffices.indexOf(e)}  
            >
                {console.log('EN EL DROP, BACKOFFICES ES ', branchOffices)}
              {e.location.toUpperCase()}
        </Dropdown.Item>
        )
      )}
    </DropdownButton>
    </div>

    <>{localStorage.getItem('selectedBranchOffice')
    ? (
       <div className={style.calendarContainer}>
          <h5 >
            Turnos sucursal {selectedBranchOffice.location
                            ? selectedBranchOffice.location.toUpperCase() : "(seleccione una sucursal)"}
          </h5>
          <Calendar />

          {/* condicionar lo que sigue a que tenga algún horario en amarillo */}
          <ul className={style.fewStock}>
            <li>
                últimos turnos disponibles
            </li>
          </ul>
       </div>)
    : (<></>)
    }</>
    
    </>
  );
}

export default BranchOfficeSelector;