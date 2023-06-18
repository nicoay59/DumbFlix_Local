
import { Container } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { API } from '../config/api';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

function ListFilm() {

    const [categories, setCategory] = useState([]);

    const getCategory = async () => {
        try {
            const response = await API.get('/categories');
            setCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(categories);


    useEffect(() => {
        getCategory();
    }, []);


    const [films, setFilms] = useState();
    const { data: film, isLoading, status } = useQuery('filmsCache', async () => {
        const response = await API.get('/films');
        setFilms(response.data.data)
        return response.data.data;
    }, {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true
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


    const [form, setForm] = useState({
        category_id : "All"
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    console.log(form, "isi form");
    return (
        <div>
            <Container className='mt-5'>
                <div className='d-flex justify-content-between text-light'>
                    <div className='d-flex'>
                        <div className='px-3'>
                            <h1>
                                List Film
                            </h1>
                        </div>
                        <div className='mt-2'>
                            <select class="form-select" aria-label="Default select example" onChange={handleChange} name="category_id" style={{ backgroundColor: "rgba(210, 210, 210, 0.25)", color: "#f5f5f5" }}>
                                <option selected disabled value="placeholder">Category</option>
                                {/* <option>select country</option> */}
                                <option value="Film" style={{ color: 'black' }}>Film</option>
                                <option value="TV Shows" style={{ color: 'black' }}>TV Shows</option>
                                <option value="All" style={{ color: 'black' }}>All</option>


                            </select>
                        </div>
                    </div>
                    <div>
                        <Link to="/addfilm"> 
                        <button className='btn btn-danger'>Add Film</button>
                        </Link>
                    </div>
                </div>

                {form?.category_id === "All" ? (
        <div responsive={responsive} className='text-start text-light' >
          <Container>
            <div style={{ color: "white", textAlign: "start" }}>
              <h2>All Films</h2>
            </div>
            <div responsive={responsive} className='text-start text-light d-flex px-2'>
              {films?.map((card, index) => (
                <div style={{ width: '200px', height: '362px' }} className='px-1 mx-3' key={index}>
                  <Link to={`/detail/${card.id}`} style={{ color: "white", textAlign: "start", textDecoration: "none" }}>
                    <img src={card?.image} style={{ width: "100%", height: "300px" }} />
                    <div className='pt-1'>
                      <p>{card?.title}</p>
                      <p style={{ fontSize: "14px", color: "rgba(146, 146, 146, 1)" }}>
                        {card?.year}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : (
        <div responsive={responsive} className='text-start text-light'>
                <div className='mt-5'>
                    {isLoading ? (<div />) : (<>
                        <Container>
                            {form.category_id === "TV Shows" ? ( <div style={{ color: "white", textAlign: "start" }}>
                                <h2>
                                    TV Series
                                </h2>
                            </div>) : (<></>)}

                            <div responsive={responsive} className='text-start text-light' >

                                {films?.filter((knt) => {
                                    if (knt?.category?.name === form?.category_id && form?.category_id === "TV Shows") {
                                        return knt
                                    }
                                }).map((card, index) => (
                                    <div style={{ width: '200px', height: '362px' }} className='px-1 mx-3' key={index}>
                                        <Link to={`/detail/${card.id}`} style={{ color: "white", textAlign: "start", textDecoration: "none" }}>
                                            <img src={card?.image} style={{ width: "100%", height: "300px" }} />
                                            <div className='pt-1'>
                                                <p>
                                                    {card?.title}
                                                </p>
                                                <p style={{ fontSize: "14px", color: "rgba(146, 146, 146, 1)" }} >
                                                    {card?.year}
                                                </p>
                                            </div></Link>
                                    </div>
                                ))}
                            </div>
                        </Container>
                        <Container>
                        {form.category_id === "Film" ? ( 
                            <div style={{ color: "white", textAlign: "start" }}>
                                <h2>
                                    Movies
                                </h2>
                            </div>) : (<></>)}
                            <div responsive={responsive} className='text-start text-light d-flex' >
                                {films?.filter((knt) => {
                                    if (knt?.category?.name === form?.category_id && form?.category_id === "Film") {
                                        return knt
                                    } 
                                }

                                ).map((card, index) => (
                                    <div style={{ width: '200px', height: '362px' }} className='px-1 mx-3 ' key={index} >
                                        <Link to={`/detail/${card.id}`} style={{ color: "white", textAlign: "start", textDecoration: "none" }}>
                                            <img src={card?.image} style={{ width: "100%", height: "300px" }} />
                                            <div className='pt-1'>
                                                <p>
                                                    {card?.title}
                                                </p>
                                                <p style={{ fontSize: "14px", color: "rgba(146, 146, 146, 1)" }}>
                                                    {card?.year}
                                                </p>
                                            </div></Link>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </>)}
                </div>

                </div>
                )}
            </Container>
        </div>
    )
}

export default ListFilm