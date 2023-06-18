import React from 'react'
import Hero from '../components/Hero'
import Jumbotron from '../components/Jumbotron'
import Buy from '../components/Buy'

function Home() {
  return (
    <div className='mb-5'>
        <Jumbotron />
        <Hero />
    </div>
  )
}

export default Home