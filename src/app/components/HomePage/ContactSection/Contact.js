// // "use client"

// // import { useRef, useState } from "react"
// // import { Mail, Send, User, MessageSquare, Github, Linkedin, Twitter, Instagram } from "lucide-react"

// // export default function ContactSection() {
// //   const sectionRef = useRef(null)
// //   const titleRef = useRef(null)
// //   const subtitleRef = useRef(null)
// //   const leftFormRef = useRef(null)
// //   const rightFormRef = useRef(null)
// //   const socialRef = useRef(null)
// //   const waveRef = useRef(null)

// //   const [name, setName] = useState("")
// //   const [email, setEmail] = useState("")
// //   const [message, setMessage] = useState("")
// //   const [commentName, setCommentName] = useState("")
// //   const [commentMessage, setCommentMessage] = useState("")

// //   const handleSendMessage = (e) => {
// //     e.preventDefault()
// //     console.log({ name, email, message })
// //     setName("")
// //     setEmail("")
// //     setMessage("")
// //   }

// //   const handlePostComment = (e) => {
// //     e.preventDefault()
// //     console.log({ commentName, commentMessage })
// //     setCommentName("")
// //     setCommentMessage("")
// //   }

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="relative px-4 sm:px-8 md:px-16 py-16 lg:py-24 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 dark:from-teal-900 dark:via-cyan-900 dark:to-emerald-900 overflow-hidden"
// //     >
// //       <style jsx>{`
// //         /* Wave background animation */
// //         .cs-wave {
// //           animation: cs-waveMove 12s ease-in-out infinite alternate;
// //           will-change: transform;
// //         }
// //         @keyframes cs-waveMove {
// //           from {
// //             transform: translateX(0);
// //           }
// //           to {
// //             transform: translateX(-20%);
// //           }
// //         }

// //         /* Particle animation */
// //         .cs-particle {
// //           animation: cs-float 4s ease-in-out infinite;
// //           will-change: transform, opacity;
// //         }
// //         @keyframes cs-float {
// //           0%, 100% {
// //             transform: translate(0, 0);
// //             opacity: 0.1;
// //           }
// //           50% {
// //             transform: translate(calc((random() - 0.5) * 150px), calc((random() - 0.5) * 150px));
// //             opacity: 0.2;
// //           }
// //         }

// //         /* Entrance animations for title and subtitle */
// //         .cs-title,
// //         .cs-subtitle {
// //           opacity: 0;
// //           transform: translateY(60px);
// //           animation: cs-slideIn 0.8s ease-out forwards;
// //         }
// //         .cs-subtitle {
// //           animation-delay: 0.2s;
// //         }
// //         @keyframes cs-slideIn {
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         /* Form floating animation */
// //         .cs-form-container {
// //           transition: transform 0.3s ease, box-shadow 0.3s ease;
// //           animation: cs-floatForm 2s ease-in-out infinite alternate;
// //         }
// //         @keyframes cs-floatForm {
// //           from {
// //             transform: translateY(0);
// //           }
// //           to {
// //             transform: translateY(10px);
// //           }
// //         }

// //         /* Form submit animation */
// //         .cs-form-container:active {
// //           transform: scale(1.05);
// //           box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
// //         }

// //         /* Social link hover effects */
// //         .cs-social-link {
// //           transition: transform 0.3s ease, box-shadow 0.3s ease;
// //         }
// //         .cs-social-link:hover {
// //           transform: scale(1.05);
// //           box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
// //         }
// //         .cs-social-link .cs-social-icon {
// //           transition: transform 0.3s ease;
// //         }
// //         .cs-social-link:hover .cs-social-icon {
// //           transform: rotate(15deg) scale(1.2);
// //         }

// //         /* Optimize for performance */
// //         * {
// //           -webkit-font-smoothing: antialiased;
// //           -moz-osx-font-smoothing: grayscale;
// //         }
// //         input, textarea {
// //           transition: border-color 0.3s ease, box-shadow 0.3s ease;
// //         }
// //       `}</style>

// //       {/* Wave Background */}
// //       <svg
// //         ref={waveRef}
// //         className="cs-wave absolute inset-0 w-[120%] h-full opacity-10"
// //         viewBox="0 0 1440 320"
// //         preserveAspectRatio="none"
// //       >
// //         <path
// //           fill="url(#cs-wave-gradient)"
// //           fillOpacity="0.5"
// //           d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
// //         />
// //         <defs>
// //           <linearGradient id="cs-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //             <stop offset="0%" style={{ stopColor: "#5eead4", stopOpacity: 0.8 }} />
// //             <stop offset="100%" style={{ stopColor: "#6ee7b7", stopOpacity: 0.8 }} />
// //           </linearGradient>
// //         </defs>
// //       </svg>

// //       {/* Particles */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {Array.from({ length: 8 }).map((_, i) => (
// //           <div
// //             key={i}
// //             className="cs-particle absolute w-2 h-2 bg-emerald-300 rounded-full"
// //             style={{
// //               top: `${Math.random() * 100}%`,
// //               left: `${Math.random() * 100}%`,
// //               animationDelay: `${i * 0.2}s`,
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <div className="container mx-auto relative z-10">
// //         {/* Title and Subtitle */}
// //         <div className="text-center mb-12">
// //           <h2
// //             ref={titleRef}
// //             className="cs-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-500 tracking-tight font-[Poppins,Inter,sans-serif] leading-tight drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]"
// //             id="cs-contact-heading"
// //           >
// //             Get in Touch
// //           </h2>
// //           <p
// //             ref={subtitleRef}
// //             className="cs-subtitle mt-4 text-sm sm:text-base md:text-lg text-teal-700 dark:text-teal-200 max-w-2xl mx-auto drop-shadow-md"
// //             aria-describedby="cs-contact-heading"
// //           >
// //             Have a question or idea? Reach out, and let’s create something amazing together.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
// //           {/* Left Form - Contact */}
// //           <div
// //             ref={leftFormRef}
// //             className="cs-form-container bg-gradient-to-br from-teal-800/30 to-cyan-800/30 backdrop-blur-md rounded-2xl p-6 border border-teal-600/50 shadow-xl hover:border-emerald-400/50 transition-all duration-300"
// //           >
// //             <div className="mb-6">
// //               <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
// //                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">
// //                   Send a Message
// //                 </span>
// //                 <Send size={18} className="text-emerald-400" />
// //               </h3>
// //               <p className="text-teal-800 dark:text-teal-300 text-sm mt-2">
// //                 Let’s discuss your project or ideas. I’m all ears!
// //               </p>
// //             </div>

// //             <form onSubmit={handleSendMessage} className="space-y-4">
// //               <div className="relative">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <User className="h-5 w-5 text-teal-400" />
// //                 </div>
// //                 <input
// //                   type="text"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="bg-teal-800/30 border border-teal-600/50 text-teal-50 placeholder-teal-300/70 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full pl-10 p-3"
// //                   placeholder="Your Name"
// //                   required
// //                   aria-label="Your Name"
// //                 />
// //               </div>

// //               <div className="relative">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <Mail className="h-5 w-5 text-teal-400" />
// //                 </div>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="bg-teal-800/30 border border-teal-600/50 text-teal-50 placeholder-teal-300/70 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full pl-10 p-3"
// //                   placeholder="Your Email"
// //                   required
// //                   aria-label="Your Email"
// //                 />
// //               </div>

// //               <div className="relative">
// //                 <div className="absolute top-3 left-3 pointer-events-none">
// //                   <MessageSquare className="h-5 w-5 text-teal-400" />
// //                 </div>
// //                 <textarea
// //                   value={message}
// //                   onChange={(e) => setMessage(e.target.value)}
// //                   rows="5"
// //                   className="bg-teal-800/30 border border-teal-600/50 text-teal-50 placeholder-teal-300/70 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full pl-10 p-3"
// //                   placeholder="Your Message"
// //                   required
// //                   aria-label="Your Message"
// //                 ></textarea>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 transform hover:scale-[1.02]"
// //                 aria-label="Send Message"
// //               >
// //                 <Send className="h-4 w-4" />
// //                 Send Message
// //               </button>
// //             </form>

// //             {/* Social Links */}
// //             <div className="mt-8 pt-6 border-t border-teal-600/50">
// //               <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>
// //               <div ref={socialRef} className="grid grid-cols-2 gap-3">
// //                 {[
// //                   { icon: Github, name: "GitHub", href: "#" },
// //                   { icon: Linkedin, name: "LinkedIn", href: "#" },
// //                   { icon: Twitter, name: "Twitter", href: "#" },
// //                   { icon: Instagram, name: "Instagram", href: "#" },
// //                 ].map((social, index) => (
// //                   <a
// //                     key={index}
// //                     href={social.href}
// //                     className="cs-social-link flex items-center gap-2 bg-teal-800/30 hover:bg-teal-700/30 p-3 rounded-lg"
// //                     aria-label={`Follow on ${social.name}`}
// //                   >
// //                     <div className="cs-social-icon bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-full">
// //                       <social.icon size={18} className="text-white" />
// //                     </div>
// //                     <span className="text-sm text-teal-50">{social.name}</span>
// //                   </a>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Form - Comments */}
// //           <div
// //             ref={rightFormRef}
// //             className="cs-form-container bg-gradient-to-br from-teal-800/30 to-cyan-800/30 backdrop-blur-md rounded-2xl p-6 border border-teal-600/50 shadow-xl hover:border-emerald-400/50 transition-all duration-300"
// //           >
// //             <div className="mb-6">
// //               <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
// //                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">
// //                   Leave a Comment
// //                 </span>
// //                 <MessageSquare size={18} className="text-emerald-400" />
// //                 <span className="text-sm font-normal text-teal-300 ml-1">(1)</span>
// //               </h3>
// //               <p className="text-teal-800 dark:text-teal-300 text-sm mt-2">
// //                 Share your thoughts or feedback below.
// //               </p>
// //             </div>

// //             <form onSubmit={handlePostComment} className="space-y-4 mb-6">
// //               <div>
// //                 <label htmlFor="cs-comment-name" className="block mb-2 text-sm font-medium text-teal-800 dark:text-teal-300">
// //                   Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="cs-comment-name"
// //                   value={commentName}
// //                   onChange={(e) => setCommentName(e.target.value)}
// //                   className="bg-teal-800/30 border border-teal-600/50 text-teal-50 placeholder-teal-300/70 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-3"
// //                   placeholder="Enter your name..."
// //                   required
// //                   aria-label="Commenter Name"
// //                 />
// //               </div>

// //               <div>
// //                 <label htmlFor="cs-comment-message" className="block mb-2 text-sm font-medium text-teal-800 dark:text-teal-300">
// //                   Message
// //                 </label>
// //                 <textarea
// //                   id="cs-comment-message"
// //                   rows="4"
// //                   value={commentMessage}
// //                   onChange={(e) => setCommentMessage(e.target.value)}
// //                   className="bg-teal-800/30 border border-teal-600/50 text-teal-50 placeholder-teal-300/70 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-3"
// //                   placeholder="Write your message here..."
// //                   required
// //                   aria-label="Comment Message"
// //                 ></textarea>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 transform hover:scale-[1.02]"
// //                 aria-label="Post Comment"
// //               >
// //                 <Send className="h-4 w-4" />
// //                 Post Comment
// //               </button>
// //             </form>

// //             {/* Sample Comment */}
// //             <div className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/50 transition-all duration-300 hover:border-emerald-400/50">
// //               <div className="flex items-center justify-between mb-2">
// //                 <div className="flex items-center gap-2">
// //                   <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-full">
// //                     <User size={16} className="text-white" />
// //                   </div>
// //                   <span className="font-medium text-white">Abdullah</span>
// //                 </div>
// //                 <span className="text-xs text-teal-300">Just now</span>
// //               </div>
// //               <p className="text-teal-50 text-sm">
// //                 I’m a very good developer. I like to work with it.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }










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
//       description: "I'll get back to you quickly",
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
//             Let's Work
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
//               {" "}
//               Together
//             </span>
//           </h2>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your
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
//                 <p className="text-gray-600">Fill out the form below and I'll get back to you as soon as possible.</p>
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

import { useRef, useState, useEffect } from "react"
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  MapPin,
  Clock,
} from "lucide-react"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
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
      description: "I'll get back to you quickly",
    },
  ]

  const socialLinks = [
    { icon: Github, name: "GitHub", href: "#", color: "hover:text-gray-800" },
    { icon: Linkedin, name: "LinkedIn", href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, name: "Instagram", href: "#", color: "hover:text-pink-500" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Send className="w-4 h-4" />
            Get In Touch
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Let's Work
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {" "}
              Together
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your
            ideas to life.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
                      <p className="text-emerald-600 font-medium mb-1">{info.value}</p>
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
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <social.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Message</h3>
                <p className="text-gray-600">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="Your Email"
                      required
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
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 resize-none"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
