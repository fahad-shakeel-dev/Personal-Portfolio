// "use client"

// import { useState } from "react"

// export default function UsersPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedRole, setSelectedRole] = useState("all")
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [selectedUser, setSelectedUser] = useState(null)

//   // Mock data - replace with actual data fetching
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Smith",
//       email: "john@example.com",
//       role: "admin",
//       status: "active",
//       joinDate: "2024-01-15",
//       lastLogin: "2024-01-20",
//       avatar: "/diverse-user-avatars.png",
//     },
//     {
//       id: 2,
//       name: "Sarah Johnson",
//       email: "sarah@example.com",
//       role: "user",
//       status: "active",
//       joinDate: "2024-01-10",
//       lastLogin: "2024-01-19",
//       avatar: "/diverse-user-avatars.png",
//     },
//     {
//       id: 3,
//       name: "Mike Davis",
//       email: "mike@example.com",
//       role: "moderator",
//       status: "inactive",
//       joinDate: "2024-01-05",
//       lastLogin: "2024-01-15",
//       avatar: "/diverse-user-avatars.png",
//     },
//     {
//       id: 4,
//       name: "Emily Wilson",
//       email: "emily@example.com",
//       role: "user",
//       status: "active",
//       joinDate: "2024-01-12",
//       lastLogin: "2024-01-20",
//       avatar: "/diverse-user-avatars.png",
//     },
//   ])

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesRole = selectedRole === "all" || user.role === selectedRole
//     return matchesSearch && matchesRole
//   })

//   const handleAddUser = (userData) => {
//     const newUser = {
//       id: users.length + 1,
//       ...userData,
//       joinDate: new Date().toISOString().split("T")[0],
//       lastLogin: "Never",
//       avatar: "/diverse-user-avatars.png",
//     }
//     setUsers([...users, newUser])
//     setShowAddModal(false)
//   }

//   const handleEditUser = (userData) => {
//     setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...userData } : user)))
//     setShowEditModal(false)
//     setSelectedUser(null)
//   }

//   const handleDeleteUser = (userId) => {
//     if (confirm("Are you sure you want to delete this user?")) {
//       setUsers(users.filter((user) => user.id !== userId))
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-emerald-800">User Management</h1>
//             <p className="text-emerald-600 mt-1">Manage all registered users</p>
//           </div>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add New User
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Search Users</label>
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Filter by Role</label>
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//               className="px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             >
//               <option value="all">All Roles</option>
//               <option value="admin">Admin</option>
//               <option value="moderator">Moderator</option>
//               <option value="user">User</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-emerald-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">User</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Role</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Join Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Last Login</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-emerald-100">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-emerald-50">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={user.avatar || "/placeholder.svg"}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium text-emerald-800">{user.name}</p>
//                         <p className="text-sm text-emerald-600">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         user.role === "admin"
//                           ? "bg-red-100 text-red-800"
//                           : user.role === "moderator"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-emerald-600">{user.joinDate}</td>
//                   <td className="px-6 py-4 text-sm text-emerald-600">{user.lastLogin}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedUser(user)
//                           setShowEditModal(true)
//                         }}
//                         className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
//                         title="Edit User"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(user.id)}
//                         className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                         title="Delete User"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add User Modal */}
//       {showAddModal && (
//         <UserModal title="Add New User" onClose={() => setShowAddModal(false)} onSubmit={handleAddUser} />
//       )}

//       {/* Edit User Modal */}
//       {showEditModal && selectedUser && (
//         <UserModal
//           title="Edit User"
//           user={selectedUser}
//           onClose={() => {
//             setShowEditModal(false)
//             setSelectedUser(null)
//           }}
//           onSubmit={handleEditUser}
//         />
//       )}
//     </div>
//   )
// }

// function UserModal({ title, user, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     role: user?.role || "user",
//     status: user?.status || "active",
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
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
//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Name</label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Email</label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Role</label>
//             <select
//               value={formData.role}
//               onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             >
//               <option value="user">User</option>
//               <option value="moderator">Moderator</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
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
//               {user ? "Update" : "Add"} User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }





















"use client"

import { useState, useEffect } from "react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const query = new URLSearchParams({ 
          searchTerm,
          role: selectedRole
        }).toString()
        const response = await fetch(`/api/users?${query}`)
        const data = await response.json()
        
        if (data.success) {
          setUsers(data.data)
          setError(null)
        } else {
          setError(data.error || 'Failed to fetch users')
        }
      } catch (err) {
        setError('Error fetching users')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [searchTerm, selectedRole])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const data = await response.json()

      if (data.success) {
        setUsers([...users, data.data])
        setShowAddModal(false)
        setError(null)
      } else {
        setError(data.error || 'Failed to add user')
      }
    } catch (err) {
      setError('Error adding user')
    }
  }

  const handleEditUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUser.id, ...userData }),
      })
      const data = await response.json()

      if (data.success) {
        setUsers(users.map((user) => 
          user.id === selectedUser.id ? data.data : user
        ))
        setShowEditModal(false)
        setSelectedUser(null)
        setError(null)
      } else {
        setError(data.error || 'Failed to update user')
      }
    } catch (err) {
      setError('Error updating user')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users?id=${userId}`, {
          method: 'DELETE',
        })
        const data = await response.json()

        if (data.success) {
          setUsers(users.filter((user) => user.id !== userId))
          setError(null)
        } else {
          setError(data.error || 'Failed to delete user')
        }
      } catch (err) {
        setError('Error deleting user')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-emerald-600">Loading users...</div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">User Management</h1>
            <p className="text-emerald-600 mt-1">Manage all registered users</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-emerald-700 mb-2">Search Users</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Filter by Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {!isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Last Login</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-emerald-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-emerald-800">{user.name}</p>
                          <p className="text-sm text-emerald-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "moderator"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-emerald-600">{user.joinDate}</td>
                    <td className="px-6 py-4 text-sm text-emerald-600">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowEditModal(true)
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Edit User"
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
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete User"
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

      {/* Add User Modal */}
      {showAddModal && (
        <UserModal title="Add New User" onClose={() => setShowAddModal(false)} onSubmit={handleAddUser} />
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <UserModal
          title="Edit User"
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
          }}
          onSubmit={handleEditUser}
        />
      )}
    </div>
  )
}

function UserModal({ title, user, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    status: user?.status || "active",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
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
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {user ? "Update" : "Add"} User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}