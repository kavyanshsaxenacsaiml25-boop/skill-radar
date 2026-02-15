'use client';

import Image from 'next/image';
import Link from 'next/link';
import { opportunities } from '@/data/opportunities';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface OpportunityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const [paramId, setParamId] = useState<string | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle async params
  if (paramId === null) {
    params.then(({ id }) => setParamId(id));
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const opportunity = opportunities.find(opp => opp.id === paramId);

  if (!opportunity) {
    notFound();
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      hackathon: { bg: 'bg-blue-100', text: 'text-blue-800' },
      competition: { bg: 'bg-purple-100', text: 'text-purple-800' },
      internship: { bg: 'bg-green-100', text: 'text-green-800' },
      job: { bg: 'bg-orange-100', text: 'text-orange-800' },
      scholarship: { bg: 'bg-pink-100', text: 'text-pink-800' },
      course: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    };
    return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const categoryColor = getCategoryColor(opportunity.category);

  const isDeadlineClose = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days <= 7 && days > 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call the registration API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          opportunityTitle: opportunity.title,
          opportunityId: opportunity.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Show success state
      setRegistrationSuccess(true);
      setIsSubmitting(false);

      // Auto close modal and redirect after 3 seconds
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegistrationSuccess(false);
        setFormData({ fullName: '', email: '', phone: '' });
        // Optional: redirect to confirmation page
        // window.location.href = data.confirmationLink;
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      alert(error instanceof Error ? error.message : 'Failed to register. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!registrationSuccess && !isSubmitting) {
      setShowRegisterModal(false);
      setFormData({ fullName: '', email: '', phone: '' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/opportunities" className="text-indigo-600 hover:text-indigo-700 font-semibold mb-4 inline-block transition">
            ← Back to Opportunities
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 w-full bg-gray-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
              <Image
                src={opportunity.imageUrl}
                alt={opportunity.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title and Basic Info */}
            <div className="space-y-4">
              <div className="flex gap-3 flex-wrap items-center">
                <span className={`px-4 py-2 rounded-full font-semibold text-sm ${categoryColor.bg} ${categoryColor.text}`}>
                  {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
                </span>
                <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold text-sm">
                  {opportunity.type}
                </span>
                {opportunity.isFeatured && (
                  <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold text-sm">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{opportunity.title}</h1>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-gray-700 flex items-center gap-2">🏢 <span className="font-semibold">{opportunity.company}</span></p>
                {opportunity.location && (
                  <p className="text-gray-600 flex items-center gap-2 text-lg">
                    📍 {opportunity.location}
                  </p>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 About This Opportunity</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{opportunity.description}</p>

              {opportunity.eligibility && (
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                    ✓ Eligibility
                  </h3>
                  <p className="text-gray-700">{opportunity.eligibility}</p>
                </div>
              )}
            </div>

            {/* Important Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <p className="text-gray-600 text-sm mb-2">📅 Start Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(opportunity.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <p className="text-gray-600 text-sm mb-2">📅 End Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(opportunity.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className={`bg-white p-6 rounded-xl shadow-md border ${isDeadlineClose(opportunity.registrationDeadline) ? 'border-red-300 bg-red-50' : 'border-gray-100'} hover:shadow-lg transition`}>
                <p className="text-gray-600 text-sm mb-2">⏰ Registration Deadline</p>
                <div>
                  <p className={`text-lg font-semibold ${isDeadlineClose(opportunity.registrationDeadline) ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(opportunity.registrationDeadline).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  {isDeadlineClose(opportunity.registrationDeadline) && (
                    <p className="text-red-600 text-xs mt-2 font-semibold">🔥 Closing Soon!</p>
                  )}
                </div>
              </div>
              {opportunity.prize && (
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                  <p className="text-gray-600 text-sm mb-2">💰 Prize Pool</p>
                  <p className="text-lg font-semibold text-green-600">{opportunity.prize}</p>
                </div>
              )}
            </div>

            {/* Required Skills */}
            {opportunity.skills && opportunity.skills.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Required Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {opportunity.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 rounded-full text-sm font-semibold border border-indigo-200 hover:shadow-md transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <aside className="space-y-6">
            {/* Register Card - Sticky */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl sticky top-8 hover:shadow-2xl transition">
              <h3 className="text-xl font-bold mb-1">🏆 {opportunity.company}</h3>
              <p className="text-indigo-200 text-sm mb-6">Opportunities are waiting for you</p>
              
              {opportunity.participants && (
                <div className="bg-indigo-500 bg-opacity-50 rounded-lg p-3 mb-6 text-center">
                  <p className="text-indigo-100 flex items-center justify-center gap-2">
                    👥 {opportunity.participants} participants
                  </p>
                </div>
              )}
              
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition mb-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 duration-200 text-lg"
              >
                🚀 Register Now
              </button>
              <button className="w-full border-2 border-white text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition duration-200">
                💾 Save for Later
              </button>
            </div>

            {/* Key Information Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">ℹ️ Key Information</h3>
              <div className="space-y-5">
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-gray-600 text-sm mb-2 font-semibold">Category</p>
                  <p className="font-semibold text-gray-900 capitalize text-base">{opportunity.category}</p>
                </div>
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-gray-600 text-sm mb-2 font-semibold">Format</p>
                  <p className="font-semibold text-gray-900 capitalize text-base">{opportunity.type}</p>
                </div>
                {opportunity.difficulty && (
                  <div className="pb-5 border-b border-gray-200">
                    <p className="text-gray-600 text-sm mb-2 font-semibold">Difficulty Level</p>
                    <p className="font-semibold text-gray-900 capitalize text-base">{opportunity.difficulty}</p>
                  </div>
                )}
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-gray-600 text-sm mb-2 font-semibold">Certificate</p>
                  <p className="font-semibold text-gray-900 text-base flex items-center gap-2">
                    {opportunity.certificateProvided ? (
                      <>✅ Provided</>
                    ) : (
                      <>❌ Not Provided</>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-semibold">Posted On</p>
                  <p className="font-semibold text-gray-900 text-base">{new Date(opportunity.postedDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeInUp">
                {registrationSuccess ? (
              <>
                {/* Success State */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-white text-5xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Registration Successful!</h2>
                    <p className="text-gray-600 mt-3">You've been registered for:</p>
                    <p className="text-lg font-bold text-indigo-600 mt-2">{opportunity.title}</p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      📧 <strong>Confirmation email sent to:</strong>
                    </p>
                    <p className="text-indigo-600 font-semibold mt-1 break-all">{formData.email}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Check your inbox and spam folder for the confirmation link and details. You can now explore more opportunities!
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Form State */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">🎯 Register for</h2>
                  <p className="text-lg font-bold text-indigo-600 mt-1">{opportunity.title}</p>
                  <p className="text-gray-600 text-sm mt-2">Fill in your details to get started</p>
                </div>
                
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-bold text-gray-800 mb-2">
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                      📧 Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-2">
                      📱 Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 transform active:scale-95"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '⏳ Registering...' : '✨ Register'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
