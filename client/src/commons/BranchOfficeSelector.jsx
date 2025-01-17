import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Calendar from '../views/Calendar';
import style from "../styles/Users.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { branchOfficePicker } from '../features/branchOffice';
import parseJwt from "../hooks/parseJwt";
import PATH from '../path';

function BranchOfficeSelector() {
 
  const dispatch = useDispatch()
  const [branchOffices, setBranchOffices] = useState([])
  
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)

  const handleSelection = (e) => {
    e.preventDefault();
    const locationClon = e.target.innerText.toLowerCase()
    const clickedOffice = branchOffices.find(branch => 
        branch.location === locationClon);
    dispatch(branchOfficePicker({clickedOffice}));
  }

  const getBranchOffices = async () => {   
    const res = await axios.get(`${PATH}/api/branchOffice/showBranch`);     
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
              {e.location.toUpperCase()}
            </Dropdown.Item>
            )
          )}
        </DropdownButton>
      </div>

      <>{pickedBranchOffice
        ? (
          <div className={style.calendarContainer}>
            <h5 >
              Turnos sucursal {pickedBranchOffice.location.toUpperCase()}
            </h5>
            <Calendar />
          </div>)
        : (<></>)
      }</>
    </>
  )  
};

export default BranchOfficeSelector;