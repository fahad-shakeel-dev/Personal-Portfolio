// // 'use client'

// // import React, { useRef, useEffect } from 'react'

// // // Services section showcasing service cards
// // export default function ServicesSection() {
// //   const servicesRef = useRef(null)
// //   const headingRef = useRef(null)
// //   const cardsRef = useRef([])

// //   // Add Intersection Observer for animations
// //   useEffect(() => {
// //     const observerOptions = {
// //       root: null,
// //       rootMargin: '0px',
// //       threshold: 0.2,
// //     }

// //     // Animate heading
// //     const headingObserver = new IntersectionObserver(([entry]) => {
// //       if (entry.isIntersecting) {
// //         entry.target.classList.add('animate')
// //         headingObserver.unobserve(entry.target)
// //       }
// //     }, observerOptions)

// //     // Animate cards with stagger effect
// //     const cardObserver = new IntersectionObserver((entries) => {
// //       entries.forEach((entry, index) => {
// //         if (entry.isIntersecting) {
// //           setTimeout(() => {
// //             entry.target.classList.add('animate')
// //           }, index * 200) // Stagger animation by 200ms
// //           cardObserver.unobserve(entry.target)
// //         }
// //       })
// //     }, observerOptions)

// //     // Observe heading and cards
// //     if (headingRef.current) {
// //       headingObserver.observe(headingRef.current)
// //     }
// //     cardsRef.current.forEach((card) => {
// //       if (card) cardObserver.observe(card)
// //     })

// //     // Cleanup observers
// //     return () => {
// //       if (headingRef.current) {
// //         headingObserver.unobserve(headingRef.current)
// //       }
// //       cardsRef.current.forEach((card) => {
// //         if (card) cardObserver.unobserve(card)
// //       })
// //     }
// //   }, [])

// //   // Function to add elements to cardsRef
// //   const addToRefs = (el) => {
// //     if (el && !cardsRef.current.includes(el)) {
// //       cardsRef.current.push(el)
// //     }
// //   }

// //   return (
// //     <section
// //       ref={servicesRef}
// //       className="relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200"
// //     >
// //       {/* CSS for animations and responsive styling */}
// //       <style jsx>{`
// //         /* Animation for heading and cards */
// //         .animate-on-scroll {
// //           opacity: 0;
// //           transform: translateY(100px);
// //           transition: opacity 0.5s ease-out, transform 0.5s ease-out;
// //         }

// //         .animate-on-scroll.animate {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }

// //         /* Ensure section height is content-driven */
// //         section {
// //           min-height: fit-content;
// //         }

// //         /* Responsive adjustments */
// //         @media (max-width: 640px) {
// //           .animate-on-scroll {
// //             transform: translateY(50px); /* Smaller translate for small screens */
// //           }
// //         }
// //       `}</style>

// //       {/* Container with max-width for large screens */}
// //       <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
// //         {/* Heading Section */}
// //         <div className="relative">
// //           <span className="text-emerald-800 text-xs sm:text-sm tracking-widest uppercase mb-4 inline-block">
// //             SERVICES
// //           </span>
// //           <h2
// //             ref={headingRef}
// //             className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-teal-900 animate-on-scroll"
// //           >
// //             Streamline your project to enter the market and scale successfully
// //           </h2>
// //         </div>

// //         {/* Service Cards */}
// //         <div className="space-y-6">
// //           {/* Service Card 1 */}
// //           <div
// //             ref={addToRefs}
// //             className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
// //           >
// //             <div className="flex items-start gap-4">
// //               <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
// //                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-4 w-4 sm:h-5 sm:w-5 text-white"
// //                     viewBox="0 0 20 20"
// //                     fill="currentColor"
// //                   >
// //                     <path
// //                       fillRule="evenodd"
// //                       d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
// //                       clipRule="evenodd"
// //                     />
// //                   </svg>
// //                 </div>
// //               </div>
// //               <div>
// //                 <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Web Development</h3>
// //                 <p className="text-teal-700 text-sm sm:text-base">
// //                   Use our expertise in WordPress, Webflow, Shopify, Laravel, React
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Service Card 2 */}
// //           <div
// //             ref={addToRefs}
// //             className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
// //           >
// //             <div className="flex items-start gap-4">
// //               <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
// //                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-4 w-4 sm:h-5 sm:w-5 text-white"
// //                     viewBox="0 0 20 20"
// //                     fill="currentColor"
// //                   >
// //                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
// //                   </svg>
// //                 </div>
// //               </div>
// //               <div>
// //                 <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Staff Augmentation</h3>
// //                 <p className="text-teal-700 text-sm sm:text-base">
// //                   Hire dedicated contractors integrated into your team
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Service Card 3 */}
// //           <div
// //             ref={addToRefs}
// //             className="bg-white rounded-xl p-6 transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl shadow-lg animate-on-scroll"
// //           >
// //             <div className="flex items-start gap-4">
// //               <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
// //                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-4 w-4 sm:h-5 sm:w-5 text-white"
// //                     viewBox="0 0 20 20"
// //                     fill="currentColor"
// //                   >
// //                     <path
// //                       fillRule="evenodd"
// //                       d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
// //                       clipRule="evenodd"
// //                     />
// //                   </svg>
// //                 </div>
// //               </div>
// //               <div>
// //                 <h3 className="text-lg sm:text-xl font-bold mb-2 text-teal-900">Mobile Development</h3>
// //                 <p className="text-teal-700 text-sm sm:text-base">
// //                   Build your application for iOS, Android, or cross-platform
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }










// "use client"

// import { useRef, useEffect, useState } from "react"
// import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react"

// export default function ServicesSection() {
//   const [isVisible, setIsVisible] = useState(false)
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

//   const services = [
//     {
//       icon: Code,
//       title: "Web Development",
//       description:
//         "Building responsive, fast, and scalable web applications using modern technologies like React, Next.js, and Node.js.",
//       features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Palette,
//       title: "UI/UX Design",
//       description:
//         "Creating beautiful, intuitive user interfaces and experiences that engage users and drive conversions.",
//       features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: Smartphone,
//       title: "Mobile Development",
//       description:
//         "Developing cross-platform mobile applications that work seamlessly on both iOS and Android devices.",
//       features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
//       color: "from-emerald-500 to-teal-500",
//     },
//     {
//       icon: Globe,
//       title: "E-commerce Solutions",
//       description:
//         "Building complete e-commerce platforms with payment integration, inventory management, and analytics.",
//       features: ["Shopify Development", "WooCommerce", "Payment Gateway", "Inventory System"],
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       icon: Zap,
//       title: "Performance Optimization",
//       description:
//         "Optimizing websites and applications for speed, SEO, and better user experience across all devices.",
//       features: ["Speed Optimization", "SEO Enhancement", "Core Web Vitals", "Analytics Setup"],
//       color: "from-yellow-500 to-orange-500",
//     },
//     {
//       icon: Shield,
//       title: "Maintenance & Support",
//       description:
//         "Providing ongoing maintenance, updates, and technical support to keep your digital assets running smoothly.",
//       features: ["Regular Updates", "Security Monitoring", "Bug Fixes", "24/7 Support"],
//       color: "from-indigo-500 to-purple-500",
//     },
//   ]

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div
//           className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <Zap className="w-4 h-4" />
//             Services
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             What I Can Do
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
//               {" "}
//               For You
//             </span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             I offer comprehensive digital solutions to help your business grow and succeed in the digital world. From
//             concept to deployment, I've got you covered.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </div>

//         {/* Services Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 transform ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//               }`}
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               {/* Icon */}
//               <div
//                 className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
//               >
//                 <service.icon className="w-8 h-8 text-white" />
//               </div>

//               {/* Content */}
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
//                   {service.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed text-base">{service.description}</p>

//                 {/* Features */}
//                 <div className="space-y-2">
//                   {service.features.map((feature, featureIndex) => (
//                     <div key={featureIndex} className="flex items-center gap-2">
//                       <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
//                       <span className="text-sm text-gray-600">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Hover Effect */}
//               <div
//                 className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
//               ></div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div
//           className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
//             <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
//             <div className="relative z-10">
//               <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
//               <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
//                 Let's discuss your ideas and create something amazing together. I'm here to help bring your vision to
//                 life.
//               </p>
//               <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
//                 Get Started Today
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }












"use client"

import { useRef, useEffect, useState } from "react"
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react"

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Building responsive, fast, and scalable web applications using modern technologies like React, Next.js, and Node.js.",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive user interfaces and experiences that engage users and drive conversions.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Developing cross-platform mobile applications that work seamlessly on both iOS and Android devices.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "E-commerce Solutions",
      description:
        "Building complete e-commerce platforms with payment integration, inventory management, and analytics.",
      features: ["Shopify Development", "WooCommerce", "Payment Gateway", "Inventory System"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Optimizing websites and applications for speed, SEO, and better user experience across all devices.",
      features: ["Speed Optimization", "SEO Enhancement", "Core Web Vitals", "Analytics Setup"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description:
        "Providing ongoing maintenance, updates, and technical support to keep your digital assets running smoothly.",
      features: ["Regular Updates", "Security Monitoring", "Bug Fixes", "24/7 Support"],
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Services
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            What I Can Do
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}
              For You
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I offer comprehensive digital solutions to help your business grow and succeed in the digital world. From
            concept to deployment, I've got you covered.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-base">{service.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Let's discuss your ideas and create something amazing together. I'm here to help bring your vision to
                life.
              </p>
              <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
