import Image from "next/image"

export function ServiceCaseStudies({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {service.caseStudies.map((caseStudy, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-300"
          >
            <div className="relative h-48">
              <Image src={caseStudy.image || "/placeholder.svg"} alt={caseStudy.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{caseStudy.title}</h3>
              <p className="text-gray-700">{caseStudy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
