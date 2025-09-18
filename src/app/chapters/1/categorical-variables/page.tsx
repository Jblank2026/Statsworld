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

export default function CategoricalVariables() {
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
      question: "A survey asks respondents to choose their favorite season:",
      variable: "Favorite Season",
      context: "Survey Response",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Seasons have no natural order or ranking - spring isn't 'greater than' winter. This makes it nominal categorical data.",
      hint: "Think about whether the seasons can be ranked in any meaningful order.",
      examples: ["Spring", "Summer", "Fall", "Winter"]
    },
    {
      id: 2,
      question: "Students rate their satisfaction with a course on a scale:",
      variable: "Satisfaction Rating",
      context: "Course Evaluation",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Satisfaction ratings have a clear order from least to most satisfied, making this ordinal categorical data.",
      hint: "Consider whether there's a natural ranking from worse to better.",
      examples: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
    },
    {
      id: 3,
      question: "A researcher records the eye color of participants:",
      variable: "Eye Color",
      context: "Research Study",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Eye colors are categories with no inherent order - brown eyes aren't 'more' than blue eyes.",
      hint: "Can you rank eye colors from lowest to highest? Why or why not?",
      examples: ["Brown", "Blue", "Green", "Hazel", "Gray"]
    },
    {
      id: 4,
      question: "A company tracks employee performance ratings:",
      variable: "Performance Rating",
      context: "HR Evaluation",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Performance ratings have a clear hierarchy from worst to best performance, making this ordinal data.",
      hint: "Think about whether 'Excellent' is better than 'Good' in a meaningful way.",
      examples: ["Poor", "Below Average", "Average", "Good", "Excellent"]
    },
    {
      id: 5,
      question: "A survey collects information about marital status:",
      variable: "Marital Status",
      context: "Demographics Survey",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Marital statuses are distinct categories with no natural ordering or ranking.",
      hint: "Is there a logical way to order these categories from low to high?",
      examples: ["Single", "Married", "Divorced", "Widowed", "Separated"]
    },
    {
      id: 6,
      question: "Students' final letter grades in a statistics course:",
      variable: "Letter Grade",
      context: "Academic Records",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Letter grades have a clear academic hierarchy from F (lowest) to A (highest), making this ordinal categorical data.",
      hint: "Consider the academic meaning behind letter grades - do they represent levels of achievement?",
      examples: ["F", "D", "C", "B", "A"]
    },
    {
      id: 7,
      question: "A restaurant survey asks about preferred cuisine type:",
      variable: "Cuisine Preference",
      context: "Customer Survey",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Cuisine types are distinct categories with no inherent ranking - Italian isn't 'greater than' Mexican cuisine.",
      hint: "Can you objectively rank different cuisine types from best to worst?",
      examples: ["Italian", "Mexican", "Chinese", "American", "Indian"]
    },
    {
      id: 8,
      question: "A fitness app tracks workout intensity levels:",
      variable: "Intensity Level",
      context: "Fitness Tracking",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Intensity levels represent ordered categories from least to most intense, making this ordinal categorical data.",
      hint: "Think about whether these levels progress from low to high intensity.",
      examples: ["Light", "Moderate", "Vigorous", "High", "Maximum"]
    },
    {
      id: 9,
      question: "A survey records participants' preferred mode of transportation:",
      variable: "Transportation Mode",
      context: "Commuting Survey",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Transportation modes are distinct categories with no natural ordering or hierarchy.",
      hint: "Is there a logical way to rank these transportation options from lowest to highest?",
      examples: ["Car", "Bus", "Bicycle", "Walking", "Train"]
    },
    {
      id: 10,
      question: "A medical study records pain severity levels:",
      variable: "Pain Level",
      context: "Medical Assessment",
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Pain levels represent ordered categories from least to most severe pain, making this ordinal categorical data.",
      hint: "Consider whether these levels represent increasing degrees of something.",
      examples: ["None", "Mild", "Moderate", "Severe", "Extreme"]
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
                <span role="img" aria-label="categorical variables" className="text-4xl">🏷️</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Categorical Variables Challenge</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Master the art of identifying categorical data! Learn to distinguish between nominal and ordinal categories through real-world examples.
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
                  <li>• Identify whether variables are categorical or quantitative</li>
                  <li>• For categorical variables, determine if they're nominal or ordinal</li>
                  <li>• You have 2 minutes to answer as many questions as possible</li>
                  <li>• Earn 10 points for each correct answer</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Variable Types</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded">
                    <strong className="text-blue-700">Categorical - Nominal:</strong> Categories with no natural order (colors, names)
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <strong className="text-green-700">Categorical - Ordinal:</strong> Categories with meaningful order (ratings, grades)
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
              <h1 className="text-2xl font-bold text-[#58595b]">Categorical Variables Challenge</h1>
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
                    <span key={index} className="bg-white px-3 py-1 rounded border text-sm">
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


