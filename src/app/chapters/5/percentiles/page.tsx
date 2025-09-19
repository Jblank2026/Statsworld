"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface PercentileExample {
  name: string;
  context: string;
  mean: number;
  standardDeviation: number;
  unit: string;
  coolFact: string;
  scenarios: Array<{
    value: number;
    description: string;
    zScore: number;
    percentile: number;
    interpretation: string;
  }>;
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

export default function Percentiles() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: PercentileExample[] = [
    {
      name: "SAT Test Scores",
      context: "College entrance exam results",
      mean: 1050,
      standardDeviation: 200,
      unit: "points",
      coolFact: "A score at the 90th percentile means you did better than 90% of all test takers!",
      scenarios: [
        {
          value: 850,
          description: "Below average score",
          zScore: -1.0,
          percentile: 16,
          interpretation: "Better than only 16% of test takers"
        },
        {
          value: 1050,
          description: "Average score",
          zScore: 0.0,
          percentile: 50,
          interpretation: "Right at the median - better than half"
        },
        {
          value: 1250,
          description: "Strong score",
          zScore: 1.0,
          percentile: 84,
          interpretation: "Better than 84% of test takers"
        },
        {
          value: 1450,
          description: "Excellent score",
          zScore: 2.0,
          percentile: 97.5,
          interpretation: "Better than 97.5% - top 2.5%!"
        }
      ]
    },
    {
      name: "Video Game Reaction Times",
      context: "Milliseconds to respond",
      mean: 250,
      standardDeviation: 50,
      unit: "ms",
      coolFact: "Esports pros often have reaction times in the 5th percentile - faster than 95% of players!",
      scenarios: [
        {
          value: 350,
          description: "Slow reactions",
          zScore: 2.0,
          percentile: 97.5,
          interpretation: "Slower than 97.5% of players"
        },
        {
          value: 300,
          description: "Below average",
          zScore: 1.0,
          percentile: 84,
          interpretation: "Slower than 84% of players"
        },
        {
          value: 250,
          description: "Average reactions",
          zScore: 0.0,
          percentile: 50,
          interpretation: "Right at the median"
        },
        {
          value: 200,
          description: "Fast reactions",
          zScore: -1.0,
          percentile: 16,
          interpretation: "Faster than 84% of players"
        },
        {
          value: 150,
          description: "Pro-level speed",
          zScore: -2.0,
          percentile: 2.5,
          interpretation: "Faster than 97.5% - top 2.5%!"
        }
      ]
    },
    {
      name: "Social Media Followers",
      context: "Instagram follower counts",
      mean: 500,
      standardDeviation: 200,
      unit: "followers",
      coolFact: "Having 900+ followers puts you in the 95th percentile - you're an influencer!",
      scenarios: [
        {
          value: 100,
          description: "New account",
          zScore: -2.0,
          percentile: 2.5,
          interpretation: "More than only 2.5% of accounts"
        },
        {
          value: 300,
          description: "Growing account",
          zScore: -1.0,
          percentile: 16,
          interpretation: "More than 16% of accounts"
        },
        {
          value: 500,
          description: "Average influence",
          zScore: 0.0,
          percentile: 50,
          interpretation: "Right at the median"
        },
        {
          value: 700,
          description: "Popular account",
          zScore: 1.0,
          percentile: 84,
          interpretation: "More than 84% of accounts"
        },
        {
          value: 900,
          description: "Influencer status",
          zScore: 2.0,
          percentile: 97.5,
          interpretation: "More than 97.5% - top 2.5%!"
        }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Test Scores",
      description: "Emma scored in the 75th percentile on her exam.",
      question: "What does this percentile tell us about Emma's performance?",
      options: [
        "She scored 75% correct on the exam",
        "She did better than 75% of students who took the exam",
        "She got a grade of 75 out of 100",
        "25% of her answers were wrong"
      ],
      correctAnswer: "She did better than 75% of students who took the exam",
      explanation: "The 75th percentile means Emma performed better than 75% of all students. It doesn't tell us her actual score, just her relative ranking!"
    },
    {
      id: 2,
      scenario: "Height Measurements",
      description: "A basketball player is at the 95th percentile for height.",
      question: "How should we interpret this percentile?",
      options: [
        "He is 95% as tall as the tallest person",
        "He is taller than 95% of people",
        "He is 95 inches tall",
        "His height is 95% of the average"
      ],
      correctAnswer: "He is taller than 95% of people",
      explanation: "Being at the 95th percentile for height means this player is taller than 95% of people in the comparison group. Only 5% are taller!"
    },
    {
      id: 3,
      scenario: "Income Distribution",
      description: "The median household income represents the 50th percentile.",
      question: "What does this mean about families at the median income?",
      options: [
        "They earn exactly 50% of the maximum income",
        "Half of families earn more, half earn less",
        "They are in the middle class",
        "They earn 50% of what rich families earn"
      ],
      correctAnswer: "Half of families earn more, half earn less",
      explanation: "The 50th percentile (median) is the point where exactly half the families earn more and half earn less. It divides the distribution in half!"
    },
    {
      id: 4,
      scenario: "App Download Speeds",
      description: "Your internet speed is at the 25th percentile.",
      question: "What does this suggest about your connection quality?",
      options: [
        "Your speed is 25% of the maximum possible",
        "You have faster speeds than 25% of users",
        "Your connection is poor - 75% of users are faster",
        "You download 25% slower than average"
      ],
      correctAnswer: "Your connection is poor - 75% of users are faster",
      explanation: "25th percentile means you're faster than only 25% of users, so 75% have better speeds than you. Time to upgrade your internet!"
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
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Percentile Challenge</h1>
                <p className="text-gray-600">Question {currentChallenge + 1} of {challenges.length}</p>
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
                📊 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="text-center mb-4">
                  <div className="text-lg text-gray-700 mb-4">{currentChallengeData.description}</div>
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent!' : 'Not Quite!'}
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
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 3 ? '🎉' : score >= 2 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 3 ? 'Percentile Expert!' : score >= 2 ? 'Great Work!' : 'Keep Learning!'}
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
      </div>
    );
  }

  const currentExample = examples[selectedExample];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to The Normal Model
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Understanding Percentiles</h1>
              <p className="text-xl text-gray-600 mt-2">
                Discover what percentiles really mean! Learn how they connect to Z-scores and reveal where you rank compared to everyone else.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 What Are Percentiles?</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Percentiles Tell You Your Rank!</h3>
                <p className="text-gray-600">
                  A percentile shows what percentage of people scored below you. It's like finding out where you stand in a line of 100 people!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-red-50 p-4 rounded-lg">
                <div className="font-bold text-red-600">25th</div>
                <div className="text-sm text-red-500">Bottom Quarter</div>
                <div className="text-xs text-gray-500">25% below you</div>
              </div>
              <div className="text-center bg-yellow-50 p-4 rounded-lg">
                <div className="font-bold text-yellow-600">50th</div>
                <div className="text-sm text-yellow-500">Median</div>
                <div className="text-xs text-gray-500">Half below you</div>
              </div>
              <div className="text-center bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-600">75th</div>
                <div className="text-sm text-green-500">Top Quarter</div>
                <div className="text-xs text-gray-500">75% below you</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-600">90th</div>
                <div className="text-sm text-purple-500">Top 10%</div>
                <div className="text-xs text-gray-500">90% below you</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Key Insight</h3>
                  <p className="text-yellow-600">
                    The 80th percentile doesn't mean you got 80% correct! It means you did better than 80% of people who took the same test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔗 Connection to Z-Scores</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Z-Scores → Percentiles Magic!</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Common Z-Score to Percentile Conversions:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span className="font-medium">Z = -2.0</span>
                      <span className="text-red-600">2.5th percentile</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span className="font-medium">Z = -1.0</span>
                      <span className="text-orange-600">16th percentile</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span className="font-medium">Z = 0.0</span>
                      <span className="text-gray-600">50th percentile</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span className="font-medium">Z = +1.0</span>
                      <span className="text-green-600">84th percentile</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded">
                      <span className="font-medium">Z = +2.0</span>
                      <span className="text-blue-600">97.5th percentile</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 mb-2">🧮 The Process</h4>
                  <ol className="text-blue-600 text-sm space-y-1">
                    <li>1. Calculate your Z-score</li>
                    <li>2. Use Z-score tables or formulas</li>
                    <li>3. Find your percentile rank</li>
                    <li>4. Understand what it means!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌟 Real-World Percentile Examples</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{currentExample.name}</h3>
              <p className="text-gray-600 mb-4">{currentExample.context}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{currentExample.mean}</div>
                  <div className="text-sm text-gray-600">Mean</div>
                  <div className="text-xs text-gray-500">{currentExample.unit}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{currentExample.standardDeviation}</div>
                  <div className="text-sm text-gray-600">Std Dev</div>
                  <div className="text-xs text-gray-500">{currentExample.unit}</div>
                </div>
                <div className="text-2xl font-bold text-[#ff8200]">Rankings</div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-orange-700 font-medium">🔥 Cool Fact:</p>
                <p className="text-orange-600 text-sm">{currentExample.coolFact}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Percentile Examples:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentExample.scenarios.map((scenario, index) => {
                  const colors = [
                    'bg-red-50 border-red-200', 
                    'bg-orange-50 border-orange-200',
                    'bg-gray-50 border-gray-200', 
                    'bg-green-50 border-green-200',
                    'bg-blue-50 border-blue-200'
                  ];
                  
                  return (
                    <div key={index} className={`${colors[index] || 'bg-purple-50 border-purple-200'} border rounded-lg p-4`}>
                      <div className="font-bold text-gray-700 mb-2">
                        {scenario.value} {currentExample.unit}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{scenario.description}</div>
                      
                      <div className="bg-white p-3 rounded border mb-2">
                        <div className="text-xs text-gray-500 mb-1">Percentile:</div>
                        <div className="font-bold text-center text-lg text-[#ff8200]">
                          {scenario.percentile}th
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-1">Z-Score: {scenario.zScore > 0 ? '+' : ''}{scenario.zScore.toFixed(1)}</div>
                      <div className="text-xs text-blue-600 font-medium">{scenario.interpretation}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Test Your Percentile Knowledge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Master These Skills</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interpret percentile rankings correctly</li>
                <li>• Connect percentiles to real-world meaning</li>
                <li>• Understand relative vs absolute performance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Practice Scenarios</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Test scores and class rankings</li>
                <li>• Height and physical measurements</li>
                <li>• Income and social comparisons</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Start Percentile Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
