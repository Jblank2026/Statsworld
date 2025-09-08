"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function BuildingModelsR() {
  const [activeTab, setActiveTab] = useState('forward');

  const tabs = [
    { id: 'forward', label: 'Forward Selection', color: 'from-blue-500 to-blue-600', lightColor: 'bg-blue-50', emoji: '➕' },
    { id: 'backward', label: 'Backward Elimination', color: 'from-purple-500 to-purple-600', lightColor: 'bg-purple-50', emoji: '➖' },
    { id: 'both', label: 'Bidirectional', color: 'from-green-500 to-green-600', lightColor: 'bg-green-50', emoji: '↔️' }
  ];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="mb-8">
          <Link 
            href="/chapters/8"
            className="text-[#ff8200] hover:text-[#ff9933] transition-colors"
          >
            ← Back to Chapter
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-[#ff8200] to-orange-600 rounded-lg p-4">
              <span role="img" aria-label="building models" className="text-4xl text-white">🔧</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Building Models with R</h1>
              <p className="text-xl text-gray-600 mt-2">
                Explore different approaches to model selection and building in R
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* All Possible Models Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3">
                <span role="img" aria-label="all models" className="text-3xl text-white">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-[#58595b]">All Possible Models</h2>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-xl font-bold text-red-800">Warning: Computational Limitations</h3>
              </div>
              <div className="space-y-3">
                <p className="text-red-700">
                  This approach can quickly become <span className="font-bold">computationally impossible</span> as the number of predictors increases!
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Why It Can Fail:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span className="text-gray-700">With p predictors, need to test 2ᵖ models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span className="text-gray-700">10 predictors = 1,024 models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span className="text-gray-700">20 predictors = 1,048,576 models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span className="text-gray-700">30 predictors = 1,073,741,824 models</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-yellow-800">
                    <span className="font-bold">Recommendation:</span> Only use this method when you have fewer than 15 predictors. For larger datasets, consider stepwise methods instead.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-3">How it Works:</h3>
                  <p className="text-gray-700 mb-4">
                    The most thorough approach - tries every possible combination of predictors:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> Tests individual predictors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> Tests pairs of predictors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> Tests triplets of predictors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> And so on...
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-blue-800 mb-3">Visual Example:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 px-2 py-1 rounded">x₁</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">x₂</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">x₃</span>
                      <span className="text-gray-400">→</span>
                      <span className="bg-green-100 px-2 py-1 rounded">Model 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 px-2 py-1 rounded">x₁</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">x₂</span>
                      <span className="text-gray-400">→</span>
                      <span className="bg-green-100 px-2 py-1 rounded">Model 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 px-2 py-1 rounded">x₂</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">x₃</span>
                      <span className="text-gray-400">→</span>
                      <span className="bg-green-100 px-2 py-1 rounded">Model 3</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">R Code Example:</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                  <code>
                    {`library(leaps)
M <- regsubsets(y ~ x1 + x2 + x3, data=mydata)
summary(M)`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Stepwise Selection Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3">
                <span role="img" aria-label="stepwise" className="text-3xl text-white">🚶</span>
              </div>
              <h2 className="text-2xl font-bold text-[#58595b]">Stepwise Selection</h2>
            </div>
            
            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                        : `${tab.lightColor} text-gray-700 hover:bg-gray-100`
                    }`}
                  >
                    <span className="text-xl">{tab.emoji}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
              {activeTab === 'forward' && (
                <div>
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">➕</span> Forward Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Process:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">Step 1</span>
                          <span>Start with no predictors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">Step 2</span>
                          <span>Add most significant predictor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">Step 3</span>
                          <span>Repeat until no improvement</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Visual Example:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Empty</span>
                          <span className="text-blue-500">→</span>
                          <span className="bg-blue-100 px-2 py-1 rounded">x₁</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 px-2 py-1 rounded">x₁</span>
                          <span className="text-blue-500">→</span>
                          <span className="bg-blue-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-blue-100 px-2 py-1 rounded">x₂</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                      <code>
                        {`# Start with null model
null <- lm(y ~ 1, data=mydata)
# Add predictors one at a time
step(null, scope=list(lower=null, 
     upper=lm(y ~ ., data=mydata)), 
     direction="forward")`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'backward' && (
                <div>
                  <h3 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">➖</span> Backward Elimination
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Process:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 px-3 py-1 rounded-full text-sm">Step 1</span>
                          <span>Start with all predictors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 px-3 py-1 rounded-full text-sm">Step 2</span>
                          <span>Remove least significant</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 px-3 py-1 rounded-full text-sm">Step 3</span>
                          <span>Repeat until all significant</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Visual Example:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₂</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₃</span>
                          <span className="text-purple-500">→</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₂</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₂</span>
                          <span className="text-purple-500">→</span>
                          <span className="bg-purple-100 px-2 py-1 rounded">x₁</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                      <code>
                        {`# Start with full model
full <- lm(y ~ ., data=mydata)
# Remove predictors one at a time
step(full, direction="backward")`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'both' && (
                <div>
                  <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">↔️</span> Bidirectional Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Process:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 px-3 py-1 rounded-full text-sm">Step 1</span>
                          <span>Start with some predictors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 px-3 py-1 rounded-full text-sm">Step 2</span>
                          <span>Try adding OR removing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 px-3 py-1 rounded-full text-sm">Step 3</span>
                          <span>Choose best change</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Visual Example:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 px-2 py-1 rounded">x₁</span>
                          <span className="text-green-500">↔️</span>
                          <span className="bg-green-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-green-100 px-2 py-1 rounded">x₂</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 px-2 py-1 rounded">x₁</span>
                          <span className="bg-green-100 px-2 py-1 rounded">x₂</span>
                          <span className="text-green-500">↔️</span>
                          <span className="bg-green-100 px-2 py-1 rounded">x₂</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                      <code>
                        {`# Start with current model
current <- lm(y ~ x1 + x2, data=mydata)
# Consider both adding and removing
step(current, scope=list(lower=null, 
     upper=lm(y ~ ., data=mydata)), 
     direction="both")`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center">
          <Link 
            href="/chapters/8/model-hierarchy"
            className="text-[#ff8200] hover:text-[#ff9933] transition-colors"
          >
            ← Previous
          </Link>
          <Link 
            href="/chapters/8"
            className="text-[#ff8200] hover:text-[#ff9933] transition-colors"
          >
            Next →
          </Link>
        </div>
      </div>
    </main>
  );
} 