"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
  const [showReviewDetailsModal, setShowReviewDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, projectsResponse, contactsResponse, reviewsResponse] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/projects"),
          fetch("/api/admin/contacts"),
          fetch("/api/admin/reviews"),
        ]);

        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        if (!projectsResponse.ok) throw new Error("Failed to fetch projects");
        if (!contactsResponse.ok) throw new Error("Failed to fetch contacts");
        if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");

        const usersData = await usersResponse.json();
        const projectsData = await projectsResponse.json();
        const contactsData = await contactsResponse.json();
        const reviewsData = await reviewsResponse.json();

        if (usersData.success) setUsers(usersData.data || []);
        else throw new Error(usersData.error || "Failed to fetch users");
        if (projectsData.success) setProjects(projectsData.data || []);
        else throw new Error(projectsData.error || "Failed to fetch projects");
        if (contactsData.success) setContacts(contactsData.data || []);
        else throw new Error(contactsData.error || "Failed to fetch contacts");
        if (reviewsData.success) setReviews(reviewsData.data || []);
        else throw new Error(reviewsData.error || "Failed to fetch reviews");

        setError(null);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-800";
      case "approved": return "bg-green-100 text-green-800";
      case "in-review": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "completed": return "bg-emerald-100 text-emerald-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < (rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1) : 0;

  if (isLoading) {
    return <div className="text-center p-8 text-emerald-600 animate-pulse">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Dashboard Overview</h1>
        <p className="text-emerald-600">Welcome to your portfolio admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Total Users</p>
              <p className="text-3xl font-bold text-emerald-800">{users.length}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13.5 9a2.5 2.5 0 011 0" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              {users.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} new this month
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Total Projects</p>
              <p className="text-3xl font-bold text-emerald-800">{projects.length}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              {projects.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new this week
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Contact Applications</p>
              <p className="text-3xl font-bold text-emerald-800">{contacts.length}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-orange-600 text-sm font-medium">
              {contacts.filter(c => c.status === "pending").length} pending review
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Total Reviews</p>
              <p className="text-3xl font-bold text-emerald-800">{reviews.length}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">{averageRating} avg rating</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">Recent Contact Applications</h2>
          <div className="space-y-4">
            {contacts.slice(0, 3).map((contact) => (
              <div
                key={contact._id}
                className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
                onClick={() => {
                  setSelectedContact(contact);
                  setShowContactDetailsModal(true);
                }}
              >
                <div>
                  <p className="font-medium text-emerald-800">{contact.fullName}</p>
                  <p className="text-sm text-emerald-600">{contact.serviceInterestedIn}</p>
                </div>
                <span className={`px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => {
              const project = projects.find((p) => p.id === review.projectId?.toString());
              return (
                <div
                  key={review._id}
                  className="p-4 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
                  onClick={() => {
                    setSelectedReview({ ...review, projectTitle: project?.title || "N/A" });
                    setShowReviewDetailsModal(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-emerald-800">{project?.title || "N/A"}</p>
                    <div className="flex text-yellow-400">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-emerald-600">"{review.comment || "No comment"}"</p>
                  <p className="text-xs text-emerald-500 mt-2">-{review.name || "Unknown"}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showContactDetailsModal && selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => {
            setShowContactDetailsModal(false);
            setSelectedContact(null);
          }}
          onUpdateNotes={async (contactId, notes) => {
            try {
              const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes }),
              });
              const data = await response.json();
              if (data.success) {
                setContacts(contacts.map((c) => (c._id === contactId ? { ...c, notes, updatedAt: new Date().toISOString() } : c)));
              } else {
                setError(data.error || "Failed to update notes");
              }
            } catch (err) {
              setError("Error updating notes: " + err.message);
            }
          }}
        />
      )}

      {/* Review Details Modal */}
      {showReviewDetailsModal && selectedReview && (
        <ReviewDetailsModal
          item={selectedReview}
          onClose={() => {
            setShowReviewDetailsModal(false);
            setSelectedReview(null);
          }}
        />
      )}
    </div>
  );
}

function ContactDetailsModal({ contact, onClose, onUpdateNotes }) {
  const [notes, setNotes] = useState(contact.notes || "");
  const handleSaveNotes = () => {
    onUpdateNotes(contact._id, notes);
    onClose();
  };

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
                  <p className="text-emerald-800">{contact.serviceInterestedIn.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-700">Source</label>
                  <p className="text-emerald-800">{contact.source.charAt(0).toUpperCase() + contact.source.slice(1)}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">Message</h3>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-800">{contact.projectDetails}</p>
            </div>
          </div>
          {contact.responses?.length > 0 && (
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
  );
}

function ReviewDetailsModal({ item, onClose }) {
  const review = item;
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < (rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">Review Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-700 font-medium">{review.name ? review.name.charAt(0).toUpperCase() : "U"}</span>
            </div>
            <div>
              <p className="font-medium text-emerald-800">{review.name || "Unknown"}</p>
              <p className="text-sm text-emerald-500">Project: {review.projectTitle || "N/A"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-emerald-700">Rating</label>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="text-emerald-800">({review.rating || 0}/5)</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Status</label>
              <p className="text-emerald-800">{review.status ? review.status.charAt(0).toUpperCase() + review.status.slice(1) : "Unknown"}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-emerald-700">Review Title</label>
            <p className="text-emerald-800 font-medium">{review.title || "No Title"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-emerald-700">Review Content</label>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-800">{review.comment || "No comment"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-emerald-700">Submitted</label>
              <p className="text-emerald-800">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Likes</label>
              <p className="text-emerald-800">{review.likesCount || 0}</p>
            </div>
          </div>
          {review.adminReply && (
            <div>
              <label className="text-sm font-medium text-emerald-700">Admin Response</label>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">{review.adminReply}</p>
                <p className="text-sm text-blue-600 mt-2">Responded on: {new Date(review.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}