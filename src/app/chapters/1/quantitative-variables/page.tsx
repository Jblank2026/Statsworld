"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Challenge {
  id: number;
  question: string;
  variable: string;
  context: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  examples: string[];
}

export default function QuantitativeVariables() {
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
      question: "A researcher measures the height of students in centimeters:",
      variable: "Height (cm)",
      context: "Student Measurements",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Height can take any value within a range and can be measured to any level of precision (170.5 cm, 170.53 cm, etc.). This makes it continuous quantitative data.",
      hint: "Think about whether height can be measured to decimal places.",
      examples: ["165.2 cm", "170.8 cm", "182.3 cm", "158.7 cm", "175.1 cm"]
    },
    {
      id: 2,
      question: "A survey counts the number of pets each family owns:",
      variable: "Number of Pets",
      context: "Family Survey",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "You can count pets in whole numbers only (0, 1, 2, 3...). You can't have 2.5 pets, making this discrete quantitative data.",
      hint: "Can you have half a pet? Think about whether this variable can only take whole number values.",
      examples: ["0", "1", "2", "3", "5"]
    },
    {
      id: 3,
      question: "Scientists measure the weight of chemical samples in grams:",
      variable: "Sample Weight (g)",
      context: "Laboratory Research",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Weight can be measured to any level of precision and can take any value within a range, making it continuous quantitative data.",
      hint: "Consider whether weight can be measured with decimal precision.",
      examples: ["15.23 g", "8.456 g", "22.1 g", "11.789 g", "19.34 g"]
    },
    {
      id: 4,
      question: "A teacher records the number of questions students got correct on a test:",
      variable: "Questions Correct",
      context: "Test Scores",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Questions correct must be whole numbers (you can't get 7.5 questions correct), making this discrete quantitative data.",
      hint: "Can a student get a fractional number of questions correct?",
      examples: ["18", "22", "15", "20", "17"]
    },
    {
      id: 5,
      question: "A fitness tracker measures running speed in miles per hour:",
      variable: "Running Speed (mph)",
      context: "Fitness Tracking",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Speed can vary continuously and be measured to any level of precision, making it continuous quantitative data.",
      hint: "Think about whether speed can have decimal values.",
      examples: ["6.2 mph", "8.7 mph", "5.3 mph", "9.1 mph", "7.8 mph"]
    },
    {
      id: 6,
      question: "A parking lot attendant counts cars entering each hour:",
      variable: "Cars per Hour",
      context: "Parking Management",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Cars are counted in whole numbers only - you can't have a fractional car, making this discrete quantitative data.",
      hint: "Can part of a car enter the parking lot?",
      examples: ["12", "8", "15", "23", "6"]
    },
    {
      id: 7,
      question: "A thermometer measures outdoor temperature in degrees Fahrenheit:",
      variable: "Temperature (°F)",
      context: "Weather Monitoring",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Temperature can take any value within a range and can be measured to any level of precision, making it continuous quantitative data.",
      hint: "Consider whether temperature can be measured with decimal precision.",
      examples: ["72.3°F", "68.7°F", "81.2°F", "55.9°F", "77.1°F"]
    },
    {
      id: 8,
      question: "A librarian counts the number of books checked out daily:",
      variable: "Books Checked Out",
      context: "Library Statistics",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Books are counted in whole numbers - you can't check out a fraction of a book, making this discrete quantitative data.",
      hint: "Can someone check out half a book?",
      examples: ["47", "32", "68", "41", "55"]
    },
    {
      id: 9,
      question: "A scientist measures reaction time in milliseconds:",
      variable: "Reaction Time (ms)",
      context: "Psychology Experiment",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Reaction time can be measured to any level of precision and can take any value within a range, making it continuous quantitative data.",
      hint: "Think about how precisely reaction time can be measured.",
      examples: ["324.7 ms", "289.2 ms", "412.6 ms", "356.1 ms", "298.9 ms"]
    },
    {
      id: 10,
      question: "A survey asks respondents how many siblings they have:",
      variable: "Number of Siblings",
      context: "Family Demographics",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Siblings are counted in whole numbers only - you can't have a fractional sibling, making this discrete quantitative data.",
      hint: "Can someone have 2.5 siblings?",
      examples: ["0", "1", "2", "3", "4"]
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
                <span role="img" aria-label="quantitative variables" className="text-4xl">📊</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Quantitative Variables Challenge</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Master numerical data classification! Learn to distinguish between discrete and continuous quantitative variables through real-world scenarios.
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
                  <li>• Identify whether variables are quantitative or categorical</li>
                  <li>• For quantitative variables, determine if they're discrete or continuous</li>
                  <li>• You have 2 minutes to answer as many questions as possible</li>
                  <li>• Earn 10 points for each correct answer</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Variable Types</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded">
                    <strong className="text-blue-700">Quantitative - Discrete:</strong> Countable numbers, whole values only (number of cars, people)
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <strong className="text-green-700">Quantitative - Continuous:</strong> Measurable values, can have decimals (height, weight, time)
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
              <h1 className="text-2xl font-bold text-[#58595b]">Quantitative Variables Challenge</h1>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Variable:</span> {currentChallengeData.variable}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Context:</span> {currentChallengeData.context}
                </div>
              </div>
              <div className="mt-3">
                <span className="font-semibold text-gray-700">Example Values:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentChallengeData.examples.map((example, index) => (
                    <span key={index} className="bg-white px-3 py-1 rounded border text-sm font-mono">
                      {example}
                    </span>
                  ))}
                </div>
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


