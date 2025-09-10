'use client';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/HomePage/Navbar/Navbar';
import Footer from '../components/HomePage/FooterSection/footer';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [regularTestimonials, setRegularTestimonials] = useState([]);
  const [userTestimonial, setUserTestimonial] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
  // const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const cardsRef = useRef([]);
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
  const defaultPlaceholder = 'https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user authentication status
        const authRes = await fetch('/api/auth/check', { credentials: 'include' });
        let user = null;
        
        if (authRes.ok) {
          const authData = await authRes.json();
          user = authData.user;
          setCurrentUser(user);
          setIsAuthenticated(true);
          
          // Set form data with user info
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
          setCurrentUser(null);
          setFormData({ fullName: '', email: '', company: '', role: '', quote: '', rating: 5, avatar: '' });
        }

        // Fetch testimonials
        const testimonialsRes = await fetch('/api/testimonials', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          
          if (Array.isArray(testimonials)) {
            setTestimonials(testimonials);

            // Filter approved testimonials for display
            const approvedTestimonials = testimonials.filter(t => t && t.status === 'approved' && t.displayOnPortfolio);
            setFeaturedTestimonials(approvedTestimonials.filter(t => t && t.featured));
            setRegularTestimonials(approvedTestimonials.filter(t => t && !t.featured));

            // Find user's testimonial
            if (user && testimonials.length > 0) {
              // Check both userId and email to ensure we find the user's testimonial
              const userTest = testimonials.find(t => 
                t && (
                  (t.userId && t.userId.toString() === user.id) || 
                  (t.email && t.email === user.email)
                )
              );
              
              setUserTestimonial(userTest || null);
              
              if (userTest) {
                setFormData(prev => ({
                  ...prev,
                  company: userTest.company || '',
                  role: userTest.role || '',
                  quote: userTest.quote || '',
                  rating: userTest.rating || 5,
                  avatar: userTest.avatar || '',
                }));
              }
            } else {
              setUserTestimonial(null);
            }
          } else {
            setTestimonials([]);
            setFeaturedTestimonials([]);
            setRegularTestimonials([]);
            setUserTestimonial(null);
          }
        } else {
          setTestimonials([]);
          setFeaturedTestimonials([]);
          setRegularTestimonials([]);
          setUserTestimonial(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data. Please try again.');
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.8, rotate: 5 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.8, rotate: 5, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

  useEffect(() => {
    if (isAvatarModalOpen) {
      gsap.fromTo(avatarModalRef.current, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(avatarModalRef.current, { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isAvatarModalOpen]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.grid-section', start: 'top 80%', toggleActions: 'play none none reverse', once: true },
    });

    gsap.fromTo(featuredRef.current, { opacity: 0, scale: 0.9 }, {
      opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: featuredRef.current, start: 'top 80%', once: true },
    });

    gsap.utils.toArray('.cta-button').forEach((button) => {
      const animation = gsap.fromTo(button, { scale: 1 }, {
        scale: 1.05, duration: 0.3, ease: 'power2.out', paused: true,
        onStart: () => button.classList.add('shadow-lg'),
        onReverseComplete: () => button.classList.remove('shadow-lg'),
      });
      animation.play();
      button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.3 }));
      button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
    });
  }, [regularTestimonials]);

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
        maxFileSize: 5000000,
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

  const handleOutsideClick = (e, setModalState) => {
    if (e.target === e.currentTarget) setModalState(false);
  };

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
        : { ...formData, userId: currentUser.id };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setUserTestimonial(data.testimonial || userTestimonial);
        // setMessage(userTestimonial ? 'Testimonial updated successfully!' : 'Testimonial submitted for approval!');
        toast.success(
  userTestimonial
    ? " Testimonial updated successfully!"
    : " Testimonial submitted for approval!"
);

        setTimeout(() => setIsModalOpen(false), 2000);

        // Refresh testimonials
        const testimonialsRes = await fetch('/api/testimonials', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          setTestimonials(testimonials);
          const approvedTestimonials = testimonials.filter(t => t.status === 'approved' && t.displayOnPortfolio);
          setFeaturedTestimonials(approvedTestimonials.filter(t => t.featured));
          setRegularTestimonials(approvedTestimonials.filter(t => !t.featured));
          
          // Update user testimonial
          const userTest = testimonials.find(t => 
            t && (
              (t.userId && t.userId.toString() === currentUser.id) || 
              (t.email && t.email === currentUser.email)
            )
          );
          setUserTestimonial(userTest || null);
        }
      } else {
        toast.error(data.message || "❌ Failed to submit/update testimonial.");

        // setMessage(data.message || 'Failed to submit/update testimonial.');
      }
    } catch (error) {
      console.error('Submit testimonial error:', error);
      setMessage('Failed to submit/update testimonial. Please try again.');
    }
  };

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
        setFormData({ ...formData, company: '', role: '', quote: '', rating: 5, avatar: '' });
        // setMessage('Testimonial deleted successfully!');
        toast.success("🗑️ Testimonial deleted successfully!");

        setTimeout(() => setIsModalOpen(false), 2000);

        // Refresh testimonials
        const testimonialsRes = await fetch('/api/testimonials', { credentials: 'include' });
        if (testimonialsRes.ok) {
          const { testimonials } = await testimonialsRes.json();
          setTestimonials(testimonials);
          const approvedTestimonials = testimonials.filter(t => t.status === 'approved' && t.displayOnPortfolio);
          setFeaturedTestimonials(approvedTestimonials.filter(t => t.featured));
          setRegularTestimonials(approvedTestimonials.filter(t => !t.featured));
        }
      } else {
        const data = await res.json();
        toast.error(data.message || "❌ Failed to delete testimonial.");

        // setMessage(data.message || 'Failed to delete testimonial.');
      }
    } catch (error) {
      console.error('Delete testimonial error:', error);
      setMessage('Failed to delete testimonial. Please try again.');
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 lg:px-8 py-12" itemScope itemType="https://schema.org/WebPage">
        <div className="max-w-7xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800" itemProp="headline">
              Our Customer&apos;s Stories
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-emerald-600" itemProp="description">
              Discover how our platform has empowered professionals across industries.
            </p>
          </header>

          <section ref={featuredRef} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" itemScope itemType="https://schema.org/Review">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">Featured Testimonial</h2>
            {featuredTestimonials.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {featuredTestimonials.map(testimonial => (
                  <SwiperSlide key={testimonial._id}>
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8" itemProp="reviewBody">
                      <Image
                        src={testimonial.avatar || defaultPlaceholder}
                        alt={`${testimonial.name} avatar`}
                        width={128}
                        height={128}
                        className="rounded-full object-cover shadow-md"
                        priority
                      />
                      <div className="text-center sm:text-left">
                        <p className="text-gray-600 italic mb-4 text-base sm:text-lg">&quot;{testimonial.quote}&quot;</p>
                        <h3 className="text-lg sm:text-xl font-semibold text-emerald-800" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <span itemProp="name">{testimonial.name}</span>
                        </h3>
                        <p className="text-sm text-emerald-600" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                          <span itemProp="name">{`${testimonial.role}, ${testimonial.company}`}</span>
                        </p>
                        <div className="flex justify-center sm:justify-start mt-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          {renderStars(testimonial.rating)}
                          <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                        <button
                          onClick={() => router.push('/contact')}
                           style={{cursor:"pointer"}}
                          className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                        >
                          Contact Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {featuredTestimonials.length === 0 && (
              <p className="text-center text-gray-600">No featured testimonials available.</p>
            )}
          </section>

          <section className="grid-section" role="region" aria-label="User Testimonials">
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
                      <Image
                        src={testimonial.avatar || defaultPlaceholder}
                        alt={`${testimonial.name} avatar`}
                        width={80}
                        height={80}
                        className="rounded-full mb-4 object-cover"
                        loading="lazy"
                      />
                      <p className="text-gray-600 italic mb-4 text-sm sm:text-base">&quot;{testimonial.quote}&quot;</p>
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-800">{testimonial.name}</h3>
                      <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
                      <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
                      <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                      <button
                        onClick={() => router.push('/contact')}
                         style={{cursor:"pointer"}}
                        className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                      >
                        Contact Now
                      </button>
                    </div>
                  ))}
                </div>
                <div className="md:hidden">
                  <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{ nextEl: '.testimonial-swiper-button-next', prevEl: '.testimonial-swiper-button-prev' }}
                    pagination={{ clickable: true, el: '.testimonial-pagination', bulletClass: 'testimonial-bullet', bulletActiveClass: 'testimonial-bullet-active' }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    speed={800}
                    grabCursor={true}
                    className="testimonial-swiper"
                  >
                    {regularTestimonials.map((testimonial) => (
                      <SwiperSlide key={testimonial._id}>
                        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
                          <Image
                            src={testimonial.avatar || defaultPlaceholder}
                            alt={`${testimonial.name} avatar`}
                            width={64}
                            height={64}
                            className="rounded-full mb-4 object-cover"
                            loading="lazy"
                          />
                          <p className="text-gray-600 italic mb-4 text-sm">&quot;{testimonial.quote}&quot;</p>
                          <h3 className="text-base font-semibold text-emerald-800">{testimonial.name}</h3>
                          <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
                          <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
                          <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                          <button
                            onClick={() => router.push('/contact')}
                             style={{cursor:"pointer"}}
                            className="mt-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cta-button"
                          >
                            Contact Now
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex justify-center gap-4 mt-8">
                    <button className="testimonial-swiper-button-prev p-3 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-emerald-100" aria-label="Previous testimonial">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="testimonial-swiper-button-next p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" aria-label="Next testimonial">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">No testimonials available.</p>
            )}
          </section>

          <section className="text-center" itemScope itemType="https://schema.org/WebPageElement">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6">Join Our Community</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              {isAuthenticated && !userTestimonial && (
                <button
                  onClick={() => setIsModalOpen(true)}
                   style={{cursor:"pointer"}}
                  className="py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
                >
                  Share Your Experience
                </button>
              )}
              {isAuthenticated && userTestimonial && (
                <button
                  onClick={() => setIsModalOpen(true)}
                   style={{cursor:"pointer"}}
                  className="py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
                >
                  Update Your Testimonial
                </button>
              )}
              {!isAuthenticated && (
                <button
                  onClick={() => router.push('/signup')}
                   style={{cursor:"pointer"}}
                  className="py-3 px-6 bg-emerald-800 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out cta-button"
                >
                  Get Started
                </button>
              )}
            </div>
            {isAuthenticated && userTestimonial && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-emerald-800">Your Testimonial</h3>
                <div className="bg-white rounded-2xl shadow-xl p-6 mt-4 text-center" itemScope itemType="https://schema.org/Review">
                  <Image
                    src={userTestimonial.avatar || defaultPlaceholder}
                    alt={`${userTestimonial.name} avatar`}
                    width={64}
                    height={64}
                    className="rounded-full mb-4 mx-auto object-cover"
                    loading="lazy"
                  />
                  <p className="text-gray-600 italic mb-4 text-sm sm:text-base" itemProp="reviewBody">&quot;{userTestimonial.quote}&quot;</p>
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-800" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{userTestimonial.name}</span>
                  </h3>
                  <p className="text-sm text-emerald-600" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">{`${userTestimonial.role}, ${userTestimonial.company}`}</span>
                  </p>
                  <div className="flex justify-center mt-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    {renderStars(userTestimonial.rating)}
                    <meta itemProp="ratingValue" content={userTestimonial.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{new Date(userTestimonial.date).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </section>

          {isModalOpen && isAuthenticated && (
            <div
              className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
              onClick={(e) => handleOutsideClick(e, setIsModalOpen)}
            >
              <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto">
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
                    <Image
                      src={formData.avatar || defaultPlaceholder}
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="rounded-full object-cover cursor-pointer shadow-md"
                      onClick={() => setIsAvatarModalOpen(true)}
                      loading="lazy"
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
                      disabled
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
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
                      disabled
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
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
                      className="mt-1 text-black block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
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
                {/* {message && <p className="mt-4 text-center text-emerald-600 px-4">{message}</p>} */}
              </div>
            </div>
          )}

          {isAvatarModalOpen && isAuthenticated && (
            <div
              className="fixed inset-0 backdrop-blur-md bg-gray-500/10 flex items-center justify-center z-50 overflow-hidden p-4"
              onClick={(e) => handleOutsideClick(e, setIsAvatarModalOpen)}
            >
              <div ref={avatarModalRef} className="bg-white rounded-2xl w-full max-w-md mx-auto relative max-h-[80vh] overflow-y-auto">
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
                        <Image
                          key={i}
                          src={url}
                          alt={`Default Avatar ${i + 1}`}
                          width={64}
                          height={64}
                          className="rounded-full cursor-pointer object-cover hover:border-2 hover:border-emerald-500"
                          onClick={() => { setFormData({ ...formData, avatar: url }); setIsAvatarModalOpen(false); }}
                          loading="lazy"
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

      <style jsx>{`
        .testimonial-bullet { width: 12px; height: 12px; background: #ddd; border-radius: 50%; display: inline-block; margin: 0 4px; cursor: pointer; transition: all 0.3s ease; }
        .testimonial-bullet-active { width: 30px; background: linear-gradient(to right, #10b981, #0d9488); border-radius: 10px; }
        .testimonial-swiper { padding: 20px 10px 40px; }
        .testimonial-swiper-button-next.swiper-button-disabled, .testimonial-swiper-button-prev.swiper-button-disabled { opacity: 0.5; cursor: not-allowed; transform: scale(1); }
        .cta-button { transition: all 0.3s ease; }
        @media (max-width: 640px) { .testimonial-swiper-button-next, .testimonial-swiper-button-prev { display: none; } .testimonial-pagination { margin-top: 12px; } }
      `}</style>
    </>
  );
}