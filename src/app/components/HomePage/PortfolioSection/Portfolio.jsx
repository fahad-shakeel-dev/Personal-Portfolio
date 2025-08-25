// // 'use client'

// // import React, { useRef, useEffect } from 'react'

// // // Portfolio section showcasing project cards
// // export default function PortfolioSection() {
// //   const portfolioRef = useRef(null)
// //   const portfolioItemsRef = useRef([])

// //   // Add Intersection Observer for animations
// //   useEffect(() => {
// //     const observerOptions = {
// //       root: null,
// //       rootMargin: '0px',
// //       threshold: 0.2,
// //     }

// //     // Animate portfolio items with stagger effect
// //     const itemObserver = new IntersectionObserver((entries) => {
// //       entries.forEach((entry, index) => {
// //         if (entry.isIntersecting) {
// //           setTimeout(() => {
// //             entry.target.classList.add('animate')
// //           }, index * 200) // Stagger animation by 200ms
// //           itemObserver.unobserve(entry.target)
// //         }
// //       })
// //     }, observerOptions)

// //     // Observe portfolio items
// //     portfolioItemsRef.current.forEach((item) => {
// //       if (item) itemObserver.observe(item)
// //     })

// //     // Cleanup observer
// //     return () => {
// //       portfolioItemsRef.current.forEach((item) => {
// //         if (item) itemObserver.unobserve(item)
// //       })
// //     }
// //   }, [])

// //   // Function to add elements to portfolioItemsRef
// //   const addToRefs = (el) => {
// //     if (el && !portfolioItemsRef.current.includes(el)) {
// //       portfolioItemsRef.current.push(el)
// //     }
// //   }

// //   return (
// //     <section
// //       ref={portfolioRef}
// //       className="relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50"
// //     >
// //       {/* CSS for animations and responsive styling */}
// //       <style jsx>{`
// //         /* Animation for portfolio items */
// //         .portfolio-item {
// //           opacity: 0;
// //           transform: translateY(100px);
// //           transition: opacity 0.8s ease-out, transform 0.8s ease-out;
// //         }

// //         .portfolio-item.animate {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }

// //         /* Ensure section height is content-driven */
// //         section {
// //           min-height: fit-content;
// //         }

// //         /* Responsive adjustments */
// //         @media (max-width: 640px) {
// //           .portfolio-item {
// //             transform: translateY(50px); /* Smaller translate for small screens */
// //           }
// //         }
// //       `}</style>

// //       {/* Container with max-width for large screens */}
// //       <div className="w-full max-w-[1300px] mx-auto">
// //         {/* Heading section */}
// //         <div className="mb-12 sm:mb-16">
// //           <span className="text-emerald-800 text-xs sm:text-sm tracking-widest uppercase mb-4 inline-block">
// //             PORTFOLIO
// //           </span>
// //           <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-teal-900">
// //             from designs to
// //             <span className="relative">
// //               pixel perfect
// //               <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-emerald-500 rounded-full"></span>
// //             </span>
// //             web
// //           </h2>
// //         </div>

// //         {/* Portfolio grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
// //           {/* Portfolio Item 1 */}
// //           <div className="portfolio-item group" ref={addToRefs}>
// //             <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
// //               <div className="absolute inset-0 opacity-10">
// //                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
// //                 <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
// //                 <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
// //               </div>
// //               <div className="relative h-full bg-white rounded-lg overflow-hidden">
// //                 <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
// //                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
// //                   <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
// //                 </div>
// //                 <div className="p-4">
// //                   <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="mt-4">
// //               <h3 className="text-lg sm:text-xl font-medium text-teal-900">
// //                 Building the future of HR software solutions
// //               </h3>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   WORDPRESS
// //                 </span>
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   JAVASCRIPT
// //                 </span>
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   CSS3
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Portfolio Item 2 */}
// //           <div className="portfolio-item group" ref={addToRefs}>
// //             <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
// //               <div className="absolute inset-0 opacity-10">
// //                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
// //                 <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
// //                 <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
// //               </div>
// //               <div className="relative h-full bg-white rounded-lg overflow-hidden">
// //                 <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
// //                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
// //                   <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
// //                 </div>
// //                 <div className="p-4">
// //                   <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="mt-4">
// //               <h3 className="text-lg sm:text-xl font-medium text-teal-900">
// //                 Brother Film Co: where creativity meets code
// //               </h3>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   WORDPRESS
// //                 </span>
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   PHP
// //                 </span>
// //                 <span className 쉽게="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   GSAP
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Portfolio Item 3 */}
// //           <div className="portfolio-item group" ref={addToRefs}>
// //             <div className="relative overflow-hidden rounded-xl bg-white p-4 h-[300px] transition-all duration-500 hover:bg-emerald-50 shadow-lg">
// //               <div className="absolute inset-0 opacity-10">
// //                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/30 rounded-xl"></div>
// //                 <div className="absolute top-10 left-10 w-20 h-20 border-[1px] border-emerald-500/30 rounded-full"></div>
// //                 <div className="absolute bottom-10 right-10 w-40 h-40 border-[1px] border-emerald-500/30 rounded-full"></div>
// //               </div>
// //               <div className="relative h-full bg-white rounded-lg overflow-hidden">
// //                 <div className="h-8 bg-emerald-100 flex items-center px-2 gap-1">
// //                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
// //                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
// //                   <div className="ml-4 h-4 w-32 bg-emerald-200 rounded-full"></div>
// //                 </div>
// //                 <div className="p-4">
// //                   <div className="w-full h-[200px] bg-emerald-100 rounded-lg animate-pulse"></div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="mt-4">
// //               <h3 className="text-lg sm:text-xl font-medium text-teal-900">
// //                 Innovating the world of digital events
// //               </h3>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   WEBFLOW
// //                 </span>
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   JAVASCRIPT
// //                 </span>
// //                 <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full text-teal-800">
// //                   REACT
// //                 </span>
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
// import { ExternalLink, Github, ArrowRight } from "lucide-react"
// import Image from "next/image"

// export default function PortfolioSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [activeFilter, setActiveFilter] = useState("All")
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

//   const filters = ["All", "Web Apps", "E-commerce", "Mobile Apps", "UI/UX"]

//   const projects = [
//     {
//       id: 1,
//       title: "E-commerce Platform",
//       category: "E-commerce",
//       description: "A modern e-commerce platform with advanced features and seamless user experience.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: true,
//     },
//     {
//       id: 2,
//       title: "Task Management App",
//       category: "Web Apps",
//       description: "Collaborative task management application with real-time updates and team features.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: false,
//     },
//     {
//       id: 3,
//       title: "Mobile Banking App",
//       category: "Mobile Apps",
//       description: "Secure mobile banking application with biometric authentication and real-time transactions.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["React Native", "Firebase", "Node.js", "Express"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: true,
//     },
//     {
//       id: 4,
//       title: "Restaurant Website",
//       category: "Web Apps",
//       description: "Beautiful restaurant website with online ordering and reservation system.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: false,
//     },
//     {
//       id: 5,
//       title: "Fitness App Design",
//       category: "UI/UX",
//       description: "Complete UI/UX design for a fitness tracking mobile application.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: false,
//     },
//     {
//       id: 6,
//       title: "SaaS Dashboard",
//       category: "Web Apps",
//       description: "Comprehensive SaaS dashboard with analytics, user management, and reporting features.",
//       image: "/placeholder.svg?height=400&width=600",
//       technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: true,
//     },
//   ]

//   const filteredProjects =
//     activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div
//           className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <ArrowRight className="w-4 h-4" />
//             Portfolio
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             My Recent
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Work</span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Here are some of my recent projects that showcase my skills and expertise in web development, mobile apps,
//             and UI/UX design.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </div>

//         {/* Filter Buttons */}
//         <div
//           className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
//                 activeFilter === filter
//                   ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
//                   : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project, index) => (
//             <div
//               key={project.id}
//               className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//               } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               {/* Project Image */}
//               <div className="relative h-64 overflow-hidden">
//                 <Image
//                   src={project.image || "/placeholder.svg"}
//                   alt={project.title}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                 {/* Overlay Links */}
//                 <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <a
//                     href={project.liveUrl}
//                     className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                     aria-label="View Live Project"
//                   >
//                     <ExternalLink className="w-5 h-5" />
//                   </a>
//                   <a
//                     href={project.githubUrl}
//                     className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                     aria-label="View Source Code"
//                   >
//                     <Github className="w-5 h-5" />
//                   </a>
//                 </div>

//                 {/* Featured Badge */}
//                 {project.featured && (
//                   <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-medium rounded-full">
//                     Featured
//                   </div>
//                 )}
//               </div>

//               {/* Project Content */}
//               <div className="p-6 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
//                     {project.category}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
//                   {project.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed text-sm">{project.description}</p>

//                 {/* Technologies */}
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech, techIndex) => (
//                     <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Projects Button */}
//         <div
//           className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
//             <span>View All Projects</span>
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }










"use client"

import { useRef, useEffect, useState } from "react"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
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

  const filters = ["All", "Web Apps", "E-commerce", "Mobile Apps", "UI/UX"]

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "E-commerce",
      description: "A modern e-commerce platform with advanced features and seamless user experience.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      category: "Web Apps",
      description: "Collaborative task management application with real-time updates and team features.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Mobile Apps",
      description: "Secure mobile banking application with biometric authentication and real-time transactions.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Firebase", "Node.js", "Express"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 4,
      title: "Restaurant Website",
      category: "Web Apps",
      description: "Beautiful restaurant website with online ordering and reservation system.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Fitness App Design",
      category: "UI/UX",
      description: "Complete UI/UX design for a fitness tracking mobile application.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "SaaS Dashboard",
      category: "Web Apps",
      description: "Comprehensive SaaS dashboard with analytics, user management, and reporting features.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" />
            Portfolio
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            My Recent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Work</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills and expertise in web development, mobile apps,
            and UI/UX design.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
                    aria-label="View Live Project"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
                    aria-label="View Source Code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
