import Image from "next/image"
import { Star } from "lucide-react"

export function ServiceTestimonials({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {service.testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-bl-full"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-100 mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-teal-500 fill-teal-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
