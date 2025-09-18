"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Challenge {
  id: number;
  question: string;
  context: string;
  dataPresentation: {
    type: 'table' | 'list' | 'description';
    data?: {
      headers: string[];
      rows: (string | number)[][];
      highlightColumn?: number;
    };
    listData?: {
      title: string;
      items: (string | number)[];
    };
    description?: string;
  };
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export default function MixedVariables() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);

  const challenges: Challenge[] = [
    {
      id: 1,
      question: "In this customer database, what type of variable is 'Customer_ID'?",
      context: "E-commerce Customer Database",
      dataPresentation: {
        type: 'table',
        data: {
          headers: ["Customer_ID", "Age", "Orders", "Satisfaction"],
          rows: [
            ["CUST001", 28, 5, "Very Satisfied"],
            ["CUST002", 34, 12, "Satisfied"],
            ["CUST003", 41, 3, "Neutral"],
            ["CUST004", 25, 8, "Very Satisfied"]
          ],
          highlightColumn: 0
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Identifier Variable",
      explanation: "Customer_ID uniquely identifies each customer and is used for record-keeping, not analysis.",
      hint: "Look for variables that uniquely identify each record."
    },
    {
      id: 2,
      question: "What type of variable is 'Satisfaction Rating' in this survey data?",
      context: "Customer Satisfaction Survey",
      dataPresentation: {
        type: 'list',
        listData: {
          title: "Customer Satisfaction Ratings",
          items: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Satisfaction ratings have a meaningful order from 'Very Dissatisfied' to 'Very Satisfied', making them ordinal categorical variables.",
      hint: "Consider whether these categories have a natural order or ranking."
    },
    {
      id: 3,
      question: "In this student dataset, what type of variable is 'Number of Courses'?",
      context: "University Student Records",
      dataPresentation: {
        type: 'table',
        data: {
          headers: ["Student_ID", "Major", "Number_of_Courses", "GPA"],
          rows: [
            ["STU123", "Biology", 5, 3.45],
            ["STU456", "Math", 4, 3.78],
            ["STU789", "Physics", 6, 3.12],
            ["STU012", "Chemistry", 5, 3.89]
          ],
          highlightColumn: 2
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Number of courses represents countable quantities with distinct whole number values (you can't take 2.5 courses).",
      hint: "Think about whether this represents counts of distinct items."
    },
    {
      id: 4,
      question: "What type of variable is 'Blood Type' from this medical data?",
      context: "Hospital Patient Records",
      dataPresentation: {
        type: 'list',
        listData: {
          title: "Patient Blood Types",
          items: ["A+", "B-", "AB+", "O-", "A-", "B+", "AB-", "O+"]
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Blood types are categories with no inherent order or ranking. A+ is not 'greater than' B- in any meaningful way.",
      hint: "Consider whether these categories can be arranged in a meaningful order."
    },
    {
      id: 5,
      question: "In this product inventory, what type of variable is 'Weight_kg'?",
      context: "Manufacturing Inventory",
      dataPresentation: {
        type: 'table',
        data: {
          headers: ["Product_ID", "Category", "Weight_kg", "Price"],
          rows: [
            ["PROD001", "Electronics", 2.45, 299.99],
            ["PROD002", "Furniture", 15.67, 499.99],
            ["PROD003", "Electronics", 0.89, 89.99],
            ["PROD004", "Furniture", 23.12, 799.99]
          ],
          highlightColumn: 2
        }
      },
      options: ["Categorical - Nominal", "Quantitative - Discrete", "Quantitative - Continuous", "Identifier Variable"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Weight can take any value within a range and can be measured to any level of precision (2.45 kg, 2.456 kg, etc.).",
      hint: "Consider whether this measurement can take any value within a range."
    },
    {
      id: 6,
      question: "What type of variable is 'Education Level' in this employment survey?",
      context: "Employment Survey Data",
      dataPresentation: {
        type: 'list',
        listData: {
          title: "Education Levels",
          items: ["High School", "Some College", "Bachelor's Degree", "Master's Degree", "PhD"]
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Education levels have a clear hierarchical order representing increasing levels of education attainment.",
      hint: "Think about whether these education categories represent increasing levels of something."
    },
    {
      id: 7,
      question: "In this library system, what type of variable is 'ISBN'?",
      context: "Library Book Database",
      dataPresentation: {
        type: 'description',
        description: "Each book in our library system has a unique ISBN (International Standard Book Number) like '978-0-123456-78-9' that identifies the specific publication. We also track the book's genre (Fiction, Non-fiction, Reference), the number of pages, and the publication year."
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Identifier Variable",
      explanation: "ISBN uniquely identifies each book publication and serves as a standardized identifier, not for analysis purposes.",
      hint: "Consider the primary purpose of an ISBN number."
    },
    {
      id: 8,
      question: "What type of variable is 'Number of Siblings' in this demographic study?",
      context: "Family Demographics Survey",
      dataPresentation: {
        type: 'table',
        data: {
          headers: ["Participant_ID", "Age", "Number_of_Siblings", "Family_Income"],
          rows: [
            ["P001", 25, 2, "50000-75000"],
            ["P002", 30, 0, "25000-50000"],
            ["P003", 28, 4, "75000-100000"],
            ["P004", 35, 1, "100000+"]
          ],
          highlightColumn: 2
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Number of siblings represents countable quantities with distinct whole number values (you can't have 2.5 siblings).",
      hint: "Think about whether siblings can be counted in whole numbers only."
    },
    {
      id: 9,
      question: "What type of variable is 'Movie Genre' in this entertainment database?",
      context: "Movie Database",
      dataPresentation: {
        type: 'list',
        listData: {
          title: "Movie Genres",
          items: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]
        }
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Movie genres are categories with no inherent order. 'Action' is not greater than or less than 'Comedy' in any meaningful way.",
      hint: "Consider whether these categories can be ranked or ordered meaningfully."
    },
    {
      id: 10,
      question: "In this fitness tracking app, what type of variable is 'Daily Steps'?",
      context: "Fitness Tracking Application",
      dataPresentation: {
        type: 'table',
        data: {
          headers: ["User_ID", "Date", "Daily_Steps", "Activity_Level"],
          rows: [
            ["USER001", "2024-01-15", 8543, "Moderate"],
            ["USER002", "2024-01-15", 12076, "High"],
            ["USER003", "2024-01-15", 4521, "Low"],
            ["USER004", "2024-01-15", 9876, "Moderate"]
          ],
          highlightColumn: 2
        }
      },
      options: ["Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous", "Identifier Variable"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Daily steps are counted in whole numbers and represent discrete quantities (you can't take half a step).",
      hint: "Consider whether steps are counted as whole units or can be fractional."
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameEnded]);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setTimeLeft(180);
    setSelectedAnswer('');
    setShowFeedback(null);
  };

  const endGame = () => {
    setGameEnded(true);
    const percentage = (score / challenges.length) * 100;
    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || showFeedback) return;

    const currentChallengeData = challenges[currentChallenge];
    const isCorrect = selectedAnswer === currentChallengeData.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowFeedback({
      isCorrect,
      explanation: currentChallengeData.explanation,
      correctAnswer: currentChallengeData.correctAnswer
    });
  };

  const nextQuestion = () => {
    if (currentChallenge + 1 < challenges.length) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(null);
    } else {
      endGame();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentChallengeData = challenges[currentChallenge];

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <Link href="/chapters/1" className="text-[#58595b] hover:text-[#ff8200] transition-colors">
              ← Back to Variable Types
            </Link>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="mixed variables" className="text-4xl">🔄</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Mixed Variable Types Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Test your ability to identify all variable types! Analyze tables, lists, and descriptions to classify variables correctly.
              </p>
            </div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">How to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Game Rules</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Examine different data presentations (tables, lists, descriptions)</li>
                  <li>• Identify the correct variable type for highlighted variables</li>
                  <li>• You have 3 minutes to complete all challenges</li>
                  <li>• Earn 1 point for each correct answer</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Variable Types</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <strong className="text-blue-700">Categorical - Nominal:</strong> Categories with no order (colors, genres)
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong className="text-green-700">Categorical - Ordinal:</strong> Categories with order (ratings, education levels)
                  </div>
                  <div className="p-2 bg-yellow-50 rounded">
                    <strong className="text-yellow-700">Quantitative - Discrete:</strong> Countable numbers (people, items)
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <strong className="text-purple-700">Quantitative - Continuous:</strong> Measurable ranges (height, weight)
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <strong className="text-gray-700">Identifier Variable:</strong> Unique identifiers (IDs, codes)
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
              >
                Start Mixed Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const percentage = (score / challenges.length) * 100;
    const passed = percentage >= 80;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">
              {passed ? '🎉' : '📊'}
            </div>
            
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {passed ? 'Excellent Work!' : 'Good Effort!'}
            </h1>
            
            <div className="text-6xl font-bold text-[#ff8200] mb-4">
              {score}/{challenges.length}
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              You scored {percentage.toFixed(1)}%
              {passed ? ' - You\'ve mastered variable type identification!' : ' - Keep practicing to improve your skills!'}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/chapters/1"
                className="bg-[#58595b] hover:bg-[#3d4346] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Variable Types
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/chapters/1" className="text-[#58595b] hover:text-[#ff8200] transition-colors">
            ← Back to Variable Types
          </Link>
          <div className="text-right">
            <div className="text-sm text-gray-600">Time Remaining</div>
            <div className="text-2xl font-mono font-bold text-[#ff8200]">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#58595b]">
              Challenge {currentChallenge + 1} of {challenges.length}
            </h2>
            <div className="text-lg font-semibold text-[#ff8200]">
              Score: {score}/{challenges.length}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#58595b] mb-4">
              {currentChallengeData.question}
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Context:</span> {currentChallengeData.context}
              </div>
              
              {/* Data Presentation */}
              {currentChallengeData.dataPresentation.type === 'table' && currentChallengeData.dataPresentation.data && (
                <div className="overflow-x-auto bg-white rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        {currentChallengeData.dataPresentation.data.headers.map((header, index) => (
                          <th 
                            key={index} 
                            className={`px-4 py-3 text-left text-sm font-semibold border-b ${
                              index === currentChallengeData.dataPresentation.data?.highlightColumn 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'text-gray-700'
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentChallengeData.dataPresentation.data.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex} 
                              className={`px-4 py-3 text-sm border-b font-mono ${
                                cellIndex === currentChallengeData.dataPresentation.data?.highlightColumn
                                  ? 'bg-yellow-50 text-yellow-800 font-bold'
                                  : 'text-gray-700'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {currentChallengeData.dataPresentation.type === 'list' && currentChallengeData.dataPresentation.listData && (
                <div className="bg-white rounded-lg border p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    {currentChallengeData.dataPresentation.listData.title}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {currentChallengeData.dataPresentation.listData.items.map((item, index) => (
                      <div key={index} className="bg-blue-50 px-3 py-2 rounded border text-sm font-mono text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentChallengeData.dataPresentation.type === 'description' && (
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {currentChallengeData.dataPresentation.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {currentChallengeData.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? showFeedback
                      ? selectedAnswer === currentChallengeData.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-[#ff8200] bg-orange-50'
                    : showFeedback && option === currentChallengeData.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>

          {!showFeedback && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                💡 Hint: {currentChallengeData.hint}
              </div>
              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="bg-[#ff8200] hover:bg-[#ff9933] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Submit Answer
              </button>
            </div>
          )}

          {showFeedback && (
            <div className={`p-6 rounded-lg ${showFeedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {showFeedback.isCorrect ? '✅' : '❌'}
                </span>
                <span className={`font-bold text-lg ${showFeedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {showFeedback.isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className={`mb-4 ${showFeedback.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {showFeedback.explanation}
              </p>
              {!showFeedback.isCorrect && (
                <p className="text-green-700 mb-4">
                  <strong>Correct answer:</strong> {showFeedback.correctAnswer}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  {currentChallenge + 1 < challenges.length ? 'Next Question →' : 'Finish Challenge'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
