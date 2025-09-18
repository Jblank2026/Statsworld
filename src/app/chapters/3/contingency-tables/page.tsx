"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface TableData {
  title: string;
  rowVariable: string;
  colVariable: string;
  data: number[][];
  rowLabels: string[];
  colLabels: string[];
  context: string;
}

interface Challenge {
  id: number;
  tableData: TableData;
  questionType: 'marginal' | 'conditional' | 'interpretation' | 'calculation';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export default function ContingencyTables() {
  const [selectedTable, setSelectedTable] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const exampleTables: TableData[] = [
    {
      title: "Coffee Shop Preferences by Age Group",
      rowVariable: "Age Group",
      colVariable: "Beverage Preference", 
      data: [
        [45, 25, 30], // 18-30: Coffee, Tea, Other
        [65, 35, 20], // 31-50: Coffee, Tea, Other  
        [40, 55, 15]  // 51+: Coffee, Tea, Other
      ],
      rowLabels: ["18-30", "31-50", "51+"],
      colLabels: ["Coffee", "Tea", "Other"],
      context: "A coffee shop surveyed 300 customers about their beverage preferences across different age groups."
    },
    {
      title: "Treatment Effectiveness by Patient Type",
      rowVariable: "Patient Type",
      colVariable: "Treatment Outcome",
      data: [
        [85, 15], // Outpatient: Success, Failure
        [70, 30]  // Inpatient: Success, Failure
      ],
      rowLabels: ["Outpatient", "Inpatient"],
      colLabels: ["Success", "Failure"],
      context: "A medical study tracked treatment outcomes for 200 patients across different care settings."
    },
    {
      title: "Social Media Usage by Education Level",
      rowVariable: "Education Level",
      colVariable: "Primary Platform",
      data: [
        [30, 40, 20, 10], // High School: Facebook, Instagram, TikTok, Twitter
        [45, 35, 15, 25], // College: Facebook, Instagram, TikTok, Twitter
        [60, 25, 5, 30]   // Graduate: Facebook, Instagram, TikTok, Twitter
      ],
      rowLabels: ["High School", "College", "Graduate"],
      colLabels: ["Facebook", "Instagram", "TikTok", "Twitter"],
      context: "A social media study examined platform preferences across 480 users with different education levels."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      tableData: exampleTables[0],
      questionType: 'marginal',
      question: "What is the marginal distribution for the Coffee preference (ignoring age groups)?",
      options: ["45 out of 300 (15%)", "150 out of 300 (50%)", "100 out of 300 (33%)", "65 out of 300 (22%)"],
      correctAnswer: "150 out of 300 (50%)",
      explanation: "Marginal distribution sums across all age groups: 45 + 65 + 40 = 150 coffee drinkers out of 300 total customers = 50%",
      hint: "Add up all the coffee drinkers across all age groups, then divide by the total."
    },
    {
      id: 2,
      tableData: exampleTables[0],
      questionType: 'conditional',
      question: "What percentage of 18-30 year olds prefer coffee?",
      options: ["45%", "30%", "50%", "15%"],
      correctAnswer: "45%",
      explanation: "Among 18-30 year olds: 45 prefer coffee out of (45+25+30) = 100 total. So 45/100 = 45%",
      hint: "Look only at the 18-30 row. What fraction of that age group prefers coffee?"
    },
    {
      id: 3,
      tableData: exampleTables[1],
      questionType: 'interpretation',
      question: "Comparing success rates, which statement is most accurate?",
      options: [
        "Outpatients and inpatients have identical success rates",
        "Outpatients have a higher success rate (85% vs 70%)",
        "Inpatients have a higher success rate",
        "The difference is too small to be meaningful"
      ],
      correctAnswer: "Outpatients have a higher success rate (85% vs 70%)",
      explanation: "Outpatients: 85/100 = 85% success rate. Inpatients: 70/100 = 70% success rate. There's a 15 percentage point difference favoring outpatients.",
      hint: "Calculate the success rate for each patient type separately and compare."
    },
    {
      id: 4,
      tableData: exampleTables[2],
      questionType: 'conditional',
      question: "Among college graduates, what is their most popular social media platform?",
      options: ["Facebook (60%)", "Instagram (25%)", "TikTok (5%)", "Twitter (30%)"],
      correctAnswer: "Facebook (60%)",
      explanation: "For college graduates: Facebook=60, Instagram=25, TikTok=5, Twitter=30. Total=120. Facebook has 60/120 = 50% of graduate users, making it most popular.",
      hint: "Look at the Graduate row and find which platform has the highest count."
    },
    {
      id: 5,
      tableData: exampleTables[0],
      questionType: 'interpretation',
      question: "Which age group shows the strongest preference for tea?",
      options: ["18-30 (25% prefer tea)", "31-50 (29% prefer tea)", "51+ (50% prefer tea)", "All groups prefer tea equally"],
      correctAnswer: "51+ (50% prefer tea)",
      explanation: "Tea preference by age: 18-30: 25/100=25%, 31-50: 35/120=29%, 51+: 55/110=50%. The 51+ group has the highest percentage preferring tea.",
      hint: "Calculate what percentage of each age group prefers tea, then compare."
    },
    {
      id: 6,
      tableData: exampleTables[1],
      questionType: 'calculation',
      question: "What is the overall success rate across all patients?",
      options: ["75%", "77.5%", "80%", "82.5%"],
      correctAnswer: "77.5%",
      explanation: "Total successes: 85 + 70 = 155. Total patients: 100 + 100 = 200. Overall success rate: 155/200 = 77.5%",
      hint: "Add up all successes and divide by total number of patients."
    }
  ];

  const calculateMarginals = (tableData: TableData) => {
    const rowTotals = tableData.data.map(row => row.reduce((sum, val) => sum + val, 0));
    const colTotals = tableData.colLabels.map((_, colIndex) => 
      tableData.data.reduce((sum, row) => sum + row[colIndex], 0)
    );
    const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);
    
    return { rowTotals, colTotals, grandTotal };
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
    const { rowTotals, colTotals, grandTotal } = calculateMarginals(currentChallengeData.tableData);

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
                <h1 className="text-2xl font-bold text-[#58595b]">Contingency Table Analysis</h1>
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
                📊 {currentChallengeData.tableData.title}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-600 mb-4">{currentChallengeData.tableData.context}</p>
                
                {/* Contingency Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left font-semibold">
                          {currentChallengeData.tableData.rowVariable} \ {currentChallengeData.tableData.colVariable}
                        </th>
                        {currentChallengeData.tableData.colLabels.map((label, index) => (
                          <th key={index} className="border border-gray-300 p-2 text-center font-semibold">
                            {label}
                          </th>
                        ))}
                        <th className="border border-gray-300 p-2 text-center font-semibold bg-blue-50">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChallengeData.tableData.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                            {currentChallengeData.tableData.rowLabels[rowIndex]}
                          </td>
                          {row.map((cell, colIndex) => (
                            <td key={colIndex} className="border border-gray-300 p-2 text-center">
                              {cell}
                            </td>
                          ))}
                          <td className="border border-gray-300 p-2 text-center font-semibold bg-blue-50">
                            {rowTotals[rowIndex]}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50">
                        <td className="border border-gray-300 p-2 font-semibold">Total</td>
                        {colTotals.map((total, index) => (
                          <td key={index} className="border border-gray-300 p-2 text-center font-semibold">
                            {total}
                          </td>
                        ))}
                        <td className="border border-gray-300 p-2 text-center font-bold">
                          {grandTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

            <div className="flex justify-between">
              <button
                className="text-[#ff8200] hover:text-[#ff9933] font-medium"
                onClick={() => alert(currentChallengeData.hint)}
              >
                💡 Show Hint
              </button>
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent Analysis!' : 'Not Quite Right'}
                  </h3>
                  <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                    Correct Answer: {currentChallengeData.correctAnswer}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 text-sm">{currentChallengeData.explanation}</p>
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
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Table Master!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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

  const { rowTotals, colTotals, grandTotal } = calculateMarginals(exampleTables[selectedTable]);

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
              <span role="img" aria-label="contingency tables" className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Contingency Tables</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the foundation of bivariate categorical analysis! Learn to read, interpret, and calculate from two-way tables.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Essential Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-blue-200 rounded-lg p-4 text-center">
              <h3 className="font-bold text-blue-700 mb-2">📊 Joint Frequency</h3>
              <p className="text-blue-600 text-sm">Count of observations that fall into specific combinations of both variables</p>
            </div>

            <div className="border border-green-200 rounded-lg p-4 text-center">
              <h3 className="font-bold text-green-700 mb-2">📈 Marginal Distribution</h3>
              <p className="text-green-600 text-sm">Distribution of one variable ignoring the other (row/column totals)</p>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 text-center">
              <h3 className="font-bold text-purple-700 mb-2">🎯 Conditional Distribution</h3>
              <p className="text-purple-600 text-sm">Distribution of one variable given a specific level of the other</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-700 mb-2">💡 Key Insight</h4>
            <p className="text-yellow-600 text-sm">
              Contingency tables are like the foundation of a house - everything else in bivariate categorical analysis 
              (bar charts, mosaic plots, association tests) builds on what you learn from these tables!
            </p>
          </div>
        </div>

        {/* Interactive Table Explorer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Interactive Table Explorer</h2>
          
          {/* Table Selection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {exampleTables.map((table, index) => (
              <button
                key={index}
                onClick={() => setSelectedTable(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedTable === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {table.title}
              </button>
            ))}
          </div>

          {/* Selected Table Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{exampleTables[selectedTable].title}</h3>
              <p className="text-gray-600 mb-4">{exampleTables[selectedTable].context}</p>
            </div>

            {/* Contingency Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      {exampleTables[selectedTable].rowVariable} \ {exampleTables[selectedTable].colVariable}
                    </th>
                    {exampleTables[selectedTable].colLabels.map((label, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-center font-semibold">
                        {label}
                      </th>
                    ))}
                    <th className="border border-gray-300 p-3 text-center font-semibold bg-blue-50">
                      Row Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exampleTables[selectedTable].data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                        {exampleTables[selectedTable].rowLabels[rowIndex]}
                      </td>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border border-gray-300 p-3 text-center">
                          {cell}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-3 text-center font-semibold bg-blue-50">
                        {rowTotals[rowIndex]}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">Column Total</td>
                    {colTotals.map((total, index) => (
                      <td key={index} className="border border-gray-300 p-3 text-center font-semibold">
                        {total}
                      </td>
                    ))}
                    <td className="border border-gray-300 p-3 text-center font-bold">
                      {grandTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">📊 Reading This Table</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Each cell shows joint frequency</li>
                  <li>• Row totals show marginal distribution of {exampleTables[selectedTable].rowVariable}</li>
                  <li>• Column totals show marginal distribution of {exampleTables[selectedTable].colVariable}</li>
                  <li>• Grand total ({grandTotal}) is the sample size</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">🔍 Analysis Tips</h4>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• Compare percentages within rows/columns</li>
                  <li>• Look for patterns across categories</li>
                  <li>• Calculate conditional distributions</li>
                  <li>• Check if relationships exist</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 Essential Calculations</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📊 Marginal Percentages</h4>
                <p className="text-blue-600 text-sm mb-2">Percentage for one variable ignoring the other</p>
                <div className="bg-blue-50 p-2 rounded text-xs font-mono">
                  Row %: (Row Total ÷ Grand Total) × 100<br/>
                  Col %: (Column Total ÷ Grand Total) × 100
                </div>
              </div>

              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🎯 Conditional Percentages</h4>
                <p className="text-green-600 text-sm mb-2">Percentage given a specific condition</p>
                <div className="bg-green-50 p-2 rounded text-xs font-mono">
                  % of Row: (Cell ÷ Row Total) × 100<br/>
                  % of Col: (Cell ÷ Column Total) × 100
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-700 mb-2">💡 Pro Tip: Comparing Conditional Distributions</h4>
              <p className="text-purple-600 text-sm">
                To detect association, compare conditional distributions across groups. If the percentages are very different, 
                you likely have an association. If they're similar, the variables might be independent.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Contingency Table Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze real contingency tables</li>
                <li>• Calculate marginal and conditional distributions</li>
                <li>• Interpret relationships between variables</li>
                <li>• Master the foundation concepts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reading two-way tables accurately</li>
                <li>• Calculating percentages correctly</li>
                <li>• Distinguishing marginal vs conditional</li>
                <li>• Interpreting results in context</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Start Table Analysis Challenge
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
