"use client";
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function VisualLogistic() {
  const [selectedExample, setSelectedExample] = useState('sigmoid');
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const correctAnswers = {
    1: "About 50%",
    2: "Steeper Slope", 
    3: "❌ False - Always between 0% and 100%"
  };

  const handleAnswerSelect = (questionNum: number, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionNum]: answer
    }));
    setShowResults(false);
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length === 3) {
      setShowResults(true);
    }
  };

  const getScore = () => {
    let correct = 0;
    Object.entries(correctAnswers).forEach(([questionNum, correctAnswer]) => {
      if (quizAnswers[parseInt(questionNum)] === correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  // Generate data points for the sigmoid curve
  const generateSigmoidData = (intercept: number, slope: number) => {
    const points = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const logit = intercept + slope * x;
      const probability = 1 / (1 + Math.exp(-logit));
      points.push({ x, y: probability });
    }
    return points;
  };

  const examples = {
    sigmoid: {
      intercept: 0,
      slope: 1,
      title: "Basic S-Curve",
      description: "The fundamental logistic curve shape"
    },
    steep: {
      intercept: 0,
      slope: 2,
      title: "Steeper Slope",
      description: "Higher coefficient creates steeper transition"
    },
    shifted: {
      intercept: -2,
      slope: 1,
      title: "Shifted Right",
      description: "Negative intercept shifts the curve right"
    }
  };

  const currentExample = examples[selectedExample as keyof typeof examples];
  const sigmoidData = generateSigmoidData(currentExample.intercept, currentExample.slope);

  // Convert data to SVG coordinates
  const toSVGCoords = (x: number, y: number) => {
    const svgX = 60 + ((x + 6) / 12) * 380; // Map -6 to 6 onto 60 to 440
    const svgY = 300 - (y * 240); // Map 0 to 1 onto 300 to 60
    return { x: svgX, y: svgY };
  };

  // Create SVG path for sigmoid curve
  const createSigmoidPath = () => {
    let path = '';
    sigmoidData.forEach((point, index) => {
      const coords = toSVGCoords(point.x, point.y);
      if (index === 0) {
        path += `M ${coords.x} ${coords.y}`;
      } else {
        path += ` L ${coords.x} ${coords.y}`;
      }
    });
    return path;
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
              <span role="img" aria-label="visual logistic" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">What IS Logistic Regression?</h1>
              <p className="text-xl text-gray-600 mt-2">The S-curve that predicts probabilities</p>
            </div>
          </div>

          {/* Concept Explanation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">The Big Picture</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 What It Does</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Logistic regression predicts the <strong>probability</strong> that something belongs to a category (like Male vs Female, Pass vs Fail).
                  </p>
                  <p className="text-blue-700 text-sm">
                    Unlike linear regression that predicts exact numbers, logistic regression predicts probabilities between 0 and 1.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 The S-Shape</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    The signature <strong>S-shaped curve</strong> (sigmoid) ensures predictions stay between 0 and 1 - perfect for probabilities!
                  </p>
                  <p className="text-blue-700 text-sm">
                    No matter how extreme your input values, the output is always a valid probability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Visualization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 Interactive S-Curve</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Explore Different Logistic Curves
              </h3>
              
              {/* Controls */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap">
                  <button
                    onClick={() => setSelectedExample('sigmoid')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'sigmoid'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Basic S-Curve
                  </button>
                  <button
                    onClick={() => setSelectedExample('steep')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'steep'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Steeper Slope
                  </button>
                  <button
                    onClick={() => setSelectedExample('shifted')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'shifted'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Shifted Curve
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="flex justify-center mb-6">
                <svg width="500" height="350" className="border border-gray-300 rounded bg-white">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Axes */}
                  <line x1="60" y1="300" x2="440" y2="300" stroke="#333" strokeWidth="2" />
                  <line x1="60" y1="60" x2="60" y2="300" stroke="#333" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="250" y="330" textAnchor="middle" className="text-sm fill-gray-600">
                    X (Predictor Variable)
                  </text>
                  <text x="30" y="180" textAnchor="middle" className="text-sm fill-gray-600" transform="rotate(-90 30 180)">
                    Probability
                  </text>
                  
                  {/* Y-axis scale marks */}
                  <line x1="55" y1="300" x2="65" y2="300" stroke="#333" strokeWidth="1" />
                  <text x="50" y="305" textAnchor="end" className="text-xs fill-gray-600">0</text>
                  
                  <line x1="55" y1="240" x2="65" y2="240" stroke="#333" strokeWidth="1" />
                  <text x="50" y="245" textAnchor="end" className="text-xs fill-gray-600">0.25</text>
                  
                  <line x1="55" y1="180" x2="65" y2="180" stroke="#333" strokeWidth="1" />
                  <text x="50" y="185" textAnchor="end" className="text-xs fill-gray-600">0.5</text>
                  
                  <line x1="55" y1="120" x2="65" y2="120" stroke="#333" strokeWidth="1" />
                  <text x="50" y="125" textAnchor="end" className="text-xs fill-gray-600">0.75</text>
                  
                  <line x1="55" y1="60" x2="65" y2="60" stroke="#333" strokeWidth="1" />
                  <text x="50" y="65" textAnchor="end" className="text-xs fill-gray-600">1</text>
                  
                  {/* X-axis scale marks */}
                  <line x1="110" y1="295" x2="110" y2="305" stroke="#333" strokeWidth="1" />
                  <text x="110" y="320" textAnchor="middle" className="text-xs fill-gray-600">-4</text>
                  
                  <line x1="185" y1="295" x2="185" y2="305" stroke="#333" strokeWidth="1" />
                  <text x="185" y="320" textAnchor="middle" className="text-xs fill-gray-600">-2</text>
                  
                  <line x1="250" y1="295" x2="250" y2="305" stroke="#333" strokeWidth="1" />
                  <text x="250" y="320" textAnchor="middle" className="text-xs fill-gray-600">0</text>
                  
                  <line x1="315" y1="295" x2="315" y2="305" stroke="#333" strokeWidth="1" />
                  <text x="315" y="320" textAnchor="middle" className="text-xs fill-gray-600">2</text>
                  
                  <line x1="390" y1="295" x2="390" y2="305" stroke="#333" strokeWidth="1" />
                  <text x="390" y="320" textAnchor="middle" className="text-xs fill-gray-600">4</text>
                  
                  {/* Background areas for level highlighting */}
                  {/* Upper 50% area (Level of Interest) */}
                  <rect x="60" y="60" width="380" height="120" fill="#22c55e" opacity="0.1" />
                  <text x="70" y="80" className="text-sm fill-green-600 font-bold">Level of Interest</text>
                  <text x="70" y="95" className="text-xs fill-green-500">(Probability &gt; 50%)</text>
                  
                  {/* Lower 50% area (Other Level) */}
                  <rect x="60" y="180" width="380" height="120" fill="#ef4444" opacity="0.1" />
                  <text x="70" y="280" className="text-sm fill-red-600 font-bold">Other Level</text>
                  <text x="70" y="295" className="text-xs fill-red-500">(Probability &lt; 50%)</text>
                  
                  {/* Sigmoid curve */}
                  <path
                    d={createSigmoidPath()}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                  
                  {/* Horizontal reference lines */}
                  <line x1="60" y1="180" x2="440" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.8" />
                  <text x="445" y="185" className="text-sm fill-gray-600 font-bold">50% threshold</text>
                </svg>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {currentExample.description}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedExample === 'sigmoid' && 'This is the classic S-shaped logistic curve. Notice how it smoothly transitions from 0 to 1.'}
                  {selectedExample === 'steep' && 'A larger coefficient makes the transition more abrupt - the curve changes faster around the center.'}
                  {selectedExample === 'shifted' && 'A negative intercept shifts the 50% probability point to the right (positive x values).'}
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Activities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 S-Curve Understanding Quiz</h2>
            
            {/* Combined Multiple Choice Activity */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-6">🧠 Test Your S-Curve Knowledge</h3>
              
              {/* Question 1 */}
              <div className="mb-6">
                <p className="text-blue-700 mb-3 font-medium">
                  1. Looking at the S-curve above, what's the probability when X = 0?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["About 25%", "About 50%", "About 75%"].map((option) => (
                    <button 
                      key={option}
                      onClick={() => handleAnswerSelect(1, option)}
                      className={`p-3 rounded border transition-colors text-sm ${
                        quizAnswers[1] === option 
                          ? 'bg-blue-200 border-blue-500 border-2' 
                          : 'bg-white border-blue-300 hover:bg-blue-100'
                      } ${
                        showResults 
                          ? option === correctAnswers[1] 
                            ? 'ring-2 ring-green-500 bg-green-100' 
                            : quizAnswers[1] === option 
                              ? 'ring-2 ring-red-500 bg-red-100' 
                              : ''
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-6">
                <p className="text-blue-700 mb-3 font-medium">
                  2. Which curve type reaches 90% probability fastest?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["Basic S-Curve", "Steeper Slope", "Shifted Curve"].map((option) => (
                    <button 
                      key={option}
                      onClick={() => handleAnswerSelect(2, option)}
                      className={`p-3 rounded border transition-colors text-sm ${
                        quizAnswers[2] === option 
                          ? 'bg-blue-200 border-blue-500 border-2' 
                          : 'bg-white border-blue-300 hover:bg-blue-100'
                      } ${
                        showResults 
                          ? option === correctAnswers[2] 
                            ? 'ring-2 ring-green-500 bg-green-100' 
                            : quizAnswers[2] === option 
                              ? 'ring-2 ring-red-500 bg-red-100' 
                              : ''
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="mb-6">
                <p className="text-blue-700 mb-3 font-medium">
                  3. Can a logistic regression predict a probability of 120%?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["❌ False - Always between 0% and 100%", "✅ True - Can go above 100%"].map((option) => (
                    <button 
                      key={option}
                      onClick={() => handleAnswerSelect(3, option)}
                      className={`p-3 rounded border transition-colors text-sm ${
                        quizAnswers[3] === option 
                          ? 'bg-blue-200 border-blue-500 border-2' 
                          : 'bg-white border-blue-300 hover:bg-blue-100'
                      } ${
                        showResults 
                          ? option === correctAnswers[3] 
                            ? 'ring-2 ring-green-500 bg-green-100' 
                            : quizAnswers[3] === option 
                              ? 'ring-2 ring-red-500 bg-red-100' 
                              : ''
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button and Results */}
              <div className="text-center mb-4">
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < 3}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    Object.keys(quizAnswers).length < 3
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Submit Quiz
                </button>
              </div>

              {showResults && (
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">📊 Quiz Results</h4>
                  <p className="text-blue-700 text-lg mb-3">
                    You scored <strong>{getScore()}/3</strong> ({Math.round((getScore()/3)*100)}%)
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-600">
                      <strong>Question 1:</strong> The basic S-curve crosses 50% at X=0, so the answer is "About 50%"
                    </p>
                    <p className="text-blue-600">
                      <strong>Question 2:</strong> Steeper slope means faster change, so it reaches 90% fastest
                    </p>
                    <p className="text-blue-600">
                      <strong>Question 3:</strong> S-curves are mathematically bounded between 0% and 100%
                    </p>
                  </div>
                </div>
              )}

              {!showResults && (
                <p className="text-blue-600 text-sm mt-4">
                  💡 <strong>Hints:</strong> Follow the 50% dashed line, steeper curves change faster, and S-curves are mathematically bounded!
                </p>
              )}
            </div>
          </section>


        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 