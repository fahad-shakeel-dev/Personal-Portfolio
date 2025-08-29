import Link from "next/link"
import { ChevronRight, MessageCircle } from "lucide-react"

export function ServiceCTA({ service }) {
  return (
    <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 rounded-3xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s work together to create a tailored {service.title.toLowerCase()} solution that meets your business needs
          and helps you achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
          >
            <span>Schedule Consultation</span>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <span>Explore Other Services</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
