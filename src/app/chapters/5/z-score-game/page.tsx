"use client";
import { useState } from 'react';
import Link from 'next/link';
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
  questionType: 'calculate' | 'interpret' | 'compare' | 'application';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function ZScoreGame() {
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
          interpretation: "Z = -1.0: One standard deviation below average. About 16% of people score lower."
        },
        {
          value: 115,
          description: "Above average performance", 
          interpretation: "Z = +1.0: One standard deviation above average. Top 16% of population."
        },
        {
          value: 130,
          description: "Gifted range",
          interpretation: "Z = +2.0: Two standard deviations above average. Top 2.5% - very rare ability."
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
          interpretation: "Z = -1.0: One SD below mean. Student may need additional preparation."
        },
        {
          value: 1250,
          description: "Strong college performance predicted",
          interpretation: "Z = +1.0: One SD above mean. Competitive for most colleges."
        },
        {
          value: 1450,
          description: "Exceptional performance",
          interpretation: "Z = +2.0: Two SD above mean. Highly competitive for top universities."
        }
      ]
    },
    {
      name: "Blood Pressure",
      context: "Systolic blood pressure measurements",
      mean: 120,
      standardDeviation: 20,
      unit: "mmHg",
      scenarios: [
        {
          value: 100,
          description: "Low-normal blood pressure",
          interpretation: "Z = -1.0: One SD below average. Generally healthy, possibly athletic."
        },
        {
          value: 140,
          description: "Borderline high",
          interpretation: "Z = +1.0: One SD above average. May warrant lifestyle changes."
        },
        {
          value: 160,
          description: "High blood pressure",
          interpretation: "Z = +2.0: Two SD above average. Likely requires medical intervention."
        }
      ]
    },
    {
      name: "Employee Performance",
      context: "Monthly sales performance ratings",
      mean: 75,
      standardDeviation: 12,
      unit: "out of 100",
      scenarios: [
        {
          value: 51,
          description: "Below expectations",
          interpretation: "Z = -2.0: Two SD below average. Performance improvement plan needed."
        },
        {
          value: 87,
          description: "Above average performance",
          interpretation: "Z = +1.0: One SD above average. Solid contributor to team."
        },
        {
          value: 99,
          description: "Exceptional performer",
          interpretation: "Z = +2.0: Two SD above average. Top 2.5% - promotion candidate."
        }
      ]
    },
    {
      name: "Manufacturing Quality",
      context: "Product weight specifications",
      mean: 500,
      standardDeviation: 8,
      unit: "grams",
      scenarios: [
        {
          value: 484,
          description: "Below specification",
          interpretation: "Z = -2.0: Two SD below target. Quality control issue - investigate process."
        },
        {
          value: 508,
          description: "Above target weight",
          interpretation: "Z = +1.0: One SD above target. Within acceptable range."
        },
        {
          value: 516,
          description: "Significantly overweight",
          interpretation: "Z = +2.0: Two SD above target. May indicate calibration problem."
        }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Test Scores",
      mean: 82,
      sd: 6,
      unit: "points",
      value: 94,
      questionType: 'calculate',
      question: "What is the Z-score for a test score of 94?",
      options: [
        "Z = +1.5",
        "Z = +2.0",
        "Z = +1.0",
        "Z = +2.5"
      ],
      correctAnswer: "Z = +2.0",
      explanation: "Z = (94 - 82) / 6 = 12 / 6 = 2.0. This score is exactly 2 standard deviations above the mean.",
      skillFocus: "Calculating Z-scores using the formula Z = (X - μ) / σ"
    },
    {
      id: 2,
      scenario: "Heights",
      mean: 68,
      sd: 3,
      unit: "inches",
      value: 62,
      questionType: 'interpret',
      question: "A height of 62 inches has Z = -2.0. What does this mean?",
      options: [
        "This height is extremely common",
        "This height is 2 standard deviations below average - quite short",
        "This height is exactly average for the population",
        "This height indicates a measurement error"
      ],
      correctAnswer: "This height is 2 standard deviations below average - quite short",
      explanation: "Z = -2.0 means this height is 2 standard deviations below the mean. Only about 2.5% of people are this short or shorter - it's quite unusual.",
      skillFocus: "Interpreting negative Z-scores and their practical meaning"
    },
    {
      id: 3,
      scenario: "Reaction Times",
      mean: 300,
      sd: 50,
      unit: "milliseconds",
      value: 225,
      questionType: 'compare',
      question: "How does a reaction time of 225ms compare to the population?",
      options: [
        "Slower than average (above mean)",
        "About average performance", 
        "Much faster than average (Z = -1.5)",
        "Extremely fast (Z = -3.0)"
      ],
      correctAnswer: "Much faster than average (Z = -1.5)",
      explanation: "Z = (225 - 300) / 50 = -75 / 50 = -1.5. This person reacts 1.5 standard deviations faster than average - quite quick reflexes!",
      skillFocus: "Comparing individual values to population using Z-scores"
    },
    {
      id: 4,
      scenario: "Quality Control",
      mean: 250,
      sd: 5,
      unit: "grams",
      value: 265,
      questionType: 'application',
      question: "A product weighs 265g. Your quality control rule flags items beyond Z = ±2.0. What action should you take?",
      options: [
        "Accept the product - within normal variation",
        "Flag for inspection - exceeds 2 SD limit (Z = +3.0)",
        "Reject immediately - clearly defective",
        "Recalibrate the scale - impossible reading"
      ],
      correctAnswer: "Flag for inspection - exceeds 2 SD limit (Z = +3.0)",
      explanation: "Z = (265 - 250) / 5 = 15 / 5 = 3.0. This exceeds your ±2.0 limit and should be flagged. A Z-score of 3.0 indicates a potential process problem.",
      skillFocus: "Applying Z-scores for quality control and decision-making"
    },
    {
      id: 5,
      scenario: "Student Performance",
      mean: 78,
      sd: 8,
      unit: "percent",
      value: 62,
      questionType: 'interpret',
      question: "A student scored 62%. How should this performance be characterized?",
      options: [
        "Slightly below average - minor concern",
        "Significantly below average (Z = -2.0) - needs intervention",
        "Average performance for this class",
        "Above average considering the difficulty"
      ],
      correctAnswer: "Significantly below average (Z = -2.0) - needs intervention",
      explanation: "Z = (62 - 78) / 8 = -16 / 8 = -2.0. This student is 2 standard deviations below average, indicating serious academic difficulty requiring intervention.",
      skillFocus: "Using Z-scores to identify students needing academic support"
    },
    {
      id: 6,
      scenario: "Sales Performance",
      mean: 15000,
      sd: 3000,
      unit: "dollars",
      value: 21000,
      questionType: 'compare',
      question: "Compare two employees: Employee A scored Z = +1.5, Employee B sold $21,000. Who performed better?",
      options: [
        "Employee A performed better",
        "Employee B performed better (Z = +2.0)",
        "They performed equally well",
        "Cannot determine without more information"
      ],
      correctAnswer: "Employee B performed better (Z = +2.0)",
      explanation: "Employee B: Z = (21000 - 15000) / 3000 = 6000 / 3000 = 2.0. Employee B's Z = +2.0 is higher than Employee A's Z = +1.5, indicating better relative performance.",
      skillFocus: "Comparing performance across individuals using standardized Z-scores"
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
    const challengeZScore = calculateZScore(currentChallengeData.value, currentChallengeData.mean, currentChallengeData.sd);

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

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                {/* Given Information */}
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
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
                    <div className="text-sm text-gray-600">Observed Value</div>
                    <div className="text-xs text-gray-500">{currentChallengeData.unit}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{challengeZScore.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Z-Score</div>
                    <div className="text-xs text-gray-500">standard deviations</div>
                  </div>
                </div>
                
                {/* Z-Score Formula Reminder */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="font-bold text-blue-700 mb-2">Z-Score Formula</div>
                    <div className="text-blue-600">Z = (X - μ) / σ</div>
                    <div className="text-sm text-blue-500 mt-1">
                      Z = ({currentChallengeData.value} - {currentChallengeData.mean}) / {currentChallengeData.sd} = {challengeZScore.toFixed(1)}
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
              {score >= 5 ? 'Z-Score Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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
                Chapter Complete!
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedZExample = examples[selectedExample];
  const calculatorZ = calculateZScore(
    parseFloat(calculatorValue) || 0,
    parseFloat(calculatorMean) || 0,
    parseFloat(calculatorSD) || 1
  );

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
              <span role="img" aria-label="calculator" className="text-4xl">🧮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Z-Score Calculator Game</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the standardization superpower! Learn to compare any value to any normal distribution using Z-scores.
              </p>
            </div>
          </div>
        </div>

        {/* Z-Score Formula & Concept */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 The Z-Score Formula</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Z = (X - μ) / σ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-blue-600">X</div>
                    <div className="text-gray-600">Your observed value</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600">μ (mu)</div>
                    <div className="text-gray-600">Population mean</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-purple-600">σ (sigma)</div>
                    <div className="text-gray-600">Standard deviation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">What Z-Scores Tell You</h3>
                  <p className="text-yellow-600">
                    Z-scores standardize values so you can compare apples to oranges! They tell you how many 
                    standard deviations away from the mean your value is, regardless of the original units.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-red-50 p-4 rounded-lg">
                <div className="font-bold text-red-600">Z < -2</div>
                <div className="text-sm text-red-500">Very Low</div>
                <div className="text-xs text-gray-500">Bottom 2.5%</div>
              </div>
              <div className="text-center bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-600">-2 < Z < 0</div>
                <div className="text-sm text-orange-500">Below Average</div>
                <div className="text-xs text-gray-500">16-50%</div>
              </div>
              <div className="text-center bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-600">0 < Z < +2</div>
                <div className="text-sm text-green-500">Above Average</div>
                <div className="text-xs text-gray-500">50-97.5%</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-600">Z > +2</div>
                <div className="text-sm text-purple-500">Very High</div>
                <div className="text-xs text-gray-500">Top 2.5%</div>
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
                  <div className="text-3xl font-bold text-[#ff8200] mb-2">
                    Z = {isNaN(calculatorZ) ? '---' : calculatorZ.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Z = ({calculatorValue} - {calculatorMean}) / {calculatorSD}
                  </div>
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
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Z-Score Applications</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedZExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedZExample.context}</p>
            </div>

            {/* Distribution Parameters */}
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
                  <div className="text-xs text-gray-500">68-95-99.7 rule applies</div>
                </div>
              </div>
            </div>

            {/* Scenarios */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Example Scenarios:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedZExample.scenarios.map((scenario, index) => {
                  const z = calculateZScore(scenario.value, selectedZExample.mean, selectedZExample.standardDeviation);
                  const colors = ['bg-red-50 border-red-200', 'bg-green-50 border-green-200', 'bg-purple-50 border-purple-200'];
                  
                  return (
                    <div key={index} className={`${colors[index]} border rounded-lg p-4`}>
                      <div className="font-bold text-gray-700 mb-2">
                        {scenario.value} {selectedZExample.unit}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{scenario.description}</div>
                      <div className="bg-white p-3 rounded border">
                        <div className="font-bold text-center text-lg">{z > 0 ? '+' : ''}{z.toFixed(1)}</div>
                        <div className="text-xs text-center text-gray-500">Z-Score</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">{scenario.interpretation}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📋 Z-Score Quick Reference</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-3">🔢 Calculation Steps</h4>
                <ol className="text-blue-600 text-sm space-y-1">
                  <li>1. Subtract the mean from your value (X - μ)</li>
                  <li>2. Divide by the standard deviation (÷ σ)</li>
                  <li>3. Interpret the result!</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-3">🎯 Interpretation Guide</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Z = 0: Exactly average</li>
                  <li>• Z = +1: One SD above average</li>
                  <li>• Z = -1: One SD below average</li>
                  <li>• |Z| > 2: Unusual value (top/bottom 2.5%)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-700 mb-3">💡 Pro Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-600 text-sm">
                <div>
                  <strong>Positive Z-scores:</strong> Above average values
                </div>
                <div>
                  <strong>Negative Z-scores:</strong> Below average values
                </div>
                <div>
                  <strong>Z-scores near 0:</strong> Close to average
                </div>
                <div>
                  <strong>Large |Z| values:</strong> Unusual observations
                </div>
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
                <li>• Calculate Z-scores using the formula</li>
                <li>• Interpret scores in real-world contexts</li>
                <li>• Compare values across different distributions</li>
                <li>• Apply Z-scores for decision-making</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Z-score calculation fluency</li>
                <li>• Standardization concepts</li>
                <li>• Percentile interpretation</li>
                <li>• Professional statistical reasoning</li>
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
