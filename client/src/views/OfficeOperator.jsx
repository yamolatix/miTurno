import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Calendar from '../views/Calendar';
import style from "../styles/Users.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { branchOfficePicker } from '../features/branchOffice';
import { branchOfficesGetter } from '../features/branchOfficesList';
import parseJwt from "../hooks/parseJwt";
import CalendarOperator from './CalendarOperator';
import PATH from '../path';

function OfficeOperator() {  
  
  const dispatch = useDispatch()

  //dispatch(branchOfficesGetter())
  //const pickedDate = useSelector(state => state.appointment.value)
  const [branchOffices, setBranchOffices] = useState([])
  //const branchOffices = JSON.parse(localStorage.getItem('branches')).branches
  const getBranchOffices = () => {   
    axios.get(`${PATH}/api/branchOffice/showBranch`)
      .then(res => setBranchOffices(res.data.data))
      .catch(err => console.log(err))
  }
  
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)

  const asignedOffice = branchOffices.find(branch => {
    return user.branchOffice[0].includes(branch._id)
  })
  
  dispatch(branchOfficePicker(asignedOffice))  
        
  useEffect(() => {
    getBranchOffices()
  }, [])

  return (
    <>{pickedBranchOffice
        ? (
          <div className={style.calendarContainer}>
            <h5 >
              Turnos sucursal: {pickedBranchOffice.location.toUpperCase()}
            </h5>
            <CalendarOperator />
          </div>)
        : (<></>)
      }
    </>
  ) 
};

export default OfficeOperator;