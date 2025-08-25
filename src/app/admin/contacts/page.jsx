"use client"

import { useState } from "react"

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  // Mock data - replace with actual data fetching
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Solutions Inc.",
      subject: "Web Development Project",
      message:
        "Hi, I'm interested in developing a modern e-commerce platform for my business. Could we discuss the requirements and timeline?",
      status: "pending",
      priority: "high",
      submittedDate: "2024-01-20",
      lastUpdated: "2024-01-20",
      budget: "$10,000 - $25,000",
      timeline: "3-4 months",
      projectType: "web-development",
      source: "website",
      notes: "",
      responses: [],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@designstudio.com",
      phone: "+1 (555) 987-6543",
      company: "Creative Design Studio",
      subject: "Mobile App UI/UX Design",
      message:
        "We need a talented designer for our mobile banking app. The project involves creating user-friendly interfaces and smooth user experience flows.",
      status: "approved",
      priority: "medium",
      submittedDate: "2024-01-18",
      lastUpdated: "2024-01-19",
      budget: "$5,000 - $15,000",
      timeline: "2-3 months",
      projectType: "ui-ux",
      source: "referral",
      notes: "Client approved. Project kickoff scheduled for next week.",
      responses: [
        {
          id: 1,
          message:
            "Thank you for your interest! I'd love to discuss your mobile banking app project. Let's schedule a call to go over the requirements.",
          sentDate: "2024-01-19",
          sentBy: "Admin",
        },
      ],
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@startupventure.com",
      phone: "+1 (555) 456-7890",
      company: "Startup Venture",
      subject: "Full-Stack Development",
      message:
        "Looking for a full-stack developer to build our SaaS platform from scratch. We have detailed wireframes and requirements ready.",
      status: "in-review",
      priority: "high",
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-17",
      budget: "$25,000+",
      timeline: "4-6 months",
      projectType: "web-development",
      source: "linkedin",
      notes: "Promising project. Waiting for detailed requirements document.",
      responses: [],
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@nonprofit.org",
      phone: "+1 (555) 321-0987",
      company: "Community Nonprofit",
      subject: "Website Redesign",
      message:
        "Our nonprofit organization needs a website redesign to better showcase our mission and make it easier for people to donate and volunteer.",
      status: "completed",
      priority: "low",
      submittedDate: "2024-01-10",
      lastUpdated: "2024-01-15",
      budget: "$2,000 - $5,000",
      timeline: "1-2 months",
      projectType: "web-design",
      source: "website",
      notes: "Project completed successfully. Client very satisfied.",
      responses: [
        {
          id: 1,
          message:
            "I'd be happy to help with your nonprofit website redesign. Let's discuss your goals and requirements.",
          sentDate: "2024-01-11",
          sentBy: "Admin",
        },
        {
          id: 2,
          message: "Project completed! The new website is live and ready. Thank you for choosing our services.",
          sentDate: "2024-01-15",
          sentBy: "Admin",
        },
      ],
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "alex@techcorp.com",
      phone: "+1 (555) 654-3210",
      company: "TechCorp Solutions",
      subject: "React Native App Development",
      message:
        "We need to develop a cross-platform mobile app for our logistics business. The app should handle real-time tracking and inventory management.",
      status: "rejected",
      priority: "medium",
      submittedDate: "2024-01-12",
      lastUpdated: "2024-01-14",
      budget: "$15,000 - $30,000",
      timeline: "3-5 months",
      projectType: "mobile-development",
      source: "website",
      notes: "Timeline doesn't align with current availability.",
      responses: [
        {
          id: 1,
          message:
            "Thank you for your interest. Unfortunately, I'm not available for this timeline. I'd recommend reaching out again in Q2.",
          sentDate: "2024-01-14",
          sentBy: "Admin",
        },
      ],
    },
  ])

  const statuses = [
    { value: "all", label: "All Status", count: contacts.length },
    { value: "pending", label: "Pending", count: contacts.filter((c) => c.status === "pending").length },
    { value: "in-review", label: "In Review", count: contacts.filter((c) => c.status === "in-review").length },
    { value: "approved", label: "Approved", count: contacts.filter((c) => c.status === "approved").length },
    { value: "rejected", label: "Rejected", count: contacts.filter((c) => c.status === "rejected").length },
    { value: "completed", label: "Completed", count: contacts.filter((c) => c.status === "completed").length },
  ]

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || contact.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusChange = (contactId, newStatus) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] }
          : contact,
      ),
    )
  }

  const handleAddResponse = (contactId, responseMessage) => {
    const newResponse = {
      id: Date.now(),
      message: responseMessage,
      sentDate: new Date().toISOString().split("T")[0],
      sentBy: "Admin",
    }

    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              responses: [...contact.responses, newResponse],
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : contact,
      ),
    )
  }

  const handleUpdateNotes = (contactId, notes) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, notes, lastUpdated: new Date().toISOString().split("T")[0] } : contact,
      ),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Contact Applications</h1>
            <p className="text-emerald-600 mt-1">Track and manage all contact inquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-emerald-600">
              <span className="font-medium">{filteredContacts.length}</span> of{" "}
              <span className="font-medium">{contacts.length}</span> applications
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`p-4 rounded-xl border transition-all ${
              selectedStatus === status.value
                ? "border-emerald-300 bg-emerald-50 shadow-sm"
                : "border-emerald-100 bg-white hover:bg-emerald-50"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-800">{status.count}</p>
              <p className="text-sm text-emerald-600 mt-1">{status.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Search Applications</label>
            <input
              type="text"
              placeholder="Search by name, email, subject, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-emerald-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-emerald-800">{contact.name}</p>
                      <p className="text-sm text-emerald-600">{contact.email}</p>
                      <p className="text-sm text-emerald-500">{contact.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-emerald-800 line-clamp-1">{contact.subject}</p>
                    <p className="text-sm text-emerald-600 line-clamp-2">{contact.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(contact.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-review">In Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}
                    >
                      {contact.priority.charAt(0).toUpperCase() + contact.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-emerald-600">{contact.budget}</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">{contact.submittedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setShowDetailsModal(true)
                        }}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setShowResponseModal(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Send Response"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showDetailsModal && selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedContact(null)
          }}
          onUpdateNotes={handleUpdateNotes}
        />
      )}

      {/* Response Modal */}
      {showResponseModal && selectedContact && (
        <ResponseModal
          contact={selectedContact}
          onClose={() => {
            setShowResponseModal(false)
            setSelectedContact(null)
          }}
          onSendResponse={handleAddResponse}
        />
      )}
    </div>
  )
}

function ContactDetailsModal({ contact, onClose, onUpdateNotes }) {
  const [notes, setNotes] = useState(contact.notes)

  const handleSaveNotes = () => {
    onUpdateNotes(contact.id, notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">Contact Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-emerald-700">Name</label>
                  <p className="text-emerald-800">{contact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Email</label>
                  <p className="text-emerald-800">{contact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Phone</label>
                  <p className="text-emerald-800">{contact.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Company</label>
                  <p className="text-emerald-800">{contact.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-emerald-700">Budget</label>
                  <p className="text-emerald-800">{contact.budget}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Timeline</label>
                  <p className="text-emerald-800">{contact.timeline}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Project Type</label>
                  <p className="text-emerald-800">
                    {contact.projectType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Source</label>
                  <p className="text-emerald-800">{contact.source.charAt(0).toUpperCase() + contact.source.slice(1)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">Message</h3>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-800">{contact.message}</p>
            </div>
          </div>

          {/* Responses */}
          {contact.responses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Response History</h3>
              <div className="space-y-3">
                {contact.responses.map((response) => (
                  <div key={response.id} className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">{response.sentBy}</span>
                      <span className="text-sm text-blue-600">{response.sentDate}</span>
                    </div>
                    <p className="text-blue-800">{response.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">Internal Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this contact..."
              rows={4}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNotes}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResponseModal({ contact, onClose, onSendResponse }) {
  const [responseMessage, setResponseMessage] = useState("")

  const handleSendResponse = () => {
    if (responseMessage.trim()) {
      onSendResponse(contact.id, responseMessage.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">Send Response</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-emerald-600 mb-2">
              Responding to: <span className="font-medium">{contact.name}</span> ({contact.email})
            </p>
            <p className="text-sm text-emerald-600">
              Subject: <span className="font-medium">{contact.subject}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Your Response</label>
            <textarea
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Type your response here..."
              rows={6}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendResponse}
              disabled={!responseMessage.trim()}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Response
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
