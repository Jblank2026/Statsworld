"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ConditionExample {
  name: string;
  description: string;
  status: 'good' | 'bad';
  reason: string;
  visualization: string;
  data: Array<{ x: number; y: number }>;
}

interface Challenge {
  id: number;
  scenario: string;
  description: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function CorrelationConditions() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: ConditionExample[] = [
    {
      name: "Good Linear Relationship",
      description: "Height vs Weight - Clear linear pattern",
      status: 'good',
      reason: "Points follow a straight line pattern with no extreme outliers",
      visualization: "Straight line through scattered points",
      data: [
        { x: 65, y: 140 }, { x: 68, y: 160 }, { x: 70, y: 170 }, 
        { x: 72, y: 190 }, { x: 75, y: 210 }
      ]
    },
    {
      name: "Curved Relationship - Bad for r",
      description: "Temperature vs Plant Growth - Curved pattern",
      status: 'bad',
      reason: "Relationship is curved, not linear. r measures only linear relationships!",
      visualization: "Curved line - correlation misses the pattern",
      data: [
        { x: 50, y: 20 }, { x: 65, y: 60 }, { x: 75, y: 85 }, 
        { x: 85, y: 60 }, { x: 95, y: 25 }
      ]
    },
    {
      name: "Extreme Outlier Present",
      description: "Study Hours vs Test Score with one extreme point",
      status: 'bad',
      reason: "One student studied 50 hours but scored very low (sick during exam). This outlier distorts r.",
      visualization: "Most points linear, one far away",
      data: [
        { x: 5, y: 65 }, { x: 10, y: 75 }, { x: 15, y: 85 }, 
        { x: 20, y: 90 }, { x: 50, y: 30 }
      ]
    },
    {
      name: "Clean Linear Data",
      description: "Car Speed vs Fuel Efficiency - Perfect for correlation",
      status: 'good',
      reason: "Linear relationship, reasonable spread, no extreme outliers",
      visualization: "Straight line pattern, all points reasonable",
      data: [
        { x: 30, y: 35 }, { x: 45, y: 28 }, { x: 60, y: 22 }, 
        { x: 75, y: 18 }, { x: 90, y: 12 }
      ]
    },
    {
      name: "No Relationship",
      description: "Shoe Size vs GPA - Random scatter",
      status: 'good',
      reason: "No relationship exists, and r ≈ 0 correctly shows this",
      visualization: "Random scatter of points",
      data: [
        { x: 7, y: 2.1 }, { x: 8.5, y: 3.8 }, { x: 10, y: 2.9 }, 
        { x: 11, y: 3.2 }, { x: 12, y: 2.6 }
      ]
    },
    {
      name: "Categorical Variable Problem",
      description: "Eye Color vs Test Score - Can't use correlation!",
      status: 'bad',
      reason: "Eye color is categorical (brown, blue, green), not quantitative. Correlation requires both variables to be numbers.",
      visualization: "Categories on X-axis, numbers on Y-axis - wrong type!",
      data: [
        { x: 1, y: 85 }, { x: 2, y: 78 }, { x: 3, y: 92 }, 
        { x: 1, y: 88 }, { x: 2, y: 82 }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Study Hours vs Test Scores",
      description: "A scatterplot shows most students follow a clear upward trend, but one student studied 40 hours and scored 25% (was sick during the exam).",
      question: "Is correlation appropriate here?",
      options: [
        "Yes, calculate r normally",
        "No, the extreme outlier makes correlation misleading",
        "Yes, but only if we remove the outlier first",
        "No, there's no linear relationship"
      ],
      correctAnswer: "No, the extreme outlier makes correlation misleading",
      explanation: "The extreme outlier (sick student) severely distorts the correlation. We should investigate outliers before calculating r, as they can make strong relationships appear weak or create false correlations."
    },
    {
      id: 2,
      scenario: "Temperature vs Plant Growth",
      description: "Plants grow slowly in cold weather, rapidly in warm weather, but growth slows again in very hot weather, creating a curved relationship.",
      question: "Should we use correlation to measure this relationship?",
      options: [
        "Yes, correlation works for any relationship",
        "No, correlation only measures linear relationships",
        "Yes, but the r value will be perfect",
        "No, there are too many data points"
      ],
      correctAnswer: "No, correlation only measures linear relationships",
      explanation: "Correlation (r) only measures LINEAR relationships. Even if there's a perfect curved relationship, r might be close to 0. For curved patterns, we need different analysis methods."
    },
    {
      id: 3,
      scenario: "Income vs House Price",
      description: "A real estate study only includes millionaires (incomes $1M-$5M) and finds a weak correlation between income and house price.",
      question: "What's the problem with this correlation analysis?",
      options: [
        "Nothing wrong - correlation is always valid",
        "Restricted range - missing lower and middle incomes",
        "Too much data to analyze properly",
        "Income and house price are never correlated"
      ],
      correctAnswer: "Restricted range - missing lower and middle incomes",
      explanation: "Restricted range can make strong relationships appear weak. The true correlation between income and house price across ALL income levels would likely be much stronger than what we see in just the millionaire range."
    },
    {
      id: 4,
      scenario: "Exercise vs Heart Rate",
      description: "A scatterplot shows that as exercise increases, heart rate first increases, then decreases as people get very fit, creating a curved pattern.",
      question: "What does this tell us about using correlation?",
      options: [
        "Correlation will perfectly capture this relationship",
        "Correlation is inappropriate due to the curved relationship",
        "We need more data points",
        "The relationship is too strong for correlation"
      ],
      correctAnswer: "Correlation is inappropriate due to the curved relationship",
      explanation: "The curved (non-linear) relationship means correlation will miss the true pattern. r measures only straight-line relationships, so it would underestimate the strength of this curved association."
    },
    {
      id: 5,
      scenario: "Height vs Shoe Size",
      description: "Data shows a clear linear upward trend with points nicely scattered around a straight line, no extreme values.",
      question: "Is this data appropriate for correlation analysis?",
      options: [
        "No, because it's too linear",
        "Yes, meets all conditions: quantitative variables, linear, no extreme outliers",
        "No, need more variables",
        "Yes, but only if we transform the data first"
      ],
      correctAnswer: "Yes, meets all conditions: quantitative variables, linear, no extreme outliers",
      explanation: "Perfect! This data meets all three key conditions: both variables are quantitative (numbers), clear linear relationship, and no extreme outliers. Correlation will accurately measure the strength and direction of this relationship."
    },
    {
      id: 6,
      scenario: "Major vs GPA",
      description: "A study wants to examine the relationship between student major (Engineering, Business, Liberal Arts, Science) and GPA.",
      question: "Can we use correlation to analyze this relationship?",
      options: [
        "Yes, correlation works for any two variables",
        "No, major is categorical, not quantitative - correlation requires numbers",
        "Yes, but only if we code the majors as numbers first",
        "No, because GPA values are too similar"
      ],
      correctAnswer: "No, major is categorical, not quantitative - correlation requires numbers",
      explanation: "Correct! Major is a categorical variable (names/labels), not quantitative. Correlation only works with two quantitative variables. Even if we assigned numbers to majors (1=Engineering, 2=Business, etc.), those numbers would be arbitrary and meaningless for correlation."
    }
  ];

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
    }, 3000);
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
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Correlation Conditions Expert</h1>
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

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                ⚠️ Correlation Conditions Check
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Scenario:</h4>
                  <p className="text-gray-600 font-medium">{currentChallengeData.scenario}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-600">{currentChallengeData.description}</p>
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
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 4 ? '🎉' : score >= 3 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 4 ? 'Conditions Expert!' : score >= 3 ? 'Great Work!' : 'Keep Learning!'}
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
                href="/chapters/6"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Back to Chapter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentExample = examples[selectedExample];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Correlation
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Correlation Conditions & Limitations</h1>
              <p className="text-xl text-gray-600 mt-2">
                Learn when correlation works and when it fails! Master the conditions needed for meaningful correlation analysis, identify common pitfalls, and avoid misleading interpretations.
              </p>
            </div>
          </div>
        </div>

        {/* THE KEY CONDITIONS - VERY CLEAR */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">✅ The Essential Conditions for Correlation</h2>
          
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-700 mb-4">Correlation ONLY works when...</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🔢</span>
                  <h3 className="text-xl font-bold text-blue-700">1. QUANTITATIVE Variables</h3>
                </div>
                <p className="text-blue-600 mb-3">
                  <strong>Both variables must be NUMBERS!</strong>
                </p>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>✅ Height, weight, test scores, income</li>
                  <li>✅ Temperature, time, distance, age</li>
                  <li>❌ Gender, color, brand names</li>
                  <li>❌ Categories or labels don't work</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📏</span>
                  <h3 className="text-xl font-bold text-green-700">2. LINEAR Relationship</h3>
                </div>
                <p className="text-green-600 mb-3">
                  <strong>The pattern must be STRAIGHT!</strong>
                </p>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>✅ Points follow a straight line pattern</li>
                  <li>✅ Can be upward or downward sloping</li>
                  <li>❌ Curved relationships fool correlation</li>
                  <li>❌ U-shaped or S-shaped patterns don't work</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xl font-bold text-red-700">3. NO Extreme Outliers</h3>
                </div>
                <p className="text-red-600 mb-3">
                  <strong>Outliers can completely distort r!</strong>
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>✅ Points scattered around the main pattern</li>
                  <li>✅ No points extremely far from the group</li>
                  <li>❌ One extreme point can ruin everything</li>
                  <li>❌ Can make strong correlations look weak</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xl font-bold text-yellow-700">Quick Check: Is Correlation Appropriate?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Ask yourself:</h4>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>1. Are both variables quantitative (numbers)?</li>
                    <li>2. Does the scatterplot show a straight line pattern?</li>
                    <li>3. Are there any extreme outliers far from the group?</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">If YES to all:</h4>
                  <p className="text-yellow-600 text-sm font-medium">
                    ✅ Correlation is appropriate and meaningful!
                  </p>
                  <h4 className="font-semibold text-yellow-700 mb-2 mt-3">If NO to any:</h4>
                  <p className="text-yellow-600 text-sm font-medium">
                    ❌ Correlation may be misleading - investigate further!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔍 Examples: Good vs Bad for Correlation</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedExample === index
                    ? 'bg-[#ff8200] text-white'
                    : example.status === 'good' 
                      ? 'bg-green-200 text-green-700 hover:bg-green-300'
                      : 'bg-red-200 text-red-700 hover:bg-red-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-l-4 ${
              currentExample.status === 'good' 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{currentExample.status === 'good' ? '✅' : '❌'}</span>
                <div>
                  <h3 className={`text-lg font-bold ${
                    currentExample.status === 'good' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {currentExample.name}
                  </h3>
                  <p className={`text-sm ${
                    currentExample.status === 'good' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currentExample.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Assessment:</h4>
                <p className="text-gray-600 text-sm">{currentExample.reason}</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-gray-600 text-sm">
                  <strong>Visual pattern:</strong> {currentExample.visualization}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🚨 Common Pitfalls That Ruin Correlation</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">😵 Curved Relationships</h3>
                <p className="text-red-600 text-sm mb-3">
                  Even PERFECT curved relationships can give r ≈ 0!
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• Temperature vs plant growth (optimal range)</li>
                  <li>• Exercise vs performance (overtraining effect)</li>
                  <li>• Age vs reaction time (gradual then rapid decline)</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">🎯 Extreme Outliers</h3>
                <p className="text-red-600 text-sm mb-3">
                  One bad point can destroy the entire correlation!
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• Student sick during final exam</li>
                  <li>• Measurement error in data collection</li>
                  <li>• Unusual circumstances affecting one case</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">📏 Restricted Range</h3>
                <p className="text-red-600 text-sm mb-3">
                  Narrow data range makes correlations appear weaker!
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• Only studying college students (narrow age range)</li>
                  <li>• Only high-income households</li>
                  <li>• Only one season of data</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">🤔 Confusing Correlation with Causation</h3>
                <p className="text-red-600 text-sm mb-3">
                  Strong correlation ≠ one causes the other!
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• Ice cream sales vs drowning (both increase in summer)</li>
                  <li>• Shoe size vs reading ability (both increase with age)</li>
                  <li>• TV ownership vs life expectancy (wealth affects both)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Master Correlation Conditions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Challenge Yourself</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Identify when correlation is appropriate</li>
                <li>• Spot problematic outliers and curved patterns</li>
                <li>• Recognize restricted range issues</li>
                <li>• Understand when r is misleading</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Study hours vs test scores with outliers</li>
                <li>• Temperature vs plant growth (curved)</li>
                <li>• Income vs house price (restricted range)</li>
                <li>• Exercise vs heart rate patterns</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Test Your Knowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}