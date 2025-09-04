// "use client"

// import { useRef, useEffect, useState, useMemo } from "react"
// import { ExternalLink, Github, ArrowRight } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// export default function PortfolioSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [activeFilter, setActiveFilter] = useState("All")
//   const [projects, setProjects] = useState([])
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
//       { threshold: 0.2, rootMargin: "100px" },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => observer.disconnect()
//   }, [])

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("/api/projects", { next: { revalidate: 60 } })
//         if (!res.ok) throw new Error("Failed to fetch projects")
//         const { success, data } = await res.json()
//         if (!success) throw new Error("API error")
//         setProjects(
//           data.map((project) => ({
//             id: project.id,
//             title: project.title,
//             category: project.category,
//             description: project.description,
//             image: project.image || "/placeholder.svg",
//             features: project.features || project.technologies || [],
//             liveUrl: project.liveUrl || "#",
//             githubUrl: project.githubUrl || "#",
//             featured: project.status === "completed",
//           }))
//         )
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProjects()
//   }, [])

//   const filters = ["All", "Web Apps", "E-commerce", "Mobile Apps", "UI/UX"]

//   const filteredProjects = useMemo(() => {
//     return activeFilter === "All"
//       ? projects
//       : projects.filter((project) => project.category === activeFilter)
//   }, [projects, activeFilter])

//   const displayedProjects = filteredProjects.slice(0, typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 6)

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     itemListElement: displayedProjects.map((project, index) => ({
//       "@type": "CreativeWork",
//       name: project.title,
//       description: project.description,
//       url: `/projects/${project.id}`,
//       image: project.image,
//       position: index + 1,
//     })),
//   }

//   return (
//     <section
//       ref={sectionRef}
//       className="no-js py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative min-h-fit overflow-visible"
//       role="region"
//       aria-label="Portfolio Section"
//       data-testid="portfolio-section"
//       itemscope
//       itemtype="https://schema.org/ItemList"
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
//       `}</style>

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />

//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-visible">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 will-change-transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
//         </header>

//         {/* Filter Buttons */}
//         <div
//           className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 will-change-transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//         >
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               type="button"
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
//                 activeFilter === filter
//                   ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
//                   : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md"
//               }`}
//               aria-label={`Filter by ${filter}`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading projects...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Projects Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
//             {displayedProjects.map((project, index) => (
//               <Link
//                 key={project.id}
//                 href={`/projects/${project.id}`}
//                 className="block"
//                 data-testid={`project-card-${project.id}`}
//               >
//                 <article
//                   className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform w-full ${
//                     isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//                   } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
//                   style={{ transitionDelay: `${index * 100}ms` }}
//                   itemscope
//                   itemtype="https://schema.org/CreativeWork"
//                 >
//                   {/* Project Image */}
//                   <div className="relative h-64 overflow-hidden">
//                     <Image
//                       src={project.image}
//                       alt={project.title}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-700"
//                       priority={index < 3}
//                       loading={index >= 3 ? "lazy" : undefined}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     {/* Overlay Links */}
//                     <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <a
//                         href={project.liveUrl}
//                         className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                         aria-label={`View Live Project: ${project.title}`}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <ExternalLink className="w-5 h-5" />
//                       </a>
//                       <a
//                         href={project.githubUrl}
//                         className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                         aria-label={`View Source Code: ${project.title}`}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <Github className="w-5 h-5" />
//                       </a>
//                     </div>

//                     {/* Featured Badge */}
//                     {project.featured && (
//                       <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-medium rounded-full">
//                         Featured
//                       </div>
//                     )}
//                   </div>

//                   {/* Project Content */}
//                   <div className="p-6 sm:p-6 md:p-8 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span
//                         className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
//                         itemprop="category"
//                       >
//                         {project.category}
//                       </span>
//                     </div>

//                     <h3
//                       className="text-lg sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300"
//                       id={`project-title-${project.id}`}
//                       itemprop="name"
//                     >
//                       {project.title}
//                     </h3>

//                     <p
//                       className="text-gray-600 leading-relaxed text-sm sm:text-xs md:text-base"
//                       aria-describedby={`project-title-${project.id}`}
//                       itemprop="description"
//                     >
//                       {project.description}
//                     </p>

//                     {/* Features (Technologies) */}
//                     <div className="flex flex-wrap gap-2">
//                       {project.features.map((feature, featureIndex) => (
//                         <span
//                           key={featureIndex}
//                           className="px-2 py-1 bg-gray-100 text-gray-600 text-xs sm:text-[0.65rem] md:text-sm rounded-md"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </article>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* View All Projects Button */}
//         {!loading && !error && filteredProjects.length > displayedProjects.length && (
//           <div
//             className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-500 will-change-transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//           >
//             <Link href="/projects">
//               <button
//                 type="button"
//                 className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
//                 aria-label="View All Projects"
//               >
//                 <span>View All Projects</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }



// "use client"

// import { useRef, useEffect, useState, useMemo } from "react"
// import { ExternalLink, Github, ArrowRight } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function PortfolioSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [activeFilter, setActiveFilter] = useState("All")
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const sectionRef = useRef(null)
//   const router = useRouter()

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
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("/api/projects", { next: { revalidate: 60 } })
//         if (!res.ok) throw new Error("Failed to fetch projects")
//         const { success, data } = await res.json()
//         if (!success) throw new Error("API error")
//         setProjects(
//           data.map((project) => ({
//             id: project.id,
//             title: project.title,
//             category: project.category,
//             description: project.description,
//             image: project.image || "/placeholder.svg",
//             features: project.features || project.technologies || [],
//             liveUrl: project.liveUrl || "#",
//             githubUrl: project.githubUrl || "#",
//             featured: project.status === "completed",
//           }))
//         )
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProjects()
//   }, [])

//   const filters = ["All", "Web Apps", "E-commerce", "Mobile Apps", "UI/UX"]

//   const filteredProjects = useMemo(() => {
//     return activeFilter === "All"
//       ? projects
//       : projects.filter((project) => project.category === activeFilter)
//   }, [projects, activeFilter])

//   const displayedProjects = filteredProjects.slice(0, typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 6)

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     itemListElement: displayedProjects.map((project, index) => ({
//       "@type": "CreativeWork",
//       name: project.title,
//       description: project.description,
//       url: `/projects/${project.id}`,
//       image: project.image,
//       position: index + 1,
//     })),
//   }

//   return (
//     <section
//       ref={sectionRef}
//       className="no-js py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative min-h-fit overflow-visible"
//       role="region"
//       aria-label="Portfolio Section"
//       data-testid="portfolio-section"
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
//       <div className="absolute inset-0 pointer-events-none overflow-visible">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <header
//           className={`text-center mb-16 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
//             <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
//         </header>

//         {/* Filter Buttons */}
//         <div
//           className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//         >
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               type="button"
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
//                 activeFilter === filter
//                   ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
//                   : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md"
//               }`}
//               aria-label={`Filter by ${filter}`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">Loading projects...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600 text-lg">Error: {error}</div>
//         )}

//         {/* Projects Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
//             {displayedProjects.map((project, index) => (
//               <div
//                 key={project.id}
//                 onClick={() => router.push(`/projects/${project.id}`)}
//                 className="cursor-pointer"
//                 data-testid={`project-card-${project.id}`}
//               >
//                 <article
//                   className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-1000 hover:-translate-y-2 transform w-full ${
//                     isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
//                   } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
//                   style={{ transitionDelay: `${index * 100}ms` }}
//                   itemScope
//                   itemType="https://schema.org/CreativeWork"
//                 >
//                   {/* Project Image */}
//                   <div className="relative h-64 overflow-hidden">
//                     <Image
//                       src={project.image}
//                       alt={project.title}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-700"
//                       priority={index < 3}
//                       loading={index >= 3 ? "lazy" : undefined}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     {/* Overlay Links */}
//                     <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <a
//                         href={project.liveUrl}
//                         className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                         aria-label={`View Live Project: ${project.title}`}
//                         onClick={(e) => e.stopPropagation()}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <ExternalLink className="w-5 h-5" />
//                       </a>
//                       <a
//                         href={project.githubUrl}
//                         className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
//                         aria-label={`View Source Code: ${project.title}`}
//                         onClick={(e) => e.stopPropagation()}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Github className="w-5 h-5" />
//                       </a>
//                     </div>

//                     {/* Featured Badge */}
//                     {project.featured && (
//                       <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-medium rounded-full">
//                         Featured
//                       </div>
//                     )}
//                   </div>

//                   {/* Project Content */}
//                   <div className="p-6 sm:p-6 md:p-8 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span
//                         className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
//                         itemProp="category"
//                       >
//                         {project.category}
//                       </span>
//                     </div>

//                     <h3
//                       className="text-lg sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300"
//                       id={`project-title-${project.id}`}
//                       itemProp="name"
//                     >
//                       {project.title}
//                     </h3>

//                     <p
//                       className="text-gray-600 leading-relaxed text-sm sm:text-xs md:text-base"
//                       aria-describedby={`project-title-${project.id}`}
//                       itemProp="description"
//                     >
//                       {project.description}
//                     </p>

//                     {/* Features (Technologies) */}
//                     <div className="flex flex-wrap gap-2">
//                       {project.features.map((feature, featureIndex) => (
//                         <span
//                           key={featureIndex}
//                           className="px-2 py-1 bg-gray-100 text-gray-600 text-xs sm:text-[0.65rem] md:text-sm rounded-md"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </article>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* View All Projects Button */}
//         {!loading && !error && filteredProjects.length > displayedProjects.length && (
//           <div
//             className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//           >
//             <Link href="/projects">
//               <button
//                 type="button"
//                 className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
//                 aria-label="View All Projects"
//               >
//                 <span>View All Projects</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }




"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sectionRef = useRef(null)
  const router = useRouter()

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
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/projects", { next: { revalidate: 60 } })
        if (!res.ok) throw new Error("Failed to fetch projects")
        const { success, data } = await res.json()
        if (!success) throw new Error("API error")
        setProjects(
          data.map((project) => ({
            id: project.id,
            title: project.title,
            category: project.category,
            description: project.description,
            image: project.image || "/placeholder.svg",
            features: project.features || project.technologies || [],
            liveUrl: project.liveUrl || "#",
            githubUrl: project.githubUrl || "#",
            featured: project.status === "completed",
          }))
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filters = ["All", "Web Apps", "E-commerce", "Mobile Apps", "UI/UX"]

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter)
  }, [projects, activeFilter])

  const displayedProjects = filteredProjects.slice(0, typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 6)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: displayedProjects.map((project, index) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      image: project.image,
      position: index + 1,
    })),
  }

  return (
    <section
      ref={sectionRef}
      className="no-js py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative min-h-fit overflow-x-hidden"
      role="region"
      aria-label="Portfolio Section"
      data-testid="portfolio-section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        .no-js .transform {
          opacity: 1 !important;
          transform: none !important;
        }
        button:focus {
          outline: 2px solid #0d9488;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .transform {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-4 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-4 w-80 h-80 bg-gradient-to-tr from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-12 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            Portfolio
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            My Recent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Work</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills and expertise in web development, mobile apps,
            and UI/UX design.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </header>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md"
              }`}
              aria-label={`Filter by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 text-base sm:text-lg">Loading projects...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 text-base sm:text-lg">Error: {error}</div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="cursor-pointer w-full"
                data-testid={`project-card-${project.id}`}
              >
                <article
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-1000 hover:-translate-y-2 transform w-full ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  {/* Project Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                      loading={index >= 3 ? "lazy" : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Overlay Links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.liveUrl}
                        className="p-2 sm:p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
                        aria-label={`View Live Project: ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 sm:p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors duration-300"
                        aria-label={`View Source Code: ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2 sm:px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                        itemProp="category"
                      >
                        {project.category}
                      </span>
                    </div>

                    <h3
                      className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300"
                      id={`project-title-${project.id}`}
                      itemProp="name"
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-gray-600 leading-relaxed text-sm sm:text-base"
                      aria-describedby={`project-title-${project.id}`}
                      itemProp="description"
                    >
                      {project.description}
                    </p>

                    {/* Features (Technologies) */}
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs sm:text-sm rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        {!loading && !error && filteredProjects.length > displayedProjects.length && (
          <div
            className={`text-center mt-10 sm:mt-12 transform transition-all duration-1000 delay-300 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
          >
            <Link href="/projects">
              <button
                type="button"
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                aria-label="View All Projects"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}