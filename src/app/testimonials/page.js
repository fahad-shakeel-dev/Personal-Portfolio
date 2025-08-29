// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Navbar from '../components/HomePage/Navbar/Navbar';
// import Footer from '../components/HomePage/FooterSection/footer';

// gsap.registerPlugin(ScrollTrigger);

// export default function TestimonialsPage() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [userTestimonial, setUserTestimonial] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const cardsRef = useRef([]);
//   const carouselRef = useRef(null);
//   const featuredRef = useRef(null);
//   const modalRef = useRef(null);
//   const avatarModalRef = useRef(null);

 
//    const defaultAvatars = [
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar9_r88w9r.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar7_hqclp5.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar8_v50w6m.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar6_y0lm7e.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar4_cq9q95.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar5_bcmpah.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar2_byyu3g.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar3_mepqpe.png',
//   'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png',

// ];
//   const defaultPlaceholder = 'https://via.placeholder.com/150';

//   // Load Cloudinary Upload Widget script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch testimonials and user authentication status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authRes = await fetch('/api/auth/check', { credentials: 'include' });
//         if (authRes.ok) {
//           const { user } = await authRes.json();
//           setIsAuthenticated(true);
//           setFormData({
//             fullName: user.fullName || '',
//             email: user.email || '',
//             company: '',
//             role: '',
//             quote: '',
//             rating: 5,
//             avatar: '',
//           });
//         } else {
//           setIsAuthenticated(false);
//           setFormData({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
//         }

//         const testimonialsRes = await fetch('/api/testimonials?featured=true', { credentials: 'include' });
//         if (testimonialsRes.ok) {
//           const { testimonials } = await testimonialsRes.json();
//           setTestimonials(testimonials);
//         } else {
//           setTestimonials([]);
//         }

//         if (authRes.ok) {
//           const userTestimonialRes = await fetch('/api/testimonials', { credentials: 'include' });
//           if (userTestimonialRes.ok) {
//             const { testimonials } = await userTestimonialRes.json();
//             if (testimonials.length > 0) {
//               setUserTestimonial(testimonials[0]);
//               setFormData({
//                 fullName: testimonials[0].name || user.fullName || '',
//                 email: testimonials[0].email || user.email || '',
//                 company: testimonials[0].company || '',
//                 role: testimonials[0].role || '',
//                 quote: testimonials[0].quote || '',
//                 rating: testimonials[0].rating || 5,
//                 avatar: testimonials[0].avatar || '',
//               });
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setMessage('Failed to load data. Please try again.');
//       }
//     };
//     fetchData();
//   }, []);

//   // GSAP Animations for Main Modal
//   useEffect(() => {
//     if (isModalOpen) {
//       gsap.fromTo(
//         modalRef.current,
//         { opacity: 0, scale: 0.8, rotate: 5 },
//         { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' }
//       );
//       document.body.style.overflow = 'hidden';
//     } else {
//       gsap.to(modalRef.current, { opacity: 0, scale: 0.8, rotate: 5, duration: 0.3, ease: 'power3.in' });
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isModalOpen]);

//   // GSAP Animation for Avatar Modal
//   useEffect(() => {
//     if (isAvatarModalOpen) {
//       gsap.fromTo(
//         avatarModalRef.current,
//         { opacity: 0, scale: 0.8, y: 20 },
//         { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
//       );
//       document.body.style.overflow = 'hidden';
//     } else {
//       gsap.to(avatarModalRef.current, { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: 'power3.in' });
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isAvatarModalOpen]);

//   // GSAP Animations for Cards and Carousel
//   useEffect(() => {
//     gsap.fromTo(
//       cardsRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         stagger: 0.2,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: '.grid-section',
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     );

//     gsap.fromTo(
//       featuredRef.current,
//       { opacity: 0, scale: 0.9 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 1.5,
//         ease: 'elastic.out(1, 0.5)',
//         scrollTrigger: {
//           trigger: featuredRef.current,
//           start: 'top 80%',
//         },
//       }
//     );

//     const carousel = carouselRef.current;
//     if (carousel) {
//       gsap.set(carousel.children, { xPercent: (i) => i * 100 });
//     }

//     gsap.utils.toArray('.cta-button').forEach((button) => {
//       gsap.fromTo(
//         button,
//         { scale: 1 },
//         {
//           scale: 1.05,
//           duration: 0.3,
//           ease: 'power2.out',
//           paused: true,
//           onStart: () => button.classList.add('shadow-lg'),
//           onReverseComplete: () => button.classList.remove('shadow-lg'),
//         }
//       ).play();
//       button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.3 }));
//       button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
//     });
//   }, []);

//   // Handle Cloudinary Upload Widget
//   const handleOpenCloudinaryWidget = () => {
//     if (typeof window.cloudinary === 'undefined') {
//       setMessage('Cloudinary widget failed to load. Please try again.');
//       return;
//     }

//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//         sources: ['local', 'url', 'camera'],
//         multiple: false,
//         resourceType: 'image',
//         folder: 'avatars',
//         clientAllowedFormats: ['jpg', 'png', 'jpeg'],
//         maxFileSize: 5000000, // 5MB
//       },
//       (error, result) => {
//         if (!error && result && result.event === 'success') {
//           setFormData({ ...formData, avatar: result.info.secure_url });
//           setIsAvatarModalOpen(false);
//         } else if (error) {
//           console.error('Cloudinary upload error:', error);
//           setMessage('Failed to upload image. Please try again.');
//         }
//       }
//     );
//     widget.open();
//   };

//   // Handle outside click for modals
//   const handleOutsideClick = (e, setModalState) => {
//     if (e.target === e.currentTarget) {
//       setModalState(false);
//     }
//   };

//   // Handle carousel navigation
//   const nextTestimonial = () => {
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: '-=100',
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex((prev) => (prev + 1) % Math.max(testimonials.slice(1).length, 1)),
//     });
//   };

//   const prevTestimonial = () => {
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: '+=100',
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex((prev) => (prev - 1 + Math.max(testimonials.slice(1).length, 1)) % Math.max(testimonials.slice(1).length, 1)),
//     });
//   };

//   const goToTestimonial = (index) => {
//     const diff = index - currentIndex;
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: `-=${diff * 100}`,
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex(index),
//     });
//   };

//   // Auto-scroll carousel
//   useEffect(() => {
//     if (testimonials.length <= 1) return;
//     const interval = setInterval(nextTestimonial, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials]);

//   // Handle form submission
//   const handleSubmitTestimonial = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       setMessage('Please log in to submit a testimonial.');
//       setTimeout(() => router.push('/login'), 2000);
//       return;
//     }
//     if (!formData.quote || !formData.rating) {
//       setMessage('Quote and rating are required.');
//       return;
//     }

//     try {
//       const method = userTestimonial ? 'PUT' : 'POST';
//       const url = '/api/testimonials';
//       const body = userTestimonial
//         ? { id: userTestimonial._id, ...formData }
//         : formData;

//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setUserTestimonial(data.testimonial);
//         setMessage(userTestimonial ? 'Testimonial updated successfully!' : 'Testimonial submitted successfully!');
//         setTimeout(() => setIsModalOpen(false), 2000);
//       } else {
//         setMessage(data.message || 'Failed to submit/update testimonial.');
//       }
//     } catch (error) {
//       console.error('Submit testimonial error:', error);
//       setMessage('Failed to submit/update testimonial. Please try again.');
//     }
//   };

//   // Handle delete testimonial
//   const handleDeleteTestimonial = async () => {
//     if (!isAuthenticated) {
//       setMessage('Please log in to delete your testimonial.');
//       setTimeout(() => router.push('/login'), 2000);
//       return;
//     }
//     if (!userTestimonial) {
//       setMessage('No testimonial to delete.');
//       return;
//     }

//     try {
//       const res = await fetch('/api/testimonials', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: userTestimonial._id }),
//         credentials: 'include',
//       });

//       if (res.ok) {
//         setUserTestimonial(null);
//         setFormData({ fullName: formData.fullName, email: formData.email, company: '', role: '', quote: '', rating: 5, avatar: '' });
//         setMessage('Testimonial deleted successfully!');
//         setTimeout(() => setIsModalOpen(false), 2000);
//       } else {
//         const data = await res.json();
//         setMessage(data.message || 'Failed to delete testimonial.');
//       }
//     } catch (error) {
//       console.error('Delete testimonial error:', error);
//       setMessage('Failed to delete testimonial. Please try again.');
//     }
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
//         ★
//       </span>
//     ));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 lg:px-8 py-12">
//         <div className="max-w-7xl mx-auto space-y-12">
//           <header className="text-center">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800">Our Customers' Stories</h1>
//             <p className="mt-4 text-lg sm:text-xl text-emerald-600">
//               Discover how our platform has empowered professionals across industries.
//             </p>
//           </header>

//           <section ref={featuredRef} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">Featured Testimonial</h2>
//             {testimonials.length > 0 ? (
//               <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
//                 <img
//                   src={testimonials[0].avatar || defaultPlaceholder}
//                   alt={`${testimonials[0].name}'s avatar`}
//                   className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
//                 />
//                 <div className="text-center sm:text-left">
//                   <p className="text-gray-600 italic mb-4 text-base sm:text-lg">&quot;{testimonials[0].quote}&quot;</p>
//                   <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">{testimonials[0].name}</h3>
//                   <p className="text-sm text-emerald-600">{testimonials[0].role}, {testimonials[0].company}</p>
//                   <div className="flex justify-center sm:justify-start mt-2">{renderStars(testimonials[0].rating)}</div>
//                   <p className="text-xs text-gray-500 mt-2">{new Date(testimonials[0].date).toLocaleDateString()}</p>
//                   <button
//                     onClick={() => router.push('/contact')}
//                     className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                   >
//                     Contact Now
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No featured testimonials available.</p>
//             )}
//           </section>

//           <section className="grid-section">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">More From Our Users</h2>
//             <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//               {testimonials.slice(1).map((testimonial, index) => (
//                 <div
//                   key={testimonial._id}
//                   ref={(el) => (cardsRef.current[index] = el)}
//                   className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//                 >
//                   <img
//                     src={testimonial.avatar || defaultPlaceholder}
//                     alt={`${testimonial.name}'s avatar`}
//                     className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover"
//                   />
//                   <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{testimonial.quote}&quot;</p>
//                   <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{testimonial.name}</h3>
//                   <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
//                   <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
//                   <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
//                   <button
//                     onClick={() => router.push('/contact')}
//                     className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                   >
//                     Contact Now
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="md:hidden relative overflow-hidden">
//               <div ref={carouselRef} className="flex">
//                 {testimonials.slice(1).map((testimonial) => (
//                   <div
//                     key={testimonial._id}
//                     className="min-w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
//                   >
//                     <img
//                       src={testimonial.avatar || defaultPlaceholder}
//                       alt={`${testimonial.name}'s avatar`}
//                       className="w-16 h-16 rounded-full mb-4 object-cover"
//                     />
//                     <p className="text-gray-600 italic mb-4 text-sm">&quot;{testimonial.quote}&quot;</p>
//                     <h3 className="text-base font-semibold text-emerald-800">{testimonial.name}</h3>
//                     <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
//                     <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
//                     <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
//                     <button
//                       onClick={() => router.push('/contact')}
//                       className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                     >
//                     Contact Now
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={prevTestimonial}
//                 className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 aria-label="Previous testimonial"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button
//                 onClick={nextTestimonial}
//                 className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 aria-label="Next testimonial"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//               <div className="flex justify-center mt-4 space-x-2">
//                 {testimonials.slice(1).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToTestimonial(index)}
//                     className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                     aria-label={`Go to testimonial ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </section>

//           <section className="text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6">Join Our Community</h2>
//             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
//               >
//                 {userTestimonial ? 'Update Your Testimonial' : 'Share Your Experience'}
//               </button>
//               <button
//                 onClick={() => router.push('/signup')}
//                 className="py-3 px-6 bg-emerald-800 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
//               >
//                 Get Started
//               </button>
//             </div>
//             {userTestimonial && (
//               <div className="mt-6">
//                 <h3 className="text-xl font-semibold text-emerald-800">Your Testimonial</h3>
//                 <div className="bg-white rounded-2xl shadow-xl p-6 mt-4 text-center">
//                   <img
//                     src={userTestimonial.avatar || defaultPlaceholder}
//                     alt={`${userTestimonial.name}'s avatar`}
//                     className="w-16 h-16 rounded-full mb-4 mx-auto object-cover"
//                   />
//                   <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{userTestimonial.quote}&quot;</p>
//                   <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{userTestimonial.name}</h3>
//                   <p className="text-sm text-emerald-600">{userTestimonial.role}, {userTestimonial.company}</p>
//                   <div className="flex justify-center mt-2">{renderStars(userTestimonial.rating)}</div>
//                   <p className="text-xs text-gray-500 mt-2">{new Date(userTestimonial.date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             )}
//           </section>

//           {isModalOpen && (
//             <div
//               className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
//               onClick={(e) => handleOutsideClick(e, setIsModalOpen)}
//             >
//               <div
//                 ref={modalRef}
//                 className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto"
//               >
//                 <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
//                   <h2 className="text-2xl font-bold text-white text-center">
//                     {userTestimonial ? 'Update Your Feedback' : 'Share Your Feedback'}
//                   </h2>
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
//                   aria-label="Close modal"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 <form onSubmit={handleSubmitTestimonial} className="p-6 sm:p-8 space-y-6">
//                   <div className="flex justify-center">
//                     <img
//                       src={formData.avatar || defaultPlaceholder}
//                       alt="Avatar"
//                       className="w-24 h-24 rounded-full object-cover cursor-pointer shadow-md"
//                       onClick={() => setIsAvatarModalOpen(true)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                       Full Name
//                     </label>
//                     <input
//                       id="fullName"
//                       type="text"
//                       value={formData.fullName}
//                       onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                       disabled={isAuthenticated}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
//                       placeholder="Your Full Name"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       disabled={isAuthenticated}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//                       Company
//                     </label>
//                     <input
//                       id="company"
//                       type="text"
//                       value={formData.company}
//                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Your Company"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                       Role
//                     </label>
//                     <input
//                       id="role"
//                       type="text"
//                       value={formData.role}
//                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Your Role"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
//                       Your Testimonial
//                     </label>
//                     <textarea
//                       id="quote"
//                       value={formData.quote}
//                       onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
//                       required
//                       rows={4}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Share your experience..."
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//                       Rating
//                     </label>
//                     <select
//                       id="rating"
//                       value={formData.rating}
//                       onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     >
//                       <option value={5}>5 Stars</option>
//                       <option value={4.5}>4.5 Stars</option>
//                       <option value={4}>4 Stars</option>
//                       <option value={3.5}>3.5 Stars</option>
//                       <option value={3}>3 Stars</option>
//                     </select>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <button
//                       type="submit"
//                       className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                     >
//                       {userTestimonial ? 'Update Testimonial' : 'Submit Testimonial'}
//                     </button>
//                     {userTestimonial && (
//                       <button
//                         type="button"
//                         onClick={handleDeleteTestimonial}
//                         className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cta-button"
//                       >
//                         Delete Testimonial
//                       </button>
//                     )}
//                   </div>
//                 </form>
//                 {message && (
//                   <p className="mt-4 text-center text-emerald-600 px-4">{message}</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {isAvatarModalOpen && (
//             <div
//               className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
//               onClick={(e) => handleOutsideClick(e, setIsAvatarModalOpen)}
//             >
//               <div
//                 ref={avatarModalRef}
//                 className="bg-white rounded-2xl w-full max-w-md mx-auto relative max-h-[80vh] overflow-y-auto"
//               >
//                 <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
//                   <h2 className="text-xl font-bold text-white text-center">Choose Your Avatar</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsAvatarModalOpen(false)}
//                   className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
//                   aria-label="Close avatar modal"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 <div className="p-6 space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">Avatar Section</h3>
//                     <div className="grid grid-cols-5 gap-2">
//                       {defaultAvatars.map((url, i) => (
//                         <img
//                           key={i}
//                           src={url}
//                           alt={`Default Avatar ${i + 1}`}
//                           className="w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer object-cover hover:border-2 hover:border-emerald-500"
//                           onClick={() => {
//                             setFormData({ ...formData, avatar: url });
//                             setIsAvatarModalOpen(false);
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">Upload from Computer</h3>
//                     <button
//                       type="button"
//                       onClick={handleOpenCloudinaryWidget}
//                       className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                     >
//                       Upload Image
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

















// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Navbar from '../components/HomePage/Navbar/Navbar';
// import Footer from '../components/HomePage/FooterSection/footer';

// gsap.registerPlugin(ScrollTrigger);

// export default function TestimonialsPage() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
//   const [regularTestimonials, setRegularTestimonials] = useState([]);
//   const [userTestimonial, setUserTestimonial] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const cardsRef = useRef([]);
//   const carouselRef = useRef(null);
//   const featuredRef = useRef(null);
//   const modalRef = useRef(null);
//   const avatarModalRef = useRef(null);

//   const defaultAvatars = [
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar9_r88w9r.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar7_hqclp5.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar8_v50w6m.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar6_y0lm7e.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar4_cq9q95.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar5_bcmpah.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar2_byyu3g.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar3_mepqpe.png',
//     'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png',
//   ];
//   const defaultPlaceholder = 'https://via.placeholder.com/150';

//   // Load Cloudinary Upload Widget script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch testimonials and user authentication status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authRes = await fetch('/api/auth/check', { credentials: 'include' });
//         if (authRes.ok) {
//           const { user } = await authRes.json();
//           setIsAuthenticated(true);
//           setFormData({
//             fullName: user.fullName || '',
//             email: user.email || '',
//             company: '',
//             role: '',
//             quote: '',
//             rating: 5,
//             avatar: '',
//           });
//         } else {
//           setIsAuthenticated(false);
//           setFormData({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
//         }

//         // Fetch all approved testimonials
//         const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
//         if (testimonialsRes.ok) {
//           const { testimonials } = await testimonialsRes.json();
//           setTestimonials(testimonials);
          
//           // Filter testimonials to only show approved ones with displayOnPortfolio: true
//           const approvedTestimonials = testimonials.filter(
//             testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
//           );
          
//           // Separate featured and regular testimonials
//           const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
//           const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
//           setFeaturedTestimonials(featured);
//           setRegularTestimonials(regular);
//         } else {
//           setTestimonials([]);
//           setFeaturedTestimonials([]);
//           setRegularTestimonials([]);
//         }

//         if (authRes.ok) {
//           const userTestimonialRes = await fetch('/api/testimonials', { credentials: 'include' });
//           if (userTestimonialRes.ok) {
//             const { testimonials } = await userTestimonialRes.json();
//             if (testimonials.length > 0) {
//               setUserTestimonial(testimonials[0]);
//               setFormData({
//                 fullName: testimonials[0].name || user.fullName || '',
//                 email: testimonials[0].email || user.email || '',
//                 company: testimonials[0].company || '',
//                 role: testimonials[0].role || '',
//                 quote: testimonials[0].quote || '',
//                 rating: testimonials[0].rating || 5,
//                 avatar: testimonials[0].avatar || '',
//               });
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setMessage('Failed to load data. Please try again.');
//       }
//     };
//     fetchData();
//   }, []);

//   // GSAP Animations for Main Modal
//   useEffect(() => {
//     if (isModalOpen) {
//       gsap.fromTo(
//         modalRef.current,
//         { opacity: 0, scale: 0.8, rotate: 5 },
//         { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' }
//       );
//       document.body.style.overflow = 'hidden';
//     } else {
//       gsap.to(modalRef.current, { opacity: 0, scale: 0.8, rotate: 5, duration: 0.3, ease: 'power3.in' });
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isModalOpen]);

//   // GSAP Animation for Avatar Modal
//   useEffect(() => {
//     if (isAvatarModalOpen) {
//       gsap.fromTo(
//         avatarModalRef.current,
//         { opacity: 0, scale: 0.8, y: 20 },
//         { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
//       );
//       document.body.style.overflow = 'hidden';
//     } else {
//       gsap.to(avatarModalRef.current, { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: 'power3.in' });
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isAvatarModalOpen]);

//   // GSAP Animations for Cards and Carousel
//   useEffect(() => {
//     gsap.fromTo(
//       cardsRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         stagger: 0.2,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: '.grid-section',
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     );

//     gsap.fromTo(
//       featuredRef.current,
//       { opacity: 0, scale: 0.9 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 1.5,
//         ease: 'elastic.out(1, 0.5)',
//         scrollTrigger: {
//           trigger: featuredRef.current,
//           start: 'top 80%',
//         },
//       }
//     );

//     const carousel = carouselRef.current;
//     if (carousel) {
//       gsap.set(carousel.children, { xPercent: (i) => i * 100 });
//     }

//     gsap.utils.toArray('.cta-button').forEach((button) => {
//       gsap.fromTo(
//         button,
//         { scale: 1 },
//         {
//           scale: 1.05,
//           duration: 0.3,
//           ease: 'power2.out',
//           paused: true,
//           onStart: () => button.classList.add('shadow-lg'),
//           onReverseComplete: () => button.classList.remove('shadow-lg'),
//         }
//       ).play();
//       button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.3 }));
//       button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
//     });
//   }, [regularTestimonials]);

//   // Handle Cloudinary Upload Widget
//   const handleOpenCloudinaryWidget = () => {
//     if (typeof window.cloudinary === 'undefined') {
//       setMessage('Cloudinary widget failed to load. Please try again.');
//       return;
//     }

//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//         sources: ['local', 'url', 'camera'],
//         multiple: false,
//         resourceType: 'image',
//         folder: 'avatars',
//         clientAllowedFormats: ['jpg', 'png', 'jpeg'],
//         maxFileSize: 5000000, // 5MB
//       },
//       (error, result) => {
//         if (!error && result && result.event === 'success') {
//           setFormData({ ...formData, avatar: result.info.secure_url });
//           setIsAvatarModalOpen(false);
//         } else if (error) {
//           console.error('Cloudinary upload error:', error);
//           setMessage('Failed to upload image. Please try again.');
//         }
//       }
//     );
//     widget.open();
//   };

//   // Handle outside click for modals
//   const handleOutsideClick = (e, setModalState) => {
//     if (e.target === e.currentTarget) {
//       setModalState(false);
//     }
//   };

//   // Handle carousel navigation
//   const nextTestimonial = () => {
//     if (regularTestimonials.length <= 1) return;
    
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: '-=100',
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex((prev) => (prev + 1) % Math.max(regularTestimonials.length, 1)),
//     });
//   };

//   const prevTestimonial = () => {
//     if (regularTestimonials.length <= 1) return;
    
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: '+=100',
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex((prev) => (prev - 1 + Math.max(regularTestimonials.length, 1)) % Math.max(regularTestimonials.length, 1)),
//     });
//   };

//   const goToTestimonial = (index) => {
//     if (regularTestimonials.length <= 1) return;
    
//     const diff = index - currentIndex;
//     const tl = gsap.timeline();
//     tl.to(carouselRef.current.children, {
//       xPercent: `-=${diff * 100}`,
//       duration: 0.5,
//       ease: 'power2.inOut',
//       onComplete: () => setCurrentIndex(index),
//     });
//   };

//   // Auto-scroll carousel
//   useEffect(() => {
//     if (regularTestimonials.length <= 1) return;
//     const interval = setInterval(nextTestimonial, 5000);
//     return () => clearInterval(interval);
//   }, [regularTestimonials]);

//   // Handle form submission
//   const handleSubmitTestimonial = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       setMessage('Please log in to submit a testimonial.');
//       setTimeout(() => router.push('/login'), 2000);
//       return;
//     }
//     if (!formData.quote || !formData.rating) {
//       setMessage('Quote and rating are required.');
//       return;
//     }

//     try {
//       const method = userTestimonial ? 'PUT' : 'POST';
//       const url = '/api/testimonials';
//       const body = userTestimonial
//         ? { id: userTestimonial._id, ...formData }
//         : formData;

//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setUserTestimonial(data.testimonial);
//         setMessage(userTestimonial ? 'Testimonial updated successfully!' : 'Testimonial submitted successfully!');
//         setTimeout(() => setIsModalOpen(false), 2000);
        
//         // Refresh testimonials after submission
//         const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
//         if (testimonialsRes.ok) {
//           const { testimonials } = await testimonialsRes.json();
//           setTestimonials(testimonials);
          
//           // Filter testimonials to only show approved ones with displayOnPortfolio: true
//           const approvedTestimonials = testimonials.filter(
//             testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
//           );
          
//           // Separate featured and regular testimonials
//           const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
//           const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
//           setFeaturedTestimonials(featured);
//           setRegularTestimonials(regular);
//         }
//       } else {
//         setMessage(data.message || 'Failed to submit/update testimonial.');
//       }
//     } catch (error) {
//       console.error('Submit testimonial error:', error);
//       setMessage('Failed to submit/update testimonial. Please try again.');
//     }
//   };

//   // Handle delete testimonial
//   const handleDeleteTestimonial = async () => {
//     if (!isAuthenticated) {
//       setMessage('Please log in to delete your testimonial.');
//       setTimeout(() => router.push('/login'), 2000);
//       return;
//     }
//     if (!userTestimonial) {
//       setMessage('No testimonial to delete.');
//       return;
//     }

//     try {
//       const res = await fetch('/api/testimonials', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: userTestimonial._id }),
//         credentials: 'include',
//       });

//       if (res.ok) {
//         setUserTestimonial(null);
//         setFormData({ fullName: formData.fullName, email: formData.email, company: '', role: '', quote: '', rating: 5, avatar: '' });
//         setMessage('Testimonial deleted successfully!');
//         setTimeout(() => setIsModalOpen(false), 2000);
        
//         // Refresh testimonials after deletion
//         const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
//         if (testimonialsRes.ok) {
//           const { testimonials } = await testimonialsRes.json();
//           setTestimonials(testimonials);
          
//           // Filter testimonials to only show approved ones with displayOnPortfolio: true
//           const approvedTestimonials = testimonials.filter(
//             testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
//           );
          
//           // Separate featured and regular testimonials
//           const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
//           const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
//           setFeaturedTestimonials(featured);
//           setRegularTestimonials(regular);
//         }
//       } else {
//         const data = await res.json();
//         setMessage(data.message || 'Failed to delete testimonial.');
//       }
//     } catch (error) {
//       console.error('Delete testimonial error:', error);
//       setMessage('Failed to delete testimonial. Please try again.');
//     }
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
//         ★
//       </span>
//     ));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 lg:px-8 py-12">
//         <div className="max-w-7xl mx-auto space-y-12">
//           <header className="text-center">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800">Our Customers' Stories</h1>
//             <p className="mt-4 text-lg sm:text-xl text-emerald-600">
//               Discover how our platform has empowered professionals across industries.
//             </p>
//           </header>

//           <section ref={featuredRef} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">Featured Testimonial</h2>
//             {featuredTestimonials.length > 0 ? (
//               <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
//                 <img
//                   src={featuredTestimonials[0].avatar || defaultPlaceholder}
//                   alt={`${featuredTestimonials[0].name}'s avatar`}
//                   className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
//                 />
//                 <div className="text-center sm:text-left">
//                   <p className="text-gray-600 italic mb-4 text-base sm:text-lg">&quot;{featuredTestimonials[0].quote}&quot;</p>
//                   <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">{featuredTestimonials[0].name}</h3>
//                   <p className="text-sm text-emerald-600">{featuredTestimonials[0].role}, {featuredTestimonials[0].company}</p>
//                   <div className="flex justify-center sm:justify-start mt-2">{renderStars(featuredTestimonials[0].rating)}</div>
//                   <p className="text-xs text-gray-500 mt-2">{new Date(featuredTestimonials[0].date).toLocaleDateString()}</p>
//                   <button
//                     onClick={() => router.push('/contact')}
//                     className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                   >
//                     Contact Now
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No featured testimonials available.</p>
//             )}
//           </section>

//           <section className="grid-section">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">More From Our Users</h2>
//             {regularTestimonials.length > 0 ? (
//               <>
//                 <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//                   {regularTestimonials.map((testimonial, index) => (
//                     <div
//                       key={testimonial._id}
//                       ref={(el) => (cardsRef.current[index] = el)}
//                       className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//                     >
//                       <img
//                         src={testimonial.avatar || defaultPlaceholder}
//                         alt={`${testimonial.name}'s avatar`}
//                         className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover"
//                       />
//                       <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{testimonial.quote}&quot;</p>
//                       <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{testimonial.name}</h3>
//                       <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
//                       <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
//                       <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
//                       <button
//                         onClick={() => router.push('/contact')}
//                         className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                       >
//                         Contact Now
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="md:hidden relative overflow-hidden">
//                   <div ref={carouselRef} className="flex">
//                     {regularTestimonials.map((testimonial) => (
//                       <div
//                         key={testimonial._id}
//                         className="min-w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
//                       >
//                         <img
//                           src={testimonial.avatar || defaultPlaceholder}
//                           alt={`${testimonial.name}'s avatar`}
//                           className="w-16 h-16 rounded-full mb-4 object-cover"
//                         />
//                         <p className="text-gray-600 italic mb-4 text-sm">&quot;{testimonial.quote}&quot;</p>
//                         <h3 className="text-base font-semibold text-emerald-800">{testimonial.name}</h3>
//                         <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
//                         <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
//                         <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
//                         <button
//                           onClick={() => router.push('/contact')}
//                           className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                         >
//                           Contact Now
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   {regularTestimonials.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevTestimonial}
//                         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                         aria-label="Previous testimonial"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextTestimonial}
//                         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                         aria-label="Next testimonial"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
//                       <div className="flex justify-center mt-4 space-x-2">
//                         {regularTestimonials.map((_, index) => (
//                           <button
//                             key={index}
//                             onClick={() => goToTestimonial(index)}
//                             className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                             aria-label={`Go to testimonial ${index + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <p className="text-center text-gray-600">No testimonials available.</p>
//             )}
//           </section>

//           <section className="text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6">Join Our Community</h2>
//             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
//               >
//                 {userTestimonial ? 'Update Your Testimonial' : 'Share Your Experience'}
//               </button>
//               <button
//                 onClick={() => router.push('/signup')}
//                 className="py-3 px-6 bg-emerald-800 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
//               >
//                 Get Started
//               </button>
//             </div>
//             {userTestimonial && (
//               <div className="mt-6">
//                 <h3 className="text-xl font-semibold text-emerald-800">Your Testimonial</h3>
//                 <div className="bg-white rounded-2xl shadow-xl p-6 mt-4 text-center">
//                   <img
//                     src={userTestimonial.avatar || defaultPlaceholder}
//                     alt={`${userTestimonial.name}'s avatar`}
//                     className="w-16 h-16 rounded-full mb-4 mx-auto object-cover"
//                   />
//                   <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{userTestimonial.quote}&quot;</p>
//                   <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{userTestimonial.name}</h3>
//                   <p className="text-sm text-emerald-600">{userTestimonial.role}, {userTestimonial.company}</p>
//                   <div className="flex justify-center mt-2">{renderStars(userTestimonial.rating)}</div>
//                   <p className="text-xs text-gray-500 mt-2">{new Date(userTestimonial.date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             )}
//           </section>

//           {isModalOpen && (
//             <div
//               className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
//               onClick={(e) => handleOutsideClick(e, setIsModalOpen)}
//             >
//               <div
//                 ref={modalRef}
//                 className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto"
//               >
//                 <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
//                   <h2 className="text-2xl font-bold text-white text-center">
//                     {userTestimonial ? 'Update Your Feedback' : 'Share Your Feedback'}
//                   </h2>
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
//                   aria-label="Close modal"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 <form onSubmit={handleSubmitTestimonial} className="p-6 sm:p-8 space-y-6">
//                   <div className="flex justify-center">
//                     <img
//                       src={formData.avatar || defaultPlaceholder}
//                       alt="Avatar"
//                       className="w-24 h-24 rounded-full object-cover cursor-pointer shadow-md"
//                       onClick={() => setIsAvatarModalOpen(true)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                       Full Name
//                     </label>
//                     <input
//                       id="fullName"
//                       type="text"
//                       value={formData.fullName}
//                       onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                       disabled={isAuthenticated}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
//                       placeholder="Your Full Name"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       disabled={isAuthenticated}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//                       Company
//                     </label>
//                     <input
//                       id="company"
//                       type="text"
//                       value={formData.company}
//                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Your Company"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                       Role
//                     </label>
//                     <input
//                       id="role"
//                       type="text"
//                       value={formData.role}
//                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Your Role"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
//                       Your Testimonial
//                     </label>
//                     <textarea
//                       id="quote"
//                       value={formData.quote}
//                       onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
//                       required
//                       rows={4}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Share your experience..."
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//                       Rating
//                     </label>
//                     <select
//                       id="rating"
//                       value={formData.rating}
//                       onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
//                       className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     >
//                       <option value={5}>5 Stars</option>
//                       <option value={4.5}>4.5 Stars</option>
//                       <option value={4}>4 Stars</option>
//                       <option value={3.5}>3.5 Stars</option>
//                       <option value={3}>3 Stars</option>
//                     </select>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <button
//                       type="submit"
//                       className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                     >
//                       {userTestimonial ? 'Update Testimonial' : 'Submit Testimonial'}
//                     </button>
//                     {userTestimonial && (
//                       <button
//                         type="button"
//                         onClick={handleDeleteTestimonial}
//                         className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cta-button"
//                       >
//                         Delete Testimonial
//                       </button>
//                     )}
//                   </div>
//                 </form>
//                 {message && (
//                   <p className="mt-4 text-center text-emerald-600 px-4">{message}</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {isAvatarModalOpen && (
//             <div
//               className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
//               onClick={(e) => handleOutsideClick(e, setIsAvatarModalOpen)}
//             >
//               <div
//                 ref={avatarModalRef}
//                 className="bg-white rounded-2xl w-full max-w-md mx-auto relative max-h-[80vh] overflow-y-auto"
//               >
//                 <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
//                   <h2 className="text-xl font-bold text-white text-center">Choose Your Avatar</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsAvatarModalOpen(false)}
//                   className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
//                   aria-label="Close avatar modal"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 <div className="p-6 space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">Avatar Section</h3>
//                     <div className="grid grid-cols-5 gap-2">
//                       {defaultAvatars.map((url, i) => (
//                         <img
//                           key={i}
//                           src={url}
//                           alt={`Default Avatar ${i + 1}`}
//                           className="w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer object-cover hover:border-2 hover:border-emerald-500"
//                           onClick={() => {
//                             setFormData({ ...formData, avatar: url });
//                             setIsAvatarModalOpen(false);
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">Upload from Computer</h3>
//                     <button
//                       type="button"
//                       onClick={handleOpenCloudinaryWidget}
//                       className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
//                     >
//                       Upload Image
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }



'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/HomePage/Navbar/Navbar';
import Footer from '../components/HomePage/FooterSection/footer';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [regularTestimonials, setRegularTestimonials] = useState([]);
  const [userTestimonial, setUserTestimonial] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const cardsRef = useRef([]);
  const carouselRef = useRef(null);
  const featuredRef = useRef(null);
  const modalRef = useRef(null);
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

  // Fetch testimonials and user authentication status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await fetch('/api/auth/check', { credentials: 'include' });
        if (authRes.ok) {
          const { user } = await authRes.json();
          setIsAuthenticated(true);
          setFormData({
            fullName: user.fullName || '',
            email: user.email || '',
            company: '',
            role: '',
            quote: '',
            rating: 5,
            avatar: '',
          });
        } else {
          setIsAuthenticated(false);
          setFormData({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
        }

        // Fetch all approved testimonials
        const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          setTestimonials(testimonials);
          
          // Filter testimonials to only show approved ones with displayOnPortfolio: true
          const approvedTestimonials = testimonials.filter(
            testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
          );
          
          // Separate featured and regular testimonials
          const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
          const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
          setFeaturedTestimonials(featured);
          setRegularTestimonials(regular);
        } else {
          setTestimonials([]);
          setFeaturedTestimonials([]);
          setRegularTestimonials([]);
        }

        if (authRes.ok) {
          const userTestimonialRes = await fetch('/api/testimonials', { credentials: 'include' });
          if (userTestimonialRes.ok) {
            const { testimonials } = await userTestimonialRes.json();
            if (testimonials.length > 0) {
              setUserTestimonial(testimonials[0]);
              setFormData({
                fullName: testimonials[0].name || user.fullName || '',
                email: testimonials[0].email || user.email || '',
                company: testimonials[0].company || '',
                role: testimonials[0].role || '',
                quote: testimonials[0].quote || '',
                rating: testimonials[0].rating || 5,
                avatar: testimonials[0].avatar || '',
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data. Please try again.');
      }
    };
    fetchData();
  }, []);

  // GSAP Animations for Main Modal
  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, rotate: 5 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.8, rotate: 5, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // GSAP Animation for Avatar Modal
  useEffect(() => {
    if (isAvatarModalOpen) {
      gsap.fromTo(
        avatarModalRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(avatarModalRef.current, { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAvatarModalOpen]);

  // GSAP Animations for Cards and Carousel
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.grid-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      featuredRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
        },
      }
    );

    const carousel = carouselRef.current;
    if (carousel) {
      gsap.set(carousel.children, { xPercent: (i) => i * 100 });
    }

    gsap.utils.toArray('.cta-button').forEach((button) => {
      gsap.fromTo(
        button,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          paused: true,
          onStart: () => button.classList.add('shadow-lg'),
          onReverseComplete: () => button.classList.remove('shadow-lg'),
        }
      ).play();
      button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.3 }));
      button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
    });
  }, [regularTestimonials]);

  // Handle Cloudinary Upload Widget
  const handleOpenCloudinaryWidget = () => {
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
        maxFileSize: 5000000, // 5MB
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setFormData({ ...formData, avatar: result.info.secure_url });
          setIsAvatarModalOpen(false);
        } else if (error) {
          console.error('Cloudinary upload error:', error);
          setMessage('Failed to upload image. Please try again.');
        }
      }
    );
    widget.open();
  };

  // Handle outside click for modals
  const handleOutsideClick = (e, setModalState) => {
    if (e.target === e.currentTarget) {
      setModalState(false);
    }
  };

  // Handle carousel navigation
  const nextTestimonial = () => {
    if (regularTestimonials.length <= 1) return;
    
    const tl = gsap.timeline();
    tl.to(carouselRef.current.children, {
      xPercent: '-=100',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setCurrentIndex((prev) => (prev + 1) % Math.max(regularTestimonials.length, 1)),
    });
  };

  const prevTestimonial = () => {
    if (regularTestimonials.length <= 1) return;
    
    const tl = gsap.timeline();
    tl.to(carouselRef.current.children, {
      xPercent: '+=100',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setCurrentIndex((prev) => (prev - 1 + Math.max(regularTestimonials.length, 1)) % Math.max(regularTestimonials.length, 1)),
    });
  };

  const goToTestimonial = (index) => {
    if (regularTestimonials.length <= 1) return;
    
    const diff = index - currentIndex;
    const tl = gsap.timeline();
    tl.to(carouselRef.current.children, {
      xPercent: `-=${diff * 100}`,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setCurrentIndex(index),
    });
  };

  // Auto-scroll carousel
  useEffect(() => {
    if (regularTestimonials.length <= 1) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [regularTestimonials]);

  // Handle form submission
  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('Please log in to submit a testimonial.');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }
    if (!formData.quote || !formData.rating) {
      setMessage('Quote and rating are required.');
      return;
    }

    try {
      const method = userTestimonial ? 'PUT' : 'POST';
      const url = '/api/testimonials';
      const body = userTestimonial
        ? { id: userTestimonial._id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setUserTestimonial(data.testimonial);
        setMessage(userTestimonial ? 'Testimonial updated successfully!' : 'Testimonial submitted successfully!');
        setTimeout(() => setIsModalOpen(false), 2000);
        
        // Refresh testimonials after submission
        const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          setTestimonials(testimonials);
          
          // Filter testimonials to only show approved ones with displayOnPortfolio: true
          const approvedTestimonials = testimonials.filter(
            testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
          );
          
          // Separate featured and regular testimonials
          const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
          const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
          setFeaturedTestimonials(featured);
          setRegularTestimonials(regular);
        }
      } else {
        setMessage(data.message || 'Failed to submit/update testimonial.');
      }
    } catch (error) {
      console.error('Submit testimonial error:', error);
      setMessage('Failed to submit/update testimonial. Please try again.');
    }
  };

  // Handle delete testimonial
  const handleDeleteTestimonial = async () => {
    if (!isAuthenticated) {
      setMessage('Please log in to delete your testimonial.');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }
    if (!userTestimonial) {
      setMessage('No testimonial to delete.');
      return;
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userTestimonial._id }),
        credentials: 'include',
      });

      if (res.ok) {
        setUserTestimonial(null);
        setFormData({ fullName: formData.fullName, email: formData.email, company: '', role: '', quote: '', rating: 5, avatar: '' });
        setMessage('Testimonial deleted successfully!');
        setTimeout(() => setIsModalOpen(false), 2000);
        
        // Refresh testimonials after deletion
        const testimonialsRes = await fetch('/api/testimonials?all=true', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          setTestimonials(testimonials);
          
          // Filter testimonials to only show approved ones with displayOnPortfolio: true
          const approvedTestimonials = testimonials.filter(
            testimonial => testimonial.status === 'approved' && testimonial.displayOnPortfolio
          );
          
          // Separate featured and regular testimonials
          const featured = approvedTestimonials.filter(testimonial => testimonial.featured);
          const regular = approvedTestimonials.filter(testimonial => !testimonial.featured);
          
          setFeaturedTestimonials(featured);
          setRegularTestimonials(regular);
        }
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to delete testimonial.');
      }
    } catch (error) {
      console.error('Delete testimonial error:', error);
      setMessage('Failed to delete testimonial. Please try again.');
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800">Our Customers' Stories</h1>
            <p className="mt-4 text-lg sm:text-xl text-emerald-600">
              Discover how our platform has empowered professionals across industries.
            </p>
          </header>

          <section ref={featuredRef} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">Featured Testimonial</h2>
            {featuredTestimonials.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <img
                  src={featuredTestimonials[0].avatar || defaultPlaceholder}
                  alt={`${featuredTestimonials[0].name}'s avatar`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
                />
                <div className="text-center sm:text-left">
                  <p className="text-gray-600 italic mb-4 text-base sm:text-lg">&quot;{featuredTestimonials[0].quote}&quot;</p>
                  <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">{featuredTestimonials[0].name}</h3>
                  <p className="text-sm text-emerald-600">{featuredTestimonials[0].role}, {featuredTestimonials[0].company}</p>
                  <div className="flex justify-center sm:justify-start mt-2">{renderStars(featuredTestimonials[0].rating)}</div>
                  <p className="text-xs text-gray-500 mt-2">{new Date(featuredTestimonials[0].date).toLocaleDateString()}</p>
                  <button
                    onClick={() => router.push('/contact')}
                    className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                  >
                    Contact Now
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">No featured testimonials available.</p>
            )}
          </section>

          <section className="grid-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">More From Our Users</h2>
            {regularTestimonials.length > 0 ? (
              <>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {regularTestimonials.map((testimonial, index) => (
                    <div
                      key={testimonial._id}
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    >
                      <img
                        src={testimonial.avatar || defaultPlaceholder}
                        alt={`${testimonial.name}'s avatar`}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover"
                      />
                      <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{testimonial.quote}&quot;</p>
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{testimonial.name}</h3>
                      <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
                      <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
                      <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                      <button
                        onClick={() => router.push('/contact')}
                        className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                      >
                        Contact Now
                      </button>
                    </div>
                  ))}
                </div>
                <div className="md:hidden relative overflow-hidden">
                  <div ref={carouselRef} className="flex">
                    {regularTestimonials.map((testimonial) => (
                      <div
                        key={testimonial._id}
                        className="min-w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
                      >
                        <img
                          src={testimonial.avatar || defaultPlaceholder}
                          alt={`${testimonial.name}'s avatar`}
                          className="w-16 h-16 rounded-full mb-4 object-cover"
                        />
                        <p className="text-gray-600 italic mb-4 text-sm">&quot;{testimonial.quote}&quot;</p>
                        <h3 className="text-base font-semibold text-emerald-800">{testimonial.name}</h3>
                        <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
                        <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
                        <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                        <button
                          onClick={() => router.push('/contact')}
                          className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                        >
                          Contact Now
                        </button>
                      </div>
                    ))}
                  </div>
                  {regularTestimonials.length > 1 && (
                    <>
                      <button
                        onClick={prevTestimonial}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        aria-label="Previous testimonial"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        aria-label="Next testimonial"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="flex justify-center mt-4 space-x-2">
                        {regularTestimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            aria-label={`Go to testimonial ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">No testimonials available.</p>
            )}
          </section>

          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6">Join Our Community</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
              >
                {userTestimonial ? 'Update Your Testimonial' : 'Share Your Experience'}
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="py-3 px-6 bg-emerald-800 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
              >
                Get Started
              </button>
            </div>
            {userTestimonial && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-emerald-800">Your Testimonial</h3>
                <div className="bg-white rounded-2xl shadow-xl p-6 mt-4 text-center">
                  <img
                    src={userTestimonial.avatar || defaultPlaceholder}
                    alt={`${userTestimonial.name}'s avatar`}
                    className="w-16 h-16 rounded-full mb-4 mx-auto object-cover"
                  />
                  <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{userTestimonial.quote}&quot;</p>
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{userTestimonial.name}</h3>
                  <p className="text-sm text-emerald-600">{userTestimonial.role}, {userTestimonial.company}</p>
                  <div className="flex justify-center mt-2">{renderStars(userTestimonial.rating)}</div>
                  <p className="text-xs text-gray-500 mt-2">{new Date(userTestimonial.date).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </section>

          {isModalOpen && (
            <div
              className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
              onClick={(e) => handleOutsideClick(e, setIsModalOpen)}
            >
              <div
                ref={modalRef}
                className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-white text-center">
                    {userTestimonial ? 'Update Your Feedback' : 'Share Your Feedback'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <form onSubmit={handleSubmitTestimonial} className="p-6 sm:p-8 space-y-6">
                  <div className="flex justify-center">
                    <img
                      src={formData.avatar || defaultPlaceholder}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover cursor-pointer shadow-md"
                      onClick={() => setIsAvatarModalOpen(true)}
                    />
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      disabled={isAuthenticated}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isAuthenticated}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your Role"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
                      Your Testimonial
                    </label>
                    <textarea
                      id="quote"
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      required
                      rows={4}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4.5}>4.5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3.5}>3.5 Stars</option>
                      <option value={3}>3 Stars</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                    >
                      {userTestimonial ? 'Update Testimonial' : 'Submit Testimonial'}
                    </button>
                    {userTestimonial && (
                      <button
                        type="button"
                        onClick={handleDeleteTestimonial}
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cta-button"
                      >
                        Delete Testimonial
                      </button>
                    )}
                  </div>
                </form>
                {message && (
                  <p className="mt-4 text-center text-emerald-600 px-4">{message}</p>
                )}
              </div>
            </div>
          )}

          {isAvatarModalOpen && (
            <div
              className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
              onClick={(e) => handleOutsideClick(e, setIsAvatarModalOpen)}
            >
              <div
                ref={avatarModalRef}
                className="bg-white rounded-2xl w-full max-w-md mx-auto relative max-h-[80vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl">
                  <h2 className="text-xl font-bold text-white text-center">Choose Your Avatar</h2>
                </div>
                <button
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
                  aria-label="Close avatar modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Avatar Section</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {defaultAvatars.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Default Avatar ${i + 1}`}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer object-cover hover:border-2 hover:border-emerald-500"
                          onClick={() => {
                            setFormData({ ...formData, avatar: url });
                            setIsAvatarModalOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Upload from Computer</h3>
                    <button
                      type="button"
                      onClick={handleOpenCloudinaryWidget}
                      className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}