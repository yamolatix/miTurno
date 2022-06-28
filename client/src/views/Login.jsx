import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  
  
  return (
    
    
    <Form>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>Nombre/s</Form.Label>
        <Form.Control placeholder="Ingrese su/s nombre/s" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Apellido/s</Form.Label>
        <Form.Control placeholder="Ingrese su/s apellido/s" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIdNum">
        <Form.Label>N° documento</Form.Label>
        <Form.Control placeholder="N° documento sin puntos. Ej: 34345345" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Ingrese su email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control placeholder="Entre 8 y 20 caracteres. Al menos 1 numero y 1 mayúscula" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRepeatPassword">
        <Form.Label>Repetir contraseña</Form.Label>
        <Form.Control placeholder="Repetir contraseña" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarme
      </Button>
    </Form>
  );
}

export default Login;