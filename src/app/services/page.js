import Footer from "../components/HomePage/FooterSection/footer"
import Navbar from "../components/HomePage/Navbar/Navbar"
import { ServicesSection } from "../components/ServicesPage/sections/services-section"
export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 ">
      <ServicesSection />
    </main>
    <Footer/>
    </>
  )
}
