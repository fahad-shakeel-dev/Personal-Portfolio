import { Award } from "lucide-react"

export function ServiceBenefits({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start hover:shadow-lg hover:border-teal-200 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <Award className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-gray-700">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
