// "use client"

// import Link from "next/link"
// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
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

// const projects = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     category: "Web Development",
//     description:
//       "A full-featured e-commerce platform with product management, shopping cart, and payment processing capabilities. Built with modern web technologies for optimal performance and user experience.",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["Featured", "Web", "E-commerce", "React", "Node.js"],
//     technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
//     features: [
//       "User authentication and profiles",
//       "Product catalog with search and filtering",
//       "Shopping cart and checkout process",
//       "Payment processing with Stripe",
//       "Order tracking and history",
//       "Admin dashboard for product management",
//     ],
//     completedDate: "June 2023",
//     duration: "4 months",
//     client: "RetailTech Inc.",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/project",
//     featured: true,
//     gallery: [
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//     ],
//   },
//   {
//     id: 2,
//     title: "Health & Fitness App",
//     category: "Mobile Development",
//     description:
//       "A comprehensive health and fitness application that helps users track their workouts, nutrition, and progress. Features include customizable workout plans, meal tracking, and progress analytics.",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["Mobile", "UI/UX", "Health", "React Native"],
//     technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
//     features: [
//       "Personalized workout plans",
//       "Nutrition and meal tracking",
//       "Progress visualization with charts",
//       "Social sharing capabilities",
//       "Integration with health devices",
//       "Customizable fitness goals",
//     ],
//     completedDate: "October 2023",
//     duration: "3 months",
//     client: "FitLife Solutions",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/project",
//     featured: false,
//     gallery: [
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//     ],
//   },
//   {
//     id: 3,
//     title: "Smart Home Dashboard",
//     category: "IoT",
//     description:
//       "An intuitive dashboard for managing smart home devices and monitoring energy usage. The system integrates with various IoT devices to provide a centralized control interface.",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["IoT", "Dashboard", "Smart Home", "Next.js"],
//     technologies: ["Next.js", "MQTT", "Socket.io", "D3.js", "Tailwind CSS"],
//     features: [
//       "Real-time device status monitoring",
//       "Energy usage analytics",
//       "Automated routines and schedules",
//       "Voice command integration",
//       "Mobile responsive design",
//       "Custom alerts and notifications",
//     ],
//     completedDate: "January 2024",
//     duration: "5 months",
//     client: "SmartLiving Technologies",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/project",
//     featured: true,
//     gallery: [
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=300&width=400",
//     ],
//   },
// ]

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
//       setLikeCount(Math.floor(Math.random() * 50) + 10)
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
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600" />
//       </div>
//     )
//   }

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Project not found</h1>
//         <button
//           onClick={() => router.push("/projects")}
//           className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//         >
//           Back to Projects
//         </button>
//       </div>
//     )
//   }

//   const averageRating = reviews.length
//     ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//     : 0

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200">
//       <div className="container mx-auto px-4 py-8">
//         <button
//           onClick={() => router.push("/projects")}
//           className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8 group"
//         >
//           <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
//           <span>Back to Projects</span>
//         </button>

//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//           <div className="relative h-64 md:h-96 w-full">
//             <Image
//               src={project.image || "/placeholder.svg?height=800&width=1200"}
//               alt={project.title}
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//             <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full font-medium">
//                   {project.category}
//                 </span>
//                 {project.featured && (
//                   <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm rounded-full flex items-center gap-1 font-medium">
//                     <Star className="h-3 w-3 fill-current" />
//                     Featured
//                   </span>
//                 )}
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
//               <p className="text-white/80 max-w-2xl text-lg">{project.description}</p>
//             </div>
//           </div>

//           <div className="p-6 md:p-8">
//             {/* Like and Rating Summary */}
//             <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-200">
//               <div className="flex items-center gap-6">
//                 <button
//                   onClick={handleLike}
//                   className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors group"
//                 >
//                   <Heart
//                     className={`h-5 w-5 transition-transform group-hover:scale-110 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
//                   />
//                   <span className="font-medium">{likeCount} likes</span>
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
//                   <span className="text-gray-600 font-medium">
//                     {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
//               {["overview", "features", "gallery", "reviews"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     activeTab === tab
//                       ? "bg-emerald-100 text-emerald-800 shadow-sm"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             {activeTab === "overview" && (
//               <div className="space-y-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                   <div className="lg:col-span-2 space-y-6">
//                     <div>
//                       <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Overview</h2>
//                       <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
//                     </div>

//                     <div>
//                       <h3 className="text-xl font-bold mb-4 text-gray-800">Technologies Used</h3>
//                       <div className="flex flex-wrap gap-3">
//                         {project.technologies.map((tech) => (
//                           <span
//                             key={tech}
//                             className="flex items-center gap-1 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium"
//                           >
//                             <Tag className="h-3 w-3" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-4">
//                       {project.liveUrl && (
//                         <a
//                           href={project.liveUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium shadow-lg hover:shadow-xl"
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
//                           className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition-colors font-medium shadow-lg hover:shadow-xl"
//                         >
//                           <Github className="h-4 w-4" />
//                           <span>View Code</span>
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-2xl p-6">
//                     <h3 className="text-lg font-bold mb-6 text-gray-800">Project Details</h3>
//                     <div className="space-y-6">
//                       <div className="flex items-start gap-3">
//                         <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
//                         <div>
//                           <p className="font-semibold text-gray-700">Completed</p>
//                           <p className="text-gray-600">{project.completedDate}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Clock className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
//                         <div>
//                           <p className="font-semibold text-gray-700">Duration</p>
//                           <p className="text-gray-600">{project.duration}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Users className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
//                         <div>
//                           <p className="font-semibold text-gray-700">Client</p>
//                           <p className="text-gray-600">{project.client}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "features" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {project.features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                     >
//                       <div className="flex items-start gap-4">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
//                           {index + 1}
//                         </div>
//                         <p className="font-medium text-gray-800 leading-relaxed">{feature}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "gallery" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Gallery</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {(
//                     project.gallery || [
//                       "/placeholder.svg?height=300&width=400",
//                       "/placeholder.svg?height=300&width=400",
//                       "/placeholder.svg?height=300&width=400",
//                     ]
//                   ).map((image, index) => (
//                     <div
//                       key={index}
//                       className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
//                     >
//                       <Image
//                         src={image || "/placeholder.svg"}
//                         alt={`${project.title} gallery image ${index + 1}`}
//                         fill
//                         className="object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews & Ratings</h2>

//                 {/* Add Review Form */}
//                 <div className="bg-gray-50 rounded-2xl p-6 mb-8">
//                   <h3 className="text-lg font-bold mb-4 text-gray-800">Write a Review</h3>
//                   <form onSubmit={submitReview} className="space-y-4">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={newReview.name}
//                         onChange={handleReviewChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                         placeholder="Enter your name"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
//                       <div className="flex gap-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <button
//                             key={star}
//                             type="button"
//                             onClick={() => handleRatingChange(star)}
//                             className="focus:outline-none hover:scale-110 transition-transform"
//                           >
//                             <Star
//                               className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Review
//                       </label>
//                       <textarea
//                         id="comment"
//                         name="comment"
//                         value={newReview.comment}
//                         onChange={handleReviewChange}
//                         rows={4}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
//                         placeholder="Share your thoughts about this project..."
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium shadow-lg hover:shadow-xl"
//                     >
//                       <Send className="h-4 w-4" />
//                       Submit Review
//                     </button>
//                   </form>
//                 </div>

//                 {/* Reviews List */}
//                 <div className="space-y-6">
//                   {reviews.length > 0 ? (
//                     reviews.map((review) => (
//                       <div
//                         key={review.id}
//                         className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="font-semibold text-gray-800">{review.name}</div>
//                           <div className="text-sm text-gray-500">{review.date}</div>
//                         </div>
//                         <div className="flex mb-3">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star
//                               key={star}
//                               className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                             />
//                           ))}
//                         </div>
//                         <p className="text-gray-600 leading-relaxed">{review.comment}</p>
//                         <div className="flex items-center gap-2 mt-4 text-gray-500">
//                           <button className="flex items-center gap-1 text-sm hover:text-emerald-600 transition-colors">
//                             <ThumbsUp className="h-4 w-4" />
//                             Helpful
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-12 text-gray-500">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Star className="w-8 h-8 text-gray-400" />
//                       </div>
//                       <p className="text-lg">No reviews yet. Be the first to review this project!</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Projects */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold mb-8 text-gray-800">More Projects</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {projects
//               .filter((p) => p.id !== project.id)
//               .slice(0, 3)
//               .map((relatedProject) => (
//                 <div
//                   key={relatedProject.id}
//                   className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
//                 >
//                   <div className="relative h-48 w-full">
//                     <Image
//                       src={relatedProject.image || "/placeholder.svg?height=300&width=400"}
//                       alt={relatedProject.title}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-0 left-0 p-4 text-white">
//                       <h3 className="font-bold text-lg">{relatedProject.title}</h3>
//                       <p className="text-sm text-white/80">{relatedProject.category}</p>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <Link
//                       href={`/projects/${relatedProject.id}`}
//                       className="flex items-center justify-between text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link"
//                     >
//                       <span>View Project</span>
//                       <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


















