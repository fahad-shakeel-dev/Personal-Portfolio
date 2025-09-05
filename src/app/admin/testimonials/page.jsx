
'use client';
import { useState, useEffect, useRef } from 'react';

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState('');
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const avatarModalRef = useRef(null);

  const defaultAvatars = [
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar9_r88w9r.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar7_hqclp5.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar8_v50w6m.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar6_y0lm7e.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar4_cq9q95.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar5_bcmpah.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar2_byyu3g.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar3_mepqpe.png',
    'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png',
  ];

  const defaultPlaceholder = 'https://via.placeholder.com/150';

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-design', label: 'Mobile Design' },
    { value: 'branding', label: 'Branding' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'e-commerce', label: 'E-commerce' },
  ];

  // Load Cloudinary Upload Widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?all=true', { credentials: 'include' });
        if (res.ok) {
          const { testimonials } = await res.json();
          setTestimonials(testimonials);
        } else {
          const data = await res.json();
          setMessage(data.message || 'Failed to fetch testimonials.');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setMessage('Failed to load testimonials. Please try again.');
      }
    };
    fetchTestimonials();
  }, []);

  // Prevent background scrolling for modals
  useEffect(() => {
    if (showAddModal || showEditModal || showDeleteModal || showAvatarModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddModal, showEditModal, showDeleteModal, showAvatarModal]);

  const statuses = [
    { value: 'all', label: 'All Status', count: testimonials.length },
    { value: 'pending', label: 'Pending', count: testimonials.filter((t) => t.status === 'pending').length },
    { value: 'approved', label: 'Approved', count: testimonials.filter((t) => t.status === 'approved').length },
    { value: 'rejected', label: 'Rejected', count: testimonials.filter((t) => t.status === 'rejected').length },
  ];

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (testimonial.projectType && testimonial.projectType.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || testimonial.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || testimonial.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = async (testimonialId, newStatus) => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonialId, status: newStatus }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        const { testimonial } = data;
        setTestimonials(
          testimonials.map((t) =>
            t._id === testimonialId
              ? {
                  ...t,
                  status: testimonial.status,
                  approvedDate: testimonial.approvedDate ? testimonial.approvedDate : t.approvedDate,
                }
              : t
          )
        );
        setMessage(`Status updated to ${newStatus} successfully!`);
      } else {
        setMessage(data.message || 'Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Failed to update status. Please try again.');
    }
  };

  const handleToggleFeatured = async (testimonialId) => {
    const testimonial = testimonials.find((t) => t._id === testimonialId);
    const newFeatured = !testimonial.featured;
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonialId, featured: newFeatured }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        const { testimonial } = data;
        setTestimonials(
          testimonials.map((t) =>
            t._id === testimonialId ? { ...t, featured: testimonial.featured } : t
          )
        );
        setMessage(`Testimonial ${newFeatured ? 'featured' : 'unfeatured'} successfully!`);
      } else {
        setMessage(data.message || 'Failed to toggle featured status.');
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      setMessage('Failed to toggle featured status. Please try again.');
    }
  };

  const handleToggleDisplay = async (testimonialId) => {
    const testimonial = testimonials.find((t) => t._id === testimonialId);
    const newDisplay = !testimonial.displayOnPortfolio;
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonialId, displayOnPortfolio: newDisplay }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        const { testimonial } = data;
        setTestimonials(
          testimonials.map((t) =>
            t._id === testimonialId ? { ...t, displayOnPortfolio: testimonial.displayOnPortfolio } : t
          )
        );
        setMessage(`Testimonial ${newDisplay ? 'displayed' : 'hidden'} successfully!`);
      } else {
        setMessage(data.message || 'Failed to toggle display status.');
      }
    } catch (error) {
      console.error('Error toggling display:', error);
      setMessage('Failed to toggle display status. Please try again.');
    }
  };

  const handleAddTestimonial = async (newTestimonial) => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTestimonial,
          userId: null,
          date: new Date().toISOString(),
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        const { testimonial } = data;
        setTestimonials([testimonial, ...testimonials]);
        setMessage('Testimonial added successfully!');
        setShowAddModal(false);
      } else {
        setMessage(data.message || 'Failed to add testimonial.');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      setMessage('Failed to add testimonial. Please try again.');
    }
  };

  const handleEditTestimonial = async (updatedTestimonial) => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedTestimonial._id,
          name: updatedTestimonial.name,
          email: updatedTestimonial.email,
          role: updatedTestimonial.role,
          company: updatedTestimonial.company,
          quote: updatedTestimonial.quote,
          rating: Number(updatedTestimonial.rating),
          avatar: updatedTestimonial.avatar,
          category: updatedTestimonial.category,
          projectType: updatedTestimonial.projectType,
          projectUrl: updatedTestimonial.projectUrl,
          tags: updatedTestimonial.tags,
          status: updatedTestimonial.status,
          featured: updatedTestimonial.featured,
          displayOnPortfolio: updatedTestimonial.displayOnPortfolio,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        const { testimonial } = data;
        setTestimonials(
          testimonials.map((t) =>
            t._id === testimonial._id
              ? {
                  ...testimonial,
                  _id: testimonial._id.toString(),
                  approvedDate: testimonial.approvedDate ? testimonial.approvedDate : null,
                }
              : t
          )
        );
        setMessage('Testimonial updated successfully!');
        setShowEditModal(false);
        setSelectedTestimonial(null);
      } else {
        setMessage(data.message || 'Failed to update testimonial.');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      setMessage('Failed to update testimonial. Please try again.');
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonialId }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t._id !== testimonialId));
        setMessage('Testimonial deleted successfully!');
        setShowDeleteModal(false);
        setSelectedTestimonial(null);
      } else {
        setMessage(data.message || 'Failed to delete testimonial.');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setMessage('Failed to delete testimonial. Please try again.');
    }
  };

  const handleOpenCloudinaryWidget = (setFormData) => {
    if (typeof window.cloudinary === 'undefined') {
      setMessage('Cloudinary widget failed to load. Please try again.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        resourceType: 'image',
        folder: 'avatars',
        clientAllowedFormats: ['jpg', 'png', 'jpeg'],
        maxFileSize: 5000000,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setFormData((prev) => ({ ...prev, avatar: result.info.secure_url }));
          setShowAvatarModal(false);
        } else if (error) {
          console.error('Cloudinary upload error:', error);
          setMessage('Failed to upload image. Please try again.');
        }
      }
    );
    widget.open();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox='0 0 20 20'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ));
  };

  const featuredCount = testimonials.filter((t) => t.featured).length;
  const displayedCount = testimonials.filter((t) => t.displayOnPortfolio).length;
  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : 0;

  const handleOutsideClick = (e, setModalState) => {
    if (e.target === e.currentTarget) {
      setModalState(false);
      if (setModalState === setShowEditModal || setModalState === setShowDeleteModal) {
        setSelectedTestimonial(null);
      }
      if (setModalState === setShowAvatarModal) {
        setShowEditModal(!!selectedTestimonial);
      }
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-xl shadow-sm border border-emerald-100 p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-emerald-800'>Testimonials Management</h1>
            <p className='text-emerald-600 mt-1'>Manage client testimonials and reviews</p>
          </div>
          <div className='flex items-center gap-6'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-emerald-800'>{averageRating}</p>
              <p className='text-sm text-emerald-600'>Avg Rating</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-emerald-800'>{featuredCount}</p>
              <p className='text-sm text-emerald-600'>Featured</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-emerald-800'>{displayedCount}</p>
              <p className='text-sm text-emerald-600'>Displayed</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'
            >
              Add Testimonial
            </button>
          </div>
        </div>
        {message && (
          <p className='mt-4 text-center text-emerald-600'>{message}</p>
        )}
      </div>

      {/* Status Overview */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`p-4 rounded-xl border transition-all ${
              selectedStatus === status.value
                ? 'border-emerald-300 bg-emerald-50 shadow-sm'
                : 'border-emerald-100 bg-white hover:bg-emerald-50'
            }`}
          >
            <div className='text-center'>
              <p className='text-2xl font-bold text-emerald-800'>{status.count}</p>
              <p className='text-sm text-emerald-600 mt-1'>{status.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm border border-emerald-100 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-emerald-700 mb-2'>Search Testimonials</label>
            <input
              type='text'
              placeholder='Search by client, company, content, or project...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-emerald-700 mb-2'>Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-emerald-700 mb-2'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className='space-y-4'>
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className='bg-white rounded-xl shadow-sm border border-emerald-100 p-6 hover:bg-emerald-50 transition-colors'
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <img
                  src={testimonial.avatar || defaultPlaceholder}
                  alt={testimonial.name}
                  className='w-12 h-12 rounded-full object-cover'
                />
                <div>
                  <p className='font-medium text-emerald-800'>{testimonial.name}</p>
                  <p className='text-sm text-emerald-600'>{testimonial.role}</p>
                  <p className='text-sm text-emerald-500'>{testimonial.company}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                  {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                </span>
                {testimonial.featured && (
                  <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full'>
                    Featured
                  </span>
                )}
                {testimonial.displayOnPortfolio && (
                  <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'>Live</span>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='flex'>{renderStars(testimonial.rating)}</div>
                <span className='text-sm text-emerald-600'>({testimonial.rating}/5)</span>
                {testimonial.projectType && (
                  <>
                    <span className='text-sm text-emerald-500'>•</span>
                    <span className='text-sm text-emerald-500'>{testimonial.projectType}</span>
                  </>
                )}
                <span className='text-sm text-emerald-500'>•</span>
                <span className='text-sm text-emerald-500'>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
              </div>
              <p className='text-emerald-700 mb-3 italic'>&quot;{testimonial.quote}&quot;</p>
              <div className='flex flex-wrap gap-1 mb-3'>
                {testimonial.tags?.map((tag) => (
                  <span key={tag} className='px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded'>
                    {tag}
                  </span>
                ))}
              </div>
              {testimonial.projectUrl && (
                <a
                  href={testimonial.projectUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-emerald-600 hover:text-emerald-800 underline'
                >
                  View Project →
                </a>
              )}
            </div>

            <div className='flex items-center gap-2 flex-wrap'>
              <select
                value={testimonial.status}
                onChange={(e) => handleStatusChange(testimonial._id, e.target.value)}
                className='px-3 py-1 border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
              <button
                onClick={() => handleToggleFeatured(testimonial._id)}
                className={`px-3 py-1 border rounded-lg transition-colors text-sm ${
                  testimonial.featured
                    ? 'text-purple-600 border-purple-200 bg-purple-50'
                    : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {testimonial.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button
                onClick={() => handleToggleDisplay(testimonial._id)}
                className={`px-3 py-1 border rounded-lg transition-colors text-sm ${
                  testimonial.displayOnPortfolio
                    ? 'text-blue-600 border-blue-200 bg-blue-50'
                    : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {testimonial.displayOnPortfolio ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => {
                  setSelectedTestimonial(testimonial);
                  setShowEditModal(true);
                }}
                className='px-3 py-1 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors text-sm'
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedTestimonial(testimonial);
                  setShowDeleteModal(true);
                }}
                className='px-3 py-1 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <TestimonialModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTestimonial}
          categories={categories}
          setShowAvatarModal={setShowAvatarModal}
          modalRef={addModalRef}
          handleOutsideClick={handleOutsideClick}
          defaultAvatars={defaultAvatars}
          defaultPlaceholder={defaultPlaceholder}
          handleOpenCloudinaryWidget={handleOpenCloudinaryWidget}
        />
      )}

      {/* Edit Testimonial Modal */}
      {showEditModal && selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTestimonial(null);
          }}
          onSave={handleEditTestimonial}
          categories={categories}
          setShowAvatarModal={setShowAvatarModal}
          modalRef={editModalRef}
          handleOutsideClick={handleOutsideClick}
          defaultAvatars={defaultAvatars}
          defaultPlaceholder={defaultPlaceholder}
          handleOpenCloudinaryWidget={handleOpenCloudinaryWidget}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTestimonial && (
        <DeleteConfirmationModal
          testimonial={selectedTestimonial}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTestimonial(null);
          }}
          onConfirm={() => handleDeleteTestimonial(selectedTestimonial._id)}
          modalRef={deleteModalRef}
          handleOutsideClick={handleOutsideClick}
        />
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <AvatarModal
          onClose={() => {
            setShowAvatarModal(false);
            setShowEditModal(!!selectedTestimonial);
          }}
          setFormData={selectedTestimonial ? (data) => setSelectedTestimonial({ ...selectedTestimonial, ...data }) : setFormData}
          currentAvatar={selectedTestimonial?.avatar || defaultPlaceholder}
          defaultAvatars={defaultAvatars}
          avatarModalRef={avatarModalRef}
          handleOutsideClick={handleOutsideClick}
          handleOpenCloudinaryWidget={handleOpenCloudinaryWidget}
        />
      )}
    </div>
  );
}

function TestimonialModal({ testimonial, onClose, onSave, categories, setShowAvatarModal, modalRef, handleOutsideClick, defaultAvatars, defaultPlaceholder, handleOpenCloudinaryWidget }) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    role: testimonial?.role || 'Customer',
    company: testimonial?.company || '',
    email: testimonial?.email || '',
    avatar: testimonial?.avatar || '',
    quote: testimonial?.quote || '',
    rating: testimonial?.rating || 5,
    projectType: testimonial?.projectType || '',
    category: testimonial?.category || 'web-development',
    status: testimonial?.status || 'pending',
    featured: testimonial?.featured || false,
    displayOnPortfolio: testimonial?.displayOnPortfolio || false,
    projectUrl: testimonial?.projectUrl || '',
    tags: testimonial?.tags?.join(', ') || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.quote || !formData.rating) {
      alert('Please fill in all required fields (Testimonial Content, Rating).');
      return;
    }
    const testimonialData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      _id: testimonial?._id,
    };
    onSave(testimonialData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={(e) => handleOutsideClick(e, onClose)}
      ref={modalRef}
    >
      <div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-emerald-100'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-emerald-800'>
              {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div className='flex justify-center'>
            <img
              src={formData.avatar || defaultPlaceholder}
              alt='Avatar'
              className='w-24 h-24 rounded-full object-cover cursor-pointer'
              onClick={() => setShowAvatarModal(true)}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Client Name</label>
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Client Title</label>
              <input
                type='text'
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Company</label>
              <input
                type='text'
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Email</label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-emerald-700 mb-2'>Testimonial Content *</label>
            <textarea
              required
              rows={4}
              value={formData.quote}
              onChange={(e) => handleChange('quote', e.target.value)}
              className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Rating *</label>
              <select
                required
                value={formData.rating}
                onChange={(e) => handleChange('rating', Number(e.target.value))}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                {categories
                  .filter((cat) => cat.value !== 'all')
                  .map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Project Type</label>
              <input
                type='text'
                value={formData.projectType}
                onChange={(e) => handleChange('projectType', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-emerald-700 mb-2'>Project URL</label>
              <input
                type='url'
                value={formData.projectUrl}
                onChange={(e) => handleChange('projectUrl', e.target.value)}
                className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-emerald-700 mb-2'>Tags (comma-separated)</label>
            <input
              type='text'
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder='responsive, modern, branding'
              className='w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>

          <div className='flex items-center gap-6'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className='w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500'
              />
              <span className='text-sm text-emerald-700'>Featured Testimonial</span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={formData.displayOnPortfolio}
                onChange={(e) => handleChange('displayOnPortfolio', e.target.checked)}
                className='w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500'
              />
              <span className='text-sm text-emerald-700'>Display on Portfolio</span>
            </label>
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'
            >
              {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmationModal({ testimonial, onClose, onConfirm, modalRef, handleOutsideClick }) {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={(e) => handleOutsideClick(e, onClose)}
      ref={modalRef}
    >
      <div className='bg-white rounded-xl shadow-xl max-w-md w-full'>
        <div className='p-6'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
              <svg className='w-6 h-6 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Delete Testimonial</h3>
              <p className='text-sm text-gray-600'>This action cannot be undone.</p>
            </div>
          </div>

          <div className='bg-gray-50 p-4 rounded-lg mb-6'>
            <p className='text-sm text-gray-700 mb-2'>
              <strong>Client:</strong> {testimonial.name} ({testimonial.company})
            </p>
            <p className='text-sm text-gray-600 italic'>&quot;{testimonial.quote.substring(0, 100)}...&quot;</p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              Delete Testimonial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvatarModal({ onClose, setFormData, currentAvatar, defaultAvatars, avatarModalRef, handleOutsideClick, handleOpenCloudinaryWidget }) {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={(e) => handleOutsideClick(e, onClose)}
      ref={avatarModalRef}
    >
      <div className='bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto'>
        <div className='bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl'>
          <h2 className='text-xl font-bold text-white text-center'>Choose Avatar</h2>
        </div>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none'
          aria-label='Close avatar modal'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <div className='p-6 space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>Avatar Selection</h3>
            <div className='grid grid-cols-5 gap-2'>
              {defaultAvatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Default Avatar ${i + 1}`}
                  className='w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer object-cover hover:border-2 hover:border-emerald-500'
                  onClick={() => {
                    setFormData({ avatar: url });
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>Upload from Computer</h3>
            <button
              type='button'
              onClick={() => handleOpenCloudinaryWidget(setFormData)}
              className='w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500'
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}