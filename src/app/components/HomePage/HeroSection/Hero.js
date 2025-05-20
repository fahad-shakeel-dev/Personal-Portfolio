'use client'

import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Counter from './SubComponents/Counter/Counter' // Import the Counter component

// Array for decorative dots
const decorativeDots = Array(6).fill('')

export default function Hero() {
  // State for typing effect and cursor visibility
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // Typing effect for name
  useEffect(() => {
    const text = 'Fahad Joyia'
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setShowCursor(false)
      }
    }, 200)

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section className="min-h-0 flex items-center pt-16 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      {/* Container with max-width for large screens */}
      <div className="w-full max-w-[1300px] lg:my-0 my-5 mx-auto px-4">
        <style jsx>{`
          /* Fade-in animation */
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          /* Slide-up animation */
          .slide-up {
            opacity: 0;
            transform: translateY(20px);
            animation: slideUp 0.5s ease-out forwards;
          }

          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Slide-right animation */
          .slide-right {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideRight 0.5s ease-out forwards;
          }

          @keyframes slideRight {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Scale animation for dots */
          .scale-in {
            transform: scale(0);
            animation: scaleIn 0.3s ease-out forwards;
          }

          @keyframes scaleIn {
            to {
              transform: scale(1);
            }
          }

          /* Button hover effect */
          .btn-hover {
            transition: transform 0.2s ease-out;
          }

          .btn-hover:hover {
            transform: scale(1.05);
          }

          .btn-hover:active {
            transform: scale(0.95);
          }

          /* Icon hover effect */
          .icon-hover {
            transition: transform 0.2s ease-out, color 0.2s;
          }

          .icon-hover:hover {
            transform: translateY(-5px);
          }

          .icon-hover:active {
            transform: scale(0.95);
          }

          /* Image hover effect */
          .image-hover {
            transition: transform 0.3s ease-out;
          }

          .image-hover:hover {
            transform: scale(1.05);
          }

          /* Rotating circle (runs once) */
          .rotate {
            animation: rotate 8s linear forwards;
          }

          @keyframes rotate {
            to {
              transform: rotate(360deg);
            }
          }

          /* Pulsing circle (runs once) */
          .pulse {
            animation: pulse 3s ease-in-out forwards;
          }

          @keyframes pulse {
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          /* Floating badge (runs once) */
          .float {
            animation: float 4s ease-in-out forwards;
          }

          @keyframes float {
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          /* Arrow transition */
          .arrow {
            transition: transform 0.2s ease-out;
          }

          .btn-hover:hover .arrow {
            transform: translateX(4px);
          }

          /* Cursor blink */
          .cursor {
            animation: blink 0.8s step-end infinite;
          }

          @keyframes blink {
            50% {
              opacity: 0;
            }
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .image-container {
              max-width: 70vw !important;
            }
          }

          @media (min-width: 640px) and (max-width: 1024px) {
            .image-container {
              max-width: 50vw !important;
            }
          }
        `}</style>

        {/* Grid layout for content */}
        <div className="grid lg:grid-cols-2 mt-0 lg:mt-5 pb-6 gap-8 sm:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Decorative dots */}
            <div className="flex gap-3">
              {decorativeDots.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-emerald-500 scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Heading section */}
            <div className="space-y-4">
              <h2
                className="text-lg sm:text-xl text-emerald-800 slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Hi! I Am
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-900 fade-in">
                {displayedText}
                <span className={showCursor ? 'cursor' : ''}>|</span>
              </h1>
            </div>

            {/* Developer tagline */}
            <div
              className="flex items-center gap-4 slide-right"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-12 h-[2px] bg-emerald-500" />
              <span className="text-sm sm:text-base text-teal-700">Creative Developer</span>
            </div>

            {/* Stats section */}
            <div
              className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-emerald-200 fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
                  <Counter from={0} to={4} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700">Years of Experience</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
                  <Counter from={0} to={20} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
                  <Counter from={0} to={10} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700">Happy Clients</p>
              </div>
            </div>

            {/* Call to action and social links */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <button className="group flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full btn-hover text-sm sm:text-base">
                Let&apos;s Talk
                <ArrowRight className="ml-2 mt-1 h-4 w-4 arrow" />
              </button>
              <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-emerald-600 hover:text-emerald-800 icon-hover"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image and Decorations */}
          <div
            className="relative fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            {/* Image container with responsive sizing */}
            <div className="relative w-full aspect-square max-w-[78vw] sm:max-w-md image-container mx-auto">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 border-4 border-emerald-500 rounded-full rotate" />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 border-4 border-teal-300 rounded-full pulse" />

              {/* Profile image */}
              <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl image-hover">
                <Image
                  src={'/images/hero.png'}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="object-cover"
                />
              </div>

              {/* Client rating badge */}
              <div className="absolute top-10 -right-10 bg-white rounded-2xl shadow-xl p-3 sm:p-4 float">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white bg-emerald-200"
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <h4 className="font-semibold text-emerald-800">4.9/5</h4>
                    <p className="text-xs text-teal-600">Client Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}