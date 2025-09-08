"use client";
import Link from 'next/link';
import Image from 'next/image';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function CategoricalCategorical() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="categorical-categorical" className="text-4xl">🟦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#58595b]">Categorical-Categorical</h1>
              <p className="text-lg text-gray-600 mt-2">
                Explore relationships between two categorical variables using mosaic plots and chi-squared tests.
              </p>
            </div>
          </div>
        </div>

        {/* Three Main Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Test Used */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🧪 Test Used</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Chi-squared Test</h4>
                <p className="text-sm text-blue-600">Tests for independence between categorical variables</p>
              </div>
            </div>
          </div>

          {/* What to Look For */}
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">👀 What to Look For</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-sm text-purple-700">1. Differences in conditional distributions</p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-sm text-purple-700">2. Expected vs observed frequencies</p>
              </div>
            </div>
          </div>

          {/* Visuals Used */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 mb-3">📊 Visuals Used</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Mosaic Plot</h4>
                <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                  <li>Primary visualization</li>
                  <li>Shows joint distributions</li>
                  <li>Area proportional to frequency</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Contingency Table</h4>
                <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                  <li>Shows raw counts</li>
                  <li>Displays marginal totals</li>
                  <li>Used to calculate conditional distributions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contingency Table Example */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Understanding Contingency Tables</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-3 bg-gray-50">Gender</th>
                  <th className="border border-gray-300 p-3 bg-gray-50">Left-handed</th>
                  <th className="border border-gray-300 p-3 bg-gray-50">Right-handed</th>
                  <th className="border border-gray-300 p-3 bg-purple-100">Row Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Male</td>
                  <td className="border border-gray-300 p-3 bg-green-50">15</td>
                  <td className="border border-gray-300 p-3 bg-green-50">85</td>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">100</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Female</td>
                  <td className="border border-gray-300 p-3 bg-green-50">10</td>
                  <td className="border border-gray-300 p-3 bg-green-50">90</td>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">100</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">Column Total</td>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">25</td>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">175</td>
                  <td className="border border-gray-300 p-3 bg-purple-100 font-medium">200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                <span className="inline-block w-3 h-3 bg-green-200 rounded-full mr-2"></span>
                Conditional Distributions (Within Each Gender):
              </h3>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Of males: 15% left-handed, 85% right-handed</li>
                <li>Of females: 10% left-handed, 90% right-handed</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">
                <span className="inline-block w-3 h-3 bg-purple-200 rounded-full mr-2"></span>
                Marginal Distributions (Overall Totals):
              </h3>
              <ul className="list-disc list-inside space-y-1 text-purple-700">
                <li>Overall handedness: 12.5% left-handed, 87.5% right-handed</li>
                <li>Gender split: 50% male, 50% female</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How to Read:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><span className="text-green-700 font-medium">Green cells</span>: Look across rows to find conditional distributions within each gender</li>
                <li><span className="text-purple-700 font-medium">Purple totals</span>: Row and column totals give you the marginal distributions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CC Visual Image */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Visual Examples</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/CC Visual.png" alt="Categorical-Categorical Visual Example" width={400} height={250} className="rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Key Components:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><span className="font-medium">Mosaic Plot:</span> Shows the relationship between Handedness and Gender</li>
                <li><span className="font-medium">Rectangle Areas:</span> Proportional to the frequency in each cell</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CC Output Image */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Statistical Output</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/CC Output.png" alt="CC Output" width={800} height={400} className="w-full rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Interpreting the Chi-squared Test:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Examine the chi-squared statistic and degrees of freedom</li>
                <li>Check the p-value for statistical significance</li>
                <li>Compare observed frequencies to expected frequencies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 