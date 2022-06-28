import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { userRegister } from '../features/user';


function Register() {
  
  const navigate = useNavigate();

  const fname = useInput();
  const lname = useInput();
  const dni = useInput();
  const email = useInput();
  const password = useInput();

  const dispatch = useDispatch()

  // const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('FNAME es ', fname.value)
    dispatch(userRegister({
      fname: fname.value,
      lname: lname.value,
      dni: dni.value,
      email: email.value,
      password: password.value,
    }))
      .then(() => navigate("/login"))
  }
  
  return (
    
    <div>
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Nombre/s</Form.Label>
          <Form.Control placeholder="Ingrese su/s nombre/s" />
{/*           <Input {...fname} type='text' />
 */}        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Apellido/s</Form.Label>
          <Form.Control placeholder="Ingrese su/s apellido/s" />
{/*           <Input {...lname} type='text' />
 */}        </Form.Group>

        <Form.Group className="mb-3" controlId="formIdNum">
          <Form.Label>N° documento</Form.Label>
          <Form.Control placeholder="N° documento sin puntos. Ej: 34345345" />
{/*           <Input {...dni} type='number' />
 */}        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Ingrese su email" />
{/*           <Input {...email} type='email' />
 */}        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control placeholder="Entre 8 y 20 caracteres. Al menos 1 numero y 1 mayúscula" />
{/*           <Input {...password} type='password' />
 */}        </Form.Group>

        <Form.Group className="mb-3" controlId="formRepeatPassword">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control placeholder="Repetir contraseña" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarme
        </Button>
      </Form>
    </div>
  );
}

export default Register;