"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function MakingPredictions() {
  const [selectedConcept, setSelectedConcept] = useState('both');
  const [showExtrapolation, setShowExtrapolation] = useState(false);

  // Example data points
  const dataPoints = [
    { x: 2, y: 3 },
    { x: 3, y: 4.5 },
    { x: 4, y: 4 },
    { x: 5, y: 6 },
    { x: 6, y: 5.5 },
    { x: 7, y: 7 },
    { x: 8, y: 6.5 },
    { x: 9, y: 8 },
    { x: 10, y: 9 }
  ];

  // Regression parameters (calculated from data)
  const slope = 0.7;
  const intercept = 1.5;
  const getRegressionY = (x: number) => slope * x + intercept;

  // Mean of X values (center of data)
  const meanX = dataPoints.reduce((sum, point) => sum + point.x, 0) / dataPoints.length;

  // Calculate confidence and prediction intervals (simplified)
  const getConfidenceInterval = (x: number) => {
    const predicted = getRegressionY(x);
    const distanceFromMean = Math.abs(x - meanX);
    const baseWidth = 0.8;
    const width = baseWidth * (1 + distanceFromMean * 0.1);
    return {
      upper: predicted + width,
      lower: predicted - width
    };
  };

  const getPredictionInterval = (x: number) => {
    const predicted = getRegressionY(x);
    const distanceFromMean = Math.abs(x - meanX);
    const baseWidth = 1.8;
    const width = baseWidth * (1 + distanceFromMean * 0.15);
    return {
      upper: predicted + width,
      lower: predicted - width
    };
  };

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
              <span role="img" aria-label="making predictions" className="text-4xl">🔮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Making Predictions</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding confidence intervals, prediction intervals, and the limits of your model</p>
            </div>
          </div>

          {/* Key Concepts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Two Types of Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 Confidence Interval</h3>
                <p className="text-blue-700 mb-3">
                  <strong>For the average Y among ALL individuals</strong> with the same X value
                </p>
                <div className="bg-blue-100 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">
                    "We are 95% confident that μ<sub>y|x</sub> is inside the interval"
                  </p>
                </div>
                <p className="text-blue-600 text-sm mt-2">
                  Uses "confident" because the interval is random (changes with different data), 
                  but μ<sub>y|x</sub> is fixed.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">🎯 Prediction Interval</h3>
                <p className="text-purple-700 mb-3">
                  <strong>For a PARTICULAR individual's</strong> Y value
                </p>
                <div className="bg-purple-100 p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-800 font-medium">
                    "There is a 95% chance that the individual's y-value will be in the interval"
                  </p>
                </div>
                <p className="text-purple-600 text-sm mt-2">
                  Uses "chance" because the individual's Y is random. 
                  Always wider than confidence intervals!
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Visualization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 Interactive Visualization</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Visualizing Predictions with Confidence and Prediction Intervals
              </h3>
              
              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setSelectedConcept('confidence')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedConcept === 'confidence'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Confidence Only
                  </button>
                  <button
                    onClick={() => setSelectedConcept('prediction')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedConcept === 'prediction'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Prediction Only
                  </button>
                  <button
                    onClick={() => setSelectedConcept('both')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedConcept === 'both'
                        ? 'bg-[#ff8200] text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Both Intervals
                  </button>
                </div>
                
                <button
                  onClick={() => setShowExtrapolation(!showExtrapolation)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showExtrapolation
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showExtrapolation ? 'Hide' : 'Show'} Extrapolation
                </button>
              </div>

              {/* Chart */}
              <div className="flex justify-center mb-6">
                <svg width="600" height="400" className="border border-gray-300 rounded bg-white">
                  {/* Grid */}
                  <defs>
                    <pattern id="predGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#predGrid)" />
                  
                  {/* Axes */}
                  <line x1="60" y1="340" x2="540" y2="340" stroke="#333" strokeWidth="2" />
                  <line x1="60" y1="60" x2="60" y2="340" stroke="#333" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="300" y="375" textAnchor="middle" className="text-sm fill-gray-600">X Variable</text>
                  <text x="30" y="200" textAnchor="middle" className="text-sm fill-gray-600" transform="rotate(-90 30 200)">Y Variable</text>
                  
                  {/* Scale marks */}
                  {[0, 2, 4, 6, 8, 10, 12].map(x => (
                    <g key={x}>
                      <line x1={60 + x * 40} y1="335" x2={60 + x * 40} y2="345" stroke="#333" strokeWidth="1" />
                      <text x={60 + x * 40} y="360" textAnchor="middle" className="text-xs fill-gray-600">{x}</text>
                    </g>
                  ))}
                  
                  {[0, 2, 4, 6, 8, 10, 12].map(y => (
                    <g key={y}>
                      <line x1="55" y1={340 - y * 25} x2="65" y2={340 - y * 25} stroke="#333" strokeWidth="1" />
                      <text x="50" y={345 - y * 25} textAnchor="middle" className="text-xs fill-gray-600">{y}</text>
                    </g>
                  ))}

                  {/* Data range highlight */}
                  <rect 
                    x="140" 
                    y="60" 
                    width="280" 
                    height="280" 
                    fill="rgba(34, 197, 94, 0.05)" 
                    stroke="rgba(34, 197, 94, 0.3)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                  />
                  <text x="280" y="80" textAnchor="middle" className="text-xs fill-green-600 font-medium">
                    Safe Prediction Zone
                  </text>

                  {/* Extrapolation zones */}
                  {showExtrapolation && (
                    <>
                      <rect x="60" y="60" width="80" height="280" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
                      <rect x="420" y="60" width="120" height="280" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
                      <text x="100" y="80" textAnchor="middle" className="text-xs fill-red-600 font-medium">Danger Zone</text>
                      <text x="480" y="80" textAnchor="middle" className="text-xs fill-red-600 font-medium">Danger Zone</text>
                    </>
                  )}
                  
                  {/* Prediction intervals */}
                  {(selectedConcept === 'prediction' || selectedConcept === 'both') && (
                    <g>
                      {/* Prediction interval bands */}
                      {Array.from({ length: 121 }, (_, i) => {
                        const x = i * 0.1;
                        const screenX = 60 + x * 40;
                        const predInterval = getPredictionInterval(x);
                        const upperY = 340 - predInterval.upper * 25;
                        const lowerY = 340 - predInterval.lower * 25;
                        
                        return (
                          <g key={i}>
                            <line 
                              x1={screenX} 
                              y1={upperY} 
                              x2={screenX} 
                              y2={lowerY} 
                              stroke="rgba(147, 51, 234, 0.3)" 
                              strokeWidth="1"
                            />
                          </g>
                        );
                      })}
                      
                      {/* Prediction interval boundaries */}
                      <path
                        d={`M ${60} ${340 - getPredictionInterval(0).upper * 25} ${Array.from({ length: 121 }, (_, i) => {
                          const x = i * 0.1;
                          const screenX = 60 + x * 40;
                          const upperY = 340 - getPredictionInterval(x).upper * 25;
                          return `L ${screenX} ${upperY}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="#9333ea"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                      />
                      
                      <path
                        d={`M ${60} ${340 - getPredictionInterval(0).lower * 25} ${Array.from({ length: 121 }, (_, i) => {
                          const x = i * 0.1;
                          const screenX = 60 + x * 40;
                          const lowerY = 340 - getPredictionInterval(x).lower * 25;
                          return `L ${screenX} ${lowerY}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="#9333ea"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                      />
                    </g>
                  )}
                  
                  {/* Confidence intervals */}
                  {(selectedConcept === 'confidence' || selectedConcept === 'both') && (
                    <g>
                      {/* Confidence interval bands */}
                      {Array.from({ length: 121 }, (_, i) => {
                        const x = i * 0.1;
                        const screenX = 60 + x * 40;
                        const confInterval = getConfidenceInterval(x);
                        const upperY = 340 - confInterval.upper * 25;
                        const lowerY = 340 - confInterval.lower * 25;
                        
                        return (
                          <g key={i}>
                            <line 
                              x1={screenX} 
                              y1={upperY} 
                              x2={screenX} 
                              y2={lowerY} 
                              stroke="rgba(59, 130, 246, 0.4)" 
                              strokeWidth="1"
                            />
                          </g>
                        );
                      })}
                      
                      {/* Confidence interval boundaries */}
                      <path
                        d={`M ${60} ${340 - getConfidenceInterval(0).upper * 25} ${Array.from({ length: 121 }, (_, i) => {
                          const x = i * 0.1;
                          const screenX = 60 + x * 40;
                          const upperY = 340 - getConfidenceInterval(x).upper * 25;
                          return `L ${screenX} ${upperY}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="5,3"
                      />
                      
                      <path
                        d={`M ${60} ${340 - getConfidenceInterval(0).lower * 25} ${Array.from({ length: 121 }, (_, i) => {
                          const x = i * 0.1;
                          const screenX = 60 + x * 40;
                          const lowerY = 340 - getConfidenceInterval(x).lower * 25;
                          return `L ${screenX} ${lowerY}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="5,3"
                      />
                    </g>
                  )}
                  
                  {/* Regression line */}
                  <line 
                    x1="60" 
                    y1={340 - getRegressionY(0) * 25} 
                    x2="540" 
                    y2={340 - getRegressionY(12) * 25} 
                    stroke="#dc2626" 
                    strokeWidth="3"
                  />
                  
                  {/* Data points */}
                  {dataPoints.map((point, index) => (
                    <circle 
                      key={index}
                      cx={60 + point.x * 40} 
                      cy={340 - point.y * 25} 
                      r="5" 
                      fill="#1f2937"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                  
                  {/* Legend */}
                  <g transform="translate(450, 100)">
                    <rect x="0" y="0" width="140" height="120" fill="white" stroke="#ccc" strokeWidth="1" rx="4" />
                    
                    <circle cx="15" cy="20" r="4" fill="#1f2937" stroke="white" strokeWidth="1" />
                    <text x="25" y="25" className="text-xs fill-gray-700">Data Points</text>
                    
                    <line x1="10" y1="40" x2="20" y2="40" stroke="#dc2626" strokeWidth="2" />
                    <text x="25" y="45" className="text-xs fill-gray-700">Regression Line</text>
                    
                    {(selectedConcept === 'confidence' || selectedConcept === 'both') && (
                      <>
                        <line x1="10" y1="60" x2="20" y2="60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,2" />
                        <text x="25" y="65" className="text-xs fill-gray-700">Confidence</text>
                      </>
                    )}
                    
                    {(selectedConcept === 'prediction' || selectedConcept === 'both') && (
                      <>
                        <line x1="10" y1="80" x2="20" y2="80" stroke="#9333ea" strokeWidth="2" strokeDasharray="4,2" />
                        <text x="25" y="85" className="text-xs fill-gray-700">Prediction</text>
                      </>
                    )}
                    
                    {showExtrapolation && (
                      <>
                        <rect x="10" y="95" width="10" height="5" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
                        <text x="25" y="105" className="text-xs fill-gray-700">Danger Zone</text>
                      </>
                    )}
                  </g>
                </svg>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {selectedConcept === 'confidence' && 'Blue dashed lines show confidence intervals for the average Y'}
                  {selectedConcept === 'prediction' && 'Purple dashed lines show prediction intervals for individual Y values'}
                  {selectedConcept === 'both' && 'Notice how prediction intervals (purple) are always wider than confidence intervals (blue)'}
                </p>
                <p className="text-xs text-gray-500">
                  Intervals get wider as you move away from the center of the data. {showExtrapolation && 'Red zones show dangerous extrapolation areas!'}
                </p>
              </div>
            </div>
          </section>

          {/* Extrapolation Warning */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">⚠️ The Dangers of Extrapolation</h2>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">🚫 When NOT to Trust Your Predictions</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">Outside the Data Range</h4>
                  <p className="text-red-600 text-sm">
                    Predictions for μ<sub>y|x</sub> or for y<sub>p</sub> may not be trustworthy when made at a value of X 
                    outside the range of X's used to build the model. There's no guarantee the relationship remains linear!
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">Same Individual, Different X</h4>
                  <p className="text-red-600 text-sm">
                    Predictions for y<sub>p</sub> are never trustworthy when predicting what happens to the same individual 
                    if their X value changes. The regression equation is not a physical law!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ Safe Predictions</h4>
                <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                  <li>Within the range of your original X data</li>
                  <li>For new individuals (not tracking changes in the same person)</li>
                  <li>When the relationship appears stable and linear</li>
                  <li>With appropriate confidence/prediction intervals</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">❌ Dangerous Predictions</h4>
                <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                  <li>Far outside your original X range</li>
                  <li>Predicting changes within the same individual</li>
                  <li>When the relationship might not be linear beyond your data</li>
                  <li>Without considering uncertainty intervals</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔑 Key Takeaways</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">Confidence vs Prediction Intervals</h4>
                <p className="text-blue-700 text-sm">
                  Confidence intervals are for averages (narrower), prediction intervals are for individuals (wider). 
                  Use different language: "confident" vs "chance".
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800 mb-2">Width Patterns</h4>
                <p className="text-purple-700 text-sm">
                  Both intervals get wider as you move away from the center of your data. 
                  This reflects increasing uncertainty at the edges.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800 mb-2">Extrapolation Dangers</h4>
                <p className="text-red-700 text-sm">
                  Never trust predictions outside your data range or for tracking changes in the same individual. 
                  Your model only knows what it has seen!
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">Practical Use</h4>
                <p className="text-green-700 text-sm">
                  Always report intervals with your predictions. They tell you how much you should trust your estimate 
                  and help you make better decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Mathematical Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📚 Technical Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Confidence Interval</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-mono text-sm mb-2">ŷ ± t * SE(ŷ)</p>
                    <p className="text-sm text-gray-600">
                      For the mean response at a given X value. Standard error depends on distance from X̄.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Prediction Interval</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-mono text-sm mb-2">ŷ ± t * SE(ŷ + e)</p>
                    <p className="text-sm text-gray-600">
                      For an individual response. Includes both model uncertainty AND individual variation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-100 p-4 rounded border border-yellow-300">
                <h4 className="font-semibold text-yellow-800 mb-2">Why Prediction Intervals are Wider</h4>
                <p className="text-yellow-700 text-sm">
                  Prediction intervals must account for two sources of uncertainty: 
                  <br />1) Uncertainty in the model (same as confidence interval)
                  <br />2) Natural variation of individuals around the average (additional uncertainty)
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