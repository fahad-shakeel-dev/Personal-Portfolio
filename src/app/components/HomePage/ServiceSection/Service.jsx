
"use client"

import { useRef, useEffect, useState } from "react"
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) { // Trigger as soon as section starts entering view
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.01 }, // Lower threshold to trigger early
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
      title: "Mobile Responsive Design",
      description:
        "I build responsive websites with Next.js that adapt seamlessly to mobile, tablet, and desktop devices for the best user experience.",
      features: [
        "Next.js & React",
        "Responsive Tailwind CSS layouts",
        "Cross-browser compatibility",
        "Optimized for speed & SEO"
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "E-commerce Solutions",
      description:
        "Building complete e-commerce platforms with payment integration, inventory management, and analytics.",
      features: ["Wordpress Development", "WooCommerce", "Payment Gateway", "Inventory System"],
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
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-4 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Services
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            What I Can Do
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}For You
            </span>
          </h2>

          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive digital solutions to help your business grow and succeed in the digital world.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-105 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-base mb-6 opacity-90 max-w-2xl mx-auto">
                Let&apos;s discuss your ideas and create something amazing together.
              </p>
              <Link href="/contact">
                <button className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Get Started Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}