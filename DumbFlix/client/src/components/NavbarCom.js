import React, { useContext, useState } from 'react';
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import Login from './login';
import Register from './Register';
import NavUser from './Navbaruser';
import DropdownAdmin from './NavAdmin';
// import NavDropdown from 'react-bootstrap/NavDropdown';







function NavbarCom() {

  const [state, dispatch] = useContext(UserContext)

  console.log(state);

  
  var login = state.isLogin;
  var customer = state.role;

  let navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [reg, setReg] = useState(false);


  const handleRegClose = () => setReg(false);
  const handleRegShow = () => setReg(true);

  const handleShowModal = () => setShowModal(true);
  

  const handleCloseLogin = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("login");
    window.location.href = "/";
  };

  
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container style={{justifyContent:"space-between", display:"flex"}}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {login && customer === "" ? (
        <NavUser handleLogout={handleLogout} />
        ) : login && customer === "admin" ?<DropdownAdmin  handleLogout={handleLogout}/>:(
        <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent:"space-between"}}>
          <Nav>
         <Navbar.Brand >
          <Link to="/" style={{textDecoration:"none", color:"white"}}>
          Home
          </Link>  
          </Navbar.Brand>
            <Nav.Link >
            <Link to='/TvShows' style={{color:"rgba(255,255,255,0.55)", textDecoration:"none"}}>
              Tv Shows
              </Link>
              </Nav.Link>
            <Nav.Link>
            <Link to='/movies' style={{color:"rgba(255,255,255,0.55)", textDecoration:"none"}}>
              Movies
              </Link>
              </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link >
                <Image src="/assets/image/dumbflix.png" />
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleRegShow}>Register</Nav.Link>
            <Nav.Link onClick={handleShowModal}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
          )}
      </Container>
    </Navbar>           
    <Login  handleCloseLogin={handleCloseLogin} show={showModal} handleLogout={handleLogout} />
    <Register handleRegClose={handleRegClose} handleRegShow={handleRegShow} show={reg} />
    </div>
  )
}

export default NavbarCom