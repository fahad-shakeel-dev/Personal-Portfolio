"use client"

import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-teal-900 text-white py-16">
      <div className="mx-auto px-4 max-w-[1300px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold animate-fade-in">JD.</h2>
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold animate-fade-in">Quick Links</h3>
            <ul className="space-y-2 animate-fade-in">
              {["About", "Services", "Portfolio", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-teal-200 hover:text-white transform hover:-translate-y-1 transition-all duration-300 inline-block"
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
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">
                  hello@johndoe.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">
                  +1 234 567 890
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-teal-200" />
                <span className="text-teal-200 hover:text-white transition-colors">
                  New York, USA
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
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

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-teal-800 text-center text-teal-200 animate-fade-in">
          <p>© {currentYear} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}