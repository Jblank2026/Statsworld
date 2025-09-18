"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  title: string;
  context: string;
  data: number[][];
  rowLabels: string[];
  colLabels: string[];
  hasAssociation: boolean;
  associationType: string;
  explanation: string;
  realWorldImplication: string;
  independenceCheck: string;
}

interface Challenge {
  id: number;
  scenario: Scenario;
  questionType: 'identify' | 'explain' | 'calculate' | 'interpret';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  conceptConnection: string;
}

export default function IndependenceAssociation() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Coin Flips & Weather",
      context: "A student tracked 200 coin flips over different weather conditions to test if weather affects coin fairness",
      data: [
        [48, 52], // Sunny: Heads, Tails
        [49, 51], // Rainy: Heads, Tails
        [51, 49]  // Cloudy: Heads, Tails
      ],
      rowLabels: ["Sunny", "Rainy", "Cloudy"],
      colLabels: ["Heads", "Tails"],
      hasAssociation: false,
      associationType: "Independence",
      explanation: "Weather has no effect on coin outcomes. All conditions show approximately 50% heads, 50% tails - exactly what we'd expect if the variables are independent.",
      realWorldImplication: "Physical coin tosses are not influenced by weather conditions. This demonstrates true statistical independence.",
      independenceCheck: "Each weather condition shows ~50% heads rate, confirming independence."
    },
    {
      id: 2,
      title: "Study Time & Exam Performance",
      context: "A professor analyzed the relationship between study time categories and exam performance for 300 students",
      data: [
        [15, 35, 50], // Low study: A, B, C
        [45, 40, 15], // Medium study: A, B, C
        [70, 25, 5]   // High study: A, B, C
      ],
      rowLabels: ["Low Study (<2hrs)", "Medium Study (2-5hrs)", "High Study (>5hrs)"],
      colLabels: ["Grade A", "Grade B", "Grade C"],
      hasAssociation: true,
      associationType: "Strong Positive Association",
      explanation: "Study time strongly predicts exam performance. Low study yields 15% A's, medium study yields 45% A's, high study yields 70% A's.",
      realWorldImplication: "Students who study more achieve better grades. This suggests study time is an important factor in academic success.",
      independenceCheck: "If independent, all study groups would show similar grade distributions. They clearly don't."
    },
    {
      id: 3,
      title: "Hair Color & Eye Color",
      context: "A genetics study examined 400 people to investigate the relationship between hair color and eye color",
      data: [
        [5, 15, 80],  // Blonde: Brown eyes, Blue eyes, Green eyes
        [60, 25, 15], // Brown: Brown eyes, Blue eyes, Green eyes  
        [45, 35, 20]  // Black: Brown eyes, Blue eyes, Green eyes
      ],
      rowLabels: ["Blonde Hair", "Brown Hair", "Black Hair"],
      colLabels: ["Brown Eyes", "Blue Eyes", "Green Eyes"],
      hasAssociation: true,
      associationType: "Strong Association",
      explanation: "Hair and eye color are genetically linked. Blonde hair correlates with blue/green eyes (95%), while brown/black hair correlates more with brown eyes.",
      realWorldImplication: "Genetic factors influence both hair and eye color simultaneously, creating observable patterns in human populations.",
      independenceCheck: "If independent, each hair color would show the same eye color distribution. The dramatic differences prove association."
    },
    {
      id: 4,
      title: "Birth Month & Career Choice",
      context: "A researcher studied 600 professionals to see if birth month relates to career choice in three major fields",
      data: [
        [67, 66, 67], // Q1 (Jan-Mar): Tech, Medicine, Education
        [65, 68, 67], // Q2 (Apr-Jun): Tech, Medicine, Education
        [68, 66, 66], // Q3 (Jul-Sep): Tech, Medicine, Education
        [66, 67, 67]  // Q4 (Oct-Dec): Tech, Medicine, Education
      ],
      rowLabels: ["Q1 (Jan-Mar)", "Q2 (Apr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dec)"],
      colLabels: ["Technology", "Medicine", "Education"],
      hasAssociation: false,
      associationType: "Independence",
      explanation: "Birth month shows no relationship with career choice. Each quarter shows roughly equal distribution across all three career fields.",
      realWorldImplication: "Astrology claims aside, when you're born doesn't meaningfully influence your career path in these fields.",
      independenceCheck: "All quarters show very similar career distributions (~33% each), confirming independence."
    },
    {
      id: 5,
      title: "Exercise Frequency & Health Status",
      context: "A health study tracked 500 adults' exercise habits and self-reported health status over one year",
      data: [
        [20, 40, 90], // None: Excellent, Good, Poor
        [50, 80, 45], // Moderate: Excellent, Good, Poor
        [85, 60, 15]  // Regular: Excellent, Good, Poor
      ],
      rowLabels: ["No Exercise", "Moderate Exercise", "Regular Exercise"],
      colLabels: ["Excellent Health", "Good Health", "Poor Health"],
      hasAssociation: true,
      associationType: "Strong Positive Association",
      explanation: "Exercise frequency strongly predicts health status. Regular exercisers report excellent health 53% of the time vs 13% for non-exercisers.",
      realWorldImplication: "Physical activity appears to be strongly associated with better self-reported health outcomes.",
      independenceCheck: "If independent, all exercise groups would show similar health distributions. They show dramatically different patterns."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: scenarios[0],
      questionType: 'identify',
      question: "Based on the coin flip data, what can you conclude about the relationship between weather and coin outcomes?",
      options: [
        "Strong association - weather clearly affects coin fairness",
        "Moderate association - some weather influence is evident",
        "Independence - weather has no effect on coin outcomes",
        "Cannot determine from this sample size"
      ],
      correctAnswer: "Independence - weather has no effect on coin outcomes",
      explanation: "All weather conditions show approximately 50% heads, which is exactly what we'd expect if weather and coin outcomes are independent variables.",
      conceptConnection: "This demonstrates the null hypothesis in action - when variables are truly independent, their conditional distributions are nearly identical."
    },
    {
      id: 2,
      scenario: scenarios[1],
      questionType: 'calculate',
      question: "In the study time data, what percentage of high-study students earned an A grade?",
      options: ["25%", "45%", "70%", "85%"],
      correctAnswer: "70%",
      explanation: "High study group: 70 A's out of (70+25+5) = 100 total students. 70/100 = 70% earned A grades.",
      conceptConnection: "This conditional percentage is dramatically different from other study groups, proving strong association between study time and performance."
    },
    {
      id: 3,
      scenario: scenarios[2],
      questionType: 'interpret',
      question: "What does the hair color and eye color data suggest about genetic inheritance?",
      options: [
        "Hair and eye color are inherited completely independently",
        "Hair and eye color are genetically linked traits",
        "Eye color determines hair color directly",
        "The sample is too small to draw conclusions"
      ],
      correctAnswer: "Hair and eye color are genetically linked traits",
      explanation: "The strong association (blonde hair with light eyes, dark hair with brown eyes) suggests these traits are influenced by related genetic factors.",
      conceptConnection: "Real-world association often reflects underlying causal mechanisms - in this case, shared genetic pathways."
    },
    {
      id: 4,
      scenario: scenarios[3],
      questionType: 'identify',
      question: "What does the birth month and career data demonstrate?",
      options: [
        "Birth month strongly influences career choice",
        "Certain months produce more successful professionals", 
        "Birth month and career choice are independent",
        "More data is needed to determine the relationship"
      ],
      correctAnswer: "Birth month and career choice are independent",
      explanation: "Each birth quarter shows nearly identical career distributions (~33% each), indicating no association between when you're born and career choice.",
      conceptConnection: "This exemplifies statistical independence - knowing someone's birth month tells you nothing useful about their likely career."
    },
    {
      id: 5,
      scenario: scenarios[4],
      questionType: 'explain',
      question: "How would you explain the exercise and health data to someone who claims 'correlation doesn't imply causation'?",
      options: [
        "The correlation is so strong it must be causal",
        "The association exists but could have multiple explanations",
        "Correlation never implies causation under any circumstances",
        "This data proves exercise causes better health"
      ],
      correctAnswer: "The association exists but could have multiple explanations",
      explanation: "While there's strong association, it could be due to: exercise improving health, healthier people exercising more, or other factors affecting both.",
      conceptConnection: "Association is necessary but not sufficient for causation - we need controlled experiments to establish causal relationships."
    },
    {
      id: 6,
      scenario: scenarios[1],
      questionType: 'interpret',
      question: "If study time and grades were truly independent, what would you expect to see in the data?",
      options: [
        "High study students would get the most A grades",
        "All study groups would show similar grade distributions",
        "Only low study students would get C grades", 
        "The data would show perfect 50-50 splits"
      ],
      correctAnswer: "All study groups would show similar grade distributions",
      explanation: "Independence means one variable doesn't affect the other. So low, medium, and high study groups would all show roughly the same percentage of A's, B's, and C's.",
      conceptConnection: "Independence is tested by comparing conditional distributions - they should be nearly identical if variables are truly independent."
    },
    {
      id: 7,
      scenario: scenarios[4],
      questionType: 'calculate',
      question: "In the exercise data, what's the difference in 'excellent health' rates between regular exercisers and non-exercisers?",
      options: ["20 percentage points", "30 percentage points", "40 percentage points", "50 percentage points"],
      correctAnswer: "40 percentage points",
      explanation: "Regular exercise: 85/160 = 53% excellent health. No exercise: 20/150 = 13% excellent health. Difference: 53% - 13% = 40 percentage points.",
      conceptConnection: "Large differences in conditional percentages indicate strong association - this 40-point gap suggests exercise and health are definitely not independent."
    },
    {
      id: 8,
      scenario: scenarios[2],
      questionType: 'explain',
      question: "What makes the hair color and eye color association 'strong' rather than 'weak'?",
      options: [
        "The sample size is large enough",
        "The conditional distributions are dramatically different",
        "All combinations are represented in the data",
        "The percentages add up to 100%"
      ],
      correctAnswer: "The conditional distributions are dramatically different",
      explanation: "Blonde hair shows 95% light eyes vs brown hair showing 60% brown eyes. These dramatically different patterns indicate strong association.",
      conceptConnection: "Association strength is measured by how different the conditional distributions are - the more different, the stronger the association."
    }
  ];

  const calculatePercentages = (data: number[][]) => {
    return data.map(row => {
      const total = row.reduce((sum, val) => sum + val, 0);
      return row.map(val => ({
        count: val,
        percentage: (val / total) * 100
      }));
    });
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
    const percentages = calculatePercentages(currentChallengeData.scenario.data);

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
                <h1 className="text-2xl font-bold text-[#58595b]">Independence Detective</h1>
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
                🔍 Case: {currentChallengeData.scenario.title}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-600 mb-4">{currentChallengeData.scenario.context}</p>
                
                {/* Data Table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left font-semibold">Variable</th>
                        {currentChallengeData.scenario.colLabels.map((label, index) => (
                          <th key={index} className="border border-gray-300 p-2 text-center font-semibold">
                            {label}
                          </th>
                        ))}
                        <th className="border border-gray-300 p-2 text-center font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChallengeData.scenario.data.map((row, rowIndex) => {
                        const total = row.reduce((sum, val) => sum + val, 0);
                        return (
                          <tr key={rowIndex}>
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {currentChallengeData.scenario.rowLabels[rowIndex]}
                            </td>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="border border-gray-300 p-2 text-center">
                                {cell} ({percentages[rowIndex][colIndex].percentage.toFixed(1)}%)
                              </td>
                            ))}
                            <td className="border border-gray-300 p-2 text-center font-semibold">
                              {total}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
                Submit Analysis
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent Detective Work!' : 'Not Quite Right'}
                  </h3>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Explanation</h4>
                    <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">🔗 Concept Connection</h4>
                    <p className="text-green-600 text-sm">{currentChallengeData.conceptConnection}</p>
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
            <Link href="/chapters/3" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Bivariate Categorical Displays
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 7 ? '🎉' : score >= 5 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 7 ? 'Independence Expert!' : score >= 5 ? 'Great Detective Work!' : 'Keep Investigating!'}
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
                Back to Chapter 3
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedExample = scenarios[selectedScenario];
  const percentages = calculatePercentages(selectedExample.data);

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
              <span role="img" aria-label="independence vs association" className="text-4xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Independence vs Association</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the fundamental distinction! Learn when variables are independent and when they're associated.
              </p>
            </div>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">⚖️ The Fundamental Distinction</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🔄</span>
                  <div>
                    <h3 className="font-bold text-blue-700 mb-2">Independence</h3>
                    <p className="text-blue-600 text-sm">
                      Knowing one variable tells you NOTHING useful about the other variable.
                    </p>
                  </div>
                </div>
                <ul className="text-blue-600 text-sm space-y-2">
                  <li>• Conditional distributions are nearly identical</li>
                  <li>• One variable doesn't influence the other</li>
                  <li>• Patterns look the same across all groups</li>
                  <li>• Example: Coin flips and weather conditions</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🔗</span>
                  <div>
                    <h3 className="font-bold text-red-700 mb-2">Association</h3>
                    <p className="text-red-600 text-sm">
                      Knowing one variable DOES tell you something meaningful about the other.
                    </p>
                  </div>
                </div>
                <ul className="text-red-600 text-sm space-y-2">
                  <li>• Conditional distributions differ meaningfully</li>
                  <li>• Variables are related or connected</li>
                  <li>• Different groups show different patterns</li>
                  <li>• Example: Study time and exam grades</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">The Key Test: Compare Conditional Distributions</h3>
                  <p className="text-yellow-600">
                    Independence = "If I photocopy the percentage breakdown from one group to another, they look nearly identical"<br/>
                    Association = "Each group has its own unique percentage 'signature' - they look clearly different"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Real-World Examples</h2>
          
          {/* Example Selection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => setSelectedScenario(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedScenario === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedExample.title}</h3>
              <p className="text-gray-600 mb-4">{selectedExample.context}</p>
            </div>

            {/* Data Table with Percentages */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold">Variable</th>
                    {selectedExample.colLabels.map((label, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-center font-semibold">
                        {label}
                      </th>
                    ))}
                    <th className="border border-gray-300 p-3 text-center font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExample.data.map((row, rowIndex) => {
                    const total = row.reduce((sum, val) => sum + val, 0);
                    return (
                      <tr key={rowIndex}>
                        <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                          {selectedExample.rowLabels[rowIndex]}
                        </td>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border border-gray-300 p-3 text-center">
                            <div className="font-medium">{cell}</div>
                            <div className="text-sm text-gray-500">
                              ({percentages[rowIndex][colIndex].percentage.toFixed(1)}%)
                            </div>
                          </td>
                        ))}
                        <td className="border border-gray-300 p-3 text-center font-semibold">
                          {total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border rounded-lg p-4 ${
                selectedExample.hasAssociation 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  selectedExample.hasAssociation ? 'text-red-700' : 'text-blue-700'
                }`}>
                  📊 Statistical Conclusion
                </h4>
                <div className={`text-sm mb-2 ${
                  selectedExample.hasAssociation ? 'text-red-600' : 'text-blue-600'
                }`}>
                  <strong>Result:</strong> {selectedExample.associationType}
                </div>
                <p className={`text-sm ${
                  selectedExample.hasAssociation ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {selectedExample.explanation}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🌍 Real-World Implication</h4>
                <p className="text-green-600 text-sm">{selectedExample.realWorldImplication}</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-700 mb-2">🔍 Independence Check</h4>
              <p className="text-purple-600 text-sm">{selectedExample.independenceCheck}</p>
            </div>
          </div>
        </div>


        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Independence Detective Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze real-world datasets</li>
                <li>• Calculate and compare conditional distributions</li>
                <li>• Identify independence vs association</li>
                <li>• Understand practical implications</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Master These Skills</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Conditional percentage calculations</li>
                <li>• Pattern recognition in data tables</li>
                <li>• Statistical reasoning and interpretation</li>
                <li>• Real-world application of concepts</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Become an Independence Detective
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
