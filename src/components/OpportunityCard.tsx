'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Opportunity } from '@/data/opportunities';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      hackathon: 'bg-blue-100 text-blue-700 border border-blue-200',
      competition: 'bg-purple-100 text-purple-700 border border-purple-200',
      internship: 'bg-green-100 text-green-700 border border-green-200',
      job: 'bg-orange-100 text-orange-700 border border-orange-200',
      scholarship: 'bg-pink-100 text-pink-700 border border-pink-200',
      course: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      online: 'text-blue-600 font-semibold',
      offline: 'text-red-600 font-semibold',
      hybrid: 'text-purple-600 font-semibold',
    };
    return colors[type] || 'text-gray-600 font-semibold';
  };

  return (
    <Link href={`/opportunity/${opportunity.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden border border-gray-100 hover:border-indigo-200 group">
        <div className="relative h-48 w-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <Image
            src={opportunity.imageUrl}
            alt={opportunity.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {opportunity.isFeatured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Featured
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getCategoryColor(opportunity.category)}`}>
              {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
            </span>
            <span className={`text-xs px-3 py-1 bg-gray-100 rounded-full ${getTypeColor(opportunity.type)}`}>
              {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
            {opportunity.title}
          </h3>

          <p className="text-sm font-semibold text-gray-700 mb-1">
            {opportunity.company}
          </p>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {opportunity.description}
          </p>

          <div className="space-y-2 mb-4">
            {opportunity.prize && (
              <div className="flex items-center text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-lg">
                <span className="mr-2">💰</span>
                {opportunity.prize}
              </div>
            )}
            {opportunity.participants && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">👥</span>
                {opportunity.participants} participants
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
            <span>📅 {new Date(opportunity.registrationDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
            <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
