"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

interface Challenge {
  id: number;
  title: string; // Short descriptive title
  task: string;
  correctAnswer: string;
  displayAnswer: string;
  explanation: string;
  hint: string;
}

export default function VectorChallenge() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Basic Vector",
      task: "Create a numeric vector called 'x' with the numbers 2, 6, 1, 0, and 5",
      correctAnswer: "x<-c(2,6,1,0,5)||x <- c(2,6,1,0,5)||x=c(2,6,1,0,5)",
      displayAnswer: "x<-c(2,6,1,0,5)",
      explanation: "In R, we use x <- c() to save values into a vector named 'x'. The values are separated by commas.",
      hint: "Use x <- c() to save the numbers into a vector named 'x'"
    },
    {
      id: 2,
      title: "Sequence",
      task: "Save a sequence from 1 to 78 (incremented by 0.2) into a vector called 'x'",
      correctAnswer: "x<-seq(from=1,to=78,by=0.2)||x <- seq(from=1,to=78,by=0.2)||x=seq(from=1,to=78,by=0.2)",
      displayAnswer: "x<-seq(from=1,to=78,by=0.2)",
      explanation: "The seq() function creates sequences. We save it to 'x' using the assignment operator <-",
      hint: "Use x <- seq() with from, to, and by parameters"
    },
    {
      id: 3,
      title: "String Repeat",
      task: "Create a vector 'x' that repeats the string \"Hello\" 10 times",
      correctAnswer: "x<-rep(\"Hello\",times=10)||x <- rep(\"Hello\",times=10)||x=rep(\"Hello\",times=10)",
      displayAnswer: "x<-rep(\"Hello\",times=10)",
      explanation: "The rep() function repeats values. We save the result to 'x' using <-",
      hint: "Use x <- rep() with a string and times parameter"
    },
    {
      id: 4,
      title: "Factor Vector",
      task: "Create a factor vector 'x' with the values 'up' and 'down', in the order: up, up, down, up",
      correctAnswer: "x<-factor(c(\"up\",\"up\",\"down\",\"up\"))||x <- factor(c(\"up\",\"up\",\"down\",\"up\"))||x=factor(c(\"up\",\"up\",\"down\",\"up\"))",
      displayAnswer: "x<-factor(c(\"up\",\"up\",\"down\",\"up\"))",
      explanation: "Combine factor() with c() to create categorical data, saving to 'x' using <-",
      hint: "Use x <- factor(c()) to create and save the factor vector"
    },
    {
      id: 5,
      title: "Fixed Length",
      task: "Save a sequence from 1 to 40 with exactly 105 values into a vector called 'x'",
      correctAnswer: "x<-seq(from=1,to=40,length=105)||x <- seq(from=1,to=40,length=105)||x=seq(from=1,to=40,length=105)",
      displayAnswer: "x<-seq(from=1,to=40,length=105)",
      explanation: "Use seq() with length parameter to specify exact number of values, saving to 'x'",
      hint: "Use x <- seq() with from, to, and length parameters"
    },
    {
      id: 6,
      title: "Multiple Repeat",
      task: "Create a vector 'x' by repeating 'cat' and 'dog' 6 times each",
      correctAnswer: "x<-rep(c(\"cat\",\"dog\"),times=6)||x <- rep(c(\"cat\",\"dog\"),times=6)||x=rep(c(\"cat\",\"dog\"),times=6)",
      displayAnswer: "x<-rep(c(\"cat\",\"dog\"),times=6)",
      explanation: "Combine rep() with c() to repeat multiple values, saving the result to 'x'",
      hint: "Use x <- rep(c()) to save the repeated values"
    },
    {
      id: 7,
      title: "Basic Which",
      task: "Given x <- c(2, 5, 3, 8, 7), use which() to find the positions of elements equal to 3",
      correctAnswer: "which(x==3)",
      displayAnswer: "which(x==3)",
      explanation: "which() returns the positions where a condition is TRUE. Here we check where x equals 3.",
      hint: "Use which() with the equality operator =="
    },
    {
      id: 8,
      title: "Less Than",
      task: "Given x <- c(4, 6, 2, 10, 5), use which() to find positions of elements less than or equal to 10",
      correctAnswer: "which(x<=10)",
      displayAnswer: "which(x<=10)",
      explanation: "which() with <= finds positions where elements are less than or equal to a value.",
      hint: "Use which() with the less than or equal operator <="
    },
    {
      id: 9,
      title: "AND Condition",
      task: "Given x <- c(1, 5, 3, 8, 7), use which() to find positions where elements are between 2 and 6 inclusive",
      correctAnswer: "which(x>=2&x<=6)",
      displayAnswer: "which(x>=2&x<=6)",
      explanation: "Combine conditions with & (AND) to find elements in a range. Both conditions must be true.",
      hint: "Use which() with two conditions connected by &"
    },
    {
      id: 10,
      title: "OR with NA",
      task: "Given x <- c(3, 0, 8, NA, 5), use which() to find positions of elements that are 0 or NA",
      correctAnswer: "which(x==0|is.na(x))",
      displayAnswer: "which(x==0|is.na(x))",
      explanation: "Use | (OR) to combine conditions and is.na() to check for NA values.",
      hint: "Use which() with two conditions connected by | and is.na()"
    },
    {
      id: 11,
      title: "Range Check",
      task: "Given x <- c(10, 20, 15, 30, 25), use which() to find positions of elements between 15 and 30 (excluding 30)",
      correctAnswer: "which(x>=15&x<30)",
      displayAnswer: "which(x>=15&x<30)",
      explanation: "Use & to combine conditions for a range. >= includes 15, < excludes 30.",
      hint: "Use which() with two conditions: >= 15 and < 30"
    },
    {
      id: 12,
      title: "Equals Condition",
      task: "Create a vector x with c(2,3,5,3,6), then find the positions of elements equal to 3 using which()",
      correctAnswer: "x<-c(2,3,5,3,6);which(x==3)",
      displayAnswer: "x<-c(2,3,5,3,6);which(x==3)",
      explanation: "which() with == finds positions where elements equal a specific value",
      hint: "First create the vector, then use which() with ==3"
    },
    {
      id: 13,
      title: "Greater Than",
      task: "Create a vector x with c(5,10,15,20,25), then find positions of elements greater than 15 using which()",
      correctAnswer: "x<-c(5,10,15,20,25);which(x>15)",
      displayAnswer: "x<-c(5,10,15,20,25);which(x>15)",
      explanation: "which() with > finds positions where elements exceed a value",
      hint: "First create the vector, then use which() with >15"
    },
    {
      id: 14,
      title: "Missing Values",
      task: "Create a vector x with c(1,NA,5,NA,10), then find positions of NA values using which()",
      correctAnswer: "x<-c(1,NA,5,NA,10);which(is.na(x))",
      displayAnswer: "x<-c(1,NA,5,NA,10);which(is.na(x))",
      explanation: "which() with is.na() finds positions of missing values",
      hint: "First create the vector, then use which(is.na())"
    },
    {
      id: 15,
      title: "At Most",
      task: "Create a vector x with c(5,10,15,20), then find positions of elements at most 10 using which()",
      correctAnswer: "x<-c(5,10,15,20);which(x<=10)",
      displayAnswer: "x<-c(5,10,15,20);which(x<=10)",
      explanation: "which() with <= finds positions where elements are less than or equal to a value",
      hint: "First create the vector, then use which() with <=10"
    },
    {
      id: 16,
      title: "Multiple Values",
      task: "Create a vector x with c(2,5,8,10), then find positions of elements that are either 5 or 10 using which()",
      correctAnswer: "x<-c(2,5,8,10);which(x%in%c(5,10))",
      displayAnswer: "x<-c(2,5,8,10);which(x%in%c(5,10))",
      explanation: "which() with %in% finds positions matching any value in a set",
      hint: "First create the vector, then use which() with %in%"
    },
    {
      id: 17,
      title: "Basic Element Access",
      task: "Given x <- c(10, 20, 30, 40, 50), use square brackets to get the third element",
      correctAnswer: "x[3]",
      displayAnswer: "x[3]",
      explanation: "Use square brackets with the element number to get a specific element. R uses 1-based element numbering.",
      hint: "Use x[3] to get the third element"
    },
    {
      id: 18,
      title: "Multiple Elements",
      task: "Given x <- c(5, 10, 15, 20, 25), use square brackets to get the first and fourth elements",
      correctAnswer: "x[c(1,4)]",
      displayAnswer: "x[c(1,4)]",
      explanation: "Use c() inside square brackets to get multiple elements by their element numbers",
      hint: "Use x[c(1,4)] to get elements at numbers 1 and 4"
    },
    {
      id: 19,
      title: "Greater Than Elements",
      task: "Given x <- c(2, 5, 8, 11, 14), use square brackets to get all elements greater than 5",
      correctAnswer: "x[x>5]",
      displayAnswer: "x[x>5]",
      explanation: "Use a logical condition inside square brackets to get elements that satisfy the condition",
      hint: "Use x[x>5] to get elements greater than 5"
    }
  ];

  const triggerConfetti = () => {
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
    setCurrentChallengeIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setCompletedChallenges([]);
    setWrongAttempts(0);
    setShowCompletionModal(false);
  };

  const checkAnswer = () => {
    if (isLoading) return;
    
    const currentChallenge = challenges[currentChallengeIndex];
    const cleanUserAnswer = userAnswer.replace(/\s+/g, '');
    const validAnswers = currentChallenge.correctAnswer.split('||').map(answer => answer.replace(/\s+/g, ''));
    const isCorrect = validAnswers.includes(cleanUserAnswer);
    
    if (isCorrect) {
      setFeedback({
        isCorrect,
        message: "Correct! " + currentChallenge.explanation
      });
      setIsLoading(true);
      setWrongAttempts(0);
      
      // Only add to completedChallenges if not already completed
      let newCompletedChallenges = [...completedChallenges];
      if (!completedChallenges.includes(currentChallenge.id)) {
        newCompletedChallenges = [...completedChallenges, currentChallenge.id];
        setCompletedChallenges(newCompletedChallenges);
      }
      
      setTimeout(() => {
        if (currentChallengeIndex < challenges.length - 1) {
          setCurrentChallengeIndex(prev => prev + 1);
          setUserAnswer('');
          setFeedback(null);
          setShowHint(false);
        }
        // Only show completion modal if all unique challenges are completed
        if (newCompletedChallenges.length === challenges.length) {
          setShowCompletionModal(true);
          triggerConfetti();
        }
        setIsLoading(false);
      }, 2000);
    } else {
      setWrongAttempts(prev => prev + 1);
      setFeedback({
        isCorrect,
        message: "Not quite. Try again! Remember: " + currentChallenge.explanation
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      checkAnswer();
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentChallengeIndex(index);
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
                {challenges.map((challenge, index) => (
                  <button
                    key={challenge.id}
                    onClick={() => jumpToQuestion(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      completedChallenges.includes(challenge.id)
                        ? 'bg-green-100 text-green-800'
                        : index === currentChallengeIndex
                        ? 'bg-[#ff8200] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{challenge.id}. {challenge.title}</span>
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
              <span role="img" aria-label="game" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Vector Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master R vectors with hands-on practice!
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
                style={{ width: `${((completedChallenges.length) / challenges.length) * 100}%` }}
              />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Challenge {currentChallengeIndex + 1} of {challenges.length}
            </p>
            <p className="text-gray-600 text-sm">
              Completed: {completedChallenges.length} challenges
            </p>
          </div>

          {/* Challenge */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">
              {challenges[currentChallengeIndex].task}
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
                placeholder="Type your R code here..."
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
                  {challenges[currentChallengeIndex].displayAnswer}
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
                  {challenges[currentChallengeIndex].hint}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
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
                  You've mastered R vectors! Would you like to try more challenges?
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