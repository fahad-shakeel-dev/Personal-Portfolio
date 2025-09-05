import Image from "next/image"

export function ServiceHeader({ service }) {
  return (
    <div className="mb-16">
      <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6">
            <div className="text-teal-600">{service.icon}</div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">{service.description}</p>
        </div>
        <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={service.image }
            alt={service.title}
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  )
}
