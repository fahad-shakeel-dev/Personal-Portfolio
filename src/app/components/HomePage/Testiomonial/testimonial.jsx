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
//             Don't just take my word for it. Here&apos;s what my clients have to say about working with me and the results
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



// "use client"

// import { useEffect, useRef, useState, useMemo } from "react"
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
// import Image from "next/image"

// export default function TestimonialsSection() {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
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

//   useEffect(() => {
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
//             avatar: t.avatar || "/placeholder.svg?height=80&width=80",
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
//   }, [])

//   useEffect(() => {
//     if (isAnimating || testimonials.length === 0) return

//     timeoutRef.current = setTimeout(() => {
//       handleNext()
//     }, 5000)

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [activeIndex, isAnimating, testimonials])

//   const handleNext = () => {
//     if (isAnimating || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev + 1) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const handlePrev = () => {
//     if (isAnimating || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const goToSlide = (index) => {
//     if (isAnimating || index === activeIndex || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex(index)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const structuredData = useMemo(
//     () => ({
//       "@context": "https://schema.org",
//       "@type": "ItemList",
//       itemListElement: testimonials.map((testimonial, index) => ({
//         "@type": "Review",
//         author: {
//           "@type": "Person",
//           name: testimonial.name,
//         },
//         reviewBody: testimonial.testimonial,
//         reviewRating: {
//           "@type": "Rating",
//           ratingValue: testimonial.rating,
//           bestRating: "5",
//         },
//         itemReviewed: {
//           "@type": "CreativeWork",
//           name: testimonial.project,
//         },
//         publisher: {
//           "@type": "Organization",
//           name: testimonial.company,
//         },
//         position: index + 1,
//       })),
//     }),
//     [testimonials]
//   )

//   return (
//     <section
//       ref={sectionRef}
//       className="no-js py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
//       role="region"
//       aria-label="Testimonials Section"
//       data-testid="testimonials-section"
//       itemScope
//       itemType="https://schema.org/ItemList"
//     >
//       <style jsx>{`
//         .no-js .transform {
//           opacity: 1 !important;
//           transform: none !important;
//         }
//         button:focus {
//           outline: 2px solid #0d9488;
//           outline-offset: 2px;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .transform {
//             transition: none !important;
//             transform: none !important;
//             opacity: 1 !important;
//           }
//         }
//       `}</style>

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />

//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Quote className="w-4 h-4" aria-hidden="true" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What Clients
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me and the results
//             we&apos;ve achieved together.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </header>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Testimonials Slider */}
//         {!loading && !error && testimonials.length > 0 && (
//           <div className="relative max-w-4xl mx-auto">
//             <div className="overflow-hidden rounded-3xl">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div
//                     key={testimonial.id}
//                     className={`w-full flex-shrink-0 px-4 transform transition-all duration-1000 will-change-transform,opacity ${
//                       isVisible && index === activeIndex ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
//                     }`}
//                     style={{ transitionDelay: `${index === activeIndex ? 300 : 0}ms` }}
//                     itemScope
//                     itemType="https://schema.org/Review"
//                   >
//                     <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative">
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
//                               loading="lazy"
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
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div
//               className={`flex justify-center gap-4 mt-8 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//             >
//               <button
//                 onClick={handlePrev}
//                 className="p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//                 aria-label="Previous testimonial"
//                 disabled={testimonials.length <= 1}
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//                 aria-label="Next testimonial"
//                 disabled={testimonials.length <= 1}
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Pagination Dots */}
//             <div
//               className={`flex justify-center gap-2 mt-6 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//             >
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === activeIndex
//                       ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-8"
//                       : "bg-gray-300 hover:bg-emerald-300"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                   disabled={testimonials.length <= 1}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }







// "use client"

// import { useEffect, useRef, useState, useMemo } from "react"
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
// import Image from "next/image"

// export default function TestimonialsSection() {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const sectionRef = useRef(null)
//   const sliderRef = useRef(null)
//   const timeoutRef = useRef(null)
//   const touchStartX = useRef(null)
//   const touchEndX = useRef(null)

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

//   useEffect(() => {
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
//             avatar: t.avatar || "/placeholder.svg?height=80&width=80",
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
//   }, [])

//   useEffect(() => {
//     if (isAnimating || testimonials.length === 0) return

//     timeoutRef.current = setTimeout(() => {
//       handleNext()
//     }, 5000)

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [activeIndex, isAnimating, testimonials])

//   const handleNext = () => {
//     if (isAnimating || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev + 1) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const handlePrev = () => {
//     if (isAnimating || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const goToSlide = (index) => {
//     if (isAnimating || index === activeIndex || testimonials.length === 0) return
//     setIsAnimating(true)
//     setActiveIndex(index)
//     setTimeout(() => setIsAnimating(false), 500)
//   }

//   const handleTouchStart = (e) => {
//     if (isAnimating) return
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchMove = (e) => {
//     if (isAnimating) return
//     touchEndX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = () => {
//     if (isAnimating || touchStartX.current === null || touchEndX.current === null) return

//     const deltaX = touchStartX.current - touchEndX.current
//     const swipeThreshold = 50

//     if (deltaX > swipeThreshold) {
//       handleNext()
//     } else if (deltaX < -swipeThreshold) {
//       handlePrev()
//     }

//     touchStartX.current = null
//     touchEndX.current = null
//   }

//   const structuredData = useMemo(
//     () => ({
//       "@context": "https://schema.org",
//       "@type": "ItemList",
//       itemListElement: testimonials.map((testimonial, index) => ({
//         "@type": "Review",
//         author: {
//           "@type": "Person",
//           name: testimonial.name,
//         },
//         reviewBody: testimonial.testimonial,
//         reviewRating: {
//           "@type": "Rating",
//           ratingValue: testimonial.rating,
//           bestRating: "5",
//         },
//         itemReviewed: {
//           "@type": "CreativeWork",
//           name: testimonial.project,
//         },
//         publisher: {
//           "@type": "Organization",
//           name: testimonial.company,
//         },
//         position: index + 1,
//       })),
//     }),
//     [testimonials]
//   )

//   return (
//     <section
//       ref={sectionRef}
//       className="no-js py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
//       role="region"
//       aria-label="Testimonials Section"
//       data-testid="testimonials-section"
//       itemScope
//       itemType="https://schema.org/ItemList"
//     >
//       <style jsx>{`
//         .no-js .transform {
//           opacity: 1 !important;
//           transform: none !important;
//         }
//         button:focus {
//           outline: 2px solid #0d9488;
//           outline-offset: 2px;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .transform {
//             transition: none !important;
//             transform: none !important;
//             opacity: 1 !important;
//           }
//         }
//         .slider-container {
//           scroll-behavior: smooth;
//           overscroll-behavior-x: contain;
//           scroll-snap-type: x mandatory;
//         }
//         .slider-container > div > div {
//           scroll-snap-align: center;
//         }
//       `}</style>

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />

//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Quote className="w-4 h-4" aria-hidden="true" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What Clients
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me and the results
//             we&apos;ve achieved together.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </header>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Testimonials Slider */}
//         {!loading && !error && testimonials.length > 0 && (
//           <div className="relative max-w-4xl mx-auto">
//             <div
//               ref={sliderRef}
//               className="slider-container overflow-hidden rounded-3xl"
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//             >
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div
//                     key={testimonial.id}
//                     className={`w-full flex-shrink-0 px-4 transform transition-all duration-1000 will-change-transform,opacity ${
//                       isVisible && index === activeIndex ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
//                     }`}
//                     style={{ transitionDelay: `${index === activeIndex ? 300 : 0}ms` }}
//                     itemScope
//                     itemType="https://schema.org/Review"
//                   >
//                     <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative">
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
//                               priority={index === 0}
//                               loading={index > 0 ? "lazy" : undefined}
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
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div
//               className={`flex justify-center gap-4 mt-8 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//             >
//               <button
//                 onClick={handlePrev}
//                 className="p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//                 aria-label="Previous testimonial"
//                 disabled={testimonials.length <= 1}
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//                 aria-label="Next testimonial"
//                 disabled={testimonials.length <= 1}
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Pagination Dots */}
//             <div
//               className={`flex justify-center gap-2 mt-6 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//             >
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === activeIndex
//                       ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-8"
//                       : "bg-gray-300 hover:bg-emerald-300"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                   disabled={testimonials.length <= 1}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }






// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Star, Quote } from "lucide-react"
// import Image from "next/image"

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

// export default function TestimonialsSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const sectionRef = useRef(null)

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

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         setLoading(true)
//         // Simulate API call with mock data
//         const mockTestimonials = [
//           {
//             id: 1,
//             name: "Sarah Johnson",
//             role: "Marketing Director",
//             avatar: "/placeholder.svg?height=100&width=100",
//             rating: 5,
//             testimonial: "Working with Fahad was an absolute pleasure. He delivered our web application ahead of schedule and exceeded our expectations. His attention to detail and technical expertise are remarkable.",
//             project: "E-commerce Platform",
//             company: "TechCorp Inc.",
//           },
//           {
//             id: 2,
//             name: "Michael Chen",
//             role: "Startup Founder",
//             avatar: "/placeholder.svg?height=100&width=100",
//             rating: 5,
//             testimonial: "Fahad transformed our vision into a beautiful, functional reality. His communication throughout the project was exceptional, and he provided valuable insights that improved the final product.",
//             project: "SaaS Application",
//             company: "Nexus Startups",
//           },
//           {
//             id: 3,
//             name: "Emily Rodriguez",
//             role: "Creative Director",
//             avatar: "/placeholder.svg?height=100&width=100",
//             rating: 4,
//             testimonial: "The website Fahad created for our agency has received countless compliments. It's not only visually stunning but also performs flawlessly across all devices.",
//             project: "Agency Website",
//             company: "Creative Minds Agency",
//           },
//           {
//             id: 4,
//             name: "David Wilson",
//             role: "Product Manager",
//             avatar: "/placeholder.svg?height=100&width=100",
//             rating: 5,
//             testimonial: "Fahad's technical skills are matched only by his professionalism. He was responsive to feedback and delivered a product that perfectly met our requirements.",
//             project: "Mobile App Dashboard",
//             company: "ProductVision",
//           }
//         ]
        
//         setTestimonials(mockTestimonials)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTestimonials()
//   }, [])

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
//       className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
//       role="region"
//       aria-label="Testimonials Section"
//       itemScope
//       itemType="https://schema.org/ItemList"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Quote className="w-4 h-4" aria-hidden="true" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What Clients
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me and the results
//             we&apos;ve achieved together.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </header>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Testimonials Slider */}
//         {!loading && !error && testimonials.length > 0 && (
//           <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
//             <Swiper
//               modules={[Navigation, Pagination, A11y, Autoplay]}
//               spaceBetween={30}
//               slidesPerView={1}
//               navigation={{
//                 nextEl: '.testimonial-swiper-button-next',
//                 prevEl: '.testimonial-swiper-button-prev',
//               }}
//               pagination={{ 
//                 clickable: true,
//                 el: '.testimonial-pagination',
//                 bulletClass: 'testimonial-bullet',
//                 bulletActiveClass: 'testimonial-bullet-active'
//               }}
//               autoplay={{
//                 delay: 5000,
//                 disableOnInteraction: false,
//               }}
//               loop={true}
//               speed={800}
//               grabCursor={true}
//               className="testimonial-swiper"
//             >
//               {testimonials.map((testimonial) => (
//                 <SwiperSlide key={testimonial.id}>
//                   <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative mx-auto max-w-4xl">
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
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 className="testimonial-swiper-button-prev p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//                 aria-label="Previous testimonial"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button
//                 className="testimonial-swiper-button-next p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//                 aria-label="Next testimonial"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>

            
//             <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
//           </div>
//         )}
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
        
//         /* Custom navigation button styles */
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









// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Star, Quote } from "lucide-react"
// import Image from "next/image"

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

// export default function TestimonialsSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const sectionRef = useRef(null)

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

//   useEffect(() => {
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
//   }, [])

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
//       className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
//       role="region"
//       aria-label="Testimonials Section"
//       itemScope
//       itemType="https://schema.org/ItemList"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Quote className="w-4 h-4" aria-hidden="true" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What Clients
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Say</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me and the results
//             we&apos;ve achieved together.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </header>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading testimonials...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Testimonials Slider */}
//         {!loading && !error && testimonials.length > 0 && (
//           <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
//             <Swiper
//               modules={[Navigation, Pagination, A11y, Autoplay]}
//               spaceBetween={30}
//               slidesPerView={1}
//               navigation={{
//                 nextEl: '.testimonial-swiper-button-next',
//                 prevEl: '.testimonial-swiper-button-prev',
//               }}
//               pagination={{ 
//                 clickable: true,
//                 el: '.testimonial-pagination',
//                 bulletClass: 'testimonial-bullet',
//                 bulletActiveClass: 'testimonial-bullet-active'
//               }}
//               autoplay={{
//                 delay: 5000,
//                 disableOnInteraction: false,
//               }}
//               loop={true}
//               speed={800}
//               grabCursor={true}
//               className="testimonial-swiper"
//             >
//               {testimonials.map((testimonial) => (
//                 <SwiperSlide key={testimonial.id}>
//                   <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative mx-auto max-w-4xl">
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
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 className="testimonial-swiper-button-prev p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100"
//                 aria-label="Previous testimonial"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button
//                 className="testimonial-swiper-button-next p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//                 aria-label="Next testimonial"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>

//             <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
//           </div>
//         )}
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
        
//         /* Custom navigation button styles */
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