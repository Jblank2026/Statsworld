"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Dataset {
  name: string;
  context: string;
  categoricalVariable: string;
  quantitativeVariable: string;
  categories: string[];
  data: { [key: string]: number[] };
  associationType: 'Strong Association' | 'Weak Association' | 'No Association';
  explanation: string;
  keyInsight: string;
}

interface Challenge {
  id: number;
  dataset: Dataset;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function BoxplotAssociation() {
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const datasets: Dataset[] = [
    {
      name: "Student Study Hours vs. Test Scores",
      context: "Analyzing the relationship between study method (categorical) and test scores (quantitative)",
      categoricalVariable: "Study Method",
      quantitativeVariable: "Test Score",
      categories: ["Self-Study", "Group Study", "Tutoring"],
      data: {
        "Self-Study": [72, 75, 68, 82, 79, 71, 85, 74, 77, 80, 69, 83],
        "Group Study": [88, 91, 85, 89, 92, 87, 90, 86, 94, 89, 91, 88],
        "Tutoring": [95, 92, 89, 96, 93, 91, 94, 90, 97, 95, 92, 93]
      },
      associationType: "Strong Association",
      explanation: "Clear separation between groups with little overlap. Tutoring consistently shows highest scores, followed by group study, then self-study.",
      keyInsight: "Study method strongly predicts test performance - different methods lead to systematically different outcomes."
    },
    {
      name: "Exercise Type vs. Calories Burned",
      context: "Comparing calories burned (quantitative) across different exercise types (categorical)",
      categoricalVariable: "Exercise Type",
      quantitativeVariable: "Calories Burned",
      categories: ["Walking", "Swimming", "Running"],
      data: {
        "Walking": [180, 195, 170, 185, 175, 190, 165, 200, 178, 188],
        "Swimming": [320, 345, 310, 335, 325, 340, 315, 350, 330, 342],
        "Running": [450, 475, 440, 465, 455, 480, 445, 485, 460, 470]
      },
      associationType: "Strong Association",
      explanation: "Distinct separation with minimal overlap. Running burns most calories, swimming moderate, walking least.",
      keyInsight: "Exercise type has a strong effect on calorie burn - more intense activities consistently burn more calories."
    },
    {
      name: "Coffee Shop Size vs. Daily Revenue",
      context: "Examining daily revenue (quantitative) by coffee shop size category (categorical)",
      categoricalVariable: "Shop Size",
      quantitativeVariable: "Daily Revenue ($)",
      categories: ["Small", "Medium", "Large"],
      data: {
        "Small": [850, 920, 780, 890, 860, 900, 820, 940, 875, 885],
        "Medium": [920, 980, 860, 950, 930, 970, 890, 1000, 940, 960],
        "Large": [960, 1020, 900, 980, 970, 1010, 930, 1040, 985, 995]
      },
      associationType: "Weak Association",
      explanation: "Some overlap between groups but clear trend. Large shops tend to earn more, but there's considerable overlap with medium shops.",
      keyInsight: "Shop size shows a weak association with revenue - larger shops tend to earn more, but with significant overlap."
    },
    {
      name: "Music Genre vs. Song Length",
      context: "Analyzing song length (quantitative) across different music genres (categorical)",
      categoricalVariable: "Music Genre",
      quantitativeVariable: "Song Length (minutes)",
      categories: ["Pop", "Rock", "Classical"],
      data: {
        "Pop": [3.2, 3.8, 3.5, 3.1, 3.6, 3.4, 3.7, 3.3, 3.9, 3.5],
        "Rock": [3.4, 3.9, 3.6, 3.2, 3.8, 3.5, 3.7, 3.3, 4.0, 3.6],
        "Classical": [3.3, 3.7, 3.4, 3.8, 3.5, 3.6, 3.9, 3.2, 3.8, 3.4]
      },
      associationType: "No Association",
      explanation: "Extensive overlap with similar centers and spreads across all genres. No clear pattern distinguishes the groups.",
      keyInsight: "Music genre has no association with song length - all genres show similar song durations."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      dataset: datasets[0],
      question: "Based on the side-by-side boxplots for study method vs. test scores, what type of association exists?",
      options: [
        "Strong Association - clear separation between groups",
        "Weak Association - some overlap but trends visible",
        "No Association - groups are nearly identical",
        "Cannot determine from boxplots"
      ],
      correctAnswer: "Strong Association - clear separation between groups",
      explanation: "The boxplots show clear separation between groups with minimal overlap. Each study method produces systematically different test score distributions.",
      skillFocus: "Identifying strong associations through visual separation in boxplots"
    },
    {
      id: 2,
      dataset: datasets[2],
      question: "What evidence suggests a weak association between shop size and daily revenue?",
      options: [
        "Perfect separation between all groups",
        "Some overlap between groups but clear overall trend",
        "Complete overlap with identical medians",
        "No discernible pattern in the data"
      ],
      correctAnswer: "Some overlap between groups but clear overall trend",
      explanation: "While there's an upward trend from small to large shops, the boxplots show considerable overlap, especially between medium and large shops.",
      skillFocus: "Distinguishing weak associations from strong associations using overlap patterns"
    },
    {
      id: 3,
      dataset: datasets[3],
      question: "Why do the music genre boxplots suggest no association with song length?",
      options: [
        "One genre is clearly different from others",
        "All genres show similar centers and significant overlap",
        "The data shows a clear upward trend",
        "There are too many outliers to determine"
      ],
      correctAnswer: "All genres show similar centers and significant overlap",
      explanation: "The boxplots for all three genres have similar medians, quartiles, and ranges with extensive overlap, indicating no meaningful association.",
      skillFocus: "Recognizing when categorical variables show no association with quantitative variables"
    },
    {
      id: 4,
      dataset: datasets[1],
      question: "What makes the exercise type vs. calories burned association particularly strong?",
      options: [
        "All groups have the same median",
        "Minimal or no overlap between group distributions",
        "High variability within each group",
        "Similar spread across all groups"
      ],
      correctAnswer: "Minimal or no overlap between group distributions",
      explanation: "The boxplots show distinct separation with virtually no overlap between running, swimming, and walking groups, indicating a very strong association.",
      skillFocus: "Understanding how overlap patterns indicate association strength"
    }
  ];

  const calculateStats = (data: number[]) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    
    const q1Index = Math.floor((n + 1) / 4) - 1;
    const q3Index = Math.floor(3 * (n + 1) / 4) - 1;
    const medianIndex = Math.floor(n / 2);
    
    const median = n % 2 === 0 
      ? (sorted[medianIndex - 1] + sorted[medianIndex]) / 2 
      : sorted[medianIndex];
    
    const q1 = sorted[q1Index] || sorted[0];
    const q3 = sorted[q3Index] || sorted[n - 1];
    const min = sorted[0];
    const max = sorted[n - 1];
    
    return { 
      min: Math.round(min * 10) / 10, 
      q1: Math.round(q1 * 10) / 10, 
      median: Math.round(median * 10) / 10, 
      q3: Math.round(q3 * 10) / 10, 
      max: Math.round(max * 10) / 10 
    };
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
                <h1 className="text-2xl font-bold text-[#58595b]">Association Analysis Challenge</h1>
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
                
                {/* Boxplot Visualization */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-3">📈 Side-by-Side Boxplots:</h4>
                  <div className="space-y-4">
                    {currentChallengeData.dataset.categories.map((category, index) => {
                      const stats = calculateStats(currentChallengeData.dataset.data[category]);
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];
                      const allData = Object.values(currentChallengeData.dataset.data).flat();
                      const globalMin = Math.min(...allData);
                      const globalMax = Math.max(...allData);
                      const range = globalMax - globalMin;
                      
                      return (
                        <div key={category} className="flex items-center space-x-4">
                          <div className="w-24 text-sm font-medium text-gray-700">{category}</div>
                          <div className="flex-1 relative h-12 bg-gray-100 rounded">
                            {/* Boxplot visualization */}
                            <div className="absolute top-1/2 transform -translate-y-1/2 h-8 flex items-center"
                                 style={{ 
                                   left: `${((stats.q1 - globalMin) / range) * 100}%`,
                                   width: `${((stats.q3 - stats.q1) / range) * 100}%`
                                 }}>
                              {/* Box */}
                              <div className={`${colors[index]} h-8 w-full border-2 border-gray-700 relative`}>
                                {/* Median line */}
                                <div 
                                  className="absolute top-0 bottom-0 w-0.5 bg-white"
                                  style={{ left: `${((stats.median - stats.q1) / (stats.q3 - stats.q1)) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Whiskers */}
                            <div className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-700"
                                 style={{ 
                                   left: `${((stats.min - globalMin) / range) * 100}%`,
                                   width: `${((stats.q1 - stats.min) / range) * 100}%`
                                 }}>
                            </div>
                            <div className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-700"
                                 style={{ 
                                   left: `${((stats.q3 - globalMin) / range) * 100}%`,
                                   width: `${((stats.max - stats.q3) / range) * 100}%`
                                 }}>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 w-32">
                            Median: {stats.median}
                          </div>
                        </div>
                      );
                    })}
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
                  <p className="text-sm text-gray-500">Next question in 3 seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Game Results Screen
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
              {score >= 3 ? '🎉' : score >= 2 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 3 ? 'Association Expert!' : score >= 2 ? 'Great Work!' : 'Keep Learning!'}
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
                Back to Chapter 4
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main Content Screen
  const selectedExample = datasets[selectedDataset];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Comparing Distributions
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="boxplot association" className="text-4xl">🔍</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Boxplot Association Analysis</h1>
              <p className="text-xl text-gray-600 mt-2">
                Discover relationships between categorical and quantitative variables using side-by-side boxplots!
              </p>
            </div>
          </div>
        </div>

        {/* Association Types Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Types of Association</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-700 mb-3 text-lg">🟢 Strong Association</h3>
              <ul className="text-green-600 text-sm space-y-2">
                <li>• Clear separation between groups</li>
                <li>• Minimal or no overlap between boxplots</li>
                <li>• Different medians and quartiles</li>
                <li>• Categorical variable strongly predicts quantitative variable</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-700 mb-3 text-lg">🟡 Weak Association</h3>
              <ul className="text-yellow-600 text-sm space-y-2">
                <li>• Some separation but noticeable overlap</li>
                <li>• Trend visible but not definitive</li>
                <li>• Moderately different centers</li>
                <li>• Categorical variable somewhat predicts quantitative variable</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-700 mb-3 text-lg">⚪ No Association</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Extensive overlap between groups</li>
                <li>• Similar medians and quartiles</li>
                <li>• No clear pattern or trend</li>
                <li>• Categorical variable doesn't predict quantitative variable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Interactive Association Explorer</h2>
          
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

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedExample.context}</p>
            </div>

            {/* Boxplot Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-4">📈 Side-by-Side Boxplots:</h4>
              <div className="space-y-4 mb-6">
                {selectedExample.categories.map((category, index) => {
                  const stats = calculateStats(selectedExample.data[category]);
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];
                  const allData = Object.values(selectedExample.data).flat();
                  const globalMin = Math.min(...allData);
                  const globalMax = Math.max(...allData);
                  const range = globalMax - globalMin;
                  
                  return (
                    <div key={category} className="flex items-center space-x-4">
                      <div className="w-24 text-sm font-medium text-gray-700">{category}</div>
                      <div className="flex-1 relative h-12 bg-gray-100 rounded">
                        {/* Boxplot visualization */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 h-8 flex items-center"
                             style={{ 
                               left: `${((stats.q1 - globalMin) / range) * 100}%`,
                               width: `${((stats.q3 - stats.q1) / range) * 100}%`
                             }}>
                          {/* Box */}
                          <div className={`${colors[index]} h-8 w-full border-2 border-gray-700 relative`}>
                            {/* Median line */}
                            <div 
                              className="absolute top-0 bottom-0 w-0.5 bg-white"
                              style={{ left: `${((stats.median - stats.q1) / (stats.q3 - stats.q1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Whiskers */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-700"
                             style={{ 
                               left: `${((stats.min - globalMin) / range) * 100}%`,
                               width: `${((stats.q1 - stats.min) / range) * 100}%`
                             }}>
                        </div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-700"
                             style={{ 
                               left: `${((stats.q3 - globalMin) / range) * 100}%`,
                               width: `${((stats.max - stats.q3) / range) * 100}%`
                             }}>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 w-32">
                        Median: {stats.median}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scale Reference */}
              <div className="flex justify-between text-xs text-gray-500 px-28">
                <span>{Math.min(...Object.values(selectedExample.data).flat())}</span>
                <span>{Math.max(...Object.values(selectedExample.data).flat())}</span>
              </div>
            </div>

            {/* Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border rounded-lg p-4 ${
                selectedExample.associationType === 'Strong Association' 
                  ? 'bg-green-50 border-green-200' 
                  : selectedExample.associationType === 'Weak Association'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  selectedExample.associationType === 'Strong Association' 
                    ? 'text-green-700' 
                    : selectedExample.associationType === 'Weak Association'
                    ? 'text-yellow-700'
                    : 'text-gray-700'
                }`}>
                  🎯 Association Type: {selectedExample.associationType}
                </h4>
                <p className={`text-sm ${
                  selectedExample.associationType === 'Strong Association' 
                    ? 'text-green-600' 
                    : selectedExample.associationType === 'Weak Association'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
                }`}>
                  {selectedExample.explanation}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">💡 Key Insight</h4>
                <p className="text-blue-600 text-sm">{selectedExample.keyInsight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Association Analysis Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze side-by-side boxplots</li>
                <li>• Look for patterns in separation and overlap</li>
                <li>• Determine association strength</li>
                <li>• Understand what drives relationships</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Visual pattern recognition in boxplots</li>
                <li>• Association strength assessment</li>
                <li>• Categorical-quantitative relationships</li>
                <li>• Statistical reasoning and interpretation</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Association Analysis
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
