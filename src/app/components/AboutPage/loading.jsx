export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
      <div className="bg-white/90 shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading profile...</h2>
          <p className="mt-2 text-gray-500 text-center">Please wait while we prepare the content for you.</p>
        </div>
      </div>
    </div>
  )
}
