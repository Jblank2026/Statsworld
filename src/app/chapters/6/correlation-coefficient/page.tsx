"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface CorrelationExample {
  name: string;
  context: string;
  r: number;
  interpretation: string;
  strength: string;
  direction: string;
  practicalMeaning: string;
  data: Array<{ x: number; y: number }>;
}

interface Challenge {
  id: number;
  scenario: string;
  r: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function CorrelationCoefficient() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: CorrelationExample[] = [
    {
      name: "Height vs Weight",
      context: "Relationship between height and weight in adults",
      r: 0.85,
      interpretation: "Strong positive correlation",
      strength: "Strong",
      direction: "Positive",
      practicalMeaning: "As height increases, weight tends to increase significantly. This makes biological sense!",
      data: [
        { x: 65, y: 140 }, { x: 68, y: 160 }, { x: 70, y: 170 }, { x: 72, y: 190 }, { x: 75, y: 210 }
      ]
    },
    {
      name: "Study Hours vs Test Scores",
      context: "Hours studied per week vs final exam percentage",
      r: 0.72,
      interpretation: "Strong positive correlation",
      strength: "Strong",
      direction: "Positive",
      practicalMeaning: "More study time is strongly associated with higher test scores. Hard work pays off!",
      data: [
        { x: 5, y: 65 }, { x: 10, y: 75 }, { x: 15, y: 85 }, { x: 20, y: 90 }, { x: 25, y: 95 }
      ]
    },
    {
      name: "Temperature vs Ice Cream Sales",
      context: "Daily temperature vs ice cream sales",
      r: 0.68,
      interpretation: "Moderate positive correlation",
      strength: "Moderate",
      direction: "Positive",
      practicalMeaning: "Warmer days lead to higher ice cream sales, but other factors also matter (day of week, events, etc.)",
      data: [
        { x: 60, y: 200 }, { x: 70, y: 350 }, { x: 80, y: 500 }, { x: 90, y: 650 }, { x: 100, y: 800 }
      ]
    },
    {
      name: "Car Age vs Value",
      context: "Age of car in years vs resale value",
      r: -0.82,
      interpretation: "Strong negative correlation",
      strength: "Strong",
      direction: "Negative",
      practicalMeaning: "As cars get older, their value decreases significantly. Depreciation is real!",
      data: [
        { x: 1, y: 25000 }, { x: 3, y: 18000 }, { x: 5, y: 12000 }, { x: 8, y: 8000 }, { x: 12, y: 4000 }
      ]
    },
    {
      name: "Exercise vs Resting Heart Rate",
      context: "Weekly exercise hours vs resting heart rate",
      r: -0.65,
      interpretation: "Moderate negative correlation",
      strength: "Moderate",
      direction: "Negative",
      practicalMeaning: "More exercise is associated with lower resting heart rate. Fitness improves cardiovascular health!",
      data: [
        { x: 0, y: 80 }, { x: 2, y: 75 }, { x: 5, y: 68 }, { x: 8, y: 62 }, { x: 12, y: 58 }
      ]
    },
    {
      name: "Student ID vs GPA",
      context: "Random student ID numbers vs GPA",
      r: 0.03,
      interpretation: "Very weak correlation (essentially no relationship)",
      strength: "Very Weak",
      direction: "None",
      practicalMeaning: "Student ID numbers are random and have no meaningful relationship with academic performance.",
      data: [
        { x: 1001, y: 2.8 }, { x: 1234, y: 3.5 }, { x: 1567, y: 2.1 }, { x: 1890, y: 3.9 }, { x: 1999, y: 2.6 }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Height and shoe size correlation in adults",
      r: 0.89,
      question: "What does r = 0.89 tell us about the relationship between height and shoe size?",
      options: [
        "Strong positive correlation - taller people tend to have larger feet",
        "Perfect correlation - height exactly determines shoe size",
        "Weak correlation - height and shoe size are barely related",
        "Negative correlation - taller people have smaller feet"
      ],
      correctAnswer: "Strong positive correlation - taller people tend to have larger feet",
      explanation: "r = 0.89 indicates a strong positive correlation. Values close to +1.0 show strong positive relationships, meaning as one variable increases, the other tends to increase as well."
    },
    {
      id: 2,
      scenario: "Daily temperature and heating costs",
      r: -0.76,
      question: "What does r = -0.76 suggest about temperature and heating costs?",
      options: [
        "Strong positive correlation - warmer days mean higher heating costs",
        "No correlation - temperature doesn't affect heating costs",
        "Strong negative correlation - warmer days mean lower heating costs",
        "Perfect negative correlation - temperature exactly determines heating costs"
      ],
      correctAnswer: "Strong negative correlation - warmer days mean lower heating costs",
      explanation: "r = -0.76 shows a strong negative correlation. The negative sign indicates that as temperature increases, heating costs decrease, which makes perfect sense!"
    },
    {
      id: 3,
      scenario: "Random lottery numbers and winner income",
      r: 0.02,
      question: "What does r = 0.02 tell us about lottery numbers and winner income?",
      options: [
        "Strong positive correlation",
        "Moderate positive correlation", 
        "Essentially no correlation - the variables are unrelated",
        "Weak negative correlation"
      ],
      correctAnswer: "Essentially no correlation - the variables are unrelated",
      explanation: "r = 0.02 is very close to 0, indicating essentially no linear relationship. Lottery numbers are random and have no meaningful connection to winner income."
    },
    {
      id: 4,
      scenario: "Social media followers and happiness scores",
      r: 0.45,
      question: "How would you interpret r = 0.45 for followers vs happiness?",
      options: [
        "Strong positive correlation",
        "Moderate positive correlation - some relationship exists",
        "Perfect correlation",
        "No correlation"
      ],
      correctAnswer: "Moderate positive correlation - some relationship exists",
      explanation: "r = 0.45 indicates a moderate positive correlation. There's a noticeable relationship, but it's not overwhelmingly strong. Other factors besides followers likely influence happiness."
    },
    {
      id: 5,
      scenario: "Years of education and lifetime earnings",
      r: 0.91,
      question: "What does r = 0.91 suggest about education and earnings?",
      options: [
        "Weak relationship between education and earnings",
        "Education causes higher earnings",
        "Very strong positive correlation - education and earnings move together closely",
        "Perfect correlation - education exactly determines earnings"
      ],
      correctAnswer: "Very strong positive correlation - education and earnings move together closely",
      explanation: "r = 0.91 shows a very strong positive correlation. While correlation doesn't prove causation, this strong relationship suggests education and earnings are closely linked."
    },
    {
      id: 6,
      scenario: "Age of smartphone and battery life",
      r: -0.88,
      question: "What does r = -0.88 tell us about phone age and battery life?",
      options: [
        "Older phones have better battery life",
        "No relationship between age and battery",
        "Strong negative correlation - older phones tend to have worse battery life",
        "Weak negative correlation"
      ],
      correctAnswer: "Strong negative correlation - older phones tend to have worse battery life",
      explanation: "r = -0.88 indicates a strong negative correlation. As phones age, battery life tends to decrease significantly due to battery degradation over time."
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
                <h1 className="text-2xl font-bold text-[#58595b]">Correlation Expert</h1>
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
                📊 Correlation Analysis
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Scenario:</h4>
                  <p className="text-gray-600">{currentChallengeData.scenario}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">r = {currentChallengeData.r}</div>
                    <div className="text-sm text-blue-500">Correlation Coefficient</div>
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
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Correlation Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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
                Next Topic
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedCorrelationExample = examples[selectedExample];

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
              <span className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">The Correlation Coefficient (r)</h1>
              <p className="text-xl text-gray-600 mt-2">
                Unlock the power of 'r'! Master what correlation coefficients from -1 to +1 really mean, interpret strength and direction, and understand the mathematical properties of correlation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Understanding the r Value</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-700 mb-4">r: The Correlation Coefficient</h3>
              <p className="text-lg text-gray-600 mb-4">
                The correlation coefficient 'r' measures both the strength and direction of a linear relationship between two quantitative variables.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold text-red-600">Range: -1 to +1</div>
                  <div className="text-gray-600">Always between these bounds</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold text-blue-600">Direction</div>
                  <div className="text-gray-600">+ or - sign shows direction</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold text-green-600">Strength</div>
                  <div className="text-gray-600">Closer to ±1 = stronger</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-700 mb-3">Positive Correlation (+)</h4>
              <ul className="space-y-2 text-green-600 text-sm">
                <li>• r = +1.0: Perfect positive (impossible in real data)</li>
                <li>• r = +0.8 to +0.9: Very strong positive</li>
                <li>• r = +0.6 to +0.8: Strong positive</li>
                <li>• r = +0.3 to +0.6: Moderate positive</li>
                <li>• r = +0.1 to +0.3: Weak positive</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-bold text-red-700 mb-3">Negative Correlation (-)</h4>
              <ul className="space-y-2 text-red-600 text-sm">
                <li>• r = -1.0: Perfect negative (impossible in real data)</li>
                <li>• r = -0.8 to -0.9: Very strong negative</li>
                <li>• r = -0.6 to -0.8: Strong negative</li>
                <li>• r = -0.3 to -0.6: Moderate negative</li>
                <li>• r = -0.1 to -0.3: Weak negative</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <div className="text-center">
              <h4 className="font-bold text-gray-700 mb-2">No Correlation</h4>
              <p className="text-gray-600 text-sm">r ≈ 0 (typically -0.1 to +0.1): No linear relationship</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌟 Real-World r Examples</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedCorrelationExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedCorrelationExample.context}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                <div>
                  <div className="text-3xl font-bold text-[#ff8200]">
                    {selectedCorrelationExample.r > 0 ? '+' : ''}{selectedCorrelationExample.r}
                  </div>
                  <div className="text-sm text-gray-600">r Value</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#58595b]">{selectedCorrelationExample.strength}</div>
                  <div className="text-sm text-gray-600">Strength</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#58595b]">{selectedCorrelationExample.direction}</div>
                  <div className="text-sm text-gray-600">Direction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">
                    {selectedCorrelationExample.r > 0.7 ? '💪' : 
                     selectedCorrelationExample.r > 0.3 ? '👍' : 
                     selectedCorrelationExample.r < -0.7 ? '⬇️' :
                     selectedCorrelationExample.r < -0.3 ? '📉' : '🤷'}
                  </div>
                  <div className="text-sm text-gray-600">Visual</div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 font-medium">💡 What This Means:</p>
                <p className="text-blue-600 text-sm">{selectedCorrelationExample.practicalMeaning}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔬 Key Properties of r</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📏 Unit-Free</h3>
                <p className="text-gray-600 text-sm">
                  r has no units! Whether you measure height in inches or centimeters, the correlation with weight stays the same. 
                  This makes r perfect for comparing relationships across different scales.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">🔄 Symmetric</h3>
                <p className="text-gray-600 text-sm">
                  The correlation between X and Y equals the correlation between Y and X. 
                  Height vs weight gives the same r as weight vs height.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📈 Linear Only</h3>
                <p className="text-gray-600 text-sm">
                  r measures LINEAR relationships only! A perfect curved relationship might have r ≈ 0. 
                  Always look at the scatterplot first!
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">🚨 Outlier Sensitive</h3>
                <p className="text-gray-600 text-sm">
                  Extreme outliers can dramatically change r. One unusual point can make a strong correlation look weak, 
                  or create a false correlation where none exists.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Critical Reminder!</h3>
                  <p className="text-yellow-600">
                    <strong>Correlation ≠ Causation!</strong> Even if r = 0.95, this doesn't prove one variable causes the other. 
                    Strong correlations can result from confounding variables, reverse causation, or pure coincidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Master the Correlation Coefficient</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Challenge Yourself</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interpret r values from -1 to +1</li>
                <li>• Identify strength and direction</li>
                <li>• Apply to real-world scenarios</li>
                <li>• Understand what different r values mean</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Height and shoe size relationships</li>
                <li>• Temperature and heating costs</li>
                <li>• Education and earnings connections</li>
                <li>• Technology and performance metrics</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Correlation Coefficient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
