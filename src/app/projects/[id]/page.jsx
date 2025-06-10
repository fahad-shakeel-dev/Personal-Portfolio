"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Users,
  Tag,
  ChevronRight,
  Star,
  Heart,
  Send,
  ThumbsUp,
} from "lucide-react"
import { projects } from "../../components/ProjectPage/data/projects"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 5 })
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    if (params.id) {
      const foundProject = projects.find((p) => p.id.toString() === params.id)

      // Initialize with some sample reviews if needed
      const sampleReviews = [
        {
          id: 1,
          name: "Alex Johnson",
          comment: "This project is amazing! The UI is intuitive and the performance is great.",
          rating: 5,
          date: "2023-04-15",
        },
        {
          id: 2,
          name: "Sam Wilson",
          comment: "Good work on this. I especially liked the responsive design.",
          rating: 4,
          date: "2023-03-22",
        },
        {
          id: 3,
          name: "Jamie Lee",
          comment: "Solid implementation, but could use some performance improvements.",
          rating: 3,
          date: "2023-02-10",
        },
      ]

      setProject(foundProject)
      setReviews(sampleReviews)
      setLikeCount(Math.floor(Math.random() * 50) + 10) // Random initial like count
      setLoading(false)
    }
  }, [params.id])

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    setLiked(!liked)
  }

  const handleReviewChange = (e) => {
    const { name, value } = e.target
    setNewReview({ ...newReview, [name]: value })
  }

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating })
  }

  const submitReview = (e) => {
    e.preventDefault()

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill in all fields")
      return
    }

    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    }

    setReviews([review, ...reviews])
    setNewReview({ name: "", comment: "", rating: 5 })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Project not found</h1>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Back to Projects
        </button>
      </div>
    )
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Calculate average rating
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </motion.button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={project.image || "/placeholder.svg?height=800&width=1200"}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-teal-500 text-white text-sm rounded-full">{project.category}</span>

                  {project.featured && (
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>

                <p className="text-white/80 max-w-2xl">{project.description}</p>
              </motion.div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Like and Rating Summary */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>{likeCount} likes</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Reviews
              </button>
            </div>

            {activeTab === "overview" && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <motion.div variants={fadeIn} className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Overview</h2>
                    <p className="text-gray-600 mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Details</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Completed</p>
                          <p className="text-gray-600">{project.completedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-teal-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Duration</p>
                          <p className="text-gray-600">{project.duration || "3 months"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-teal-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Client</p>
                          <p className="text-gray-600">{project.client || "Personal Project"}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Technologies Used</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-teal-400 hover:shadow-md transition-all"
                      >
                        <p className="font-medium text-gray-800">{tech}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{feature}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Gallery</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(
                      project.gallery || [
                        "/placeholder.svg?height=300&width=400",
                        "/placeholder.svg?height=300&width=400",
                        "/placeholder.svg?height=300&width=400",
                      ]
                    ).map((image, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-md"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews & Ratings</h2>

                  {/* Add a review form */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h3>
                    <form onSubmit={submitReview} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newReview.name}
                          onChange={handleReviewChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={newReview.comment}
                          onChange={handleReviewChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Share your thoughts about this project..."
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                        Submit Review
                      </button>
                    </form>
                  </div>

                  {/* Reviews list */}
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          variants={fadeIn}
                          className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-gray-800">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>

                          <div className="flex mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>

                          <p className="text-gray-600">{review.comment}</p>

                          <div className="flex items-center gap-2 mt-3 text-gray-500">
                            <button className="flex items-center gap-1 text-sm hover:text-teal-600 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No reviews yet. Be the first to review this project!
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">More Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <motion.div
                  key={relatedProject.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
                      alt={relatedProject.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="font-bold">{relatedProject.title}</h3>
                      <p className="text-sm text-white/80">{relatedProject.category}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <Link
                      href={`/projects/${relatedProject.id}`}
                      className="flex items-center justify-between text-teal-600 font-medium"
                    >
                      <span>View Project</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
