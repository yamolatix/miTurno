import React from "react";
import CustomNavbar from "../commons/CustomNavbar";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

import style from "../styles/Users.module.css";

const Users = () => {
  const users = [
    {
      id: "0001",
      lname: "Spinetta",
      fname: "Luis Alberto",
      dni: "12351665",
      role: "CL",
      delete: (
        <i
          className="bi bi-trash3"
          role="button"
          onClick={() => console.log("TRASH", users[0].id)}
        ></i>
      ),
    },
    {
      id: "0002",
      lname: "Sosa",
      fname: "Mercedes",
      dni: "8001635",
      role: "OP",
      delete: (
        <i
          className="bi bi-trash3"
          role="button"
          onClick={() => console.log("TRASH")}
        ></i>
      ),
    },
    {
      id: "0003",
      lname: "Prodan",
      fname: "Luca",
      dni: "10655599",
      role: "AD",
      delete: (
        <i
          className="bi bi-trash3"
          role="button"
          onClick={() => console.log("TRASH")}
        ></i>
      ),
    },
    {
      id: "0004",
      lname: "Calamaro",
      fname: "Andrés",
      dni: "15253339",
      role: "CL",
      delete: (
        <i
          className="bi bi-trash3"
          role="button"
          onClick={() => console.log("TRASH")}
        ></i>
      ),
    },
  ];
  const selectOptions = {
    CL: "CL",
    OP: "OP",
    AD: "AD",
  };
  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: (column, colIndex) => {
        return { width: "6em" };
      },
      headerAlign: "center",
      align: "center",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-arrow-down-up"></i>
              </font>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-sort-numeric-down"></i>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-sort-numeric-up"></i>
              </font>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "lname",
      text: "Apellido",
      headerAlign: "center",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-arrow-down-up"></i>
              </font>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-sort-alpha-down"></i>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="grey">
                <i className="bi bi-sort-alpha-up"></i>
              </font>
            </span>
          );
        return null;
      },
      filter: textFilter(),
      editable: false,
    },
    {
      dataField: "fname",
      text: "Nombre",
      headerAlign: "center",
      filter: textFilter(),
      editable: false,
    },
    {
      dataField: "dni",
      text: "DNI",
      headerStyle: (column, colIndex) => {
        return { width: "8em" };
      },
      headerAlign: "center",
      align: "center",
      filter: textFilter(),
      editable: false,
    },
    {
      dataField: "role",
      text: "Rol",
      headerStyle: (column, colIndex) => {
        return { width: "8em" };
      },
      headerAlign: "center",
      align: "center",
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
      }),
      editable: (content, row, rowIndex, columnIndex) => content !== "AD",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "CL",
            label: "CL",
          },
          {
            value: "OP",
            label: "OP",
          },
        ],
      },
    },
    {
      dataField: "delete",
      text: "Eliminar",
      headerStyle: (column, colIndex) => {
        return { width: "6em" };
      },
      headerAlign: "center",
      align: "center",
      sort: false,
      editable: false,
    },
  ];
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`Clicked on user with ID: ${row.id}`);
    },
  };

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.sideContainer}></div>
        <div className={style.contentContainer}>
          <div className={style.tableContainer}>
            <BootstrapTable
              keyField="id"
              data={users}
              columns={columns}
              defaultSorted={defaultSorted}
              filter={filterFactory()}
              filterPosition="top"
              cellEdit={cellEditFactory({
                mode: "dbclick",
                blurToSave: true,
                beforeSaveCell: (oldValue, newValue, row, column) => {
                  console.log("POP UP: CONFIRMA CAMBIO?");
                },
              })}
              pagination={paginationFactory()}
              rowEvents={ rowEvents }
              striped
              hover
              condensed
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
