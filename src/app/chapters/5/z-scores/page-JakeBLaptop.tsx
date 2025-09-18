"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface ZScoreExample {
  name: string;
  context: string;
  mean: number;
  standardDeviation: number;
  unit: string;
  scenarios: Array<{
    value: number;
    description: string;
    zScore: number;
    interpretation: string;
  }>;
}

interface Challenge {
  id: number;
  scenario: string;
  mean: number;
  sd: number;
  unit: string;
  value: number;
  questionType: 'calculate' | 'interpret' | 'meaning';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function ZScores() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [calculatorMean, setCalculatorMean] = useState('100');
  const [calculatorSD, setCalculatorSD] = useState('15');
  const [calculatorValue, setCalculatorValue] = useState('115');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: ZScoreExample[] = [
    {
      name: "IQ Scores",
      context: "Standardized intelligence test results",
      mean: 100,
      standardDeviation: 15,
      unit: "points",
      scenarios: [
        {
          value: 85,
          description: "Below average performance",
          zScore: -1.0,
          interpretation: "Z = -1.0: One standard deviation below average. This score is in the bottom 16% of the population."
        },
        {
          value: 100,
          description: "Average performance", 
          zScore: 0.0,
          interpretation: "Z = 0.0: Exactly at the mean. This score is perfectly average - right in the middle of the distribution."
        },
        {
          value: 115,
          description: "Above average performance",
          zScore: 1.0,
          interpretation: "Z = +1.0: One standard deviation above average. This score is in the top 16% of the population."
        },
        {
          value: 130,
          description: "Gifted range",
          zScore: 2.0,
          interpretation: "Z = +2.0: Two standard deviations above average. This score is in the top 2.5% - very rare ability."
        }
      ]
    },
    {
      name: "SAT Scores",
      context: "College entrance examination scores",
      mean: 1050,
      standardDeviation: 200,
      unit: "points",
      scenarios: [
        {
          value: 850,
          description: "Below average college readiness",
          zScore: -1.0,
          interpretation: "Z = -1.0: One SD below mean. Student may need additional preparation."
        },
        {
          value: 1050,
          description: "Average performance",
          zScore: 0.0,
          interpretation: "Z = 0.0: Right at the national average. Typical performance level."
        },
        {
          value: 1250,
          description: "Strong college performance predicted",
          zScore: 1.0,
          interpretation: "Z = +1.0: One SD above mean. Competitive for most colleges."
        },
        {
          value: 1450,
          description: "Exceptional performance",
          zScore: 2.0,
          interpretation: "Z = +2.0: Two SD above mean. Highly competitive for top universities."
        }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Test Scores",
      mean: 80,
      sd: 10,
      unit: "points",
      value: 90,
      questionType: 'calculate',
      question: "What is the Z-score for a test score of 90?",
      options: [
        "Z = +0.5",
        "Z = +1.0",
        "Z = +1.5",
        "Z = +2.0"
      ],
      correctAnswer: "Z = +1.0",
      explanation: "Using the formula Z = (X - μ) / σ: Z = (90 - 80) / 10 = 10 / 10 = 1.0. This score is exactly 1 standard deviation above the mean.",
      skillFocus: "Calculating Z-scores using the basic formula"
    },
    {
      id: 2,
      scenario: "Heights",
      mean: 68,
      sd: 4,
      unit: "inches",
      value: 60,
      questionType: 'calculate',
      question: "What is the Z-score for a height of 60 inches?",
      options: [
        "Z = -1.5",
        "Z = -2.0",
        "Z = -2.5",
        "Z = -3.0"
      ],
      correctAnswer: "Z = -2.0",
      explanation: "Using Z = (X - μ) / σ: Z = (60 - 68) / 4 = -8 / 4 = -2.0. This height is 2 standard deviations below the mean.",
      skillFocus: "Calculating negative Z-scores for values below the mean"
    },
    {
      id: 3,
      scenario: "Reaction Times",
      mean: 250,
      sd: 25,
      unit: "milliseconds",
      value: 250,
      questionType: 'interpret',
      question: "What does a Z-score of 0.0 mean for a reaction time of 250ms?",
      options: [
        "This is an extremely slow reaction time",
        "This reaction time is exactly average",
        "This is an extremely fast reaction time",
        "This indicates a measurement error"
      ],
      correctAnswer: "This reaction time is exactly average",
      explanation: "Z = 0.0 means the value equals the mean exactly. When X = μ, then Z = (X - μ) / σ = 0. This person's reaction time is perfectly typical.",
      skillFocus: "Interpreting what Z = 0 means in practical terms"
    },
    {
      id: 4,
      scenario: "Test Performance",
      mean: 75,
      sd: 8,
      unit: "points",
      value: 67,
      questionType: 'meaning',
      question: "A student scored 67 points (Z = -1.0). What does this tell us about their performance?",
      options: [
        "They scored in the top 16% of students",
        "They scored in the bottom 16% of students",
        "They scored exactly average",
        "They failed the test"
      ],
      correctAnswer: "They scored in the bottom 16% of students",
      explanation: "Z = -1.0 means one standard deviation below the mean. Using the empirical rule, about 68% of scores fall within ±1 SD of the mean, leaving 32% outside. Half of that (16%) is below -1 SD.",
      skillFocus: "Connecting Z-scores to percentile rankings using the empirical rule"
    },
    {
      id: 5,
      scenario: "Quality Control",
      mean: 500,
      sd: 20,
      unit: "grams",
      value: 540,
      questionType: 'calculate',
      question: "A product weighs 540g. What is its Z-score?",
      options: [
        "Z = +1.5",
        "Z = +2.0",
        "Z = +2.5", 
        "Z = +3.0"
      ],
      correctAnswer: "Z = +2.0",
      explanation: "Z = (540 - 500) / 20 = 40 / 20 = 2.0. This product is 2 standard deviations above the target weight, which might indicate a process issue.",
      skillFocus: "Applying Z-score calculations to quality control scenarios"
    }
  ];

  const calculateZScore = (value: number, mean: number, sd: number): number => {
    return (value - mean) / sd;
  };

  const interpretZScore = (z: number): string => {
    if (z > 3) return "Extremely high - very rare (>99.9%)";
    if (z > 2) return "Very high - top 2.5%";
    if (z > 1) return "Above average - top 16%";
    if (z > 0) return "Slightly above average";
    if (z === 0) return "Exactly average";
    if (z > -1) return "Slightly below average";
    if (z > -2) return "Below average - bottom 16%";
    if (z > -3) return "Very low - bottom 2.5%";
    return "Extremely low - very rare (<0.1%)";
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

  // Game Screen
  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];
    const challengeZScore = calculateZScore(currentChallengeData.value, currentChallengeData.mean, currentChallengeData.sd);

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Z-Score Master Challenge</h1>
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
              <h2 className="text-xl font-semibold text-[#58595b] mb-4 text-center">
                📊 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#58595b]">{currentChallengeData.mean}</div>
                    <div className="text-sm text-gray-600">Mean (μ)</div>
                    <div className="text-xs text-gray-500">{currentChallengeData.unit}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#58595b]">{currentChallengeData.sd}</div>
                    <div className="text-sm text-gray-600">Std Dev (σ)</div>
                    <div className="text-xs text-gray-500">{currentChallengeData.unit}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{currentChallengeData.value}</div>
                    <div className="text-sm text-gray-600">Observed Value (X)</div>
                    <div className="text-xs text-gray-500">{currentChallengeData.unit}</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="font-bold text-blue-700 mb-2">Z-Score Formula</div>
                    <div className="text-blue-600 text-lg">Z = (X - μ) / σ</div>
                    <div className="text-sm text-blue-500 mt-1">
                      Z = ({currentChallengeData.value} - {currentChallengeData.mean}) / {currentChallengeData.sd} = ?
                    </div>
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
                  <p className="text-sm text-gray-500">Next challenge in 3 seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Game Results Screen
  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 3 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Z-Score Expert!' : score >= 3 ? 'Great Work!' : 'Keep Learning!'}
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
                Back to Chapter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main Content Screen
  const selectedZExample = examples[selectedExample];
  const calculatorZ = calculateZScore(
    parseFloat(calculatorValue) || 0,
    parseFloat(calculatorMean) || 0,
    parseFloat(calculatorSD) || 1
  );

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to The Normal Model
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="z-scores" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Z-Scores & Standardization</h1>
              <p className="text-xl text-gray-600 mt-2">
                Learn how to calculate Z-scores and understand how they relate to the mean and standard deviation!
              </p>
            </div>
          </div>
        </div>

        {/* Z-Score Formula & Concept */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Understanding Z-Scores</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-700 mb-4">Z = (X - μ) / σ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-blue-600 text-lg">X</div>
                    <div className="text-gray-600">Your observed value</div>
                    <div className="text-gray-500 text-xs">The actual measurement</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600 text-lg">μ (mu)</div>
                    <div className="text-gray-600">Population mean</div>
                    <div className="text-gray-500 text-xs">The average of all values</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-purple-600 text-lg">σ (sigma)</div>
                    <div className="text-gray-600">Standard deviation</div>
                    <div className="text-gray-500 text-xs">How spread out the data is</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">What Z-Scores Tell Us</h3>
                  <p className="text-yellow-600 mb-4">
                    A Z-score tells you how many standard deviations away from the mean your value is. It's like a universal measuring stick!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded border">
                      <div className="font-bold text-green-600">Z = 0</div>
                      <div className="text-gray-600">Right at the mean</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-bold text-blue-600">Z = +1</div>
                      <div className="text-gray-600">1 SD above mean</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-bold text-red-600">Z = -1</div>
                      <div className="text-gray-600">1 SD below mean</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Calculation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔢 Step-by-Step Z-Score Calculation</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-[#58595b] mb-4">Example: IQ Score of 115</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 p-4 rounded">
                  <div className="font-bold text-blue-700">X = 115</div>
                  <div className="text-blue-600 text-sm">Observed value</div>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <div className="font-bold text-green-700">μ = 100</div>
                  <div className="text-green-600 text-sm">Mean IQ</div>
                </div>
                <div className="bg-purple-100 p-4 rounded">
                  <div className="font-bold text-purple-700">σ = 15</div>
                  <div className="text-purple-600 text-sm">Standard deviation</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded border">
                  <div className="font-semibold text-gray-700">Step 1: Subtract the mean from your value</div>
                  <div className="text-lg">X - μ = 115 - 100 = 15</div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="font-semibold text-gray-700">Step 2: Divide by the standard deviation</div>
                  <div className="text-lg">Z = 15 ÷ 15 = 1.0</div>
                </div>
                
                <div className="bg-[#ff8200] text-white p-4 rounded">
                  <div className="font-semibold">Result: Z = +1.0</div>
                  <div className="text-sm">This IQ score is exactly 1 standard deviation above the mean!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 Interactive Z-Score Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#58595b]">Enter Your Values:</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Population Mean (μ)
                  </label>
                  <input
                    type="number"
                    value={calculatorMean}
                    onChange={(e) => setCalculatorMean(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                    placeholder="e.g., 100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Deviation (σ)
                  </label>
                  <input
                    type="number"
                    value={calculatorSD}
                    onChange={(e) => setCalculatorSD(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                    placeholder="e.g., 15"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observed Value (X)
                  </label>
                  <input
                    type="number"
                    value={calculatorValue}
                    onChange={(e) => setCalculatorValue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                    placeholder="e.g., 115"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#58595b]">Calculation Results:</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-[#ff8200] mb-2">
                    Z = {isNaN(calculatorZ) ? '---' : (calculatorZ > 0 ? '+' : '') + calculatorZ.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Z = ({calculatorValue} - {calculatorMean}) / {calculatorSD}
                  </div>
                  {!isNaN(calculatorZ) && (
                    <div className="text-sm text-gray-600">
                      = {parseFloat(calculatorValue) - parseFloat(calculatorMean)} / {calculatorSD} = {(calculatorZ > 0 ? '+' : '') + calculatorZ.toFixed(2)}
                    </div>
                  )}
                </div>
                
                {!isNaN(calculatorZ) && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border">
                      <div className="font-semibold text-gray-700 mb-2">Interpretation:</div>
                      <div className="text-gray-600 text-sm">
                        {interpretZScore(calculatorZ)}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="font-semibold text-gray-700 mb-2">Practical Meaning:</div>
                      <div className="text-gray-600 text-sm">
                        This value is {Math.abs(calculatorZ).toFixed(1)} standard deviations {calculatorZ >= 0 ? 'above' : 'below'} the mean.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Z-Score Examples</h2>
          
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

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedZExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedZExample.context}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{selectedZExample.mean}</div>
                  <div className="text-sm text-gray-600">Mean (μ)</div>
                  <div className="text-xs text-gray-500">{selectedZExample.unit}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{selectedZExample.standardDeviation}</div>
                  <div className="text-sm text-gray-600">Std Dev (σ)</div>
                  <div className="text-xs text-gray-500">{selectedZExample.unit}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">Normal</div>
                  <div className="text-sm text-gray-600">Distribution</div>
                  <div className="text-xs text-gray-500">Z-scores apply!</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Example Z-Score Calculations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedZExample.scenarios.map((scenario, index) => {
                  const colors = ['bg-red-50 border-red-200', 'bg-gray-50 border-gray-200', 'bg-green-50 border-green-200', 'bg-purple-50 border-purple-200'];
                  
                  return (
                    <div key={index} className={`${colors[index]} border rounded-lg p-4`}>
                      <div className="font-bold text-gray-700 mb-2">
                        {scenario.value} {selectedZExample.unit}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{scenario.description}</div>
                      
                      <div className="bg-white p-3 rounded border mb-3">
                        <div className="text-xs text-gray-500 mb-1">Calculation:</div>
                        <div className="text-sm font-mono">Z = ({scenario.value} - {selectedZExample.mean}) / {selectedZExample.standardDeviation}</div>
                        <div className="text-lg font-bold text-center mt-2">Z = {scenario.zScore > 0 ? '+' : ''}{scenario.zScore.toFixed(1)}</div>
                      </div>
                      
                      <div className="text-xs text-gray-600">{scenario.interpretation}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Z-Score Mastery Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Calculate Z-scores using the formula Z = (X - μ) / σ</li>
                <li>• Interpret what Z-scores mean in context</li>
                <li>• Connect Z-scores to percentile rankings</li>
                <li>• Apply Z-scores to real-world scenarios</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Z-score calculation fluency</li>
                <li>• Understanding standardization</li>
                <li>• Relating Z-scores to the empirical rule</li>
                <li>• Statistical reasoning and interpretation</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Z-Score Calculations
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
