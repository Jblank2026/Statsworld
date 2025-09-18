"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Dataset {
  name: string;
  data: number[];
  context: string;
}

interface Challenge {
  id: number;
  dataset: Dataset;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function BoxplotsAndOutliers() {
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const calculateBoxplotStats = (data: number[]) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    
    // Five-number summary
    const min = sorted[0];
    const max = sorted[n - 1];
    
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    const lowerHalf = sorted.slice(0, Math.floor(n/2));
    const q1 = lowerHalf.length % 2 === 0
      ? (lowerHalf[lowerHalf.length/2 - 1] + lowerHalf[lowerHalf.length/2]) / 2
      : lowerHalf[Math.floor(lowerHalf.length/2)];
    
    const upperHalf = sorted.slice(Math.ceil(n/2));
    const q3 = upperHalf.length % 2 === 0
      ? (upperHalf[upperHalf.length/2 - 1] + upperHalf[upperHalf.length/2]) / 2
      : upperHalf[Math.floor(upperHalf.length/2)];
    
    // IQR and outlier detection
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    
    const outliers = sorted.filter(x => x < lowerFence || x > upperFence);
    
    return {
      sorted,
      min, max, q1, median, q3, iqr,
      lowerFence, upperFence, outliers
    };
  };

  const datasets: Dataset[] = [
    {
      name: "Test Scores",
      data: [78, 85, 92, 67, 88, 95, 71, 83, 79, 91, 86, 74, 45],
      context: "Class exam scores with one struggling student (45)"
    },
    {
      name: "House Prices ($000s)",
      data: [245, 289, 312, 198, 356, 278, 267, 334, 298, 850],
      context: "Home sales including one luxury property ($850k)"
    },
    {
      name: "Response Times (ms)",
      data: [120, 135, 142, 156, 167, 145, 139, 148, 152, 2100],
      context: "Server response times with one timeout (2100ms)"
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      dataset: datasets[0],
      question: "Looking at this test scores data, which value is an outlier?",
      options: ["67", "45", "95", "78"],
      correctAnswer: "45",
      explanation: "With Q1=74 and IQR=15, the lower fence is 74 - 1.5(15) = 51.5. The score of 45 falls below this fence, making it an outlier."
    },
    {
      id: 2,
      dataset: datasets[1],
      question: "In this house price data, what does the box in a boxplot represent?",
      options: [
        "The range of all data",
        "The middle 50% of data (Q1 to Q3)",
        "Only the median value",
        "The outliers in the dataset"
      ],
      correctAnswer: "The middle 50% of data (Q1 to Q3)",
      explanation: "The box shows the interquartile range (IQR), which contains the middle 50% of the data from Q1 to Q3."
    },
    {
      id: 3,
      dataset: datasets[2],
      question: "For this response time data, how are outliers defined using the IQR rule?",
      options: [
        "Values more than 2 standard deviations from mean",
        "Values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR",
        "The highest and lowest 5% of values",
        "Any value that seems unusual"
      ],
      correctAnswer: "Values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR",
      explanation: "The 1.5*IQR rule defines outliers as values that fall beyond the 'fences' at Q1 - 1.5*IQR (lower fence) and Q3 + 1.5*IQR (upper fence)."
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

  // Game Screen
  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Boxplot Challenge</h1>
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
                📊 {currentChallengeData.dataset.name}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-600 mb-4">{currentChallengeData.dataset.context}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Data:</h4>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    {currentChallengeData.dataset.data.join(', ')}
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Correct!' : 'Not Quite'}
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">💡 Explanation</h4>
                  <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">Next question in 3 seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Results Screen
  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Comparing Distributions
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score === 3 ? '🎉' : score >= 2 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score === 3 ? 'Perfect Score!' : score >= 2 ? 'Well Done!' : 'Keep Learning!'}
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

  // Main Page
  const selectedExample = datasets[selectedDataset];
  const stats = calculateBoxplotStats(selectedExample.data);

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Comparing Distributions
          </Link>
        </div>

        {/* Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="boxplots and outliers" className="text-4xl">📦</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Boxplots & Outlier Detection</h1>
              <p className="text-xl text-gray-600 mt-2">
                Visualize distributions and spot unusual values at a glance!
              </p>
            </div>
          </div>
        </div>

        {/* Anatomy of a Boxplot */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔬 Anatomy of a Boxplot</h2>
          
          {/* Visual Boxplot Diagram */}
          <div className="bg-gray-50 p-8 rounded-lg mb-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Title */}
              <h3 className="font-bold text-[#58595b] text-lg">Visual Guide</h3>
              
              {/* Boxplot representation using CSS */}
              <div className="relative w-full max-w-2xl h-32 flex items-center justify-center">
                {/* Outlier (left) */}
                <div className="absolute left-8 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute left-8 -top-6 text-xs text-red-600 font-semibold">Outlier</div>
                
                {/* Lower whisker */}
                <div className="absolute left-20 w-16 h-0.5 bg-gray-600"></div>
                <div className="absolute left-20 w-0.5 h-6 bg-gray-600 top-1/2 transform -translate-y-1/2"></div>
                
                {/* Main box */}
                <div className="relative w-48 h-16 border-2 border-gray-700 bg-blue-100">
                  {/* Q1 label */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-blue-600">Q1</div>
                  
                  {/* Median line */}
                  <div className="absolute left-16 top-0 w-0.5 h-full bg-red-600"></div>
                  <div className="absolute left-12 -top-6 text-xs text-red-600 font-semibold">Median</div>
                  
                  {/* Q3 label */}
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-green-600">Q3</div>
                </div>
                
                {/* Upper whisker */}
                <div className="absolute right-20 w-16 h-0.5 bg-gray-600"></div>
                <div className="absolute right-20 w-0.5 h-6 bg-gray-600 top-1/2 transform -translate-y-1/2"></div>
                
                {/* Outlier (right) */}
                <div className="absolute right-8 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute right-8 -top-6 text-xs text-red-600 font-semibold">Outlier</div>
              </div>

              {/* IQR indicator */}
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  <span className="px-2 py-1 bg-purple-100 rounded text-purple-700 font-semibold">
                    IQR = Q3 - Q1 (Middle 50% of data)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">📦 The Box</h4>
              <ul className="space-y-1 text-blue-600 text-sm">
                <li>• <strong>Bottom edge:</strong> Q1 (25th percentile)</li>
                <li>• <strong>Red line inside:</strong> Median (50th percentile)</li>
                <li>• <strong>Top edge:</strong> Q3 (75th percentile)</li>
                <li>• <strong>Height:</strong> IQR = Q3 - Q1</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-700 mb-2">📏 The Whiskers</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• <strong>Lower whisker:</strong> Extends to smallest non-outlier</li>
                <li>• <strong>Upper whisker:</strong> Extends to largest non-outlier</li>
                <li>• <strong>Maximum length:</strong> 1.5 * IQR from box edges</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-700 mb-2">🚨 The Outliers</h4>
              <ul className="space-y-1 text-red-600 text-sm">
                <li>• <strong>Individual points</strong> beyond the whiskers</li>
                <li>• <strong>Rule:</strong> &lt; Q1 - 1.5*IQR or &gt; Q3 + 1.5*IQR</li>
                <li>• <strong>May indicate:</strong> Errors or unusual values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Try It Out</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {datasets.map((dataset, index) => (
              <button
                key={index}
                onClick={() => setSelectedDataset(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDataset === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dataset.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedExample.context}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📋 Data:</h4>
                <div className="bg-gray-50 p-4 rounded border font-mono text-sm mb-4">
                  {selectedExample.data.join(', ')}
                </div>
                
                <h4 className="font-semibold text-gray-700 mb-2">📊 Sorted:</h4>
                <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                  {stats.sorted.join(', ')}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-4">🔢 Five-Number Summary:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-red-50 rounded">
                    <span>Min:</span> <span className="font-bold">{stats.min}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50 rounded">
                    <span>Q1:</span> <span className="font-bold">{stats.q1}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-yellow-50 rounded">
                    <span>Median:</span> <span className="font-bold">{stats.median}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-green-50 rounded">
                    <span>Q3:</span> <span className="font-bold">{stats.q3}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-50 rounded">
                    <span>Max:</span> <span className="font-bold">{stats.max}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">📏 Spread Measures</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>IQR:</span> <span className="font-bold">{stats.iqr.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Range:</span> <span className="font-bold">{stats.max - stats.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lower Fence:</span> <span className="font-bold">{stats.lowerFence.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upper Fence:</span> <span className="font-bold">{stats.upperFence.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-4 ${
                stats.outliers.length > 0 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  stats.outliers.length > 0 ? 'text-red-700' : 'text-green-700'
                }`}>
                  {stats.outliers.length > 0 ? '🚨 Outliers Found' : '✅ No Outliers'}
                </h4>
                {stats.outliers.length > 0 ? (
                  <div>
                    <p className="text-red-600 font-bold">
                      Values: {stats.outliers.join(', ')}
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      These values fall outside the normal range and may need investigation.
                    </p>
                  </div>
                ) : (
                  <p className="text-green-600 text-sm">
                    All values fall within the expected range (between the fences).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Test Your Knowledge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">What You'll Practice:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Identifying outliers using the 1.5*IQR rule</li>
                <li>• Understanding boxplot components</li>
                <li>• Interpreting distribution shapes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Why It Matters:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Spot data entry errors quickly</li>
                <li>• Compare multiple groups at once</li>
                <li>• Identify unusual patterns in data</li>
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
