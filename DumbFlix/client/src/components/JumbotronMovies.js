import React from 'react'
import { Image } from 'react-bootstrap'

function Jumbotron() {
  return (
    <div>
        <div style={{position:"relative"}}>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" style={{fontSize:"18px"}}>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item-active">
      <Image src="/joker.png" style={{width:"100%", top:"10", position:"relative"}} alt="..."/>
      <div class="carousel-caption" style={{position:"absolute", left:"150px", top:"202px", width:"615px", textAlign:"left"}}>
        <Image src="/textjoker.png" />
        <p className='pt-2'>In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.</p>
        <p>
          2019 <button className='btn btn-outline-light p-2 mx-2' style={{fontSize:"12px", textShadow:" 2px 2px #0000002b"}}> TV series </button>
        </p>
        <button className='btn btn-danger p-2' style={{width:"300px", height:"60px", fontWeight:"700", fontSize:"24px", backgroundColor:"#E50914"}}> Watch Now ! </button>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        <Image src="/assets/image/gradient.png" style={{position:"absolute", left:"0", bottom:"-100px", width:"100%"}} />
        </div>
     </div>
  )
}

export default Jumbotron