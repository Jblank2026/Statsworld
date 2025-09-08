"use client";
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function Transformations() {
  const [selectedTransformation, setSelectedTransformation] = useState('none');

  // Example data (mimicking abalone data pattern)
  const originalData = [
    { x: 0.2, y: 0.001 },
    { x: 0.25, y: 0.002 },
    { x: 0.3, y: 0.004 },
    { x: 0.35, y: 0.007 },
    { x: 0.4, y: 0.012 },
    { x: 0.45, y: 0.018 },
    { x: 0.5, y: 0.025 },
    { x: 0.55, y: 0.035 },
    { x: 0.6, y: 0.048 },
    { x: 0.65, y: 0.065 }
  ];

  // Transformation functions
  const transformData = (data: typeof originalData, xPower: number, yPower: number) => {
    return data.map(point => ({
      x: Math.pow(point.x, xPower),
      y: Math.pow(point.y, yPower)
    }));
  };

  const transformations = {
    none: { xPower: 1, yPower: 1, rsquared: 0.758, label: "No Transformation" },
    best: { xPower: -2.25, yPower: -0.75, rsquared: 0.951, label: "Best Transformation (x^-2.25, y^-0.75)" },
    moderate: { xPower: -1, yPower: -0.5, rsquared: 0.883, label: "Moderate Transformation (x^-1, y^-0.5)" }
  };

  const currentTransform = transformations[selectedTransformation as keyof typeof transformations];
  const transformedData = transformData(originalData, currentTransform.xPower, currentTransform.yPower);

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
              <span role="img" aria-label="transformations" className="text-4xl">🔄</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Transformations</h1>
              <p className="text-xl text-gray-600 mt-2">Fixing non-linear relationships and dramatically improving model fit</p>
            </div>
          </div>

          {/* Why Transform? */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Why Transform Data?</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Sometimes your data has a curved relationship that linear regression can't capture well. 
                <strong> Transformations</strong> can straighten out these curves and dramatically improve your model!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🔍 Abalone Example</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li><strong>Original data:</strong> R² = 0.758</li>
                    <li><strong>After transformation:</strong> R² = 0.951</li>
                    <li><strong>Improvement:</strong> From 75.8% to 95.1% variance explained!</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📈 What We Transform</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li><strong>X variable:</strong> Length^(-2.25)</li>
                    <li><strong>Y variable:</strong> Shell Weight^(-0.75)</li>
                    <li><strong>Result:</strong> Much better linear relationship</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Visualization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 See the Transformation Effect</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Compare Original vs Transformed Data
              </h3>
              
              {/* Controls */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap">
                  <button
                    onClick={() => setSelectedTransformation('none')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTransformation === 'none'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Original Data
                  </button>
                  <button
                    onClick={() => setSelectedTransformation('moderate')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTransformation === 'moderate'
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Moderate Transform
                  </button>
                  <button
                    onClick={() => setSelectedTransformation('best')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTransformation === 'best'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Best Transform
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="flex justify-center mb-6">
                <svg width="500" height="350" className="border border-gray-300 rounded bg-white">
                  {/* Grid */}
                  <defs>
                    <pattern id="transformGrid" width="50" height="35" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 35" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#transformGrid)" />
                  
                  {/* Axes */}
                  <line x1="60" y1="300" x2="440" y2="300" stroke="#333" strokeWidth="2" />
                  <line x1="60" y1="50" x2="60" y2="300" stroke="#333" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="250" y="330" textAnchor="middle" className="text-sm fill-gray-600">
                    {selectedTransformation === 'none' ? 'Length' : `Length^${currentTransform.xPower}`}
                  </text>
                  <text x="30" y="175" textAnchor="middle" className="text-sm fill-gray-600" transform="rotate(-90 30 175)">
                    {selectedTransformation === 'none' ? 'Shell Weight' : `Shell Weight^${currentTransform.yPower}`}
                  </text>
                  
                  {/* Scale marks (simplified) */}
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <g key={i}>
                      <line x1={60 + i * 76} y1="295" x2={60 + i * 76} y2="305" stroke="#333" strokeWidth="1" />
                      <line x1="55" y1={300 - i * 50} x2="65" y2={300 - i * 50} stroke="#333" strokeWidth="1" />
                    </g>
                  ))}
                  
                  {/* Data points */}
                  {transformedData.map((point, index) => {
                    // Normalize data for display
                    const maxX = Math.max(...transformedData.map(p => p.x));
                    const maxY = Math.max(...transformedData.map(p => p.y));
                    const minX = Math.min(...transformedData.map(p => p.x));
                    const minY = Math.min(...transformedData.map(p => p.y));
                    
                    const screenX = 60 + ((point.x - minX) / (maxX - minX)) * 380;
                    const screenY = 300 - ((point.y - minY) / (maxY - minY)) * 250;
                    
                    return (
                      <circle 
                        key={index}
                        cx={screenX} 
                        cy={screenY} 
                        r="5" 
                        fill="#2563eb"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                  
                  {/* Trend line (simplified linear approximation) */}
                  {selectedTransformation !== 'none' && (
                    <line 
                      x1="80" 
                      y1="280" 
                      x2="420" 
                      y2="70" 
                      stroke="#dc2626" 
                      strokeWidth="3"
                      opacity="0.8"
                    />
                  )}
                  
                  {selectedTransformation === 'none' && (
                    <path
                      d="M 80 280 Q 250 200 420 70"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="3"
                      opacity="0.8"
                    />
                  )}
                  
                  {/* R-squared display */}
                  <g transform="translate(320, 80)">
                    <rect x="0" y="0" width="100" height="60" fill="white" stroke="#ccc" strokeWidth="1" rx="4" />
                    <text x="50" y="20" textAnchor="middle" className="text-sm fill-gray-700 font-bold">
                      R² = {currentTransform.rsquared}
                    </text>
                    <text x="50" y="40" textAnchor="middle" className="text-xs fill-gray-600">
                      {selectedTransformation === 'none' ? 'Poor fit' : selectedTransformation === 'best' ? 'Excellent fit!' : 'Better fit'}
                    </text>
                  </g>
                </svg>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {currentTransform.label}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedTransformation === 'none' && 'Notice the curved relationship - linear regression struggles here!'}
                  {selectedTransformation === 'moderate' && 'Some improvement - the relationship is straighter now.'}
                  {selectedTransformation === 'best' && 'Much better! The transformation straightened the relationship significantly.'}
                </p>
              </div>
            </div>
          </section>

          {/* R Code Example */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">💻 How to Do It in R</h2>
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
              <div className="mb-4">
                <span className="text-gray-400"># Original model</span><br/>
                <span className="text-blue-400">model.original</span> &lt;- <span className="text-yellow-400">lm</span>(Shell.Weight ~ Length, data = EX3.ABALONE)<br/>
                <span className="text-yellow-400">summary</span>(model.original)$r.squared  <span className="text-gray-400"># R² = 0.758</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-400"># Transform the variables</span><br/>
                <span className="text-blue-400">x.trans</span> &lt;- EX3.ABALONE$Length<span className="text-pink-400">^(-2.25)</span><br/>
                <span className="text-blue-400">y.trans</span> &lt;- EX3.ABALONE$Shell.Weight<span className="text-pink-400">^(-0.75)</span>
              </div>
              
              <div>
                <span className="text-gray-400"># Fit transformed model</span><br/>
                <span className="text-blue-400">model.trans</span> &lt;- <span className="text-yellow-400">lm</span>(y.trans ~ x.trans)<br/>
                <span className="text-yellow-400">summary</span>(model.trans)$r.squared  <span className="text-gray-400"># R² = 0.951!</span>
              </div>
            </div>
          </section>

          {/* Transformation Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📊 Transformation Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">X Power</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Y Power</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">R-squared</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-4 py-2">1 (none)</td>
                    <td className="border border-gray-300 px-4 py-2">1 (none)</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">0.758</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600">Baseline</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold">-2.25</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">-0.75</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">0.951</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">🎉 Best!</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">-1.75</td>
                    <td className="border border-gray-300 px-4 py-2">-0.5</td>
                    <td className="border border-gray-300 px-4 py-2">0.951</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">Tied for best</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">-1.5</td>
                    <td className="border border-gray-300 px-4 py-2">-0.5</td>
                    <td className="border border-gray-300 px-4 py-2">0.951</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">Tied for best</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">-2.5</td>
                    <td className="border border-gray-300 px-4 py-2">-0.75</td>
                    <td className="border border-gray-300 px-4 py-2">0.949</td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-600">Very good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Untransformation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔄 Untransformation: Getting Back to Original Units</h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">🎯 The Challenge</h3>
              <p className="text-yellow-700">
                After transforming your data, your equation predicts <strong>transformed Y</strong> from <strong>transformed X</strong>. 
                To make real-world predictions, you need to "untransform" back to original units!
              </p>
            </div>

            {/* Common Transformations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">📝 General Rules</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border">
                    <strong>y^c:</strong> y^c = a + b·Tx → y = (a + b·Tx)^(1/c)
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <strong>y^(-c):</strong> 1/y^c = a + b·Tx → y = 1/(a + b·Tx)^(1/c)
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <strong>log y:</strong> log y = a + b·Tx → y = 10^(a + b·Tx)
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3">⚡ Special Case: log-log</h4>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>log y and log x:</strong>
                  </p>
                  <p className="font-mono text-xs">
                    log y = a + b·log x<br/>
                    ↓<br/>
                    y = 10^a · x^b
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    This creates a power relationship!
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Examples */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">🔍 Untransformation Examples</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-gray-700 mb-2">y^(-2) and x^(1/2)</h5>
                  <div className="text-sm font-mono">
                    1/y² = a + b·√x<br/>
                    ↓<br/>
                    y = 1/√(a + b·√x)
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-gray-700 mb-2">y^(-1/2) and x^(-1/2)</h5>
                  <div className="text-sm font-mono">
                    1/√y = a + b/√x<br/>
                    ↓<br/>
                    y = 1/(a + b/√x)²
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-gray-700 mb-2">√y and √x</h5>
                  <div className="text-sm font-mono">
                    √y = a + b·√x<br/>
                    ↓<br/>
                    y = (a + b·√x)²
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-gray-700 mb-2">log y and x²</h5>
                  <div className="text-sm font-mono">
                    log y = a + b·x²<br/>
                    ↓<br/>
                    y = 10^(a + b·x²)
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* Key Takeaways */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔑 Key Takeaways</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Dramatic Improvements Possible</h4>
                <p className="text-green-700 text-sm">
                  Transformations can improve R² from 0.758 to 0.951 - that's explaining 95% instead of 76% of the variance!
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">⚡ Straighten the Curve</h4>
                <p className="text-blue-700 text-sm">
                  The goal is to transform curved relationships into straight lines that linear regression can handle well.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800 mb-2">🔄 Don't Forget Untransformation</h4>
                <p className="text-purple-700 text-sm">
                  Always untransform your predictions back to original units for real-world interpretation!
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-800 mb-2">🎯 Keep It Simple</h4>
                <p className="text-orange-700 text-sm">
                  Don't expand (a + bx)² - just plug values into the untransformed equation directly!
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