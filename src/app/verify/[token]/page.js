'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function VerifyPage() {
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');
  const router = useRouter();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No verification token provided.');
        return;
      }

      try {
        const response = await fetch(`/api/verify/${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          setMessage('Email verified successfully! You can now log in.');
          setTimeout(() => {
            router.push('/login');
          }, 3000); // Redirect to login after 3 seconds
        } else {
          const result = await response.json();
          setError(result.message || 'Failed to verify email.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-emerald-800">Email Verification</h2>
          <p className="mt-2 text-sm text-emerald-600">
            {message ? message : 'Please wait while we verify your email.'}
          </p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {message.includes('successfully') ? (
              <>
                Redirecting to <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">login</a>...
              </>
            ) : error ? (
              <>
                Please try again or{' '}
                <a href="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium">
                  sign up
                </a>{' '}
                again.
              </>
            ) : (
              'Processing your verification request...'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}