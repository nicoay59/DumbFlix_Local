
import { hover } from '@testing-library/user-event/dist/hover';
import { Image } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function NavUser({handleLogout}) {

    const handleLogoutklik = () =>  {
        handleLogout();
    }

  return (
    <div className='w-100'>  
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container style={{justifyContent:"space-between", display:"flex"}}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
          <nav>
          <Dropdown>
            <Dropdown.Toggle variant='' style={{border:'none'}}> 
                <Image src="/prevprof.png"></Image>
                <Dropdown.Menu style={{backgroundColor:"#1F1F1F"}}>
                <Dropdown.Item>
                    <Link to="/profile" style={{textDecoration:'none', color:'white', }}><img src='/user.png' className='p-2'></img>
                     Profile</Link>
                </Dropdown.Item>
            <Dropdown.Item>
            <Link to="/payment-waiting/:puantiti/:price" style={{textDecoration:'none', color:'white'}}><img src='/bill.png' className='p-2'></img>
                     Pay</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutklik} style={{color:"white"}}>
            <img src='/logout.png' className='p-2'></img>
                     Logout
            </Dropdown.Item>
                </Dropdown.Menu>    
            </Dropdown.Toggle>
          </Dropdown>
          </nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>  


    </div>
  );
}

export default NavUser;