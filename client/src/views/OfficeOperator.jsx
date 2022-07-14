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

function OfficeOperator() {

  /* const getBranchOffices = async () => {   
    const res = await axios.get('http://localhost:3001/api/branchOffice/showBranch');     
    return res.data.data  
    } */
  
  //const initValueBranchOffices = getBranchOffices()    
  
  const dispatch = useDispatch()

  //dispatch(branchOfficesGetter())
  //const pickedDate = useSelector(state => state.appointment.value)
  //const [branchOffices, setBranchOffices] = useState(getBranchOffices())
  const branchOffices = JSON.parse(localStorage.getItem('branches')).branches
  

  console.log('LISTA DE SUCURSALES ', branchOffices)
  //const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)

  console.log('EL USER ES ', user)
  
  console.log('ES ADMIN ? ', user.admin)
  console.log('ES OPERADOR ? ', user.operator)

 /*  const handleSelection = (e) => {
    e.preventDefault();
    const locationClon = e.target.innerText.toLowerCase()
    const clickedOffice = branchOffices.find(branch => 
        branch.location === locationClon);
    dispatch(branchOfficePicker({clickedOffice}));
  } */

  console.log('LA SUC DEL OPERADOR ES ', user.branchOffice[0])
  console.log('OFICINAS ', branchOffices)
  
  const asignedOffice = branchOffices.find(branch => 
      user.branchOffice.includes(branch._id))
    console.log('LA SUCURSAL A SETEAR ES ', asignedOffice)
      //dispatch(branchOfficePicker(asignedOffice))
    //branchOffices.forEach(e=> console.log('SUC ID ', e.id))
   // }

  //console.log('LA SUCURSAL SETEADA GLOBALMENTE ES ', pickedBranchOffice)  

  /* const getBranchOffices = async () => {   
    const res = await axios.get('http://localhost:3001/api/branchOffice/showBranch');     
    setBranchOffices(res.data.data)   
    } */
        
  /* useEffect(() => {
    console.log('ESTAMOS EN EL USEEFFECT')
    operatorBranchOfficeSetter()
    //dispatch(branchOfficesGetter())
  }, []) */

  return (
      <>
      
    <div className={style.calendarContainer}>
      <h5 >
        Turnos sucursal {asignedOffice.location.toUpperCase()}
      </h5>
      <CalendarOperator pickedBranchOffice={ asignedOffice }/>
    </div>
    </>
  )
};

export default OfficeOperator;