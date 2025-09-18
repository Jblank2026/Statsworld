"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ChartType {
  name: string;
  description: string;
  bestFor: string;
  avoidWhen: string;
  example: string;
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
  chartRecommendation: string;
}

export default function CategoricalDisplays() {
  const [selectedChart, setSelectedChart] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const chartTypes: ChartType[] = [
    {
      name: "Bar Chart",
      description: "Displays categorical data using rectangular bars with heights or lengths proportional to the frequency or count of each category.",
      bestFor: "Comparing quantities across different categories, especially when you have many categories or when precise comparisons are important.",
      avoidWhen: "You want to show parts of a whole (use pie chart instead) or when categories have a natural order that bars might obscure.",
      example: "Comparing sales by product category, survey responses by department, or social media engagement by platform.",
      pros: [
        "Easy to read and compare values",
        "Works well with many categories", 
        "Can be horizontal or vertical",
        "Precise value comparisons possible"
      ],
      cons: [
        "Doesn't show part-to-whole relationships",
        "Can become cluttered with too many categories",
        "May not emphasize overall total"
      ]
    },
    {
      name: "Pie Chart",
      description: "Divides a circle into slices to show how different categories contribute to the whole, with each slice representing a proportion of the total.",
      bestFor: "Showing parts of a whole when you have 6 or fewer categories and want to emphasize proportional relationships.",
      avoidWhen: "You have many categories, need precise comparisons, or when differences between categories are small.",
      example: "Budget allocation by department, market share by company, or time spent on different activities during a day.",
      pros: [
        "Shows part-to-whole relationships clearly",
        "Immediate visual impact",
        "Good for proportional thinking",
        "Familiar to most audiences"
      ],
      cons: [
        "Difficult to compare similar-sized slices",
        "Becomes unreadable with many categories",
        "Hard to show precise values",
        "Can be misleading if not starting at 0"
      ]
    },
    {
      name: "Pareto Chart",
      description: "A bar chart sorted in descending order, often combined with a cumulative percentage line, following the 80/20 principle.",
      bestFor: "Identifying the most significant categories and focusing attention on the vital few that contribute most to the total.",
      avoidWhen: "The natural order of categories is more important than their relative sizes, or when all categories are roughly equal.",
      example: "Quality control defects by type, customer complaints by category, or sales performance by region.",
      pros: [
        "Highlights most important categories",
        "Shows cumulative impact",
        "Helps prioritize efforts",
        "Follows proven 80/20 principle"
      ],
      cons: [
        "May hide important patterns in original order",
        "Not suitable when order matters",
        "Can oversimplify complex relationships"
      ]
    },
    {
      name: "Frequency Table",
      description: "A systematic way of organizing categorical data showing each category and its count or frequency, often including relative frequencies (percentages).",
      bestFor: "Providing exact counts and percentages, serving as a foundation for other visualizations, or when precise values are needed.",
      avoidWhen: "You need immediate visual impact or when your audience prefers graphical over tabular information.",
      example: "Survey responses by category, demographic breakdowns, or error types with counts and percentages.",
      pros: [
        "Shows exact values and percentages",
        "Compact and precise",
        "Easy to calculate additional statistics",
        "Professional appearance"
      ],
      cons: [
        "Less immediate visual impact",
        "Can be boring for presentations",
        "Harder to spot patterns quickly",
        "May overwhelm with too much detail"
      ]
    },
    {
      name: "Ring Chart",
      description: "Similar to a pie chart but with a hollow center, showing categorical data as segments of a ring to represent parts of a whole.",
      bestFor: "Showing proportional relationships with a modern aesthetic, or when you want to include additional information in the center space.",
      avoidWhen: "You have many categories, need precise comparisons, or when the hollow center might confuse the audience.",
      example: "Budget allocation visualization, market share analysis, or survey response breakdowns with modern presentation needs.",
      pros: [
        "Modern, clean appearance",
        "Shows part-to-whole relationships",
        "Center space for additional info",
        "Good visual hierarchy"
      ],
      cons: [
        "Similar issues to pie charts",
        "Less familiar to some audiences",
        "Center space can be distracting",
        "May seem trendy over functional"
      ]
    },
    {
      name: "Relative Frequency Table",
      description: "A table showing both counts and percentages for each category, emphasizing the relative proportion of each category compared to the total.",
      bestFor: "When you need both absolute counts and relative percentages, or for statistical analysis that requires precise proportional data.",
      avoidWhen: "You need quick visual impact or when presenting to audiences who prefer graphical over tabular information.",
      example: "Research reports with statistical breakdowns, academic presentations, or detailed data analysis requiring both counts and percentages.",
      pros: [
        "Shows both counts and percentages",
        "Precise statistical information",
        "Foundation for further analysis",
        "Professional statistical format"
      ],
      cons: [
        "No immediate visual impact",
        "Can appear dry or academic",
        "Requires more reading time",
        "Less engaging for presentations"
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Chart Identification Challenge",
      data: "/images/barchart.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Bar Chart",
        "Pie Chart", 
        "Pareto Chart",
        "Frequency Table"
      ],
      correctAnswer: "Bar Chart",
      explanation: "This is a bar chart! Bar charts use rectangular bars with heights proportional to the frequency or count of each category. They're perfect for comparing quantities across different categories.",
      chartRecommendation: "Bar Chart"
    },
    {
      id: 2,
      scenario: "Display Recognition Challenge",
      data: "/images/piechart.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Bar Chart",
        "Pie Chart",
        "Ring Chart",
        "Pareto Chart"
      ],
      correctAnswer: "Pie Chart",
      explanation: "This is a pie chart! Pie charts divide a circle into slices to show how different categories contribute to the whole. Each slice represents a proportion of the total.",
      chartRecommendation: "Pie Chart"
    },
    {
      id: 3,
      scenario: "Visualization Type Challenge",
      data: "/images/paretochart.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Bar Chart",
        "Pie Chart",
        "Pareto Chart",
        "Frequency Table"
      ],
      correctAnswer: "Pareto Chart",
      explanation: "This is a Pareto chart! It's a bar chart sorted in descending order, often combined with a cumulative percentage line. It helps identify the most significant categories following the 80/20 principle.",
      chartRecommendation: "Pareto Chart"
    },
    {
      id: 4,
      scenario: "Data Display Recognition",
      data: "/images/frequencytable.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Bar Chart",
        "Pie Chart", 
        "Frequency Table",
        "Ring Chart"
      ],
      correctAnswer: "Frequency Table",
      explanation: "This is a frequency table! It's a systematic way of organizing categorical data showing each category and its count or frequency, often including relative frequencies (percentages).",
      chartRecommendation: "Frequency Table"
    },
    {
      id: 5,
      scenario: "Chart Type Identification",
      data: "/images/ringchart.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Pie Chart",
        "Ring Chart",
        "Bar Chart",
        "Pareto Chart"
      ],
      correctAnswer: "Ring Chart",
      explanation: "This is a ring chart (also called a donut chart)! It's similar to a pie chart but with a hollow center, showing categorical data as segments of a ring to represent parts of a whole.",
      chartRecommendation: "Ring Chart"
    },
    {
      id: 6,
      scenario: "Display Format Recognition",
      data: "/images/relativefrequencytable.png",
      question: "What type of categorical display is shown in this image?",
      options: [
        "Frequency Table",
        "Relative Frequency Table",
        "Bar Chart",
        "Pie Chart"
      ],
      correctAnswer: "Relative Frequency Table",
      explanation: "This is a relative frequency table! It shows both counts and percentages for each category, emphasizing the relative proportion of each category compared to the total.",
      chartRecommendation: "Relative Frequency Table"
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
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Univariate Displays
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Chart Selection Challenge</h1>
                <p className="text-gray-600">Scenario {currentChallenge + 1} of {challenges.length}</p>
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
                    Best Choice: {currentChallengeData.chartRecommendation}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 text-sm">{currentChallengeData.explanation}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Next scenario in 4 seconds...</p>
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
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Univariate Displays
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 4 ? '🎉' : score >= 3 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 4 ? 'Chart Master!' : score >= 3 ? 'Well Done!' : 'Keep Learning!'}
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
                href="/chapters/2"
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
          <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Univariate Displays
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="categorical displays" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Categorical Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the tools for visualizing categorical data: bar charts, pie charts, Pareto charts, and frequency tables!
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
                    src="/images/barchart.png" 
                    alt="Bar Chart Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 1 && (
                  <img 
                    src="/images/piechart.png" 
                    alt="Pie Chart Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 2 && (
                  <img 
                    src="/images/paretochart.png" 
                    alt="Pareto Chart Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 3 && (
                  <img 
                    src="/images/frequencytable.png" 
                    alt="Frequency Table Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 4 && (
                  <img 
                    src="/images/ringchart.png" 
                    alt="Ring Chart Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedChart === 5 && (
                  <img 
                    src="/images/relativefrequencytable.png" 
                    alt="Relative Frequency Table Example" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>


          </div>
        </div>



        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Chart Selection Challenge</h2>
          
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
                <li>• Visual recognition of chart types</li>
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
