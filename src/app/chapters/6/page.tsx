"use client";
import Link from 'next/link';

export default function CategoricalVariables() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Chapters
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="categorical variables" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Chapter 6: Categorical Variables</h1>
              <p className="text-xl text-gray-600 mt-2">Learn how to use categorical variables in regression</p>
            </div>
          </div>
          
          {/* Fun Fact */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Did You Know?</h3>
            <p className="text-blue-700">
              Amazon uses categorical variables in their conversion rate models to analyze how factors like device type (mobile, desktop, tablet), 
              customer segment (new vs. returning), and traffic source (search, social, direct) affect purchase behavior!
            </p>
          </div>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/chapters/6/encoding-indicator-variables">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="encoding variables" className="text-2xl">
                    🔢
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Encoding Indicator Variables</h2>
                  <p className="text-gray-600 mt-1">Understand what indicator variables are, reference levels, and how categorical data gets encoded for regression</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/6/regression-equation">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="regression equation" className="text-2xl">
                    📈
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Regression Equation</h2>
                  <p className="text-gray-600 mt-1">Learn the structure of regression equations with categorical variables and see real examples with calculations</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/6/interpreting-summary-output">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="interpreting output" className="text-2xl">
                    📊
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Interpreting Summary Output</h2>
                  <p className="text-gray-600 mt-1">Master the interpretation of regression output with categorical variables through interactive examples</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/6/visual-indicator-variables">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="visual indicator variables" className="text-2xl">
                    📈
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Visual Guide to Indicator Variables</h2>
                  <p className="text-gray-600 mt-1">See how indicator variables create different regression lines for different groups with interactive visualizations</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 