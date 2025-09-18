"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ChartType {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
}

interface Challenge {
  id: number;
  scenario: string;
  data: string; // This will be the image path
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  chartRecommendation: string;
}

export default function SegmentedBarCharts() {
  const [selectedChart, setSelectedChart] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const chartTypes: ChartType[] = [
    {
      name: "Stacked Bar Chart",
      description: "Bars are divided into segments stacked on top of each other, showing both totals and breakdowns by category.",
      pros: [
        "Shows total values clearly",
        "Easy to compare overall totals",
        "Good for part-to-whole relationships",
        "Works well with multiple categories"
      ],
      cons: [
        "Hard to compare middle segments",
        "Difficult to see precise values",
        "Can become cluttered",
        "Baseline shifts make comparison challenging"
      ]
    },
    {
      name: "Side-by-Side Pie Charts",
      description: "Multiple pie charts placed next to each other, allowing comparison of proportional breakdowns across groups.",
      pros: [
        "Shows proportions clearly within groups",
        "Easy to see part-to-whole relationships",
        "Familiar to most audiences",
        "Good for comparing compositions"
      ],
      cons: [
        "Difficult to compare across pies",
        "Takes up more space",
        "Can't see actual totals",
        "Hard with many categories"
      ]
    },
    {
      name: "Mosaic Plot",
      description: "Rectangle areas represent frequencies, with width and height showing the relationship between two categorical variables.",
      pros: [
        "Shows association strength visually",
        "Displays all data relationships",
        "Easy to spot patterns",
        "Compact representation"
      ],
      cons: [
        "Less familiar to audiences",
        "Can be complex to interpret",
        "Harder to read exact values",
        "May overwhelm beginners"
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Chart Identification Challenge",
      data: "/images/stackedbar.png",
      question: "What type of bivariate categorical display is shown in this image?",
      options: [
        "Stacked Bar Chart",
        "Side-by-Side Pie Charts",
        "Mosaic Plot",
        "Clustered Bar Chart"
      ],
      correctAnswer: "Stacked Bar Chart",
      explanation: "This is a stacked bar chart! Bars are divided into segments stacked on top of each other, showing both totals and breakdowns by category. The height shows the total while colored segments show the subcategories.",
      chartRecommendation: "Stacked Bar Chart"
    },
    {
      id: 2,
      scenario: "Display Recognition Challenge",
      data: "/images/sidebysidepie (1).png",
      question: "What type of bivariate categorical display is shown in this image?",
      options: [
        "Stacked Bar Chart",
        "Side-by-Side Pie Charts",
        "Mosaic Plot",
        "Clustered Bar Chart"
      ],
      correctAnswer: "Side-by-Side Pie Charts",
      explanation: "These are side-by-side pie charts! Multiple pie charts are placed next to each other, allowing comparison of proportional breakdowns across different groups while showing part-to-whole relationships clearly.",
      chartRecommendation: "Side-by-Side Pie Charts"
    },
    {
      id: 3,
      scenario: "Visualization Type Challenge",
      data: "/images/mosaic.png",
      question: "What type of bivariate categorical display is shown in this image?",
      options: [
        "Stacked Bar Chart",
        "Side-by-Side Pie Charts",
        "Mosaic Plot",
        "Clustered Bar Chart"
      ],
      correctAnswer: "Mosaic Plot",
      explanation: "This is a mosaic plot! Rectangle areas represent frequencies, with width and height showing the relationship between two categorical variables. The size of each rectangle shows the strength of association.",
      chartRecommendation: "Mosaic Plot"
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
    }, 5000);
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
            <Link href="/chapters/3" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Bivariate Categorical Displays
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Chart Identification Challenge</h1>
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
                <h3 className="font-semibold text-gray-700 mb-2">📈 Chart to Identify:</h3>
                <div className="flex justify-center mb-4">
                  <img
                    src={currentChallengeData.data}
                    alt="Chart to identify"
                    className="max-w-full h-auto rounded-lg shadow-md max-h-64"
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent!' : 'Not Quite'}
                  </h3>
                  <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                    Correct Answer: {currentChallengeData.correctAnswer}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-6">
                  <h4 className="font-semibold text-blue-700 mb-1">💡 Explanation:</h4>
                  <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Next challenge in 5 seconds...</p>
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
            <Link href="/chapters/3" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Bivariate Categorical Displays
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 3 ? '🎉' : score >= 2 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 3 ? 'Chart Master!' : score >= 2 ? 'Great Progress!' : 'Keep Practicing!'}
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
                href="/chapters/3"
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
          <Link href="/chapters/3" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Bivariate Categorical Displays
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="bivariate categorical displays" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Bivariate Categorical Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the art of comparing categorical relationships! Learn when to stack, cluster, or standardize your bars using segmented bar charts.
              </p>
            </div>
          </div>
        </div>

        {/* Chart Type Explorer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📈 Visualization Types</h2>
          
          {/* Chart Selection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {chartTypes.map((chart, index) => (
              <button
                key={index}
                onClick={() => setSelectedChart(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChart === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {chart.name}
              </button>
            ))}
          </div>

          {/* Selected Chart Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#58595b] mb-2">{chartTypes[selectedChart].name}</h3>
              <p className="text-gray-600">{chartTypes[selectedChart].description}</p>
            </div>

            {/* Chart Example Image */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-[#58595b] mb-4">📸 Real Example</h4>
              <div className="flex justify-center">
                {selectedChart === 0 && (
                  <img
                    src="/images/stackedbar.png"
                    alt="Stacked Bar Chart Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 1 && (
                  <img
                    src="/images/sidebysidepie (1).png"
                    alt="Side-by-Side Pie Charts Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 2 && (
                  <img
                    src="/images/mosaic.png"
                    alt="Mosaic Plot Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-700 mb-2">⭐ Key Characteristics</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-700 mb-2">✅ Pros:</h5>
                  <ul className="text-green-600 text-sm space-y-1">
                    {chartTypes[selectedChart].pros.map((pro, index) => (
                      <li key={index}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-red-700 mb-2">❌ Cons:</h5>
                  <ul className="text-red-600 text-sm space-y-1">
                    {chartTypes[selectedChart].cons.map((con, index) => (
                      <li key={index}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Chart Identification Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Look at the chart image</li>
                <li>• Identify the visualization type</li>
                <li>• Choose the correct answer</li>
                <li>• Learn from detailed explanations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Visual recognition of display types</li>
                <li>• Understanding chart characteristics</li>
                <li>• Distinguishing between similar displays</li>
                <li>• Applying learned concepts</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}