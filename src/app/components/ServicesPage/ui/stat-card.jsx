export function StatCard({ stat }) {
  return (
    <div className="stat-item bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center group hover:shadow-lg hover:border-teal-200 transition-all duration-300">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
        {stat.value}
      </div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  )
}
