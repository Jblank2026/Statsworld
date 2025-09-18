"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Challenge {
  id: number;
  question: string;
  context: string;
  tableData: {
    headers: string[];
    rows: (string | number)[][];
  };
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export default function IdentifierVariables() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);

  const challenges: Challenge[] = [
    {
      id: 1,
      question: "Examine this hospital patient dataset. Which variable serves as the identifier?",
      context: "Medical Records Database",
      tableData: {
        headers: ["Patient_ID", "Age", "Gender", "Blood_Pressure", "Diagnosis"],
        rows: [
          ["P12345", 34, "Female", "120/80", "Healthy"],
          ["P67890", 45, "Male", "140/90", "Hypertension"],
          ["P54321", 28, "Female", "115/75", "Healthy"],
          ["P98765", 52, "Male", "160/95", "Hypertension"],
          ["P11111", 39, "Female", "125/85", "Pre-hypertension"]
        ]
      },
      options: ["Patient_ID", "Age", "Gender", "Blood_Pressure"],
      correctAnswer: "Patient_ID",
      explanation: "Patient_ID uniquely identifies each patient and is used solely for record-keeping and identification purposes.",
      hint: "Look for the variable that uniquely identifies each row for record-keeping purposes."
    },
    {
      id: 2,
      question: "In this e-commerce customer dataset, which variable is the identifier?",
      context: "Online Store Customer Database",
      tableData: {
        headers: ["Email", "Age", "Orders_Count", "Total_Spent", "Preferred_Category"],
        rows: [
          ["john@email.com", 28, 5, 245.50, "Electronics"],
          ["sarah@gmail.com", 34, 12, 890.25, "Clothing"],
          ["mike@yahoo.com", 41, 3, 156.00, "Books"],
          ["anna@outlook.com", 25, 8, 445.75, "Home"],
          ["tom@company.com", 37, 15, 1240.00, "Electronics"]
        ]
      },
      options: ["Email", "Age", "Orders_Count", "Total_Spent"],
      correctAnswer: "Email",
      explanation: "Email addresses serve as unique customer identifiers and are used to distinguish one customer from another.",
      hint: "Which variable uniquely identifies each customer for account management purposes?"
    },
    {
      id: 3,
      question: "Looking at this student academic record, which variable is the identifier?",
      context: "University Student Records",
      tableData: {
        headers: ["Student_ID", "GPA", "Major", "Credits", "Graduation_Year"],
        rows: [
          ["STU123456", 3.45, "Computer Science", 89, 2025],
          ["STU789012", 3.78, "Biology", 92, 2024],
          ["STU345678", 3.12, "Mathematics", 67, 2026],
          ["STU901234", 3.89, "Psychology", 95, 2024],
          ["STU567890", 3.23, "Engineering", 78, 2025]
        ]
      },
      options: ["Student_ID", "GPA", "Major", "Credits"],
      correctAnswer: "Student_ID",
      explanation: "Student_ID is assigned to uniquely identify each student and serves as a permanent identifier throughout their academic career.",
      hint: "Which variable exists solely to distinguish one student from another?"
    },
    {
      id: 4,
      question: "In this library book inventory, which variable serves as the identifier?",
      context: "Library Management System",
      tableData: {
        headers: ["ISBN", "Title", "Author", "Pages", "Genre", "Year_Published"],
        rows: [
          ["978-0-123456-78-9", "Data Science Basics", "Smith, J.", 340, "Education", 2022],
          ["978-1-234567-89-0", "Mystery Novel", "Johnson, M.", 287, "Fiction", 2021],
          ["978-0-987654-32-1", "Cooking Guide", "Brown, S.", 195, "Lifestyle", 2023],
          ["978-1-111111-11-1", "History of Art", "Davis, L.", 456, "History", 2020],
          ["978-0-555555-55-5", "Programming in Python", "Wilson, T.", 523, "Technology", 2023]
        ]
      },
      options: ["ISBN", "Title", "Pages", "Year_Published"],
      correctAnswer: "ISBN",
      explanation: "ISBN (International Standard Book Number) uniquely identifies each book publication and serves as a global standard identifier for books.",
      hint: "Which variable is specifically designed to be a unique identifier for publications?"
    },
    {
      id: 5,
      question: "Examine this employee dataset. Which variable is the identifier?",
      context: "Human Resources Database",
      tableData: {
        headers: ["Employee_ID", "Name", "Department", "Salary", "Years_Experience"],
        rows: [
          ["EMP001", "Alice Johnson", "Engineering", 75000, 5],
          ["EMP002", "Bob Smith", "Marketing", 62000, 3],
          ["EMP003", "Carol Davis", "Finance", 68000, 7],
          ["EMP004", "David Wilson", "Engineering", 82000, 8],
          ["EMP005", "Eva Brown", "HR", 58000, 2]
        ]
      },
      options: ["Employee_ID", "Name", "Department", "Salary"],
      correctAnswer: "Employee_ID",
      explanation: "Employee_ID is created specifically to uniquely identify each employee and remains constant throughout their employment.",
      hint: "Which variable was created by the company specifically to identify employees?"
    },
    {
      id: 6,
      question: "In this vehicle inventory dataset, which variable is the identifier?",
      context: "Car Dealership Database",
      tableData: {
        headers: ["VIN", "Make", "Model", "Year", "Price", "Mileage"],
        rows: [
          ["1HGBH41JXMN109186", "Honda", "Civic", 2020, 22000, 35000],
          ["1FTFW1ET5DFC09876", "Ford", "F-150", 2019, 28000, 42000],
          ["WBAVA37587NM54321", "BMW", "X3", 2021, 35000, 18000],
          ["2HGFC2F59MH123456", "Honda", "Accord", 2022, 26000, 12000],
          ["JM1BL1SF8A1789012", "Mazda", "CX-5", 2020, 24000, 28000]
        ]
      },
      options: ["VIN", "Make", "Year", "Price"],
      correctAnswer: "VIN",
      explanation: "VIN (Vehicle Identification Number) uniquely identifies each individual vehicle and serves as a permanent identifier for that specific car.",
      hint: "Which variable is legally required to uniquely identify each vehicle?"
    },
    {
      id: 7,
      question: "Looking at this research study dataset, which variable is the identifier?",
      context: "Psychology Research Study",
      tableData: {
        headers: ["Participant_Code", "Age_Group", "Test_Score", "Treatment", "Response_Time"],
        rows: [
          ["P001", "18-25", 85, "Group A", 245],
          ["P002", "26-35", 78, "Group B", 289],
          ["P003", "18-25", 92, "Group A", 198],
          ["P004", "36-45", 74, "Group B", 312],
          ["P005", "26-35", 88, "Group A", 234]
        ]
      },
      options: ["Participant_Code", "Age_Group", "Test_Score", "Treatment"],
      correctAnswer: "Participant_Code",
      explanation: "Participant_Code anonymously identifies each research subject while maintaining confidentiality and allowing researchers to track individual responses.",
      hint: "Which variable exists to maintain participant anonymity while allowing data tracking?"
    },
    {
      id: 8,
      question: "In this banking dataset, which variable serves as the identifier?",
      context: "Bank Account Database",
      tableData: {
        headers: ["Account_Number", "Account_Type", "Balance", "Years_Open", "Branch"],
        rows: [
          ["ACC-123456789", "Checking", 2450.75, 3, "Downtown"],
          ["ACC-987654321", "Savings", 15680.00, 8, "Westside"],
          ["ACC-555666777", "Checking", 890.25, 1, "Mall"],
          ["ACC-111222333", "Savings", 7234.50, 5, "Downtown"],
          ["ACC-999888777", "Business", 45200.00, 12, "Corporate"]
        ]
      },
      options: ["Account_Number", "Account_Type", "Balance", "Branch"],
      correctAnswer: "Account_Number",
      explanation: "Account_Number uniquely identifies each bank account and serves as the primary way to distinguish one account from another.",
      hint: "Which variable is assigned by the bank to uniquely identify each account?"
    },
    {
      id: 9,
      question: "Examine this product inventory dataset. Which variable is the identifier?",
      context: "Manufacturing Database",
      tableData: {
        headers: ["Serial_Number", "Product_Name", "Category", "Price", "Production_Date"],
        rows: [
          ["SN001234", "Laptop Pro", "Electronics", 1299.99, "2024-01-15"],
          ["SN005678", "Office Chair", "Furniture", 249.99, "2024-01-20"],
          ["SN009876", "Bluetooth Speaker", "Electronics", 89.99, "2024-01-18"],
          ["SN002468", "Desk Lamp", "Furniture", 45.99, "2024-01-22"],
          ["SN007531", "Tablet Mini", "Electronics", 399.99, "2024-01-16"]
        ]
      },
      options: ["Serial_Number", "Product_Name", "Category", "Price"],
      correctAnswer: "Serial_Number",
      explanation: "Serial_Number uniquely identifies each individual product unit and allows tracking of specific items for warranty and inventory purposes.",
      hint: "Which variable tracks individual units of products for inventory management?"
    },
    {
      id: 10,
      question: "In this social media user dataset, which variable is the identifier?",
      context: "Social Media Platform",
      tableData: {
        headers: ["Username", "Followers", "Posts_Count", "Account_Age_Days", "Verified"],
        rows: [
          ["@john_doe", 1250, 89, 456, "No"],
          ["@sarah_smith", 3420, 234, 789, "Yes"],
          ["@mike_jones", 892, 67, 234, "No"],
          ["@anna_wilson", 5670, 445, 1123, "Yes"],
          ["@tom_brown", 234, 23, 89, "No"]
        ]
      },
      options: ["Username", "Followers", "Posts_Count", "Account_Age_Days"],
      correctAnswer: "Username",
      explanation: "Username uniquely identifies each user on the platform and serves as their primary identifier for all platform interactions.",
      hint: "Which variable allows users to find and identify each other on the platform?"
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setTimeLeft(120);
    setAnsweredQuestions(0);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    const challenge = challenges[currentChallenge];
    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setAnsweredQuestions(prev => prev + 1);
    setFeedbackData({
      isCorrect,
      explanation: challenge.explanation,
      correctAnswer: challenge.correctAnswer
    });
    setShowFeedback(true);

    // Auto move to next question after 3 seconds
    setTimeout(() => {
      setShowFeedback(false);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setGameEnded(true);
        if (isCorrect) confetti();
      }
    }, 3000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setTimeLeft(120);
    setAnsweredQuestions(0);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  if (!gameStarted) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Variable Types
            </Link>
          </div>

          {/* Title Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#e7e7e7] rounded-lg p-4">
                <span role="img" aria-label="identifier variables" className="text-4xl">🔑</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Identifier Variables Challenge</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Master the art of recognizing identifier variables! Learn to identify which variables serve as unique identifiers in real-world datasets.
                </p>
              </div>
            </div>
          </div>

          {/* Game Rules */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">How to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Game Rules</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Examine real datasets and identify the identifier variable</li>
                  <li>• Look for variables that uniquely identify each record</li>
                  <li>• You have 2 minutes to answer as many questions as possible</li>
                  <li>• Earn 10 points for each correct answer</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Key Concepts</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-purple-50 rounded">
                    <strong className="text-purple-700">Identifier Variables:</strong> Unique values used solely for identification and record-keeping (ID numbers, emails, serial numbers, usernames)
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <strong className="text-blue-700">Purpose:</strong> These variables help distinguish one record from another and maintain data integrity
                  </div>
                </div>
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

  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Variable Types
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 80 ? 'Excellent Work!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{answeredQuestions}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {answeredQuestions > 0 ? Math.round((score / (answeredQuestions * 10)) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Play Again
              </button>
              <Link
                href="/chapters/1"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Back to Chapter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentChallengeData = challenges[currentChallenge];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Variable Types
          </Link>
        </div>

        {/* Game Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#58595b]">Identifier Variables Challenge</h1>
              <p className="text-gray-600">Question {currentChallenge + 1} of {challenges.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Time: <span className="font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span></div>
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
              
              {/* Data Table */}
              <div className="overflow-x-auto bg-white rounded-lg border">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      {currentChallengeData.tableData.headers.map((header, index) => (
                        <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentChallengeData.tableData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 border-b font-mono">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <strong>Task:</strong> Identify which column serves as the identifier variable - the one used to uniquely identify each record.
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
        {showFeedback && feedbackData && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">
                  {feedbackData.isCorrect ? '✅' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                  {feedbackData.isCorrect ? 'Correct!' : 'Not Quite'}
                </h3>
                {!feedbackData.isCorrect && (
                  <p className="text-gray-600 mb-2">
                    Correct answer: <strong>{feedbackData.correctAnswer}</strong>
                  </p>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-sm">{feedbackData.explanation}</p>
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
