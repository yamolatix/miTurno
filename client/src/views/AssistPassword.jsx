import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
//import useInput from '../hooks/useInput';
import style from "../styles/General.module.css";


function AssistPassword() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/users")
  }
  
  
  return (
    
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img
          className={style.largeLogo}
          src={require("../images/1.png")}
          alt="miTurno"
        />
        <img
          className={style.smallLogo}
          src={require("../images/2.png")}
          alt="miTurno"
        />
      </div>
      <div className={style.contentContainer}>
        <div>
        <h2>Asistencia</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email para recuperar contraseña</Form.Label>
          <Form.Control
            placeholder="Ingrese su email (recibirá un correo con instrucciones)"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        
        <div className={style.boton}>
          <Button variant="secondary" type="submit">
            Continuar
          </Button>
        </div>

        <div className={style.unregistred}>
          <p className={style.p}>Ya recordé mi contraseña</p>
          <Link to="/login">Ir a login</Link>
        </div>

        <div className={style.unregistred}>
          <p className={style.p}>Aún no tengo una cuenta</p>
          <Link to="/register">Registrarme</Link>
          {/* <Button variant="secondary" onClick={() => navigate("/register")}>
            Registrarme
          </Button>  */}
        </div>
      </Form>
        </div>
      </div>
    </div>
  );
}

export default AssistPassword;