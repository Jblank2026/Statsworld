"use client";
import Link from 'next/link';

export default function MultipleRegression() {
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
              <span role="img" aria-label="multiple regression" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Multiple Regression</h1>
              <p className="text-xl text-gray-600 mt-2">
                Level up your prediction game with multiple predictors
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/chapters/5/multiple-equation">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="multiple equation" className="text-2xl">
                    🧮
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Multiple Equation</h2>
                  <p className="text-gray-600 mt-1">Understanding the fundamentals of multiple regression equations</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/5/interpreting-multiple-output">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="interpreting output" className="text-2xl">
                    📊
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Interpreting Output</h2>
                  <p className="text-gray-600 mt-1">Understanding and analyzing multiple regression results</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/5/multiple-regression-assumptions">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="regression assumptions" className="text-2xl">
                    📏
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Regression Assumptions</h2>
                  <p className="text-gray-600 mt-1">Understanding when multiple regression is valid</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/5/multicollinearity">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="multicollinearity" className="text-2xl">
                    🔄
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Multicollinearity</h2>
                  <p className="text-gray-600 mt-1">Understanding correlated predictors in regression</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/chapters/5/interaction-variables">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="interaction variables" className="text-2xl">
                    🔁
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Interaction Variables</h2>
                  <p className="text-gray-600 mt-1">KNOW THAT IT DEPENDS</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 