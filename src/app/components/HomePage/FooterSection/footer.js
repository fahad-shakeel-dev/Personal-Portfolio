

"use client"

import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-teal-900 text-white py-16">
      <div className="mx-auto px-4 max-w-[1300px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold animate-fade-in">FJ.</h2>
            <p className="text-teal-200 animate-fade-in">
              Creative developer crafting innovative digital experiences with passion.
            </p>
            {/* <div className="flex space-x-4 animate-fade-in">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}

            </div> */}
            <div className="flex space-x-4 animate-fade-in">
  {/* GitHub */}
  <a
    href="https://github.com/fahad-shakeel-dev"
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <Github className="h-5 w-5" />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/muhammad-fahad-shakeel-69569a371/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <Linkedin className="h-5 w-5" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/its_fahadjoyia/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  </a>
</div>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Quick Links</h3>
            <ul className="space-y-2 animate-fade-in">
              {["About", "Services", "Portfolio", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href="/contact"
                    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 inline-block cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Contact Info</h3>
            <ul className="space-y-3 animate-fade-in">
              <li className="flex items-center space-x-2 cursor-pointer">
                <Mail className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">fahad.shakeel.dev@mail.com</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer">
                <Phone className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">03707140829</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer">
                <MapPin className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Why Choose Me */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white animate-pulse">
              Why Choose Me?
            </h3>
            <ul className="text-teal-200 list-disc list-inside space-y-2">
              <li className="transition duration-300 ease-in-out hover:text-teal-400 hover:translate-x-2 cursor-pointer">
                Clean and maintainable code
              </li>
              <li className="transition duration-300 ease-in-out hover:text-teal-400 hover:translate-x-2 cursor-pointer">
                Modern design with responsive layouts
              </li>
              <li className="transition duration-300 ease-in-out hover:text-teal-400 hover:translate-x-2 cursor-pointer">
                Focus on performance and scalability
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-teal-800 text-center text-teal-200 animate-fade-in">
          <p>© {currentYear} VersaNex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
