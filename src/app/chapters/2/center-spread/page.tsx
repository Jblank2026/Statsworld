"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Measure {
  name: string;
  description: string;
  formula: string;
  whenToUse: string;
  advantages: string[];
  disadvantages: string[];
  affectedByOutliers: boolean;
  skewnessEffect: string;
}

interface CalculationChallenge {
  id: number;
  context: string;
  data: number[];
  questionType: 'center' | 'spread' | 'percentile' | 'interpretation';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  calculations: { [key: string]: number };
}

export default function CenterSpread() {
  const [selectedMeasure, setSelectedMeasure] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const measures: Measure[] = [
    {
      name: "Mean (Average)",
      description: "The arithmetic average of all values, calculated by adding all values and dividing by the number of observations.",
      formula: "Mean = (Sum of all values) ÷ (Number of values)",
      whenToUse: "When data is roughly symmetric (normal) and you want to use all data points in your calculation.",
      advantages: [
        "Uses every data point",
        "Algebraically useful for further calculations",
        "Most familiar to general audiences",
        "Foundation for many statistical methods"
      ],
      disadvantages: [
        "Heavily affected by outliers",
        "Can be misleading with skewed data",
        "May not represent a 'typical' value",
        "Not always a value that actually exists in the data"
      ],
      affectedByOutliers: true,
      skewnessEffect: "Gets pulled toward the tail - higher in right-skewed data, lower in left-skewed data"
    },
    {
      name: "Median",
      description: "The middle value when data is arranged in order. For even numbers of observations, it's the average of the two middle values.",
      formula: "Position = (n + 1) ÷ 2, where n = number of values. Median = value at that position",
      whenToUse: "When data is skewed or contains outliers, or when you want a value that represents the 'typical' observation.",
      advantages: [
        "Not affected by outliers",
        "Always represents the center of the distribution",
        "Easy to understand conceptually",
        "More representative with skewed data"
      ],
      disadvantages: [
        "Doesn't use all data points",
        "Less useful for further mathematical operations",
        "Can be affected by small changes in middle values",
        "May not be unique with repeated values"
      ],
      affectedByOutliers: false,
      skewnessEffect: "Stays relatively stable - represents the true center regardless of skewness"
    },
    {
      name: "Range",
      description: "The difference between the maximum and minimum values in the dataset, showing the total spread.",
      formula: "Range = Maximum value - Minimum value",
      whenToUse: "For a quick, simple measure of spread, or when you need to know the full extent of the data.",
      advantages: [
        "Very easy to calculate and understand",
        "Shows the full extent of the data",
        "Useful for quality control",
        "Immediate sense of variability"
      ],
      disadvantages: [
        "Only uses two data points",
        "Extremely sensitive to outliers",
        "Doesn't show how data is distributed within the range",
        "Can be misleading about typical spread"
      ],
      affectedByOutliers: true,
      skewnessEffect: "Can be distorted by extreme values in either tail"
    },
    {
      name: "Interquartile Range (IQR)",
      description: "The range of the middle 50% of the data, calculated as the difference between the 75th and 25th percentiles.",
      formula: "IQR = Q3 (75th percentile) - Q1 (25th percentile)",
      whenToUse: "When you want a robust measure of spread that isn't affected by outliers, especially with skewed data.",
      advantages: [
        "Not affected by outliers",
        "Represents the spread of the 'typical' middle values",
        "Works well with skewed distributions",
        "Foundation for outlier detection"
      ],
      disadvantages: [
        "Only uses middle 50% of data",
        "More complex to calculate than range",
        "Less familiar to general audiences",
        "Doesn't capture full variability"
      ],
      affectedByOutliers: false,
      skewnessEffect: "Remains stable and represents the spread of the central portion of data"
    },
    {
      name: "Standard Deviation",
      description: "A measure of how spread out data is from the mean, calculated using the average of squared deviations from the mean.",
      formula: "SD = √[(Σ(x - mean)²) ÷ (n-1)]",
      whenToUse: "When data is roughly normal and you need a precise measure of spread for further statistical analysis.",
      advantages: [
        "Uses every data point",
        "Same units as the original data",
        "Foundation for many statistical methods",
        "Measures spread around the mean"
      ],
      disadvantages: [
        "Heavily affected by outliers",
        "Complex calculation",
        "Less intuitive than range or IQR",
        "Assumes roughly normal distribution"
      ],
      affectedByOutliers: true,
      skewnessEffect: "Inflated by the tail - larger in skewed distributions due to extreme values"
    }
  ];

  const challenges: CalculationChallenge[] = [
    {
      id: 1,
      context: "Test Scores",
      data: [72, 85, 91, 78, 88, 95, 82, 76, 89, 84],
      questionType: 'center',
      question: "What is the mean of these test scores?",
      options: ["82.0", "84.0", "85.5", "86.0"],
      correctAnswer: "84.0",
      explanation: "Mean = (72+85+91+78+88+95+82+76+89+84) ÷ 10 = 840 ÷ 10 = 84.0",
      calculations: {
        mean: 84.0,
        median: 84.5,
        range: 23,
        iqr: 10.5
      }
    },
    {
      id: 2,
      context: "Test Scores (continued)",
      data: [72, 85, 91, 78, 88, 95, 82, 76, 89, 84],
      questionType: 'center',
      question: "What is the median of these test scores?",
      options: ["82.0", "84.0", "84.5", "85.0"],
      correctAnswer: "84.5",
      explanation: "Ordered: 72, 76, 78, 82, 84, 85, 88, 89, 91, 95. With 10 values, median = (84 + 85) ÷ 2 = 84.5",
      calculations: {
        mean: 84.0,
        median: 84.5,
        range: 23,
        iqr: 10.5
      }
    },
    {
      id: 3,
      context: "Daily Temperatures (°F)",
      data: [68, 72, 75, 71, 69, 250, 70, 73, 67, 74],
      questionType: 'interpretation',
      question: "There's an obvious data entry error (250°F). Which measure of center would be most appropriate to report?",
      options: ["Mean - it uses all the data", "Median - it's not affected by the outlier", "Mode - it shows the most common value", "Range - it shows the spread"],
      correctAnswer: "Median - it's not affected by the outlier",
      explanation: "The 250°F is clearly an error. The median (71°F) represents the typical temperature, while the mean (108.9°F) is severely distorted by the outlier.",
      calculations: {
        mean: 108.9,
        median: 71,
        range: 183,
        iqr: 5
      }
    },
    {
      id: 4,
      context: "Household Incomes ($1000s)",
      data: [45, 52, 38, 61, 48, 55, 42, 150, 49, 44],
      questionType: 'interpretation',
      question: "This income data is right-skewed due to one high earner. How do the mean and median compare?",
      options: ["Mean > Median (pulled by high income)", "Mean < Median (pulled by low incomes)", "Mean ≈ Median (no effect)", "Cannot determine without more data"],
      correctAnswer: "Mean > Median (pulled by high income)",
      explanation: "In right-skewed data, the mean ($58.4k) gets pulled toward the tail by the high income ($150k), while the median ($48.5k) stays centered.",
      calculations: {
        mean: 58.4,
        median: 48.5,
        range: 112,
        iqr: 10.5
      }
    },
    {
      id: 5,
      context: "Quiz Scores",
      data: [8, 9, 7, 10, 9, 8, 10, 9, 8, 7],
      questionType: 'spread',
      question: "What is the range of these quiz scores?",
      options: ["2", "3", "4", "7"],
      correctAnswer: "3",
      explanation: "Range = Maximum - Minimum = 10 - 7 = 3",
      calculations: {
        mean: 8.5,
        median: 8.5,
        range: 3,
        iqr: 2
      }
    },
    {
      id: 6,
      context: "Response Times (seconds)",
      data: [1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3, 3.6, 15.2],
      questionType: 'spread',
      question: "Which measure of spread would be most appropriate for this data with an outlier?",
      options: ["Range - shows full spread", "Standard deviation - uses all data", "IQR - not affected by outliers", "Variance - mathematically precise"],
      correctAnswer: "IQR - not affected by outliers",
      explanation: "The 15.2-second response time is an outlier. IQR focuses on the middle 50% and isn't distorted by this extreme value, giving a better sense of typical spread.",
      calculations: {
        mean: 3.78,
        median: 2.55,
        range: 14.0,
        iqr: 1.8
      }
    },
    {
      id: 7,
      context: "Student Heights (inches)",
      data: [64, 66, 67, 68, 69, 70, 71, 72, 73, 75],
      questionType: 'percentile',
      question: "What percentage of students are 69 inches or shorter?",
      options: ["40%", "50%", "60%", "70%"],
      correctAnswer: "50%",
      explanation: "69 inches is the median (5th value out of 10). By definition, 50% of values are at or below the median.",
      calculations: {
        mean: 69.5,
        median: 69.5,
        range: 11,
        iqr: 5.5
      }
    },
    {
      id: 8,
      context: "Sales Performance (%)",
      data: [88, 92, 85, 94, 91, 89, 93, 87, 95, 90],
      questionType: 'percentile',
      question: "The 75th percentile (Q3) of these sales percentages is approximately:",
      options: ["90%", "92%", "93%", "94%"],
      correctAnswer: "93%",
      explanation: "Ordered: 85, 87, 88, 89, 90, 91, 92, 93, 94, 95. Q3 is at position 7.5, so Q3 = (92 + 93) ÷ 2 = 92.5 ≈ 93%",
      calculations: {
        mean: 90.4,
        median: 90.5,
        range: 10,
        iqr: 4.5
      }
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
                <h1 className="text-2xl font-bold text-[#58595b]">Center & Spread Calculator</h1>
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
                📊 {currentChallengeData.context}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">📈 Data:</h3>
                <div className="bg-white p-3 rounded border font-mono text-center text-lg mb-4">
                  {currentChallengeData.data.join(', ')}
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Correct!' : 'Not Quite Right'}
                  </h3>
                  <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                    Answer: {currentChallengeData.correctAnswer}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Solution</h4>
                    <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">📊 All Measures</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Mean: {currentChallengeData.calculations.mean}</div>
                      <div>Median: {currentChallengeData.calculations.median}</div>
                      <div>Range: {currentChallengeData.calculations.range}</div>
                      <div>IQR: {currentChallengeData.calculations.iqr}</div>
                    </div>
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
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Univariate Displays
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 7 ? '🎉' : score >= 5 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 7 ? 'Statistics Pro!' : score >= 5 ? 'Great Work!' : 'Keep Learning!'}
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
                <div className="text-sm text-gray-600">Accuracy</div>
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
                Final Challenge
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
              <span role="img" aria-label="center and spread" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Center & Spread</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master measures of center (mean, median) and spread (range, IQR, standard deviation)!
              </p>
            </div>
          </div>
        </div>

        {/* Measure Explorer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Statistical Measures</h2>
          
          {/* Measure Selection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {measures.map((measure, index) => (
              <button
                key={index}
                onClick={() => setSelectedMeasure(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedMeasure === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {measure.name}
              </button>
            ))}
          </div>

          {/* Selected Measure Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#58595b] mb-2">{measures[selectedMeasure].name}</h3>
              <p className="text-gray-600 mb-4">{measures[selectedMeasure].description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-blue-700 mb-2">🧮 Formula</h4>
                <p className="text-blue-600 font-mono text-sm">{measures[selectedMeasure].formula}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">✅ Advantages</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  {measures[selectedMeasure].advantages.map((advantage, index) => (
                    <li key={index}>• {advantage}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">❌ Disadvantages</h4>
                <ul className="text-red-600 text-sm space-y-1">
                  {measures[selectedMeasure].disadvantages.map((disadvantage, index) => (
                    <li key={index}>• {disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">🎯 When to Use</h4>
                <p className="text-orange-600 text-sm">{measures[selectedMeasure].whenToUse}</p>
              </div>

              <div className={`border rounded-lg p-4 ${
                measures[selectedMeasure].affectedByOutliers 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  measures[selectedMeasure].affectedByOutliers 
                    ? 'text-yellow-700' 
                    : 'text-green-700'
                }`}>
                  {measures[selectedMeasure].affectedByOutliers ? '⚠️ Outlier Sensitive' : '🛡️ Outlier Resistant'}
                </h4>
                <p className={`text-sm ${
                  measures[selectedMeasure].affectedByOutliers 
                    ? 'text-yellow-600' 
                    : 'text-green-600'
                }`}>
                  {measures[selectedMeasure].skewnessEffect}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔑 Key Concepts</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Outliers Change Everything!</h3>
                  <p className="text-yellow-600">
                    Mean and standard deviation are pulled toward outliers, while median and IQR stay stable. 
                    Always check for outliers before choosing your measures!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📏 Percentiles Explained</h4>
                <ul className="text-blue-600 text-sm space-y-2">
                  <li><strong>25th percentile (Q1):</strong> 25% of data below this value</li>
                  <li><strong>50th percentile (Median):</strong> 50% of data below this value</li>
                  <li><strong>75th percentile (Q3):</strong> 75% of data below this value</li>
                  <li><strong>IQR = Q3 - Q1:</strong> Range of middle 50%</li>
                </ul>
              </div>

              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🎯 Choosing the Right Measure</h4>
                <ul className="text-green-600 text-sm space-y-2">
                  <li><strong>Symmetric data:</strong> Mean & Standard Deviation</li>
                  <li><strong>Skewed data:</strong> Median & IQR</li>
                  <li><strong>With outliers:</strong> Median & IQR</li>
                  <li><strong>Quick overview:</strong> Mean & Range</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-700 mb-2">🔄 How Skewness Affects Measures</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <h5 className="font-semibold text-purple-700">Left Skewed</h5>
                  <p className="text-purple-600">Mean &lt; Median</p>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-700">Symmetric</h5>
                  <p className="text-purple-600">Mean ≈ Median</p>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-700">Right Skewed</h5>
                  <p className="text-purple-600">Mean &gt; Median</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Center & Spread Calculator Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Calculate measures from given data</li>
                <li>• Choose appropriate measures for different scenarios</li>
                <li>• Interpret results in context</li>
                <li>• Master percentile calculations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mean and median calculations</li>
                <li>• Range and IQR determination</li>
                <li>• Outlier impact understanding</li>
                <li>• Percentile interpretation</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Start Calculator Challenge
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
