import About from './AboutSection/About'
import Hero from './HeroSection/Hero'
import Services from './ServiceSection/Service'
import Portfolio from './PortfolioSection/Portfolio'
import Testimonials from './Testiomonial/testimonial'
import HorizontalScroll from './HorizontolScrol/BestProjSect'
import React from 'react'
import Technologies from './TechnologiesSection/Technologies'
import Contact from './ContactSection/Contact'
const Home = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <Services/>
        <Portfolio/>
        <Testimonials/>
        <Technologies/>
        <Contact/>
    </div>
  )
}

export default Home