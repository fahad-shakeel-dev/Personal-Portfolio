import { forwardRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const ServiceCard = forwardRef(function ServiceCard({ service }, ref) {
  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 transform hover:-translate-y-1"
    >
      <Link href={`/services/${service.id}`} className="block h-full">
        <div className="p-8 h-full flex flex-col">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <div className="text-teal-600">{service.icon}</div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{service.description}</p>

          {/* CTA */}
          <div className="flex items-center text-teal-600 font-medium group">
            <span className="mr-2">Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </div>
  )
})
