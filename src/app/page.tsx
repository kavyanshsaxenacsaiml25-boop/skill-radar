'use client';

import Image from 'next/image';
import Link from 'next/link';
import OpportunityCard from '@/components/OpportunityCard';
import { opportunities } from '@/data/opportunities';

export default function Home() {
  const featuredOpportunities = opportunities.filter(opp => opp.isFeatured).slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
            <div className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md rounded-full">
              <p className="text-white text-sm font-semibold">🚀 Unlock Your Potential</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your Next Opportunity
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed">
              Explore hackathons, competitions, internships, jobs, scholarships, and courses. Skill Radar brings all opportunities to one place.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/opportunities" className="bg-white text-indigo-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-2xl transform hover:scale-105">
                Explore Opportunities
              </Link>
              <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-indigo-600 transition shadow-lg hover:shadow-2xl backdrop-blur-sm bg-white bg-opacity-10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">{opportunities.length}+</div>
              <p className="text-gray-600 font-semibold">Active Opportunities</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">50K+</div>
              <p className="text-gray-600 font-semibold">Active Participants</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">₹10L+</div>
              <p className="text-gray-600 font-semibold">Total Prize Pool</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">100+</div>
              <p className="text-gray-600 font-semibold">Leading Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fadeInUp">
            <div className="inline-block mb-4 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">✨ Featured</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-gray-600 text-lg">Check out the hottest opportunities this month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/opportunities" className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:shadow-lg transition shadow-md hover:shadow-2xl transform hover:scale-105">
              View All Opportunities →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fadeInUp">
            <div className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">📚 Categories</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg">Find opportunities that match your interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Hackathons', icon: '🚀', count: '12+', link: '/opportunities?category=hackathon', color: 'from-blue-500 to-cyan-500' },
              { name: 'Competitions', icon: '🏆', count: '15+', link: '/opportunities?category=competition', color: 'from-purple-500 to-pink-500' },
              { name: 'Internships', icon: '💼', count: '18+', link: '/opportunities?category=internship', color: 'from-green-500 to-emerald-500' },
              { name: 'Jobs', icon: '👔', count: '22+', link: '/opportunities?category=job', color: 'from-orange-500 to-red-500' },
              { name: 'Scholarships', icon: '🎓', count: '8+', link: '/opportunities?category=scholarship', color: 'from-pink-500 to-rose-500' },
              { name: 'Courses', icon: '📚', count: '10+', link: '/opportunities?category=course', color: 'from-indigo-500 to-purple-500' },
            ].map((category) => (
              <Link key={category.name} href={category.link}>
                <div className={`group bg-gradient-to-br ${category.color} p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 text-white overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></div>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-300 inline-block">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-100 transition">{category.name}</h3>
                  <p className="text-gray-100 font-semibold">{category.count} opportunities</p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -mr-12 -mb-12 group-hover:opacity-10 transition"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Skill Radar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg mb-4">
                Skill Radar is your one-stop platform for discovering and participating in opportunities that help you grow professionally and personally.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Whether you're looking for your next hackathon, competition, internship, or full-time job, we bring together the best opportunities from across the nation.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Curated opportunities from trusted companies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Easy search and filter functionality
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Real-time notifications for new opportunities
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Community of passionate learners and professionals
                </li>
              </ul>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 text-center font-semibold text-lg px-4">🚀 Growing Together, Reaching Higher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-100 mb-10 leading-relaxed">
            Join thousands of ambitious individuals discovering amazing opportunities on Skill Radar. Transform your skills and accelerate your career today.
          </p>
          <Link href="/opportunities" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-2xl transform hover:scale-105">
            Explore Opportunities Now 🎯
          </Link>
        </div>
      </section>
    </main>
  );
}
