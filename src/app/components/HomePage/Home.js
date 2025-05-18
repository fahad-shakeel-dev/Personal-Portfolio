import Navbar from './Navbar/Navbar'
import Hero from './HeroSection/Hero'
import Services from './ServiceSection/Service'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Services/>
    </div>
  )
}

export default Home