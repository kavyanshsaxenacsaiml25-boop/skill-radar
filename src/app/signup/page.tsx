'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { fullName, email, password, confirmPassword, agreeTerms } = formData;

      if (!fullName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (!agreeTerms) {
        setError('Please agree to the terms and conditions');
        setIsLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful signup
      setSuccess(true);
      setRegisteredEmail(email);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });
    } catch (err) {
      setError('Sign up failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-8 animate-fadeInUp">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-5xl">✅</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3 animate-fadeInUp">Account Created!</h1>
            <p className="text-gray-600 text-lg mb-4 animate-fadeInUp">Welcome to Skill Radar</p>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-8 animate-fadeInUp">
              <p className="text-green-800 font-semibold mb-2 flex items-center justify-center gap-2">
                <span>📧</span> Registration Successful
              </p>
              <p className="text-green-700 text-sm break-all">{registeredEmail}</p>
              <p className="text-green-600 text-sm mt-3">You can now log in with your email and password</p>
            </div>

            <div className="space-y-3 animate-slideInRight">
              <Link
                href="/login"
                className="w-full inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ✨ Go to Login
              </Link>
              
              <Link
                href="/opportunities"
                className="w-full inline-block border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
              >
                🚀 Explore Opportunities
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 font-semibold transition">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fadeInUp">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition">
              <span className="text-white font-bold text-3xl">💡</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2 animate-fadeInUp">Join Skill Radar</h1>
          <p className="text-gray-600 text-center mb-8 animate-fadeInUp">Create your account to unlock opportunities</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center gap-3 animate-fadeInUp">
              <span className="text-2xl">❌</span>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 animate-slideInRight">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                👤 Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                disabled={isLoading}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                🔐 Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                🔐 Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                disabled={isLoading}
              />
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer bg-indigo-50 p-4 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 accent-indigo-600 mt-0.5"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-bold">
                  terms and conditions
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 mt-6"
            >
              {isLoading ? '⏳ Creating Account...' : '✨ Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-bold transition">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 font-semibold transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
