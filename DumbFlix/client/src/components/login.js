import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { API, setAuthToken } from '../config/api';


function Login(props) {
    const {show, handleCloseLogin} = props

    let navigate = useNavigate();
  
    const title = 'Login';
    document.title = 'Dumbmerch | ' + title;
  
    const [_, dispatch] = useContext(UserContext);
  
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState ({
      email: '',
      password: '',
    });
  
    const {email, password} = form;
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value,
      })
    }
  
    
    
  
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const response = await API.post('/login', form);
  
        dispatch ({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });
        setAuthToken(localStorage.token);
  
        if (response.data.data.role === 'admin') {
          navigate('/homeadmin');
        } else {
          navigate('/');
        }
  
        const alert = (
          <Alert variant='success' className='py-1'>
            Login Success
          </Alert>
        );
        setMessage(alert);
      } catch (error) {
        const alert = (
          <Alert variant='danger' className='py-1'>
            Login Failed
          </Alert>
        );
        setMessage(alert);
      }
    });

  return (
    <div>
<Modal show={show} onHide={handleCloseLogin}>
  <div style={{backgroundColor:"#1F1F1F"}} className="p-5, rounded">
        <Modal.Body className='text-white'>
        <Modal.Title className="d-flex justify-content-start pb-4">
          <Modal.Title>Login</Modal.Title>
        </Modal.Title>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name='email'
                value={email}
                onChange={handleChange}
                style={{backgroundColor:"rgba(210, 210, 210, 0.25)", border: "2px solid #D2D2D2", color:"#D2D2D2"}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name='password'
                onChange={handleChange}
                style={{backgroundColor:"rgba(210, 210, 210, 0.25)", color:"border: 2px solid #D2D2D2", color:"#D2D2D2"}}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="mb-3 w-100" variant="danger" type="submit">
                Login
              </Button>
            </div>
          </Form>
          <Form.Group className="mb-3 m-auto text-center" controlId="formBasicCheckbox">
        <Form.Label>Don't have an account? Click here</Form.Label>
        </Form.Group>
        </Modal.Body>
        </div>
      </Modal>
    </div>
  )
}

export default Login