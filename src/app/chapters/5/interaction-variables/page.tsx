"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ChapterNavigation from '@/app/components/ChapterNavigation';

export default function InteractionVariables() {
  const [selectedExample, setSelectedExample] = useState<'salary' | 'temperature' | 'sales'>('salary');

  const examples = {
    salary: {
      title: "Salary & Experience",
      description: "The effect of experience on salary depends on education level",
      equation1: "Salary = 2842 + 38Experience     (Education = 0)",
      equation2: "Salary = 3752 + 2Experience      (Education = 6)",
      explanation: "The relationship between Salary and Experience weakens (slope decreases) with higher Education levels. A year of experience adds $38 to salary when Education=0, but only $2 when Education=6."
    },
    temperature: {
      title: "Plant Growth & Temperature",
      description: "The effect of temperature on plant growth depends on water level",
      equation1: "Growth = 5 + 2Temperature     (Low Water)",
      equation2: "Growth = 3 + 4Temperature     (High Water)",
      explanation: "Temperature has a stronger positive effect on plant growth when water levels are high. Each degree increase adds 4 units of growth with high water, but only 2 units with low water."
    },
    sales: {
      title: "Sales & Advertising",
      description: "The effect of advertising spend depends on market size",
      equation1: "Sales = 100 + 5Advertising     (Small Market)",
      equation2: "Sales = 150 + 8Advertising     (Large Market)",
      explanation: "Advertising has a stronger effect in larger markets. Each dollar of advertising generates $8 in sales in large markets but only $5 in small markets."
    }
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Multiple Regression
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4">
              <span role="img" aria-label="interaction variables" className="text-4xl">🔄</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Interaction Variables</h1>
              <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-semibold mt-2">
                KNOW THAT IT DEPENDS
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Key Concept */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Understanding Interactions</h2>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                <p className="text-gray-800 text-lg leading-relaxed">
                  Interaction effects occur when the effect of one variable on the outcome <strong>depends</strong> on the value of another variable. This is the essence of interactions in regression.
                </p>
              </div>

              <div className="bg-white border-l-4 border-purple-500 p-4 rounded shadow-md mb-6">
                <p className="text-gray-700">
                  If the expected difference in y between two individuals who differ in x₁ by one unit (but who have identical values of x₂) changes in size based on the exact value of x₂, we say that x₁ and x₂ have an interaction.
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">The Interaction Model</h3>
                <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-inner">
                  y = β₀ + β₁x₁ + β₂x₂ + β₃(x₁×x₂) + ε
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Examples */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Interactive Examples</h2>
            </div>
            <div className="p-6">
              {/* Example Selector */}
              <div className="flex space-x-4 mb-6">
                {Object.entries(examples).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedExample(key as 'salary' | 'temperature' | 'sales')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                      selectedExample === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {value.title}
                  </button>
                ))}
              </div>

              {/* Example Content */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{examples[selectedExample].title}</h3>
                <p className="text-gray-700 mb-4">{examples[selectedExample].description}</p>
                
                <div className="space-y-3 font-mono bg-white p-4 rounded-lg shadow-inner mb-4">
                  <p className="text-blue-600">{examples[selectedExample].equation1}</p>
                  <p className="text-purple-600">{examples[selectedExample].equation2}</p>
                </div>

                <div className="bg-white border-l-4 border-[#ff8200] p-4 rounded shadow-md">
                  <p className="text-gray-700">
                    {examples[selectedExample].explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Visual Representation</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-md">
                  <Image 
                    src="/images/interaction.png" 
                    alt="Interaction Variables Visualization" 
                    width={500} 
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 