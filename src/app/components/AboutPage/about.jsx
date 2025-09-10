
// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { Download, Mail, Github, Linkedin, Twitter, Award, Users, Coffee, Heart } from "lucide-react"
// import { Instagram } from "lucide-react"
// // Custom hook for intersection observer animations
// function useIntersectionObserver(options = {}) {
//   const [isIntersecting, setIsIntersecting] = useState(false)
//   const [hasIntersected, setHasIntersected] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (options.once && hasIntersected) return
//         if (entry.isIntersecting) {
//           setIsIntersecting(true)
//           setHasIntersected(true)
//         } else if (!options.once) {
//           setIsIntersecting(false)
//         }
//       },
//       { threshold: 0.1, rootMargin: "0px", ...options },
//     )

//     const currentRef = ref.current
//     if (currentRef) {
//       observer.observe(currentRef)
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef)
//       }
//     }
//   }, [options, hasIntersected])

//   return [ref, isIntersecting]
// }

// // Animated section component
// function AnimatedSection({ children, className = "", animation = "fade-up", once = true }) {
//   const [ref, isVisible] = useIntersectionObserver({ once })

//   const animationClasses = {
//     "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
//     "fade-in": isVisible ? "opacity-100" : "opacity-0",
//     "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
//     "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
//     "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
//   }

//   return (
//     <div ref={ref} className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}>
//       {children}
//     </div>
//   )
// }

// // Skill bar component
// function SkillBar({ name, level, color = "emerald" }) {
//   const [ref, isVisible] = useIntersectionObserver({ once: true })

//   const gradientColors = {
//     emerald: "from-emerald-500 to-teal-500",
//     teal: "from-teal-500 to-cyan-500",
//   }

//   return (
//     <div ref={ref} className="mb-6">
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-sm font-semibold text-gray-700">{name}</span>
//         <span className="text-sm text-gray-500">{level}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div
//           className={`bg-gradient-to-r ${gradientColors[color]} h-3 rounded-full transition-all duration-1000 ease-out`}
//           style={{ width: isVisible ? `${level}%` : "0%" }}
//         />
//       </div>
//     </div>
//   )
// }

// export default function AboutPage() {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const stats = [
//     { icon: Award, label: "Awards Won", value: "5+" },
//     { icon: Users, label: "Happy Clients", value: "18+" },
//     { icon: Coffee, label: "Tea Cups", value: "1000+" },
//     { icon: Heart, label: "Passion Projects", value: "20+" },
//   ]

//   const experiences = [
//     {
//       title: "Senior Frontend Developer",
//       company: "TechCorp Inc., San Francisco",
//       period: "Jan 2021 - Present",
//       achievements: [
//         "Lead a team of 5 frontend developers in building responsive web applications using React and Next.js",
//         "Implemented state management solutions and optimized performance, resulting in a 40% improvement in load times",
//         "Collaborated with UX designers to create intuitive user interfaces that increased user engagement by 25%",
//         "Mentored junior developers and conducted code reviews to ensure high code quality and best practices",
//       ],
//     },
//     {
//       title: "Full Stack Developer",
//       company: "WebSolutions Co., Boston",
//       period: "Mar 2018 - Dec 2020",
//       achievements: [
//         "Developed and maintained full-stack applications using the MERN stack for clients across various industries",
//         "Built RESTful APIs and integrated third-party services to enhance application functionality",
//         "Implemented responsive designs that worked seamlessly across desktop and mobile devices",
//         "Optimized database queries, resulting in a 50% reduction in response times",
//       ],
//     },
//     {
//       title: "Junior Web Developer",
//       company: "Digital Agency, New York",
//       period: "Jun 2016 - Feb 2018",
//       achievements: [
//         "Built responsive websites for clients across various industries using HTML, CSS, and JavaScript",
//         "Created custom WordPress themes and plugins to meet specific client requirements",
//         "Collaborated with designers to implement pixel-perfect designs",
//         "Maintained and updated existing client websites, ensuring compatibility with modern browsers",
//       ],
//     },
//   ]

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
//       <div className="container mx-auto px-4 py-15 lg:py-20 max-w-6xl">
//         {/* Header Section */}
//         <AnimatedSection animation="fade-up" className="mb-16">
//           <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
//             <div className="flex flex-col lg:flex-row gap-8 items-start">
//               <div className="lg:w-1/3 w-full">
//                 <AnimatedSection animation="scale-up">
//                   <div className="relative w-full aspect-[3.5/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-emerald-200">
//                     <Image
//                       src="/images/about.png"
//                       alt="Professional Portrait"
//                          width={600}
//                   height={700}
//                       // fill
//                       // className="object-cover"
//                       priority
//                     />
//                   </div>
//                 </AnimatedSection>
//               </div>

//               <div className="lg:w-2/3 w-full">
//                 <AnimatedSection animation="fade-up">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                     <div>
//                       <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">Fahad Joyia</h1>
//                       <p className="text-xl md:text-2xl text-emerald-600 font-semibold">
//                         Creative Developer & Designer
//                       </p>
//                     </div>
//                     <div className="mt-6 md:mt-0">
//                       <a
//                         href="/Fahad's-Cv.pdf"
//                         download
//                         className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//                       >
//                         <Download className="w-5 h-5" />
//                         Download CV
//                       </a>
//                     </div>
//                   </div>
//                 </AnimatedSection>

//                 <AnimatedSection animation="fade-up">
//                   <div className="prose prose-lg max-w-none text-gray-700 mb-6">
//                     <p className="text-base md:text-lg leading-relaxed">
//                       Experienced Creative Developer with over 4 years of expertise in building scalable web
//                       applications and digital solutions. Specializing in modern web technologies with a focus on user
//                       experience and performance optimization.
//                     </p>
//                   </div>
//                 </AnimatedSection>

//                 <AnimatedSection animation="fade-up" className="mb-6">
//                   <div className="flex flex-wrap gap-4">
//                     <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
//                       <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm md:text-base">fahad.shakeel.dev@gmail.com</span>
//                     </div>
//                     <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
//                       <span className="text-emerald-600 text-lg flex-shrink-0">📍</span>
//                       <span className="text-gray-700 text-sm md:text-base">Faislabad, Pakistan</span>
//                     </div>
//                   </div>
//                 </AnimatedSection>

//                 <AnimatedSection animation="fade-up">
//                   <div className="flex gap-3">
//                     {[
//                       { icon: Github, label: "GitHub", href: "https://github.com/fahad-shakeel-dev" },
//                       { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-fahad-shakeel-69569a371/" },
//                       { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/its_fahadjoyia/" },
//                     ].map((social, index) => (
//                       <a
//                         key={social.label}
//                         href={social.href}
//                         className="p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all duration-300 hover:scale-110 text-emerald-700 hover:text-emerald-900 border border-emerald-100 shadow-sm hover:shadow-md"
//                         aria-label={social.label}
//                       >
//                         <social.icon className="w-5 h-5" />
//                       </a>
//                     ))}
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* Stats Section */}
//         <AnimatedSection animation="fade-up" className="mb-16">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 text-center"
//               >
//                 <div className="inline-flex p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl mb-4">
//                   <stat.icon className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
//                 <div className="text-sm text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </AnimatedSection>

//         {/* About Me */}
//         <AnimatedSection animation="fade-up" className="mb-16">
//           <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
//               <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
//               About Me
//             </h2>
//             <div className="space-y-6 text-gray-700">
//               {[
//                 "I am a dedicated Creative Developer with a passion for creating efficient, user-friendly web applications that solve real-world problems. My journey in technology began when I built my first website at the age of 17, and I've been continuously expanding my skills and knowledge ever since.",
//                 "With a strong foundation in both frontend and backend technologies, I pride myself on writing clean, maintainable code and creating intuitive user experiences. I believe in the power of technology to transform businesses and improve lives.",
//                 "Throughout my career, I've worked with diverse teams across various startups organizations. This experience has honed my ability to adapt to different environments and requirements.",
//                 "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community through blogs and tutorials.",
//               ].map((paragraph, index) => (
//                 <AnimatedSection key={index} animation="fade-up">
//                   <p className="text-base md:text-lg leading-relaxed">{paragraph}</p>
//                 </AnimatedSection>
//               ))}
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* Skills */}
//         <AnimatedSection animation="fade-up" className="mb-16">
//           <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
//               <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
//               Technical Expertise
//             </h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div>
//                 <AnimatedSection animation="slide-right">
//                   <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                     <span className="inline-block w-2 h-6 bg-emerald-500 mr-3 rounded-full" />
//                     Frontend Development
//                   </h3>
//                 </AnimatedSection>
//                 <div className="space-y-4">
//                   <SkillBar name="React & Next.js" level={95} color="emerald" />
//                   <SkillBar name="JavaScript/TypeScript" level={90} color="emerald" />
//                   <SkillBar name="HTML5/CSS3" level={98} color="emerald" />
//                   <SkillBar name="Tailwind CSS" level={92} color="emerald" />
//                   <SkillBar name="Vue.js" level={85} color="emerald" />
//                 </div>
//               </div>

//               <div>
//                 <AnimatedSection animation="slide-left">
//                   <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                     <span className="inline-block w-2 h-6 bg-teal-500 mr-3 rounded-full" />
//                     Backend & Tools
//                   </h3>
//                 </AnimatedSection>
//                 <div className="space-y-4">
//                   <SkillBar name="Node.js & Express" level={88} color="teal" />
//                   <SkillBar name="MongoDB & PostgreSQL" level={85} color="teal" />
//                   <SkillBar name="RESTful APIs" level={92} color="teal" />
//                   <SkillBar name="Git & Version Control" level={95} color="teal" />
//                   <SkillBar name="AWS & Cloud Services" level={80} color="teal" />
//                 </div>
//               </div>
//             </div>

//             <AnimatedSection animation="fade-up" className="mt-12">
//               <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <span className="inline-block w-2 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 mr-3 rounded-full" />
//                 Additional Skills
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {[
//                   "UI/UX Design",
//                   "Responsive Design",
//                   "Performance Optimization",
//                   "SEO Best Practices",
//                   "Testing (Jest, Cypress)",
//                   "Docker",
//                   "CI/CD Pipelines",
//                   "Agile Methodologies",
//                   "GraphQL",
//                   "Webpack & Vite",
//                 ].map((skill, index) => (
//                   <span
//                     key={skill}
//                     className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 hover:scale-105 border border-emerald-100"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </AnimatedSection>
//           </div>
//         </AnimatedSection>

//         {/* Experience */}
//         <AnimatedSection animation="fade-up" className="mb-16">
//           <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
//               <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
//               Professional Experience
//             </h2>
//             <div className="space-y-12">
//               {experiences.map((job, jobIndex) => (
//                 <AnimatedSection key={job.title} animation="fade-up">
//                   <div className="relative pl-8 border-l-2 border-emerald-200">
//                     <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full" />
//                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
//                       <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
//                       <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200 mt-2 md:mt-0">
//                         {job.period}
//                       </div>
//                     </div>
//                     <p className="text-emerald-600 font-semibold mb-4">{job.company}</p>
//                     <ul className="list-none space-y-3 text-gray-700">
//                       {job.achievements.map((achievement, index) => (
//                         <li key={index} className="flex items-start gap-3">
//                           <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
//                           <span className="text-base leading-relaxed">{achievement}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </AnimatedSection>
//               ))}
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* Education & Certifications */}
//         <AnimatedSection animation="fade-up">
//           <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
//               <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
//               Education & Certifications
//             </h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div>
//                 <AnimatedSection animation="slide-right">
//                   <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                     <span className="inline-block w-2 h-6 bg-emerald-500 mr-3 rounded-full" />
//                     Education
//                   </h3>
//                 </AnimatedSection>
//                 <div className="space-y-6">
//                   {[
//                     {
//                       degree: "Bachelor of Science in Computer Science",
//                       institution: "University of Technology",
//                       period: "2018 - 2022",
//                       details: "Graduated with honors. Specialized in Software Engineering and Web Technologies.",
//                     },
//                     {
//                       degree: "Full Stack Web Development Bootcamp",
//                       institution: "Code Academy",
//                       period: "2022",
//                       details: "Intensive 16-week program focused on modern web development technologies.",
//                     },
//                   ].map((edu, index) => (
//                     <AnimatedSection key={edu.degree} animation="scale-up">
//                       <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-lg transition-all duration-300">
//                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
//                           <div>
//                             <h4 className="font-bold text-gray-800 text-lg">{edu.degree}</h4>
//                             <p className="text-emerald-600 font-semibold">{edu.institution}</p>
//                           </div>
//                           <span className="text-sm bg-white px-3 py-1 rounded-full text-emerald-700 border border-emerald-100 mt-2 sm:mt-0 inline-block font-medium">
//                             {edu.period}
//                           </span>
//                         </div>
//                         <p className="text-gray-700 text-sm leading-relaxed">{edu.details}</p>
//                       </div>
//                     </AnimatedSection>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <AnimatedSection animation="slide-left">
//                   <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                     <span className="inline-block w-2 h-6 bg-teal-500 mr-3 rounded-full" />
//                     Certifications
//                   </h3>
//                 </AnimatedSection>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       name: "AWS Certified Developer - Associate",
//                       date: "Issued: Jan 2023 • Expires: Jan 2026",
//                     },
//                     {
//                       name: "Google Professional Cloud Developer",
//                       date: "Issued: Mar 2023 • Expires: Mar 2025",
//                     },
//                     {
//                       name: "MongoDB Certified Developer",
//                       date: "Issued: Sep 2022 • No Expiration",
//                     },
//                   ].map((cert, index) => (
//                     <AnimatedSection key={cert.name} animation="scale-up">
//                       <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 hover:shadow-lg transition-all duration-300">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
//                             {cert.name.charAt(0)}
//                           </div>
//                           <div>
//                             <h4 className="font-bold text-gray-800">{cert.name}</h4>
//                             <p className="text-sm text-gray-600">{cert.date}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </AnimatedSection>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </AnimatedSection>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Download, Mail, Github, Linkedin, Instagram } from "lucide-react"
import { Award } from "lucide-react"
import { Users } from "lucide-react"
import { Heart } from "lucide-react"
// Custom hook for intersection observer animations
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (options.once && hasIntersected) return
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          setHasIntersected(true)
        } else if (!options.once) {
          setIsIntersecting(false)
        }
      },
      { threshold: 0.1, rootMargin: "0px", ...options },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options, hasIntersected])

  return [ref, isIntersecting]
}

// Animated section component
function AnimatedSection({ children, className = "", animation = "fade-up", once = true }) {
  const [ref, isVisible] = useIntersectionObserver({ once })

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  )
}

// Skill bar component
function SkillBar({ name, level, color = "emerald" }) {
  const [ref, isVisible] = useIntersectionObserver({ once: true })

  const gradientColors = {
    emerald: "from-emerald-500 to-teal-500",
    teal: "from-teal-500 to-cyan-500",
  }

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-gradient-to-r ${gradientColors[color]} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: isVisible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { icon: Github, label: "Projects", value: "10+" },
    { icon: Users, label: "Clients", value: "5+" },
    { icon: Award, label: "Successful Deployments", value: "8+" },
    { icon: Heart, label: "Open Source Contributions", value: "15+" },
  ]

  const experiences = [
    {
      title: "Freelancer Web Developer",
      company: "Self-Employed",
      period: "2022 - 2025",
      achievements: [
        "Built full-stack web applications using MERN stack & Next.js",
        "Designed responsive, user-friendly UIs with React & TailwindCSS",
        "Implemented REST APIs, authentication (JWT, OAuth2), and database integration with MongoDB & SQL",
        "Optimized websites, increasing traffic by 25%",
        "Delivered UI/UX, boosting engagement by 30%",
      ],
    },
    {
      title: "Website & Product Management",
      company: "Shop Manager | Editor",
      period: "2025",
      achievements: [
        "Managed WordPress CMS products (add, edit, update, delete)",
        "Enhanced websites with event pages, popups, and UI/UX improvements using plugins & custom styling",
        "Ensured websites stayed updated, secure, responsive, and user-friendly across all platforms",
      ],
    },
    {
      title: "Intern Developer",
      company: "Edify College of IT, Faisalabad, Pakistan",
      period: "2024 - 2025",
      achievements: [
        "Developed and deployed Next.js web applications",
        "Optimized websites, reducing load times by 30%",
        "Debugged and improved apps, cutting error rates by 20%",
        "Assisted in implementing best coding practices",
      ],
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      <div className="container mx-auto px-4 py-15 lg:py-20 max-w-6xl">
        {/* Header Section */}
        <AnimatedSection animation="fade-up" className="mb-16">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/3 w-full">
                <AnimatedSection animation="scale-up">
                  <div className="relative w-full aspect-[3.5/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-emerald-200">
                    <Image
                      src="/images/about.png"
                      alt="Professional Portrait"
                      width={600}
                      height={700}
                      priority
                    />
                  </div>
                </AnimatedSection>
              </div>

              <div className="lg:w-2/3 w-full">
                <AnimatedSection animation="fade-up">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">Muhammad Fahad</h1>
                      <p className="text-xl md:text-2xl text-emerald-600 font-semibold">
                        Full Stack MERN & Next.js Developer
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                      <a
                        href="/Fahad-CV.pdf"
                        download
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-5 h-5" />
                        Download CV
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up">
                  <div className="prose prose-lg max-w-none text-gray-700 mb-6">
                    <p className="text-base md:text-lg leading-relaxed">
                      Full Stack MERN & Next.js Developer with 4+ years of hands-on experience in designing, developing, and deploying scalable, high-performance web applications. Proficient in full-stack development, responsive UI/UX design, API integration, and database management. Strong expertise in modern JavaScript frameworks.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
                      <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">fahad.shakeel.dev@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
                      <span className="text-emerald-600 text-lg flex-shrink-0">📍</span>
                      <span className="text-gray-700 text-sm md:text-base">Faisalabad, Pakistan</span>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
                      <span className="text-emerald-600 text-lg flex-shrink-0">📞</span>
                      <span className="text-gray-700 text-sm md:text-base">+923707140829</span>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up">
                  <div className="flex gap-3">
                    {[
                      { icon: Github, label: "GitHub", href: "https://github.com/fahad-shakeel-dev" },
                      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/its_fahadjoyia/" },
                      { icon: Github, label: "Portfolio", href: "https://fahadlabs.vercel.app" },
                    ].map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all duration-300 hover:scale-110 text-emerald-700 hover:text-emerald-900 border border-emerald-100 shadow-sm hover:shadow-md"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection animation="fade-up" className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 text-center"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* About Me */}
        <AnimatedSection animation="fade-up" className="mb-16">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
              About Me
            </h2>
            <div className="space-y-6 text-gray-700">
              {[
                "I am a passionate Full Stack MERN & Next.js Developer with over 4 years of experience in building scalable, high-performance web applications. My journey in web development started with a curiosity for creating user-friendly digital solutions, which has grown into a career focused on delivering impactful projects.",
                "Skilled in both frontend and backend technologies, I specialize in crafting responsive UI/UX designs and integrating robust APIs with databases like MongoDB and SQL. My work emphasizes clean code, performance optimization, and seamless user experiences.",
                "I have worked on diverse projects, from freelance web applications to managing WordPress CMS products, always aiming to enhance functionality and user engagement. My experience includes optimizing websites for speed and implementing modern JavaScript frameworks.",
                "Outside of coding, I enjoy contributing to open-source projects, exploring new technologies, and sharing knowledge through community engagement. I’m driven by the challenge of solving real-world problems through technology.",
              ].map((paragraph, index) => (
                <AnimatedSection key={index} animation="fade-up">
                  <p className="text-base md:text-lg leading-relaxed">{paragraph}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection animation="fade-up" className="mb-16">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <AnimatedSection animation="slide-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="inline-block w-2 h-6 bg-emerald-500 mr-3 rounded-full" />
                    Frontend Development
                  </h3>
                </AnimatedSection>
                <div className="space-y-4">
                  <SkillBar name="React & Next.js" level={90} color="emerald" />
                  <SkillBar name="JavaScript" level={85} color="emerald" />
                  <SkillBar name="HTML5/CSS3" level={95} color="emerald" />
                  <SkillBar name="TailwindCSS" level={90} color="emerald" />
                </div>
              </div>

              <div>
                <AnimatedSection animation="slide-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="inline-block w-2 h-6 bg-teal-500 mr-3 rounded-full" />
                    Backend & Tools
                  </h3>
                </AnimatedSection>
                <div className="space-y-4">
                  <SkillBar name="Node.js & Express" level={85} color="teal" />
                  <SkillBar name="MongoDB & SQL" level={80} color="teal" />
                  <SkillBar name="RESTful APIs" level={90} color="teal" />
                  <SkillBar name="Git & Version Control" level={95} color="teal" />
                  <SkillBar name="Postman" level={85} color="teal" />
                </div>
              </div>
            </div>

            <AnimatedSection animation="fade-up" className="mt-12">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="inline-block w-2 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 mr-3 rounded-full" />
                Additional Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "UI/UX Design",
                  "Responsive Design",
                  "Performance Optimization",
                  "Testing & Debugging",
                  "Socket.IO",
                  "GSAP Animations",
                  "Vercel Deployment",
                  "WordPress CMS",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 hover:scale-105 border border-emerald-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection animation="fade-up" className="mb-16">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
              Professional Experience
            </h2>
            <div className="space-y-12">
              {experiences.map((job, jobIndex) => (
                <AnimatedSection key={job.title} animation="fade-up">
                  <div className="relative pl-8 border-l-2 border-emerald-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200 mt-2 md:mt-0">
                        {job.period}
                      </div>
                    </div>
                    <p className="text-emerald-600 font-semibold mb-4">{job.company}</p>
                    <ul className="list-none space-y-3 text-gray-700">
                      {job.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-base leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education & Projects */}
        <AnimatedSection animation="fade-up">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-emerald-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-emerald-100 flex items-center">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-500 mr-4 rounded-full" />
              Education & Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <AnimatedSection animation="slide-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="inline-block w-2 h-6 bg-emerald-500 mr-3 rounded-full" />
                    Education
                  </h3>
                </AnimatedSection>
                <div className="space-y-6">
                  {[
                    {
                      degree: "Bachelor of Computer Science",
                      institution: "University of Central Punjab",
                      period: "2022 - 2025",
                      details: "Pursuing a degree with a focus on software engineering and web development technologies.",
                    },
                    {
                      degree: "Intermediate in Computer Science (ICS)",
                      institution: "Kips College",
                      period: "2020 - 2022",
                      details: "Completed with a strong foundation in computer science and programming fundamentals.",
                    },
                  ].map((edu, index) => (
                    <AnimatedSection key={edu.degree} animation="scale-up">
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{edu.degree}</h4>
                            <p className="text-emerald-600 font-semibold">{edu.institution}</p>
                          </div>
                          <span className="text-sm bg-white px-3 py-1 rounded-full text-emerald-700 border border-emerald-100 mt-2 sm:mt-0 inline-block font-medium">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{edu.details}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              <div>
                <AnimatedSection animation="slide-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="inline-block w-2 h-6 bg-teal-500 mr-3 rounded-full" />
                    Personal Projects
                  </h3>
                </AnimatedSection>
                <div className="space-y-4">
                  {[
                    {
                      name: "Real Time Chatapp",
                      date: "Dec 2024 - Jan 2025",
                      details: "Built a chat app with Next.js, Express.js, and Socket.IO. Implemented instant messaging with WebSockets. Designed responsive UI using Next.js & TailwindCSS. Deployed on Vercel with GitHub & Postman for testing.",
                      url: "https://github.com/fahad-shakeel-dev/Real-time-chatapp-Next-react",
                    },
                    {
                      name: "VersaNex",
                      date: "Feb 2023 - May 2023",
                      details: "Built a company portfolio website using Next.js. Optimized images & assets, cutting page load by 40%. Enhanced UI with GSAP animations & interactive elements. Deployed live on Vercel.",
                      url: "https://versanex.vercel.app/",
                    },
                  ].map((project, index) => (
                    <AnimatedSection key={project.name} animation="scale-up">
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                            {project.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{project.name}</h4>
                            <p className="text-sm text-gray-600">{project.date}</p>
                            <p className="text-sm text-gray-700 mt-1">{project.details}</p>
                            <a
                              href={project.url}
                              className="text-emerald-600 text-sm hover:underline mt-1 inline-block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Project
                            </a>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}