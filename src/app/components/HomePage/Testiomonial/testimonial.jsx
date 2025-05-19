'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Testimonials page with smooth auto-swiping card transitions
export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef(null)
  const timeoutRef = useRef(null)

  // Testimonial data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO OF DESIGNHUB',
      avatar: '/placeholder.svg?height=80&width=80',
      messages: [
        { text: 'Absolutely love the design', time: '2:34 PM' },
        { text: 'Exactly what we needed', time: '2:35 PM' },
        { text: 'The team is very impressed', time: '2:36 PM' },
        { text: 'Will definitely work with you again', time: '2:38 PM' },
      ],
      productImage: '/placeholder.svg?height=400&width=300',
      productName: 'Brand Redesign',
    },
    {
      name: 'Michael Chen',
      role: 'FOUNDER OF TECHFLOW',
      avatar: '/placeholder.svg?height=80&width=80',
      messages: [
        { text: 'The app works flawlessly', time: '3:15 PM' },
        { text: 'User feedback has been great', time: '3:17 PM' },
        { text: 'Performance is better than expected', time: '3:20 PM' },
        { text: 'Worth every penny', time: '3:22 PM' },
      ],
      productImage: '/placeholder.svg?height=400&width=300',
      productName: 'Mobile Application',
    },
    {
      name: 'Emma Rodriguez',
      role: 'MARKETING DIRECTOR',
      avatar: '/placeholder.svg?height=80&width=80',
      messages: [
        { text: 'Our conversion rate increased by 40%', time: '1:05 PM' },
        { text: 'The landing page looks stunning', time: '1:08 PM' },
        { text: 'Very intuitive user experience', time: '1:10 PM' },
        { text: 'Exceeded our expectations', time: '1:12 PM' },
      ],
      productImage: '/placeholder.svg?height=400&width=300',
      productName: 'Campaign Launch',
    },
  ]

  // Auto-swiping logic
  useEffect(() => {
    if (isAnimating) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set timeout for 3-second pause, then trigger next card
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true)
      setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
    }, 3000)

    // Cleanup on unmount or index change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeIndex, isAnimating])

  // Reset animation state after transition
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  // Handle next testimonial
  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
  }

  // Handle previous testimonial
  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <div className="relative flex items-center py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      {/* CSS for animations and responsive styling */}
      <style jsx>{`
        /* Card transition animation */
        .testimonial-card {
          opacity: 0;
          transform: translateX(100px) translateY(50px) scale(0.95);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .testimonial-card.active {
          opacity: 1;
          transform: translateX(0) translateY(0) scale(1);
        }

        .testimonial-card.exiting {
          opacity: 0;
          transform: translateX(-100px) translateY(-50px) scale(0.95);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        /* Message animation */
        .message {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }

        .testimonial-card.active .message {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ensure section height is content-driven */
        div {
          min-height: fit-content;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .testimonial-card {
            transform: translateX(50px) translateY(30px) scale(0.95);
          }
          .testimonial-card.exiting {
            transform: translateX(-50px) translateY(-30px) scale(0.95);
          }
        }
      `}</style>

      {/* Container with max-width for large screens */}
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - Heading */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-teal-900">
              what our <br />
              clients are <br />
              saying... <span className="text-emerald-500">for real</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-teal-700 text-base sm:text-lg max-w-md">
              Authentic feedback from our valued customers who have experienced our products and services firsthand.
            </p>
          </div>

          {/* Right side - Testimonial Card */}
          <div className="w-full lg:w-1/2 relative">
            <div
              ref={cardRef}
              className={`bg-white rounded-3xl p-6 overflow-hidden shadow-lg testimonial-card ${
                isAnimating ? 'exiting' : 'active'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* User info and messages */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={currentTestimonial.avatar || '/placeholder.svg'}
                        alt={currentTestimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-teal-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-sm text-teal-700">{currentTestimonial.role}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    {currentTestimonial.messages.map((message, index) => (
                      <div
                        key={index}
                        className="bg-emerald-100 rounded-2xl rounded-bl-none px-4 py-3 text-teal-900 inline-block message"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between gap-4 sm:gap-8">
                          <p className="text-sm sm:text-base">{message.text}</p>
                          <span className="text-xs text-teal-600 self-end">{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product image */}
                <div className="md:w-1/3 relative">
                  <div className="rounded-xl overflow-hidden h-full">
                    <img
                      src={currentTestimonial.productImage || '/placeholder.svg'}
                      alt={currentTestimonial.productName}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
                      <p className="text-white font-medium text-sm sm:text-base">
                        {currentTestimonial.productName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-end gap-4 mt-6 sm:mt-8">
          <button
            onClick={handlePrev}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? 'w-6 sm:w-8 bg-emerald-500' : 'w-2 bg-teal-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}