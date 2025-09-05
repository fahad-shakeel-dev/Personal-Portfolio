// 'use client'
// import { useState } from 'react';

// export default function SignupPage() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Handle signup logic here (e.g., API call)
//     console.log('Signup attempted with:', { fullName, email, password });
//   };

//   const handleGoogleSignup = () => {
//     // Handle Google signup logic here (e.g., redirect to Google OAuth)
//     console.log('Continue with Google');
//     // Example: window.location.href = 'https://your-google-oauth-url';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-12">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-emerald-800">Create Account</h2>
//           <p className="mt-2 text-sm text-emerald-600">Join us and get started</p>
//         </div>

//         <form onSubmit={handleSignup} className="space-y-6">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="Your Name Here"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="••••••••"
//             />
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">or</span>
//           </div>
//         </div>

//         <button
//           onClick={handleGoogleSignup}
//           className="w-full text-black flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               fill="#4285F4"
//             />
//             <path
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               fill="#34A853"
//             />
//             <path
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               fill="#FBBC05"
//             />
//             <path
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               fill="#EA4335"
//             />
//             <path d="M1 1h22v22H1z" fill="none" />
//           </svg>
//           Continue with Google
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ fullName, email, password, confirmPassword }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setMessage(result.message);
//         setFullName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const handleGoogleSignup = () => {
//     // Redirect to Google OAuth endpoint
//     // Replace with your actual Google OAuth URL
//     window.location.href = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || '/api/google';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-12">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-emerald-800">Create Account</h2>
//           <p className="mt-2 text-sm text-emerald-600">Join us and get started</p>
//         </div>

//         {message && <p className="text-green-600 text-center">{message}</p>}
//         {error && <p className="text-red-600 text-center">{error}</p>}

//         <form onSubmit={handleSignup} className="space-y-6">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="Your Name Here"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="••••••••"
//             />
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">or</span>
//           </div>
//         </div>

//         <button
//           onClick={handleGoogleSignup}
//           className="w-full text-black flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               fill="#4285F4"
//             />
//             <path
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               fill="#34A853"
//             />
//             <path
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               fill="#FBBC05"
//             />
//             <path
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               fill="#EA4335"
//             />
//             <path d="M1 1h22v22H1z" fill="none" />
//           </svg>
//           Continue with Google
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';  // ✅ import same as login

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // ✅ Use NextAuth same as login
  const handleGoogleSignup = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      setError('Failed to initiate Google sign-up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-emerald-800">Create Account</h2>
          <p className="mt-2 text-sm text-emerald-600">Join us and get started</p>
        </div>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              placeholder="Your Name Here"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block text-black w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* ✅ Fixed Google button */}
        <button
          onClick={handleGoogleSignup}
          style={{cursor:"pointer"}}
          className="w-full text-black flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
