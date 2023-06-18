import logo from './logo.svg';
import './App.css';
import Jumbotron from './components/Jumbotron';
import Hero from './components/Hero';
import Home from './pages/Home';
import Formadd from './components/FormAdd';
import { Routes, Route, Outlet, Navigate,  BrowserRouter as Router, useNavigate} from 'react-router-dom'
import Detailcom from './components/Detailcom';
import NavbarCom from './components/NavbarCom';
import CardProfil from './components/CardProfil';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api'
import { useContext, useEffect, useState } from 'react';
import { PrivateRouteLogin, PrivateRouteUser, PrivateRouteAdmin } from './pages/PrivateRoute';
import HomeMovies from './pages/HomeMovies';
import HomeTvShows from './pages/HomeTvShows';
import ListFilm from './pages/ListFilm';
import IncomingTrans from './pages/IncomeTrans';
import Payment from './pages/Payment';


function App() {



  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };




  return (
    <div className="App"> 
    <NavbarCom />
    <Routes>
      <Route exact path="/" element={< Home/>} />
      <Route exact path="/movies" element={<HomeMovies />} />
      <Route exact path="/TvShows" element={<HomeTvShows />} />
      <Route exact path="/addfilm" element={<Formadd />}  />
      <Route exact path="/detail/:id" element={<Detailcom />}  />
      <Route exact path="/profile" element={<CardProfil />} />
      <Route exact path="/listfilm" element={<ListFilm />} />
      <Route exact path='/homeadmin' element={<IncomingTrans/>} />
      <Route exact path='/payment' element={<Payment />} />


    </Routes>
    </div>
  );
}

export default App;
