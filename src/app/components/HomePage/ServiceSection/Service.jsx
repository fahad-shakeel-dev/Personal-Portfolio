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
      serviceType: "Web Development Service",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive user interfaces and experiences that engage users and drive conversions.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      color: "from-purple-500 to-pink-500",
      serviceType: "UI/UX Design Service",
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
  serviceType: "Responsive Web Design Service",
},
    {
      icon: Globe,
      title: "E-commerce Solutions",
      description:
        "Building complete e-commerce platforms with payment integration, inventory management, and analytics.",
      features: ["Wordpress Development", "WooCommerce", "Payment Gateway", "Inventory System"],
      color: "from-orange-500 to-red-500",
      serviceType: "E-commerce Development Service",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Optimizing websites and applications for speed, SEO, and better user experience across all devices.",
      features: ["Speed Optimization", "SEO Enhancement", "Core Web Vitals", "Analytics Setup"],
      color: "from-yellow-500 to-orange-500",
      serviceType: "Website Performance Optimization Service",
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description:
        "Providing ongoing maintenance, updates, and technical support to keep your digital assets running smoothly.",
      features: ["Regular Updates", "Security Monitoring", "Bug Fixes", "24/7 Support"],
      color: "from-indigo-500 to-purple-500",
      serviceType: "Website Maintenance Service",
    },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.serviceType,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      position: index + 1,
    })),
  }

  return (
    <section
      ref={sectionRef}
      className="no-js py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative min-h-fit overflow-visible"
      role="region"
      aria-label="Services Section"
      data-testid="services-section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <style jsx>{`
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
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <div className="absolute top-1/4 left-4 sm:left-10 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-10 w-24 sm:w-64 h-24 sm:h-64 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-12 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" aria-hidden="true" />
            Services
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            What I Can Do
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}
              For You
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I offer comprehensive digital solutions to help your business grow and succeed in the digital world. From
            concept to deployment, I've got you covered.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          {services.map((service, index) => (
            <article
              key={index}
              className={`group relative bg-white rounded-3xl p-6 sm:p-6 md:p-8 shadow-lg md:hover:shadow-2xl transition-all duration-1000 md:hover:-translate-y-2 border border-gray-100 transform will-change-transform,opacity w-full ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`service-card-${index}`}
              itemScope
              itemType="https://schema.org/Service"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 sm:p-3 md:p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon
                  className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white"
                  aria-label={`${service.title} icon`}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3
                  className="text-lg sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300"
                  id={`service-title-${index}`}
                  itemProp="name"
                >
                  {service.title}
                </h3>

                <p
                  className="text-gray-600 leading-relaxed text-sm sm:text-xs md:text-base"
                  aria-describedby={`service-title-${index}`}
                  itemProp="description"
                >
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2"
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-xs sm:text-[0.65rem] md:text-sm text-gray-600" itemProp="name">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 md:group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 will-change-transform,opacity ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-white relative overflow-visible">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-base sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                Let&apos;s discuss your ideas and create something amazing together. I&apos;m here to help bring your vision to
                life.
              </p>
              <Link href="/contact">
                <button
                  type="button"
                  className="px-6 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 bg-white text-emerald-600 font-semibold rounded-full md:hover:shadow-xl transition-all duration-300 md:hover:scale-105"
                  aria-label="Get Started Today"
                  style={{ cursor: "pointer" }}
                >
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