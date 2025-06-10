export function ServiceStats({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Performance Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {service.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-lg hover:border-teal-200 transition-all duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
