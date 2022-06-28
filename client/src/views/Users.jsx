import React from "react";
import CustomNavbar from "../commons/CustomNavbar";
import Table from "react-bootstrap/Table";

import style from "../styles/Users.module.css";

const Users = () => {
  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.sideContainer}></div>
        <div className={style.contentContainer}>
          <Table responsive striped bordered hover className={style.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th colSpan={2}>Rol</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00001</td>
                <td>Spinetta</td>
                <td>Luis Alberto</td>
                <td>12951753</td>
                <td>OP</td>
                <td>O</td>
                <td>D E B</td>
              </tr>
              <tr>
                <td>00002</td>
                <td>Sosa</td>
                <td>Mercedes</td>
                <td>8329875</td>
                <td>CL</td>
                <td>O</td>
                <td>D E B</td>
              </tr>
              <tr>
                <td>00003</td>
                <td>Prodan</td>
                <td>Luca</td>
                <td>14329875</td>
                <td>AD</td>
                <td>O</td>
                <td>D E B</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Users;
