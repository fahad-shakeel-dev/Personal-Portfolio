"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code,
  Figma,
  FileJson,
  Globe,
  Layers,
  Palette,
  PenTool,
  Smartphone,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function TechnologiesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const ctaRef = useRef(null)
  const [showAll, setShowAll] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [isExpanded, setIsExpanded] = useState(false)

  // Technology categories
  const categories = ["All", "Design", "Development", "Mobile", "Integration"]

  // Technology data with enhanced details
  const technologies = [
    {
      id: 1,
      name: "UI/UX Design",
      icon: PenTool,
      category: "Design",
      description: "Creating intuitive and engaging user experiences",
      expertise: 95,
      projects: 120,
    },
    {
      id: 2,
      name: "Web Development",
      icon: Globe,
      category: "Development",
      description: "Building responsive and performant web applications",
      expertise: 98,
      projects: 200,
    },
    {
      id: 3,
      name: "Mobile Apps",
      icon: Smartphone,
      category: "Mobile",
      description: "Developing native and cross-platform mobile solutions",
      expertise: 90,
      projects: 85,
    },
    {
      id: 4,
      name: "Figma",
      icon: Figma,
      category: "Design",
      description: "Crafting pixel-perfect designs and prototypes",
      expertise: 96,
      projects: 150,
    },
    {
      id: 5,
      name: "Frontend",
      icon: Layers,
      category: "Development",
      description: "Building modern interfaces with cutting-edge frameworks",
      expertise: 97,
      projects: 180,
    },
    {
      id: 6,
      name: "Backend",
      icon: Code,
      category: "Development",
      description: "Creating robust and scalable server-side solutions",
      expertise: 94,
      projects: 160,
    },
    {
      id: 7,
      name: "Design Systems",
      icon: Palette,
      category: "Design",
      description: "Developing consistent and reusable component libraries",
      expertise: 92,
      projects: 75,
    },
    {
      id: 8,
      name: "API Integration",
      icon: FileJson,
      category: "Integration",
      description: "Connecting systems with seamless data exchange",
      expertise: 93,
      projects: 110,
    },
  ]

  // Filter technologies based on active category
  const filteredTechnologies =
    activeCategory === "All" ? technologies : technologies.filter((tech) => tech.category === activeCategory)

  // Get visible technologies based on screen size and showAll state
  const getVisibleTechnologies = () => {
    if (showAll) return filteredTechnologies

    if (typeof window === "undefined") return filteredTechnologies.slice(0, 4)

    const width = window.innerWidth
    if (width < 640) return filteredTechnologies.slice(0, 3) // Mobile: show 3 cards
    if (width < 1024) return filteredTechnologies.slice(0, 6) // Tablet: show 6 cards
    return filteredTechnologies.slice(0, 8) // Desktop: show 8 cards
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setShowAll(false)
  }

  // Handle view more/less toggle
  const toggleViewMore = () => {
    setShowAll(!showAll)

    // Animate the expansion/collapse
    if (!showAll) {
      setIsExpanded(true)
      // Scroll to the newly visible cards after they're rendered
      setTimeout(() => {
        const lastVisibleCard = document.querySelector(".tech-card:last-child")
        if (lastVisibleCard) {
          lastVisibleCard.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    } else {
      setIsExpanded(false)
      // Scroll back to the top of the cards section
      cardsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Create a context to isolate animations and improve performance
    const ctx = gsap.context(() => {
      // Main timeline for section animation - optimized for performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none", // Only play once for better performance
        },
      })

      // Title and subtitle animations
      tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".category-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        )

      // Staggered card animations - optimized with will-change
      const cards = document.querySelectorAll(".tech-card")
      cards.forEach((card) => {
        card.style.willChange = "transform, opacity"
      })

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.08,
            grid: "auto",
            from: "start",
          },
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
          },
          onComplete: () => {
            // Clean up will-change after animation completes
            cards.forEach((card) => {
              card.style.willChange = "auto"
            })
          },
        },
      )

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
        },
      )

      // Subtle background animations - optimized for performance
      gsap.to(".bg-wave", {
        x: "-15%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Optimized floating bubbles animation
      const bubbles = document.querySelectorAll(".tech-bubble")
      bubbles.forEach((bubble, i) => {
        const delay = i * 0.2
        const duration = 2 + Math.random() * 2

        gsap.to(bubble, {
          y: "-20px",
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      // Subtle CTA pulse animation
      gsap.to(ctaRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    // Setup card hover effects with optimized performance
    const setupCardHoverEffects = () => {
      const cards = document.querySelectorAll(".tech-card")

      cards.forEach((card) => {
        const icon = card.querySelector(".tech-icon")
        const progress = card.querySelector(".progress-circle")

        // Use mouseenter/mouseleave instead of hover for better performance
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            boxShadow: "0 15px 30px rgba(0, 206, 209, 0.15)",
            duration: 0.3,
          })

          gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
          })

          if (progress) {
            gsap.to(progress, {
              strokeDashoffset: 0,
              duration: 0.6,
              ease: "power2.out",
            })
          }
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 5px 15px rgba(0, 206, 209, 0.1)",
            duration: 0.3,
          })

          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
          })

          if (progress) {
            const expertise = card.getAttribute("data-expertise") || 0
            const offset = 100 - expertise
            const dashOffset = (offset / 100) * 283

            gsap.to(progress, {
              strokeDashoffset: dashOffset,
              duration: 0.4,
              ease: "power2.out",
            })
          }
        })
      })
    }

    // Setup card hover effects
    setupCardHoverEffects()

    // Update card hover effects when filtered technologies change
    const observer = new MutationObserver(() => {
      setupCardHoverEffects()
    })

    observer.observe(cardsContainerRef.current, { childList: true })

    // Cleanup function
    return () => {
      ctx.revert() // Clean up all GSAP animations
      observer.disconnect()

      const cards = document.querySelectorAll(".tech-card")
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [activeCategory]) // Re-run when category changes

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-8 md:px-12 lg:px-16 py-16 lg:py-24 overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50"></div>

      {/* Wave Background - Optimized SVG */}
      <svg
        className="bg-wave absolute inset-0 w-[120%] h-full opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="url(#wave-gradient)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Optimized Floating Bubbles - Limited number for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="tech-bubble absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(6, 182, 212, ${Math.random() * 0.15 + 0.05}), rgba(20, 184, 166, ${Math.random() * 0.08 + 0.02})`,
              backdropFilter: "blur(8px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
            <span className="text-sm font-medium text-cyan-600 uppercase tracking-wider">Our Expertise</span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 tracking-tight font-[Poppins,Inter,sans-serif] leading-tight"
            id="technologies-heading"
          >
            Technologies We
            <span className="text-cyan-500"> Master</span>
          </h2>

          <p ref={subtitleRef} className="mt-4 text-sm sm:text-base md:text-lg text-teal-800 max-w-3xl mx-auto">
            Crafting exceptional digital experiences with cutting-edge tools and frameworks
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-200/50"
                  : "bg-white/70 text-teal-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technology Cards - With optimized rendering */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {getVisibleTechnologies().map((tech) => (
            <div
              key={tech.id}
              data-expertise={tech.expertise}
              className="tech-card relative bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300"
              style={{
                boxShadow: "0 5px 15px rgba(0, 206, 209, 0.1)",
              }}
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Top Section with Icon and Stats */}
                <div className="flex justify-between items-start mb-4">
                  {/* Icon Container */}
                  <div className="relative">
                    {/* Expertise Circle */}
                    <svg className="w-16 h-16" viewBox="0 0 100 100">
                      {/* Background Circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e6f7f7" strokeWidth="6" />
                      {/* Progress Circle */}
                      <circle
                        className="progress-circle"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#progress-gradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={`${((100 - tech.expertise) / 100) * 283}`}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Icon */}
                    <div className="tech-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-3 rounded-full flex items-center justify-center">
                      <tech.icon size={22} />
                    </div>
                  </div>

                  {/* Expertise Percentage */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-600">{tech.expertise}%</div>
                    <div className="text-xs text-teal-600">Expertise</div>
                  </div>
                </div>

                {/* Card Text Content */}
                <h3 className="text-lg font-semibold text-teal-900 mb-2">{tech.name}</h3>

                <p className="text-sm text-teal-700 mb-4 flex-grow">{tech.description}</p>

                {/* Bottom Stats */}
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-teal-100">
                  <span className="inline-flex items-center text-xs font-medium text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
                    {tech.category}
                  </span>

                  <span className="text-xs text-teal-600">{tech.projects}+ Projects</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Button - Enhanced with animation */}
        {filteredTechnologies.length > getVisibleTechnologies().length && !showAll && (
          <div className="text-center mt-10 animate-bounce-subtle">
            <button
              onClick={toggleViewMore}
              className="group inline-flex items-center px-6 py-3 bg-white text-cyan-600 border border-cyan-200 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-cyan-300/30 transition-all duration-300"
              aria-label={showAll ? "View Less Technologies" : "View More Technologies"}
            >
              View More Technologies
              <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* View Less Button - Shows when expanded */}
        {showAll && (
          <div className="text-center mt-10">
            <button
              onClick={toggleViewMore}
              className="group inline-flex items-center px-6 py-3 bg-white text-cyan-600 border border-cyan-200 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-cyan-300/30 transition-all duration-300"
              aria-label="View Less Technologies"
            >
              View Less
              <X className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-14">
          <button
            ref={ctaRef}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-300/40 transition-all duration-300"
            aria-label="Explore Our Technologies"
          >
            Explore Our Technologies
            <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Custom Animation Styles - Optimized */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
