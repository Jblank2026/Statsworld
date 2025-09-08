"use client";
import Link from 'next/link';

export default function ModelBuilding() {
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
              <span role="img" aria-label="model building" className="text-4xl">🏗️</span>
          </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Model Building</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the strategic process of building statistical models
          </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/chapters/8/descriptive-vs-predictive">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                    <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="descriptive modeling" className="text-2xl">
                    🎭
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Descriptive Modeling</h2>
                  <p className="text-gray-600 mt-1">Build models to understand relationships and identify important predictors</p>
                </div>
                    </div>
                  </div>
          </Link>

          <Link href="/chapters/8/predictive-modeling">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="predictive modeling" className="text-2xl">
                    🎯
                  </span>
                      </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Predictive Modeling</h2>
                  <p className="text-gray-600 mt-1">Master the art of building models that generalize well to new data</p>
                </div>
              </div>
        </div>
          </Link>
          
          <Link href="/chapters/8/model-hierarchy">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="model hierarchy" className="text-2xl">
                    🏔️
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Model Hierarchy & Interactions</h2>
                  <p className="text-gray-600 mt-1">Navigate the pyramid of model complexity and understand interaction effects</p>
                </div>
          </div>
          </div>
          </Link>

          <Link href="/chapters/8/building-models-r">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-[#e7e7e7] rounded-lg p-3">
                  <span role="img" aria-label="building models" className="text-2xl">
                    🔧
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#58595b]">Building Models with R</h2>
                  <p className="text-gray-600 mt-1">Master all possible models and stepwise regression techniques</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 