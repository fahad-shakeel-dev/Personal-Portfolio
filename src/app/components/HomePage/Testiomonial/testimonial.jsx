"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/testimonials")
        if (!res.ok) throw new Error("Failed to fetch testimonials")
        const data = await res.json()
        
        // Handle both response formats
        const testimonialsData = data.testimonials || data
        
        // Filter only approved testimonials that should be displayed on portfolio
        const approvedTestimonials = testimonialsData.filter(
          t => t.status === 'approved' && t.displayOnPortfolio !== false
        )
        
        setTestimonials(
          approvedTestimonials.map((t) => ({
            id: t._id || t.id,
            name: t.name || t.fullName || "Anonymous",
            role: t.role || "",
            avatar: t.avatar || "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png",
            rating: t.rating || 5,
            testimonial: t.quote || t.testimonial || "",
            project: t.projectType || "Web Development",
            company: t.company || "",
          }))
        )
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
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

  // Default placeholder for avatar
  const defaultAvatar = "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png"

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
      role="region"
      aria-label="Testimonials Section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" aria-hidden="true" />
            Testimonials
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            What Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me and the results
            we&apos;ve achieved together.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 text-lg py-12">Loading testimonials...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 text-lg py-12">Error loading testimonials. Please try again later.</div>
        )}

        {/* No Testimonials State */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center text-gray-600 text-lg py-12">
            No testimonials available yet. Check back soon!
          </div>
        )}

        {/* Testimonials Slider */}
        {!loading && !error && testimonials.length > 0 && (
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
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
                            src={testimonial.avatar || defaultAvatar}
                            alt={testimonial.name}
                            width={100}
                            height={100}
                            className="rounded-full border-4 border-emerald-100 object-cover"
                            onError={(e) => {
                              e.target.src = defaultAvatar
                            }}
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-800 mb-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <span itemProp="name">{testimonial.name}</span>
                        </h4>
                        {testimonial.role && (
                          <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
                        )}
                        {testimonial.company && (
                          <p className="text-sm text-gray-500 mb-4" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">{testimonial.company}</span>
                          </p>
                        )}

                        {/* Rating */}
                        <div className="flex justify-center lg:justify-start gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                        </div>

                        {testimonial.project && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium" itemProp="itemReviewed" itemScope itemType="https://schema.org/CreativeWork">
                            <span itemProp="name">{testimonial.project}</span>
                          </div>
                        )}
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

            {/* Navigation Buttons */}
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

            <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
          </div>
        )}
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
        
        /* Custom navigation button styles */
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