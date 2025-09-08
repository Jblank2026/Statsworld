"use client";
import Link from 'next/link';

export default function PerfectFit() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Simple Linear Regression
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="perfect fit" className="text-4xl">📐</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Finding the Perfect Fit</h1>
              <p className="text-xl text-gray-600 mt-2">Discover how the least squares method finds the best-fitting line</p>
            </div>
          </div>

          <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded mb-6">
            <p className="text-gray-700">
              <strong>Coming Soon!</strong> This content is under development. Check back later for a complete tutorial on the least squares method.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-between items-center">
            <Link
              href="/chapters/4/magic-formula"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center"
            >
              Previous: The Magic Formula
            </Link>
            <Link
              href="/chapters/4"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center"
            >
              Back to Chapter Overview
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 