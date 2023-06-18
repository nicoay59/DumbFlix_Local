import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { API } from "../config/api";



function HeroTvShows() {


  const [films, setFilms] = useState();
  const { data : film, isLoading, status } = useQuery('filmsCache', async () => {
    const response = await API.get('/films');
    setFilms(response.data.data)
    return response.data.data;
  },{
    refetchOnMount:true,
    refetchOnReconnect:true,
    refetchOnWindowFocus:true,
    refetchIntervalInBackground:true
  });

  console.log(film, "ini isi film");
  console.log(status, "ini status");
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  
  return (
    <div className='mt-5'>
      { isLoading ? (<div/>) : (  <>
    <Container>
      <div style={{color:"white", textAlign:"start"}}>
        <h2>
        TV Series
        </h2>
      </div>
      <div responsive={responsive} className='text-start text-light' >

      {films?.filter((knt) => {
        if (knt?.category?.name === "TV Shows"){
          return knt
        }}).map((card,index) => (
          <div style={{width: '200px',height:'362px'}} className='px-1 mx-3' key={index}>
            <Link to={`/detail/${card.id}`} style={{color:"white", textAlign:"start", textDecoration:"none"}}>
            <img src={card?.image}  style={{width:"100%", height:"300px"}}/>
              <div className='pt-1'>
                <p>
                  {card?.title}
                </p>
                <p style={{fontSize:"14px", color: "rgba(146, 146, 146, 1)"}} >
                  {card?.year}
                </p>
            </div></Link>
              </div>
              ))} 
    </div>;
    </Container>  
    </>  )}
    </div>
  )
}

export default HeroTvShows