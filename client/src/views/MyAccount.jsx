import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../commons/CustomNavbar";
import Button from "react-bootstrap/Button";
import parseJwt from "../hooks/parseJwt";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import capitalize from "../hooks/capitalize";

import style from "../styles/MyAccount.module.css";

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const token = JSON.parse(localStorage.getItem("user")).data.token;
  const payload = parseJwt(token);
  console.log(payload);

  useEffect(() => {
    loadUserData();
  }, []);

  const [userData, setUserData] = useState(payload);

  const loadUserData = () => {
    axios
      .get(`http://localhost:3001/api/users/me/${payload.id}`)
      // .then((res) => setUserData(res.data))
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:3001/api/users/me/${payload.id}`, values)
      .then((res) => {
        console.log(res);
        loadUserData();
      })
      .catch((err) => console.log(err));
    setIsEditing(false);
  };

  return (
    <>
      <CustomNavbar />
      <div className={style.mainContainer}>
        <Formik
          initialValues={{
            lname: userData.lname,
            fname: userData.fname,
            dni: userData.dni,
            email: userData.email,
            birthdate: userData.birthdate,
            phone: userData.phone,
            address: userData.address,
          }}
          // validationSchema={validate}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formik, isSubmitting) => (
            <div className={style.contentContainer}>
              <Form>
                <div className={style.userDetails}>
                  <div className={style.titleContainer}>
                    <h3>Mi Perfil</h3>
                    <Button
                      variant="secondary"
                      className={style.buttons}
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                      &nbsp;&nbsp;Editar
                    </Button>
                  </div>
                  <ul>
                    <li>
                      ID:&emsp;{payload.id}
                      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Rol:{" "}
                      {userData.admin ? "AD" : userData.operator ? "OP" : "CL"}
                    </li>
                    <li>
                      Apellido:&emsp;
                      {isEditing ? (
                        <div className="form-group">
                          <Field
                            name="lname"
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
                        capitalize(userData.lname)
                      )}
                    </li>
                    <li>
                      Nombre:&emsp;
                      {isEditing ? (
                        <div className="form-group">
                          <Field
                            name="fname"
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
                        capitalize(userData.fname)
                      )}
                    </li>
                    <li>
                      DNI:&emsp;
                      {isEditing ? (
                        <div className="form-group">
                          <Field
                            name="dni"
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
                        userData.dni
                      )}
                    </li>
                    <li>
                      E-mail:&emsp;
                      {isEditing ? (
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
                        userData.email
                      )}
                    </li>
                    <li>
                      Fecha de nacimiento:&emsp;
                      {isEditing ? (
                        <div className="form-group">
                          <Field
                            name="birthdate"
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
                        userData.birthdate
                      )}
                    </li>
                    <li>
                      Teléfono:&emsp;
                      {isEditing ? (
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
                        userData.phone
                      )}
                    </li>
                    <li>
                      Domicilio:&emsp;
                      {isEditing ? (
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
                        userData.address ? capitalize(userData.address) : userData.address
                      )}
                    </li>
                  </ul>
                </div>
                <div className={style.buttonsContainer}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="secondary"
                        className={style.buttons}
                        onClick={() => {
                          formik.resetForm();
                          setIsEditing(false);
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
                  <Button
                    href="/newOffice"
                    variant="secondary"
                    className={style.buttons}
                  >
                    Eliminar mi cuenta
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default MyAccount;
