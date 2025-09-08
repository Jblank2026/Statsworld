"use client";
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function SCurveJourney() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="s-curve" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">S-Curve Journey</h1>
              <p className="text-xl text-gray-600 mt-2">Exploring the S-shaped relationship in data</p>
            </div>
          </div>

          {/* All existing content sections remain the same */}
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 