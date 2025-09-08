"use client";
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function CheckingRegression() {
  const [selectedMethod, setSelectedMethod] = useState('method1');

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterNavigation showBottomNavigation={false} />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="checking regression" className="text-4xl">🔍</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Checking Logistic Regression</h1>
              <p className="text-xl text-gray-600 mt-2">Validate your model assumptions and fit</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">💻 R Output Example</h2>
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
              <div className="mb-4">
                <span className="text-yellow-400">M &lt;-</span> glm(Outcome~Dose,family=binomial,data=POISON)<br/>
                <span className="text-yellow-400">set.seed(320);</span><br/>
                <span className="text-yellow-400">check_regression(M)</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-gray-300">## Method 1: p-value ≈ 0.658</div>
                <div className="text-gray-300">## Method 2: p-value ≈ 0.604</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📊 Interpreting P-Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Good Model Fit</h3>
                <div className="bg-white p-4 rounded border mb-4">
                  <div className="text-2xl font-bold text-green-700 mb-2">p-value &gt; 0.05</div>
                  <p className="text-green-700 text-sm">
                    Your model fits the data well!
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <p className="text-green-800 text-sm font-medium mb-1">
                    Our Example: 0.658 and 0.604
                  </p>
                  <p className="text-green-700 text-xs">
                    Both well above 0.05 → Excellent model fit!
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Poor Model Fit</h3>
                <div className="bg-white p-4 rounded border mb-4">
                  <div className="text-2xl font-bold text-red-700 mb-2">p-value &lt; 0.05</div>
                  <p className="text-red-700 text-sm">
                    Your model doesn't fit the data well.
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-red-800 text-sm font-medium mb-1">
                    Consider: Variable transformations
                  </p>
                  <p className="text-red-700 text-xs">
                    Or try a different modeling approach
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">⚖️ Understanding Both Methods</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setSelectedMethod('method1')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      selectedMethod === 'method1'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Method 1: Simulation
                  </button>
                  <button
                    onClick={() => setSelectedMethod('method2')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      selectedMethod === 'method2'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Method 2: Hosmer-Lemeshow
                  </button>
                </div>
              </div>

              {selectedMethod === 'method1' && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">📊 Method 1: Simulation-Based Test</h3>
                  <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Key Points</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• <strong>Not very sensitive</strong> to departures from the logistic curve</li>
                      <li>• If this test <strong>fails</strong>, your model is probably quite bad</li>
                      <li>• High p-value (0.658) = Good model fit</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedMethod === 'method2' && (
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">🎯 Method 2: Hosmer-Lemeshow Test</h3>
                  <div className="bg-red-50 p-4 rounded border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Key Points</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• <strong>Overly sensitive</strong> for large sample sizes</li>
                      <li>• Failure is <strong>not necessarily a deal-breaker</strong></li>
                      <li>• High p-value (0.604) = Good model fit</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
}
