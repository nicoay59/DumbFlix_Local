import React from 'react';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import "./Style.css";


function Detailcom() {


    let {id} = useParams();
    let {data: detail} = useQuery('tripDetailCache', async () => {
        const response = await API.get(`/film/` + id);
        return response.data.data;
    });

    console.log(detail, "ini isi detail");

  return (
    <div>
        <div class="videoWrapper"><iframe src={detail?.link}
        frameborder="0" allowfullscreen class="video"></iframe></div>
        <div className='d-flex justify-content-between ' style={{margin:"100px"}}>


            <div className='w-75  d-flex'>
                <div>
                <img src={detail?.image} />
                </div>
                <div className='px-5 text-light' style={{textAlign:"start"}}>
                    <h2>{detail?.title}</h2>
                    <p>
                    {detail?.year}
                        <span className='ms-3 border rounded p-2' >
                        {detail?.category?.name}
                        </span>
                    </p>
                    <p>
                    {detail?.desc}                   
                     </p>
                </div>

            </div>


            <div className='w-25'>

                <img src='/eps.png' className='w-100'/>

            </div>



        </div>
    </div>
  )
}

export default Detailcom