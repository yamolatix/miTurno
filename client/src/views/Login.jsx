import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
//import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { userLogin } from '../features/user';
import style from "../styles/General.module.css";


function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch()

  // const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({
      email,
      password,
    }))
      .then(() => navigate("/users"))
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
        <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
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
            placeholder="Ingrese su contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

export default Login;