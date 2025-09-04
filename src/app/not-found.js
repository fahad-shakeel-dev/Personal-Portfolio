"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4 sm:px-6">
      <div className="text-center relative max-w-xl mx-auto">
        {/* Floating gradient circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-44 sm:w-56 h-44 sm:h-56 bg-gradient-to-tr from-cyan-200/40 to-emerald-200/40 rounded-full blur-3xl"
          animate={{ y: [0, -25, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        {/* 404 number */}
        <motion.h1
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          The page you are looking for might have been moved or deleted.
          Let&apos;s get you back home safely.
        </motion.p>

        {/* Back Home Button (Centered) */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-base sm:text-lg md:text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl transition-transform hover:scale-105">
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
