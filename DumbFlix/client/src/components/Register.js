import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../config/api';

function Register({ show, handleRegClose }) {


  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: 0,
    address: '',
    gender: '',
  });

  // const { fullname, email, password, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      setForm({
        name: '',
        email: '',
        password: '',
        phone: 0,
        address: '',
        gender: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
  });


  return (
    <>
      <Modal show={show} onHide={handleRegClose} >
        <div style={{backgroundColor:"#1F1F1F"}} className="p-5, rounded">
        <Modal.Body className="p-5 pt-4">
        <Modal.Title className="d-flex justify-content-start text-light pb-5" >
          Register
        </Modal.Title>
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3, text-light" controlId="exampleForm.ControlInput1" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" autoFocus placeholder="Full Name"  name="name" onChange={handleChange}  style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}/>
              <Form.Label className="pt-2">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email" onChange={handleChange}
                style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}
              />
            </Form.Group>
            <Form.Group className="mb-3, text-light" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}} />
              <Form.Label className="pt-2">Phone</Form.Label>
              <Form.Control type="tel" autoFocus placeholder="Phone"  name="phone" onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}} />
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" autoFocus placeholder="Address"  name="address" onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}} />
              <p className="pt-2">Gender</p>
              <select class="form-select" aria-label="Default select example" name="gender" onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}>
                <option selected disabled value="placeholder"  style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2"}}>pilih aja dibawah</option>
                    <option  style={{color:'black', backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}>  Male</option >
                    <option  style={{color:'black', backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}  >Female</option>
            </select>
            </Form.Group>
            <div className="mb-3, mt-3 d-flex, justify-content-center">
            <Button className="mb-3, mt-3 d-flex, justify-content-center w-100" variant="light" onClick={handleRegClose} type="submit">
            Register
          </Button>
            </div>
          </Form>
        </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
export default Register;
