"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface DisplayType {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
}

interface Challenge {
  id: number;
  scenario: string;
  data: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  displayRecommendation: string;
}

export default function ComparisonDisplays() {
  const [selectedDisplayType, setSelectedDisplayType] = useState<'stacked' | 'boxplots'>('stacked');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const displayTypes: DisplayType[] = [
    {
      name: "Stacked Histograms",
      description: "Multiple groups shown on the same plot with different colors, allowing direct comparison of distributions.",
      pros: [
        "Easy to compare centers and shapes",
        "Shows overlap between groups clearly",
        "Compact display of multiple groups",
        "Good for spotting patterns across groups"
      ],
      cons: [
        "Can become cluttered with many groups",
        "Difficult to read exact frequencies",
        "Colors may be hard to distinguish",
        "Overlapping areas can be confusing"
      ]
    },
    {
      name: "Side-by-Side Box Plots",
      description: "Box plots placed next to each other, showing five-number summaries and outliers for easy comparison.",
      pros: [
        "Shows median, quartiles, and outliers clearly",
        "Easy to compare centers and spreads",
        "Handles many groups efficiently",
        "Identifies outliers in each group"
      ],
      cons: [
        "Doesn't show distribution shape details",
        "May hide multimodal distributions",
        "Less intuitive for general audiences",
        "Can't see individual data points"
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Chart Identification Challenge",
      data: "/images/stackedhistogram.png",
      question: "What type of comparison display is shown in this image?",
      options: [
        "Stacked Histograms",
        "Side-by-Side Box Plots",
        "Pie Charts",
        "Scatter Plot"
      ],
      correctAnswer: "Stacked Histograms",
      explanation: "This is a Stacked Histogram (also called overlapping histograms). Multiple groups are displayed on the same plot using different colors, allowing comparison of their distributions.",
      displayRecommendation: "Stacked Histograms"
    },
    {
      id: 2,
      scenario: "Display Recognition Challenge",
      data: "/images/sidebysidebox.png",
      question: "What type of comparison display is shown in this image?",
      options: [
        "Stacked Histograms",
        "Side-by-Side Box Plots",
        "Bar Charts",
        "Line Graph"
      ],
      correctAnswer: "Side-by-Side Box Plots",
      explanation: "These are Side-by-Side Box Plots. Each box shows the five-number summary (min, Q1, median, Q3, max) for different groups, making it easy to compare centers, spreads, and outliers.",
      displayRecommendation: "Side-by-Side Box Plots"
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
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Comparison Display Challenge</h1>
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

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                {/* Display the chart image */}
                <div className="mb-6 text-center">
                  <Image
                    src={currentChallengeData.data}
                    alt="Chart to identify"
                    width={500}
                    height={350}
                    className="mx-auto rounded-lg border border-gray-300"
                  />
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
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 2 ? '🎉' : score >= 1 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 2 ? 'Display Expert!' : score >= 1 ? 'Great Work!' : 'Keep Learning!'}
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
                href="/chapters/4"
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

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Comparing Distributions
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="comparison displays" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Comparison Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the art of comparing multiple groups! Learn when to use stacked histograms vs. side-by-side box plots.
              </p>
            </div>
          </div>
        </div>

        {/* Display Type Explorer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Display Type Explorer</h2>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedDisplayType('stacked')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDisplayType === 'stacked'
                  ? 'bg-[#ff8200] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Stacked Histograms
            </button>
            <button
              onClick={() => setSelectedDisplayType('boxplots')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDisplayType === 'boxplots'
                  ? 'bg-[#ff8200] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Side-by-Side Box Plots
            </button>
          </div>

          {/* Display Content */}
          <div className="space-y-6">
            {selectedDisplayType === 'stacked' && (
              <div>
                <div className="mb-6 text-center">
                  <Image
                    src="/images/stackedhistogram.png"
                    alt="Stacked Histogram example"
                    width={500}
                    height={350}
                    className="mx-auto rounded-lg border border-gray-300"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">Stacked Histograms</h3>
                  <p className="text-gray-600 mb-4">{displayTypes[0].description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-700 mb-2">✅ Pros</h4>
                    <ul className="text-green-600 text-sm space-y-1">
                      {displayTypes[0].pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-700 mb-2">❌ Cons</h4>
                    <ul className="text-red-600 text-sm space-y-1">
                      {displayTypes[0].cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedDisplayType === 'boxplots' && (
              <div>
                <div className="mb-6 text-center">
                  <Image
                    src="/images/sidebysidebox.png"
                    alt="Side-by-Side Box Plots example"
                    width={500}
                    height={350}
                    className="mx-auto rounded-lg border border-gray-300"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">Side-by-Side Box Plots</h3>
                  <p className="text-gray-600 mb-4">{displayTypes[1].description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-700 mb-2">✅ Pros</h4>
                    <ul className="text-green-600 text-sm space-y-1">
                      {displayTypes[1].pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-700 mb-2">❌ Cons</h4>
                    <ul className="text-red-600 text-sm space-y-1">
                      {displayTypes[1].cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Display Identification Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Look at comparison display images</li>
                <li>• Identify the type of visualization</li>
                <li>• Learn when to use each display method</li>
                <li>• Master visual recognition skills</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Display type identification</li>
                <li>• Understanding pros and cons</li>
                <li>• Choosing appropriate visualizations</li>
                <li>• Comparing multiple groups effectively</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Comparison Displays
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
