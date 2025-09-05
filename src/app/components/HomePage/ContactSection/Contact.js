// "use client"

// import { useRef, useState, useEffect } from "react"
// import {
//   Mail,
//   Send,
//   User,
//   MessageSquare,
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   Phone,
//   MapPin,
//   Clock,
// } from "lucide-react"

// export default function ContactSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

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

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     console.log("Form submitted:", formData)
//     setFormData({ name: "", email: "", subject: "", message: "" })
//     setIsSubmitting(false)
//   }

//   const contactInfo = [
//     {
//       icon: Mail,
//       title: "Email",
//       value: "hello@fahadjoyia.com",
//       description: "Send me an email anytime!",
//     },
//     {
//       icon: Phone,
//       title: "Phone",
//       value: "+1 (555) 123-4567",
//       description: "Mon-Fri from 8am to 6pm",
//     },
//     {
//       icon: MapPin,
//       title: "Location",
//       value: "New York, USA",
//       description: "Available for remote work",
//     },
//     {
//       icon: Clock,
//       title: "Response Time",
//       value: "24 hours",
//       description: "I&apos;ll get back to you quickly",
//     },
//   ]

//   const socialLinks = [
//     { icon: Github, name: "GitHub", href: "#", color: "hover:text-gray-800" },
//     { icon: Linkedin, name: "LinkedIn", href: "#", color: "hover:text-blue-600" },
//     { icon: Twitter, name: "Twitter", href: "#", color: "hover:text-blue-400" },
//     { icon: Instagram, name: "Instagram", href: "#", color: "hover:text-pink-500" },
//   ]

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden"
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
//             <Send className="w-4 h-4" />
//             Get In Touch
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//             Let&apos;s Work
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
//               {" "}
//               Together
//             </span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can bring your
//             ideas to life.
//           </p>

//           <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16">
//           {/* Contact Information */}
//           <div
//             className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
//           >
//             {/* Contact Cards */}
//             <div className="grid sm:grid-cols-2 gap-6">
//               {contactInfo.map((info, index) => (
//                 <div
//                   key={index}
//                   className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
//                       <info.icon className="w-6 h-6 text-emerald-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
//                       <p className="text-emerald-600 font-medium mb-1">{info.value}</p>
//                       <p className="text-sm text-gray-600">{info.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Social Links */}
//             <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
//               <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Me</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.href}
//                     className={`flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all duration-300 group ${social.color}`}
//                   >
//                     <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
//                       <social.icon className="w-5 h-5" />
//                     </div>
//                     <span className="font-medium text-gray-700">{social.name}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div
//             className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
//           >
//             <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
//               <div className="mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Message</h3>
//                 <p className="text-gray-600">Fill out the form below and I&apos;s get back to you as soon as possible.</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
//                       placeholder="Your Name"
//                       required
//                     />
//                   </div>

//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
//                       placeholder="Your Email"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
//                     placeholder="Subject"
//                     required
//                   />
//                 </div>

//                 <div className="relative">
//                   <div className="absolute top-4 left-4 pointer-events-none">
//                     <MessageSquare className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows="6"
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 resize-none"
//                     placeholder="Your Message"
//                     required
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5" />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

// Dynamic imports for lucide-react icons
const Mail = dynamic(() => import("lucide-react").then((mod) => mod.Mail), { ssr: false })
const Send = dynamic(() => import("lucide-react").then((mod) => mod.Send), { ssr: false })
const User = dynamic(() => import("lucide-react").then((mod) => mod.User), { ssr: false })
const MessageSquare = dynamic(() => import("lucide-react").then((mod) => mod.MessageSquare), { ssr: false })
const Github = dynamic(() => import("lucide-react").then((mod) => mod.Github), { ssr: false })
const Linkedin = dynamic(() => import("lucide-react").then((mod) => mod.Linkedin), { ssr: false })
const Twitter = dynamic(() => import("lucide-react").then((mod) => mod.Twitter), { ssr: false })
const Instagram = dynamic(() => import("lucide-react").then((mod) => mod.Instagram), { ssr: false })
const Phone = dynamic(() => import("lucide-react").then((mod) => mod.Phone), { ssr: false })
const MapPin = dynamic(() => import("lucide-react").then((mod) => mod.MapPin), { ssr: false })
const Clock = dynamic(() => import("lucide-react").then((mod) => mod.Clock), { ssr: false })

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const res = await fetch("/api/contact/quickCon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully!" })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const { error } = await res.json()
        setSubmitStatus({ type: "error", message: error || "Failed to send message. Please try again." })
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@fahadjoyia.com",
      description: "Send me an email anytime!",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New York, USA",
      description: "Available for remote work",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24 hours",
      description: "I&apos;ll get back to you quickly",
    },
  ]

  const socialLinks = [
    { icon: Github, name: "GitHub", href: "#", color: "hover:text-gray-800" },
    { icon: Linkedin, name: "LinkedIn", href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, name: "Instagram", href: "#", color: "hover:text-pink-500" },
  ]

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Fahad Joyia",
      email: "hello@fahadjoyia.com",
      telephone: "+1 (555) 123-4567",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressCountry: "USA",
      },
      contactPoint: contactInfo.map((info) => ({
        "@type": "ContactPoint",
        contactType: info.title,
        [info.title === "Email" ? "email" : info.title === "Phone" ? "telephone" : "description"]: info.value,
      })),
      sameAs: socialLinks.map((social) => social.href),
    }),
      [contactInfo, socialLinks]
  )

  return (
    <section
      ref={sectionRef}
      className="no-js py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden"
      role="region"
      aria-label="Contact Section"
      data-testid="contact-section"
      itemScope
      itemType="https://schema.org/Person"
    >
      <style jsx>{`
        .no-js .transform {
          opacity: 1 !important;
          transform: none !important;
        }
        button:focus,
        a:focus {
          outline: 2px solid #10b981;
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-4 sm:left-8 lg:left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-8 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 will-change-transform,opacity ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Send className="w-4 h-4" aria-hidden="true" />
            Get In Touch
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Let&apos;s Work
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}
              Together
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can bring your
            ideas to life.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Information */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 will-change-transform,opacity ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  itemProp="contactPoint"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1" itemProp="contactType">{info.title}</h4>
                      <p
                        className="text-emerald-600 font-medium mb-1"
                        itemProp={info.title === "Email" ? "email" : info.title === "Phone" ? "telephone" : "description"}
                      >
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all duration-300 group ${social.color}`}
                    itemProp="sameAs"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <social.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-gray-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transform transition-all duration-1000 delay-400 will-change-transform,opacity ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Quick Contact</h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="Your Name"
                      required
                      aria-label="Your Name"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="Your Email"
                      required
                      aria-label="Your Email"
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="Subject"
                    required
                    aria-label="Subject"
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 resize-none"
                    placeholder="Your Message"
                    required
                    aria-label="Your Message"
                  ></textarea>
                </div>

                {submitStatus && (
                  <p
                    className={`text-sm font-medium ${
                      submitStatus.type === "success" ? "text-emerald-600" : "text-red-600"
                    }`}
                    role="alert"
                  >
                    {submitStatus.message}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    aria-label="Send Quick Contact Message"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        Quick Contact
                      </>
                    )}
                  </button>

                  <Link
                    href="/contact"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                    aria-label="Go to Full Contact Page"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Full Contact
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}