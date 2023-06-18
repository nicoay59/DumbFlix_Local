import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';


function DropdownAdmin({handleLogout}) {

    const handleLogoutklik = () =>  {
        handleLogout();
    }

  return (
    <>  
        <div className='d-flex justify-content-between w-100'>
          <Link to="/">
            <img src='/assets/image/dumbflix.png' alt=''/>
          </Link>
          <Dropdown  >
            <Dropdown.Toggle variant='' style={{border:'none'}}> 
                <img src="/prevprof.png">
                </img>
                <Dropdown.Menu style={{backgroundColor:"#1F1F1F"}} >
                <Dropdown.Item eventKey="1">
                  <Link to='/addfilm' style={{textDecoration:'none'}} className='text-light'>
                    <img src="/movies.png" className='p-2'></img>
                     Film
                  </Link>
                </Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutklik} className='text-light'>
            <img src="/logout.png" className='p-2'></img>
                     Logout
            </Dropdown.Item>
                </Dropdown.Menu>    
            </Dropdown.Toggle>
          </Dropdown>
                      
        </div>
    </>
  );
}

export default DropdownAdmin;