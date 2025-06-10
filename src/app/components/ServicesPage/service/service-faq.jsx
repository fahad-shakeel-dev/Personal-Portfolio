import { MessageSquare } from "lucide-react"

export function ServiceFAQ({ service }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {service.faq.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg flex items-center justify-center mr-3">
                <MessageSquare className="w-4 h-4 text-teal-600" />
              </div>
              {item.question}
            </h3>
            <p className="text-gray-700 leading-relaxed ml-11">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
