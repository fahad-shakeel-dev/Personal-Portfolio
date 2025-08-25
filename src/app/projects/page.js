import React from 'react'
import Projects from '../components/ProjectPage/Project'
import Navbar from '../components/HomePage/Navbar/Navbar'
import Footer from '../components/HomePage/FooterSection/footer'
const page = () => {
  return (
    <div>
      <Navbar/>
        <Projects/>
      <Footer/>
    </div>
  )
}

export default page