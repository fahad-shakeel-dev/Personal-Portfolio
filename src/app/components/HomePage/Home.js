import Navbar from './Navbar/Navbar'
import About from './AboutSection/About'
import Hero from './HeroSection/Hero'
import Services from './ServiceSection/Service'
import Portfolio from './PortfolioSection/Portfolio'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Services/>
        <Portfolio/>
    </div>
  )
}

export default Home