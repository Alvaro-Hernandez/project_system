import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/loginStyle.css";

const Login = ({ setRol }) => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoRegistro, setCorreoRegistro] = useState("");
  const [contrasenaRegistro, setContrasenaRegistro] = useState("");
  const [showModal, setShowModal] = useState(false);

  //Funciones del Cierre y Apertura del Modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //Funcion para la validacion del Inicio de sesion
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { Correo: correo, Contraseña: contrasena };
    const response = await fetch(
      "http://localhost:5000/autenticacion_empleado/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const { cargo } = await response.json();
      setRol(cargo);
      navigate("/"); // Se cambió a la ruta principal
    } else {
      const { message } = await response.json();
      alert(message || "¡Credenciales incorrectas!");
    }
  };

  //Funcion para registrar el cliente
  const handleAgregar = async (event) => {
    event.preventDefault();
    const nuevoCliente = {
      Cedula: cedula,
      Nombres: nombre,
      Apellidos: apellidos,
      Telefono: telefono,
      Correo: correoRegistro,
      Contraseña: contrasenaRegistro,
    };

    try {
      const response = await fetch(`http://localhost:5000/cliente/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.ok) {
        alert("Cliente registrado con exito");
        handleCloseModal();
        setCedula("");
        setNombre("");
        setApellidos("");
        setTelefono("");
        setCorreoRegistro("");
        setContrasenaRegistro("");
      } else {
        alert("Error al agregar el empleado");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar el empleado");
    }
  };

  return (
    <div className="login-container">
      <div className="containerWithBorder">
        <h2 className="login-title">Bienvenido</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="correo" className="formGroup">
            <Form.Label className="label">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Form.Group controlId="contrasena" className="formGroup">
            <Form.Label className="label">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="button">
            Iniciar Sesión
          </Button>
          <Button
            variant="link"
            onClick={handleShowModal}
            className="registerLink"
          >
            ¿No tienes cuenta? Regístrate
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAgregar}>
            <Form.Group controlId="registroCedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registroNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registroApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tus apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registroTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingresa tu teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registroCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={correoRegistro}
                onChange={(e) => setCorreoRegistro(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registroContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Elige una contraseña segura"
                value={contrasenaRegistro}
                onChange={(e) => setContrasenaRegistro(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="modal-register-button"
            >
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
