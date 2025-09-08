"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function SumOfSquaredError() {
  const [selectedExample, setSelectedExample] = useState('regression');

  // Example data points
  const dataPoints = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 6 },
    { x: 5, y: 5 }
  ];

  // Calculate regression line (simplified example)
  const regressionSlope = 0.8;
  const regressionIntercept = 1.8;
  const getRegressionY = (x: number) => regressionSlope * x + regressionIntercept;

  // Calculate naive model (mean)
  const naiveMean = dataPoints.reduce((sum, point) => sum + point.y, 0) / dataPoints.length;

  // Calculate SSE for regression
  const regressionSSE = dataPoints.reduce((sum, point) => {
    const predicted = getRegressionY(point.x);
    return sum + Math.pow(point.y - predicted, 2);
  }, 0);

  // Calculate SSE for naive model
  const naiveSSE = dataPoints.reduce((sum, point) => {
    return sum + Math.pow(point.y - naiveMean, 2);
  }, 0);

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
              <span role="img" aria-label="sum of squared error" className="text-4xl">📐</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Sum of Squared Error & Naive Model</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding how regression finds the best line and why it's better than simple predictions</p>
            </div>
          </div>

          {/* What is Sum of Squared Error? */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">What is Sum of Squared Error (SSE)?</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>Sum of Squared Error (SSE)</strong> measures how well a model predicts actual data. 
                It's the total of all squared differences between actual values and predicted values.
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-mono text-lg text-center text-blue-800">
                  SSE = Σ(Actual - Predicted)²
                </p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Sum of all squared differences between what we observe and what we predict
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">Why Square the Errors?</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Prevents positive and negative errors from canceling out</li>
                  <li>Gives extra penalty to large errors</li>
                  <li>Makes the math work nicely for finding the best line</li>
                  <li>Always produces a positive number</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-800 mb-2">Lower SSE = Better Model</h3>
                <ul className="list-disc list-inside space-y-1 text-orange-700">
                  <li>SSE = 0 means perfect predictions (rarely happens!)</li>
                  <li>Lower SSE means predictions are closer to reality</li>
                  <li>Regression finds the line with the lowest possible SSE</li>
                  <li>We can compare different models using SSE</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Naive Model */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">The Naive Model: Our Baseline</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">🤷‍♂️ What if we didn't have regression?</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The <strong>naive model</strong> is the simplest possible prediction: just use the average (mean) of all Y values. 
                No matter what X value you give it, it always predicts the same thing - the mean.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <p className="font-mono text-lg text-center text-yellow-800">
                  Naive Prediction = ȳ (mean of all Y values)
                </p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Always predict the average, regardless of X
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🎯 Why Compare to the Naive Model?</h4>
              <p className="text-gray-700">
                If our regression model can't beat the naive model (which just guesses the average every time), 
                then our X variable isn't actually helping us predict Y! It's like having a benchmark to see 
                if our "smart" model is actually smarter than just guessing the average.
              </p>
            </div>
          </section>

          {/* Interactive Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 Interactive Comparison</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Compare Regression vs. Naive Model:
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setSelectedExample('regression')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'regression'
                        ? 'bg-[#ff8200] text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Regression Model
                  </button>
                  <button
                    onClick={() => setSelectedExample('naive')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'naive'
                        ? 'bg-[#ff8200] text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Naive Model
                  </button>
                </div>
              </div>

              {/* Visual Chart */}
              <div className="mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {selectedExample === 'regression' ? '📈 Regression Line vs Data Points' : '📊 Naive Model (Mean Line) vs Data Points'}
                  </h4>
                  
                  <div className="flex justify-center">
                    <svg width="500" height="350" className="border border-gray-300 rounded bg-white">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Axes */}
                      <line x1="50" y1="300" x2="450" y2="300" stroke="#333" strokeWidth="2" />
                      <line x1="50" y1="50" x2="50" y2="300" stroke="#333" strokeWidth="2" />
                      
                      {/* Axis labels */}
                      <text x="250" y="330" textAnchor="middle" className="text-sm fill-gray-600">Hours Studied (X)</text>
                      <text x="25" y="175" textAnchor="middle" className="text-sm fill-gray-600" transform="rotate(-90 25 175)">Test Score (Y)</text>
                      
                      {/* Scale marks and labels */}
                      {[1, 2, 3, 4, 5].map(x => (
                        <g key={x}>
                          <line x1={50 + x * 80} y1="295" x2={50 + x * 80} y2="305" stroke="#333" strokeWidth="1" />
                          <text x={50 + x * 80} y="320" textAnchor="middle" className="text-xs fill-gray-600">{x}</text>
                        </g>
                      ))}
                      
                      {[1, 2, 3, 4, 5, 6].map(y => (
                        <g key={y}>
                          <line x1="45" y1={300 - y * 40} x2="55" y2={300 - y * 40} stroke="#333" strokeWidth="1" />
                          <text x="40" y={305 - y * 40} textAnchor="middle" className="text-xs fill-gray-600">{y}</text>
                        </g>
                      ))}
                      
                      {/* Model line */}
                      {selectedExample === 'regression' ? (
                        // Regression line
                        <line 
                          x1="130" 
                          y1={300 - getRegressionY(1) * 40} 
                          x2="450" 
                          y2={300 - getRegressionY(5) * 40} 
                          stroke="#2563eb" 
                          strokeWidth="3"
                        />
                      ) : (
                        // Naive model line (horizontal line at mean)
                        <line 
                          x1="50" 
                          y1={300 - naiveMean * 40} 
                          x2="450" 
                          y2={300 - naiveMean * 40} 
                          stroke="#6b7280" 
                          strokeWidth="3"
                          strokeDasharray="10,5"
                        />
                      )}
                      
                      {/* Data points and error lines */}
                      {dataPoints.map((point, index) => {
                        const x = 50 + point.x * 80;
                        const actualY = 300 - point.y * 40;
                        const predictedY = selectedExample === 'regression' 
                          ? 300 - getRegressionY(point.x) * 40
                          : 300 - naiveMean * 40;
                        
                        return (
                          <g key={index}>
                            {/* Error line */}
                            <line 
                              x1={x} 
                              y1={actualY} 
                              x2={x} 
                              y2={predictedY} 
                              stroke="#dc2626" 
                              strokeWidth="2"
                              opacity="0.7"
                            />
                            
                            {/* Predicted point on line */}
                            <circle 
                              cx={x} 
                              cy={predictedY} 
                              r="4" 
                              fill={selectedExample === 'regression' ? "#2563eb" : "#6b7280"}
                              stroke="white"
                              strokeWidth="2"
                            />
                            
                            {/* Actual data point */}
                            <circle 
                              cx={x} 
                              cy={actualY} 
                              r="6" 
                              fill="#ef4444"
                              stroke="white"
                              strokeWidth="2"
                            />
                            
                            {/* Point label */}
                            <text 
                              x={x + 10} 
                              y={actualY - 10} 
                              className="text-xs fill-gray-700 font-medium"
                            >
                              ({point.x}, {point.y})
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* Legend */}
                      <g transform="translate(320, 200)">
                        <rect x="0" y="0" width="120" height="80" fill="white" stroke="#ccc" strokeWidth="1" rx="4" />
                        
                        <circle cx="15" cy="20" r="4" fill="#ef4444" stroke="white" strokeWidth="1" />
                        <text x="25" y="25" className="text-xs fill-gray-700">Actual Data</text>
                        
                        <circle cx="15" cy="40" r="3" fill={selectedExample === 'regression' ? "#2563eb" : "#6b7280"} stroke="white" strokeWidth="1" />
                        <text x="25" y="45" className="text-xs fill-gray-700">
                          {selectedExample === 'regression' ? 'Predicted' : 'Naive Pred'}
                        </text>
                        
                        <line x1="10" y1="60" x2="20" y2="60" stroke="#dc2626" strokeWidth="2" />
                        <text x="25" y="65" className="text-xs fill-gray-700">Error</text>
                      </g>
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      {selectedExample === 'regression' 
                        ? 'The blue line shows how regression finds the best fit through the data points.'
                        : 'The gray dashed line shows the naive model - always predicting the average (4.0).'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Red lines show the errors (differences between actual and predicted values).
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">X (Hours Studied)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Y (Test Score)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        {selectedExample === 'regression' ? 'Regression Predicted' : 'Naive Predicted'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Error</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Squared Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPoints.map((point, index) => {
                      const predicted = selectedExample === 'regression' 
                        ? getRegressionY(point.x) 
                        : naiveMean;
                      const error = point.y - predicted;
                      const squaredError = Math.pow(error, 2);
                      
                      return (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{point.x}</td>
                          <td className="border border-gray-300 px-4 py-2 font-bold">{point.y}</td>
                          <td className="border border-gray-300 px-4 py-2 text-blue-600 font-medium">
                            {predicted.toFixed(1)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-red-600">
                            {error.toFixed(1)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-red-700 font-bold">
                            {squaredError.toFixed(1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-yellow-50">
                      <td colSpan={4} className="border border-gray-300 px-4 py-2 font-bold text-right">
                        Sum of Squared Errors (SSE):
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-bold text-lg text-red-800">
                        {selectedExample === 'regression' ? regressionSSE.toFixed(1) : naiveSSE.toFixed(1)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Comparison Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">📈 Regression Model</h4>
                  <p className="text-blue-700 text-sm mb-2">Uses X to predict Y with the line: Y = {regressionSlope}X + {regressionIntercept}</p>
                  <p className="text-lg font-bold text-blue-800">SSE = {regressionSSE.toFixed(1)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-bold text-gray-700 mb-2">🤷‍♂️ Naive Model</h4>
                  <p className="text-gray-600 text-sm mb-2">Always predicts the mean: Y = {naiveMean.toFixed(1)}</p>
                  <p className="text-lg font-bold text-gray-700">SSE = {naiveSSE.toFixed(1)}</p>
                </div>
              </div>

              {/* Winner */}
              <div className="mt-6 text-center">
                <div className={`inline-block px-6 py-3 rounded-lg font-bold text-lg ${
                  regressionSSE < naiveSSE 
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {regressionSSE < naiveSSE 
                    ? '🎉 Regression Wins! Lower SSE means better predictions!'
                    : '😬 Naive model is just as good. X might not be helpful for predicting Y.'}
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔑 Key Takeaways</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">SSE Tells Us Model Quality</h4>
                <p className="text-green-700">
                  Lower SSE = better predictions. Regression automatically finds the line with the lowest possible SSE.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">Naive Model = Baseline</h4>
                <p className="text-blue-700">
                  If regression can't beat the naive model, then X isn't useful for predicting Y.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800 mb-2">R-squared Connection</h4>
                <p className="text-purple-700">
                  R-squared actually compares regression SSE to naive model SSE! It tells us how much better regression is than just guessing the mean.
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-800 mb-2">Why This Matters</h4>
                <p className="text-orange-700">
                  Understanding SSE helps you evaluate model performance and know when you've found meaningful relationships in your data.
                </p>
              </div>
            </div>
          </section>

          {/* Mathematical Deep Dive */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📚 Mathematical Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Regression SSE</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-mono text-sm mb-2">SSE_regression = Σ(yᵢ - ŷᵢ)²</p>
                    <p className="text-sm text-gray-600">
                      Where ŷᵢ = b₀ + b₁xᵢ (our prediction from the regression line)
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Naive Model SSE</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-mono text-sm mb-2">SSE_naive = Σ(yᵢ - ȳ)²</p>
                    <p className="text-sm text-gray-600">
                      Where ȳ is the mean of all Y values (our naive prediction)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-100 p-4 rounded border border-yellow-300">
                <h4 className="font-semibold text-yellow-800 mb-2">Connection to R-squared</h4>
                <p className="text-yellow-700 text-sm">
                  R² = 1 - (SSE_regression / SSE_naive)
                  <br />
                  This formula shows how much better regression is compared to the naive model!
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