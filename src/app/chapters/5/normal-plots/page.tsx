"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface PlotExample {
  name: string;
  context: string;
  data: number[];
  mean: number;
  sd: number;
  isNormal: boolean;
  interpretation: string;
  why: string;
}

interface Challenge {
  id: number;
  plotDescription: string;
  data: number[];
  questionType: 'assessment' | 'interpretation' | 'comparison' | 'application';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function NormalPlots() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: PlotExample[] = [
    {
      name: "Test Scores (Normal)",
      context: "Final exam scores from large statistics class",
      data: [78, 82, 85, 88, 91, 85, 79, 86, 84, 87, 83, 89, 81, 86, 88, 84, 82, 87, 85, 90],
      mean: 85,
      sd: 3.2,
      isNormal: true,
      interpretation: "Points follow a straight line closely - data is approximately normal.",
      why: "Well-designed test with large sample creates normal distribution of abilities."
    },
    {
      name: "Income Data (Right-Skewed)",
      context: "Household income in city (thousands)",
      data: [35, 42, 38, 45, 41, 39, 44, 47, 52, 58, 63, 72, 85, 98, 110, 125, 145, 180, 220, 350],
      mean: 85.5,
      sd: 68.2,
      isNormal: false,
      interpretation: "Points curve upward (S-shape) - indicates right-skewed distribution.",
      why: "Most people earn moderate amounts, but some high earners create a long right tail."
    },
    {
      name: "Reaction Times (Left-Skewed)",
      context: "Response times for simple cognitive task (ms)",
      data: [180, 195, 205, 215, 225, 235, 240, 245, 248, 250, 252, 255, 258, 260, 265, 270, 280, 295, 310, 340],
      mean: 245,
      sd: 35,
      isNormal: false,
      interpretation: "Points curve downward - indicates left-skewed distribution.",
      why: "Physical limits create a floor effect - can't respond faster than neural processing allows."
    },
    {
      name: "Manufacturing (Bimodal)",
      context: "Product weights from two different machines",
      data: [98, 99, 100, 101, 102, 103, 104, 105, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156],
      mean: 127.5,
      sd: 25.8,
      isNormal: false,
      interpretation: "Points show sharp curves and breaks - indicates multiple groups or bimodal distribution.",
      why: "Two different machines operating with different settings create two separate normal curves."
    },
    {
      name: "Height Data (Nearly Normal)",
      context: "Adult heights with small sample",
      data: [64, 65, 66, 67, 68, 68, 69, 69, 70, 70, 70, 71, 71, 72, 72, 73, 74, 75, 76, 77],
      mean: 70,
      sd: 3.5,
      isNormal: true,
      interpretation: "Points mostly follow straight line with minor deviations - reasonably normal for practical purposes.",
      why: "Heights are naturally normal, but small sample sizes can show some irregularities."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      plotDescription: "Points lie close to a straight line from lower-left to upper-right",
      data: [78, 82, 85, 88, 91, 85, 79, 86, 84, 87],
      questionType: 'assessment',
      question: "What does this normal probability plot tell us about the data?",
      options: [
        "The data is heavily skewed",
        "The data is approximately normal",
        "The data has outliers",
        "The data is bimodal"
      ],
      correctAnswer: "The data is approximately normal",
      explanation: "When points in a normal probability plot lie close to a straight line, it indicates the data follows a normal distribution. The straight line pattern is the key indicator of normality.",
      skillFocus: "Interpreting straight line patterns as evidence of normality"
    },
    {
      id: 2,
      plotDescription: "Points curve upward in an S-shape, with steeper slope on the right",
      data: [25, 28, 32, 35, 38, 42, 48, 55, 68, 85],
      questionType: 'interpretation',
      question: "What type of distribution does this pattern indicate?",
      options: [
        "Normal distribution",
        "Left-skewed distribution",
        "Right-skewed distribution", 
        "Uniform distribution"
      ],
      correctAnswer: "Right-skewed distribution",
      explanation: "An S-shaped curve that bends upward indicates right skewness. The data has a long tail extending to the right, with most values clustered on the left side of the distribution.",
      skillFocus: "Recognizing S-curve patterns as indicators of skewness direction"
    },
    {
      id: 3,
      plotDescription: "Points form a curved pattern that bends downward, steeper on the left",
      data: [185, 195, 205, 215, 225, 235, 245, 255, 270, 290],
      questionType: 'interpretation',
      question: "This pattern suggests the data is:",
      options: [
        "Right-skewed with outliers on the right",
        "Left-skewed with a ceiling effect",
        "Normally distributed",
        "Bimodal with two peaks"
      ],
      correctAnswer: "Left-skewed with a ceiling effect",
      explanation: "A downward-curving pattern indicates left skewness. This often occurs when there's a natural upper limit (ceiling effect) that prevents values from going higher, bunching them up on the right side.",
      skillFocus: "Understanding how physical or practical limits create skewed distributions"
    },
    {
      id: 4,
      plotDescription: "Points show distinct breaks and curves, forming two separate linear segments",
      data: [95, 97, 99, 101, 103, 145, 147, 149, 151, 153],
      questionType: 'assessment',
      question: "What does this pattern most likely indicate?",
      options: [
        "Normal distribution with outliers",
        "Severe right skewness",
        "Bimodal distribution or mixture of populations",
        "Measurement error in the data"
      ],
      correctAnswer: "Bimodal distribution or mixture of populations",
      explanation: "When points form distinct segments or show sharp breaks, it suggests the data comes from multiple populations or has two modes. Each linear segment represents a different underlying normal distribution.",
      skillFocus: "Identifying multiple populations through segmented patterns in normal plots"
    },
    {
      id: 5,
      plotDescription: "Points generally follow a straight line but with a few values far from the line",
      data: [68, 70, 71, 72, 73, 74, 75, 76, 78, 95],
      questionType: 'application',
      question: "How should you proceed with analysis of this dataset?",
      options: [
        "Reject normality assumption completely",
        "Consider the data normal and proceed with analysis",
        "Investigate the outlier points before proceeding",
        "Transform the data before analysis"
      ],
      correctAnswer: "Investigate the outlier points before proceeding",
      explanation: "When most points follow a straight line but a few are far off, investigate those outliers. They might be data entry errors, measurement mistakes, or genuinely unusual observations that need special attention.",
      skillFocus: "Making practical decisions about normality when outliers are present"
    },
    {
      id: 6,
      plotDescription: "Points follow a straight line very closely with minimal deviation",
      data: [98, 99, 100, 101, 102, 103, 104, 105, 106, 107],
      questionType: 'application',
      question: "Given this normal plot, what analysis methods would be most appropriate?",
      options: [
        "Use only non-parametric methods",
        "Apply data transformations before analysis",
        "Proceed confidently with normal distribution-based methods",
        "Collect more data before any analysis"
      ],
      correctAnswer: "Proceed confidently with normal distribution-based methods",
      explanation: "When points follow a straight line very closely, you can confidently use methods that assume normality: t-tests, ANOVA, regression, etc. The normal plot provides strong evidence for the normality assumption.",
      skillFocus: "Using normal plots to justify choice of statistical analysis methods"
    }
  ];

  // Calculate theoretical quantiles for normal probability plot
  const calculateTheoreticalQuantiles = (n: number) => {
    const quantiles = [];
    for (let i = 1; i <= n; i++) {
      // Using approximation for normal quantiles
      const p = (i - 0.375) / (n + 0.25);
      const z = Math.sqrt(2) * inverseErf(2 * p - 1);
      quantiles.push(z);
    }
    return quantiles;
  };

  // Inverse error function approximation
  const inverseErf = (x: number) => {
    const a = 0.147;
    const ln = Math.log(1 - x * x);
    const part1 = (2 / (Math.PI * a)) + (ln / 2);
    const part2 = ln / a;
    return Math.sign(x) * Math.sqrt(Math.sqrt(part1 * part1 - part2) - part1);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallenge(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  const handleSubmit = () => {
    const challenge = challenges[currentChallenge];
    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setGameEnded(true);
      }
    }, 4000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Normal Plot Expert</h1>
                <p className="text-gray-600">Challenge {currentChallenge + 1} of {challenges.length}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 Normal Probability Plot Analysis
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Plot Pattern Description:</h4>
                  <p className="text-gray-600 italic">{currentChallengeData.plotDescription}</p>
                </div>
                
                {/* Simplified visualization */}
                <div className="bg-white p-4 rounded border mb-4">
                  <div className="text-center text-sm text-gray-600 mb-2">Sample Data Points:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentChallengeData.data.map((value, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-l-4 border-[#ff8200] pl-4">
                  <p className="font-medium text-[#58595b]">{currentChallengeData.question}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {currentChallengeData.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswer === option
                      ? 'border-[#ff8200] bg-[#fff4e6]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer || showFeedback}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !selectedAnswer || showFeedback
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ff8200] hover:bg-[#ff9933] text-white'
                }`}
              >
                Submit Answer
              </button>
            </div>
          </div>

          {/* Feedback Modal */}
          {showFeedback && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">
                    {selectedAnswer === currentChallengeData.correctAnswer ? '✅' : '❌'}
                  </div>
                  <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent!' : 'Not Quite Right'}
                  </h3>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Explanation</h4>
                    <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">🎯 Skill Focus</h4>
                    <p className="text-green-600 text-sm">{currentChallengeData.skillFocus}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Next challenge in 4 seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Normal Plot Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {challenges.length}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {Math.round((score / challenges.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Try Again
              </button>
              <Link
                href="/chapters/5"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Next Topic
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedPlotExample = examples[selectedExample];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to The Normal Model
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="normal plots" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Normal Probability Plots</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the detective tool of statistics! Learn to visually assess whether your data follows a normal distribution.
              </p>
            </div>
          </div>
        </div>

        {/* What Are Normal Plots */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔍 What Are Normal Probability Plots?</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🕵️</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Your Statistical Detective Tool</h3>
                  <p className="text-yellow-600">
                    Normal probability plots (Q-Q plots) are visual tools that help you determine if your data comes from a normal distribution. 
                    They plot your actual data against what the data would look like if it were perfectly normal.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📊 How It Works</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• X-axis: Theoretical normal quantiles</li>
                  <li>• Y-axis: Your actual data values</li>
                  <li>• If normal: points form straight line</li>
                  <li>• If not normal: points curve or deviate</li>
                </ul>
              </div>

              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🎯 Why It Matters</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Many tests assume normality</li>
                  <li>• Helps choose appropriate analysis</li>
                  <li>• Identifies skewness and outliers</li>
                  <li>• Guides data transformation decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Recognition Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">👁️ Pattern Recognition Guide</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Normal Pattern */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-700 mb-3">✅ Normal Distribution</h3>
                <div className="bg-white p-4 rounded mb-3">
                  <div className="text-center text-sm text-gray-600 mb-2">Pattern: Straight Line</div>
                  <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="20" y1="80" x2="180" y2="20" stroke="#22c55e" strokeWidth="3"/>
                      <circle cx="30" cy="75" r="3" fill="#22c55e"/>
                      <circle cx="50" cy="65" r="3" fill="#22c55e"/>
                      <circle cx="70" cy="55" r="3" fill="#22c55e"/>
                      <circle cx="90" cy="45" r="3" fill="#22c55e"/>
                      <circle cx="110" cy="35" r="3" fill="#22c55e"/>
                      <circle cx="130" cy="25" r="3" fill="#22c55e"/>
                      <circle cx="150" cy="30" r="3" fill="#22c55e"/>
                      <circle cx="170" cy="25" r="3" fill="#22c55e"/>
                    </svg>
                  </div>
                </div>
                <p className="text-green-600 text-sm">Points lie close to a straight line. Minor deviations are normal.</p>
              </div>

              {/* Right-Skewed Pattern */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-bold text-orange-700 mb-3">📈 Right-Skewed</h3>
                <div className="bg-white p-4 rounded mb-3">
                  <div className="text-center text-sm text-gray-600 mb-2">Pattern: S-Curve (Upward)</div>
                  <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <path d="M 20 80 Q 100 60 180 10" stroke="#f97316" strokeWidth="3" fill="none"/>
                      <circle cx="30" cy="75" r="3" fill="#f97316"/>
                      <circle cx="50" cy="70" r="3" fill="#f97316"/>
                      <circle cx="70" cy="65" r="3" fill="#f97316"/>
                      <circle cx="90" cy="55" r="3" fill="#f97316"/>
                      <circle cx="110" cy="40" r="3" fill="#f97316"/>
                      <circle cx="130" cy="25" r="3" fill="#f97316"/>
                      <circle cx="150" cy="15" r="3" fill="#f97316"/>
                      <circle cx="170" cy="12" r="3" fill="#f97316"/>
                    </svg>
                  </div>
                </div>
                <p className="text-orange-600 text-sm">Curves upward - most values low, few values very high.</p>
              </div>

              {/* Left-Skewed Pattern */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-700 mb-3">📉 Left-Skewed</h3>
                <div className="bg-white p-4 rounded mb-3">
                  <div className="text-center text-sm text-gray-600 mb-2">Pattern: S-Curve (Downward)</div>
                  <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <path d="M 20 20 Q 100 40 180 80" stroke="#a855f7" strokeWidth="3" fill="none"/>
                      <circle cx="30" cy="25" r="3" fill="#a855f7"/>
                      <circle cx="50" cy="30" r="3" fill="#a855f7"/>
                      <circle cx="70" cy="35" r="3" fill="#a855f7"/>
                      <circle cx="90" cy="45" r="3" fill="#a855f7"/>
                      <circle cx="110" cy="60" r="3" fill="#a855f7"/>
                      <circle cx="130" cy="75" r="3" fill="#a855f7"/>
                      <circle cx="150" cy="82" r="3" fill="#a855f7"/>
                      <circle cx="170" cy="85" r="3" fill="#a855f7"/>
                    </svg>
                  </div>
                </div>
                <p className="text-purple-600 text-sm">Curves downward - most values high, few values very low.</p>
              </div>

              {/* Outliers Pattern */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-700 mb-3">⚠️ Outliers Present</h3>
                <div className="bg-white p-4 rounded mb-3">
                  <div className="text-center text-sm text-gray-600 mb-2">Pattern: Line with Deviations</div>
                  <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="20" y1="80" x2="180" y2="20" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5"/>
                      <circle cx="30" cy="75" r="3" fill="#dc2626"/>
                      <circle cx="50" cy="65" r="3" fill="#dc2626"/>
                      <circle cx="70" cy="55" r="3" fill="#dc2626"/>
                      <circle cx="90" cy="45" r="3" fill="#dc2626"/>
                      <circle cx="110" cy="35" r="3" fill="#dc2626"/>
                      <circle cx="130" cy="25" r="3" fill="#dc2626"/>
                      <circle cx="150" cy="50" r="4" fill="#dc2626"/>
                      <circle cx="170" cy="10" r="4" fill="#dc2626"/>
                    </svg>
                  </div>
                </div>
                <p className="text-red-600 text-sm">Mostly straight line but some points far from the pattern.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Examples</h2>
          
          {/* Example Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedExample === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedPlotExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedPlotExample.context}</p>
            </div>

            {/* Data and Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">📊 Sample Data</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPlotExample.data.map((value, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {value}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <div>Mean: {selectedPlotExample.mean}</div>
                  <div>Standard Deviation: {selectedPlotExample.sd}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">🎯 Normality Assessment</h4>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${
                  selectedPlotExample.isNormal 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {selectedPlotExample.isNormal ? 'Approximately Normal' : 'Not Normal'}
                </div>
                <p className="text-gray-600 text-sm">{selectedPlotExample.interpretation}</p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">🤔 Why This Pattern?</h4>
              <p className="text-blue-600 text-sm">{selectedPlotExample.why}</p>
            </div>
          </div>
        </div>

        {/* Decision Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Making Decisions with Normal Plots</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">Decision Framework:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">✓</div>
                  <div>
                    <strong className="text-green-700">Proceed with Normal Methods</strong> when points follow straight line closely
                    <div className="text-sm text-gray-600 mt-1">Use t-tests, ANOVA, regression, confidence intervals</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">!</div>
                  <div>
                    <strong className="text-yellow-700">Investigate Further</strong> when pattern shows moderate deviations
                    <div className="text-sm text-gray-600 mt-1">Check for outliers, consider sample size, look for data entry errors</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">⚠</div>
                  <div>
                    <strong className="text-orange-700">Consider Transformation</strong> when pattern shows clear skewness
                    <div className="text-sm text-gray-600 mt-1">Try log, square root, or other transformations to achieve normality</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">✗</div>
                  <div>
                    <strong className="text-red-700">Use Non-parametric Methods</strong> when normality clearly fails
                    <div className="text-sm text-gray-600 mt-1">Use rank-based tests, bootstrap methods, or robust statistics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">💡 Expert Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📏 Sample Size Matters</h4>
                <p className="text-blue-600 text-sm">
                  Small samples (n&lt;30) can look non-normal even if population is normal. 
                  Large samples reveal true departures from normality more clearly.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🎯 Focus on the Middle</h4>
                <p className="text-green-600 text-sm">
                  The middle 80% of points are most important. Extreme points naturally 
                  show more variation in small samples.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">🔍 Context is Key</h4>
                <p className="text-purple-600 text-sm">
                  Consider what you're measuring. Income is naturally skewed, 
                  heights are naturally normal, test scores depend on the test design.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">⚖️ Perfect is Rare</h4>
                <p className="text-orange-600 text-sm">
                  Real data is never perfectly normal. Look for "close enough" 
                  rather than perfection for practical analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Normal Plot Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interpret different normal plot patterns</li>
                <li>• Identify normality, skewness, and outliers</li>
                <li>• Make decisions about analysis methods</li>
                <li>• Apply knowledge to real-world scenarios</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Visual pattern recognition</li>
                <li>• Statistical method selection</li>
                <li>• Outlier detection techniques</li>
                <li>• Professional data assessment</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Normal Plot Analysis
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
