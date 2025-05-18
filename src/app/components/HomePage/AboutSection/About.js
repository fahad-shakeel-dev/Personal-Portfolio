import { DribbbleIcon as Behance, Dribbble, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="relative flex items-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 z-10 bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          {/* Image Container */}
          <div className="w-full md:w-2/5 lg:w-1/3 relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-pink-500 shadow-xl">
              <Image
                src={"/images/about.png"}
                alt="Profile"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Container */}
          <div className="w-full md:w-3/5 lg:w-2/3 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 tracking-tight">ABOUT ME</h2>

            <h3 className="text-lg md:text-xl font-semibold text-pink-600 tracking-wide">VEDANT PATEL - DESIGNER</h3>

            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo conse- quat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Behance size={24} />
                <span className="sr-only">Behance</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Dribbble size={24} />
                <span className="sr-only">Dribbble</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
