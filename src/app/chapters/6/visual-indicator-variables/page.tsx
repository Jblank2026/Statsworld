"use client";
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function VisualIndicatorVariables() {
  const [selectedView, setSelectedView] = useState('combined');

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="visual indicator variables" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Visual Guide to Indicator Variables</h1>
              <p className="text-xl text-gray-600 mt-2">See how indicator variables create different regression lines for different groups</p>
            </div>
          </div>

          {/* Concept Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">💡 The Big Idea</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <p className="text-blue-700 text-lg leading-relaxed mb-4">
                <strong>Indicator variables</strong> allow regression to fit <strong>different lines</strong> for different groups. 
                Instead of forcing all data through one line, we can have separate intercepts (and slopes) for each category!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">❌ Without Indicator Variables</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>One regression line for ALL data</li>
                    <li>Ignores group differences</li>
                    <li>Poor fit if groups behave differently</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">✅ With Indicator Variables</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>Separate line for each group</li>
                    <li>Captures group-specific patterns</li>
                    <li>Much better model fit!</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Visualization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 Interactive Example: Academic Performance by Class Year</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Study Hours vs. Test Score by Class Year
              </h3>
              
              {/* Controls */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap">
                  <button
                    onClick={() => setSelectedView('combined')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedView === 'combined'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Combined (No Indicators)
                  </button>
                  <button
                    onClick={() => setSelectedView('separated')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedView === 'separated'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    With Class Indicators
                  </button>
                  <button
                    onClick={() => setSelectedView('routput')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedView === 'routput'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    R Output
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="flex justify-center mb-6">
                <svg width="600" height="450" className="border border-gray-300 rounded bg-white">
                  {/* Grid */}
                  <defs>
                    <pattern id="indicatorGrid" width="50" height="45" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 45" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#indicatorGrid)" />
                  
                  {/* Axes */}
                  <line x1="80" y1="380" x2="550" y2="380" stroke="#333" strokeWidth="2" />
                  <line x1="80" y1="70" x2="80" y2="380" stroke="#333" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="315" y="420" textAnchor="middle" className="text-sm fill-gray-600 font-medium">
                    Study Hours per Week
                  </text>
                  <text x="40" y="225" textAnchor="middle" className="text-sm fill-gray-600 font-medium" transform="rotate(-90 40 225)">
                    Test Score (%)
                  </text>
                  
                  {/* Scale marks */}
                  {[0, 5, 10, 15, 20, 25].map(i => (
                    <g key={`x-${i}`}>
                      <line x1={80 + i * 19.2} y1="375" x2={80 + i * 19.2} y2="385" stroke="#333" strokeWidth="1" />
                      <text x={80 + i * 19.2} y="400" textAnchor="middle" className="text-xs fill-gray-500">
                        {i}
                      </text>
                    </g>
                  ))}
                  
                  {[40, 50, 60, 70, 80, 90, 100].map(i => (
                    <g key={`y-${i}`}>
                      <line x1="75" y1={380 - (i - 40) * 5.17} x2="85" y2={380 - (i - 40) * 5.17} stroke="#333" strokeWidth="1" />
                      <text x="65" y={385 - (i - 40) * 5.17} textAnchor="middle" className="text-xs fill-gray-500">
                        {i}
                      </text>
                    </g>
                  ))}
                  
                  {/* Data points - Freshmen (blue circles) */}
                  <circle cx="120" cy="320" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="160" cy="310" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="300" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="240" cy="290" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="280" cy="280" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="320" cy="270" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="360" cy="260" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="400" cy="250" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="440" cy="240" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  
                  {/* Data points - Sophomores (red squares) */}
                  <rect x="116" y="286" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="156" y="276" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="196" y="266" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="236" y="256" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="276" y="246" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="316" y="236" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="356" y="226" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="396" y="216" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <rect x="436" y="206" width="8" height="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                  
                  {/* Data points - Juniors (green triangles) */}
                  <polygon points="120,250 124,242 116,242" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="160,240 164,232 156,232" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="200,230 204,222 196,222" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="240,220 244,212 236,212" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="280,210 284,202 276,202" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="320,200 324,192 316,192" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="360,190 364,182 356,182" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="400,180 404,172 396,172" fill="#22c55e" stroke="white" strokeWidth="2" />
                  <polygon points="440,170 444,162 436,162" fill="#22c55e" stroke="white" strokeWidth="2" />
                  
                  {/* Data points - Seniors (purple diamonds) */}
                  <polygon points="120,210 124,214 120,218 116,214" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="160,200 164,204 160,208 156,204" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="200,190 204,194 200,198 196,194" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="240,180 244,184 240,188 236,184" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="280,170 284,174 280,178 276,174" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="320,160 324,164 320,168 316,164" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="360,150 364,154 360,158 356,154" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="400,140 404,144 400,148 396,144" fill="#a855f7" stroke="white" strokeWidth="2" />
                  <polygon points="440,130 444,134 440,138 436,134" fill="#a855f7" stroke="white" strokeWidth="2" />
                  
                  {/* Regression lines based on selected view */}
                  {selectedView === 'combined' && (
                    <>
                      {/* Single regression line through all data (poor fit) */}
                      <line x1="80" y1="320" x2="550" y2="120" stroke="#666" strokeWidth="3" opacity="0.8" />
                      <text x="300" y="50" textAnchor="middle" className="text-sm fill-gray-600 font-bold">
                        Single Line (Ignores Class Year)
                      </text>
                    </>
                  )}
                  
                  {(selectedView === 'separated' || selectedView === 'routput') && (
                    <>
                      {/* Separate parallel regression lines for each class year */}
                      <line x1="100" y1="330" x2="460" y2="240" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
                      <line x1="100" y1="296" x2="460" y2="206" stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                      <line x1="100" y1="262" x2="460" y2="172" stroke="#22c55e" strokeWidth="3" opacity="0.8" />
                      <line x1="100" y1="228" x2="460" y2="138" stroke="#a855f7" strokeWidth="3" opacity="0.8" />
                      <text x="470" y="245" className="text-xs fill-blue-600 font-bold">Freshman</text>
                      <text x="470" y="211" className="text-xs fill-red-600 font-bold">Sophomore</text>
                      <text x="470" y="177" className="text-xs fill-green-600 font-bold">Junior</text>
                      <text x="470" y="143" className="text-xs fill-purple-600 font-bold">Senior</text>
                    </>
                  )}
                  
                  {/* Legend */}
                  <g transform="translate(380, 300)">
                    <rect x="0" y="0" width="160" height="100" fill="white" stroke="#ccc" strokeWidth="1" rx="4" />
                    <text x="80" y="15" textAnchor="middle" className="text-xs fill-gray-700 font-bold">Class Year</text>
                    <circle cx="15" cy="30" r="3" fill="#3b82f6" />
                    <text x="25" y="35" className="text-xs fill-gray-700">Freshman</text>
                    <rect x="12" y="42" width="6" height="6" fill="#ef4444" />
                    <text x="25" y="49" className="text-xs fill-gray-700">Sophomore</text>
                    <polygon points="15,60 18,54 12,54" fill="#22c55e" />
                    <text x="25" y="61" className="text-xs fill-gray-700">Junior</text>
                    <polygon points="15,75 18,78 15,81 12,78" fill="#a855f7" />
                    <text x="25" y="80" className="text-xs fill-gray-700">Senior</text>
                  </g>
                </svg>
              </div>

              {/* Explanation for current view */}
              <div className="text-center">
                {selectedView === 'combined' && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-800 mb-2">❌ Without Class Year Indicator Variables</h4>
                    <p className="text-red-700 text-sm">
                      The single gray line tries to fit all data points but misses the clear pattern that seniors score higher than juniors, who score higher than sophomores, who score higher than freshmen.
                    </p>
                  </div>
                )}
                
                {selectedView === 'separated' && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">✅ With Class Year Indicator Variables</h4>
                    <p className="text-green-700 text-sm">
                      Four parallel lines capture the reality: <strong>Freshman is the reference level</strong>, and each higher class year has a higher starting point (intercept) but all improve at the same rate with study hours.
                    </p>
                  </div>
                )}
                
                {selectedView === 'routput' && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3">📊 R Regression Output</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                      <div className="text-white mb-3">Call:</div>
                      <div className="mb-4">lm(formula = TestScore ~ StudyHours + Sophomore + Junior + Senior)</div>
                      
                      <div className="text-white mb-2">Coefficients:</div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div></div>
                        <div className="text-white">Estimate</div>
                        <div className="text-white">Std. Error</div>
                        <div className="text-white">t value</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs mb-1">
                        <div>(Intercept)</div>
                        <div>65.000</div>
                        <div>2.156</div>
                        <div>30.15</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs mb-1">
                        <div>StudyHours</div>
                        <div>1.500</div>
                        <div>0.234</div>
                        <div>6.41</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs mb-1">
                        <div>Sophomore</div>
                        <div>5.000</div>
                        <div>1.876</div>
                        <div>2.67</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs mb-1">
                        <div>Junior</div>
                        <div>10.000</div>
                        <div>1.876</div>
                        <div>5.33</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div>Senior</div>
                        <div>15.000</div>
                        <div>1.876</div>
                        <div>8.00</div>
                      </div>
                    </div>
                    <div className="mt-3 text-left text-sm space-y-3">
                      <div>
                        <p><strong>Freshmen (Sophomore = 0, Junior = 0, Senior = 0):</strong></p>
                        <p className="ml-4 font-mono text-xs">TestScore = 65 + 1.5StudyHours + 5(0) + 10(0) + 15(0) = 65 + 1.5StudyHours</p>
                      </div>
                      <div>
                        <p><strong>Sophomores (Sophomore = 1, Junior = 0, Senior = 0):</strong></p>
                        <p className="ml-4 font-mono text-xs">TestScore = 65 + 1.5StudyHours + 5(1) + 10(0) + 15(0) = 70 + 1.5StudyHours</p>
                      </div>
                      <div>
                        <p><strong>Juniors (Sophomore = 0, Junior = 1, Senior = 0):</strong></p>
                        <p className="ml-4 font-mono text-xs">TestScore = 65 + 1.5StudyHours + 5(0) + 10(1) + 15(0) = 75 + 1.5StudyHours</p>
                      </div>
                      <div>
                        <p><strong>Seniors (Sophomore = 0, Junior = 0, Senior = 1):</strong></p>
                        <p className="ml-4 font-mono text-xs">TestScore = 65 + 1.5StudyHours + 5(0) + 10(0) + 15(1) = 80 + 1.5StudyHours</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔧 How Indicator Variables Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">1️⃣ Create Binary Variables</h3>
                <p className="text-yellow-700 text-sm mb-3">
                  Convert categories into 0/1 variables (Freshman is reference):
                </p>
                <div className="bg-white p-3 rounded border text-xs font-mono">
                  Freshman → Soph=0, Jun=0, Sen=0<br/>
                  Sophomore → Soph=1, Jun=0, Sen=0<br/>
                  Junior → Soph=0, Jun=1, Sen=0<br/>
                  Senior → Soph=0, Jun=0, Sen=1
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">2️⃣ Different Intercepts</h3>
                <p className="text-green-700 text-sm mb-3">
                  Each class year gets its own starting point:
                </p>
                <div className="bg-white p-3 rounded border text-xs">
                  Freshman: 65<br/>
                  Sophomore: 65 + 5 = 70<br/>
                  Junior: 65 + 10 = 75<br/>
                  Senior: 65 + 15 = 80
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">3️⃣ Parallel Lines</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Same slope, different starting points:
                </p>
                <div className="bg-white p-3 rounded border text-xs">
                  All classes: +1.5 points per study hour<br/>
                  (Same learning rate, different starting levels)
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔑 Key Takeaways</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Better Model Fit</h4>
                <p className="text-green-700 text-sm">
                  Indicator variables let you capture group differences that would be missed by a single regression line.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">📏 Parallel Lines</h4>
                <p className="text-blue-700 text-sm">
                  Basic indicator variables create parallel lines - same slope, different intercepts for each group.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800 mb-2">🔢 Simple Interpretation</h4>
                <p className="text-purple-700 text-sm">
                  The coefficient tells you the average difference between groups, holding other variables constant.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 