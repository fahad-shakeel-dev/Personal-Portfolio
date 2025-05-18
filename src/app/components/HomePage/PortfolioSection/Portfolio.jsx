'use client'

import React, { useRef, useEffect } from 'react'

// Portfolio section showcasing project cards
export default function PortfolioSection() {
  const portfolioRef = useRef(null)
  const portfolioItemsRef = useRef([])

  // Add Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    // Animate portfolio items with stagger effect
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate')
          }, index * 200) // Stagger animation by 200ms
          itemObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe portfolio items
    portfolioItemsRef.current.forEach((item) => {
      if (item) itemObserver.observe(item)
    })

    // Cleanup observer
    return () => {
      portfolioItemsRef.current.forEach((item) => {
        if (item) itemObserver.unobserve(item)
      })
    }
  }, [])

  // Function to add elements to portfolioItemsRef
  const addToRefs = (el) => {
    if (el && !portfolioItemsRef.current.includes(el)) {
      portfolioItemsRef.current.push(el)
    }
  }

  return (
    <section
      ref={portfolioRef}
      className="relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50"
    >
      {/* CSS for animations and responsive styling */}
      <style jsx>{`
        /* Animation for portfolio items */
        .portfolio-item {
          opacity: 0;
          transform: translateY(100px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .portfolio-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ensure section height is content-driven */
        section {
          min-height: fit-content;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .portfolio-item {
            transform: translateY(50px); /* Smaller translate for small screens */
          }
        }
      `}</style>

      {/* Container with max-width for large screens */}
      <div className="w-full max-w-[1300px] mx-auto">
        {/* Heading section */}
        <div className="mb-12 sm:mb-16">
          <span className="text-emerald-800 text-xs sm:text-sm tracking-widest uppercase mb-4 inline-block">
            PORTFOLIO
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-teal-900">
            from designs to
            <span className="relative">
              pixel perfect
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-emerald-500 rounded-full"></span>
            </span>
            web
          </h2>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Portfolio Item 1 */}
          <div className="portfolio-item group" ref={addToRefs}>
            <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
                <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
              </div>
              <div className="relative h-full bg-white rounded-lg overflow-hidden">
                <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
                </div>
                <div className="p-4">
                  <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-medium text-teal-900">
                Building the future of HR software solutions
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  WORDPRESS
                </span>
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  JAVASCRIPT
                </span>
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  CSS3
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio Item 2 */}
          <div className="portfolio-item group" ref={addToRefs}>
            <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
                <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
              </div>
              <div className="relative h-full bg-white rounded-lg overflow-hidden">
                <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
                </div>
                <div className="p-4">
                  <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-medium text-teal-900">
                Brother Film Co: where creativity meets code
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  WORDPRESS
                </span>
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  PHP
                </span>
                <span className 쉽게="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  GSAP
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio Item 3 */}
          <div className="portfolio-item group" ref={addToRefs}>
            <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
                <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
              </div>
              <div className="relative h-full bg-white rounded-lg overflow-hidden">
                <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
                </div>
                <div className="p-4">
                  <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-medium text-teal-900">
                Innovating the world of digital events
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  WEBFLOW
                </span>
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  JAVASCRIPT
                </span>
                <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
                  REACT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}