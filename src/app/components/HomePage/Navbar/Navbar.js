'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' }
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : ''
      }`}
    >
      <div className="w-full max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600 transition-transform hover:scale-105 active:scale-95"
          >
            FJ.
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-teal-700 hover:text-emerald-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors">
       
              Hire Me
          
            </Link>
          </div>

          <button
            className="md:hidden text-emerald-600 z-50 transition-transform hover:scale-110 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-white" /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 bg-emerald-800 flex flex-col items-center justify-center
          transition-all duration-500 ease-in-out
          overflow-hidden z-40
          ${isMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center space-y-8 transition-opacity duration-500">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-bold text-white hover:text-emerald-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex space-x-6 mt-8">
            {[Github, Linkedin, Twitter].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-white hover:text-emerald-200 transition-colors hover:scale-110"
              >
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
