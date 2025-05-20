"use client"

import { useEffect, useRef, useState } from "react"
import { DribbbleIcon as Behance, Dribbble, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (sectionRef.current) observer.unobserve(sectionRef.current)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 overflow-hidden transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-pink-200 opacity-20 animate-pulse-slow"></div>
        <div className="absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-cyan-300 opacity-20 animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          <div
            className={`w-full md:w-2/5 lg:w-1/3 relative transition-transform duration-700 ease-out ${isVisible ? "translate-y-0" : "translate-y-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-pink-500 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-float">
              <Image
                src={"/images/about.png"}
                alt="Profile"
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 lg:w-2/3 space-y-6">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 tracking-tight relative transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <span className="relative inline-block">
                ABOUT ME
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-700 ease-out ${isVisible ? "w-full" : "w-0"}`}
                  style={{ transitionDelay: "800ms" }}
                ></span>
              </span>
            </h2>

            <h3
              className={`text-lg md:text-xl font-semibold text-pink-600 tracking-wide transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              VEDANT PATEL - DESIGNER
            </h3>

            <div
              className={`transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-4 text-pink-600 font-medium hover:text-pink-700 transition-colors group"
              >
                Read More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div
              className={`flex space-x-5 pt-2 transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              {[
                { icon: Behance, label: "Behance" },
                { icon: Dribbble, label: "Dribbble" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href="#"
                    className="text-gray-700 hover:text-pink-600 transition-colors relative group"
                  >
                    <Icon size={24} className="transform transition-transform duration-300 hover:scale-110" />
                    <span className="sr-only">{social.label}</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
