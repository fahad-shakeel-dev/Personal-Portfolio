import { CheckCircle, Settings } from "lucide-react"

export function ServiceFeatures({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Key Features</h3>
          </div>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center mr-4">
              <Settings className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Technologies</h3>
          </div>
          <ul className="space-y-3">
            {service.technologies.map((tech, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
