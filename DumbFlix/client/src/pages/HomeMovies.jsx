import React from 'react'
import HeroMovies from '../components/HeroMovies'
import JumbotronMovies from '../components/JumbotronMovies'
import Buy from '../components/Buy'

function HomeMovies() {
  return (
    <div className='mb-5'>
        <JumbotronMovies />
        <HeroMovies />
    </div>
  )
}

export default HomeMovies