'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token && email) {
      // Here you could validate the token against your database
      // For now, we'll just confirm it exists
      setConfirmed(true);
    }
  }, [searchParams]);

  const email = searchParams.get('email');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
      {confirmed ? (
        <>
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-5xl">✅</span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900">All Set!</h1>
            <p className="text-gray-600 mt-2">Your registration has been confirmed</p>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Confirmation sent to:</p>
            <p className="text-lg font-semibold text-indigo-600 break-all">{email}</p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700">
              📧 A confirmation email has been sent to your inbox with all the details of your registration.
            </p>
            <p className="text-sm text-gray-600">
              If you don't see it in your inbox, please check your spam folder.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/opportunities"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Explore More Opportunities
            </Link>
            <Link
              href="/"
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Go to Home
            </Link>
          </div>

          <p className="text-xs text-gray-500 pt-4">
            💡 Powered by Skill Radar
          </p>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Verifying Your Registration</h1>
          <p className="text-gray-600">Please wait while we confirm your details...</p>

          <Link
            href="/opportunities"
            className="inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Opportunities
          </Link>
        </>
      )}
    </div>
  );
}

export default function RegistrationConfirmedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <section className="max-w-md w-full">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </section>
    </main>
  );
}
