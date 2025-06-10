export function ServiceOverview({ service }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
      <p className="text-gray-700 text-lg leading-relaxed">{service.longDescription}</p>
    </div>
  )
}
