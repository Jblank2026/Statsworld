"use client";
import Link from 'next/link';

export default function LogisticRegression() {
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
              <span role="img" aria-label="logistic regression" className="text-4xl">🎲</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Logistic Regression</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master binary predictions and categorical outcomes
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/chapters/7/visual-logistic">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="visual logistic" className="text-2xl">
                    📈
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">What IS Logistic Regression?</h2>
                  <p className="text-gray-600 mt-1">Visualize the S-curve that predicts probabilities</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/7/logistic-foundations">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="logistic foundations" className="text-2xl">
                    🎯
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Logistic Foundations</h2>
                  <p className="text-gray-600 mt-1">Understanding when and how to use logistic regression</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/7/interpreting-output">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="interpreting output" className="text-2xl">
                    📊
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Interpreting Output</h2>
                  <p className="text-gray-600 mt-1">Master the interpretation of logistic regression results</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/7/confusion-matrices">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="confusion matrices" className="text-2xl">
                    🎯
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Confusion Matrices & Accuracy</h2>
                  <p className="text-gray-600 mt-1">Evaluate model performance and understand prediction errors</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/7/checking-regression">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="checking regression" className="text-2xl">
                    🔍
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Checking Logistic Regression</h2>
                  <p className="text-gray-600 mt-1">Validate model assumptions with goodness-of-fit tests</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 