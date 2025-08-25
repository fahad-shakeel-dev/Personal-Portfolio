"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import Footer from "@/app/components/HomePage/FooterSection/footer"
import Navbar from "@/app/components/HomePage/Navbar/Navbar"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ServiceHeader } from "@/app/components/ServicesPage/service/service-header"
import { ServiceOverview } from "@/app/components/ServicesPage/service/service-overview"
import { ServiceFeatures } from "@/app/components/ServicesPage/service/service-fearures"
import { ServiceProcess } from "@/app/components/ServicesPage/service/service-process"
import { ServiceBenefits } from "@/app/components/ServicesPage/service/service-benefits"
import { ServiceCaseStudies } from "@/app/components/ServicesPage/service/service-case-studies"
import { ServiceTestimonials } from "@/app/components/ServicesPage/service/service-testimonials"
import { ServiceFAQ } from "@/app/components/ServicesPage/service/service-faq"
import { ServiceStats } from "@/app/components/ServicesPage/service/service-stats"
import { ServiceCTA } from "@/app/components/ServicesPage/service/service-cta"
import { servicesData } from "@/app/components/ServicesPage/data/services-detail-data"
import { ArrowLeft } from "lucide-react"
import React from "react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ServicePage({ params }) {
  const { id } = React.use(params);
  const service = servicesData.find((s) => s.id === id) || servicesData[0]

  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Animate sections on scroll
    const sections = gsap.utils.toArray(".service-section")
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        },
      )
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [id])

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200" ref={pageRef}>
      <div className="max-w-7xl mx-auto px-4 py-16 md:px-8 ">
        {/* Back Button */}
        {/* <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Services</span>
        </Link> */}

        {/* Service Header */}
        <div className="service-section mt-8">
          <ServiceHeader service={service} />
        </div>

        {/* Service Overview */}
        <div className="service-section">
          <ServiceOverview service={service} />
        </div>

        {/* Service Features */}
        <div className="service-section">
          <ServiceFeatures service={service} />
        </div>

        {/* Service Process */}
        <div className="service-section">
          <ServiceProcess service={service} />
        </div>

        {/* Service Benefits */}
        <div className="service-section">
          <ServiceBenefits service={service} />
        </div>

        {/* Service Case Studies */}
        <div className="service-section">
          <ServiceCaseStudies service={service} />
        </div>

        {/* Service Testimonials */}
        <div className="service-section">
          <ServiceTestimonials service={service} />
        </div>

        {/* Service Stats */}
        <div className="service-section">
          <ServiceStats service={service} />
        </div>

        {/* Service FAQ */}
        <div className="service-section">
          <ServiceFAQ service={service} />
        </div>

        {/* Service CTA */}
        <div className="service-section">
          <ServiceCTA service={service} />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
