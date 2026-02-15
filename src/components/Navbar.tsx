'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">💡</span>
            </div>
            <Link href="/" className="font-bold text-xl text-gray-900 hidden sm:block">
              Skill Radar
            </Link>
          </div>

          <div className="hidden md:flex gap-1 items-center">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition font-medium text-sm">
              Home
            </Link>
            <Link href="/opportunities" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition font-medium text-sm">
              Opportunities
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition font-medium text-sm">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition font-medium text-sm">
              Contact
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                  {session.user?.image && (
                    <img src={session.user.image} alt={session.user.name || ''} className="w-8 h-8 rounded-full border border-indigo-200" />
                  )}
                  <p className="text-gray-800 font-semibold text-sm">{session.user?.name}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm shadow-md hover:shadow-lg">
                  Login
                </Link>
                <Link href="/signup" className="border-2 border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 transition font-semibold text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </Link>
            <Link href="/opportunities" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium">
              Opportunities
            </Link>
            <Link href="/#about" className="block py-2 text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/#contact" className="block py-2 text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            {session ? (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                  {session.user?.image && (
                    <img src={session.user.image} alt={session.user.name || ''} className="w-8 h-8 rounded-full" />
                  )}
                  <p className="text-gray-700 font-semibold">{session.user?.name}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link href="/login" className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold text-center">
                  Login
                </Link>
                <Link href="/signup" className="block w-full border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 font-semibold text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
