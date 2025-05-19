"use client"

import { useEffect, useRef } from "react"
import { Code, Figma, FileJson, Globe, Layers, Palette, PenTool, Smartphone, ChevronRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function TechnologiesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const smallTextRef = useRef(null)
  const cardsRef = useRef(null)
  const waveRef = useRef(null)
  const ctaRef = useRef(null)

  const technologies = [
    { name: "UI/UX Design", icon: PenTool, tag: "Design" },
    { name: "Web Development", icon: Globe, tag: "Development" },
    { name: "Mobile Apps", icon: Smartphone, tag: "Mobile" },
    { name: "Figma", icon: Figma, tag: "Prototyping" },
    { name: "Frontend", icon: Layers, tag: "Development" },
    { name: "Backend", icon: Code, tag: "Development" },
    { name: "Design Systems", icon: Palette, tag: "Design" },
    { name: "API Integration", icon: FileJson, tag: "Integration" },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Main timeline for section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    // Title, subtitle, and small text animations
    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        smallTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        cardsRef.current.children,
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      )

    // Wave background animation
    gsap.to(waveRef.current, {
      x: "-20%",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Card hover and parallax animations
    const cards = cardsRef.current.children
    Array.from(cards).forEach((card, i) => {
      const icon = card.querySelector(".tech-icon")
      const ring = card.querySelector(".progress-ring")
      const tl = gsap.timeline({ paused: true })

      // Hover animation
      tl.to(card, {
        scale: 1.06,
        rotate: i % 2 === 0 ? 1 : -1,
        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          icon,
          {
            rotate: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0,
        )
        .to(
          ring,
          {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0,
        )

      card.animation = tl

      card.addEventListener("mouseenter", () => tl.play())
      card.addEventListener("mouseleave", () => tl.reverse())

      // Parallax effect on scroll
      gsap.to(icon, {
        y: () => 8 * (i % 2 === 0 ? 1 : -1),
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    })

    // Particle animation
    const particles = gsap.utils.toArray(".particle")
    particles.forEach((particle, i) => {
      gsap.fromTo(
        particle,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 0.2,
          scale: 1.2,
          x: () => (Math.random() - 0.5) * 150,
          y: () => (Math.random() - 0.5) * 150,
          duration: 2,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reset",
          },
        },
      )
    })

    // CTA pulse animation
    gsap.to(ctaRef.current, {
      scale: 1.04,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      Array.from(cards).forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-8 md:px-16 py-16 lg:py-24 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 dark:from-teal-900 dark:via-cyan-900 dark:to-emerald-900 overflow-hidden"
    >
      {/* Wave Background */}
      <svg
        ref={waveRef}
        className="absolute inset-0 w-[120%] h-full opacity-15"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="url(#wave-gradient)"
          fillOpacity="0.5"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#2dd4bf", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-emerald-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Title, Subtitle, and Small Text */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-emerald-500 tracking-tight font-[Poppins,Inter,sans-serif] leading-tight drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]"
            id="technologies-heading"
          >
            Technologies We Master
          </h2>
          <p
            ref={subtitleRef}
            className="mt-4 text-sm sm:text-base md:text-lg text-teal-100 dark:text-teal-200 max-w-3xl mx-auto drop-shadow-md"
          >
            Crafting exceptional digital experiences with cutting-edge tools
          </p>
          <p
            ref={smallTextRef}
            className="mt-2 text-xs sm:text-sm md:text-base text-teal-200 dark:text-teal-300 max-w-2xl mx-auto font-light opacity-80"
            aria-describedby="technologies-heading"
          >
            Empowering innovation with world-class tools and expertise
          </p>
        </div>

        {/* Technology Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-teal-900/30 to-cyan-900/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-teal-500/20 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/20"
              role="article"
              aria-label={`Technology: ${tech.name}`}
            >
              {/* Progress Ring */}
              <div className="relative flex items-center justify-center mb-4">
                <svg className="absolute w-16 h-16 transform rotate-90" viewBox="0 0 36 36">
                  <path
                    className="progress-ring"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#ring-gradient)"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                    strokeDashoffset="75"
                  />
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#2dd4bf", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  className="tech-icon bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 rounded-full flex items-center justify-center"
                >
                  <tech.icon size={28} />
                </div>
              </div>

              {/* Card Content */}
              <h3 className="text-base sm:text-lg font-semibold text-white mt-2">{tech.name}</h3>
              <span className="mt-2 inline-block px-3 py-1 text-xs sm:text-sm font-medium text-emerald-200 bg-emerald-900/30 rounded-full">
                {tech.tag}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            ref={ctaRef}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-400/50 transition-all duration-300"
            aria-label="Explore More Technologies"
          >
            Explore More
            <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}