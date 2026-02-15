'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">💡</span>
              </div>
              <span className="font-bold text-white text-lg">Skill Radar</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover and participate in the best opportunities for skill development and career growth.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition text-sm">f</a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition text-sm">𝕏</a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition text-sm">in</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">📍 Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-indigo-400 transition font-medium">Home</Link></li>
              <li><Link href="/opportunities" className="hover:text-indigo-400 transition font-medium">Opportunities</Link></li>
              <li><Link href="/#about" className="hover:text-indigo-400 transition font-medium">About</Link></li>
              <li><Link href="/#contact" className="hover:text-indigo-400 transition font-medium">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">🎯 Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/opportunities?category=hackathon" className="hover:text-indigo-400 transition font-medium">Hackathons</Link></li>
              <li><Link href="/opportunities?category=competition" className="hover:text-indigo-400 transition font-medium">Competitions</Link></li>
              <li><Link href="/opportunities?category=internship" className="hover:text-indigo-400 transition font-medium">Internships</Link></li>
              <li><Link href="/opportunities?category=job" className="hover:text-indigo-400 transition font-medium">Jobs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">📧 Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-indigo-400 transition"><a href="mailto:info@skillradar.com" className="font-medium">info@skillradar.com</a></li>
              <li className="hover:text-indigo-400 transition"><a href="tel:+919876543210" className="font-medium">+91 (987) 654 3210</a></li>
              <li className="text-gray-500">Mumbai, India 📍</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-gray-500 font-medium">
              © 2026 Skill Radar. All rights reserved. Made with ❤️ for ambitious minds.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-indigo-400 transition font-medium">Privacy Policy</Link>
              <Link href="#" className="hover:text-indigo-400 transition font-medium">Terms of Service</Link>
              <Link href="#" className="hover:text-indigo-400 transition font-medium">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
