"use client";
import Link from 'next/link';

export default function SimpleLinearRegression() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Chapters
          </Link>
        </div>

        {/* Chapter Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="simple linear regression" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Simple Linear Regression</h1>
              <p className="text-xl text-gray-600 mt-2">
                Turn relationships into predictions and discover the power of regression analysis
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/chapters/4/linear-equation">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="linear equation" className="text-2xl">
                    🔢
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Linear Equation</h2>
                  <p className="text-gray-600 mt-1">Learn about the linear equation and its components in regression analysis</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/4/sum-of-squared-error">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="sum of squared error" className="text-2xl">
                    📐
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Sum of Squared Error & Naive Model</h2>
                  <p className="text-gray-600 mt-1">Understanding how regression minimizes errors and compares to simple models</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/4/making-predictions">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="making predictions" className="text-2xl">
                    🔮
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Making Predictions</h2>
                  <p className="text-gray-600 mt-1">Confidence intervals, prediction intervals, and the dangers of extrapolation</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/4/transformations">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="transformations" className="text-2xl">
                    🔄
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Transformations</h2>
                  <p className="text-gray-600 mt-1">Fixing non-linear relationships and improving R-squared with data transformations</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/4/interpreting-summary-output">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="interpreting summary" className="text-2xl">
                    📊
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Interpreting Summary Output</h2>
                  <p className="text-gray-600 mt-1">Understanding and analyzing regression results</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/4/regression-assumptions">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="regression assumptions" className="text-2xl">
                    📏
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Regression Assumptions</h2>
                  <p className="text-gray-600 mt-1">Understanding when linear regression is valid and its key assumptions</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 