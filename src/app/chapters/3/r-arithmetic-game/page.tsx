"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

interface Question {
  id: number;
  title: string;
  textTemplate: string;
  variations: Array<{
    numbers: string[];
    answer: string;
  }>;
  explanation: string;
  ignoreSpaces?: boolean;
}

export default function RArithmeticGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      title: "Addition",
      textTemplate: "Write the R function to add {0} and {1}",
      variations: [
        { numbers: ["3", "7"], answer: "3+7" },
        { numbers: ["12", "8"], answer: "12+8" },
        { numbers: ["25", "15"], answer: "25+15" },
        { numbers: ["42", "18"], answer: "42+18" },
        { numbers: ["100", "50"], answer: "100+50" }
      ],
      explanation: "In R, we use the + operator for addition",
      ignoreSpaces: true
    },
    {
      id: 2,
      title: "Subtraction",
      textTemplate: "Write the R function to subtract {1} from {0}",
      variations: [
        { numbers: ["10", "4"], answer: "10-4" },
        { numbers: ["20", "7"], answer: "20-7" },
        { numbers: ["50", "25"], answer: "50-25" },
        { numbers: ["100", "33"], answer: "100-33" },
        { numbers: ["75", "15"], answer: "75-15" }
      ],
      explanation: "In R, we use the - operator for subtraction",
      ignoreSpaces: true
    },
    {
      id: 3,
      title: "Multiply Sum",
      textTemplate: "Write the R function to multiply {0} by the sum of {1} and {2}",
      variations: [
        { numbers: ["3", "2", "7"], answer: "3*(2+7)||(2+7)*3" },
        { numbers: ["4", "5", "3"], answer: "4*(5+3)||(5+3)*4" },
        { numbers: ["2", "10", "5"], answer: "2*(10+5)||(10+5)*2" },
        { numbers: ["5", "3", "8"], answer: "5*(3+8)||(3+8)*5" },
        { numbers: ["6", "4", "6"], answer: "6*(4+6)||(4+6)*6" }
      ],
      explanation: "In R, we can write this as either number*(sum) or (sum)*number",
      ignoreSpaces: true
    },
    {
      id: 4,
      title: "Division",
      textTemplate: "Write the R function to divide {0} by {1}",
      variations: [
        { numbers: ["12", "4"], answer: "12/4" },
        { numbers: ["100", "20"], answer: "100/20" },
        { numbers: ["50", "5"], answer: "50/5" },
        { numbers: ["200", "25"], answer: "200/25" },
        { numbers: ["150", "15"], answer: "150/15" }
      ],
      explanation: "In R, we use the / operator for division",
      ignoreSpaces: true
    },
    {
      id: 5,
      title: "Exponents",
      textTemplate: "Write the R function to calculate {0} raised to the power of {1}",
      variations: [
        { numbers: ["3", "7"], answer: "3^7" },
        { numbers: ["2", "8"], answer: "2^8" },
        { numbers: ["5", "4"], answer: "5^4" },
        { numbers: ["4", "5"], answer: "4^5" },
        { numbers: ["6", "3"], answer: "6^3" }
      ],
      explanation: "In R, we use the ^ operator for exponentiation",
      ignoreSpaces: true
    },
    {
      id: 6,
      title: "Exponential",
      textTemplate: "Write the R function to calculate e raised to the power of {0}",
      variations: [
        { numbers: ["3"], answer: "exp(3)" },
        { numbers: ["5"], answer: "exp(5)" },
        { numbers: ["2"], answer: "exp(2)" },
        { numbers: ["4"], answer: "exp(4)" },
        { numbers: ["6"], answer: "exp(6)" }
      ],
      explanation: "In R, we use the exp() function to calculate e raised to a power"
    },
    {
      id: 7,
      title: "Natural Log",
      textTemplate: "Write the R function to calculate the natural logarithm of {0}",
      variations: [
        { numbers: ["100"], answer: "log(100)" },
        { numbers: ["50"], answer: "log(50)" },
        { numbers: ["200"], answer: "log(200)" },
        { numbers: ["150"], answer: "log(150)" },
        { numbers: ["500"], answer: "log(500)" }
      ],
      explanation: "In R, log() calculates the natural logarithm (base e)"
    },
    {
      id: 8,
      title: "Base-10 Log",
      textTemplate: "Write the R function to calculate the base-10 logarithm of {0}",
      variations: [
        { numbers: ["100"], answer: "log10(100)" },
        { numbers: ["1000"], answer: "log10(1000)" },
        { numbers: ["500"], answer: "log10(500)" },
        { numbers: ["250"], answer: "log10(250)" },
        { numbers: ["750"], answer: "log10(750)" }
      ],
      explanation: "In R, log10() calculates the base-10 logarithm"
    },
    {
      id: 9,
      title: "Absolute Value",
      textTemplate: "Write the R function to calculate the absolute value of {0}",
      variations: [
        { numbers: ["-5"], answer: "abs(-5)" },
        { numbers: ["-10"], answer: "abs(-10)" },
        { numbers: ["-3.5"], answer: "abs(-3.5)" },
        { numbers: ["-7.2"], answer: "abs(-7.2)" },
        { numbers: ["-15"], answer: "abs(-15)" }
      ],
      explanation: "In R, abs() calculates the absolute value of a number"
    }
  ];

  // Select a random variation when moving to a new question
  useEffect(() => {
    setCurrentVariationIndex(Math.floor(Math.random() * 5));
  }, [currentQuestionIndex]);

  // Format the question text with the current variation's numbers
  const getCurrentQuestionText = () => {
    const question = questions[currentQuestionIndex];
    const variation = question.variations[currentVariationIndex];
    let text = question.textTemplate;
    variation.numbers.forEach((num, index) => {
      text = text.replace(`{${index}}`, num);
    });
    return text;
  };

  // Get the current correct answer
  const getCurrentAnswer = () => {
    return questions[currentQuestionIndex].variations[currentVariationIndex].answer;
  };

  const triggerConfetti = () => {
    // Fire multiple confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setCompletedQuestions([]);
    setWrongAttempts(0);
    setShowCompletionModal(false);
  };

  const checkAnswer = () => {
    if (isLoading) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.ignoreSpaces) {
      const cleanUserAnswer = userAnswer.replace(/\s+/g, '');
      const possibleAnswers = getCurrentAnswer().split('||');
      isCorrect = possibleAnswers.some(answer => cleanUserAnswer === answer);
    } else {
      isCorrect = userAnswer.trim() === getCurrentAnswer();
    }
    
    if (isCorrect) {
      setFeedback({
        isCorrect,
        message: "Correct! " + currentQuestion.explanation
      });
      setIsLoading(true);
      setWrongAttempts(0);
      
      // Only add to completedQuestions if not already completed
      let newCompletedQuestions = [...completedQuestions];
      if (!completedQuestions.includes(currentQuestion.id)) {
        newCompletedQuestions = [...completedQuestions, currentQuestion.id];
        setCompletedQuestions(newCompletedQuestions);
      }
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setFeedback(null);
          setShowHint(false);
        }
        
        // Show completion modal if all questions are completed
        if (newCompletedQuestions.length === questions.length) {
          setShowCompletionModal(true);
          triggerConfetti();
        }
        
        setIsLoading(false);
      }, 2000);
    } else {
      setWrongAttempts(prev => prev + 1);
      setFeedback({
        isCorrect,
        message: "Not quite. Try again! Remember: " + currentQuestion.explanation
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      checkAnswer();
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentVariationIndex(Math.floor(Math.random() * 5));
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setWrongAttempts(0);
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Menu */}
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#ff8200] hover:text-[#ff9933] p-2"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </div>
          </button>
        </div>

        {/* Question Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-80 h-full overflow-y-auto p-6 transform transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#58595b]">Questions</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => jumpToQuestion(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      completedQuestions.includes(question.id)
                        ? 'bg-green-100 text-green-800'
                        : index === currentQuestionIndex
                        ? 'bg-[#ff8200] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{question.id}. {question.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="game" className="text-4xl">🎮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">R Arithmetic Practice</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the basics of R calculations!
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
                style={{ width: `${((completedQuestions.length) / questions.length) * 100}%` }}
              />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-gray-600 text-sm">
              Completed: {completedQuestions.length} questions
            </p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">
              {getCurrentQuestionText()}
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => !isLoading && setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-[#ff8200] focus:outline-none font-mono ${
                  isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Type your answer here..."
                disabled={isLoading}
              />
              <button
                onClick={checkAnswer}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#ff8200] hover:bg-[#ff9933] text-white'
                }`}
              >
                {isLoading ? 'Loading...' : 'Check'}
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-4 mb-8">
            {feedback && (
              <div className={`p-4 rounded-lg ${
                feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-semibold">{feedback.message}</p>
              </div>
            )}
            
            {/* Reveal Answer Button */}
            {wrongAttempts >= 3 && !showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Reveal Answer
              </button>
            )}

            {/* Answer Display */}
            {wrongAttempts >= 3 && showAnswer && (
              <div className="mt-4 p-4 bg-[#fff4e6] rounded-lg">
                <p className="text-gray-700 mb-2">Need help? Here's the answer:</p>
                <pre className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {getCurrentAnswer()}
                </pre>
              </div>
            )}
          </div>

          {/* Hint Button */}
          <div className="text-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-[#ff8200] hover:text-[#ff9933] font-medium"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Remember to check:
                  <ul className="list-disc list-inside mt-2">
                    <li>Proper operator usage (+, -, *, /, ^)</li>
                    <li>Correct function names (exp, log, log10)</li>
                    <li>Proper parentheses placement</li>
                    <li>No spaces in function names</li>
                  </ul>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation - Previous/Next Only */}
        <ChapterNavigation showBottomNavigation={true} />

        {/* Completion Modal */}
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-bounce-gentle">
              <div className="text-center">
                <span className="text-6xl mb-4 inline-block">🎉</span>
                <h2 className="text-3xl font-bold text-[#58595b] mb-4">
                  Congratulations!
                </h2>
                <p className="text-gray-600 mb-8">
                  You've mastered all the R arithmetic operations! Would you like to try again?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-[#ff8200] text-white rounded-lg hover:bg-[#ff9933] transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </main>
  );
} 