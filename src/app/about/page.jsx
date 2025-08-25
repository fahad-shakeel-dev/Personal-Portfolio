import React from 'react'
import About from '../components/AboutPage/about'
import Navbar from '../components/HomePage/Navbar/Navbar'
import Footer from '../components/HomePage/FooterSection/footer'
const page = () => {
  return (
    <div>
        <Navbar/>
        <About/>
        <Footer/>
    </div>
  )
}

export default page