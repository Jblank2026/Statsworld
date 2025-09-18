"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface DisplayType {
  name: string;
  description: string;
  bestFor: string;
  example: string;
  keyFeature: string;
  considerations: string[];
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

interface BinWidthChallenge {
  id: number;
  dataset: string;
  context: string;
  binWidthOptions: number[];
  correctBinWidth: number;
  explanation: string;
  tooNarrow: string;
  tooWide: string;
  justRight: string;
}

export default function QuantitativeDisplays() {
  const [selectedDisplay, setSelectedDisplay] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedBinWidth, setSelectedBinWidth] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const displayTypes: DisplayType[] = [
    {
      name: "Histogram",
      description: "Groups numerical data into ranges (bins) and shows the frequency of values in each range using connected bars.",
      bestFor: "Showing the shape and distribution of continuous data, revealing patterns like normality, skewness, and outliers.",
      example: "Test scores (0-100), heights of students, response times in milliseconds, or daily temperatures over a month.",
      keyFeature: "Bin width dramatically affects interpretation - too wide hides patterns, too narrow creates noise.",
      considerations: [
        "Choose appropriate bin width for your data range",
        "More data allows for more bins without noise",
        "Look for shape: normal, skewed, uniform, bimodal",
        "Gaps may indicate missing data or natural breaks"
      ],
      pros: [
        "Shows overall distribution shape clearly",
        "Handles large datasets efficiently",
        "Reveals patterns like skewness and modality",
        "Easy to interpret for most audiences"
      ],
      cons: [
        "Bin width choice affects interpretation",
        "Loses individual data point information",
        "Can hide or create patterns depending on binning",
        "Requires sufficient sample size"
      ]
    },
    {
      name: "Stem-and-Leaf Plot",
      description: "Displays numerical data by separating each value into a 'stem' (leading digits) and 'leaf' (trailing digit), preserving actual data values.",
      bestFor: "Small to medium datasets where you want to see individual values while showing the overall distribution shape.",
      example: "Test scores: 67, 72, 74, 78, 81, 83, 85, 92 becomes stems 6|7, 7|2 4 8, 8|1 3 5, 9|2",
      keyFeature: "Shows exact values AND distribution shape simultaneously - you can read off individual data points.",
      considerations: [
        "Works best with 20-50 data points", 
        "Becomes unwieldy with very large datasets",
        "Easy to find median and identify outliers",
        "Stems should have reasonable number of leaves"
      ],
      pros: [
        "Preserves all original data values",
        "Shows distribution shape",
        "Easy to find median and quartiles",
        "Compact representation"
      ],
      cons: [
        "Limited to moderate sample sizes",
        "Can become messy with many decimal places",
        "Less familiar to general audiences",
        "Doesn't work well with very large numbers"
      ]
    },
    {
      name: "Dot Plot",
      description: "Places a dot for each observation along a number line, stacking dots when values repeat to show frequency.",
      bestFor: "Small datasets where you want to see every individual value and their frequency, especially useful for discrete data.",
      example: "Number of pets per household: 0, 0, 1, 1, 1, 2, 3 shows as stacked dots above each number on a line.",
      keyFeature: "Every dot represents one observation - perfect for seeing both individual values and overall patterns.",
      considerations: [
        "Ideal for datasets under 50 observations",
        "Great for discrete data (counts, ratings)",
        "Easy to spot outliers and clusters",
        "Can become cluttered with too much data"
      ],
      pros: [
        "Shows every individual observation",
        "Great for small datasets",
        "Easy to see patterns and gaps",
        "Simple to create and understand"
      ],
      cons: [
        "Becomes cluttered with large datasets",
        "Takes up more space than other displays",
        "Limited usefulness for continuous data",
        "Can be time-consuming to create manually"
      ]
    },
    {
      name: "Box Plot",
      description: "Summarizes data using five key values: minimum, Q1, median, Q3, and maximum, showing spread and identifying outliers.",
      bestFor: "Comparing distributions between groups and quickly identifying spread, center, and outliers.",
      example: "Comparing test scores across different classes, or sales performance across regions.",
      keyFeature: "Shows five-number summary at a glance and highlights outliers beyond the 'whiskers'.",
      considerations: [
        "Loses individual data point information",
        "Great for comparing multiple groups",
        "Outliers shown as separate points",
        "Excellent for side-by-side comparisons"
      ],
      pros: [
        "Compact summary of distribution",
        "Easy to compare multiple groups",
        "Clearly identifies outliers",
        "Shows key statistical measures"
      ],
      cons: [
        "Hides distribution shape details",
        "Loses individual data points",
        "May not show bimodal patterns",
        "Less intuitive for general audiences"
      ]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Chart Identification Challenge",
      data: "/images/histogram.png",
      question: "What type of quantitative display is shown in this image?",
      options: [
        "Histogram",
        "Stem-and-Leaf Plot",
        "Dot Plot",
        "Box Plot"
      ],
      correctAnswer: "Histogram",
      explanation: "This is a histogram! It groups numerical data into ranges (bins) and shows the frequency of values in each range using connected bars. Notice the continuous bars without gaps between them.",
      chartRecommendation: "Histogram"
    },
    {
      id: 2,
      scenario: "Display Recognition Challenge",
      data: "/images/stemandleaf.png",
      question: "What type of quantitative display is shown in this image?",
      options: [
        "Histogram",
        "Stem-and-Leaf Plot",
        "Dot Plot",
        "Bar Chart"
      ],
      correctAnswer: "Stem-and-Leaf Plot",
      explanation: "This is a stem-and-leaf plot! It displays numerical data by separating each value into a 'stem' (leading digits) and 'leaf' (trailing digit), preserving actual data values while showing distribution shape.",
      chartRecommendation: "Stem-and-Leaf Plot"
    },
    {
      id: 3,
      scenario: "Visualization Type Challenge",
      data: "/images/dotplot.png",
      question: "What type of quantitative display is shown in this image?",
      options: [
        "Histogram",
        "Stem-and-Leaf Plot",
        "Dot Plot",
        "Scatter Plot"
      ],
      correctAnswer: "Dot Plot",
      explanation: "This is a dot plot! It places a dot for each observation along a number line, stacking dots when values repeat to show frequency. Every dot represents one observation.",
      chartRecommendation: "Dot Plot"
    },
    {
      id: 4,
      scenario: "Distribution Summary Challenge",
      data: "/images/boxplot.svg",
      question: "What type of quantitative display is shown in this image?",
      options: [
        "Histogram",
        "Box Plot",
        "Dot Plot",
        "Bar Chart"
      ],
      correctAnswer: "Box Plot",
      explanation: "This is a box plot! It summarizes data using five key values: minimum, Q1, median, Q3, and maximum. The 'box' shows the middle 50% of data, and 'whiskers' extend to show the range, with outliers as separate points.",
      chartRecommendation: "Box Plot"
    }
  ];

  const binWidthChallenges: BinWidthChallenge[] = [
    {
      id: 1,
      dataset: "Student Heights (inches)",
      context: "You're analyzing the heights of 100 college students ranging from 58 inches to 78 inches. You want to see if the distribution is roughly normal.",
      binWidthOptions: [1, 2, 5, 10],
      correctBinWidth: 2,
      explanation: "With a 20-inch range (78-58) and 100 students, 2-inch bins create about 10 bins, which is perfect for seeing the distribution shape without too much noise or oversimplification.",
      tooNarrow: "1-inch bins create 20+ bins with too much random variation, making it hard to see the overall pattern.",
      tooWide: "5 or 10-inch bins create too few bins (4 or 2), hiding important details about the distribution shape.",
      justRight: "2-inch bins (58-60, 60-62, etc.) show the bell curve clearly while maintaining enough detail to see the distribution pattern."
    },
    {
      id: 2,
      dataset: "Website Load Times (seconds)",
      context: "You're analyzing website load times ranging from 0.5 to 8.5 seconds for 200 page visits. You suspect most pages load quickly with some slow outliers.",
      binWidthOptions: [0.5, 1.0, 2.0, 4.0],
      correctBinWidth: 0.5,
      explanation: "With load times, small differences matter! 0.5-second bins reveal the important distinction between fast (1-2 sec) and acceptable (2-3 sec) load times, plus identify slow outliers.",
      tooNarrow: "Smaller bins would create noise, but 0.5 is actually appropriate here given the importance of precision in load times.",
      tooWide: "1+ second bins hide critical performance differences - the difference between 1.5 and 2.5 seconds is significant for user experience.",
      justRight: "0.5-second bins show the right-skewed distribution with most fast loads clustered near zero and a long tail of slower loads."
    },
    {
      id: 3,
      dataset: "Test Scores (0-100 scale)",
      context: "You have test scores from 150 students on a 100-point exam. You want to see the grade distribution and identify any unusual patterns.",
      binWidthOptions: [2, 5, 10, 20],
      correctBinWidth: 5,
      explanation: "For test scores, 5-point bins align with typical grading scales (90-95, 85-90, etc.) and create about 20 bins, perfect for showing distribution details without noise.",
      tooNarrow: "2-point bins create too many bins (50+) with random fluctuations that obscure the overall grade pattern.",
      tooWide: "10+ point bins hide important grade distinctions and compress the distribution too much.",
      justRight: "5-point bins reveal grade clusters, show if the test was too easy/hard, and align with how instructors think about score ranges."
    },
    {
      id: 4,
      dataset: "Daily Step Counts",
      context: "You're analyzing daily step counts from 80 fitness tracker users, ranging from 2,000 to 18,000 steps. You want to understand typical activity levels.",
      binWidthOptions: [1000, 2000, 4000, 8000],
      correctBinWidth: 2000,
      explanation: "With a 16,000-step range, 2,000-step bins create 8 meaningful categories that align with activity levels (sedentary <5k, active 8-10k, very active >12k).",
      tooNarrow: "1,000-step bins create too much detail for step count analysis where broad activity patterns matter more than precise counts.",
      tooWide: "4,000+ step bins lose important distinctions between sedentary, moderate, and active lifestyles.",
      justRight: "2,000-step bins show the distribution of activity levels clearly and help identify inactive vs. active populations."
    },
    {
      id: 5,
      dataset: "Response Times (milliseconds)",
      context: "You're measuring user response times in a psychology experiment, ranging from 200ms to 1200ms across 120 trials. Precision matters for detecting cognitive differences.",
      binWidthOptions: [50, 100, 200, 500],
      correctBinWidth: 100,
      explanation: "For response time research, 100ms bins provide the right balance - precise enough to detect meaningful cognitive differences while avoiding noise from measurement error.",
      tooNarrow: "50ms bins may show too much measurement noise and random variation in this range of response times.",
      tooWide: "200+ ms bins hide important cognitive timing differences that researchers need to detect.",
      justRight: "100ms bins reveal the right-skewed distribution typical of response times while maintaining research-relevant precision."
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
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Univariate Displays
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
              {score >= 4 ? 'Chart Master!' : score >= 3 ? 'Great Progress!' : 'Keep Practicing!'}
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
              <span role="img" aria-label="quantitative displays" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Quantitative Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Explore histograms, stem-and-leaf plots, and dot plots! Learn how to reveal patterns in numerical data.
              </p>
            </div>
          </div>
        </div>

        {/* Display Type Explorer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Visualization Types</h2>
          
          {/* Display Selection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {displayTypes.map((display, index) => (
              <button
                key={index}
                onClick={() => setSelectedDisplay(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDisplay === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {display.name}
              </button>
            ))}
          </div>

          {/* Selected Display Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#58595b] mb-2">{displayTypes[selectedDisplay].name}</h3>
              <p className="text-gray-600">{displayTypes[selectedDisplay].description}</p>
            </div>

            {/* Chart Example Image */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-[#58595b] mb-4">📸 Real Example</h4>
              <div className="flex justify-center">
                {selectedDisplay === 0 && (
                  <img
                    src="/images/histogram.png"
                    alt="Histogram Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedDisplay === 1 && (
                  <img
                    src="/images/stemandleaf.png"
                    alt="Stem-and-Leaf Plot Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedDisplay === 2 && (
                  <img
                    src="/images/dotplot.png"
                    alt="Dot Plot Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {selectedDisplay === 3 && (
                  <img
                    src="/images/boxplot.svg"
                    alt="Box Plot Example"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>


            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-700 mb-2">⭐ Key Feature</h4>
              <p className="text-orange-600 text-sm mb-3">{displayTypes[selectedDisplay].keyFeature}</p>
              
              <h5 className="font-semibold text-orange-700 mb-2">Important Considerations:</h5>
              <ul className="text-orange-600 text-sm space-y-1">
                {displayTypes[selectedDisplay].considerations.map((consideration, index) => (
                  <li key={index}>• {consideration}</li>
                ))}
              </ul>
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
