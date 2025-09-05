"use client"

import { useState, useEffect } from "react";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showViewsModal, setShowViewsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectLikes, setProjectLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [reviewsResponse, projectsResponse, likesResponse] = await Promise.all([
          fetch("/api/admin/reviews"),
          fetch("/api/admin/projects"),
          fetch("/api/admin/project-likes").catch(() => null), // Graceful fallback for potential 404
        ]);

        if (!reviewsResponse.ok) throw new Error(`Failed to fetch reviews: ${reviewsResponse.status}`);
        if (!projectsResponse.ok) throw new Error(`Failed to fetch projects: ${projectsResponse.status}`);

        const reviewsData = await reviewsResponse.json();
        const projectsData = await projectsResponse.json();
        const likesData = likesResponse && (await likesResponse.json());

        if (reviewsData.success) {
          const reviewsDataArray = reviewsData.data || [];
          setReviews(reviewsDataArray);
        }
        if (projectsData.success) setProjects(projectsData.data || []);
        if (likesData?.success) setProjectLikes(likesData.data || []);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ratings = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  const filteredReviews = reviews.filter((review) => {
    const project = projects.find((p) => p.id === review.projectId?.toString());
    const name = review.name || "Unknown";
    const title = review.title || "";
    const content = review.content || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === "all" || (review.rating?.toString() === selectedRating);
    return matchesSearch && matchesRating;
  });

  const handleDeleteReview = async (reviewId) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`/api/admin/reviews?id=${reviewId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setReviews(reviews.filter((r) => r._id?.toString() !== reviewId));
        } else {
          alert(data.error || "Failed to delete review");
        }
      } catch (err) {
        alert("Error deleting review: " + err.message);
      }
    }
  };

  const handleAddResponse = async (reviewId, responseContent) => {
    try {
      const response = await fetch(`/api/admin/reviews?id=${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminReply: responseContent }),
      });
      const data = await response.json();
      if (data.success) {
        setReviews(
          reviews.map((review) =>
            review._id?.toString() === reviewId
              ? {
                  ...review,
                  adminReply: responseContent,
                  updatedAt: new Date().toISOString(),
                }
              : review
          )
        );
        setShowResponseModal(false);
      } else {
        alert(data.error || "Failed to add response");
      }
    } catch (err) {
      alert("Error adding response: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < (rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="text-center p-8 text-emerald-600 animate-pulse">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Reviews & Engagement Dashboard</h1>
            <p className="text-emerald-600 mt-1">Manage reviews and track project interactions</p>
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
              Engagement Analytics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "reviews" ? (
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Search Reviews</label>
                  <input
                    type="text"
                    placeholder="Search by name, content, or project..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
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
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => {
                    const project = projects.find((p) => p.id === review.projectId?.toString());
                    const name = review.name || "Unknown";
                    return (
                      <div
                        key={review._id?.toString()}
                        className="border border-emerald-100 rounded-xl p-6 hover:bg-emerald-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-emerald-700 font-medium">
                                {name ? name.charAt(0).toUpperCase() : 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-emerald-800">{name}</p>
                              <p className="text-sm text-emerald-500">Project: {project?.title || "N/A"}</p>
                            </div>
                          </div>
                          {/* <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                review.status
                              )}`}
                            >
                              {review.status ? review.status.charAt(0).toUpperCase() + review.status.slice(1) : 'Unknown'}
                            </span>
                          </div> */}
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-emerald-600">({review.rating || 0}/5)</span>
                            <span className="text-sm text-emerald-500">•</span>
                            <span className="text-sm text-emerald-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-semibold text-emerald-800 mb-2">{review.title || "No Title"}</h3>
                          <p className="text-emerald-700 mb-3">{review.comment || "No comment"}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(review.tags || []).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-emerald-600">
                            <span
                              className="flex items-center gap-1 cursor-pointer"
                              onClick={() => {
                                setSelectedItem({
                                  ...review,
                                  projectTitle: project?.title || "N/A",
                                  likesCount: review.likesCount,
                                });
                                setShowLikesModal(true);
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              {review.likesCount || 0} Likes
                            </span>
                          </div>
                        </div>

                        {review.adminReply && (
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-blue-800">Admin Response</span>
                              <span className="text-sm text-blue-600">
                                • {new Date(review.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-blue-800">{review.adminReply}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedItem({ ...review, projectTitle: project?.title || "N/A" });
                              setShowDetailsModal(true);
                            }}
                            className="px-3 py-1 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem({ ...review, projectTitle: project?.title || "N/A" });
                              setShowResponseModal(true);
                            }}
                            className="px-3 py-1 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                          >
                            {review.adminReply ? "Edit Response" : "Respond"}
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id?.toString())}
                            className="px-3 py-1 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No reviews match your filters.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Engagement Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const likeData = projectLikes.find((l) => l.projectId?.toString() === project.id);
                  return (
                    <div key={project.id} className="border border-emerald-100 rounded-xl p-6 hover:bg-emerald-50">
                      <h3 className="font-semibold text-emerald-800 mb-4">{project.title}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600">Total Likes</span>
                          <span className="font-medium text-emerald-800">
                            {likeData?.totalLikes || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600">This Week</span>
                          <span className="font-medium text-emerald-800">
                            {likeData?.likesThisWeek || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600">This Month</span>
                          <span className="font-medium text-emerald-800">
                            {likeData?.likesThisMonth || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600">Recent Likes</span>
                          <span className="font-medium text-emerald-800">
                            {likeData?.recentLikes || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600">Total Views</span>
                          <span className="font-medium text-emerald-800">
                            {project.views || 0}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem({ ...project, ...likeData });
                            setShowLikesModal(true);
                          }}
                          className="px-3 py-1 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                        >
                          View Likes
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(project);
                            setShowViewsModal(true);
                          }}
                          className="px-3 py-1 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                        >
                          View Views
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Details Modal */}
      {showDetailsModal && selectedItem && (
        <ReviewDetailsModal
          item={selectedItem}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* Response Modal */}
      {showResponseModal && selectedItem && (
        <ResponseModal
          item={selectedItem}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedItem(null);
          }}
          onSendResponse={handleAddResponse}
        />
      )}

      {/* Likes Modal */}
      {showLikesModal && selectedItem && (
        <LikesModal
          item={selectedItem}
          onClose={() => {
            setShowLikesModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* Views Modal */}
      {showViewsModal && selectedItem && (
        <ViewsModal
          item={selectedItem}
          onClose={() => {
            setShowViewsModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

function ReviewDetailsModal({ item, onClose }) {
  const review = item;

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
              <span className="text-emerald-700 font-medium">
                {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
              </span>
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
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < (review.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-emerald-800">({review.rating || 0}/5)</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">Status</label>
              <p className="text-emerald-800">
                {review.status ? review.status.charAt(0).toUpperCase() + review.status.slice(1) : 'Unknown'}
              </p>
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
                <p className="text-sm text-blue-600 mt-2">
                  Responded on: {new Date(review.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResponseModal({ item, onClose, onSendResponse }) {
  const review = item;
  const [responseContent, setResponseContent] = useState(review.adminReply || "");

  const handleSendResponse = () => {
    if (responseContent.trim()) {
      onSendResponse(review._id?.toString(), responseContent.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">
              {review.adminReply ? "Edit Response" : "Respond to Review"}
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
              <span className="font-medium text-emerald-800">{review.name || "Unknown"}</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < (review.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="font-medium text-emerald-800 mb-2">{review.title || "No Title"}</p>
            <p className="text-emerald-700">{review.comment || "No comment"}</p>
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
              {review.adminReply ? "Update Response" : "Send Response"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LikesModal({ item, onClose }) {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const ids = item.topLikers || [];
      const promises = ids.map(async (id) => {
        try {
          const res = await fetch(`/api/users?id=${id}`);
          if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
          const response = await res.json();
          if (!response.success || !response.data || response.data.length === 0) {
            throw new Error(`No user data for ID ${id}`);
          }
          // Take the first user from the array (assuming the API returns an array)
          const user = response.data[0];
          return [
            id,
            {
              id: user.id || id,
              name: user.name || 'Unknown',
              email: user.email || 'N/A',
              role: user.role || 'N/A',
              status: user.status || 'N/A',
              joinDate: user.joinDate || 'N/A',
              lastLogin: user.lastLogin || 'N/A',
              avatar: user.avatar || '/diverse-user-avatars.png',
            },
          ];
        } catch {
          return [id, { name: 'Unknown', id }];
        }
      });
      const results = await Promise.all(promises);
      setUsers(Object.fromEntries(results));
    };

    if (item.topLikers?.length > 0) {
      fetchUsers();
    }
  }, [item.topLikers]);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-emerald-800">Likes for {item.projectTitle || "N/A"}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-2">Total Likes</p>
                <p className="text-2xl font-bold text-emerald-800">{item.totalLikes || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-2">Recent Likes</p>
                <p className="text-2xl font-bold text-emerald-800">{item.recentLikes || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-2">Likes This Week</p>
                <p className="text-2xl font-bold text-emerald-800">{item.likesThisWeek || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-2">Likes This Month</p>
                <p className="text-2xl font-bold text-emerald-800">{item.likesThisMonth || 0}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Top Likers</h3>
              <div className="space-y-2">
                {(item.topLikers || []).map((likerId, index) => {
                  const user = users[likerId] || { name: 'Loading...' };
                  return (
                    <div key={likerId} className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                      <span className="flex-1 text-emerald-700">{user.name}</span>
                      <span className="text-sm text-emerald-600">#{index + 1}</span>
                      {user.name !== 'Unknown' && user.name !== 'Loading...' && (
                        <button
                          className="text-sm text-emerald-600 hover:text-emerald-800"
                          onClick={() => setSelectedUser(user)}
                        >
                          View More
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}

function ViewsModal({ item, onClose }) {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const ids = item.viewedBy || [];
      const promises = ids.map(async (id) => {
        try {
          const res = await fetch(`/api/users?id=${id}`);
          if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
          const response = await res.json();
          if (!response.success || !response.data || response.data.length === 0) {
            throw new Error(`No user data for ID ${id}`);
          }
          // Take the first user from the array (assuming the API returns an array)
          const user = response.data[0];
          return [
            id,
            {
              id: user.id || id,
              name: user.name || 'Unknown',
              email: user.email || 'N/A',
              role: user.role || 'N/A',
              status: user.status || 'N/A',
              joinDate: user.joinDate || 'N/A',
              lastLogin: user.lastLogin || 'N/A',
              avatar: user.avatar || '/diverse-user-avatars.png',
            },
          ];
        } catch {
          return [id, { name: 'Unknown', id }];
        }
      });
      const results = await Promise.all(promises);
      setUsers(Object.fromEntries(results));
    };

    if (item.viewedBy?.length > 0) {
      fetchUsers();
    }
  }, [item.viewedBy]);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-emerald-800">Views for {item.title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-2">Total Views</p>
                <p className="text-2xl font-bold text-emerald-800">{item.views || 0}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Viewers</h3>
              <div className="space-y-2">
                {(item.viewedBy || []).map((viewerId, index) => {
                  const user = users[viewerId] || { name: 'Loading...' };
                  return (
                    <div key={viewerId} className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                      <span className="flex-1 text-emerald-700">{user.name}</span>
                      <span className="text-sm text-emerald-600">#{index + 1}</span>
                      {user.name !== 'Unknown' && user.name !== 'Loading...' && (
                        <button
                          className="text-sm text-emerald-600 hover:text-emerald-800"
                          onClick={() => setSelectedUser(user)}
                        >
                          View More
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}

function UserDetailsModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-800">User Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dit3dubrf/image/upload/v1756748701/default_bwbt09.png"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-emerald-800">{user.name}</p>
              <p className="text-sm text-emerald-500 capitalize">{user.role}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Email</label>
            <p className="text-emerald-800">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Status</label>
            <p className="text-emerald-800 capitalize">{user.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Join Date</label>
            <p className="text-emerald-800">{user.joinDate}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Last Login</label>
            <p className="text-emerald-800">{user.lastLogin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
