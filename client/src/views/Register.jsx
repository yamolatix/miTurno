import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
//import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { userRegister } from '../features/user';
import style from "../styles/General.module.css";


function Register() {
  
  const navigate = useNavigate();

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [dni, setDni] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const dispatch = useDispatch()

  // const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister({
      fname,
      lname,
      dni,
      email,
      password,
    }))
      .then(() => navigate("/login"))
  }
  
  return (
    
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={require("../images/logo.png")} alt="miTurno"/>
      </div>
      <div className={style.contentContainer}>
        <div>
        <h2>Registro</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            placeholder="Ingrese su nombre"
            type="text"
            value={fname}
            onChange={e => setFname(e.target.value)}
            required
          />
          </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            placeholder="Ingrese su apellido"
            type="text"
            value={lname}
            onChange={e => setLname(e.target.value)}
            required
          />
          </Form.Group>

        <Form.Group className="mb-3" controlId="formIdNum">
          <Form.Label>N° documento</Form.Label>
          <Form.Control
            placeholder="Ingrese su n° de documento (sin puntos. Ej.: 34345345)"
            type="number"
            value={dni}
            onChange={e => setDni(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Ingrese su email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            placeholder="Elija una contraseña (entre 8 y 20 caracteres. Al menos 1 mayúscula y 1 número"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRepeatPassword">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control
            placeholder="Repetir contraseña"
            type="password"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
            required
          />
        </Form.Group>
        
        <div className={style.boton}>
          <Button variant="secondary" type="submit">
            Registrarme
          </Button>
        </div>
      </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;