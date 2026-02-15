'use client';

import React, { useState, useMemo, Suspense } from 'react';
import OpportunityCard from '@/components/OpportunityCard';
import { opportunities, categories, types } from '@/data/opportunities';
import { useSearchParams } from 'next/navigation';

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(opp =>
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(opp => opp.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(opp => opp.type === selectedType);
    }

    // Sort
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime());
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">All Opportunities</h1>
          <p className="text-xl text-gray-100">
            Discover {filteredOpportunities.length} amazing opportunities
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Search</label>
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-gray-700 text-sm">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Type</label>
              <div className="space-y-2">
                {types.map(type => (
                  <label key={type.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={type.id}
                      checked={selectedType === type.id}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-gray-700 text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline Soon</option>
              </select>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-gray-600 text-lg">No opportunities found matching your criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OpportunitiesContent />
    </Suspense>
  );
}
