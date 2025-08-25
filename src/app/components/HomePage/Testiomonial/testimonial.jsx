// // 'use client'

// // import React, { useEffect, useRef, useState } from 'react'
// // import { ChevronLeft, ChevronRight } from 'lucide-react'

// // // Testimonials page with smooth auto-swiping card transitions
// // export default function TestimonialsPage() {
// //   const [activeIndex, setActiveIndex] = useState(0)
// //   const [isAnimating, setIsAnimating] = useState(false)
// //   const cardRef = useRef(null)
// //   const timeoutRef = useRef(null)

// //   // Testimonial data
// //   const testimonials = [
// //     {
// //       name: 'Sarah Johnson',
// //       role: 'CEO OF DESIGNHUB',
// //       avatar: '/placeholder.svg?height=80&width=80',
// //       messages: [
// //         { text: 'Absolutely love the design', time: '2:34 PM' },
// //         { text: 'Exactly what we needed', time: '2:35 PM' },
// //         { text: 'The team is very impressed', time: '2:36 PM' },
// //         { text: 'Will definitely work with you again', time: '2:38 PM' },
// //       ],
// //       productImage: '/placeholder.svg?height=400&width=300',
// //       productName: 'Brand Redesign',
// //     },
// //     {
// //       name: 'Michael Chen',
// //       role: 'FOUNDER OF TECHFLOW',
// //       avatar: '/placeholder.svg?height=80&width=80',
// //       messages: [
// //         { text: 'The app works flawlessly', time: '3:15 PM' },
// //         { text: 'User feedback has been great', time: '3:17 PM' },
// //         { text: 'Performance is better than expected', time: '3:20 PM' },
// //         { text: 'Worth every penny', time: '3:22 PM' },
// //       ],
// //       productImage: '/placeholder.svg?height=400&width=300',
// //       productName: 'Mobile Application',
// //     },
// //     {
// //       name: 'Emma Rodriguez',
// //       role: 'MARKETING DIRECTOR',
// //       avatar: '/placeholder.svg?height=80&width=80',
// //       messages: [
// //         { text: 'Our conversion rate increased by 40%', time: '1:05 PM' },
// //         { text: 'The landing page looks stunning', time: '1:08 PM' },
// //         { text: 'Very intuitive user experience', time: '1:10 PM' },
// //         { text: 'Exceeded our expectations', time: '1:12 PM' },
// //       ],
// //       productImage: '/placeholder.svg?height=400&width=300',
// //       productName: 'Campaign Launch',
// //     },
// //   ]

// //   // Auto-swiping logic
// //   useEffect(() => {
// //     if (isAnimating) return

// //     // Clear existing timeout
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current)
// //     }

// //     // Set timeout for 3-second pause, then trigger next card
// //     timeoutRef.current = setTimeout(() => {
// //       setIsAnimating(true)
// //       setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
// //     }, 3000)

// //     // Cleanup on unmount or index change
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current)
// //       }
// //     }
// //   }, [activeIndex, isAnimating])

// //   // Reset animation state after transition
// //   useEffect(() => {
// //     if (isAnimating) {
// //       const timer = setTimeout(() => {
// //         setIsAnimating(false)
// //       }, 500) // Match transition duration
// //       return () => clearTimeout(timer)
// //     }
// //   }, [isAnimating])

// //   // Handle next testimonial
// //   const handleNext = () => {
// //     if (isAnimating) return
// //     setIsAnimating(true)
// //     setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
// //   }

// //   // Handle previous testimonial
// //   const handlePrev = () => {
// //     if (isAnimating) return
// //     setIsAnimating(true)
// //     setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))
// //   }

// //   const currentTestimonial = testimonials[activeIndex]

// //   return (
// //     <div className="relative flex items-center py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
// //       {/* CSS for animations and responsive styling */}
// //       <style jsx>{`
// //         /* Card transition animation */
// //         .testimonial-card {
// //           opacity: 0;
// //           transform: translateX(100px) translateY(50px) scale(0.95);
// //           transition: opacity 0.5s ease-out, transform 0.5s ease-out;
// //         }

// //         .testimonial-card.active {
// //           opacity: 1;
// //           transform: translateX(0) translateY(0) scale(1);
// //         }

// //         .testimonial-card.exiting {
// //           opacity: 0;
// //           transform: translateX(-100px) translateY(-50px) scale(0.95);
// //           transition: opacity 0.5s ease-out, transform 0.5s ease-out;
// //         }

// //         /* Message animation */
// //         .message {
// //           opacity: 0;
// //           transform: translateY(20px);
// //           transition: opacity 0.4s ease-out, transform 0.4s ease-out;
// //         }

// //         .testimonial-card.active .message {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }

// //         /* Ensure section height is content-driven */
// //         div {
// //           min-height: fit-content;
// //         }

// //         /* Responsive adjustments */
// //         @media (max-width: 640px) {
// //           .testimonial-card {
// //             transform: translateX(50px) translateY(30px) scale(0.95);
// //           }
// //           .testimonial-card.exiting {
// //             transform: translateX(-50px) translateY(-30px) scale(0.95);
// //           }
// //         }
// //       `}</style>

// //       {/* Container with max-width for large screens */}
// //       <div className="w-full max-w-[1300px] mx-auto">
// //         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
// //           {/* Left side - Heading */}
// //           <div className="w-full lg:w-1/2">
// //             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-teal-900">
// //               what our <br />
// //               clients are <br />
// //               saying... <span className="text-emerald-500">for real</span>
// //             </h2>
// //             <p className="mt-4 sm:mt-6 text-teal-700 text-base sm:text-lg max-w-md">
// //               Authentic feedback from our valued customers who have experienced our products and services firsthand.
// //             </p>
// //           </div>

// //           {/* Right side - Testimonial Card */}
// //           <div className="w-full lg:w-1/2 relative">
// //             <div
// //               ref={cardRef}
// //               className={`bg-white rounded-3xl p-6 overflow-hidden shadow-lg testimonial-card ${
// //                 isAnimating ? 'exiting' : 'active'
// //               }`}
// //             >
// //               <div className="flex flex-col md:flex-row gap-6">
// //                 {/* User info and messages */}
// //                 <div className="flex-1">
// //                   <div className="flex items-center gap-4 mb-6">
// //                     <div className="h-16 w-16 rounded-full overflow-hidden">
// //                       <img
// //                         src={currentTestimonial.avatar || '/placeholder.svg'}
// //                         alt={currentTestimonial.name}
// //                         className="h-full w-full object-cover"
// //                       />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-bold text-lg sm:text-xl text-teal-900">
// //                         {currentTestimonial.name}
// //                       </h3>
// //                       <p className="text-sm text-teal-700">{currentTestimonial.role}</p>
// //                     </div>
// //                   </div>

// //                   {/* Messages */}
// //                   <div className="space-y-3">
// //                     {currentTestimonial.messages.map((message, index) => (
// //                       <div
// //                         key={index}
// //                         className="bg-emerald-100 rounded-2xl rounded-bl-none px-4 py-3 text-teal-900 inline-block message"
// //                         style={{ transitionDelay: `${index * 100}ms` }}
// //                       >
// //                         <div className="flex justify-between gap-4 sm:gap-8">
// //                           <p className="text-sm sm:text-base">{message.text}</p>
// //                           <span className="text-xs text-teal-600 self-end">{message.time}</span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Product image */}
// //                 <div className="md:w-1/3 relative">
// //                   <div className="rounded-xl overflow-hidden h-full">
// //                     <img
// //                       src={currentTestimonial.productImage || '/placeholder.svg'}
// //                       alt={currentTestimonial.productName}
// //                       className="h-full w-full object-cover"
// //                     />
// //                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
// //                       <p className="text-white font-medium text-sm sm:text-base">
// //                         {currentTestimonial.productName}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Navigation buttons */}
// //         <div className="flex justify-end gap-4 mt-6 sm:mt-8">
// //           <button
// //             onClick={handlePrev}
// //             className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-20 transition-colors"
// //             aria-label="Previous testimonial"
// //           >
// //             <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
// //           </button>
// //           <button
// //             onClick={handleNext}
// //             className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-20 transition-colors"
// //             aria-label="Next testimonial"
// //           >
// //             <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
// //           </button>
// //         </div>

// //         {/* Pagination indicators */}
// //         <div className="flex justify-center gap-2 mt-6 sm:mt-8">
// //           {testimonials.map((_, index) => (
// //             <div
// //               key={index}
// //               className={`h-2 rounded-full transition-all ${
// //                 index === activeIndex ? 'w-6 sm:w-8 bg-emerald-500' : 'w-2 bg-teal-300'
// //               }`}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

















// "use client"

// import { useEffect, useRef, useState } from "react"
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
// import Image from "next/image"

// export default function TestimonialsSection() {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)
//   const timeoutRef = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           observer.unobserve(entry.target)
//         }
//       },
//       { threshold: 0.2 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => observer.disconnect()
//   }, [])

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "CEO, TechStart Inc.",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//       testimonial:
//         "Fahad delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise exceeded our expectations. The project was completed on time and within budget.",
//       project: "E-commerce Platform",
//       company: "TechStart Inc.",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Founder, InnovateLab",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//       testimonial:
//         "Working with Fahad was a game-changer for our startup. He not only built our mobile app but also provided valuable insights on user experience. Highly recommended!",
//       project: "Mobile Application",
//       company: "InnovateLab",
//     },
//     {
//       id: 3,
//       name: "Emma Rodriguez",
//       role: "Marketing Director, GrowthCo",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//       testimonial:
//         "The website Fahad created for us increased our conversion rate by 40%. His understanding of both design and development is remarkable. Professional and reliable.",
//       project: "Corporate Website",
//       company: "GrowthCo",
//     },
//     {
//       id: 4,
//       name: "David Park",
//       role: "Product Manager, FinTech Solutions",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//       testimonial:
//         "Fahad's expertise in fintech applications is outstanding. He delivered a secure, scalable solution that our users love. Communication was excellent throughout the project.",
//       project: "FinTech Dashboard",
//       company: "FinTech Solutions",
//     },
//   ]

//   // Auto-slide functionality
//   useEffect(() => {
//     if (isAnimating) return

//     timeoutRef.current = setTimeout(() => {
//       handleNext()
//     }, 5000)

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [activeIndex, isAnimating])

//   const handleNext = () => {
//     if (isAnimating) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev + 1) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const handlePrev = () => {
//     if (isAnimating) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const goToSlide = (index) => {
//     if (isAnimating || index === activeIndex) return
//     setIsAnimating(true)
//     setActiveIndex(index)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div
//           className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Quote className="w-4 h-4" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What Clients
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Don't just take my word for it. Here's what my clients have to say about working with me and the results
//             we've achieved together.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </div>

//         {/* Testimonials Slider */}
//         <div className="relative max-w-4xl mx-auto">
//           <div className="overflow-hidden rounded-3xl">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
//                   <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative">
//                     {/* Quote Icon */}
//                     <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                       <Quote className="w-4 h-4 text-white" />
//                     </div>

//                     <div className="grid lg:grid-cols-3 gap-8 items-center">
//                       {/* Client Info */}
//                       <div className="lg:col-span-1 text-center lg:text-left">
//                         <div className="relative inline-block mb-4">
//                           <Image
//                             src={testimonial.avatar || "/placeholder.svg"}
//                             alt={testimonial.name}
//                             width={100}
//                             height={100}
//                             className="rounded-full border-4 border-emerald-100"
//                           />
//                           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                             <Star className="w-4 h-4 text-white fill-current" />
//                           </div>
//                         </div>

//                         <h4 className="text-xl font-bold text-gray-800 mb-1">{testimonial.name}</h4>
//                         <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
//                         <p className="text-sm text-gray-500 mb-4">{testimonial.company}</p>

//                         {/* Rating */}
//                         <div className="flex justify-center lg:justify-start gap-1 mb-4">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                           ))}
//                         </div>

//                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
//                           {testimonial.project}
//                         </div>
//                       </div>

//                       {/* Testimonial Content */}
//                       <div className="lg:col-span-2">
//                         <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
//                           "{testimonial.testimonial}"
//                         </blockquote>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-center gap-4 mt-8">
//             <button
//               onClick={handlePrev}
//               className="p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//             <button
//               onClick={handleNext}
//               className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Pagination Dots */}
//           <div className="flex justify-center gap-2 mt-6">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === activeIndex
//                     ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-8"
//                     : "bg-gray-300 hover:bg-emerald-300"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }










"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)

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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "Fahad delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise exceeded our expectations. The project was completed on time and within budget.",
      project: "E-commerce Platform",
      company: "TechStart Inc.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, InnovateLab",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "Working with Fahad was a game-changer for our startup. He not only built our mobile app but also provided valuable insights on user experience. Highly recommended!",
      project: "Mobile Application",
      company: "InnovateLab",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Marketing Director, GrowthCo",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "The website Fahad created for us increased our conversion rate by 40%. His understanding of both design and development is remarkable. Professional and reliable.",
      project: "Corporate Website",
      company: "GrowthCo",
    },
    {
      id: 4,
      name: "David Park",
      role: "Product Manager, FinTech Solutions",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "Fahad's expertise in fintech applications is outstanding. He delivered a secure, scalable solution that our users love. Communication was excellent throughout the project.",
      project: "FinTech Dashboard",
      company: "FinTech Solutions",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    if (isAnimating) return

    timeoutRef.current = setTimeout(() => {
      handleNext()
    }, 5000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeIndex, isAnimating])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Testimonials
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            What Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what my clients have to say about working with me and the results
            we've achieved together.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      {/* Client Info */}
                      <div className="lg:col-span-1 text-center lg:text-left">
                        <div className="relative inline-block mb-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={100}
                            height={100}
                            className="rounded-full border-4 border-emerald-100"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-800 mb-1">{testimonial.name}</h4>
                        <p className="text-emerald-600 font-medium mb-2">{testimonial.role}</p>
                        <p className="text-sm text-gray-500 mb-4">{testimonial.company}</p>

                        {/* Rating */}
                        <div className="flex justify-center lg:justify-start gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                          {testimonial.project}
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="lg:col-span-2">
                        <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                          "{testimonial.testimonial}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-8"
                    : "bg-gray-300 hover:bg-emerald-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
