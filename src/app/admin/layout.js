'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = () => {
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { href: '/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { href: '/admin/projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { href: '/admin/contacts', label: 'Contact Applications', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/admin/reviews', label: 'Reviews & Likes', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
    { href: '/admin/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/admin/quick-contact', label: 'Quick Contact', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg className="w-6 h-6 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg border-r border-emerald-100 transform transition-transform duration-300 ease-in-out z-40 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:w-64 overflow-y-auto`}
        >
            <Link href={"/admin"}>
          <div className="p-6 border-b border-emerald-100" style={{cursor:"pointer"}}>
            <h1 className="text-2xl font-bold text-emerald-800 transition-all duration-300 ease-in-out">Admin Panel</h1>
            <p className="text-sm text-emerald-600 mt-1 transition-all duration-300 ease-in-out">Portfolio Management</p>
          </div>
            </Link>

          <nav className="p-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out ${
                    pathname === link.href
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                  onClick={() => handleNavClick(link.href)}
                >
                  <svg className="w-5 h-5 mr-3 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </aside>

        {/* Overlay for Mobile when Sidebar is Open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-blur-[5px] bg-transparent z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <main className="flex-1 p-8 lg:ml-64 transition-all duration-300 ease-in-out overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}