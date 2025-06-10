export function ProcessStep({ step, index }) {
  return (
    <div className="process-step bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Step Number */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
        {step.number}
      </div>

      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
        <div className="text-teal-600">{step.icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        {step.description.map((item, i) => (
          <li key={i} className="flex items-start">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
