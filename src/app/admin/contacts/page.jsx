"use client"

import { useState, useEffect } from "react"

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/admin/contacts")
        const data = await response.json()
        if (data.success) {
          setContacts(data.data || [])
        } else {
          setError(data.error || "Failed to fetch contacts")
        }
      } catch (err) {
        setError("Error fetching contacts: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

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
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.serviceInterestedIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || contact.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId
              ? { ...contact, status: newStatus, updatedAt: new Date().toISOString() }
              : contact
          )
        )
      } else {
        alert(data.error || "Failed to update status")
      }
    } catch (err) {
      alert("Error updating status: " + err.message)
    }
  }

  const handlePriorityChange = async (contactId, newPriority) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      })
      const data = await response.json()
      if (data.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId
              ? { ...contact, priority: newPriority, updatedAt: new Date().toISOString() }
              : contact
          )
        )
      } else {
        alert(data.error || "Failed to update priority")
      }
    } catch (err) {
      alert("Error updating priority: " + err.message)
    }
  }

  const handleAddResponse = async (contactId, responseMessage) => {
    try {
      const newResponse = {
        message: responseMessage,
        sentDate: new Date().toISOString().split("T")[0],
        sentBy: "Admin",
      }
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: newResponse }),
      })
      const data = await response.json()
      if (data.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId
              ? {
                  ...contact,
                  responses: [...contact.responses, { ...newResponse, _id: Date.now() }],
                  updatedAt: new Date().toISOString(),
                }
              : contact
          )
        )
        alert("Response sent successfully and email delivered!")
      } else {
        alert(data.error || "Failed to add response")
      }
    } catch (err) {
      alert("Error adding response: " + err.message)
    }
  }

  const handleUpdateNotes = async (contactId, notes) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      })
      const data = await response.json()
      if (data.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId
              ? { ...contact, notes, updatedAt: new Date().toISOString() }
              : contact
          )
        )
      } else {
        alert(data.error || "Failed to update notes")
      }
    } catch (err) {
      alert("Error updating notes: " + err.message)
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
          method: "DELETE",
        })
        const data = await response.json()
        if (data.success) {
          setContacts(contacts.filter((c) => c._id !== contactId))
        } else {
          alert(data.error || "Failed to delete contact")
        }
      } catch (err) {
        alert("Error deleting contact: " + err.message)
      }
    }
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

  if (loading) {
    return (
      <div className="text-center p-8 text-emerald-600 animate-pulse">
        Loading contacts...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    )
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
              placeholder="Search by name, email, service, or company..."
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {filteredContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-emerald-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-emerald-800">{contact.fullName}</p>
                      <p className="text-sm text-emerald-600">{contact.email}</p>
                      <p className="text-sm text-emerald-500">{contact.companyName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-emerald-800 line-clamp-1">{contact.serviceInterestedIn}</p>
                    <p className="text-sm text-emerald-600 line-clamp-2">{contact.projectDetails}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
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
                    <select
                      value={contact.priority}
                      onChange={(e) => handlePriorityChange(contact._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getPriorityColor(contact.priority)}`}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-emerald-600">{contact.projectBudget}</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">{new Date(contact.createdAt).toISOString().split("T")[0]}</td>
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
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Contact"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M5 7h14"
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
    onUpdateNotes(contact._id, notes)
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
                  <p className="text-emerald-800">{contact.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Email</label>
                  <p className="text-emerald-800">{contact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Phone</label>
                  <p className="text-emerald-800">{contact.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Company</label>
                  <p className="text-emerald-800">{contact.companyName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-emerald-700">Budget</label>
                  <p className="text-emerald-800">{contact.projectBudget}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Service</label>
                  <p className="text-emerald-800">
                    {contact.serviceInterestedIn.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
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
              <p className="text-emerald-800">{contact.projectDetails}</p>
            </div>
          </div>

          {/* Responses */}
          {contact.responses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Response History</h3>
              <div className="space-y-3">
                {contact.responses.map((response) => (
                  <div key={response._id} className="bg-blue-50 p-4 rounded-lg">
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
      onSendResponse(contact._id, responseMessage.trim())
      setResponseMessage("")
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
              Responding to: <span className="font-medium">{contact.fullName}</span> ({contact.email})
            </p>
            <p className="text-sm text-emerald-600">
              Service: <span className="font-medium">{contact.serviceInterestedIn}</span>
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