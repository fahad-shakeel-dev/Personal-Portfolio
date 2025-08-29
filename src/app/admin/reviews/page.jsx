"use client"

import { useState } from "react"

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("reviews")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)

  // Mock data - replace with actual data fetching
  const [reviews, setReviews] = useState([
    {
      id: 1,
      projectId: 1,
      projectTitle: "E-commerce Platform",
      userName: "Alex Thompson",
      userEmail: "alex@example.com",
      userAvatar: "/user-avatar-1.png",
      rating: 5,
      title: "Outstanding work!",
      content:
        "The e-commerce platform exceeded all my expectations. The design is clean, modern, and the functionality is flawless. Highly recommend!",
      status: "approved",
      submittedDate: "2024-01-20",
      approvedDate: "2024-01-20",
      likes: 12,
      isHelpful: true,
      flagged: false,
      adminResponse: null,
      tags: ["design", "functionality", "professional"],
    },
    {
      id: 2,
      projectId: 2,
      projectTitle: "Mobile Banking App",
      userName: "Sarah Johnson",
      userEmail: "sarah@example.com",
      userAvatar: "/user-avatar-2.png",
      rating: 4,
      title: "Great UI/UX design",
      content:
        "The mobile app design is intuitive and user-friendly. The authentication flow is smooth and secure. Minor suggestions for improvement in the dashboard layout.",
      status: "pending",
      submittedDate: "2024-01-19",
      approvedDate: null,
      likes: 8,
      isHelpful: true,
      flagged: false,
      adminResponse: null,
      tags: ["ui-ux", "mobile", "security"],
    },
    {
      id: 3,
      projectId: 3,
      projectTitle: "Portfolio Website",
      userName: "Mike Davis",
      userEmail: "mike@example.com",
      userAvatar: "/user-avatar-3.png",
      rating: 5,
      title: "Perfect portfolio design",
      content:
        "This portfolio website is exactly what I was looking for. The animations are smooth, the layout is responsive, and it showcases work beautifully.",
      status: "approved",
      submittedDate: "2024-01-18",
      approvedDate: "2024-01-18",
      likes: 15,
      isHelpful: true,
      flagged: false,
      adminResponse: {
        content: "Thank you for the wonderful feedback! I&apos;m glad the portfolio met your expectations.",
        respondedDate: "2024-01-18",
      },
      tags: ["portfolio", "responsive", "animations"],
    },
    {
      id: 4,
      projectId: 1,
      projectTitle: "E-commerce Platform",
      userName: "Emily Wilson",
      userEmail: "emily@example.com",
      userAvatar: "/user-avatar-4.png",
      rating: 3,
      title: "Good but needs improvement",
      content:
        "The platform works well overall, but the checkout process could be more streamlined. Also, the mobile version has some layout issues.",
      status: "approved",
      submittedDate: "2024-01-17",
      approvedDate: "2024-01-17",
      likes: 5,
      isHelpful: true,
      flagged: false,
      adminResponse: {
        content:
          "Thank you for the constructive feedback. I'll work on improving the checkout process and mobile layout in the next update.",
        respondedDate: "2024-01-17",
      },
      tags: ["checkout", "mobile", "improvement"],
    },
    {
      id: 5,
      projectId: 4,
      projectTitle: "Task Management System",
      userName: "John Smith",
      userEmail: "john@example.com",
      userAvatar: "/user-avatar-5.png",
      rating: 2,
      title: "Disappointing experience",
      content: "The system is buggy and slow. Many features don't work as expected. Would not recommend.",
      status: "flagged",
      submittedDate: "2024-01-16",
      approvedDate: null,
      likes: 2,
      isHelpful: false,
      flagged: true,
      adminResponse: null,
      tags: ["bugs", "performance", "issues"],
    },
  ])

  const [projectLikes, setProjectLikes] = useState([
    {
      projectId: 1,
      projectTitle: "E-commerce Platform",
      totalLikes: 45,
      recentLikes: 8,
      topLikers: ["Alex Thompson", "Sarah Johnson", "Mike Davis"],
      likesThisWeek: 12,
      likesThisMonth: 28,
    },
    {
      projectId: 2,
      projectTitle: "Mobile Banking App",
      totalLikes: 32,
      recentLikes: 5,
      topLikers: ["Emily Wilson", "John Smith", "Alex Thompson"],
      likesThisWeek: 8,
      likesThisMonth: 18,
    },
    {
      projectId: 3,
      projectTitle: "Portfolio Website",
      totalLikes: 67,
      recentLikes: 12,
      topLikers: ["Mike Davis", "Sarah Johnson", "Emily Wilson"],
      likesThisWeek: 15,
      likesThisMonth: 35,
    },
  ])

  const statuses = [
    { value: "all", label: "All Reviews", count: reviews.length },
    { value: "pending", label: "Pending", count: reviews.filter((r) => r.status === "pending").length },
    { value: "approved", label: "Approved", count: reviews.filter((r) => r.status === "approved").length },
    { value: "rejected", label: "Rejected", count: reviews.filter((r) => r.status === "rejected").length },
    { value: "flagged", label: "Flagged", count: reviews.filter((r) => r.status === "flagged").length },
  ]

  const ratings = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || review.status === selectedStatus
    const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating
    return matchesSearch && matchesStatus && matchesRating
  })

  const handleStatusChange = (reviewId, newStatus) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: newStatus,
              approvedDate: newStatus === "approved" ? new Date().toISOString().split("T")[0] : review.approvedDate,
            }
          : review,
      ),
    )
  }

  const handleAddResponse = (reviewId, responseContent) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              adminResponse: {
                content: responseContent,
                respondedDate: new Date().toISOString().split("T")[0],
              },
            }
          : review,
      ),
    )
  }

  const handleToggleFlag = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              flagged: !review.flagged,
              status: !review.flagged ? "flagged" : "pending",
            }
          : review,
      ),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Reviews & Likes Management</h1>
            <p className="text-emerald-600 mt-1">Moderate reviews and track project engagement</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-800">{averageRating}</p>
              <p className="text-sm text-emerald-600">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-800">{reviews.length}</p>
              <p className="text-sm text-emerald-600">Total Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100">
        <div className="border-b border-emerald-100">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews Management
            </button>
            <button
              onClick={() => setActiveTab("likes")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "likes"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Likes Analytics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "reviews" ? (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Search Reviews</label>
                  <input
                    type="text"
                    placeholder="Search by user, title, content, or project..."
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
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {ratings.map((rating) => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-emerald-100 rounded-xl p-6 hover:bg-emerald-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.userAvatar || "/placeholder.svg"}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-emerald-800">{review.userName}</p>
                          <p className="text-sm text-emerald-600">{review.userEmail}</p>
                          <p className="text-sm text-emerald-500">{review.projectTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span>
                        {review.flagged && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Flagged
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-emerald-600">({review.rating}/5)</span>
                        <span className="text-sm text-emerald-500">•</span>
                        <span className="text-sm text-emerald-500">{review.submittedDate}</span>
                      </div>
                      <h3 className="font-semibold text-emerald-800 mb-2">{review.title}</h3>
                      <p className="text-emerald-700 mb-3">{review.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {review.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-emerald-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {review.likes} likes
                        </span>
                        <span className={review.isHelpful ? "text-green-600" : "text-gray-500"}>
                          {review.isHelpful ? "Helpful" : "Not helpful"}
                        </span>
                      </div>
                    </div>

                    {review.adminResponse && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-blue-800">Admin Response</span>
                          <span className="text-sm text-blue-600">• {review.adminResponse.respondedDate}</span>
                        </div>
                        <p className="text-blue-800">{review.adminResponse.content}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <select
                        value={review.status}
                        onChange={(e) => handleStatusChange(review.id, e.target.value)}
                        className="px-3 py-1 border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="flagged">Flagged</option>
                      </select>
                      <button
                        onClick={() => {
                          setSelectedReview(review)
                          setShowDetailsModal(true)
                        }}
                        className="px-3 py-1 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReview(review)
                          setShowResponseModal(true)
                        }}
                        className="px-3 py-1 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                      >
                        {review.adminResponse ? "Edit Response" : "Respond"}
                      </button>
                      <button
                        onClick={() => handleToggleFlag(review.id)}
                        className={`px-3 py-1 border rounded-lg transition-colors text-sm ${
                          review.flagged
                            ? "text-green-600 border-green-200 hover:bg-green-50"
                            : "text-red-600 border-red-200 hover:bg-red-50"
                        }`}
                      >
                        {review.flagged ? "Unflag" : "Flag"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Likes Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectLikes.map((project) => (
                  <div key={project.projectId} className="border border-emerald-100 rounded-xl p-6">
                    <h3 className="font-semibold text-emerald-800 mb-4">{project.projectTitle}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600">Total Likes</span>
                        <span className="font-medium text-emerald-800">{project.totalLikes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600">This Week</span>
                        <span className="font-medium text-emerald-800">{project.likesThisWeek}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600">This Month</span>
                        <span className="font-medium text-emerald-800">{project.likesThisMonth}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600">Recent Likes</span>
                        <span className="font-medium text-emerald-800">+{project.recentLikes}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-emerald-600 mb-2">Top Likers</p>
                      <div className="space-y-1">
                        {project.topLikers.map((liker, index) => (
                          <p key={index} className="text-sm text-emerald-800">
                            {index + 1}. {liker}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedReview(null)
          }}
        />
      )}

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <ResponseModal
          review={selectedReview}
          onClose={() => {
            setShowResponseModal(false)
            setSelectedReview(null)
          }}
          onSendResponse={handleAddResponse}
        />
      )}
    </div>
  )
}

function ReviewDetailsModal({ review, onClose }) {
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
            <img
              src={review.userAvatar || "/placeholder.svg"}
              alt={review.userName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-emerald-800">{review.userName}</p>
              <p className="text-sm text-emerald-600">{review.userEmail}</p>
              <p className="text-sm text-emerald-500">Project: {review.projectTitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-emerald-700">Rating</label>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-emerald-800">({review.rating}/5)</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Status</label>
              <p className="text-emerald-800">{review.status.charAt(0).toUpperCase() + review.status.slice(1)}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-700">Review Title</label>
            <p className="text-emerald-800 font-medium">{review.title}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-700">Review Content</label>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-800">{review.content}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-700">Tags</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {review.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-emerald-700">Submitted</label>
              <p className="text-emerald-800">{review.submittedDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Likes</label>
              <p className="text-emerald-800">{review.likes}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Helpful</label>
              <p className="text-emerald-800">{review.isHelpful ? "Yes" : "No"}</p>
            </div>
          </div>

          {review.adminResponse && (
            <div>
              <label className="text-sm font-medium text-emerald-700">Admin Response</label>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">{review.adminResponse.content}</p>
                <p className="text-sm text-blue-600 mt-2">Responded on: {review.adminResponse.respondedDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResponseModal({ review, onClose, onSendResponse }) {
  const [responseContent, setResponseContent] = useState(review.adminResponse?.content || "")

  const handleSendResponse = () => {
    if (responseContent.trim()) {
      onSendResponse(review.id, responseContent.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">
              {review.adminResponse ? "Edit Response" : "Respond to Review"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-emerald-800">{review.userName}</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="font-medium text-emerald-800 mb-2">{review.title}</p>
            <p className="text-emerald-700">{review.content}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Your Response</label>
            <textarea
              value={responseContent}
              onChange={(e) => setResponseContent(e.target.value)}
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
              disabled={!responseContent.trim()}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {review.adminResponse ? "Update Response" : "Send Response"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
