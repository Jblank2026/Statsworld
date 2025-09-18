"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Dataset {
  name: string;
  data: number[];
  context: string;
  sortedData?: number[];
  fiveNumber?: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  };
  interpretation: string;
}

interface Challenge {
  id: number;
  dataset: Dataset;
  questionType: 'calculate' | 'interpret' | 'compare' | 'identify';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function FiveNumberSummary() {
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const calculateFiveNumber = (data: number[]) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    
    const min = sorted[0];
    const max = sorted[n - 1];
    
    // Median (Q2)
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    // Q1 (lower half median)
    const lowerHalf = sorted.slice(0, Math.floor(n/2));
    const q1 = lowerHalf.length % 2 === 0
      ? (lowerHalf[lowerHalf.length/2 - 1] + lowerHalf[lowerHalf.length/2]) / 2
      : lowerHalf[Math.floor(lowerHalf.length/2)];
    
    // Q3 (upper half median)
    const upperHalf = sorted.slice(Math.ceil(n/2));
    const q3 = upperHalf.length % 2 === 0
      ? (upperHalf[upperHalf.length/2 - 1] + upperHalf[upperHalf.length/2]) / 2
      : upperHalf[Math.floor(upperHalf.length/2)];
    
    return { min, q1, median, q3, max, sorted };
  };

  const datasets: Dataset[] = [
    {
      name: "Student Test Scores",
      data: [78, 85, 92, 67, 88, 95, 71, 83, 79, 91, 86, 74],
      context: "Final exam scores from a statistics class of 12 students",
      interpretation: "The median (84.0) shows typical performance, with 25% scoring below 76 and 25% above 90. The range spans from 67 to 95."
    },
    {
      name: "Daily Temperature (°F)",
      data: [72, 68, 75, 71, 69, 73, 70, 74, 67, 76, 69, 72, 71, 73, 68],
      context: "Daily high temperatures in a city over two weeks",
      interpretation: "Temperatures are fairly consistent, with median 71°F. The middle 50% ranges from 69°F to 73°F, showing low variability."
    },
    {
      name: "House Prices ($1000s)",
      data: [245, 289, 312, 198, 356, 278, 423, 267, 334, 298, 189, 445],
      context: "Home sale prices in a suburban neighborhood over 6 months",
      interpretation: "Median price is $283.5k. The IQR ($267k to $334k) shows the typical range, while max ($445k) indicates some premium properties."
    },
    {
      name: "Customer Wait Times (minutes)",
      data: [3, 7, 12, 5, 15, 2, 8, 11, 6, 9, 4, 13, 1, 14, 10],
      context: "Customer service wait times at a call center during peak hours",
      interpretation: "Median wait of 8 minutes is reasonable. However, Q3 (12 minutes) shows 25% wait over 12 minutes, indicating service issues."
    }
  ];

  // Calculate five-number summaries for all datasets
  datasets.forEach(dataset => {
    const result = calculateFiveNumber(dataset.data);
    dataset.sortedData = result.sorted;
    dataset.fiveNumber = {
      min: result.min,
      q1: result.q1,
      median: result.median,
      q3: result.q3,
      max: result.max
    };
  });

  const challenges: Challenge[] = [
    {
      id: 1,
      dataset: datasets[0],
      questionType: 'calculate',
      question: "What is the median (Q2) of the test scores?",
      options: ["83.0", "84.0", "84.5", "85.0"],
      correctAnswer: "84.0",
      explanation: "With 12 values, median = average of 6th and 7th values. Sorted: 67,71,74,78,79,83,85,86,88,91,92,95. Median = (83+85)/2 = 84.0",
      skillFocus: "Finding the median with even number of observations"
    },
    {
      id: 2,
      dataset: datasets[0],
      questionType: 'calculate',
      question: "What is the first quartile (Q1) of the test scores?",
      options: ["74", "76", "78", "79"],
      correctAnswer: "76",
      explanation: "Q1 is the median of the lower half: 67,71,74,78,79,83. With 6 values, Q1 = (74+78)/2 = 76",
      skillFocus: "Calculating first quartile from lower half of data"
    },
    {
      id: 3,
      dataset: datasets[1],
      questionType: 'interpret',
      question: "What does the five-number summary tell us about temperature variability?",
      options: [
        "High variability - temperatures vary widely",
        "Low variability - temperatures are fairly consistent", 
        "Cannot determine variability from five-number summary",
        "Extreme variability - impossible to predict"
      ],
      correctAnswer: "Low variability - temperatures are fairly consistent",
      explanation: "The IQR is only 4°F (73-69), and the full range is 9°F (76-67), indicating low variability in daily temperatures.",
      skillFocus: "Interpreting spread from five-number summary"
    },
    {
      id: 4,
      dataset: datasets[2],
      questionType: 'compare',
      question: "Comparing the house price data, which measure shows the greatest spread?",
      options: [
        "IQR (Q3 - Q1) shows the greatest spread",
        "Range (Max - Min) shows the greatest spread",
        "Distance from Q1 to Median shows greatest spread",
        "All measures show identical spread"
      ],
      correctAnswer: "Range (Max - Min) shows the greatest spread",
      explanation: "Range = $445k - $189k = $256k. IQR = $334k - $267k = $67k. The range captures the full spread including extreme values.",
      skillFocus: "Comparing different measures of spread"
    },
    {
      id: 5,
      dataset: datasets[3],
      questionType: 'interpret',
      question: "What does Q3 = 12 minutes tell us about customer wait times?",
      options: [
        "75% of customers wait exactly 12 minutes",
        "25% of customers wait longer than 12 minutes",
        "The average wait time is 12 minutes",
        "12 minutes is the most common wait time"
      ],
      correctAnswer: "25% of customers wait longer than 12 minutes",
      explanation: "Q3 (75th percentile) means 75% wait 12 minutes or less, so 25% wait longer than 12 minutes. This identifies potential service problems.",
      skillFocus: "Understanding quartile interpretation and percentiles"
    },
    {
      id: 6,
      dataset: datasets[1],
      questionType: 'calculate',
      question: "What is the interquartile range (IQR) for the temperature data?",
      options: ["3°F", "4°F", "5°F", "9°F"],
      correctAnswer: "4°F",
      explanation: "IQR = Q3 - Q1 = 73 - 69 = 4°F. This represents the range of the middle 50% of temperatures.",
      skillFocus: "Calculating and interpreting IQR"
    },
    {
      id: 7,
      dataset: datasets[2],
      questionType: 'identify',
      question: "Which value in the house price five-number summary is most affected by the expensive outliers?",
      options: ["Minimum", "Q1", "Median", "Maximum"],
      correctAnswer: "Maximum",
      explanation: "The maximum ($445k) is directly determined by the highest outlier. Q1, median, and minimum are resistant to outliers, but max is extremely sensitive.",
      skillFocus: "Understanding outlier sensitivity of summary statistics"
    },
    {
      id: 8,
      dataset: datasets[0],
      questionType: 'interpret',
      question: "If a student scored 90 on the test, what can you say about their performance relative to the class?",
      options: [
        "They scored better than 50% of students",
        "They scored better than 75% of students", 
        "They scored better than 90% of students",
        "Cannot determine from five-number summary"
      ],
      correctAnswer: "They scored better than 75% of students",
      explanation: "A score of 90 is above Q3 (90), meaning it's in the top 25%. So this student performed better than at least 75% of the class.",
      skillFocus: "Using quartiles to interpret relative performance"
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
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Five-Number Master</h1>
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
                📊 {currentChallengeData.dataset.name}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-600 mb-4">{currentChallengeData.dataset.context}</p>
                
                {/* Data Display */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Raw Data:</h4>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    {currentChallengeData.dataset.data.join(', ')}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Sorted Data:</h4>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    {currentChallengeData.dataset.sortedData?.join(', ')}
                  </div>
                </div>

                {/* Five-Number Summary Display */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Five-Number Summary:</h4>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-red-100 p-2 rounded">
                      <div className="text-xs text-red-600 font-semibold">Min</div>
                      <div className="font-bold text-red-700">{currentChallengeData.dataset.fiveNumber?.min}</div>
                    </div>
                    <div className="bg-orange-100 p-2 rounded">
                      <div className="text-xs text-orange-600 font-semibold">Q1</div>
                      <div className="font-bold text-orange-700">{currentChallengeData.dataset.fiveNumber?.q1}</div>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      <div className="text-xs text-yellow-600 font-semibold">Median</div>
                      <div className="font-bold text-yellow-700">{currentChallengeData.dataset.fiveNumber?.median}</div>
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <div className="text-xs text-green-600 font-semibold">Q3</div>
                      <div className="font-bold text-green-700">{currentChallengeData.dataset.fiveNumber?.q3}</div>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <div className="text-xs text-blue-600 font-semibold">Max</div>
                      <div className="font-bold text-blue-700">{currentChallengeData.dataset.fiveNumber?.max}</div>
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
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 7 ? '🎉' : score >= 5 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 7 ? 'Five-Number Expert!' : score >= 5 ? 'Great Work!' : 'Keep Learning!'}
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

  const selectedExample = datasets[selectedDataset];

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
              <span role="img" aria-label="five number summary" className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Five-Number Summary</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the five key values that tell the complete story of any distribution!
              </p>
            </div>
          </div>
        </div>

        {/* The Five Numbers Explained */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔢 The Five Essential Numbers</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📋</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Why These Five Numbers?</h3>
                  <p className="text-yellow-600">
                    These five values divide your data into four equal parts (quartiles), showing where the center is, 
                    how spread out the data is, and identifying the range from smallest to largest. 
                    Together, they paint a complete picture of your distribution!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-red-700 mb-2">📉 Minimum</h4>
                <p className="text-red-600 text-sm">The smallest value in your dataset</p>
                <div className="mt-2 text-xs text-red-500">Shows the lower boundary</div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-orange-700 mb-2">📊 Q1 (25th percentile)</h4>
                <p className="text-orange-600 text-sm">25% of data falls below this value</p>
                <div className="mt-2 text-xs text-orange-500">Marks bottom quarter</div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-yellow-700 mb-2">🎯 Median (50th percentile)</h4>
                <p className="text-yellow-600 text-sm">Half the data is above, half below</p>
                <div className="mt-2 text-xs text-yellow-500">The true center</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">📈 Q3 (75th percentile)</h4>
                <p className="text-green-600 text-sm">75% of data falls below this value</p>
                <div className="mt-2 text-xs text-green-500">Marks top quarter</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">📈 Maximum</h4>
                <p className="text-blue-600 text-sm">The largest value in your dataset</p>
                <div className="mt-2 text-xs text-blue-500">Shows the upper boundary</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Interactive Calculator</h2>
          
          {/* Dataset Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {datasets.map((dataset, index) => (
              <button
                key={index}
                onClick={() => setSelectedDataset(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedDataset === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dataset.name}
              </button>
            ))}
          </div>

          {/* Selected Dataset Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedExample.context}</p>
            </div>

            {/* Data Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">📋 Raw Data:</h4>
                  <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                    {selectedExample.data.join(', ')}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">📊 Sorted Data:</h4>
                  <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                    {selectedExample.sortedData?.join(', ')}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-4">🔢 Five-Number Summary:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-medium text-red-700">Minimum:</span>
                    <span className="font-bold text-red-800">{selectedExample.fiveNumber?.min}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="font-medium text-orange-700">Q1 (25th percentile):</span>
                    <span className="font-bold text-orange-800">{selectedExample.fiveNumber?.q1}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium text-yellow-700">Median (50th percentile):</span>
                    <span className="font-bold text-yellow-800">{selectedExample.fiveNumber?.median}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium text-green-700">Q3 (75th percentile):</span>
                    <span className="font-bold text-green-800">{selectedExample.fiveNumber?.q3}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium text-blue-700">Maximum:</span>
                    <span className="font-bold text-blue-800">{selectedExample.fiveNumber?.max}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Calculations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">📏 Additional Measures</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-600">Range:</span>
                    <span className="font-semibold text-purple-800">
                      {selectedExample.fiveNumber!.max - selectedExample.fiveNumber!.min}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">IQR:</span>
                    <span className="font-semibold text-purple-800">
                      {selectedExample.fiveNumber!.q3 - selectedExample.fiveNumber!.q1}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">💡 Interpretation</h4>
                <p className="text-green-600 text-sm">{selectedExample.interpretation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 Step-by-Step Calculation</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">📋 The Process:</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-[#ff8200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong>Sort the data</strong> from smallest to largest
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#ff8200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong>Find the median</strong> (middle value or average of two middle values)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#ff8200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong>Find Q1</strong> (median of the lower half of data)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#ff8200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <strong>Find Q3</strong> (median of the upper half of data)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#ff8200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <strong>Identify Min and Max</strong> (first and last values in sorted data)
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">💡 Pro Tips</h4>
              <ul className="text-blue-600 text-sm space-y-1">
                <li>• Always sort your data first - this is crucial!</li>
                <li>• For even n: median = average of middle two values</li>
                <li>• For odd n: median = exact middle value</li>
                <li>• Q1 and Q3 split the lower and upper halves</li>
                <li>• Double-check by ensuring 25% of data is in each quarter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Five-Number Master Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Practice calculating quartiles and medians</li>
                <li>• Interpret five-number summaries in context</li>
                <li>• Compare different measures of spread</li>
                <li>• Understand percentile meanings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Accurate quartile calculations</li>
                <li>• Range and IQR interpretation</li>
                <li>• Percentile understanding</li>
                <li>• Data summary communication</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master the Five Numbers
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
