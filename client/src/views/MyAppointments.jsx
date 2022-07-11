import React from "react";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";
import UserDetails from "../commons/UserDetails";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import parseJwt from "../hooks/parseJwt";
import capitalize from "../hooks/capitalize";

import style from "../styles/Users.module.css";

const MyAppointments = () => {
  const [appsRaw, setAppsRaw] = useState([]);
  const [apps, setApps] = useState([]);
  const [load, setLoad] = useState(true);

  const token = JSON.parse(localStorage.getItem("user")).data.token;
  const payload = parseJwt(token);
  console.log(payload);

  useEffect(() => {
    loadApps();
  }, [load]);

  const findOfficeName = (officeId, offices) => {
    const office = offices.filter((office) => office._id === officeId);
    return office.length > 0
      ? capitalize(office[0].location) + " - " + capitalize(office[0].address)
      : "Sin especificar";
  };

  const handleEdit = (appointmentId) => {
    console.log("EDITAR TURNO ", appointmentId);
  }

  const handleDelete = (appointmentId) => {
    console.log("CANCELAR TURNO ", appointmentId);
  }

  const loadApps = () => {
    let appointments;
    let offices;

    axios
      .get(
        `http://localhost:3001/api/appointment/${payload.id}/showAppointments`
      )
      .then((res) => {
        appointments = res.data.data;
        console.log(appointments);
        setAppsRaw(appointments);
      })
      .then(() => {
        axios
          .get("http://localhost:3001/api/branchOffice/showBranch")
          .then((res) => {
            offices = res.data.data;
            console.log(offices);
          })
          .then(() => {
            const appsConstructor = appointments.map((appointment, i) => {
              return {
                _id: appointment._id,
                id: appointment._id.slice(-4),
                date:
                  appointment.day +
                  "/" +
                  appointment.month +
                  "/" +
                  appointment.year,
                time: appointment.time + " hs",
                status: capitalize(appointment.state),
                office: findOfficeName(appointment.branchOffice[0], offices),
                actions: (
                  <>
                    <Badge
                      bg="secondary"
                      role="button"
                      data-bs-toggle="tooltip"
                      title="Reprogramar"
                      onClick={() => handleEdit(appointment._id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Badge>
                    &nbsp;&nbsp;
                    <Badge
                      bg="secondary"
                      role="button"
                      data-bs-toggle="tooltip"
                      title="Cancelar"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </Badge>
                  </>
                ),
              };
            });
            console.log(appsConstructor);
            setApps(appsConstructor);
          });
      })
      .catch((err) => console.log(err));
  };

  // Table setups

  const selectOptions = {
    Reservado: "Reservado",
    Cancelado: "Cancelado",
    Asistido: "Asistido",
  };
  const columns = [
    {
      dataField: "id",
      text: "ID Turno",
      headerStyle: (column, colIndex) => {
        return { width: "8em" };
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
      dataField: "date",
      text: "Fecha",
      headerStyle: (column, colIndex) => {
        return { width: "10em" };
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
      dataField: "time",
      text: "Hora",
      headerStyle: (column, colIndex) => {
        return { width: "10em" };
      },
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "office",
      text: "Sucursal",
      headerAlign: "center",
      align: "center",
      filter: textFilter(),
    },
    {
      dataField: "status",
      text: "Estado",
      headerStyle: (column, colIndex) => {
        return { width: "10em" };
      },
      headerAlign: "center",
      align: "center",
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
      }),
    },
    {
      dataField: "actions",
      text: "Acciones",
      headerStyle: (column, colIndex) => {
        return { width: "8em" };
      },
      headerAlign: "center",
      align: "center",
    },
  ];
  const defaultSorted = [
    {
      dataField: "date",
      order: "asc",
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row._id);
    },
  };

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <div className={style.sideContainer}>
          {/* <AppointmentDetails
            user={selectedUser}
            handleDelete={handleDelete}
            handleRoleChange={handleRoleChange}
          /> */}
        </div>
        <div className={style.contentContainer}>
          <div className={style.tableContainer}>
            <BootstrapTable
              keyField="id"
              data={apps}
              columns={columns}
              defaultSorted={defaultSorted}
              filter={filterFactory()}
              filterPosition="top"
              pagination={paginationFactory()}
              rowEvents={rowEvents}
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

export default MyAppointments;
