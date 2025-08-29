// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
// import Image from 'next/image'
// import Counter from './SubComponents/Counter/Counter' // Import the Counter component

// // Array for decorative dots
// const decorativeDots = Array(6).fill('')

// export default function Hero() {
//   // State for typing effect and cursor visibility
//   const [displayedText, setDisplayedText] = useState('')
//   const [showCursor, setShowCursor] = useState(true)

//   // Typing effect for name
//   useEffect(() => {
//     const text = 'Fahad Joyia'
//     let currentIndex = 0
//     const interval = setInterval(() => {
//       if (currentIndex <= text.length) {
//         setDisplayedText(text.slice(0, currentIndex))
//         currentIndex++
//       } else {
//         clearInterval(interval)
//         setShowCursor(false)
//       }
//     }, 200)

//     // Blinking cursor effect
//     const cursorInterval = setInterval(() => {
//       setShowCursor((prev) => !prev)
//     }, 800)

//     return () => {
//       clearInterval(interval)
//       clearInterval(cursorInterval)
//     }
//   }, [])

//   return (
//     <section className="min-h-0 flex items-center pt-16 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
//       {/* Container with max-width for large screens */}
//       <div className="w-full max-w-[1300px] lg:my-0 my-5 mx-auto px-4">
//         <style jsx>{`
//           /* Fade-in animation */
//           .fade-in {
//             opacity: 0;
//             animation: fadeIn 0.5s ease-out forwards;
//           }

//           @keyframes fadeIn {
//             to {
//               opacity: 1;
//             }
//           }

//           /* Slide-up animation */
//           .slide-up {
//             opacity: 0;
//             transform: translateY(20px);
//             animation: slideUp 0.5s ease-out forwards;
//           }

//           @keyframes slideUp {
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           /* Slide-right animation */
//           .slide-right {
//             opacity: 0;
//             transform: translateX(-20px);
//             animation: slideRight 0.5s ease-out forwards;
//           }

//           @keyframes slideRight {
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           /* Scale animation for dots */
//           .scale-in {
//             transform: scale(0);
//             animation: scaleIn 0.3s ease-out forwards;
//           }

//           @keyframes scaleIn {
//             to {
//               transform: scale(1);
//             }
//           }

//           /* Button hover effect */
//           .btn-hover {
//             transition: transform 0.2s ease-out;
//           }

//           .btn-hover:hover {
//             transform: scale(1.05);
//           }

//           .btn-hover:active {
//             transform: scale(0.95);
//           }

//           /* Icon hover effect */
//           .icon-hover {
//             transition: transform 0.2s ease-out, color 0.2s;
//           }

//           .icon-hover:hover {
//             transform: translateY(-5px);
//           }

//           .icon-hover:active {
//             transform: scale(0.95);
//           }

//           /* Image hover effect */
//           .image-hover {
//             transition: transform 0.3s ease-out;
//           }

//           .image-hover:hover {
//             transform: scale(1.05);
//           }

//           /* Rotating circle (runs once) */
//           .rotate {
//             animation: rotate 8s linear forwards;
//           }

//           @keyframes rotate {
//             to {
//               transform: rotate(360deg);
//             }
//           }

//           /* Pulsing circle (runs once) */
//           .pulse {
//             animation: pulse 3s ease-in-out forwards;
//           }

//           @keyframes pulse {
//             50% {
//               transform: scale(1.1);
//             }
//             100% {
//               transform: scale(1);
//             }
//           }

//           /* Floating badge (runs once) */
//           .float {
//             animation: float 4s ease-in-out forwards;
//           }

//           @keyframes float {
//             50% {
//               transform: translateY(-10px);
//             }
//             100% {
//               transform: translateY(0);
//             }
//           }

//           /* Arrow transition */
//           .arrow {
//             transition: transform 0.2s ease-out;
//           }

//           .btn-hover:hover .arrow {
//             transform: translateX(4px);
//           }

//           /* Cursor blink */
//           .cursor {
//             animation: blink 0.8s step-end infinite;
//           }

//           @keyframes blink {
//             50% {
//               opacity: 0;
//             }
//           }

//           /* Responsive adjustments */
//           @media (max-width: 640px) {
//             .image-container {
//               max-width: 70vw !important;
//             }
//           }

//           @media (min-width: 640px) and (max-width: 1024px) {
//             .image-container {
//               max-width: 50vw !important;
//             }
//           }
//         `}</style>

//         {/* Grid layout for content */}
//         <div className="grid lg:grid-cols-2 mt-5 lg:mt-10 pb-6 gap-8 lg:ml-8 sm:gap-12 items-center">
//           {/* Left Column: Text Content */}
//           <div className="space-y-6 sm:space-y-8">
//             {/* Decorative dots */}
//             <div className="flex gap-3">
//               {decorativeDots.map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 rounded-full bg-emerald-500 scale-in"
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 />
//               ))}
//             </div>

//             {/* Heading section */}
//             <div className="space-y-4">
//               <h2
//                 className="text-lg sm:text-xl text-emerald-800 slide-up"
//                 style={{ animationDelay: '0.2s' }}
//               >
//                 Hi! I Am
//               </h2>
//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-900 fade-in">
//                 {displayedText}
//                 <span className={showCursor ? 'cursor' : ''}>|</span>
//               </h1>
//             </div>

//             {/* Developer tagline */}
//             <div
//               className="flex items-center gap-4 slide-right"
//               style={{ animationDelay: '0.4s' }}
//             >
//               <div className="w-12 h-[2px] bg-emerald-500" />
//               <span className="text-sm sm:text-base text-teal-700">Creative Developer</span>
//             </div>

//             {/* Stats section */}
//             <div
//               className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-emerald-200 fade-in"
//               style={{ animationDelay: '0.5s' }}
//             >
//               <div>
//                 <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
//                   <Counter from={0} to={4} />+
//                 </h3>
//                 <p className="text-xs sm:text-sm text-teal-700">Years of Experience</p>
//               </div>
//               <div>
//                 <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
//                   <Counter from={0} to={20} />+
//                 </h3>
//                 <p className="text-xs sm:text-sm text-teal-700">Projects Completed</p>
//               </div>
//               <div>
//                 <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
//                   <Counter from={0} to={10} />+
//                 </h3>
//                 <p className="text-xs sm:text-sm text-teal-700">Happy Clients</p>
//               </div>
//             </div>

//             {/* Call to action and social links */}
//             <div
//               className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 fade-in"
//               style={{ animationDelay: '0.6s' }}
//             >
//               <button className="group flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full btn-hover text-sm sm:text-base">
//                 Let&apos;s Talk
//                 <ArrowRight className="ml-2 mt-1 h-4 w-4 arrow" />
//               </button>
//               <div className="flex gap-4">
//                 {[Github, Linkedin, Twitter].map((Icon, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     className="text-emerald-600 hover:text-emerald-800 icon-hover"
//                   >
//                     <Icon className="h-5 w-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Image and Decorations */}
//           <div
//             className="relative fade-in"
//             style={{ animationDelay: '0.8s' }}
//           >
//             {/* Image container with responsive sizing */}
//             <div className="relative w-full aspect-square max-w-[78vw] sm:max-w-md image-container mx-auto">
//               {/* Decorative circles */}
//               <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 border-4 border-emerald-500 rounded-full rotate" />
//               <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 border-4 border-teal-300 rounded-full pulse" />

//               {/* Profile image */}
//               <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl image-hover">
//                 <Image
//                   src={'/images/hero.png'}
//                   alt="Profile"
//                   width={500}
//                   height={500}
//                   className="object-cover"
//                 />
//               </div>

//               {/* Client rating badge */}
//               <div className="absolute top-10 -right-10 bg-white rounded-2xl shadow-xl p-3 sm:p-4 float">
//                 <div className="flex items-center gap-2">
//                   <div className="flex -space-x-2">
//                     {[...Array(3)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white bg-emerald-200"
//                       />
//                     ))}
//                   </div>
//                   <div className="text-xs sm:text-sm">
//                     <h4 className="font-semibold text-emerald-800">4.9/5</h4>
//                     <p className="text-xs text-teal-600">Client Rating</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Github, Linkedin, Twitter, ArrowRight, Sparkles } from "lucide-react"
// import Image from "next/image"
// import Counter from "./SubComponents/Counter/Counter"

// const decorativeDots = Array(6).fill("")

// export default function HeroSection() {
//   const [displayedText, setDisplayedText] = useState("")
//   const [showCursor, setShowCursor] = useState(true)
//   const [isLoaded, setIsLoaded] = useState(false)

//   const typeText = useCallback(() => {
//     const text = "Fahad Joyia"
//     let currentIndex = 0

//     const interval = setInterval(() => {
//       if (currentIndex <= text.length) {
//         setDisplayedText(text.slice(0, currentIndex))
//         currentIndex++
//       } else {
//         clearInterval(interval)
//         setShowCursor(false)
//       }
//     }, 150)

//     const cursorInterval = setInterval(() => {
//       setShowCursor((prev) => !prev)
//     }, 600)

//     return () => {
//       clearInterval(interval)
//       clearInterval(cursorInterval)
//     }
//   }, [])

//   useEffect(() => {
//     setIsLoaded(true)
//     const cleanup = typeText()
//     return cleanup
//   }, [typeText])

//   return (
//     <section className="min-h-screen mt-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Column: Content */}
//           <div
//             className={`space-y-8 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//           >
//             {/* Decorative Dots */}
//             <div className="flex gap-2">
//               {decorativeDots.map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transform transition-all duration-500"
//                   style={{
//                     animationDelay: `${i * 100}ms`,
//                     transform: isLoaded ? "scale(1)" : "scale(0)",
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Greeting */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3">
//                 <Sparkles className="w-6 h-6 text-emerald-500 animate-spin-slow" />
//                 <h2 className="text-xl font-medium text-emerald-700 tracking-wide">Hi! I Am</h2>
//               </div>

//               {/* Main Heading with Typing Effect */}
//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 leading-tight">
//                 {displayedText}
//                 <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>|</span>
//               </h1>
//             </div>

//             {/* Tagline */}
//             <div className="flex items-center gap-4 group">
//               <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-20 transition-all duration-300"></div>
//               <span className="text-lg text-teal-700 font-medium">Creative Developer & Designer</span>
//             </div>

//             {/* Stats Section */}
//             <div className="grid grid-cols-3 gap-8 py-8 border-t border-emerald-200/50">
//               <div className="text-center group hover:scale-105 transition-transform duration-300">
//                 <h3 className="text-3xl lg:text-4xl font-bold text-teal-800 mb-2">
//                   <Counter from={0} to={4} />+
//                 </h3>
//                 <p className="text-sm text-teal-600 font-medium">Years Experience</p>
//               </div>
//               <div className="text-center group hover:scale-105 transition-transform duration-300">
//                 <h3 className="text-3xl lg:text-4xl font-bold text-teal-800 mb-2">
//                   <Counter from={0} to={50} />+
//                 </h3>
//                 <p className="text-sm text-teal-600 font-medium">Projects Done</p>
//               </div>
//               <div className="text-center group hover:scale-105 transition-transform duration-300">
//                 <h3 className="text-3xl lg:text-4xl font-bold text-teal-800 mb-2">
//                   <Counter from={0} to={25} />+
//                 </h3>
//                 <p className="text-sm text-teal-600 font-medium">Happy Clients</p>
//               </div>
//             </div>

//             {/* CTA and Social Links */}
//             <div className="flex flex-col sm:flex-row items-center gap-6">
//               <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Let&apos;s Talk
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>

//               <div className="flex gap-4">
//                 {[
//                   { Icon: Github, href: "#", label: "GitHub" },
//                   { Icon: Linkedin, href: "#", label: "LinkedIn" },
//                   { Icon: Twitter, href: "#", label: "Twitter" },
//                 ].map(({ Icon, href, label }, index) => (
//                   <a
//                     key={index}
//                     href={href}
//                     aria-label={label}
//                     className="p-3 text-emerald-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                   >
//                     <Icon className="w-5 h-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Image */}
//           <div
//             className={`relative transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//           >
//             <div className="relative w-full max-w-lg mx-auto">
//               {/* Decorative Elements */}
//               <div className="absolute -top-8 -right-8 w-24 h-24 border-4 border-emerald-400 rounded-full animate-spin-slow"></div>
//               <div className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-teal-300 rounded-full animate-pulse"></div>

//               {/* Main Image */}
//               <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-emerald-100 to-teal-100">
//                 <Image
//                   src="/images/hero.png"
//                   alt="Fahad Joyia - Creative Developer"
//                   width={500}
//                   height={500}
//                   className="object-cover w-full h-full"
//                   priority
//                 />
//               </div>

//               {/* Floating Badge */}
//               <div className="absolute top-8 -right-12 bg-white rounded-2xl shadow-xl p-4 animate-float">
//                 <div className="flex items-center gap-3">
//                   <div className="flex -space-x-2">
//                     {[...Array(3)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-emerald-200 to-teal-200"
//                       />
//                     ))}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-emerald-800 text-lg">4.9/5</h4>
//                     <p className="text-xs text-teal-600">Client Rating</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
//       `}</style>
//     </section>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import Image from "next/image"
import Counter from "./SubComponents/Counter/Counter"

const decorativeDots = Array(6).fill("")

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const text = "Fahad Joyia"
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

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section className=" flex items-center pt-16 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      <div className="w-full max-w-[1300px] lg:my-0 my-5 mx-auto px-4">
        <style jsx>{`
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
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
          .scale-in {
            transform: scale(0);
            animation: scaleIn 0.3s ease-out forwards;
          }
          @keyframes scaleIn {
            to { transform: scale(1); }
          }
          .btn-hover {
            transition: transform 0.2s ease-out;
          }
          .btn-hover:hover {
            transform: scale(1.05);
          }
          .btn-hover:active {
            transform: scale(0.95);
          }
          .icon-hover {
            transition: transform 0.2s ease-out, color 0.2s;
          }
          .icon-hover:hover {
            transform: translateY(-5px);
          }
          .icon-hover:active {
            transform: scale(0.95);
          }
          .image-hover {
            transition: transform 0.3s ease-out;
          }
          .image-hover:hover {
            transform: scale(1.05);
          }
          .rotate {
            animation: rotate 8s linear forwards;
          }
          @keyframes rotate {
            to { transform: rotate(360deg); }
          }
          .pulse {
            animation: pulse 3s ease-in-out forwards;
          }
          @keyframes pulse {
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .float {
            animation: float 4s ease-in-out forwards;
          }
          @keyframes float {
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .arrow {
            transition: transform 0.2s ease-out;
          }
          .btn-hover:hover .arrow {
            transform: translateX(4px);
          }
          .cursor {
            animation: blink 0.8s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
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

        <div className="grid lg:grid-cols-2 mt-5 lg:mt-10 pb-6 gap-8 lg:ml-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-3">
              {decorativeDots.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-emerald-500 scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl text-emerald-800 slide-up" style={{ animationDelay: "0.2s" }}>
                Hi! I Am
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-900 fade-in">
                {displayedText}
                <span className={showCursor ? "cursor" : ""}>|</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 slide-right" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-[2px] bg-emerald-500" />
              <span className="text-sm sm:text-base text-teal-700">Creative Developer</span>
            </div>

            <div
              className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-emerald-200 fade-in"
              style={{ animationDelay: "0.5s" }}
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

            <div
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <button className="group flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full btn-hover text-sm sm:text-base">
                Let&apos;s Talk
                <ArrowRight className="ml-2 mt-1 h-4 w-4 arrow" />
              </button>
              <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <a key={index} href="#" className="text-emerald-600 hover:text-emerald-800 icon-hover">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="relative w-full aspect-square max-w-[78vw] sm:max-w-md image-container mx-auto">
              <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 border-4 border-emerald-500 rounded-full rotate" />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 border-4 border-teal-300 rounded-full pulse" />

              <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl image-hover">
                <Image src={"/images/hero.png"} alt="Profile" width={500} height={500} className="object-cover" />
              </div>

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
