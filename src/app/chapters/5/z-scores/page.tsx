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
  coolFact: string;
  scenarios: Array<{
    value: number;
    description: string;
    zScore: number;
    interpretation: string;
    percentile: string;
  }>;
}

interface Challenge {
  id: number;
  scenario: string;
  mean: number;
  sd: number;
  unit: string;
  value: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function ZScores() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: ZScoreExample[] = [
    {
      name: "NBA Player Heights",
      context: "Professional basketball players",
      mean: 79,
      standardDeviation: 3.5,
      unit: "inches",
      coolFact: "Shaq was 85 inches tall - that's a Z-score of +1.7! Only about 4.5% of NBA players are taller!",
      scenarios: [
        {
          value: 72,
          description: "Point guard height",
          zScore: -2.0,
          interpretation: "Very short for NBA",
          percentile: "Bottom 2.5% of players"
        },
        {
          value: 79,
          description: "Average NBA height",
          zScore: 0.0,
          interpretation: "Perfectly average",
          percentile: "50th percentile"
        },
        {
          value: 82.5,
          description: "Center height",
          zScore: +1.0,
          interpretation: "Tall even for NBA",
          percentile: "Top 16% of players"
        }
      ]
    },
    {
      name: "Netflix Binge Sessions",
      context: "Hours watched per weekend",
      mean: 8,
      standardDeviation: 2.5,
      unit: "hours",
      coolFact: "Someone watching 13+ hours has Z > +2.0 - they're in the top 2.5% of binge watchers!",
      scenarios: [
        {
          value: 3,
          description: "Light viewer",
          zScore: -2.0,
          interpretation: "Way below average",
          percentile: "Bottom 2.5% of viewers"
        },
        {
          value: 8,
          description: "Typical binger",
          zScore: 0.0,
          interpretation: "Right at the mean",
          percentile: "50th percentile"
        },
        {
          value: 10.5,
          description: "Heavy binger",
          zScore: +1.0,
          interpretation: "Above average viewing",
          percentile: "Top 16% of viewers"
        }
      ]
    },
    {
      name: "TikTok Video Lengths",
      context: "Seconds per viral video",
      mean: 45,
      standardDeviation: 15,
      unit: "seconds",
      coolFact: "Videos under 15 seconds (Z = -2.0) or over 75 seconds (Z = +2.0) are statistically unusual!",
      scenarios: [
        {
          value: 30,
          description: "Quick clip",
          zScore: -1.0,
          interpretation: "Shorter than average",
          percentile: "16th percentile"
        },
        {
          value: 45,
          description: "Perfect length",
          zScore: 0.0,
          interpretation: "Exactly average",
          percentile: "50th percentile"
        },
        {
          value: 60,
          description: "Longer content",
          zScore: +1.0,
          interpretation: "Above average length",
          percentile: "84th percentile"
        }
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Gaming High Scores",
      mean: 15000,
      sd: 3000,
      unit: "points",
      value: 21000,
      question: "What's the Z-score for a gaming score of 21,000 points?",
      options: [
        "Z = +1.5",
        "Z = +2.0",
        "Z = +2.5",
        "Z = +1.0"
      ],
      correctAnswer: "Z = +2.0",
      explanation: "Z = (21000 - 15000) / 3000 = 6000 / 3000 = 2.0. This gamer is 2 standard deviations above average - top 2.5% performance!"
    },
    {
      id: 2,
      scenario: "Coffee Consumption",
      mean: 3,
      sd: 1.2,
      unit: "cups per day",
      value: 1.8,
      question: "Someone drinks 1.8 cups of coffee daily. How does this compare to the average?",
      options: [
        "Exactly average (Z = 0)",
        "Slightly above average",
        "Below average (Z = -1.0)",
        "Way below average"
      ],
      correctAnswer: "Below average (Z = -1.0)",
      explanation: "Z = (1.8 - 3.0) / 1.2 = -1.2 / 1.2 = -1.0. This person drinks 1 standard deviation less coffee than average - bottom 16%!"
    },
    {
      id: 3,
      scenario: "Social Media Posts",
      mean: 12,
      sd: 4,
      unit: "posts per week",
      value: 20,
      question: "A user posts 20 times per week. What does their Z-score tell us?",
      options: [
        "They're a typical user",
        "Z = +2.0: Very active poster (top 2.5%)",
        "Z = +1.5: Moderately active",
        "Z = +3.0: Extremely active"
      ],
      correctAnswer: "Z = +2.0: Very active poster (top 2.5%)",
      explanation: "Z = (20 - 12) / 4 = 8 / 4 = 2.0. This user posts 2 standard deviations more than average - they're in the top 2.5% most active!"
    }
  ];

  const calculateZScore = (value: number, mean: number, sd: number): number => {
    return (value - mean) / sd;
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
                <h1 className="text-2xl font-bold text-[#58595b]">Z-Score Challenge</h1>
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
                    <div className="text-sm text-gray-600">Observed Value</div>
                    <div className="text-xs text-gray-500">{currentChallengeData.unit}</div>
                  </div>
                </div>
                
                
                <div className="border-l-4 border-[#ff8200] pl-4 mt-4">
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Correct!' : 'Not Quite!'}
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
              {score >= 2 ? '🎉' : score >= 1 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 2 ? 'Z-Score Master!' : score >= 1 ? 'Good Work!' : 'Keep Learning!'}
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

  const selectedZExample = examples[selectedExample];

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
              <span className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Z-Score Calculations</h1>
              <p className="text-xl text-gray-600 mt-2">
                Discover how Z-scores reveal where you stand! Master the relationship between any value and the mean & standard deviation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 The Z-Score Magic Formula</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-700 mb-4">Z = (X - μ) / σ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold text-blue-600">X</div>
                  <div className="text-gray-600">Your value</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold text-green-600">μ (mu)</div>
                  <div className="text-gray-600">Mean</div>
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
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="font-bold text-yellow-700 mb-2">What This Means</h3>
                <p className="text-yellow-600">
                  Z-scores tell you how many standard deviations you are from the mean. 
                  Positive = above average, Negative = below average, Zero = exactly average!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌟 Cool Z-Score Examples</h2>
          
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
                <div className="text-2xl font-bold text-[#ff8200]">Z-Scores</div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-orange-700 font-medium">🔥 Cool Fact:</p>
                <p className="text-orange-600 text-sm">{selectedZExample.coolFact}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Z-Score Examples:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedZExample.scenarios.map((scenario, index) => {
                  const colors = ['bg-red-50 border-red-200', 'bg-gray-50 border-gray-200', 'bg-green-50 border-green-200'];
                  
                  return (
                    <div key={index} className={`${colors[index]} border rounded-lg p-4`}>
                      <div className="font-bold text-gray-700 mb-2">
                        {scenario.value} {selectedZExample.unit}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{scenario.description}</div>
                      
                      <div className="bg-white p-3 rounded border mb-2">
                        <div className="text-xs text-gray-500 mb-1">Z-Score:</div>
                        <div className="font-bold text-center text-lg text-[#ff8200]">
                          {scenario.zScore > 0 ? '+' : ''}{scenario.zScore.toFixed(1)}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-1">{scenario.interpretation}</div>
                      <div className="text-xs text-blue-600 font-medium">{scenario.percentile}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Test Your Z-Score Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Challenge Yourself</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Calculate Z-scores step by step</li>
                <li>• Interpret real-world scenarios</li>
                <li>• Master the mean & SD relationship</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Gaming scores and rankings</li>
                <li>• Social media usage patterns</li>
                <li>• Daily life measurements</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Start Z-Score Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
