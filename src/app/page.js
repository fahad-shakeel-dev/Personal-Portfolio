import Home from './components/HomePage/Home'
import React from 'react'
import Navbar from './components/HomePage/Navbar/Navbar'
import Footer from './components/HomePage/FooterSection/footer'
const page = () => {
  return (
    <div>
        <Navbar/>
        <Home/>
        <Footer/>
    </div>
  )
}

export default page