// "use client"
// import { useEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ServiceCard } from "../ui/service-card"
// import { ProcessStep } from "../ui/process-step"
// import { TestimonialCard } from "../ui/testimonial-card"
// import { StatCard } from "../ui/stat-card"
// import { CTASection } from "../ui/cta-section"
// import { services, processSteps, testimonials, stats } from "../data/services-data"

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger)
// }

// export function ServicesSection() {
//   const headerRef = useRef(null)
//   const servicesRef = useRef(null)
//   const processRef = useRef(null)
//   const statsRef = useRef(null)
//   const testimonialsRef = useRef(null)
//   const ctaRef = useRef(null)
//   const serviceCards = useRef([])

//   // Reset refs array
//   serviceCards.current = []

//   // Add to refs array
//   const addToRefs = (el) => {
//     if (el && !serviceCards.current.includes(el)) {
//       serviceCards.current.push(el)
//     }
//   }

//   useEffect(() => {
//     // Header animation
//     gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })

//     // Services cards animation
//     if (serviceCards.current.length > 0) {
//       gsap.fromTo(
//         serviceCards.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.4,
//           stagger: 0.08,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: servicesRef.current,
//             start: "top 85%",
//           },
//         },
//       )
//     }

//     // Process steps animation
//     gsap.fromTo(
//       ".process-step",
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         stagger: 0.08,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: processRef.current,
//           start: "top 80%",
//         },
//       },
//     )

//     // Stats animation
//     gsap.fromTo(
//       ".stat-item",
//       { opacity: 0, scale: 0.95 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 0.5,
//         stagger: 0.08,
//         ease: "back.out(1.2)",
//         scrollTrigger: {
//           trigger: statsRef.current,
//           start: "top 85%",
//         },
//       },
//     )

//     // Testimonials animation
//     gsap.fromTo(
//       ".testimonial-card",
//       { opacity: 0, x: 30 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.5,
//         stagger: 0.1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: testimonialsRef.current,
//           start: "top 80%",
//         },
//       },
//     )

//     // CTA animation
//     gsap.fromTo(
//       ctaRef.current,
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ctaRef.current,
//           start: "top 90%",
//         },
//       },
//     )

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//     }
//   }, [])

//   return (
//     <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div ref={headerRef} className="text-center mb-16">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
//           <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
//         </div>
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//           Elevate Your Digital
//           <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
//             Presence
//           </span>
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//           Transform your business with our comprehensive digital solutions designed to drive growth, engagement, and
//           success in today's competitive landscape.
//         </p>
//       </div>

//       {/* Services Grid */}
//       <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
//         {services.map((service, index) => (
//           <ServiceCard key={service.id} service={service} ref={addToRefs} />
//         ))}
//       </div>

//       {/* Stats Section */}
//       <div ref={statsRef} className="mb-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Our track record speaks for itself. Here&apos;s how we've helped businesses like yours succeed.
//           </p>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <StatCard key={index} stat={stat} />
//           ))}
//         </div>
//       </div>

//       {/* Process Section */}
//       <div ref={processRef} className="mb-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             We follow a proven methodology to ensure your project is delivered successfully from concept to completion.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {processSteps.map((step, index) => (
//             <ProcessStep key={step.number} step={step} index={index} />
//           ))}
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div ref={testimonialsRef} className="mb-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Don't just take our word for it. Here&apos;s what our clients have to say about working with us.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard key={index} testimonial={testimonial} />
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div ref={ctaRef}>
//         <CTASection />
//       </div>
//     </section>
//   )
// }













// "use client"

// import { useEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ServiceCard } from "../ui/service-card"
// import { ProcessStep } from "../ui/process-step"
// import { TestimonialCard } from "../ui/testimonial-card"
// import { StatCard } from "../ui/stat-card"
// import { CTASection } from "../ui/cta-section"
// import { services, processSteps, testimonials, stats } from "../data/services-data"

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger)
// }

// export function ServicesSection() {
//   const sectionRef = useRef(null)
//   const headerRef = useRef(null)
//   const servicesRef = useRef(null)
//   const processRef = useRef(null)
//   const statsRef = useRef(null)
//   const testimonialsRef = useRef(null)
//   const ctaRef = useRef(null)
//   const serviceCards = useRef([])

//   // Reset refs array
//   serviceCards.current = []

//   // Add to refs array
//   const addToRefs = (el) => {
//     if (el && !serviceCards.current.includes(el)) {
//       serviceCards.current.push(el)
//     }
//   }

//   useEffect(() => {
//     // Animation configurations
//     const tl = gsap.timeline()

//     // Header animation
//     tl.fromTo(
//       headerRef.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
//     )

//     // Services cards animation
//     if (serviceCards.current.length > 0) {
//       tl.fromTo(
//         serviceCards.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.4,
//           stagger: 0.08,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: servicesRef.current,
//             start: "top 85%",
//             once: true, // Optimize by triggering only once
//           },
//         },
//       )
//     }

//     // Process steps animation
//     tl.fromTo(
//       ".process-step",
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         stagger: 0.08,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: processRef.current,
//           start: "top 80%",
//           once: true,
//         },
//       },
//     )

//     // Stats animation
//     tl.fromTo(
//       ".stat-item",
//       { opacity: 0, scale: 0.95 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 0.5,
//         stagger: 0.08,
//         ease: "back.out(1.2)",
//         scrollTrigger: {
//           trigger: statsRef.current,
//           start: "top 85%",
//           once: true,
//         },
//       },
//     )

//     // Testimonials animation
//     tl.fromTo(
//       ".testimonial-card",
//       { opacity: 0, x: 30 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.5,
//         stagger: 0.1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: testimonialsRef.current,
//           start: "top 80%",
//           once: true,
//         },
//       },
//     )

//     // CTA animation
//     tl.fromTo(
//       ctaRef.current,
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ctaRef.current,
//           start: "top 90%",
//           once: true,
//         },
//       },
//     )

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//       tl.kill()
//     }
//   }, [])

//   return (
//     <section
//       ref={sectionRef}
//       className="py-16 mt-14 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden"
//       role="region"
//       aria-label="Services Section"
//       data-testid="services-section"
//     >
//       {/* Header Section */}
//       <div ref={headerRef} className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-6">
//           <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
//         </div>
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//           Elevate Your Digital
//           <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
//             Presence
//           </span>
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
//           Transform your business with our comprehensive digital solutions designed to drive growth, engagement, and
//           success in today&apos;s competitive landscape.
//         </p>
//       </div>

//       {/* Services Grid */}
//       <div ref={servicesRef} className="mb-16 sm:mb-20">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {services.map((service, index) => (
//             <ServiceCard key={service.id} service={service} ref={addToRefs} />
//           ))}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div ref={statsRef} className="mb-16 sm:mb-20">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Proven Results</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
//             Our track record speaks for itself. Here&apos;s how we&apos;ve helped businesses like yours succeed.
//           </p>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
//           {stats.map((stat, index) => (
//             <StatCard key={index} stat={stat} />
//           ))}
//         </div>
//       </div>

//       {/* Process Section */}
//       <div ref={processRef} className="mb-16 sm:mb-20">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Our Process</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//             We follow a proven methodology to ensure your project is delivered successfully from concept to completion.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {processSteps.map((step, index) => (
//             <ProcessStep key={step.number} step={step} index={index} />
//           ))}
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div ref={testimonialsRef} className="mb-16 sm:mb-20">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Client Success Stories</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//             Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard key={index} testimonial={testimonial} />
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div ref={ctaRef}>
//         <CTASection />
//       </div>
//     </section>
//   )
// }












"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ServiceCard } from "../ui/service-card"
import { ProcessStep } from "../ui/process-step"
import { CTASection } from "../ui/cta-section"
import { StatCard } from "../ui/stat-card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { services, processSteps, stats } from "../data/services-data"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ServicesSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)
  const serviceCards = useRef([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Reset refs array
  serviceCards.current = []

  // Add to refs array
  const addToRefs = (el) => {
    if (el && !serviceCards.current.includes(el)) {
      serviceCards.current.push(el)
    }
  }

  useEffect(() => {
    // Fetch testimonials
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/testimonials", { next: { revalidate: 60 } })
        if (!res.ok) throw new Error("Failed to fetch testimonials")
        const { testimonials } = await res.json()
        setTestimonials(
          testimonials.map((t) => ({
            id: t._id,
            name: t.name,
            role: t.role,
            avatar: t.avatar || "/placeholder.svg?height=100&width=100",
            rating: t.rating,
            testimonial: t.quote,
            project: t.projectType,
            company: t.company,
          }))
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()

    // Animation configurations
    const tl = gsap.timeline()

    // Header animation
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    )

    // Services cards animation
    if (serviceCards.current.length > 0) {
      tl.fromTo(
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
            once: true,
          },
        },
      )
    }

    // Process steps animation
    tl.fromTo(
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
          once: true,
        },
      },
    )

    // Stats animation
    tl.fromTo(
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
          once: true,
        },
      },
    )

    // Testimonials animation
    tl.fromTo(
      ".testimonial-swiper",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    // CTA animation
    tl.fromTo(
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
          once: true,
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
    }
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((testimonial, index) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewBody: testimonial.testimonial,
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: "5",
      },
      itemReviewed: {
        "@type": "CreativeWork",
        name: testimonial.project,
      },
      publisher: {
        "@type": "Organization",
        name: testimonial.company,
      },
      position: index + 1,
    })),
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 mt-14 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      role="region"
      aria-label="Services Section"
      data-testid="services-section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Elevate Your Digital
          <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Presence
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Transform your business with our comprehensive digital solutions designed to drive growth, engagement, and
          success in today&apos;s competitive landscape.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="mb-16 sm:mb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} ref={addToRefs} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="mb-16 sm:mb-20 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Proven Results</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Our track record speaks for itself. Here&apos;s how we&apos;ve helped businesses like yours succeed.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} className="mb-16 sm:mb-20 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Our Process</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a proven methodology to ensure your project is delivered successfully from concept to completion.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="mb-16 sm:mb-20 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Client Success Stories</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 text-lg">Error: {error}</div>
        )}

        {/* Testimonials Slider */}
        {!loading && !error && testimonials.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.testimonial-swiper-button-next',
              prevEl: '.testimonial-swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              el: '.testimonial-pagination',
              bulletClass: 'testimonial-bullet',
              bulletActiveClass: 'testimonial-bullet-active'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            grabCursor={true}
            className="testimonial-swiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative mx-auto max-w-4xl">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Client Info */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                      <div className="relative inline-block mb-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="rounded-full border-4 border-emerald-100"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-gray-800 mb-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{testimonial.name}</span>
                      </h4>
                      <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 mb-4" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                        <span itemProp="name">{testimonial.company}</span>
                      </p>

                      {/* Rating */}
                      {/* <div className="flex justify-center lg:justify-start gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                        <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                        <meta itemProp="bestRating" content="5" />
                      </div> */}
                      <div 
  className="flex justify-center lg:justify-start gap-1 mb-4" 
  itemProp="reviewRating" 
  itemScope 
  itemType="https://schema.org/Rating"
>
  {Array.from({ length: Math.max(0, Number(testimonial.rating) || 0) }).map((_, i) => (
    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
  ))}
  <meta itemProp="ratingValue" content={String(testimonial.rating || 0)} />
  <meta itemProp="bestRating" content="5" />
</div>


                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium" itemProp="itemReviewed" itemScope itemType="https://schema.org/CreativeWork">
                        <span itemProp="name">{testimonial.project}</span>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="lg:col-span-2">
                      <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic" itemProp="reviewBody">
                        "{testimonial.testimonial}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation Buttons */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="testimonial-swiper-button-prev p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="testimonial-swiper-button-next p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="relative z-10">
        <CTASection />
      </div>

      <style jsx>{`
     
        .testimonial-bullet {
          width: 12px;
          height: 12px;
          background: #ddd;
          border-radius: 50%;
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .testimonial-bullet-active {
          width: 30px;
          background: linear-gradient(to right, #10b981, #0d9488);
          border-radius: 10px;
        }
        
        .testimonial-swiper {
          padding: 20px 10px 40px;
        }
        
        .testimonial-swiper-button-next.swiper-button-disabled,
        .testimonial-swiper-button-prev.swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: scale(1);
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  )
}



// "use client"

// import { useEffect, useRef, useState } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ServiceCard } from "../ui/service-card"
// import { ProcessStep } from "../ui/process-step"
// import { CTASection } from "../ui/cta-section"
// import { StatCard } from "../ui/stat-card"
// import { Star, Quote } from "lucide-react"
// import Image from "next/image"
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import { services, processSteps, stats } from "../data/services-data"

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger)
// }

// export function ServicesSection() {
//   const sectionRef = useRef(null)
//   const headerRef = useRef(null)
//   const servicesRef = useRef(null)
//   const processRef = useRef(null)
//   const statsRef = useRef(null)
//   const testimonialsRef = useRef(null)
//   const ctaRef = useRef(null)
//   const serviceCards = useRef([])
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [isMobile, setIsMobile] = useState(false)

//   // Reset refs array
//   serviceCards.current = []

//   // Add to refs array
//   const addToRefs = (el) => {
//     if (el && !serviceCards.current.includes(el)) {
//       serviceCards.current.push(el)
//     }
//   }

//   // Check screen size for mobile detection
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640)
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   useEffect(() => {
//     // Fetch testimonials
//     const fetchTestimonials = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("/api/testimonials", { next: { revalidate: 60 } })
//         if (!res.ok) throw new Error("Failed to fetch testimonials")
//         const { testimonials } = await res.json()
//         setTestimonials(
//           testimonials.map((t) => ({
//             id: t._id,
//             name: t.name,
//             role: t.role,
//             avatar: t.avatar || "/placeholder.svg?height=100&width=100",
//             rating: t.rating,
//             testimonial: t.quote,
//             project: t.projectType,
//             company: t.company,
//           }))
//         )
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTestimonials()

//     // Animation configurations
//     const tl = gsap.timeline()

//     // Header animation
//     tl.fromTo(
//       headerRef.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
//     )

//     // Services cards animation
//     if (serviceCards.current.length > 0) {
//       tl.fromTo(
//         serviceCards.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.4,
//           stagger: 0.08,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: servicesRef.current,
//             start: "top 85%",
//             once: true,
//           },
//         },
//       )
//     }

//     // Process steps animation
//     tl.fromTo(
//       ".process-step",
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         stagger: 0.08,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: processRef.current,
//           start: "top 80%",
//           once: true,
//         },
//       },
//     )

//     // Stats animation
//     tl.fromTo(
//       ".stat-item",
//       { opacity: 0, scale: 0.95 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 0.5,
//         stagger: 0.08,
//         ease: "back.out(1.2)",
//         scrollTrigger: {
//           trigger: statsRef.current,
//           start: "top 85%",
//           once: true,
//         },
//       },
//     )

//     // Testimonials animation
//     tl.fromTo(
//       isMobile ? ".testimonial-swiper" : ".testimonial-card",
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: isMobile ? 0 : 0.1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: testimonialsRef.current,
//           start: "top 80%",
//           once: true,
//         },
//       },
//     )

//     // CTA animation
//     tl.fromTo(
//       ctaRef.current,
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ctaRef.current,
//           start: "top 90%",
//           once: true,
//         },
//       },
//     )

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//       tl.kill()
//     }
//   }, [isMobile])

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     itemListElement: testimonials.map((testimonial, index) => ({
//       "@type": "Review",
//       author: {
//         "@type": "Person",
//         name: testimonial.name,
//       },
//       reviewBody: testimonial.testimonial,
//       reviewRating: {
//         "@type": "Rating",
//         ratingValue: testimonial.rating,
//         bestRating: "5",
//       },
//       itemReviewed: {
//         "@type": "CreativeWork",
//         name: testimonial.project,
//       },
//       publisher: {
//         "@type": "Organization",
//         name: testimonial.company,
//       },
//       position: index + 1,
//     })),
//   }

//   return (
//     <section
//       ref={sectionRef}
//       className="py-16 mt-14 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
//       role="region"
//       aria-label="Services Section"
//       data-testid="services-section"
//       itemScope
//       itemType="https://schema.org/ItemList"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header Section */}
//       <div ref={headerRef} className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto relative z-10">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-6">
//           <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
//         </div>
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//           Elevate Your Digital
//           <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
//             Presence
//           </span>
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
//           Transform your business with our comprehensive digital solutions designed to drive growth, engagement, and
//           success in today&apos;s competitive landscape.
//         </p>
//       </div>

//       {/* Services Grid */}
//       <div ref={servicesRef} className="mb-16 sm:mb-20 relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {services.map((service, index) => (
//             <ServiceCard key={service.id} service={service} ref={addToRefs} />
//           ))}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div ref={statsRef} className="mb-16 sm:mb-20 relative z-10">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Proven Results</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
//             Our track record speaks for itself. Here&apos;s how we&apos;ve helped businesses like yours succeed.
//           </p>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
//           {stats.map((stat, index) => (
//             <StatCard key={index} stat={stat} />
//           ))}
//         </div>
//       </div>

//       {/* Process Section */}
//       <div ref={processRef} className="mb-16 sm:mb-20 relative z-10">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Our Process</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//             We follow a proven methodology to ensure your project is delivered successfully from concept to completion.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {processSteps.map((step, index) => (
//             <ProcessStep key={step.number} step={step} index={index} />
//           ))}
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div ref={testimonialsRef} className="mb-16 sm:mb-20 relative z-10">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Client Success Stories</h2>
//           <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//             Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Testimonials Display */}
//         {!loading && !error && testimonials.length > 0 && (
//           <>
//             {isMobile ? (
//               <Swiper
//                 modules={[Navigation, Pagination, A11y, Autoplay]}
//                 spaceBetween={30}
//                 slidesPerView={1}
//                 navigation={{
//                   nextEl: '.testimonial-swiper-button-next',
//                   prevEl: '.testimonial-swiper-button-prev',
//                 }}
//                 pagination={{ 
//                   clickable: true,
//                   el: '.testimonial-pagination',
//                   bulletClass: 'testimonial-bullet',
//                   bulletActiveClass: 'testimonial-bullet-active'
//                 }}
//                 autoplay={{
//                   delay: 5000,
//                   disableOnInteraction: false,
//                 }}
//                 loop={true}
//                 speed={800}
//                 grabCursor={true}
//                 className="testimonial-swiper"
//               >
//                 {testimonials.map((testimonial) => (
//                   <SwiperSlide key={testimonial.id}>
//                     <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative mx-auto max-w-4xl">
//                       {/* Quote Icon */}
//                       <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                         <Quote className="w-4 h-4 text-white" aria-hidden="true" />
//                       </div>

//                       <div className="grid lg:grid-cols-3 gap-8 items-center">
//                         {/* Client Info */}
//                         <div className="lg:col-span-1 text-center lg:text-left">
//                           <div className="relative inline-block mb-4">
//                             <Image
//                               src={testimonial.avatar}
//                               alt={testimonial.name}
//                               width={100}
//                               height={100}
//                               className="rounded-full border-4 border-emerald-100"
//                             />
//                             <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                               <Star className="w-4 h-4 text-white fill-current" />
//                             </div>
//                           </div>

//                           <h4 className="text-xl font-bold text-gray-800 mb-1" itemProp="author" itemScope itemType="https://schema.org/Person">
//                             <span itemProp="name">{testimonial.name}</span>
//                           </h4>
//                           <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
//                           <p className="text-sm text-gray-500 mb-4" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
//                             <span itemProp="name">{testimonial.company}</span>
//                           </p>

//                           {/* Rating */}
//                           <div className="flex justify-center lg:justify-start gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
//                             {[...Array(testimonial.rating)].map((_, i) => (
//                               <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                             ))}
//                             <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
//                             <meta itemProp="bestRating" content="5" />
//                           </div>

//                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium" itemProp="itemReviewed" itemScope itemType="https://schema.org/CreativeWork">
//                             <span itemProp="name">{testimonial.project}</span>
//                           </div>
//                         </div>

//                         {/* Testimonial Content */}
//                         <div className="lg:col-span-2">
//                           <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic" itemProp="reviewBody">
//                             "{testimonial.testimonial}"
//                           </blockquote>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {testimonials.map((testimonial) => (
//                   <div key={testimonial.id} className="testimonial-card bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative max-w-4xl">
//                     {/* Quote Icon */}
//                     <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                       <Quote className="w-4 h-4 text-white" aria-hidden="true" />
//                     </div>

//                     <div className="grid lg:grid-cols-3 gap-8 items-center">
//                       {/* Client Info */}
//                       <div className="lg:col-span-1 text-center lg:text-left">
//                         <div className="relative inline-block mb-4">
//                           <Image
//                             src={testimonial.avatar}
//                             alt={testimonial.name}
//                             width={100}
//                             height={100}
//                             className="rounded-full border-4 border-emerald-100"
//                           />
//                           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                             <Star className="w-4 h-4 text-white fill-current" />
//                           </div>
//                         </div>

//                         <h4 className="text-xl font-bold text-gray-800 mb-1" itemProp="author" itemScope itemType="https://schema.org/Person">
//                           <span itemProp="name">{testimonial.name}</span>
//                         </h4>
//                         <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
//                         <p className="text-sm text-gray-500 mb-4" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
//                           <span itemProp="name">{testimonial.company}</span>
//                         </p>

//                         {/* Rating */}
//                         <div className="flex justify-center lg:justify-start gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                           ))}
//                           <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
//                           <meta itemProp="bestRating" content="5" />
//                         </div>

//                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium" itemProp="itemReviewed" itemScope itemType="https://schema.org/CreativeWork">
//                           <span itemProp="name">{testimonial.project}</span>
//                         </div>
//                       </div>

//                       {/* Testimonial Content */}
//                       <div className="lg:col-span-2">
//                         <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic" itemProp="reviewBody">
//                           "{testimonial.testimonial}"
//                         </blockquote>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {/* Navigation Buttons for Swiper */}
//         {!loading && !error && testimonials.length > 0 && isMobile && (
//           <div className="flex justify-center gap-4 mt-8">
//             <button
//               className="testimonial-swiper-button-prev p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//               aria-label="Previous testimonial"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               className="testimonial-swiper-button-next p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//               aria-label="Next testimonial"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         )}

//         {isMobile && <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>}
//       </div>

//       {/* CTA Section */}
//       <div ref={ctaRef} className="relative z-10">
//         <CTASection />
//       </div>

//       <style jsx>{`
//         .testimonial-bullet {
//           width: 12px;
//           height: 12px;
//           background: #ddd;
//           border-radius: 50%;
//           display: inline-block;
//           margin: 0 4px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
        
//         .testimonial-bullet-active {
//           width: 30px;
//           background: linear-gradient(to right, #10b981, #0d9488);
//           border-radius: 10px;
//         }
        
//         .testimonial-swiper {
//           padding: 20px 10px 40px;
//         }
        
//         .testimonial-swiper-button-next.swiper-button-disabled,
//         .testimonial-swiper-button-prev.swiper-button-disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           transform: scale(1);
//         }
//       `}</style>

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />
//     </section>
//   )
// }