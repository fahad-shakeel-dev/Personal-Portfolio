// "use client"

// import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className="bg-teal-900 text-white py-16">
//       <div className="mx-auto px-4 max-w-[1300px]">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold animate-fade-in">JD.</h2>
//             <p className="text-teal-200 animate-fade-in">
//               Creative developer crafting innovative digital experiences with passion.
//             </p>
//             <div className="flex space-x-4 animate-fade-in">
//               {[Github, Linkedin, Twitter].map((Icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <Icon className="h-5 w-5" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold animate-fade-in">Quick Links</h3>
//             <ul className="space-y-2 animate-fade-in">
//               {["About", "Services", "Portfolio", "Contact"].map((item, index) => (
//                 <li key={index}>
//                   <a
//                     href="#"
//                     className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 inline-block"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold animate-fade-in">Contact Info</h3>
//             <ul className="space-y-3 animate-fade-in">
//               <li className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4 text-teal-200" />
//                 <span className="text-teal-200 hover:text-white transition-colors">
//                   hello@johndoe.com
//                 </span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 text-teal-200" />
//                 <span className="text-teal-200 hover:text-white transition-colors">
//                   +1 234 567 890
//                 </span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4 text-teal-200" />
//                 <span className="text-teal-200 hover:text-white transition-colors">
//                   New York, USA
//                 </span>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold animate-fade-in">Newsletter</h3>
//             <form className="space-y-2 animate-fade-in">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
//               />
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-12 pt-8 border-t border-teal-800 text-center text-teal-200 animate-fade-in">
//           <p>© {currentYear} John Doe. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }















// "use client"

// import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react"
// import { useState, useEffect } from "react"

// export default function Footer() {
//   const [showScrollTop, setShowScrollTop] = useState(false)
//   const currentYear = new Date().getFullYear()

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   const footerLinks = {
//     "Quick Links": [
//       { name: "About", href: "/about" },
//       { name: "Services", href: "/services" },
//       { name: "Portfolio", href: "/portfolio" },
//       { name: "Contact", href: "/contact" },
//     ],
//     Services: [
//       { name: "Web Development", href: "/services/web" },
//       { name: "Mobile Apps", href: "/services/mobile" },
//       { name: "UI/UX Design", href: "/services/design" },
//       { name: "Consulting", href: "/services/consulting" },
//     ],
//     Resources: [
//       { name: "Blog", href: "/blog" },
//       { name: "Case Studies", href: "/case-studies" },
//       { name: "Privacy Policy", href: "/privacy" },
//       { name: "Terms of Service", href: "/terms" },
//     ],
//   }

//   const socialLinks = [
//     { icon: Github, name: "GitHub", href: "#", color: "hover:text-gray-300" },
//     { icon: Linkedin, name: "LinkedIn", href: "#", color: "hover:text-blue-400" },
//     { icon: Twitter, name: "Twitter", href: "#", color: "hover:text-blue-300" },
//     { icon: Mail, name: "Email", href: "mailto:hello@fahadjoyia.com", color: "hover:text-emerald-400" },
//   ]

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-8 relative z-10">
//         {/* Main Footer Content */}
//         <div className="py-16 lg:py-20">
//           <div className="grid lg:grid-cols-4 gap-12">
//             {/* Brand Section */}
//             <div className="lg:col-span-1 space-y-6">
//               <div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
//                   FJ.
//                 </h2>
//                 <p className="text-gray-300 leading-relaxed">
//                   Creative developer passionate about crafting exceptional digital experiences that make a difference in
//                   people's lives.
//                 </p>
//               </div>

//               {/* Contact Info */}
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 text-gray-300">
//                   <Mail className="w-4 h-4 text-emerald-400" />
//                   <span className="text-sm">hello@fahadjoyia.com</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-300">
//                   <Phone className="w-4 h-4 text-emerald-400" />
//                   <span className="text-sm">+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-300">
//                   <MapPin className="w-4 h-4 text-emerald-400" />
//                   <span className="text-sm">New York, USA</span>
//                 </div>
//               </div>

//               {/* Social Links */}
//               <div className="flex gap-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.href}
//                     aria-label={social.name}
//                     className={`p-3 bg-white/5 rounded-full border border-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color}`}
//                   >
//                     <social.icon className="w-5 h-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Footer Links */}
//             {Object.entries(footerLinks).map(([title, links]) => (
//               <div key={title} className="space-y-6">
//                 <h3 className="text-lg font-semibold text-white">{title}</h3>
//                 <ul className="space-y-3">
//                   {links.map((link, index) => (
//                     <li key={index}>
//                       <a
//                         href={link.href}
//                         className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
//                       >
//                         {link.name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Newsletter Section */}
//         <div className="py-12 border-t border-white/10">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
//               <p className="text-gray-300">
//                 Subscribe to my newsletter for the latest updates on projects, tutorials, and industry insights.
//               </p>
//             </div>
//             <div className="flex gap-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
//               />
//               <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div className="py-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2 text-gray-300 text-sm">
//               <span>© {currentYear} Fahad Joyia. Made with</span>
//               <Heart className="w-4 h-4 text-red-400 fill-current" />
//               <span>in New York</span>
//             </div>
//             <div className="flex items-center gap-6 text-sm text-gray-300">
//               <a href="/privacy" className="hover:text-emerald-400 transition-colors duration-300">
//                 Privacy Policy
//               </a>
//               <a href="/terms" className="hover:text-emerald-400 transition-colors duration-300">
//                 Terms of Service
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp className="w-5 h-5" />
//         </button>
//       )}
//     </footer>
//   )
// }





"use client"

import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-teal-900 text-white py-16">
      <div className="mx-auto px-4 max-w-[1300px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold animate-fade-in">FJ.</h2>
            <p className="text-teal-200 animate-fade-in">
              Creative developer crafting innovative digital experiences with passion.
            </p>
            <div className="flex space-x-4 animate-fade-in">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Quick Links</h3>
            <ul className="space-y-2 animate-fade-in">
              {["About", "Services", "Portfolio", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href="/contact"
                    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Contact Info</h3>
            <ul className="space-y-3 animate-fade-in">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">hello@fahadjoyia.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">New York, USA</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Newsletter</h3>
            <form className="space-y-2 animate-fade-in">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-800 text-center text-teal-200 animate-fade-in">
          <p>© {currentYear} Fahad Joyia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
