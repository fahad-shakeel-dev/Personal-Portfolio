"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Mail, Github, Linkedin, Twitter } from "lucide-react"

// Custom hook for intersection observer animations with once option
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we've already seen this element and it's a once-only animation, don't update
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

// Animated section component with once option to prevent re-triggering
function AnimatedSection({ children, className = "", animation = "fade-up", once = true }) {
  const [ref, isVisible] = useIntersectionObserver({ once })

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20",
    "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out will-change-transform ${animationClasses[animation]} ${className}`}
      style={{ maxWidth: "100%" }}
    >
      {children}
    </div>
  )
}

// Skill bar component with animation
function SkillBar({ name, level, color = "teal" }) {
  const [ref, isVisible] = useIntersectionObserver({ once: true })

  const gradientColors = {
    teal: "from-teal-500 to-cyan-400",
    cyan: "from-cyan-500 to-blue-400",
  }

  return (
    <div ref={ref} className="transform transition-all duration-300 mb-4 w-full">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`bg-gradient-to-r ${gradientColors[color]} h-2.5 rounded-full transition-all duration-700 ease-out`}
          style={{ width: isVisible ? `${level}%` : "0%" }}
        ></div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  // Mount component
  useEffect(() => {
    setMounted(true)

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 overflow-hidden">
      <div className="container mx-auto px-4 py-8 max-w-6xl overflow-hidden">
        {/* Navigation */}
        {/* <AnimatedSection animation="fade-in" className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-all text-teal-700 font-medium hover:-translate-y-0.5 active:translate-y-0 border border-teal-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </AnimatedSection> */}

        {/* Header Section */}
        <AnimatedSection animation="fade-up" className="mt-6 lg:mt-14 mb-16">
          <header>
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-teal-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4 w-full">
                  <AnimatedSection animation="scale-up">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-[1.02] border-2 border-teal-200">
                      <Image
                        src="/placeholder.svg?height=400&width=300"
                        alt="Professional Portrait"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </AnimatedSection>
                </div>

                <div className="md:w-3/4 w-full">
                  <AnimatedSection animation="fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
                        <p className="text-xl text-teal-600 font-medium">Full Stack Developer</p>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <a
                          href="/resume.pdf"
                          download
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-md shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <Download className="w-4 h-4" />
                          Download CV
                        </a>
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up">
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p>
                        Experienced Full Stack Developer with over 5 years of expertise in building scalable web
                        applications and digital solutions. Specializing in JavaScript ecosystems, particularly React
                        and Node.js, with extensive experience in modern frameworks like Next.js.
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" className="mt-6">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-teal-100">
                        <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-700 break-all">john.doe@example.com</span>
                      </div>
                      <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-teal-100">
                        <span className="text-teal-600 text-lg flex-shrink-0">📍</span>
                        <span className="text-gray-700">San Francisco, CA</span>
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" className="mt-6">
                    <div className="flex gap-3">
                      {[
                        { icon: <Github className="w-5 h-5" />, label: "GitHub" },
                        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                        { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                      ].map((social, index) => (
                        <a
                          key={social.label}
                          href="#"
                          className="p-2 bg-teal-50 rounded-md hover:bg-teal-100 transition-all duration-300 hover:-translate-y-0.5 text-teal-700 hover:text-teal-900 border border-teal-100"
                        >
                          {social.icon}
                          <span className="sr-only">{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* Main Content */}
        <div className="space-y-12 overflow-hidden">
          {/* About Me */}
          <AnimatedSection animation="fade-up">
            <section>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-teal-100 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-teal-100 flex items-center">
                  <span className="inline-block w-2 h-6 bg-gradient-to-b from-teal-400 to-cyan-500 mr-3 rounded-full"></span>
                  About Me
                </h2>
                <div className="space-y-4 text-gray-700">
                  {[
                    "I am a dedicated Full Stack Developer with a passion for creating efficient, user-friendly web applications that solve real-world problems. My journey in technology began when I built my first website at the age of 15, and I've been continuously expanding my skills and knowledge ever since.",
                    "With a strong foundation in both frontend and backend technologies, I pride myself on writing clean, maintainable code and creating intuitive user experiences. I believe in the power of technology to transform businesses and improve lives, and I'm committed to delivering high-quality solutions that meet and exceed client expectations.",
                    "Throughout my career, I've worked with diverse teams across various industries, from startups to enterprise organizations. This experience has honed my ability to adapt to different environments and requirements, ensuring that I can contribute effectively to any project.",
                    "When I'm not coding, you can find me hiking in the mountains, experimenting with new cooking recipes, or contributing to open-source projects. I'm always eager to learn new technologies and methodologies to stay at the forefront of web development.",
                  ].map((paragraph, index) => (
                    <AnimatedSection key={index} animation="fade-up">
                      <p>{paragraph}</p>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* Skills */}
          <AnimatedSection animation="fade-up">
            <section>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-teal-100 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-teal-100 flex items-center">
                  <span className="inline-block w-2 h-6 bg-gradient-to-b from-teal-400 to-cyan-500 mr-3 rounded-full"></span>
                  Technical Expertise
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <AnimatedSection animation="slide-right">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="inline-block w-1.5 h-4 bg-teal-500 mr-2 rounded-full"></span>
                        Frontend Development
                      </h3>
                    </AnimatedSection>
                    <div className="space-y-4">
                      <SkillBar name="React & Next.js" level={90} color="teal" />
                      <SkillBar name="JavaScript/TypeScript" level={85} color="teal" />
                      <SkillBar name="HTML5/CSS3" level={95} color="teal" />
                      <SkillBar name="Tailwind CSS" level={90} color="teal" />
                      <SkillBar name="Redux & Context API" level={80} color="teal" />
                    </div>
                  </div>

                  <div>
                    <AnimatedSection animation="slide-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="inline-block w-1.5 h-4 bg-cyan-500 mr-2 rounded-full"></span>
                        Backend Development
                      </h3>
                    </AnimatedSection>
                    <div className="space-y-4">
                      <SkillBar name="Node.js & Express" level={85} color="cyan" />
                      <SkillBar name="MongoDB & PostgreSQL" level={80} color="cyan" />
                      <SkillBar name="RESTful APIs" level={90} color="cyan" />
                      <SkillBar name="GraphQL" level={75} color="cyan" />
                      <SkillBar name="AWS & Cloud Services" level={70} color="cyan" />
                    </div>
                  </div>
                </div>

                <AnimatedSection animation="fade-up" className="mt-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="inline-block w-1.5 h-4 bg-gradient-to-b from-teal-400 to-cyan-500 mr-2 rounded-full"></span>
                    Additional Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Git & Version Control",
                      "CI/CD Pipelines",
                      "Docker",
                      "Agile Methodologies",
                      "UI/UX Design Principles",
                      "Performance Optimization",
                      "SEO Best Practices",
                      "Responsive Design",
                      "Testing (Jest, Cypress)",
                      "Webpack & Babel",
                    ].map((skill, index) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1.5 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-md text-sm font-medium transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm border border-teal-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </section>
          </AnimatedSection>

          {/* Experience */}
          <AnimatedSection animation="fade-up">
            <section>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-teal-100 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-teal-100 flex items-center">
                  <span className="inline-block w-2 h-6 bg-gradient-to-b from-teal-400 to-cyan-500 mr-3 rounded-full"></span>
                  Professional Experience
                </h2>

                <div className="space-y-10">
                  {[
                    {
                      title: "Senior Frontend Developer",
                      company: "TechCorp Inc., San Francisco",
                      period: "Jan 2021 - Present",
                      achievements: [
                        "Lead a team of 5 frontend developers in building responsive web applications using React and Next.js",
                        "Implemented state management solutions and optimized performance, resulting in a 40% improvement in load times",
                        "Collaborated with UX designers to create intuitive user interfaces that increased user engagement by 25%",
                        "Mentored junior developers and conducted code reviews to ensure high code quality and best practices",
                        "Introduced TypeScript to the codebase, reducing bugs in production by 30%",
                      ],
                    },
                    {
                      title: "Full Stack Developer",
                      company: "WebSolutions Co., Boston",
                      period: "Mar 2018 - Dec 2020",
                      achievements: [
                        "Developed and maintained full-stack applications using the MERN stack for clients across various industries",
                        "Built RESTful APIs and integrated third-party services to enhance application functionality",
                        "Implemented responsive designs that worked seamlessly across desktop and mobile devices",
                        "Optimized database queries, resulting in a 50% reduction in response times",
                        "Participated in client meetings to gather requirements and provide technical insights",
                      ],
                    },
                    {
                      title: "Junior Web Developer",
                      company: "Digital Agency, New York",
                      period: "Jun 2016 - Feb 2018",
                      achievements: [
                        "Built responsive websites for clients across various industries using HTML, CSS, and JavaScript",
                        "Created custom WordPress themes and plugins to meet specific client requirements",
                        "Collaborated with designers to implement pixel-perfect designs",
                        "Maintained and updated existing client websites, ensuring compatibility with modern browsers",
                        "Assisted in troubleshooting and resolving technical issues for clients",
                      ],
                    },
                  ].map((job, jobIndex) => (
                    <AnimatedSection key={job.title} animation="fade-up">
                      <div className="transform transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-md text-sm font-medium border border-teal-200 mt-2 md:mt-0">
                            {job.period}
                          </div>
                        </div>
                        <p className="text-teal-600 font-medium mb-3">{job.company}</p>
                        <ul className="list-none space-y-2 text-gray-700">
                          {job.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="inline-block w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection animation="fade-up">
            <section>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-teal-100 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-teal-100 flex items-center">
                  <span className="inline-block w-2 h-6 bg-gradient-to-b from-teal-400 to-cyan-500 mr-3 rounded-full"></span>
                  Education & Certifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <AnimatedSection animation="slide-right">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="inline-block w-1.5 h-4 bg-teal-500 mr-2 rounded-full"></span>
                        Education
                      </h3>
                    </AnimatedSection>

                    <div className="space-y-6">
                      {[
                        {
                          degree: "Bachelor of Science in Computer Science",
                          institution: "University of Technology",
                          period: "2012 - 2016",
                          details: "Graduated with honors. Specialized in Software Engineering and Web Technologies.",
                        },
                        {
                          degree: "Web Development Bootcamp",
                          institution: "Code Academy",
                          period: "2016",
                          details:
                            "Intensive 12-week program focused on modern web development technologies and practices.",
                        },
                      ].map((edu, index) => (
                        <AnimatedSection key={edu.degree} animation="scale-up">
                          <div className="transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 p-4 rounded-md border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                              <div>
                                <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                                <p className="text-teal-600">{edu.institution}</p>
                              </div>
                              <span className="text-sm bg-white px-2 py-0.5 rounded-md text-teal-700 border border-teal-100 mt-2 sm:mt-0 inline-block">
                                {edu.period}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{edu.details}</p>
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>

                  <div>
                    <AnimatedSection animation="slide-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="inline-block w-1.5 h-4 bg-cyan-500 mr-2 rounded-full"></span>
                        Certifications
                      </h3>
                    </AnimatedSection>

                    <div className="space-y-4">
                      {[
                        {
                          name: "AWS Certified Developer - Associate",
                          date: "Issued: Jan 2022 • Expires: Jan 2025",
                        },
                        {
                          name: "MongoDB Certified Developer",
                          date: "Issued: Mar 2021 • No Expiration",
                        },
                        {
                          name: "Google Professional Cloud Developer",
                          date: "Issued: Sep 2020 • Expires: Sep 2023",
                        },
                      ].map((cert, index) => (
                        <AnimatedSection key={cert.name} animation="scale-up">
                          <div className="p-4 rounded-md transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
                                {cert.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{cert.name}</h4>
                                <p className="text-sm text-gray-500">{cert.date}</p>
                              </div>
                            </div>
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
        </div>

        <footer className="mt-16 text-center text-teal-700 py-6">
          <AnimatedSection animation="fade-in">
            <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </AnimatedSection>
        </footer>
      </div>
    </div>
  )
}
