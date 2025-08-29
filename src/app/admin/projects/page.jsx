// "use client"

// import { useState } from "react"

// export default function ProjectsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedStatus, setSelectedStatus] = useState("all")
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [selectedProject, setSelectedProject] = useState(null)
//   const [viewMode, setViewMode] = useState("grid") // grid or list

//   // Mock data - replace with actual data fetching
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: "E-commerce Platform",
//       description: "A modern e-commerce platform built with React and Node.js",
//       category: "web-development",
//       status: "completed",
//       technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//       image: "/ecommerce-platform-concept.png",
//       liveUrl: "https://example.com",
//       githubUrl: "https://github.com/example/project",
//       createdDate: "2024-01-15",
//       completedDate: "2024-01-20",
//       likes: 45,
//       views: 1250,
//     },
//     {
//       id: 2,
//       title: "Mobile Banking App",
//       description: "Secure mobile banking application with biometric authentication",
//       category: "mobile-development",
//       status: "in-progress",
//       technologies: ["React Native", "Firebase", "Node.js"],
//       image: "/mobile-banking-app.png",
//       liveUrl: "",
//       githubUrl: "https://github.com/example/banking-app",
//       createdDate: "2024-01-10",
//       completedDate: null,
//       likes: 23,
//       views: 890,
//     },
//     {
//       id: 3,
//       title: "Portfolio Website",
//       description: "Personal portfolio website with modern design and animations",
//       category: "web-design",
//       status: "completed",
//       technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
//       image: "/portfolio-website-showcase.png",
//       liveUrl: "https://portfolio.example.com",
//       githubUrl: "https://github.com/example/portfolio",
//       createdDate: "2024-01-05",
//       completedDate: "2024-01-12",
//       likes: 67,
//       views: 2100,
//     },
//     {
//       id: 4,
//       title: "Task Management System",
//       description: "Collaborative task management system for teams",
//       category: "web-development",
//       status: "planning",
//       technologies: ["Vue.js", "Express.js", "PostgreSQL"],
//       image: "/task-management-system.png",
//       liveUrl: "",
//       githubUrl: "",
//       createdDate: "2024-01-18",
//       completedDate: null,
//       likes: 12,
//       views: 340,
//     },
//   ])

//   const categories = [
//     { value: "all", label: "All Categories" },
//     { value: "web-development", label: "Web Development" },
//     { value: "mobile-development", label: "Mobile Development" },
//     { value: "web-design", label: "Web Design" },
//     { value: "ui-ux", label: "UI/UX Design" },
//   ]

//   const statuses = [
//     { value: "all", label: "All Status" },
//     { value: "planning", label: "Planning" },
//     { value: "in-progress", label: "In Progress" },
//     { value: "completed", label: "Completed" },
//     { value: "on-hold", label: "On Hold" },
//   ]

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
//     const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
//     return matchesSearch && matchesCategory && matchesStatus
//   })

//   const handleAddProject = (projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       createdDate: new Date().toISOString().split("T")[0],
//       completedDate: projectData.status === "completed" ? new Date().toISOString().split("T")[0] : null,
//       likes: 0,
//       views: 0,
//     }
//     setProjects([...projects, newProject])
//     setShowAddModal(false)
//   }

//   const handleEditProject = (projectData) => {
//     setProjects(
//       projects.map((project) =>
//         project.id === selectedProject.id
//           ? {
//               ...project,
//               ...projectData,
//               completedDate:
//                 projectData.status === "completed" && project.status !== "completed"
//                   ? new Date().toISOString().split("T")[0]
//                   : project.completedDate,
//             }
//           : project,
//       ),
//     )
//     setShowEditModal(false)
//     setSelectedProject(null)
//   }

//   const handleDeleteProject = (projectId) => {
//     if (confirm("Are you sure you want to delete this project?")) {
//       setProjects(projects.filter((project) => project.id !== projectId))
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-100 text-green-800"
//       case "in-progress":
//         return "bg-blue-100 text-blue-800"
//       case "planning":
//         return "bg-yellow-100 text-yellow-800"
//       case "on-hold":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-emerald-800">Project Management</h1>
//             <p className="text-emerald-600 mt-1">Manage your portfolio projects</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex bg-emerald-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-md transition-colors ${
//                   viewMode === "grid" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
//                 }`}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                   />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-md transition-colors ${
//                   viewMode === "list" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
//                 }`}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 10h16M4 14h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Add Project
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Search Projects</label>
//             <input
//               type="text"
//               placeholder="Search by title, description, or technology..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             >
//               {categories.map((category) => (
//                 <option key={category.value} value={category.value}>
//                   {category.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             >
//               {statuses.map((status) => (
//                 <option key={status.value} value={status.value}>
//                   {status.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Projects Display */}
//       {viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <div key={project.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
//               <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="text-lg font-semibold text-emerald-800 line-clamp-1">{project.title}</h3>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                     {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                   </span>
//                 </div>
//                 <p className="text-emerald-600 text-sm mb-4 line-clamp-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {project.technologies.slice(0, 3).map((tech) => (
//                     <span key={tech} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
//                       {tech}
//                     </span>
//                   ))}
//                   {project.technologies.length > 3 && (
//                     <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
//                       +{project.technologies.length - 3}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
//                   <div className="flex items-center gap-4">
//                     <span className="flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                         />
//                       </svg>
//                       {project.likes}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                       </svg>
//                       {project.views}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project)
//                       setShowEditModal(true)
//                     }}
//                     className="flex-1 px-3 py-2 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProject(project.id)}
//                     className="px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-emerald-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Project</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Category</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Technologies</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Stats</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-emerald-100">
//                 {filteredProjects.map((project) => (
//                   <tr key={project.id} className="hover:bg-emerald-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={project.image || "/placeholder.svg"}
//                           alt={project.title}
//                           className="w-12 h-12 rounded-lg object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-emerald-800">{project.title}</p>
//                           <p className="text-sm text-emerald-600 line-clamp-1">{project.description}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
//                         {project.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                         {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {project.technologies.slice(0, 2).map((tech) => (
//                           <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                             {tech}
//                           </span>
//                         ))}
//                         {project.technologies.length > 2 && (
//                           <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
//                             +{project.technologies.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-emerald-600">
//                       <div className="flex items-center gap-3">
//                         <span>{project.likes} likes</span>
//                         <span>{project.views} views</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => {
//                             setSelectedProject(project)
//                             setShowEditModal(true)
//                           }}
//                           className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
//                           title="Edit Project"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                             />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => handleDeleteProject(project.id)}
//                           className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                           title="Delete Project"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Add Project Modal */}
//       {showAddModal && (
//         <ProjectModal title="Add New Project" onClose={() => setShowAddModal(false)} onSubmit={handleAddProject} />
//       )}

//       {/* Edit Project Modal */}
//       {showEditModal && selectedProject && (
//         <ProjectModal
//           title="Edit Project"
//           project={selectedProject}
//           onClose={() => {
//             setShowEditModal(false)
//             setSelectedProject(null)
//           }}
//           onSubmit={handleEditProject}
//         />
//       )}
//     </div>
//   )
// }

// function ProjectModal({ title, project, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: project?.title || "",
//     description: project?.description || "",
//     category: project?.category || "web-development",
//     status: project?.status || "planning",
//     technologies: project?.technologies?.join(", ") || "",
//     image: project?.image || "",
//     liveUrl: project?.liveUrl || "",
//     githubUrl: project?.githubUrl || "",
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const projectData = {
//       ...formData,
//       technologies: formData.technologies
//         .split(",")
//         .map((tech) => tech.trim())
//         .filter(Boolean),
//     }
//     onSubmit(projectData)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-emerald-100">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-emerald-800">{title}</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">Project Title</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">Category</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="web-development">Web Development</option>
//                 <option value="mobile-development">Mobile Development</option>
//                 <option value="web-design">Web Design</option>
//                 <option value="ui-ux">UI/UX Design</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Description</label>
//             <textarea
//               required
//               rows={3}
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="planning">Planning</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//                 <option value="on-hold">On Hold</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">Technologies</label>
//               <input
//                 type="text"
//                 placeholder="React, Node.js, MongoDB (comma separated)"
//                 value={formData.technologies}
//                 onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Project Image URL</label>
//             <input
//               type="url"
//               value={formData.image}
//               onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">Live URL</label>
//               <input
//                 type="url"
//                 value={formData.liveUrl}
//                 onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-emerald-700 mb-2">GitHub URL</label>
//               <input
//                 type="url"
//                 value={formData.githubUrl}
//                 onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
//                 className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//             >
//               {project ? "Update" : "Add"} Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }















"use client"

import { useState, useEffect } from "react"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "web-design", label: "Web Design" },
    { value: "ui-ux", label: "UI/UX Design" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "planning", label: "Planning" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" },
  ]

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const query = new URLSearchParams({ 
          searchTerm,
          category: selectedCategory,
          status: selectedStatus
        }).toString()
        const response = await fetch(`/api/projects?${query}`)
        const data = await response.json()
        
        if (data.success) {
          setProjects(data.data)
          setError(null)
        } else {
          setError(data.error || 'Failed to fetch projects')
        }
      } catch (err) {
        setError('Error fetching projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [searchTerm, selectedCategory, selectedStatus])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddProject = async (projectData, imageFile) => {
    try {
      const formData = new FormData();
      Object.entries(projectData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setProjects([...projects, data.data])
        setShowAddModal(false)
        setError(null)
      } else {
        setError(data.error || 'Failed to add project')
      }
    } catch (err) {
      setError('Error adding project')
    }
  }

  const handleEditProject = async (projectData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('id', selectedProject.id);
      Object.entries(projectData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('/api/projects', {
        method: 'PUT',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setProjects(projects.map((project) => 
          project.id === selectedProject.id ? data.data : project
        ))
        setShowEditModal(false)
        setSelectedProject(null)
        setError(null)
      } else {
        setError(data.error || 'Failed to update project')
      }
    } catch (err) {
      setError('Error updating project')
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects?id=${projectId}`, {
          method: 'DELETE',
        })
        const data = await response.json()

        if (data.success) {
          setProjects(projects.filter((project) => project.id !== projectId))
          setError(null)
        } else {
          setError(data.error || 'Failed to delete project')
        }
      } catch (err) {
        setError('Error deleting project')
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "on-hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center text-emerald-600">Loading projects...</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Project Management</h1>
            <p className="text-emerald-600 mt-1">Manage your portfolio projects</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-emerald-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Project
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Search Projects</label>
            <input
              type="text"
              placeholder="Search by title, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
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
        </div>
      </div>

      {!isLoading && viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-emerald-800 line-clamp-1">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <p className="text-emerald-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
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
                      {project.views}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(project)
                      setShowEditModal(true)
                    }}
                    className="flex-1 px-3 py-2 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Technologies</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Stats</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-emerald-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-emerald-800">{project.title}</p>
                          <p className="text-sm text-emerald-600 line-clamp-1">{project.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {project.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-emerald-600">
                      <div className="flex items-center gap-3">
                        <span>{project.likes} likes</span>
                        <span>{project.views} views</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProject(project)
                            setShowEditModal(true)
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
        )}

        {showAddModal && (
          <ProjectModal 
            title="Add New Project" 
            onClose={() => setShowAddModal(false)} 
            onSubmit={handleAddProject} 
          />
        )}

        {showEditModal && selectedProject && (
          <ProjectModal
            title="Edit Project"
            project={selectedProject}
            onClose={() => {
              setShowEditModal(false)
              setSelectedProject(null)
            }}
            onSubmit={handleEditProject}
          />
        )}
      </div>
    )
  }

  function ProjectModal({ title, project, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
      title: project?.title || "",
      description: project?.description || "",
      category: project?.category || "web-development",
      status: project?.status || "planning",
      technologies: project?.technologies?.join(", ") || "",
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
    })
    const [imageFile, setImageFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(project?.image || "/placeholder.svg")

    const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setImageFile(file)
        setPreviewUrl(URL.createObjectURL(file))
      }
    }

    const handleSubmit = () => {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      }
      onSubmit(projectData, imageFile)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-emerald-800">{title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="web-development">Web Development</option>
                  <option value="mobile-development">Mobile Development</option>
                  <option value="web-design">Web Design</option>
                  <option value="ui-ux">UI/UX Design</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">Technologies</label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {project ? "Update" : "Add"} Project
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }