"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

// Dynamic imports for lucide-react icons
const Code = dynamic(() => import("lucide-react").then((mod) => mod.Code), { ssr: false })
const Figma = dynamic(() => import("lucide-react").then((mod) => mod.Figma), { ssr: false })
const Globe = dynamic(() => import("lucide-react").then((mod) => mod.Globe), { ssr: false })
const Database = dynamic(() => import("lucide-react").then((mod) => mod.Database), { ssr: false })
const Palette = dynamic(() => import("lucide-react").then((mod) => mod.Palette), { ssr: false })
const Zap = dynamic(() => import("lucide-react").then((mod) => mod.Zap), { ssr: false })
const Layers = dynamic(() => import("lucide-react").then((mod) => mod.Layers), { ssr: false })
const GitBranch = dynamic(() => import("lucide-react").then((mod) => mod.GitBranch), { ssr: false })
const Server = dynamic(() => import("lucide-react").then((mod) => mod.Server), { ssr: false })

export default function TechnologiesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [viewMoreClicked, setViewMoreClicked] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const filterRef = useRef(null)

  // Updated static technologies with your specified skills
  const staticTechnologies = [
    {
      name: "React",
      icon: Code,
      category: "Frontend",
      level: 95,
      description: "Dynamic user interfaces with React",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Express",
      icon: Server,
      category: "Backend",
      level: 90,
      description: "Fast Node.js web framework",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Node.js",
      icon: Server,
      category: "Backend",
      level: 88,
      description: "Server-side JavaScript runtime",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "MongoDB",
      icon: Database,
      category: "Backend",
      level: 85,
      description: "NoSQL database for scalability",
      color: "from-green-600 to-teal-600",
    },
    {
      name: "Next.js",
      icon: Globe,
      category: "Frontend",
      level: 92,
      description: "Full-stack React framework",
      color: "from-gray-800 to-black",
    },
    {
      name: "WordPress",
      icon: Layers,
      category: "CMS",
      level: 87,
      description: "Content management system",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "WooCommerce",
      icon: Layers,
      category: "CMS",
      level: 85,
      description: "E-commerce for WordPress",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "HTML",
      icon: Code,
      category: "Frontend",
      level: 94,
      description: "Web structure and semantics",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "CSS",
      icon: Palette,
      category: "Frontend",
      level: 93,
      description: "Styling and responsive design",
      color: "from-blue-400 to-cyan-400",
    },
    {
      name: "Tailwind CSS",
      icon: Palette,
      category: "Frontend",
      level: 94,
      description: "Utility-first CSS framework",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "JavaScript",
      icon: Code,
      category: "Frontend",
      level: 90,
      description: "Interactive web development",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Django",
      icon: Server,
      category: "Backend",
      level: 85,
      description: "Python web framework",
      color: "from-green-400 to-teal-400",
    },
    {
      name: "Flask",
      icon: Server,
      category: "Backend",
      level: 82,
      description: "Lightweight Python framework",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "GitHub",
      icon: GitBranch,
      category: "Tools",
      level: 90,
      description: "Version control and collaboration",
      color: "from-orange-600 to-red-600",
    },
    {
      name: "Figma",
      icon: Figma,
      category: "Design",
      level: 92,
      description: "UI/UX design and prototyping",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Adobe Premiere Pro",
      icon: Palette,
      category: "Design",
      level: 88,
      description: "Professional video editing",
      color: "from-purple-600 to-indigo-600",
    },
    {
      name: "Canva",
      icon: Palette,
      category: "Design",
      level: 85,
      description: "Graphic design for all",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Photoshop",
      icon: Palette,
      category: "Design",
      level: 87,
      description: "Advanced image editing",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Illustrator",
      icon: Palette,
      category: "Design",
      level: 86,
      description: "Vector graphics design",
      color: "from-orange-400 to-yellow-400",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true)
        // Simulate a smooth loading experience with a delay
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const res = await fetch("/api/technologies", { next: { revalidate: 60 } })
        if (res.ok) {
          const { technologies } = await res.json()
          setTechnologies(
            technologies.map((t) => ({
              name: t.name,
              icon: staticTechnologies.find((st) => st.name === t.name)?.icon || Code,
              category: t.category,
              level: t.level,
              description: t.description,
              color: t.color || "from-gray-500 to-gray-700",
            }))
          )
        } else {
          setTechnologies(staticTechnologies)
        }
      } catch (err) {
        setTechnologies(staticTechnologies)
      } finally {
        setLoading(false)
      }
    }
    fetchTechnologies()
  }, [])

  const categories = ["All", "Frontend", "Backend", "CMS", "Tools", "Design"]

  const filteredTechnologies = useMemo(
    () =>
      activeCategory === "All"
        ? technologies
        : technologies.filter((tech) => tech.category === activeCategory),
    [activeCategory, technologies]
  )

  const displayedTechnologies = useMemo(() => {
    if (!mounted) return []
    const isLargeScreen = typeof window !== "undefined" && window.innerWidth >= 1024
    const initialCount = isLargeScreen ? 8 : 6
    return showAll ? filteredTechnologies : filteredTechnologies.slice(0, initialCount)
  }, [filteredTechnologies, showAll, mounted])

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: filteredTechnologies.map((tech, index) => ({
        "@type": "SoftwareApplication",
        name: tech.name,
        description: tech.description,
        applicationCategory: tech.category,
        proficiencyLevel: `${tech.level}%`,
        position: index + 1,
      })),
    }),
    [filteredTechnologies]
  )

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return
    
    // Reset view more state when changing category
    setShowAll(false)
    setViewMoreClicked(false)
    
    // Update active category
    setActiveCategory(category)
  }

  const handleViewMore = () => {
    setViewMoreClicked(true)
    setShowAll(true)
  }

  // Skeleton loader component
  const TechnologySkeleton = () => (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 animate-pulse">
      <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gray-700 mb-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-gray-600"></div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mt-2"></div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/6"></div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="h-2 rounded-full bg-gray-600 w-0"></div>
          </div>
        </div>
        <div className="pt-2">
          <div className="inline-flex px-2 py-1 bg-gray-700 rounded-full w-16 h-6"></div>
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="no-js py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900 relative overflow-hidden scroll-smooth"
      role="region"
      aria-label="Technologies Section"
      data-testid="technologies-section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <style jsx>{`
        .no-js .transform {
          opacity: 1 !important;
          transform: none !important;
        }
        button:focus {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
        .tech-card {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .tech-card.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .progress-bar {
          transition: width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .sticky-filter {
          position: sticky;
          top: 1rem;
          z-index: 10;
          backdrop-filter: blur(10px);
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.75rem;
          margin-bottom: 2rem;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-4 sm:left-8 lg:left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-8 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4 border border-emerald-500/30 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            Technologies
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            My Tech
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Stack</span>
          </h2>

          <p 
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            I work with modern technologies and tools to create exceptional digital experiences. Here are the
            technologies I&apos;m proficient in.
          </p>

          <div 
            className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mt-6 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </header>

        {/* Category Filter */}
        <div
          ref={filterRef}
          className="sticky-filter flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
          role="tablist"
          aria-label="Technology Categories"
          id="technology-categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
              }`}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="technology-grid"
              tabIndex={activeCategory === category ? 0 : -1}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div
          className="tech-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 min-h-[400px] sm:min-h-[300px]"
          id="technology-grid"
          role="tabpanel"
          aria-labelledby="technology-categories"
        >
          {loading ? (
            // Skeleton loaders
            Array.from({ length: 8 }).map((_, index) => (
              <TechnologySkeleton key={index} />
            ))
          ) : (
            // Actual technology cards
            displayedTechnologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`tech-card group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 ${
                  (isVisible || viewMoreClicked) ? "visible" : ""
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
                itemScope
                itemType="https://schema.org/SoftwareApplication"
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-r ${tech.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <tech.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300"
                      itemProp="name"
                    >
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed" itemProp="description">
                      {tech.description}
                    </p>
                  </div>

                  {/* Skill Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Proficiency</span>
                      <span className="text-xs text-emerald-400 font-medium">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`progress-bar h-2 rounded-full bg-gradient-to-r ${tech.color}`}
                        style={{
                          width: (isVisible || viewMoreClicked) ? `${tech.level}%` : "0%",
                          transitionDelay: `${index * 100 + 300}ms`,
                        }}
                        itemProp="proficiencyLevel"
                      ></div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="pt-2">
                    <span
                      className="inline-flex items-center px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30"
                      itemProp="applicationCategory"
                    >
                      {tech.category}
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </div>
            ))
          )}
        </div>

        {/* View More Button */}
        {!loading && filteredTechnologies.length > (mounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? 8 : 6) && !showAll && (
          <div className="text-center mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={handleViewMore}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              aria-label="View more technologies"
              aria-expanded={showAll}
            >
              View More
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div
          className={`text-center mt-12 sm:mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-emerald-500/20">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let&apos;s leverage these technologies to create your next project. I&apos;m always excited to work with new tools
              and frameworks.
            </p>
            <Link href={'/contact'}>
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              aria-label="Start a Project"
            >
              Start a Project
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}