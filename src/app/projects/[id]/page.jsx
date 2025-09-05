// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   ThumbsUp,
// } from "lucide-react"
// import { projects } from "../../components/ProjectPage/data/projects"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)

//   useEffect(() => {
//     if (params.id) {
//       const foundProject = projects.find((p) => p.id.toString() === params.id)

//       // Initialize with some sample reviews if needed
//       const sampleReviews = [
//         {
//           id: 1,
//           name: "Alex Johnson",
//           comment: "This project is amazing! The UI is intuitive and the performance is great.",
//           rating: 5,
//           date: "2023-04-15",
//         },
//         {
//           id: 2,
//           name: "Sam Wilson",
//           comment: "Good work on this. I especially liked the responsive design.",
//           rating: 4,
//           date: "2023-03-22",
//         },
//         {
//           id: 3,
//           name: "Jamie Lee",
//           comment: "Solid implementation, but could use some performance improvements.",
//           rating: 3,
//           date: "2023-02-10",
//         },
//       ]

//       setProject(foundProject)
//       setReviews(sampleReviews)
//       setLikeCount(Math.floor(Math.random() * 50) + 10) // Random initial like count
//       setLoading(false)
//     }
//   }, [params.id])

//   const handleLike = () => {
//     if (!liked) {
//       setLikeCount(likeCount + 1)
//     } else {
//       setLikeCount(likeCount - 1)
//     }
//     setLiked(!liked)
//   }

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = (e) => {
//     e.preventDefault()

//     if (!newReview.name.trim() || !newReview.comment.trim()) {
//       alert("Please fill in all fields")
//       return
//     }

//     const review = {
//       id: Date.now(),
//       ...newReview,
//       date: new Date().toISOString().split("T")[0],
//     }

//     setReviews([review, ...reviews])
//     setNewReview({ name: "", comment: "", rating: 5 })
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Project not found</h1>
//         <button
//           onClick={() => router.push("/")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   // Calculate average rating
//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//       <div className="container mx-auto px-4 py-8">
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3 }}
//           onClick={() => router.push("/")}
//           className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-8"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           <span>Back to Projects</span>
//         </motion.button>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="relative h-64 md:h-96 w-full">
//             <Image
//               src={project.image || "/placeholder.svg?height=800&width=1200"}
//               alt={project.title}
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//             <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="px-3 py-1 bg-teal-500 text-white text-sm rounded-full">{project.category}</span>

//                   {project.featured && (
//                     <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm rounded-full flex items-center gap-1">
//                       <Star className="h-3 w-3" />
//                       Featured
//                     </span>
//                   )}
//                 </div>

//                 <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>

//                 <p className="text-white/80 max-w-2xl">{project.description}</p>
//               </motion.div>
//             </div>
//           </div>

//           <div className="p-6 md:p-8">
//             {/* Like and Rating Summary */}
//             <div className="flex flex-wrap items-center justify-between mb-6">
//               <div className="flex items-center gap-6">
//                 <button
//                   onClick={handleLike}
//                   className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
//                 >
//                   <Heart className={`h-5 w-5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                   <span>{likeCount} likes</span>
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-gray-600">
//                     {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
//               <button
//                 onClick={() => setActiveTab("overview")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Overview
//               </button>
//               <button
//                 onClick={() => setActiveTab("features")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Features
//               </button>
//               <button
//                 onClick={() => setActiveTab("gallery")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Gallery
//               </button>
//               <button
//                 onClick={() => setActiveTab("reviews")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Reviews
//               </button>
//             </div>

//             {activeTab === "overview" && (
//               <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//                   <motion.div variants={fadeIn} className="md:col-span-2">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Overview</h2>
//                     <p className="text-gray-600 mb-6">{project.description}</p>

//                     <div className="flex flex-wrap gap-3 mb-6">
//                       {project.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800"
//                         >
//                           <Tag className="h-3 w-3" />
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex flex-wrap gap-4">
//                       {project.liveUrl && (
//                         <a
//                           href={project.liveUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
//                         >
//                           <ExternalLink className="h-4 w-4" />
//                           <span>Live Demo</span>
//                         </a>
//                       )}

//                       {project.githubUrl && (
//                         <a
//                           href={project.githubUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors"
//                         >
//                           <Github className="h-4 w-4" />
//                           <span>View Code</span>
//                         </a>
//                       )}
//                     </div>
//                   </motion.div>

//                   <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Details</h3>

//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-gray-700">Completed</p>
//                           <p className="text-gray-600">{project.completedDate}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start gap-3">
//                         <Clock className="h-5 w-5 text-teal-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-gray-700">Duration</p>
//                           <p className="text-gray-600">{project.duration || "3 months"}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start gap-3">
//                         <Users className="h-5 w-5 text-teal-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-gray-700">Client</p>
//                           <p className="text-gray-600">{project.client || "Personal Project"}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>

//                 <motion.div variants={fadeIn}>
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">Technologies Used</h2>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                     {project.technologies.map((tech) => (
//                       <div
//                         key={tech}
//                         className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-teal-400 hover:shadow-md transition-all"
//                       >
//                         <p className="font-medium text-gray-800">{tech}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {activeTab === "features" && (
//               <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                 <motion.div variants={fadeIn}>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h2>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {project.features.map((feature, index) => (
//                       <motion.div
//                         key={index}
//                         variants={fadeIn}
//                         className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-800">{feature}</p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {activeTab === "gallery" && (
//               <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                 <motion.div variants={fadeIn}>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Gallery</h2>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {(
//                       project.gallery || [
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                       ]
//                     ).map((image, index) => (
//                       <motion.div
//                         key={index}
//                         variants={fadeIn}
//                         whileHover={{ y: -5, scale: 1.02 }}
//                         className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-md"
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${project.title} gallery image ${index + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {activeTab === "reviews" && (
//               <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                 <motion.div variants={fadeIn}>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews & Ratings</h2>

//                   {/* Add a review form */}
//                   <div className="bg-gray-50 rounded-xl p-6 mb-8">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h3>
//                     <form onSubmit={submitReview} className="space-y-4">
//                       <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                           Your Name
//                         </label>
//                         <input
//                           type="text"
//                           id="name"
//                           name="name"
//                           value={newReview.name}
//                           onChange={handleReviewChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                           placeholder="Enter your name"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                         <div className="flex gap-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => handleRatingChange(star)}
//                               className="focus:outline-none"
//                             >
//                               <Star
//                                 className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                               />
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                           Your Review
//                         </label>
//                         <textarea
//                           id="comment"
//                           name="comment"
//                           value={newReview.comment}
//                           onChange={handleReviewChange}
//                           rows={4}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                           placeholder="Share your thoughts about this project..."
//                           required
//                         ></textarea>
//                       </div>

//                       <button
//                         type="submit"
//                         className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//                       >
//                         <Send className="h-4 w-4" />
//                         Submit Review
//                       </button>
//                     </form>
//                   </div>

//                   {/* Reviews list */}
//                   <div className="space-y-6">
//                     {reviews.length > 0 ? (
//                       reviews.map((review) => (
//                         <motion.div
//                           key={review.id}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all"
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <div className="font-medium text-gray-800">{review.name}</div>
//                             <div className="text-sm text-gray-500">{review.date}</div>
//                           </div>

//                           <div className="flex mb-3">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                               />
//                             ))}
//                           </div>

//                           <p className="text-gray-600">{review.comment}</p>

//                           <div className="flex items-center gap-2 mt-3 text-gray-500">
//                             <button className="flex items-center gap-1 text-sm hover:text-teal-600 transition-colors">
//                               <ThumbsUp className="h-4 w-4" />
//                               Helpful
//                             </button>
//                           </div>
//                         </motion.div>
//                       ))
//                     ) : (
//                       <div className="text-center py-8 text-gray-500">
//                         No reviews yet. Be the first to review this project!
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">More Projects</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {projects
//               .filter((p) => p.id !== project.id)
//               .slice(0, 3)
//               .map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-40 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-4 text-white">
//                       <h3 className="font-bold">{relatedProject.title}</h3>
//                       <p className="text-sm text-white/80">{relatedProject.category}</p>
//                     </div>
//                   </div>

//                   <div className="p-4">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   )
// }


















// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include", // Include cookies for authToken
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           // Redirect to login if not authenticated
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data.likesCount || 0)
//           setLiked(!!(data.data.likedBy || []).includes(userId))
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       if (data.message === "Authentication successful" && data.user) {
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     // Check authentication before liking
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     setLikeLoading(true)
//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setLiked(!liked)
//         setLikeCount(data.data.likes)
//       } else {
//         alert(data.error || "Failed to update like")
//       }
//     } catch (err) {
//       alert("Error updating like: " + err.message)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     // Check authentication before submitting review
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const deleteReview = async (reviewId) => {
//     // Check authentication before deleting review
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     // Check authentication before saving edited review
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                     {project.featured && (
//                       <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs sm:text-sm rounded-full flex items-center gap-0.5">
//                         <Star className="h-2.5 w-2.5" />
//                         Featured
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.tags || []).map((tag) => (
//                           <span
//                             key={tag}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate || "N/A"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Duration</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.duration || "3 months"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Client</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.client || "Personal Project"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Technologies Used</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
//                       {(project.technologies || []).map((tech) => (
//                         <div
//                           key={tech}
//                           className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center hover:border-teal-400 hover:shadow-md transition-all"
//                         >
//                           <p className="font-medium text-gray-800 text-xs sm:text-sm">{tech}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
//                       {(project.gallery || [
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                       ]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -3, scale: 1.02 }}
//                           className="relative h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image || "/placeholder.svg"}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{review.date}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             {review.userId === userId && (
//                               <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                                 <button
//                                   onClick={() => editReview(review)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                 >
//                                   <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => deleteReview(review.id)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                 >
//                                   <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }














// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data.likesCount || 0)
//           setLiked(!!(data.data.likedBy || []).includes(userId))
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     setLikeLoading(true)
//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setLiked(!liked)
//         setLikeCount(data.data.likes)
//       } else {
//         alert(data.error || "Failed to update like")
//       }
//     } catch (err) {
//       alert("Error updating like: " + err.message)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                     {project.featured && (
//                       <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs sm:text-sm rounded-full flex items-center gap-0.5">
//                         <Star className="h-2.5 w-2.5" />
//                         Featured
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.tags || []).map((tag) => (
//                           <span
//                             key={tag}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate || "N/A"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Duration</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.duration || "3 months"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Client</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.client || "Personal Project"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Technologies Used</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
//                       {(project.technologies || []).map((tech) => (
//                         <div
//                           key={tech}
//                           className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center hover:border-teal-400 hover:shadow-md transition-all"
//                         >
//                           <p className="font-medium text-gray-800 text-xs sm:text-sm">{tech}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
//                       {(project.gallery || [
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                       ]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -3, scale: 1.02 }}
//                           className="relative h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image || "/placeholder.svg"}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{review.date}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             {review.userId === userId && (
//                               <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                                 <button
//                                   onClick={() => editReview(review)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                 >
//                                   <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => deleteReview(review.id)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                 >
//                                   <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }






// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data.likesCount || 0)
//           setLiked(!!(data.data.likedBy || []).includes(userId))
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     // Optimistic update
//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         // Rollback on failure
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       // Rollback on error
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                     {project.featured && (
//                       <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs sm:text-sm rounded-full flex items-center gap-0.5">
//                         <Star className="h-2.5 w-2.5" />
//                         Featured
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.tags || []).map((tag) => (
//                           <span
//                             key={tag}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate || "N/A"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Duration</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.duration || "3 months"}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Client</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.client || "Personal Project"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Technologies Used</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
//                       {(project.technologies || []).map((tech) => (
//                         <div
//                           key={tech}
//                           className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center hover:border-teal-400 hover:shadow-md transition-all"
//                         >
//                           <p className="font-medium text-gray-800 text-xs sm:text-sm">{tech}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
//                       {(project.gallery || [
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                         "/placeholder.svg?height=300&width=400",
//                       ]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -3, scale: 1.02 }}
//                           className="relative h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image || "/placeholder.svg"}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{review.date}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             {review.userId === userId && (
//                               <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                                 <button
//                                   onClick={() => editReview(review)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                 >
//                                   <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => deleteReview(review.id)}
//                                   className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                 >
//                                   <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }






// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({}) // Track liked reviews
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({}) // Track loading state for review likes
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data.likesCount || 0)
//           setLiked(data.data.userHasLiked || false)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             // Initialize likedReviews state based on userHasLiked in reviews
//             const likedReviewsState = {}
//             reviewsData.data.forEach(review => {
//               likedReviewsState[review.id] = review.userHasLiked || false
//             })
//             setLikedReviews(likedReviewsState)
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     // Optimistic update for project like
//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         // Rollback on failure
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       // Rollback on error
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     // Optimistic update for review like
//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         // Rollback on failure
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       // Rollback on error
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">
//                               {project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status || "N/A"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-1 text-xs sm:text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-3.5 w-3.5 sm:h-4 w-4 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>

//                               {review.userId === userId && (
//                                 <>
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Delete
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }



// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({})
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({})
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//           console.log("Fetched current user:", data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
//         const data = await response.json()
//         console.log("Project API response:", {
//           success: data.success,
//           likesCount: data.data?.likesCount,
//           userHasLiked: data.data?.userHasLiked
//         })
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data?.likesCount || 0)
//           setLiked(!!data.data?.userHasLiked) // Ensure liked is set correctly
//           console.log("Set project state - liked:", !!data.data?.userHasLiked, "likeCount:", data.data?.likesCount || 0)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             const likedReviewsState = {}
//             reviewsData.data.forEach(review => {
//               likedReviewsState[review.id] = review.userHasLiked || false
//             })
//             setLikedReviews(likedReviewsState)
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err)
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     // Optimistic update for project like
//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)
//     console.log("Optimistic update - liked:", !liked, "likeCount:", liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       console.log("Like API response:", data)
//       if (!data.success) {
//         // Rollback on failure
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       // Rollback on error
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       console.error("Error in handleLike:", err)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     // Optimistic update for review like
//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         // Rollback on failure
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       // Rollback on error
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">
//                               {project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status || "N/A"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-1 text-xs sm:text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-3.5 w-3.5 sm:h-4 w-4 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>

//                               {review.userId === userId && (
//                                 <>
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Delete
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }


































// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({})
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({})
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//           console.log("Fetched current user:", data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
//         const data = await response.json()
//         console.log("Project API response:", {
//           success: data.success,
//           likesCount: data.data?.likesCount,
//           userHasLiked: data.data?.userHasLiked
//         })
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data?.likesCount || 0)
//           setLiked(!!data.data?.userHasLiked)
//           console.log("Set project state - liked:", !!data.data?.userHasLiked, "likeCount:", data.data?.likesCount || 0)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             const likedReviewsState = {}
//             reviewsData.data.forEach(review => {
//               likedReviewsState[review.id] = review.userHasLiked || false
//             })
//             setLikedReviews(likedReviewsState)
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err)
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)
//     console.log("Optimistic update - liked:", !liked, "likeCount:", liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       console.log("Like API response:", data)
//       if (!data.success) {
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       console.error("Error in handleLike:", err)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>

//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>

//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>

//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>

//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}

//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>

//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>

//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">
//                               {project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status || "N/A"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <div className="text-gray-500 text-sm sm:text-base">
//                           No features listed for this project.
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.gallery || ["/placeholder.svg?height=300&width=400"]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -5, scale: 1.02 }}
//                           className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg?height=300&width=400"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>

//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600 text-sm sm:text-base">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
//                             </div>

//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>

//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>

//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}

//                             <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-1 text-xs sm:text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-3.5 w-3.5 sm:h-4 w-4 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>

//                               {review.userId === userId && (
//                                 <>
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Delete
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }


// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({})
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({})
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data?.likesCount || 0)
//           setLiked(!!data.data?.userHasLiked)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             setLikedReviews(
//               reviewsData.data.reduce((acc, review) => ({
//                 ...acc,
//                 [review.id]: review.userHasLiked || false
//               }), {})
//             )
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err)
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>
//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>
//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>
//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <div className="flex items-center gap-2">
//                     <Link
//                       href={`/admin/projects/edit/${project.id}`}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Edit className="h-4 w-4" />
//                       Edit Project
//                     </Link>
//                     <button
//                       onClick={() => deleteReview(project.id)}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Trash className="h-4 w-4" />
//                       Delete Project
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>
//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}
//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>
//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>
//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Created</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.createdDate ? new Date(project.createdDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Views</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.views || 0}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                   <motion.div variants={fadeIn}>
//                     <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Key Features</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                       {(project.features || []).map((feature, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                             {index + 1}
//                           </div>
//                           <p className="text-gray-600 text-sm sm:text-base">{feature}</p>
//                         </div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <p className="text-gray-500 text-sm sm:text-base col-span-full">No features listed for this project.</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <div className="text-gray-500 text-sm sm:text-base col-span-full">
//                           No features listed for this project.
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.gallery || ["/placeholder.svg?height=300&width=400"]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -5, scale: 1.02 }}
//                           className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg?height=300&width=400"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                     {!(project.gallery && project.gallery.length) && (
//                       <p className="text-gray-500 text-sm sm:text-base mt-4">No gallery images available for this project.</p>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>
//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600 text-sm sm:text-base">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>
//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
//                             </div>
//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>
//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>
//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}
//                             <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-1 text-xs sm:text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-3.5 w-3.5 sm:h-4 w-4 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>
//                               {review.userId === userId && (
//                                 <>
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Delete
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>
//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }


















// // Views Coint
// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({})
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({})
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         // Increment view count
//         await fetch(`/api/projects`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id: params.id, userId })
//         })

//         // Fetch project data
//         const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data?.likesCount || 0)
//           setLiked(!!data.data?.userHasLiked)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             setLikedReviews(
//               reviewsData.data.reduce((acc, review) => ({
//                 ...acc,
//                 [review.id]: review.userHasLiked || false
//               }), {})
//             )
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err)
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !currentUser) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !userId || !editingReviewId) {
//       alert("Please fill in the comment field and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>
//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>
//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>
//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <div className="flex items-center gap-2">
//                     <Link
//                       href={`/admin/projects/edit/${project.id}`}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Edit className="h-4 w-4" />
//                       Edit Project
//                     </Link>
//                     <button
//                       onClick={() => deleteReview(project.id)}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Trash className="h-4 w-4" />
//                       Delete Project
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>
//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}
//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>
//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>
//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Created</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.createdDate ? new Date(project.createdDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Views</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.views || 0}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                   <motion.div variants={fadeIn}>
//                     <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Key Features</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                       {(project.features || []).map((feature, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                             {index + 1}
//                           </div>
//                           <p className="text-gray-600 text-sm sm:text-base">{feature}</p>
//                         </div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <p className="text-gray-500 text-sm sm:text-base col-span-full">No features listed for this project.</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <div className="text-gray-500 text-sm sm:text-base col-span-full">
//                           No features listed for this project.
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.gallery || ["/placeholder.svg?height=300&width=400"]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -5, scale: 1.02 }}
//                           className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg?height=300&width=400"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                     {!(project.gallery && project.gallery.length) && (
//                       <p className="text-gray-500 text-sm sm:text-base mt-4">No gallery images available for this project.</p>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Reviews & Ratings</h2>
//                     <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Write a Review</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600 text-sm sm:text-base">
//                           Please <Link href="/login" className="text-teal-600 hover:underline">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-3 sm:space-y-4">
//                           <p className="text-sm text-gray-700">Reviewing as: {currentUser.fullName}</p>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <div className="flex gap-1 sm:gap-1.5">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => handleRatingChange(star)}
//                                   className="focus:outline-none"
//                                 >
//                                   <Star
//                                     className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                               Your Review
//                             </label>
//                             <textarea
//                               id="comment"
//                               name="comment"
//                               value={newReview.comment}
//                               onChange={handleReviewChange}
//                               rows={3}
//                               className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
//                               placeholder="Share your thoughts about this project..."
//                               required
//                             ></textarea>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               type="submit"
//                               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                             >
//                               <Send className="h-4 w-4 sm:h-5 sm:w-5" />
//                               {editingReviewId ? "Save Changes" : "Submit Review"}
//                             </button>
//                             {editingReviewId && (
//                               <button
//                                 type="button"
//                                 onClick={cancelEdit}
//                                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </form>
//                       )}
//                     </div>
//                     <div className="space-y-4 sm:space-y-5">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-1.5 sm:mb-2">
//                               <div className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</div>
//                               <div className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
//                             </div>
//                             <div className="flex mb-1.5 sm:mb-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3.5 w-3.5 sm:h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                             </div>
//                             <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>
//                             {review.adminReply && (
//                               <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">Admin Reply: {review.adminReply}</p>
//                             )}
//                             <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-1 text-xs sm:text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-3.5 w-3.5 sm:h-4 w-4 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>
//                               {review.userId === userId && (
//                                 <>
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-3.5 w-3.5 sm:h-4 w-4" />
//                                     Delete
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
//                           No reviews yet. Be the first to review this project!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>
//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }



// "use client"

// import Link from "next/link"
// import Footer from "@/app/components/HomePage/FooterSection/footer"
// import Navbar from "@/app/components/HomePage/Navbar/Navbar"
// import { useState, useEffect, useCallback } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import {
//   ArrowLeft,
//   ExternalLink,
//   Github,
//   Calendar,
//   Clock,
//   Users,
//   Tag,
//   ChevronRight,
//   Star,
//   Heart,
//   Send,
//   Edit,
//   Trash,
// } from "lucide-react"

// export default function ProjectDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [reviews, setReviews] = useState([])
//   const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [likedReviews, setLikedReviews] = useState({})
//   const [relatedProjects, setRelatedProjects] = useState([])
//   const [editingReviewId, setEditingReviewId] = useState(null)
//   const [userReview, setUserReview] = useState(null)
//   const [likeLoading, setLikeLoading] = useState(false)
//   const [reviewLikeLoading, setReviewLikeLoading] = useState({})
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userId, setUserId] = useState(null)
//   const isAdmin = false // Placeholder; replace with auth

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch("/api/auth/check", {
//           method: "GET",
//           credentials: "include",
//         })
//         const data = await response.json()
//         if (data.message === "Authentication successful" && data.user) {
//           setCurrentUser(data.user)
//           setUserId(data.user.id)
//         } else {
//           setCurrentUser(null)
//           setUserId(null)
//           router.push("/login")
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err)
//         setError("Error fetching user information")
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (!userId) return
//       setLoading(true)
//       try {
//         // Increment view count
//         await fetch(`/api/projects`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id: params.id, userId })
//         })

//         // Fetch project data
//         const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
//         const data = await response.json()
//         if (!data.success) {
//           setError(data.error || "Project not found")
//           setProject(null)
//         } else {
//           setProject(data.data || {})
//           setLikeCount(data.data?.likesCount || 0)
//           setLiked(!!data.data?.userHasLiked)
//           const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
//           const reviewsData = await reviewsResponse.json()
//           if (reviewsData.success) {
//             setReviews(reviewsData.data || [])
//             setUserReview((reviewsData.data || []).find(r => r.userId === userId))
//             setLikedReviews(
//               reviewsData.data.reduce((acc, review) => ({
//                 ...acc,
//                 [review.id]: review.userHasLiked || false
//               }), {})
//             )
//           }
//           const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
//           const relatedData = await relatedResponse.json()
//           if (relatedData.success) setRelatedProjects(relatedData.data || [])
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err)
//         setError("Error fetching project: " + err.message)
//         setProject(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (params.id && userId) fetchProject()
//   }, [params.id, userId])

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         credentials: "include",
//       })
//       const data = await response.json()
//       return data.message === "Authentication successful" && data.user
//     } catch (err) {
//       console.error("Error checking auth:", err)
//       return false
//     }
//   }, [])

//   const handleLike = useCallback(async () => {
//     if (likeLoading) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = liked
//     const previousLikeCount = likeCount
//     setLikeLoading(true)
//     setLiked(!liked)
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1)

//     try {
//       const method = liked ? "DELETE" : "POST"
//       const response = await fetch(`/api/projects/${params.id}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLiked(previousLiked)
//         setLikeCount(previousLikeCount)
//         alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
//       }
//     } catch (err) {
//       setLiked(previousLiked)
//       setLikeCount(previousLikeCount)
//       alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
//     } finally {
//       setLikeLoading(false)
//     }
//   }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

//   const handleReviewLike = useCallback(async (reviewId) => {
//     if (reviewLikeLoading[reviewId]) return

//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     const previousLiked = likedReviews[reviewId] || false
//     const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
//     setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
//     setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
//     setReviews(prev =>
//       prev.map(r =>
//         r.id === reviewId
//           ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
//           : r
//       )
//     )

//     try {
//       const method = previousLiked ? "DELETE" : "POST"
//       const response = await fetch(`/api/reviews/${reviewId}/likes`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (!data.success) {
//         setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//         setReviews(prev =>
//           prev.map(r =>
//             r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//           )
//         )
//         alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
//       }
//     } catch (err) {
//       setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
//       setReviews(prev =>
//         prev.map(r =>
//           r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
//         )
//       )
//       alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
//     } finally {
//       setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
//     }
//   }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target
//     setNewReview({ ...newReview, [name]: value })
//   }

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating })
//   }

//   const submitReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !newReview.title || !userId || !currentUser) {
//       alert("Please fill in the title and comment fields and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/projects/${params.id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews([data.data, ...reviews])
//         setUserReview(data.data)
//         setNewReview({ comment: "", title: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to submit review")
//       }
//     } catch (err) {
//       alert("Error submitting review: " + err.message)
//     }
//   }

//   const editReview = (review) => {
//     setEditingReviewId(review.id)
//     setNewReview({ comment: review.comment, title: review.title, rating: review.rating })
//   }

//   const cancelEdit = () => {
//     setEditingReviewId(null)
//     setNewReview({ comment: "", title: "", rating: 5 })
//   }

//   const saveEditedReview = async (e) => {
//     e.preventDefault()
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!newReview.comment.trim() || !newReview.title || !userId || !editingReviewId) {
//       alert("Please fill in the title and comment fields and ensure you are logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${editingReviewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.map(r => r.id === editingReviewId ? data.data : r))
//         setUserReview(data.data)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", title: "", rating: 5 })
//       } else {
//         alert(data.error || "Failed to update review")
//       }
//     } catch (err) {
//       alert("Error updating review: " + err.message)
//     }
//   }

//   const deleteReview = async (reviewId) => {
//     const isAuthenticated = await checkAuth()
//     if (!isAuthenticated) {
//       router.push("/login")
//       return
//     }

//     if (!reviewId || !userId) {
//       alert("Invalid review ID or user not logged in")
//       return
//     }
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId })
//       })
//       const data = await response.json()
//       if (data.success) {
//         setReviews(reviews.filter(r => r.id !== reviewId))
//         setUserReview(null)
//         setEditingReviewId(null)
//         setNewReview({ comment: "", title: "", rating: 5 })
//         setLikedReviews(prev => {
//           const newState = { ...prev }
//           delete newState[reviewId]
//           return newState
//         })
//       } else {
//         alert(data.error || "Failed to delete review")
//       }
//     } catch (err) {
//       alert("Error deleting review: " + err.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => router.push("/projects")}
//             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 sm:mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="text-sm sm:text-base">Back to Projects</span>
//           </motion.button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="relative h-48 sm:h-64 md:h-80 w-full">
//               <Image
//                 src={project.image || "/placeholder.svg?height=800&width=1200"}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//                 onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                   <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
//                     <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
//                   </div>
//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>
//                   <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
//                 </motion.div>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-4 sm:gap-6">
//                   <motion.button
//                     onClick={handleLike}
//                     whileTap={{ scale: 1.2 }}
//                     transition={{ duration: 0.2 }}
//                     disabled={likeLoading}
//                     className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                     <span>{likeCount} likes</span>
//                   </motion.button>
//                   <div className="flex items-center gap-1.5">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm sm:text-base">
//                       {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <div className="flex items-center gap-2">
//                     <Link
//                       href={`/admin/projects/edit/${project.id}`}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Edit className="h-4 w-4" />
//                       Edit Project
//                     </Link>
//                     <button
//                       onClick={() => deleteReview(project.id)}
//                       className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm sm:text-base"
//                     >
//                       <Trash className="h-4 w-4" />
//                       Delete Project
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("features")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Features
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("gallery")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Gallery
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                     activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {activeTab === "overview" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                     <motion.div variants={fadeIn} className="md:col-span-2">
//                       <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>
//                       <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
//                         {(project.technologies || []).map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex flex-wrap gap-2 sm:gap-3">
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}
//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
//                           >
//                             <Github className="h-4 w-4" />
//                             <span>View Code</span>
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>
//                     <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
//                       <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>
//                       <div className="space-y-3 sm:space-y-4">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Created</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.createdDate ? new Date(project.createdDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.status?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm sm:text-base">Views</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{project.views || 0}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                   <motion.div variants={fadeIn}>
//                     <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Key Features</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                       {(project.features || []).map((feature, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                             {index + 1}
//                           </div>
//                           <p className="text-gray-600 text-sm sm:text-base">{feature}</p>
//                         </div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <p className="text-gray-500 text-sm sm:text-base col-span-full">No features listed for this project.</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "features" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.features || []).map((feature, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
//                           </div>
//                         </motion.div>
//                       ))}
//                       {!(project.features && project.features.length) && (
//                         <div className="text-gray-500 text-sm sm:text-base col-span-full">
//                           No features listed for this project.
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "gallery" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {(project.gallery || ["/placeholder.svg?height=300&width=400"]).map((image, index) => (
//                         <motion.div
//                           key={index}
//                           variants={fadeIn}
//                           whileHover={{ y: -5, scale: 1.02 }}
//                           className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={image}
//                             alt={`${project.title} gallery image ${index + 1}`}
//                             fill
//                             className="object-cover"
//                             onError={(e) => { e.target.src = "/placeholder.svg?height=300&width=400"; }}
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                     {!(project.gallery && project.gallery.length) && (
//                       <p className="text-gray-500 text-sm sm:text-base mt-4">No gallery images available for this project.</p>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "reviews" && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//                   <motion.div variants={fadeIn}>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">Customer Reviews</h2>
//                     <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-sm">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-5">Leave Your Feedback</h3>
//                       {!currentUser ? (
//                         <p className="text-gray-600 text-base">
//                           Please <Link href="/login" className="text-teal-600 hover:underline font-medium">log in</Link> to submit a review.
//                         </p>
//                       ) : (
//                         <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-6">
//                           <div>
//                             <p className="text-sm text-gray-600 mb-2">Reviewing as: <span className="font-medium text-gray-800">{currentUser.fullName}</span></p>
//                             <div className="flex items-center gap-1 mb-4">
//                               <label className="block text-sm font-medium text-gray-700 mr-4">Rating:</label>
//                               <div className="flex gap-1">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                   <button
//                                     key={star}
//                                     type="button"
//                                     onClick={() => handleRatingChange(star)}
//                                     className="focus:outline-none"
//                                   >
//                                     <Star
//                                       className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                             <div>
//                               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Review Title
//                               </label>
//                               <input
//                                 id="title"
//                                 name="title"
//                                 value={newReview.title}
//                                 onChange={handleReviewChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
//                                 placeholder="Summarize your experience (e.g., 'Great Project!')"
//                                 required
//                               />
//                             </div>
//                             <div className="mt-4">
//                               <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Your Review
//                               </label>
//                               <textarea
//                                 id="comment"
//                                 name="comment"
//                                 value={newReview.comment}
//                                 onChange={handleReviewChange}
//                                 rows={4}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
//                                 placeholder="Share your detailed thoughts about this project..."
//                                 required
//                               ></textarea>
//                             </div>
//                             <div className="flex gap-3">
//                               <button
//                                 type="submit"
//                                 className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base font-medium shadow-md"
//                               >
//                                 <Send className="h-5 w-5" />
//                                 {editingReviewId ? "Save Changes" : "Submit Review"}
//                               </button>
//                               {editingReviewId && (
//                                 <button
//                                   type="button"
//                                   onClick={cancelEdit}
//                                   className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-base font-medium shadow-md"
//                                 >
//                                   Cancel
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </form>
//                       )}
//                     </div>
//                     <div className="space-y-6">
//                       {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                           <motion.div
//                             key={review.id}
//                             variants={fadeIn}
//                             className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
//                           >
//                             <div className="flex justify-between items-start mb-3">
//                               <div className="flex flex-col">
//                                 <div className="font-semibold text-gray-900 text-base">{review.name}</div>
//                                 <div className="text-sm text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</div>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <div className="flex">
//                                   {[1, 2, 3, 4, 5].map((star) => (
//                                     <Star
//                                       key={star}
//                                       className={`h-5 w-5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                     />
//                                   ))}
//                                 </div>
//                                 <span className="text-sm text-gray-600">({review.rating}/5)</span>
//                               </div>
//                             </div>
//                             <h4 className="text-lg font-medium text-gray-800 mb-2">{review.title}</h4>
//                             <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
//                             {review.adminReply && (
//                               <p className="text-gray-600 text-sm italic mt-2 bg-gray-50 p-3 rounded-md">Admin Reply: {review.adminReply}</p>
//                             )}
//                             <div className="flex items-center gap-4 mt-3 text-gray-500">
//                               <motion.button
//                                 onClick={() => handleReviewLike(review.id)}
//                                 whileTap={{ scale: 1.2 }}
//                                 transition={{ duration: 0.2 }}
//                                 disabled={reviewLikeLoading[review.id]}
//                                 className={`flex items-center gap-2 text-sm hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//                               >
//                                 <Heart className={`h-5 w-5 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
//                                 <span>{review.likesCount} likes</span>
//                               </motion.button>
//                               {review.userId === userId && (
//                                 <div className="flex gap-3">
//                                   <button
//                                     onClick={() => editReview(review)}
//                                     className="flex items-center gap-2 text-sm hover:text-teal-600 transition-colors"
//                                   >
//                                     <Edit className="h-5 w-5" />
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(review.id)}
//                                     className="flex items-center gap-2 text-sm hover:text-red-600 transition-colors"
//                                   >
//                                     <Trash className="h-5 w-5" />
//                                     Delete
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8 bg-gray-50 rounded-xl text-gray-500 text-base">
//                           No reviews yet. Be the first to share your thoughts!
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 sm:mt-10 lg:mt-12">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//               {relatedProjects.map((relatedProject) => (
//                 <motion.div
//                   key={relatedProject.id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//                 >
//                   <div className="relative h-28 sm:h-32 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover"
//                       onError={(e) => { e.target.src = "/placeholder.svg"; }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
//                       <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
//                       <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
//                     </div>
//                   </div>
//                   <div className="p-2 sm:p-3">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }










"use client"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"
import Footer from "@/app/components/HomePage/FooterSection/footer"
import Navbar from "@/app/components/HomePage/Navbar/Navbar"
import { useState, useEffect, useCallback } from "react"
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
  Edit,
  Trash,
} from "lucide-react"


// Custom Image Component with better error handling
const CustomImage = ({ src, alt, fill, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc("/placeholder.svg?height=800&width=1200");
        }
      }}
    />
  );
};


export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 })
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [likedReviews, setLikedReviews] = useState({})
  const [relatedProjects, setRelatedProjects] = useState([])
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [userReview, setUserReview] = useState(null)
  const [likeLoading, setLikeLoading] = useState(false)
  const [reviewLikeLoading, setReviewLikeLoading] = useState({})
  const [currentUser, setCurrentUser] = useState(null)
  const [userId, setUserId] = useState(null)
  const isAdmin = false // Placeholder; replace with auth

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json()
        if (data.message === "Authentication successful" && data.user) {
          setCurrentUser(data.user)
          setUserId(data.user.id)
        } else {
          setCurrentUser(null)
          setUserId(null)
          router.push("/login")
        }
      } catch (err) {
        console.error("Error fetching current user:", err)
        setError("Error fetching user information")
        router.push("/login")
      }
    }

    fetchCurrentUser()
  }, [router])

  useEffect(() => {
    const fetchProject = async () => {
      if (!userId) return
      setLoading(true)
      try {
        // Increment view count
        await fetch(`/api/projects`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: params.id, userId })
        })

        // Fetch project data
        const response = await fetch(`/api/projects/${params.id}?userId=${userId}`)
        const data = await response.json()
        if (!data.success) {
          setError(data.error || "Project not found")
          setProject(null)
        } else {
          setProject(data.data || {})
          setLikeCount(data.data?.likesCount || 0)
          setLiked(!!data.data?.userHasLiked)
          const reviewsResponse = await fetch(`/api/projects/${params.id}/reviews?userId=${userId}`)
          const reviewsData = await reviewsResponse.json()
          if (reviewsData.success) {
            setReviews(reviewsData.data || [])
            setUserReview((reviewsData.data || []).find(r => r.userId === userId))
            setLikedReviews(
              reviewsData.data.reduce((acc, review) => ({
                ...acc,
                [review.id]: review.userHasLiked || false
              }), {})
            )
          }
          const relatedResponse = await fetch(`/api/projects?category=${data.data.category}&limit=3&exclude=${params.id}`)
          const relatedData = await relatedResponse.json()
          if (relatedData.success) setRelatedProjects(relatedData.data || [])
        }
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Error fetching project: " + err.message)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.id && userId) fetchProject()
  }, [params.id, userId])

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json()
      return data.message === "Authentication successful" && data.user
    } catch (err) {
      console.error("Error checking auth:", err)
      return false
    }
  }, [])

  const handleLike = useCallback(async () => {
    if (likeLoading) return

    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const previousLiked = liked
    const previousLikeCount = likeCount
    setLikeLoading(true)
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)

    try {
      const method = liked ? "DELETE" : "POST"
      const response = await fetch(`/api/projects/${params.id}/likes`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })
      const data = await response.json()
      if (!data.success) {
        setLiked(previousLiked)
        setLikeCount(previousLikeCount)
        alert(data.error || `Failed to ${liked ? "unlike" : "like"} project`)
      }
    } catch (err) {
      setLiked(previousLiked)
      setLikeCount(previousLikeCount)
      alert(`Error ${liked ? "unliking" : "liking"} project: ${err.message}`)
    } finally {
      setLikeLoading(false)
    }
  }, [liked, likeCount, params.id, userId, likeLoading, router, checkAuth])

  const handleReviewLike = useCallback(async (reviewId) => {
    if (reviewLikeLoading[reviewId]) return

    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const previousLiked = likedReviews[reviewId] || false
    const previousLikesCount = reviews.find(r => r.id === reviewId)?.likesCount || 0
    setReviewLikeLoading(prev => ({ ...prev, [reviewId]: true }))
    setLikedReviews(prev => ({ ...prev, [reviewId]: !previousLiked }))
    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId
          ? { ...r, likesCount: previousLiked ? r.likesCount - 1 : r.likesCount + 1 }
          : r
      )
    )

    try {
      const method = previousLiked ? "DELETE" : "POST"
      const response = await fetch(`/api/reviews/${reviewId}/likes`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })
      const data = await response.json()
      if (!data.success) {
        setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
        setReviews(prev =>
          prev.map(r =>
            r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
          )
        )
        toast.error(data.error || `❌ Failed to ${previousLiked ? "unlike" : "like"} review`)

        // alert(data.error || `Failed to ${previousLiked ? "unlike" : "like"} review`)
      }
    } catch (err) {
      setLikedReviews(prev => ({ ...prev, [reviewId]: previousLiked }))
      setReviews(prev =>
        prev.map(r =>
          r.id === reviewId ? { ...r, likesCount: previousLikesCount } : r
        )
      )
      alert(`Error ${previousLiked ? "unliking" : "liking"} review: ${err.message}`)
    } finally {
      setReviewLikeLoading(prev => ({ ...prev, [reviewId]: false }))
    }
  }, [likedReviews, reviews, userId, reviewLikeLoading, router, checkAuth])

  const handleReviewChange = (e) => {
    const { name, value } = e.target
    setNewReview({ ...newReview, [name]: value })
  }

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating })
  }

  const submitReview = async (e) => {
    e.preventDefault()
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!newReview.comment.trim() || !newReview.title || !userId || !currentUser) {
      alert("Please fill in the title and comment fields and ensure you are logged in")
      return
    }
    try {
      const response = await fetch(`/api/projects/${params.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
      })
      const data = await response.json()
      if (data.success) {
        setReviews([data.data, ...reviews])
        setUserReview(data.data)
        setNewReview({ comment: "", title: "", rating: 5 })
          toast.success("🎉 Review submitted successfully!")
      } else {
        // alert(data.error || "Failed to submit review")
  toast.error(data.error || "❌ Failed to submit review")
      }
    } catch (err) {
      alert("Error submitting review: " + err.message)
    }
  }

  const editReview = (review) => {
    setEditingReviewId(review.id)
    setNewReview({ comment: review.comment, title: review.title || "", rating: review.rating })
  }

  const cancelEdit = () => {
    setEditingReviewId(null)
    setNewReview({ comment: "", title: "", rating: 5 })
  }

  const saveEditedReview = async (e) => {
    e.preventDefault()
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!newReview.comment.trim() || !newReview.title || !userId || !editingReviewId) {
      alert("Please fill in the title and comment fields and ensure you are logged in")
      return
    }
    try {
      const response = await fetch(`/api/reviews/${editingReviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newReview, userId, name: currentUser.fullName })
      })
      const data = await response.json()
      if (data.success) {
        setReviews(reviews.map(r => r.id === editingReviewId ? { ...r, ...data.data } : r))
        setUserReview(data.data)
        setEditingReviewId(null)
        setNewReview({ comment: "", title: "", rating: 5 })
             toast.success(" Review updated successfully!")
      } else {
        // alert(data.error || "Failed to update review")
        toast.error(data.error || " Failed to update review")
      }
    } catch (err) {
      alert("Error updating review: " + err.message)
    }
  }

  const deleteReview = async (reviewId) => {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!reviewId || !userId) {
      alert("Invalid review ID or user not logged in")
      return
    }
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })
      const data = await response.json()
      if (data.success) {
        setReviews(reviews.filter(r => r.id !== reviewId))
        setUserReview(null)
        setEditingReviewId(null)
        setNewReview({ comment: "", title: "", rating: 5 })
        setLikedReviews(prev => {
          const newState = { ...prev }
          delete newState[reviewId]
          return newState
        })
        toast.success("🗑️ Review deleted successfully!")
      } else {
        // alert(data.error || "Failed to delete review")
         toast.error(data.error || "❌ Failed to delete review")
      }
    } catch (err) {
      alert("Error deleting review: " + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error || "Project not found"}</h1>
        <button
          onClick={() => router.push("/projects")}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base sm:text-lg"
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

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="bg-white rounded-2xl shadow-xl mt-10 overflow-hidden">
            <div className="relative h-48 sm:h-64 md:h-80 w-full">
              <CustomImage
                src={project.image || "/placeholder.svg?height=800&width=1200"}
                alt={project.title}
                fill
                className="object-cover"
                // onError={(e) => { e.target.src = "/placeholder.svg?height=800&width=1200"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                    <span className="px-2 py-1 bg-teal-500 text-white text-xs sm:text-sm rounded-full">{project.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{project.title}</h1>
                  <p className="text-white/80 text-xs sm:text-sm max-w-md sm:max-w-xl">{project.description || "No description available"}</p>
                </motion.div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <motion.button
                    onClick={handleLike}
                    whileTap={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                    disabled={likeLoading}
                    style={{cursor:"pointer"}}
                    className={`flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors text-sm sm:text-base ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{likeCount} likes</span>
                  </motion.button>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Project
                    </Link>
                    <button
                      onClick={() => deleteReview(project.id)}
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm sm:text-base"
                    >
                      <Trash className="h-4 w-4" />
                      Delete Project
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === "overview" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === "features" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === "gallery" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === "reviews" ? "bg-teal-100 text-teal-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Reviews
                </button>
              </div>

              {activeTab === "overview" && (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <motion.div variants={fadeIn} className="md:col-span-2">
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Overview</h2>
                      <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{project.description || "No description available"}</p>
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {(project.technologies || []).map((tech) => (
                          <span
                            key={tech}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm"
                          >
                            <Tag className="h-3 w-3" />
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm sm:text-base"
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
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
                          >
                            <Github className="h-4 w-4" />
                            <span>View Code</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                    <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Details</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700 text-sm sm:text-base">Created</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{project.createdDate ? new Date(project.createdDate).toLocaleDateString() : "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700 text-sm sm:text-base">Completed</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{project.completedDate ? new Date(project.completedDate).toLocaleDateString() : "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700 text-sm sm:text-base">Status</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{project.status?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700 text-sm sm:text-base">Views</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{project.views || 0}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div variants={fadeIn}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {(project.features || []).map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
                            {index + 1}
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base">{feature}</p>
                        </div>
                      ))}
                      {!(project.features && project.features.length) && (
                        <p className="text-gray-500 text-sm sm:text-base col-span-full">No features listed for this project.</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.div variants={fadeIn}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {(project.features || []).map((feature, index) => (
                        <motion.div
                          key={index}
                          variants={fadeIn}
                          className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs sm:text-sm">
                              {index + 1}
                            </div>
                            <p className="font-medium text-gray-800 text-sm sm:text-base">{feature}</p>
                          </div>
                        </motion.div>
                      ))}
                      {!(project.features && project.features.length) && (
                        <div className="text-gray-500 text-sm sm:text-base col-span-full">
                          No features listed for this project.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "gallery" && (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.div variants={fadeIn}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Project Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {
                        (project.gallery || ["/placeholder.svg?height=300&width=400"]).map((image, index) => (
  <motion.div
    key={index}
    variants={fadeIn}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md"
  >
    <CustomImage
      src={image}
      alt={`${project.title} gallery image ${index + 1}`}
      fill
      className="object-cover"
      onError={(e) => { e.target.src = "/placeholder.svg?height=300&width=400"; }}
    />
  </motion.div>
))
                      }
                    </div>
                    {!(project.gallery && project.gallery.length) && (
                      <p className="text-gray-500 text-sm sm:text-base mt-4">No gallery images available for this project.</p>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.div variants={fadeIn}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">Customer Reviews</h2>
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-5">Leave Your Feedback</h3>
                      {!currentUser ? (
                        <p className="text-gray-600 text-base">
                          Please <Link href="/login" className="text-teal-600 hover:underline font-medium">log in</Link> to submit a review.
                        </p>
                      ) : (
                        <form onSubmit={editingReviewId ? saveEditedReview : submitReview} className="space-y-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Reviewing as: <span className="font-medium text-gray-800">{currentUser.fullName}</span></p>
                            <div className="flex items-center gap-1 mb-4">
                              <label className="block text-sm font-medium text-gray-700 mr-4">Rating:</label>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                     style={{cursor:"pointer"}}
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
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Review Title
                              </label>
                              <input
                                id="title"
                                name="title"
                                value={newReview.title}
                                onChange={handleReviewChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
                                placeholder="Summarize your experience (e.g., 'Great Project!')"
                                required
                              />
                            </div>
                            <div className="mt-4">
                              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review
                              </label>
                              <textarea
                                id="comment"
                                name="comment"
                                value={newReview.comment}
                                onChange={handleReviewChange}
                                rows={4}
                                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
                                placeholder="Share your detailed thoughts about this project..."
                                required
                              ></textarea>
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="submit"
                                 style={{cursor:"pointer"}}
                                className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base font-medium shadow-md"
                              >
                                <Send className="h-5 w-5" />
                                {editingReviewId ? "Save Changes" : "Submit Review"}
                              </button>
                              {editingReviewId && (
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-base font-medium shadow-md"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                    <div className="space-y-6">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <motion.div
                            key={review.id}
                            variants={fadeIn}
                            className="bg-white border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {review.name}
                                  </span>
                                  <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-5 w-5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-1">({review.rating}/5)</span>
                              </div>
                            </div>
                            <h4 className="text-xl font-semibold text-teal-700 mb-3 border-b pb-2 border-teal-100">
                              {review.title}
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed mb-4">{review.comment}</p>
                            {review.adminReply && (
                              <p className="text-gray-700 text-sm italic bg-gray-50 p-3 rounded-lg mt-2">
                                Admin Reply: {review.adminReply}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-4 border-t pt-3 border-gray-100">
                              <motion.button
                                onClick={() => handleReviewLike(review.id)}
                                whileTap={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                                 style={{cursor:"pointer"}}
                                disabled={reviewLikeLoading[review.id]}
                                className={`flex items-center gap-2 text-sm text-black hover:text-rose-500 transition-colors ${reviewLikeLoading[review.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                <Heart className={`h-5 w-5 ${likedReviews[review.id] ? "fill-rose-500 text-rose-500" : ""}`} />
                                <span>{review.likesCount} likes</span>
                              </motion.button>
                              {review.userId === userId && (
                                <div className="flex gap-4">
                                  <button
                                    onClick={() => editReview(review)}
                                     style={{cursor:"pointer"}}
                                    className="flex items-center gap-2 text-black text-sm hover:text-teal-600 transition-colors"
                                  >
                                    <Edit className="h-5 w-5" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteReview(review.id)}
                                     style={{cursor:"pointer"}}
                                    className="flex items-center gap-2 text-sm text-black hover:text-red-600 transition-colors"
                                  >
                                    <Trash className="h-5 w-5" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-xl text-gray-500 text-base">
                          No reviews yet. Be the first to share your thoughts!
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {relatedProjects.map((relatedProject) => (
                <motion.div
                  key={relatedProject.id}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-28 sm:h-32 w-full">
                  <CustomImage
  src={project.image || "/placeholder.svg?height=800&width=1200"}
  alt={project.title}
  fill
  className="object-cover"
  onError={(e) => {
    e.target.src = "/placeholder.svg?height=800&width=1200";
  }}
/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
                      <h3 className="font-bold text-sm sm:text-base">{relatedProject.title}</h3>
                      <p className="text-xs sm:text-sm text-white/80">{relatedProject.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}</p>
                    </div>
                  </div>
                  <div className="p-2 sm:p-3">
                    <Link
                      href={`/projects/${relatedProject.id}`}
                      className="flex items-center justify-between text-teal-600 font-medium text-sm sm:text-base"
                    >
                      <span>View Project</span>
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}