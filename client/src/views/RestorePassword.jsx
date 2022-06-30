import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import style from "../styles/General.module.css";


function RestorePassword() {
  
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

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
        <h2>Restablecer contraseña</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Nueva contraseña</Form.Label>
          <Form.Control
            placeholder="Elija una contraseña (8 a 20 caracteres, al menos 1 mayúscula y 1 número)"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Repetir la nueva contraseña</Form.Label>
          <Form.Control
            placeholder="Repetir la nueva contraseña"
            type="password"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
            required
          />
        </Form.Group>
        
        <div className={style.boton}>
          <Button variant="secondary" type="submit">
            Ingresar
          </Button>
        </div>

        <Link className={style.link} to="/assist_password" >Olvidé mi contraseña</Link>

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

export default RestorePassword;