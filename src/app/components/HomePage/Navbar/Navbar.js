// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Menu, X, Github, Linkedin, Twitter, ChevronDown } from "lucide-react"
// import Link from "next/link"
// import { useRouter, usePathname } from "next/navigation"

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
//   const [isAccountOpen, setIsAccountOpen] = useState(false)
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     typeof window !== 'undefined' && localStorage.getItem('authStatus') === 'true'
//   )
//   const [user, setUser] = useState(null) // Store user details
//   const portfolioRef = useRef(null)
//   const accountRef = useRef(null)
//   const router = useRouter()
//   const pathname = usePathname()

//   const checkAuth = async () => {
//     try {
//       let res = await fetch('/api/auth/check', { credentials: 'include' })
//       if (res.ok) {
//         const data = await res.json()
//         setIsAuthenticated(true)
//         setUser(data.user) // Store user details
//         localStorage.setItem('authStatus', 'true')
//       } else {
//         // Try refreshing token if verification fails
//         const refreshRes = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
//         if (refreshRes.ok) {
//           // Retry verification after refresh
//           res = await fetch('/api/auth/check', { credentials: 'include' })
//           if (res.ok) {
//             const data = await res.json()
//             setIsAuthenticated(true)
//             setUser(data.user)
//             localStorage.setItem('authStatus', 'true')
//           } else {
//             setIsAuthenticated(false)
//             setUser(null)
//             localStorage.setItem('authStatus', 'false')
//           }
//         } else {
//           setIsAuthenticated(false)
//           setUser(null)
//           localStorage.setItem('authStatus', 'false')
//         }
//       }
//     } catch (error) {
//       console.error('Auth check error:', error)
//       setIsAuthenticated(false)
//       setUser(null)
//       localStorage.setItem('authStatus', 'false')
//     }
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }

//     const handleOutsideClick = (event) => {
//       if (portfolioRef.current && !portfolioRef.current.contains(event.target)) {
//         setIsPortfolioOpen(false)
//       }
//       if (accountRef.current && !accountRef.current.contains(event.target)) {
//         setIsAccountOpen(false)
//       }
//     }

//     // Initial auth check and on route change
//     checkAuth()

//     window.addEventListener("scroll", handleScroll)
//     document.addEventListener("mousedown", handleOutsideClick)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//       document.removeEventListener("mousedown", handleOutsideClick)
//     }
//   }, [pathname])

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden'
//       document.body.style.position = 'fixed'
//       document.body.style.width = '100%'
//     } else {
//       document.body.style.overflow = 'auto'
//       document.body.style.position = ''
//       document.body.style.width = ''
//     }
//   }, [isMenuOpen])

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
//       if (res.ok) {
//         setIsAuthenticated(false)
//         setUser(null)
//         localStorage.removeItem('authStatus')
//         router.push('/login')
//       } else {
//         const data = await res.json()
//         console.error('Logout failed:', data.message)
//       }
//     } catch (error) {
//       console.error('Logout error:', error)
//     }
//   }

//   const menuItems = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/services", label: "Services" },
//     {
//       href: "/portfolio",
//       label: "Portfolio",
//       subItems: [
//         { href: "/projects", label: "Projects" },
//         { href: "/testimonials", label: "Testimonials" },
//         { href: "/services/seo", label: "SEO" },
//         { href: "/services/video-editing", label: "Video Editing" },
//         { href: "/services/website-development", label: "Web Development" },
//         { href: "/services/content-creation", label: "Content Creation" },
//       ],
//     },
//     { href: "/contact", label: "Contact" },
//   ]

//   const socialLinks = [
//     { icon: Github, href: "#", label: "GitHub" },
//     { icon: Linkedin, href: "#", label: "LinkedIn" },
//     { icon: Twitter, href: "#", label: "Twitter" },
//   ]

//   const togglePortfolio = (e) => {
//     e.preventDefault()
//     setIsPortfolioOpen((prev) => !prev)
//   }

//   const toggleAccount = (e) => {
//     e.preventDefault()
//     setIsAccountOpen((prev) => !prev)
//   }

//   return (
//     <>
//       <nav
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"
//         }`}
//       >
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <Link
//               href="/"
//               className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 logoLink"
//             >
//               FJ.
//             </Link>

//             <div className="hidden lg:flex items-center space-x-8">
//               {menuItems.map((item) => (
//                 <div key={item.href} className="relative" ref={item.label === "Portfolio" ? portfolioRef : null}>
//                   {item.subItems ? (
//                     <div className="group">
//                       <button
//                         className={`font-medium transition-colors duration-300 hover:text-emerald-600 flex items-center ${
//                           scrolled ? "text-gray-700" : "text-gray-800"
//                         }`}
//                         onClick={togglePortfolio}
//                       >
//                         {item.label}
//                         <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isPortfolioOpen ? 'rotate-180' : ''}`} />
//                       </button>
//                       <div
//                         className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
//                           isPortfolioOpen 
//                             ? "opacity-100 scale-y-100 visible" 
//                             : "opacity-0 scale-y-95 invisible"
//                         }`}
//                       >
//                         {item.subItems.map((subItem) => (
//                           <Link
//                             key={subItem.href}
//                             href={subItem.href}
//                             className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
//                             onClick={() => setIsPortfolioOpen(false)}
//                           >
//                             {subItem.label}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link
//                       href={item.href}
//                       className={`font-medium transition-colors duration-300 hover:text-emerald-600 ${
//                         scrolled ? "text-gray-700" : "text-gray-800"
//                       }`}
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}

//               <div className="relative" ref={accountRef}>
//                 {isAuthenticated ? (
//                   <button
//                     onClick={handleLogout}
//                     style={{cursor:"pointer"}}
//                     className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <div className="group">
//                     <button
//                       className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center"
//                       onClick={toggleAccount}
//                     >
//                       Account
//                       <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`} />
//                     </button>
//                     <div
//                       className={`absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
//                         isAccountOpen 
//                           ? "opacity-100 scale-y-100 visible" 
//                           : "opacity-0 scale-y-95 invisible"
//                       }`}
//                     >
//                       <Link
//                         href="/login"
//                         className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
//                         onClick={() => setIsAccountOpen(false)}
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         href="/signup"
//                         className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
//                         onClick={() => setIsAccountOpen(false)}
//                       >
//                         Signup
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-300"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div
//         className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
//           isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         style={{ backdropFilter: isMenuOpen ? "blur(5px)" : "none" }}
//         onClick={() => {
//           setIsMenuOpen(false)
//           setIsPortfolioOpen(false)
//           setIsAccountOpen(false)
//         }}
//       />

//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ overflowY: 'auto' }}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <Link
//               href="/"
//               className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               FJ.
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(false)}
//               className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
//               aria-label="Close menu"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="flex-1 py-8">
//             <nav className="space-y-2 px-6">
//               {menuItems.map((item) => (
//                 <div key={item.href} ref={item.label === "Portfolio" ? portfolioRef : null}>
//                   {item.subItems ? (
//                     <div>
//                       <button
//                         className="w-full flex justify-between items-center py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
//                         onClick={togglePortfolio}
//                       >
//                         {item.label}
//                         <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isPortfolioOpen ? "rotate-180" : ""}`} />
//                       </button>
//                       <div
//                         className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
//                           isPortfolioOpen 
//                             ? "opacity-100 max-h-[1000px]" 
//                             : "opacity-0 max-h-0"
//                         }`}
//                         style={{ transitionProperty: 'opacity, max-height' }}
//                       >
//                         {item.subItems.map((subItem) => (
//                           <Link
//                             key={subItem.href}
//                             href={subItem.href}
//                             className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
//                             onClick={() => {
//                               setIsMenuOpen(false)
//                               setIsPortfolioOpen(false)
//                             }}
//                           >
//                             {subItem.label}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link
//                       href={item.href}
//                       className="block py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}

//               <div className="mt-4" ref={accountRef}>
//                 {isAuthenticated ? (
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-center py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <div>
//                     <button
//                       className="w-full flex justify-between items-center py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
//                       onClick={toggleAccount}
//                     >
//                       Account
//                       <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isAccountOpen ? "rotate-180" : ""}`} />
//                     </button>
//                     <div
//                       className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
//                         isAccountOpen 
//                           ? "opacity-100 max-h-[1000px]" 
//                           : "opacity-0 max-h-0"
//                       }`}
//                       style={{ transitionProperty: 'opacity, max-height' }}
//                     >
//                       <Link
//                         href="/login"
//                         className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
//                         onClick={() => {
//                           setIsMenuOpen(false)
//                           setIsAccountOpen(false)
//                         }}
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         href="/signup"
//                         className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
//                         onClick={() => {
//                           setIsMenuOpen(false)
//                           setIsAccountOpen(false)
//                         }}
//                       >
//                         Signup
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </nav>
//           </div>

//           <div className="p-6 border-t border-gray-100">
//             <p className="text-sm text-gray-500 mb-4">Follow me on</p>
//             <div className="flex gap-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300"
//                 >
//                   <social.icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Github, Linkedin, Twitter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== 'undefined' && localStorage.getItem('authStatus') === 'true'
  )
  const [user, setUser] = useState(null) // Store user details
  const portfolioRef = useRef(null)
  const accountRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = async () => {
    try {
      let res = await fetch('/api/auth/check', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setIsAuthenticated(true)
        setUser(data.user) // Store user details
        localStorage.setItem('authStatus', 'true')
      } else {
        // Try refreshing token if verification fails
        const refreshRes = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
        if (refreshRes.ok) {
          // Retry verification after refresh
          res = await fetch('/api/auth/check', { credentials: 'include' })
          if (res.ok) {
            const data = await res.json()
            setIsAuthenticated(true)
            setUser(data.user)
            localStorage.setItem('authStatus', 'true')
          } else {
            setIsAuthenticated(false)
            setUser(null)
            localStorage.setItem('authStatus', 'false')
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
          localStorage.setItem('authStatus', 'false')
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUser(null)
      localStorage.setItem('authStatus', 'false')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleOutsideClick = (event) => {
      if (portfolioRef.current && !portfolioRef.current.contains(event.target)) {
        setIsPortfolioOpen(false)
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false)
      }
    }

    // Initial auth check and on route change
    checkAuth()

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isMenuOpen])

  const handleLogout = async () => {
    try {
      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=").map((c) => c.trim());
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      if (res.ok) {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('authStatus')
        router.push('/')
      } else {
        const data = await res.json()
        console.error('Logout failed:', data.message)
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    {
      href: "/portfolio",
      label: "Portfolio",
      subItems: [
        { href: "/projects", label: "Projects" },
        { href: "/testimonials", label: "Testimonials" },
        { href: "/services/seo", label: "SEO" },
        { href: "/services/video-editing", label: "Video Editing" },
        { href: "/services/website-development", label: "Web Development" },
        { href: "/services/content-creation", label: "Content Creation" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  const togglePortfolio = (e) => {
    e.preventDefault()
    setIsPortfolioOpen((prev) => !prev)
  }

  const toggleAccount = (e) => {
    e.preventDefault()
    setIsAccountOpen((prev) => !prev)
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 logoLink"
            >
              FJ.
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.href} className="relative" ref={item.label === "Portfolio" ? portfolioRef : null}>
                  {item.subItems ? (
                    <div className="group">
                      <button
                        className={`font-medium transition-colors duration-300 hover:text-emerald-600 flex items-center ${
                          scrolled ? "text-gray-700" : "text-gray-800"
                        }`}
                        onClick={togglePortfolio}
                      >
                        {item.label}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isPortfolioOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
                          isPortfolioOpen 
                            ? "opacity-100 scale-y-100 visible" 
                            : "opacity-0 scale-y-95 invisible"
                        }`}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                            onClick={() => setIsPortfolioOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-300 hover:text-emerald-600 ${
                        scrolled ? "text-gray-700" : "text-gray-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="relative" ref={accountRef}>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    style={{cursor:"pointer"}}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="group">
                    <button
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center"
                      onClick={toggleAccount}
                    >
                      Account
                      <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
                        isAccountOpen 
                          ? "opacity-100 scale-y-100 visible" 
                          : "opacity-0 scale-y-95 invisible"
                      }`}
                    >
                      <Link
                        href="/login"
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        Signup
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backdropFilter: isMenuOpen ? "blur(5px)" : "none" }}
        onClick={() => {
          setIsMenuOpen(false)
          setIsPortfolioOpen(false)
          setIsAccountOpen(false)
        }}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ overflowY: 'auto' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              onClick={() => setIsMenuOpen(false)}
            >
              FJ.
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 py-8">
            <nav className="space-y-2 px-6">
              {menuItems.map((item) => (
                <div key={item.href} ref={item.label === "Portfolio" ? portfolioRef : null}>
                  {item.subItems ? (
                    <div>
                      <button
                        className="w-full flex justify-between items-center py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
                        onClick={togglePortfolio}
                      >
                        {item.label}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isPortfolioOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                          isPortfolioOpen 
                            ? "opacity-100 max-h-[1000px]" 
                            : "opacity-0 max-h-0"
                        }`}
                        style={{ transitionProperty: 'opacity, max-height' }}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
                            onClick={() => {
                              setIsMenuOpen(false)
                              setIsPortfolioOpen(false)
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-4" ref={accountRef}>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <div>
                    <button
                      className="w-full flex justify-between items-center py-3 text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4 transition-all duration-300"
                      onClick={toggleAccount}
                    >
                      Account
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isAccountOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                        isAccountOpen 
                          ? "opacity-100 max-h-[1000px]" 
                          : "opacity-0 max-h-0"
                      }`}
                      style={{ transitionProperty: 'opacity, max-height' }}
                    >
                      <Link
                        href="/login"
                        className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsAccountOpen(false)
                        }}
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block py-2 text-base text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsAccountOpen(false)
                        }}
                      >
                        Signup
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="p-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Follow me on</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}