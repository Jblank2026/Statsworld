"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface GameScenario {
  id: number;
  title: string;
  context: string;
  data: number[];
  fiveNumberSummary: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  };
  outliers: number[];
  correctInterpretation: {
    shape: 'symmetric' | 'right-skewed' | 'left-skewed';
    center: string;
    spread: string;
    outlierAnalysis: string;
    practicalImplication: string;
  };
}

interface Challenge {
  id: number;
  scenario: GameScenario;
  questionType: 'shape' | 'center' | 'spread' | 'outliers' | 'comparison' | 'interpretation';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function BoxplotGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameMode, setGameMode] = useState<'practice' | 'challenge'>('practice');

  const scenarios: GameScenario[] = [
    {
      id: 1,
      title: "Employee Performance Reviews",
      context: "Annual performance ratings (1-10 scale) for a department of 50 employees",
      data: [6.2, 6.8, 7.1, 7.4, 7.7, 8.0, 8.3, 8.6, 8.9, 9.2, 9.5, 4.1, 3.8],
      fiveNumberSummary: {
        min: 6.2,
        q1: 7.1,
        median: 8.0,
        q3: 8.6,
        max: 9.5
      },
      outliers: [4.1, 3.8],
      correctInterpretation: {
        shape: 'symmetric',
        center: "Median performance rating is 8.0, indicating generally strong employee performance",
        spread: "IQR of 1.5 points (7.1-8.6) shows relatively consistent performance across most employees",
        outlierAnalysis: "Two employees (3.8, 4.1) performed significantly below expectations and need attention",
        practicalImplication: "Most employees are performing well, but targeted support is needed for the two struggling performers"
      }
    },
    {
      id: 2,
      title: "Website Response Times",
      context: "Page load times in milliseconds during peak traffic analysis",
      data: [145, 152, 168, 178, 185, 195, 212, 225, 238, 265, 295, 450, 520],
      fiveNumberSummary: {
        min: 145,
        q1: 168,
        median: 195,
        q3: 238,
        max: 295
      },
      outliers: [450, 520],
      correctInterpretation: {
        shape: 'right-skewed',
        center: "Median response time of 195ms indicates generally good performance",
        spread: "IQR of 70ms (168-238) shows moderate variability in normal response times",
        outlierAnalysis: "Two extreme response times (450ms, 520ms) indicate serious performance issues requiring investigation",
        practicalImplication: "Core performance is acceptable, but server problems are causing unacceptable delays for some users"
      }
    },
    {
      id: 3,
      title: "Student Test Scores Distribution",
      context: "Final exam scores (out of 100) for Advanced Statistics course",
      data: [78, 82, 85, 88, 91, 94, 96, 98, 100, 45, 52],
      fiveNumberSummary: {
        min: 78,
        q1: 85,
        median: 91,
        q3: 96,
        max: 100
      },
      outliers: [45, 52],
      correctInterpretation: {
        shape: 'left-skewed',
        center: "Median score of 91 indicates most students mastered the material well",
        spread: "IQR of 11 points (85-96) shows consistent high performance among most students",
        outlierAnalysis: "Two students (45, 52) scored far below the rest, suggesting they may need academic support",
        practicalImplication: "Course objectives were met by most students, but intervention needed for struggling learners"
      }
    },
    {
      id: 4,
      title: "Manufacturing Quality Control",
      context: "Product weights in grams from automated production line",
      data: [499.2, 499.8, 500.1, 500.4, 500.7, 501.0, 501.3, 501.6, 501.9, 485.2, 518.4],
      fiveNumberSummary: {
        min: 499.2,
        q1: 500.1,
        median: 500.7,
        q3: 501.3,
        max: 501.9
      },
      outliers: [485.2, 518.4],
      correctInterpretation: {
        shape: 'symmetric',
        center: "Target weight of 500.7g indicates good process centering",
        spread: "Tight IQR of 1.2g (500.1-501.3) demonstrates excellent process control",
        outlierAnalysis: "Two products (485.2g, 518.4g) are outside specifications and require process investigation",
        practicalImplication: "Manufacturing process is well-controlled, but outliers suggest occasional equipment drift"
      }
    },
    {
      id: 5,
      title: "Customer Satisfaction Survey",
      context: "Satisfaction ratings (1-10 scale) from monthly customer feedback",
      data: [7.8, 8.1, 8.4, 8.7, 9.0, 9.3, 9.6, 9.9, 3.2, 2.8],
      fiveNumberSummary: {
        min: 7.8,
        q1: 8.4,
        median: 8.85,
        q3: 9.3,
        max: 9.9
      },
      outliers: [3.2, 2.8],
      correctInterpretation: {
        shape: 'left-skewed',
        center: "High median satisfaction of 8.85 indicates excellent customer experience overall",
        spread: "Narrow IQR of 0.9 points (8.4-9.3) shows consistently high satisfaction",
        outlierAnalysis: "Two very dissatisfied customers (2.8, 3.2) represent critical service failures",
        practicalImplication: "Customer satisfaction is excellent overall, but immediate follow-up needed with unhappy customers"
      }
    },
    {
      id: 6,
      title: "Sales Team Performance",
      context: "Monthly sales figures (in thousands) for regional sales representatives",
      data: [45, 52, 58, 64, 70, 76, 82, 88, 94, 125, 18],
      fiveNumberSummary: {
        min: 45,
        q1: 58,
        median: 70,
        q3: 82,
        max: 94
      },
      outliers: [125, 18],
      correctInterpretation: {
        shape: 'symmetric',
        center: "Median sales of $70K indicates solid team performance",
        spread: "IQR of $24K (58-82) shows reasonable variation in individual performance",
        outlierAnalysis: "One exceptional performer ($125K) and one struggling rep ($18K) require different management approaches",
        practicalImplication: "Most reps are performing within expectations, but both high and low performers need attention"
      }
    }
  ];

  const generateChallenges = (selectedScenarios: GameScenario[]): Challenge[] => {
    const challenges: Challenge[] = [];
    
    selectedScenarios.forEach((scenario) => {
      // Shape identification challenge
      challenges.push({
        id: challenges.length + 1,
        scenario,
        questionType: 'shape',
        question: `Based on the five-number summary, what is the shape of this distribution?`,
        options: [
          "Symmetric - median is centered between quartiles",
          "Right-skewed - median closer to Q1 than Q3",
          "Left-skewed - median closer to Q3 than Q1",
          "Cannot determine shape from this information"
        ],
        correctAnswer: scenario.correctInterpretation.shape === 'symmetric' ? 
          "Symmetric - median is centered between quartiles" :
          scenario.correctInterpretation.shape === 'right-skewed' ?
          "Right-skewed - median closer to Q1 than Q3" :
          "Left-skewed - median closer to Q3 than Q1",
        explanation: `${scenario.correctInterpretation.shape === 'symmetric' ? 
          'The median is approximately centered between Q1 and Q3, indicating a symmetric distribution.' :
          scenario.correctInterpretation.shape === 'right-skewed' ?
          'The median is closer to Q1 than Q3, and the upper whisker is longer, indicating right skewness.' :
          'The median is closer to Q3 than Q1, and the lower whisker is longer, indicating left skewness.'} ${scenario.correctInterpretation.center}`,
        skillFocus: "Identifying distribution shape from boxplot five-number summary"
      });

      // Outlier interpretation challenge
      if (scenario.outliers.length > 0) {
        challenges.push({
          id: challenges.length + 1,
          scenario,
          questionType: 'outliers',
          question: `How should we interpret the outliers in this ${scenario.title.toLowerCase()} context?`,
          options: [
            "Ignore them as statistical anomalies",
            "Remove them to clean the data",
            "Investigate and address the underlying causes",
            "They represent normal variation"
          ],
          correctAnswer: "Investigate and address the underlying causes",
          explanation: `${scenario.correctInterpretation.outlierAnalysis} In real-world contexts, outliers often signal important issues that require investigation and action rather than simply being ignored or removed.`,
          skillFocus: "Interpreting outliers in practical business and operational contexts"
        });
      }

      // Practical implication challenge
      challenges.push({
        id: challenges.length + 1,
        scenario,
        questionType: 'interpretation',
        question: `What is the most important practical takeaway from this boxplot analysis?`,
        options: [
          "The data follows a normal distribution",
          "Statistical analysis is complete",
          scenario.correctInterpretation.practicalImplication,
          "More data collection is needed"
        ],
        correctAnswer: scenario.correctInterpretation.practicalImplication,
        explanation: `${scenario.correctInterpretation.practicalImplication} This demonstrates how boxplot analysis provides actionable insights for real-world decision making beyond just statistical description.`,
        skillFocus: "Translating statistical analysis into actionable business insights"
      });
    });

    return challenges;
  };

  const practiceGame = generateChallenges(scenarios.slice(0, 2));
  const challengeGame = generateChallenges(scenarios);
  
  const currentChallenges = gameMode === 'practice' ? practiceGame : challengeGame;

  const startGame = (mode: 'practice' | 'challenge') => {
    setGameMode(mode);
    setGameStarted(true);
    setCurrentChallenge(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  const handleSubmit = () => {
    const challenge = currentChallenges[currentChallenge];
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
      if (currentChallenge < currentChallenges.length - 1) {
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
    const currentChallengeData = currentChallenges[currentChallenge];
    const scenario = currentChallengeData.scenario;

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
                <h1 className="text-2xl font-bold text-[#58595b]">Boxplot Builder Challenge</h1>
                <p className="text-gray-600">
                  {gameMode === 'practice' ? 'Practice Mode' : 'Full Challenge'} - 
                  Challenge {currentChallenge + 1} of {currentChallenges.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentChallenge + 1) / currentChallenges.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 {scenario.title}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Scenario:</h4>
                  <p className="text-gray-600 text-sm">{scenario.context}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Five-Number Summary:</h4>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded border">
                        <div className="font-bold text-[#58595b]">{scenario.fiveNumberSummary.min}</div>
                        <div className="text-gray-600">Min</div>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <div className="font-bold text-blue-600">{scenario.fiveNumberSummary.q1}</div>
                        <div className="text-gray-600">Q1</div>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <div className="font-bold text-green-600">{scenario.fiveNumberSummary.median}</div>
                        <div className="text-gray-600">Med</div>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <div className="font-bold text-orange-600">{scenario.fiveNumberSummary.q3}</div>
                        <div className="text-gray-600">Q3</div>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <div className="font-bold text-[#58595b]">{scenario.fiveNumberSummary.max}</div>
                        <div className="text-gray-600">Max</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Additional Information:</h4>
                    <div className="text-sm space-y-1">
                      <div>IQR = {scenario.fiveNumberSummary.q3 - scenario.fiveNumberSummary.q1}</div>
                      <div>Range = {scenario.fiveNumberSummary.max - scenario.fiveNumberSummary.min}</div>
                      {scenario.outliers.length > 0 && (
                        <div className="bg-red-50 border border-red-200 p-2 rounded mt-2">
                          <strong className="text-red-700">Outliers:</strong> {scenario.outliers.join(', ')}
                        </div>
                      )}
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
    const totalChallenges = currentChallenges.length;
    const percentage = Math.round((score / totalChallenges) * 100);

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
              {percentage >= 85 ? '🎉' : percentage >= 70 ? '👍' : percentage >= 50 ? '📚' : '💪'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {percentage >= 85 ? 'Boxplot Master!' : 
               percentage >= 70 ? 'Great Analysis!' : 
               percentage >= 50 ? 'Solid Progress!' : 'Keep Building!'}
            </h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {totalChallenges}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{percentage}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {gameMode === 'practice' ? 'Practice' : 'Full'}
                </div>
                <div className="text-sm text-gray-600">Mode</div>
              </div>
            </div>

            {/* Performance Feedback */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-[#58595b] mb-4">Performance Analysis</h3>
              <div className="text-sm text-gray-600 space-y-2">
                {percentage >= 85 && (
                  <p className="text-green-600">🌟 Outstanding boxplot analysis skills! You're ready for advanced statistical interpretation.</p>
                )}
                {percentage >= 70 && percentage < 85 && (
                  <p className="text-blue-600">💪 Strong analytical foundation. Consider practicing outlier interpretation for mastery.</p>
                )}
                {percentage >= 50 && percentage < 70 && (
                  <p className="text-orange-600">📖 Good progress! Focus on connecting statistical features to real-world implications.</p>
                )}
                {percentage < 50 && (
                  <p className="text-red-600">🔄 Keep practicing! Review the five-number summary and shape identification concepts.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartGame}
                  className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg"
                >
                  Try Again
                </button>
                {gameMode === 'practice' && (
                  <button
                    onClick={() => startGame('challenge')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Full Challenge
                  </button>
                )}
              </div>
              <Link
                href="/chapters/4"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Chapter Complete!
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
              <span role="img" aria-label="boxplot challenge" className="text-4xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Boxplot Builder Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Put your boxplot mastery to the ultimate test! Analyze real-world scenarios and demonstrate your distribution comparison expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Your Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">What You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Five-number summary interpretation</li>
                <li>• Distribution shape identification</li>
                <li>• Outlier analysis and decision-making</li>
                <li>• Professional statistical communication</li>
                <li>• Real-world application of boxplot insights</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Demonstrate</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Advanced boxplot interpretation</li>
                <li>• Business decision-making with data</li>
                <li>• Quality control analysis</li>
                <li>• Performance evaluation expertise</li>
                <li>• Statistical reasoning and communication</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="font-bold text-yellow-700 mb-2">Professional-Level Analysis</h3>
                <p className="text-yellow-600">
                  Each scenario presents real workplace situations where boxplot analysis drives important decisions. 
                  You'll work with employee performance, manufacturing quality, customer satisfaction, and more - 
                  just like a professional data analyst!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Challenge Scenarios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.slice(0, 6).map((scenario) => (
              <div key={scenario.id} className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-bold text-[#58595b] mb-2">{scenario.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{scenario.context}</p>
                <div className="bg-white p-2 rounded border">
                  <div className="text-xs text-gray-600 mb-1">Five-Number Summary:</div>
                  <div className="text-xs grid grid-cols-5 gap-1">
                    <span className="font-bold">{scenario.fiveNumberSummary.min}</span>
                    <span className="font-bold">{scenario.fiveNumberSummary.q1}</span>
                    <span className="font-bold text-green-600">{scenario.fiveNumberSummary.median}</span>
                    <span className="font-bold">{scenario.fiveNumberSummary.q3}</span>
                    <span className="font-bold">{scenario.fiveNumberSummary.max}</span>
                  </div>
                  {scenario.outliers.length > 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      Outliers: {scenario.outliers.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Choose Your Challenge Level</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Practice Mode */}
            <div className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Practice Mode</h3>
                <p className="text-blue-600">Perfect for skill building</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Scenarios:</span>
                  <span className="font-bold text-blue-700">2 focused cases</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-bold text-blue-700">6 challenges</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-bold text-blue-700">~8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus:</span>
                  <span className="font-bold text-blue-700">Core concepts</span>
                </div>
              </div>

              <button
                onClick={() => startGame('practice')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Practice Mode
              </button>
            </div>

            {/* Full Challenge */}
            <div className="border-2 border-purple-200 rounded-lg p-6 hover:border-purple-400 transition-colors">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Full Challenge</h3>
                <p className="text-purple-600">Complete mastery assessment</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Scenarios:</span>
                  <span className="font-bold text-purple-700">6 diverse cases</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-bold text-purple-700">18 challenges</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-bold text-purple-700">~20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus:</span>
                  <span className="font-bold text-purple-700">Professional analysis</span>
                </div>
              </div>

              <button
                onClick={() => startGame('challenge')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Full Challenge
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-[#58595b] mb-3">💡 Success Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Shape Analysis:</strong> Compare median position to quartiles - centered means symmetric, off-center indicates skewness.
              </div>
              <div>
                <strong>Outlier Context:</strong> Always consider what outliers mean in the real-world situation before deciding on action.
              </div>
              <div>
                <strong>IQR Focus:</strong> The box (IQR) contains 50% of your data - this is where most of the action happens.
              </div>
              <div>
                <strong>Practical Impact:</strong> Think beyond statistics - how do these patterns affect business decisions and outcomes?
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
