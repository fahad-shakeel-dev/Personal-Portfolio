"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ServiceCard } from "../ui/service-card"
import { ProcessStep } from "../ui/process-step"
import { TestimonialCard } from "../ui/testimonial-card"
import { StatCard } from "../ui/stat-card"
import { CTASection } from "../ui/cta-section"
import { services, processSteps, testimonials, stats } from "../data/services-data"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ServicesSection() {
  const headerRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)
  const serviceCards = useRef([])

  // Reset refs array
  serviceCards.current = []

  // Add to refs array
  const addToRefs = (el) => {
    if (el && !serviceCards.current.includes(el)) {
      serviceCards.current.push(el)
    }
  }

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })

    // Services cards animation
    if (serviceCards.current.length > 0) {
      gsap.fromTo(
        serviceCards.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
          },
        },
      )
    }

    // Process steps animation
    gsap.fromTo(
      ".process-step",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
        },
      },
    )

    // Stats animation
    gsap.fromTo(
      ".stat-item",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
      },
    )

    // Testimonials animation
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      },
    )

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Elevate Your Digital
          <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Presence
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Transform your business with our comprehensive digital solutions designed to drive growth, engagement, and
          success in today's competitive landscape.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} ref={addToRefs} />
        ))}
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our track record speaks for itself. Here&apos;s how we've helped businesses like yours succeed.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a proven methodology to ensure your project is delivered successfully from concept to completion.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef}>
        <CTASection />
      </div>
    </section>
  )
}
