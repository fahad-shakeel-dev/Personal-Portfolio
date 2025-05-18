'use client'

import React, { useRef, useEffect } from 'react'

// Services section showcasing service cards
export default function ServicesSection() {
  const servicesRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  // Add Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    // Animate heading
    const headingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
        headingObserver.unobserve(entry.target)
      }
    }, observerOptions)

    // Animate cards with stagger effect
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate')
          }, index * 200) // Stagger animation by 200ms
          cardObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe heading and cards
    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }
    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card)
    })

    // Cleanup observers
    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      cardsRef.current.forEach((card) => {
        if (card) cardObserver.unobserve(card)
      })
    }
  }, [])

  // Function to add elements to cardsRef
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section
      ref={servicesRef}
      className="relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200"
    >
      {/* CSS for animations and responsive styling */}
      <style jsx>{`
        /* Animation for heading and cards */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(100px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .animate-on-scroll.animate {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ensure section height is content-driven */
        section {
          min-height: fit-content;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-on-scroll {
            transform: translateY(50px); /* Smaller translate for small screens */
          }
        }
      `}</style>

      {/* Container with max-width for large screens */}
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        {/* Heading Section */}
        <div className="relative">
          <span className="text-emerald-800 text-xs sm:text-sm tracking-widest uppercase mb-4 inline-block">
            SERVICES
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-teal-900 animate-on-scroll"
          >
            Streamline your project to enter the market and scale successfully
          </h2>
        </div>

        {/* Service Cards */}
        <div className="space-y-6">
          {/* Service Card 1 */}
          <div
            ref={addToRefs}
            className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
          >
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Web Development</h3>
                <p className="text-teal-700 text-sm sm:text-base">
                  Use our expertise in WordPress, Webflow, Shopify, Laravel, React
                </p>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div
            ref={addToRefs}
            className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
          >
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Staff Augmentation</h3>
                <p className="text-teal-700 text-sm sm:text-base">
                  Hire dedicated contractors integrated into your team
                </p>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div
            ref={addToRefs}
            className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
          >
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Mobile Development</h3>
                <p className="text-teal-700 text-sm sm:text-base">
                  Build your application for iOS, Android, or cross-platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}