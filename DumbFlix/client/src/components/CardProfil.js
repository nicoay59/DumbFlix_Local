import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { UserContext } from '../context/userContext'
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { API } from "../config/api";



function CardProfil() {

    const title = 'Profile';
    document.title = 'DumbFlix | ' + title;
  
    const [state, dispatch] = useContext(UserContext);

    let profile = state?.user

    console.log(profile, "ini isi profile");

  
    // let { data: profile } = useQuery('profileCache', async () => {
    //   const response = await API.get('/users');
    //   return response.data.data;
    // });


    // console.log(profile, "ini isi profile");
  


    // useEffect(()=>{
    //     dispatch({
    //         type:"USER_TRANSACTION",
    //         payload: transactions,
    //     })
    // },[])

    // console.log(state);



    // console.log(state, 'ini log state');

    // const { data: profiles } = useQuery('profilesCache', async () => {
    //     const response = await API.get('/users')
    //     return response.data.data
    //     })
    //   console.log(profiles);

  return (
    <div   className='pt-5'>
    <div >
        <Container className=' d-flex justify-content-between p-3 container border col-md-8 text-light' style={{backgroundColor:"rgba(31, 31, 31, 1)"}}>
            <div>
                <div style={{textAlign:'start'}}>
                <h1>
                    Personal Info
                </h1>
                </div>
                <div style={{textAlign:'start'}}>
                    <div className='p-3'>
                        <img src='/userprof.png' className='pe-3'></img> {state?.user.name}
                    </div>
                    <div className='p-3'>
                    <img src="/email.png" className='pe-3'></img> {state?.user.email}
                    </div>
                    <div className='p-3'>
                    <img src='/phone.png' className='pe-3'></img>{state?.user.phone}
                    </div>
                    <div className='p-3'>
                    <img src="/address.png" className='pe-3'></img>{state?.user.address}
                    </div>
                </div>
            </div>
            <div className='col-md-5'>
                <img src="/Avatar.png" className='w-100'>
                </img>
                <button type="button" className="btn btn-danger w-100  mt-3 text-white">Change Photo Profile</button>
            </div>
        </Container>
    </div> 
    </div>
  )
}

export default CardProfil