import React from 'react'
import HeroTvShows from '../components/HeroTvShows'
import JumbotronTvShows from '../components/JumbotronTvShows'
import Buy from '../components/Buy'

function HomeTvShows() {
  return (
    <div className='mb-5'>
        <JumbotronTvShows />
        <HeroTvShows />
    </div>
  )
}

export default HomeTvShows