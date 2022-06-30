import React from "react";
import Button from "react-bootstrap/Button";
import style from "../styles/Users.module.css";

const UserDetails = ({ user }) => {
  console.log(user.lname);

  return user._id ? (
    <div className={style.userDetails}>
      <h5>Detalle de usuario</h5>
      <ul>
        <li>ID: {user._id}</li>
        <li>Rol: {user.admin ? "AD" : user.operator ? "OP" : "CL"}</li>
        <li>Apellido: {user.lname}</li>
        <li>Nombre: {user.fname}</li>
        <li>DNI: {user.dni}</li>
        <li>E-mail: {user.email}</li>
        <li>Fecha de nacimiento: {user.birthdate}</li>
        <li>Teléfono: {user.phone}</li>
        <li>Domicilio: {user.address}</li>
      </ul>
      <Button variant="secondary" className={style.sideButton}>
        Cambiar Rol
      </Button>
      <Button variant="secondary" className={style.sideButton}>
        Eliminar
      </Button>
    </div>
  ) : (
    <></>
  );
};

export default UserDetails;
