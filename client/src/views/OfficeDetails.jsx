import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";
import Button from "react-bootstrap/esm/Button";
import parseJwt from "../hooks/parseJwt";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import style from "../styles/OfficeDetails.module.css";

const OfficeDetails = ({ office, selectOffice }) => {
  // console.log(office);

  const token = JSON.parse(localStorage.getItem("user")).data.token;
  const payload = parseJwt(token);

  const [edited, setEdited] = useState(false);
  const [isEditingBranch, setIsEditingBranch] = useState(false);
  const [isEditingManager, setIsEditingManager] = useState(false);
  const [isEditingAppointments, setIsEditingAppointments] = useState(false);
  const [isEditingOperators, setIsEditingOperators] = useState(false);
  const [operator, setOperator] = useState({});
  const [loadOperator, setLoadOperator] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadAssignedOperator();
  }, [loadOperator]);

  const stopEditing = () => {
    setEdited(false);
    setIsEditingBranch(false);
    setIsEditingManager(false);
    setIsEditingAppointments(false);
    setIsEditingOperators(false);
  };

  const handleSubmit = (values) => {
    axios
      .put(
        `http://localhost:3001/api/branchOffice/admin/${payload.id}/${office._id}`,
        values
      )
      .then((res) => {
        axios
          .get(
            `http://localhost:3001/api/branchOffice/admin/${payload.id}/showBranch`
          )
          .then((res) => res.data.data)
          .then(
            (updatedOffices) =>
              updatedOffices.filter(
                (updatedOffice) => updatedOffice._id === office._id
              )[0]
          )
          .then((updatedOffice) => selectOffice(updatedOffice))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    stopEditing();
  };

  const loadAssignedOperator = () => {
    axios
      .get(`http://localhost:3001/api/users/admin/${payload.id}/showUsers`)
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      })
      .then((users) => {
        console.log(office.operator);
        const operator = users.filter(
          (user) => user._id === office.operator
        )[0];
        console.log(operator);
        setOperator(operator);
      })
      .catch((err) => console.log(err));
  };

  const validate = Yup.object({
    address: Yup.string().required("Ingresar una dirección."),
    location: Yup.string().required("Ingresar una dirección."),
  });

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <Formik
          initialValues={{
            address: office.address,
            location: office.location,
            phone: office.phone,
            email: office.email,
            startTime: office.startTime,
            endTime: office.endTime,
            simultAppointment: office.simultAppointment,
            price: office.price.$numberDecimal,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formik, isSubmitting) => (
            <div className={style.contentContainer}>
              <Form>
                <div className={style.nameContainer}>
                  <h4>Sucursal {office.location + " - " + office.address}</h4>
                </div>
                <div className={style.dataContainer}>
                  <div className={style.leftDataContainer}>
                    <div className={style.generalContainer}>
                      <div className={style.generalContainerTitle}>
                        <h5>Datos de Sucursal</h5>
                        <Button
                          variant="secondary"
                          className={style.buttons}
                          onClick={() => {
                            setEdited(true);
                            setIsEditingBranch(true);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                          &nbsp;&nbsp;Editar
                        </Button>
                      </div>
                      <ul>
                        <li>ID Sucursal:&emsp;{office._id}</li>
                        <li>
                          Nombre:&emsp;
                          {office.location + " - " + office.address}
                        </li>
                        <li>
                          Dirección:&emsp;
                          {isEditingBranch ? (
                            <div className="form-group">
                              <Field
                                name="address"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.address
                          )}
                        </li>
                        <li>
                          Localidad:&emsp;
                          {isEditingBranch ? (
                            <div className="form-group">
                              <Field
                                name="location"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.location
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className={style.generalContainer}>
                      <div className={style.generalContainerTitle}>
                        <h5>Datos de Responsable de Sucursal</h5>
                        <Button
                          variant="secondary"
                          className={style.buttons}
                          onClick={() => {
                            setEdited(true);
                            setIsEditingManager(true);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                          &nbsp;&nbsp;Editar
                        </Button>
                      </div>
                      <ul>
                        <li>Responsable:&emsp;</li>
                        <li>
                          Teléfono:&emsp;
                          {isEditingManager ? (
                            <div className="form-group">
                              <Field
                                name="phone"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.phone
                          )}
                        </li>
                        <li>
                          E-mail:&emsp;
                          {isEditingManager ? (
                            <div className="form-group">
                              <Field
                                name="email"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.email
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className={style.generalContainer}>
                      <div className={style.generalContainerTitle}>
                        <h5>Datos de Atención</h5>
                        <Button
                          variant="secondary"
                          className={style.buttons}
                          onClick={() => {
                            setEdited(true);
                            setIsEditingAppointments(true);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                          &nbsp;&nbsp;Editar
                        </Button>
                      </div>
                      <ul>
                        <li>
                          Hora de apertura:&emsp;
                          {isEditingAppointments ? (
                            <div className="form-group">
                              <Field
                                name="startTime"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.startTime + ":00 hs"
                          )}
                        </li>
                        <li>
                          Hora de cierre:&emsp;
                          {isEditingAppointments ? (
                            <div className="form-group">
                              <Field
                                name="endTime"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.endTime + ":00 hs"
                          )}
                        </li>
                        <li>
                          Turnos en simultáneo:&emsp;
                          {isEditingAppointments ? (
                            <div className="form-group">
                              <Field
                                name="simultAppointment"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.simultAppointment
                          )}
                        </li>
                        <li>
                          Precio del turno:&emsp;ARS{" "}
                          {isEditingAppointments ? (
                            <div className="form-group">
                              <Field
                                name="price"
                                className={
                                  formik.touched.name && formik.errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                type="text"
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            office.price.$numberDecimal
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={style.rightDataContainer}>
                    <div className={style.generalContainer}></div>
                    <div className={style.generalContainer}>
                      <div className={style.generalContainerTitle}>
                        <h5>Operadores asignados a la sucursal</h5>
                        <Button
                          variant="secondary"
                          className={style.buttons}
                          onClick={() => {
                            setEdited(true);
                            setLoadOperator(!loadOperator);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                          &nbsp;&nbsp;Editar
                        </Button>
                      </div>
                      <ul>
                        <li>
                          {operator ? (
                            <>
                              - {operator.lname}, {operator.fname}
                            </>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={style.buttonsContainer}>
                  <div className={style.startButtons}>
                    <Button
                      variant="secondary"
                      className={style.buttons}
                      href="/offices"
                    >
                      <i className="bi bi-arrow-left-circle-fill"></i>
                      &nbsp;&nbsp;Volver
                    </Button>
                  </div>
                  <div className={style.endButtons}>
                    {edited ? (
                      <>
                        <Button
                          variant="secondary"
                          className={style.buttons}
                          onClick={() => {
                            formik.resetForm();
                            stopEditing();
                          }}
                        >
                          Descartar Cambios
                        </Button>
                        <Button
                          type="submit"
                          variant="secondary"
                          className={style.buttons}
                        >
                          Confirmar Cambios
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    <Button href="/newOffice" variant="secondary" className={style.buttons}>
                      + Agregar sucursal
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default OfficeDetails;
