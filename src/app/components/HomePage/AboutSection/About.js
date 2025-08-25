// "use client"

// import { useEffect, useRef, useState } from "react"
// import { DribbbleIcon as Behance, Dribbble, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// export default function AboutSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           if (sectionRef.current) observer.unobserve(sectionRef.current)
//         }
//       },
//       { threshold: 0.15 }
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   return (
//     <section
//       ref={sectionRef}
//       className={`relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 overflow-hidden transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
//     >
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-pink-200 opacity-20 animate-pulse-slow"></div>
//         <div className="absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-cyan-300 opacity-20 animate-pulse-slower"></div>
//       </div>

//       <div className="container mx-auto relative">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
//           <div
//             className={`w-full md:w-2/5 lg:w-1/3 relative transition-transform duration-700 ease-out ${isVisible ? "translate-y-0" : "translate-y-12"}`}
//             style={{ transitionDelay: "200ms" }}
//           >
//             <div className="aspect-square overflow-hidden rounded-lg bg-pink-500 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-float">
//               <Image
//                 src={"/images/about.png"}
//                 alt="Profile"
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                 priority
//               />
//             </div>
//           </div>

//           <div className="w-full md:w-3/5 lg:w-2/3 space-y-6">
//             <h2
//               className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 tracking-tight relative transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//               style={{ transitionDelay: "300ms" }}
//             >
//               <span className="relative inline-block">
//                 ABOUT ME
//                 <span
//                   className={`absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-700 ease-out ${isVisible ? "w-full" : "w-0"}`}
//                   style={{ transitionDelay: "800ms" }}
//                 ></span>
//               </span>
//             </h2>

//             <h3
//               className={`text-lg md:text-xl font-semibold text-pink-600 tracking-wide transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//               style={{ transitionDelay: "400ms" }}
//             >
//               VEDANT PATEL - DESIGNER
//             </h3>

//             <div
//               className={`transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//               style={{ transitionDelay: "500ms" }}
//             >
//               <p className="text-gray-600 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
//                 ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
//                 eu fugiat nulla pariatur.
//               </p>

//               <Link
//                 href="/about"
//                 className="inline-flex items-center gap-2 mt-4 text-pink-600 font-medium hover:text-pink-700 transition-colors group"
//               >
//                 Read More
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//             </div>

//             <div
//               className={`flex space-x-5 pt-2 transition-transform duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//               style={{ transitionDelay: "600ms" }}
//             >
//               {[
//                 { icon: Behance, label: "Behance" },
//                 { icon: Dribbble, label: "Dribbble" },
//                 { icon: Twitter, label: "Twitter" },
//                 { icon: Instagram, label: "Instagram" },
//                 { icon: Linkedin, label: "LinkedIn" },
//               ].map((social) => {
//                 const Icon = social.icon
//                 return (
//                   <a
//                     key={social.label}
//                     href="#"
//                     className="text-gray-700 hover:text-pink-600 transition-colors relative group"
//                   >
//                     <Icon size={24} className="transform transition-transform duration-300 hover:scale-110" />
//                     <span className="sr-only">{social.label}</span>
//                     <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
//                   </a>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }









// "use client"

// import { useEffect, useRef, useState } from "react"
// import { ArrowRight, Award, Users, Coffee, Heart } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// export default function AboutSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)

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

//   const stats = [
//     { icon: Award, label: "Awards Won", value: "15+" },
//     { icon: Users, label: "Happy Clients", value: "50+" },
//     { icon: Coffee, label: "Coffee Cups", value: "1000+" },
//     { icon: Heart, label: "Passion Projects", value: "25+" },
//   ]

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Image Section */}
//           <div
//             className={`relative transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
//           >
//             <div className="relative">
//               {/* Main Image */}
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
//                 <Image
//                   src="/images/about.png"
//                   alt="About Fahad Joyia"
//                   width={600}
//                   height={700}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   priority
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 animate-pulse shadow-xl"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full animate-bounce-slow shadow-xl opacity-80"></div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div
//             className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
//           >
//             {/* Section Header */}
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
//                 <Heart className="w-4 h-4" />
//                 About Me
//               </div>

//               <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//                 Crafting Digital
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
//                   {" "}
//                   Experiences
//                 </span>
//                 <br />
//                 With Passion
//               </h2>

//               <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
//             </div>

//             {/* Description */}
//             <div className="space-y-6">
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 I'm a passionate creative developer with over 4 years of experience in crafting beautiful, functional,
//                 and user-centered digital experiences. I combine technical expertise with creative vision to bring ideas
//                 to life.
//               </p>

//               <p className="text-base text-gray-600 leading-relaxed">
//                 My journey in web development started with a curiosity about how things work on the internet, and it has
//                 evolved into a deep passion for creating meaningful digital solutions that make a difference.
//               </p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-6">
//               {stats.map(({ icon: Icon, label, value }, index) => (
//                 <div
//                   key={index}
//                   className="group p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-5 h-5 text-emerald-600" />
//                     </div>
//                     <div>
//                       <div className="text-xl font-bold text-gray-800">{value}</div>
//                       <div className="text-sm text-gray-600">{label}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Button */}
//             <div className="pt-4">
//               <Link
//                 href="/about"
//                 className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
//               >
//                 <span>Learn More About Me</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 4s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   )
// }



"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Award, Users, Coffee, Heart } from "lucide-react"
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

  const stats = [
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "50+" },
    { icon: Coffee, label: "Coffee Cups", value: "1000+" },
    { icon: Heart, label: "Passion Projects", value: "25+" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div
            className={`relative transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
                <Image
                  src="/images/about.png"
                  alt="About Fahad Joyia"
                  width={600}
                  height={700}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 animate-pulse shadow-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full animate-bounce-slow shadow-xl opacity-80"></div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
          >
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                About Me
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Crafting Digital
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  {" "}
                  Experiences
                </span>
                <br />
                With Passion
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a passionate creative developer with over 4 years of experience in crafting beautiful, functional,
                and user-centered digital experiences. I combine technical expertise with creative vision to bring ideas
                to life.
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                My journey in web development started with a curiosity about how things work on the internet, and it has
                evolved into a deep passion for creating meaningful digital solutions that make a difference.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map(({ icon: Icon, label, value }, index) => (
                <div
                  key={index}
                  className="group p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{value}</div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
