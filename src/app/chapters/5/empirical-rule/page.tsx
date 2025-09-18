"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface EmpiricalExample {
  name: string;
  context: string;
  mean: number;
  standardDeviation: number;
  unit: string;
  sampleData: number[];
  practicalUse: string;
}

interface Challenge {
  id: number;
  scenario: string;
  mean: number;
  sd: number;
  unit: string;
  questionType: 'percentage' | 'range' | 'interpretation' | 'application';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function EmpiricalRule() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: EmpiricalExample[] = [
    {
      name: "Test Scores",
      context: "Final exam scores in AP Statistics",
      mean: 85,
      standardDeviation: 12,
      unit: "points",
      sampleData: [85, 73, 97, 91, 79, 88, 82, 94, 76, 89],
      practicalUse: "Teachers can identify students who need extra help (below 61) or are ready for advanced work (above 109)."
    },
    {
      name: "Manufacturing Quality",
      context: "Widget weights from production line",
      mean: 500,
      standardDeviation: 15,
      unit: "grams",
      sampleData: [500, 485, 515, 492, 508, 497, 503, 488, 512, 495],
      practicalUse: "Quality control: widgets outside 455-545g range (3 SD) indicate process problems requiring immediate attention."
    },
    {
      name: "Customer Wait Times",
      context: "Service time at drive-through restaurant",
      mean: 4.2,
      standardDeviation: 1.1,
      unit: "minutes",
      sampleData: [4.2, 3.1, 5.3, 3.8, 4.7, 4.0, 4.5, 3.5, 4.9, 4.1],
      practicalUse: "Management knows 95% of customers wait between 2.0-6.4 minutes, helping set realistic expectations and staffing levels."
    },
    {
      name: "Blood Pressure",
      context: "Systolic blood pressure in healthy adults",
      mean: 120,
      standardDeviation: 20,
      unit: "mmHg",
      sampleData: [120, 100, 140, 115, 125, 110, 130, 105, 135, 118],
      practicalUse: "Medical screening: readings above 160 (2 SD) suggest hypertension risk requiring medical evaluation."
    },
    {
      name: "Employee Performance",
      context: "Monthly sales performance ratings",
      mean: 7.5,
      standardDeviation: 1.2,
      unit: "out of 10",
      sampleData: [7.5, 6.3, 8.7, 7.0, 8.1, 7.2, 7.8, 6.9, 8.4, 7.6],
      practicalUse: "HR identifies top performers (above 9.9) for promotion and struggling employees (below 5.1) for additional training."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "SAT Math Scores",
      mean: 520,
      sd: 115,
      unit: "points",
      questionType: 'percentage',
      question: "What percentage of students score between 405 and 635 points?",
      options: [
        "About 34%",
        "About 68%",
        "About 95%",
        "About 50%"
      ],
      correctAnswer: "About 68%",
      explanation: "405 to 635 represents 520 ± 115, which is exactly one standard deviation from the mean. By the empirical rule, approximately 68% of values fall within one standard deviation.",
      skillFocus: "Applying the 68% rule for values within one standard deviation"
    },
    {
      id: 2,
      scenario: "Adult Heights",
      mean: 68,
      sd: 3,
      unit: "inches",
      questionType: 'range',
      question: "Within what range do 95% of adult heights fall?",
      options: [
        "62 to 74 inches",
        "65 to 71 inches", 
        "59 to 77 inches",
        "68 to 74 inches"
      ],
      correctAnswer: "62 to 74 inches",
      explanation: "95% fall within 2 standard deviations: 68 ± (2 × 3) = 68 ± 6 = 62 to 74 inches. This captures the vast majority of the population.",
      skillFocus: "Calculating ranges using the 95% rule for two standard deviations"
    },
    {
      id: 3,
      scenario: "IQ Scores",
      mean: 100,
      sd: 15,
      unit: "points",
      questionType: 'interpretation',
      question: "A person with IQ 145 is in what category?",
      options: [
        "Above average but not exceptional",
        "Exactly 2 standard deviations above average", 
        "Exactly 3 standard deviations above average",
        "Within the normal range"
      ],
      correctAnswer: "Exactly 3 standard deviations above average",
      explanation: "145 = 100 + (3 × 15). This person is 3 standard deviations above the mean, putting them in the top 0.15% of the population - extremely rare!",
      skillFocus: "Interpreting individual values in terms of standard deviations from the mean"
    },
    {
      id: 4,
      scenario: "Reaction Times",
      mean: 250,
      sd: 50,
      unit: "milliseconds",
      questionType: 'percentage',
      question: "What percentage of people have reaction times faster than 150ms or slower than 350ms?",
      options: [
        "About 5%",
        "About 32%",
        "About 2.5%",
        "About 0.3%"
      ],
      correctAnswer: "About 5%",
      explanation: "150ms and 350ms are exactly 2 standard deviations from the mean (250 ± 100). The empirical rule tells us 95% fall within 2 SD, so 5% fall outside this range.",
      skillFocus: "Understanding what percentage falls outside specific standard deviation ranges"
    },
    {
      id: 5,
      scenario: "Product Weights",
      mean: 200,
      sd: 8,
      unit: "grams",
      questionType: 'application',
      question: "For quality control, you want to flag the most extreme 0.3% of products. What weight limits should you use?",
      options: [
        "184 to 216 grams (±2 SD)",
        "192 to 208 grams (±1 SD)",
        "176 to 224 grams (±3 SD)",
        "200 to 224 grams (above mean only)"
      ],
      correctAnswer: "176 to 224 grams (±3 SD)",
      explanation: "99.7% fall within 3 standard deviations, meaning 0.3% fall outside this range. 200 ± (3 × 8) = 176 to 224 grams captures the most extreme values needing quality review.",
      skillFocus: "Using the empirical rule for practical quality control and outlier detection"
    },
    {
      id: 6,
      scenario: "Customer Satisfaction",
      mean: 8.2,
      sd: 1.5,
      unit: "out of 10",
      questionType: 'interpretation',
      question: "A customer rating of 5.2 indicates what level of dissatisfaction?",
      options: [
        "Slightly below average satisfaction",
        "Moderately dissatisfied (1 SD below mean)",
        "Highly dissatisfied (2 SD below mean)",
        "Extremely dissatisfied (3 SD below mean)"
      ],
      correctAnswer: "Highly dissatisfied (2 SD below mean)",
      explanation: "5.2 = 8.2 - (2 × 1.5). This customer is exactly 2 standard deviations below average, indicating significant dissatisfaction that occurs in only about 2.5% of customers.",
      skillFocus: "Interpreting the practical significance of deviations in business contexts"
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
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Empirical Rule Master</h1>
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
                {/* Distribution Parameters */}
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
                    <div className="text-2xl font-bold text-blue-600">68-95-99.7</div>
                    <div className="text-sm text-gray-600">Rule Applies</div>
                    <div className="text-xs text-gray-500">Normal Distribution</div>
                  </div>
                </div>
                
                {/* Quick Reference */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center bg-blue-50 p-2 rounded">
                      <div className="font-semibold text-blue-700">68% within</div>
                      <div className="text-blue-600">{currentChallengeData.mean - currentChallengeData.sd} - {currentChallengeData.mean + currentChallengeData.sd}</div>
                    </div>
                    <div className="text-center bg-green-50 p-2 rounded">
                      <div className="font-semibold text-green-700">95% within</div>
                      <div className="text-green-600">{currentChallengeData.mean - 2*currentChallengeData.sd} - {currentChallengeData.mean + 2*currentChallengeData.sd}</div>
                    </div>
                    <div className="text-center bg-purple-50 p-2 rounded">
                      <div className="font-semibold text-purple-700">99.7% within</div>
                      <div className="text-purple-600">{currentChallengeData.mean - 3*currentChallengeData.sd} - {currentChallengeData.mean + 3*currentChallengeData.sd}</div>
                    </div>
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
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Empirical Rule Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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
                Next Topic
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedEmpiricalExample = examples[selectedExample];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to The Normal Model
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="empirical rule" className="text-4xl">📏</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">The 68-95-99.7 Rule</h1>
              <p className="text-xl text-gray-600 mt-2">
                Unlock the power of normal distributions! Master the most important rule in statistics for making predictions and understanding variation.
              </p>
            </div>
          </div>
        </div>

        {/* The Magic Numbers */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 The Magic Numbers</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">In ANY Normal Distribution:</h3>
                <p className="text-gray-600">These percentages ALWAYS hold, regardless of the mean or standard deviation!</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">~68%</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">Within 1 Standard Deviation</div>
                  <div className="text-sm text-gray-600">μ ± 1σ</div>
                  <div className="mt-3 text-xs text-blue-600 bg-blue-50 p-2 rounded">About 2/3 of all values</div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">~95%</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">Within 2 Standard Deviations</div>
                  <div className="text-sm text-gray-600">μ ± 2σ</div>
                  <div className="mt-3 text-xs text-green-600 bg-green-50 p-2 rounded">Nearly all typical values</div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">~99.7%</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">Within 3 Standard Deviations</div>
                  <div className="text-sm text-gray-600">μ ± 3σ</div>
                  <div className="mt-3 text-xs text-purple-600 bg-purple-50 p-2 rounded">Virtually everything!</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Why This Rule Is So Powerful</h3>
                  <p className="text-yellow-600">
                    No matter what you're measuring - test scores, heights, manufacturing quality, response times - 
                    if it's normally distributed, these percentages let you instantly understand the data and make predictions!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Bell Curve */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Visual Guide to the Empirical Rule</h2>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            {/* Bell Curve Visualization */}
            <div className="relative mb-8">
              <div className="w-full h-40 relative">
                {/* Background areas */}
                <div className="absolute inset-0 flex items-end justify-center">
                  {/* 3 SD area (full width) */}
                  <div className="w-full h-4 bg-purple-200 rounded-b-lg absolute bottom-0"></div>
                  
                  {/* 2 SD area */}
                  <div className="w-5/6 h-12 bg-green-200 rounded-b-lg absolute bottom-0"></div>
                  
                  {/* 1 SD area */}
                  <div className="w-2/3 h-24 bg-blue-200 rounded-b-lg absolute bottom-0"></div>
                  
                  {/* Center peak */}
                  <div className="w-4 h-40 bg-[#ff8200] rounded-t-full"></div>
                </div>
              </div>
              
              {/* Labels */}
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-purple-600">-3σ</div>
                  <div className="text-xs text-gray-500">0.15%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">-2σ</div>
                  <div className="text-xs text-gray-500">2.5%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">-1σ</div>
                  <div className="text-xs text-gray-500">16%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#ff8200]">μ</div>
                  <div className="text-xs text-gray-500">50%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">+1σ</div>
                  <div className="text-xs text-gray-500">84%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">+2σ</div>
                  <div className="text-xs text-gray-500">97.5%</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">+3σ</div>
                  <div className="text-xs text-gray-500">99.85%</div>
                </div>
              </div>
            </div>
            
            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🎯 Quick Estimates</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• About 1/3 of values are more than 1 SD from mean</li>
                  <li>• Only 5% are more than 2 SD from mean</li>
                  <li>• Values beyond 3 SD are extremely rare!</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">⚠️ Outlier Detection</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Values beyond 2 SD deserve attention</li>
                  <li>• Values beyond 3 SD are highly unusual</li>
                  <li>• Use for quality control and anomaly detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Applications</h2>
          
          {/* Example Selection */}
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

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedEmpiricalExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedEmpiricalExample.context}</p>
            </div>

            {/* Parameters and Calculations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">📊 Distribution Parameters</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Mean (μ):</span>
                    <span className="font-bold">{selectedEmpiricalExample.mean} {selectedEmpiricalExample.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Deviation (σ):</span>
                    <span className="font-bold">{selectedEmpiricalExample.standardDeviation} {selectedEmpiricalExample.unit}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">📏 Empirical Rule Ranges</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-600">68% within:</span>
                    <span className="font-medium">
                      {selectedEmpiricalExample.mean - selectedEmpiricalExample.standardDeviation} - {selectedEmpiricalExample.mean + selectedEmpiricalExample.standardDeviation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">95% within:</span>
                    <span className="font-medium">
                      {selectedEmpiricalExample.mean - 2*selectedEmpiricalExample.standardDeviation} - {selectedEmpiricalExample.mean + 2*selectedEmpiricalExample.standardDeviation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">99.7% within:</span>
                    <span className="font-medium">
                      {selectedEmpiricalExample.mean - 3*selectedEmpiricalExample.standardDeviation} - {selectedEmpiricalExample.mean + 3*selectedEmpiricalExample.standardDeviation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Data Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-4">📈 Sample Data Points</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedEmpiricalExample.sampleData.map((value, index) => {
                  const deviations = Math.abs(value - selectedEmpiricalExample.mean) / selectedEmpiricalExample.standardDeviation;
                  let bgColor = 'bg-blue-100 text-blue-700'; // Within 1 SD
                  if (deviations > 2) bgColor = 'bg-purple-100 text-purple-700'; // Beyond 2 SD
                  else if (deviations > 1) bgColor = 'bg-green-100 text-green-700'; // 1-2 SD
                  
                  return (
                    <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Practical Application */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-700 mb-2">💼 Practical Use</h4>
              <p className="text-yellow-600 text-sm">{selectedEmpiricalExample.practicalUse}</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📋 How to Apply the Empirical Rule</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">Step-by-Step Process:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <strong>Confirm Normal Distribution:</strong> Check that your data is approximately bell-shaped and symmetric.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <strong>Identify Mean & Standard Deviation:</strong> You need both parameters to apply the rule.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <strong>Calculate Ranges:</strong> Mean ± 1σ, ± 2σ, and ± 3σ to get your percentage ranges.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <strong>Apply Percentages:</strong> Use 68%, 95%, and 99.7% to answer questions or make predictions.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <strong>Interpret Results:</strong> Put your findings back in the real-world context of your problem.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Empirical Rule Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Apply the 68-95-99.7 rule to real scenarios</li>
                <li>• Calculate ranges and percentages quickly</li>
                <li>• Interpret results in practical contexts</li>
                <li>• Master outlier detection techniques</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Instant percentage calculations</li>
                <li>• Professional data interpretation</li>
                <li>• Quality control applications</li>
                <li>• Confidence in statistical reasoning</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master the Empirical Rule
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
