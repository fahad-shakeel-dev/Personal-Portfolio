

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Search } from "lucide-react"

function ProjectCard({ project, index }) {
  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 transform animate-fade-in-up border border-gray-100`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=400&width=600"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[8px] sm:text-xs font-semibold flex items-center gap-0.5 shadow-md">
            <Star className="h-2.5 w-2.5 fill-current" />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/projects/${project.id}`}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-md text-sm sm:text-base"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-1.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-emerald-600 text-xs font-semibold">{project.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-2 line-clamp-1 text-xs leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[8px] sm:text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[8px] sm:text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <Link href={`/projects/${project.id}`} className="group/link">
          <div className="flex items-center justify-between text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-300 text-sm sm:text-base">
            <span>View Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </div>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const categories = [
    { display: "All", value: "all" },
    { display: "Web Development", value: "web-development" },
    { display: "Mobile Development", value: "mobile-development" },
    { display: "Web Design", value: "web-design" },
    { display: "UI/UX", value: "ui-ux" },
  ]

  // Debounce search term to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const query = new URLSearchParams({
          searchTerm: debouncedSearchTerm,
          category: selectedCategory,
        }).toString()
        const response = await fetch(`/api/projects?${query}`)
        const data = await response.json()
        
        if (data.success) {
          const formattedProjects = data.data.map(project => ({
            ...project,
            tags: project.technologies, // Map technologies to tags
            featured: project.views > 1000, // Mark as featured if views > 1000
          }))
          setProjects(formattedProjects)
          setFilteredProjects(formattedProjects)
          setError(null)
        } else {
          setError(data.error || 'Failed to fetch projects')
        }
      } catch (err) {
        setError('Error fetching projects: ' + err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [debouncedSearchTerm, selectedCategory])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8 max-w-3xl mx-auto text-sm sm:text-base">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-emerald-600 text-base sm:text-lg mb-8">Loading projects...</div>
        )}

        <div
          className={`text-center mb-10 sm:mb-12 transform transition-all duration-1000 ${isLoading ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Star className="w-4 h-4" />
            Portfolio
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 tracking-tight">
            My Creative
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}
              Projects
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of innovative digital solutions, from web applications to mobile apps and everything in between.
          </p>
        </div>

        <div
          className={`mb-10 sm:mb-12 transform transition-all duration-1000 delay-200 ${isLoading ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          <div className="flex flex-col gap-4 sm:gap-6 items-center justify-between max-w-6xl mx-auto">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 shadow-sm text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap ${
                    selectedCategory === category.value
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  {category.display}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center text-gray-600 text-base sm:text-lg">No projects found.</div>
        )}

        {!isLoading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 transform transition-all duration-1000 delay-500 ${isLoading ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden max-w-3xl sm:max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-black/10 rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Have a Project in Mind?</h3>
              <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 max-w-xl sm:max-w-2xl mx-auto">
                Let&apos;s collaborate and bring your ideas to life. I&apos;m always excited to work on new and challenging projects.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2 sm:py-3 bg-white text-emerald-600 font-medium rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
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
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}