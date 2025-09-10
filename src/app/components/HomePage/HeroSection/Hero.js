

"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Counter from "./SubComponents/Counter/Counter"

const decorativeDots = Array(6).fill("")
const avatars = [
  "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar2_byyu3g.png",
  "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar7_hqclp5.png",
  "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png",
]

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [averageRating, setAverageRating] = useState("4.9") // Fallback rating
  const [loadingRating, setLoadingRating] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  // Typing effect for name
  const text = "Fahad Joyia"
  let currentIndex = 0

  const interval = setInterval(() => {
    if (currentIndex <= text.length) {
      setDisplayedText(text.slice(0, currentIndex))
      currentIndex++
    } else {
      clearInterval(interval)
      setShowCursor(false)
    }
  }, 200)

  const cursorInterval = setInterval(() => {
    setShowCursor((prev) => !prev)
  }, 800)

  // Fetch reviews for average rating with robust error handling
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/admin/reviews")
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("Reviews endpoint not found (404). Using default rating of 4.9.")
          setAverageRating("4.9")
        } else {
          const text = await response.text() // Log raw response for debugging
          console.error("Non-200 response:", response.status, text)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } else {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const { success, data } = await response.json()
          if (success && data?.length > 0) {
            const avg = (data.reduce((sum, review) => sum + (review.rating || 0), 0) / data.length).toFixed(1)
            setAverageRating(avg)
          } else {
            setAverageRating("4.9") // Fallback if no data or success is false
          }
        } else {
          const text = await response.text() // Log raw response for debugging
          console.warn("Response is not JSON:", text)
          setAverageRating("4.9") // Fallback for non-JSON responses (e.g., HTML)
        }
      }
    } catch (err) {
      console.error("Error fetching reviews:", err)
      setError("Failed to load rating")
      setAverageRating("4.9") // Ensure fallback rating on any error
    } finally {
      setLoadingRating(false)
    }
  }

  fetchReviews()

  return () => {
    clearInterval(interval)
    clearInterval(cursorInterval)
  }
}, [])

  return (
    <section className="flex items-center pt-16 bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
      <div className="w-full max-w-[1300px] lg:my-0 my-5 mx-auto px-4">
        <style jsx>{`
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .slide-up {
            opacity: 0;
            transform: translateY(20px);
            animation: slideUp 0.5s ease-out forwards;
          }
          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .slide-right {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideRight 0.5s ease-out forwards;
          }
          @keyframes slideRight {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .scale-in {
            transform: scale(0);
            animation: scaleIn 0.3s ease-out forwards;
          }
          @keyframes scaleIn {
            to { transform: scale(1); }
          }
          .btn-hover {
            transition: transform 0.2s ease-out;
          }
          .btn-hover:hover {
            transform: scale(1.05);
          }
          .btn-hover:active {
            transform: scale(0.95);
          }
          .icon-hover {
            transition: transform 0.2s ease-out, color 0.2s;
          }
          .icon-hover:hover {
            transform: translateY(-5px);
          }
          .icon-hover:active {
            transform: scale(0.95);
          }
          .image-hover {
            transition: transform 0.3s ease-out;
          }
          .image-hover:hover {
            transform: scale(1.05);
          }
          .rotate {
            animation: rotate 8s linear forwards;
          }
          @keyframes rotate {
            to { transform: rotate(360deg); }
          }
          .pulse {
            animation: pulse 3s ease-in-out forwards;
          }
          @keyframes pulse {
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .float {
            animation: float 4s ease-in-out forwards;
          }
          @keyframes float {
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .arrow {
            transition: transform 0.2s ease-out;
          }
          .btn-hover:hover .arrow {
            transform: translateX(4px);
          }
          .cursor {
            animation: blink 0.8s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
          @media (max-width: 640px) {
            .image-container {
              max-width: 70vw !important;
            }
          }
          @media (min-width: 640px) and (max-width: 1024px) {
            .image-container {
              max-width: 50vw !important;
            }
          }
               @media (max-width: 769px) {
          .force-small {
            font-size: 18px !important;
          }
               @media (max-width: 769px) {
          .force-large {
            font-size: 2.8rem !important;
          }
        }
               @media (max-width: 640px) {
          .count-small {
            font-size: 1.5rem !important;
          }
          .count-small-p {
            font-size: .65rem !important;
          }
        }
        `}</style>

        <div className="grid lg:grid-cols-2 mt-5 lg:mt-10 pb-6 gap-8 lg:ml-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-2 sm:gap-3">
              {decorativeDots.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 mt-5 lg:mt-0 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 scale-in"
      
                  // className="w-2 h-2 rounded-full bg-emerald-500 scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h2 
              className="text-lg sm:text-xl mb-1 sm:mb-3 text-emerald-800 slide-up  force-small" style={{ animationDelay: "0.2s" }}>
                Hi! I Am
                
              </h2>
              <h1 className="text-9xl sm:text-9xl md:text-6xl lg:text-7xl font-bold text-teal-900 fade-in force-large">
                {displayedText}
                <span className={showCursor ? "cursor" : ""}>|</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 slide-right" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-[2px] bg-emerald-500" />
              <span className="text-sm sm:text-base text-teal-700">Creative Developer</span>
            </div>

            <div
              className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-emerald-200 fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900 count-small">
                  <Counter from={0} to={4} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700 count-small-p">Years of Experience</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900 count-small">
                  <Counter from={0} to={20} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700 count-small-p">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900 count-small">
                  <Counter from={0} to={18} />+
                </h3>
                <p className="text-xs sm:text-sm text-teal-700 count-small-p">Happy Clients</p>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <a
                href="/Fahad's-Cv.pdf"
                download="/Fahad's-Cv.pdf"
                style={{ cursor: "pointer" }}
                className="group flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full btn-hover text-sm sm:text-base"
              >
                Download CV
                <ArrowRight className="ml-2 mt-1 h-4 w-4 arrow" />
              </a>
              {/* <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <a key={index} href="#" className="text-emerald-600 hover:text-emerald-800 icon-hover">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div> */}
              <div className="flex gap-4">
  {/* GitHub */}
  <a
    href="https://github.com/fahad-shakeel-dev"
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-600 hover:text-emerald-800 icon-hover"
  >
    <Github className="h-5 w-5" />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/muhammad-fahad-shakeel-69569a371/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-600 hover:text-emerald-800 icon-hover"
  >
    <Linkedin className="h-5 w-5" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/its_fahadjoyia/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-600 hover:text-emerald-800 icon-hover"
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
          </div>

          <div className="relative fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="relative w-full aspect-square max-w-[78vw] sm:max-w-md image-container mx-auto">
              <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 border-4 border-emerald-500 rounded-full rotate" />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 border-4 border-teal-300 rounded-full pulse" />

              <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl image-hover">
                <Image src="/images/hero.png" alt="Profile" width={500} height={500} className="object-cover" />
              </div>

              <div className="absolute top-10 -right-10 bg-white rounded-2xl shadow-xl p-3 sm:p-4 float">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {avatars.map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt={`Client avatar ${i + 1}`}
                        width={32}
                        height={32}
                        className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <h4 className="font-semibold text-emerald-800">
                      {loadingRating ? "Loading..." : error ? "4.9" : averageRating}/5.0
                    </h4>
                    <p className="text-xs text-teal-600">Client Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}