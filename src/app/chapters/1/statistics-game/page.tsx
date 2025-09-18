"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  type: 'multiple-choice' | 'matching' | 'scenario';
  category: 'statistics' | 'populations' | 'variables';
  question: string;
  scenario?: string;
  options?: string[];
  correctAnswer?: string;
  matchingPairs?: { left: string; right: string }[];
  explanation: string;
  points: number;
}

export default function StatisticsGameChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [matchingAnswers, setMatchingAnswers] = useState<{[key: string]: string}>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [achievements, setAchievements] = useState<string[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'statistics',
      question: "What is the main purpose of statistics?",
      options: [
        "To create complex mathematical formulas",
        "To measure, understand, and adapt to variation", 
        "To prove that all data is accurate",
        "To make data look more professional"
      ],
      correctAnswer: "To measure, understand, and adapt to variation",
      explanation: "Statistics is fundamentally about dealing with variation - measuring it, understanding patterns in it, and making decisions despite uncertainty.",
      points: 10
    },
    {
      id: 2,
      type: 'scenario',
      category: 'populations',
      question: "A market research company surveys 500 randomly selected smartphone users to estimate what percentage of all smartphone users prefer iOS over Android. They find that 45% of their sample prefers iOS. What is the population in this study?",
      options: [
        "The 500 surveyed smartphone users",
        "All smartphone users everywhere",
        "Only iOS users",
        "The 45% who prefer iOS"
      ],
      correctAnswer: "All smartphone users everywhere",
      explanation: "The population is the entire group we want to learn about - all smartphone users. The sample is the 500 people we actually surveyed.",
      points: 15
    },
    {
      id: 3,
      type: 'matching',
      category: 'variables',
      question: "Match each variable with its correct type:",
      matchingPairs: [
        { left: "Number of pets owned", right: "Quantitative - Discrete" },
        { left: "Customer satisfaction rating", right: "Categorical - Ordinal" },
        { left: "Social Security Number", right: "Identifier" },
        { left: "Hair color", right: "Categorical - Nominal" },
        { left: "Height in inches", right: "Quantitative - Continuous" }
      ],
      explanation: "Remember: Discrete = countable, Continuous = measurable, Nominal = no order, Ordinal = has order, Identifier = unique labels.",
      points: 20
    },
    {
      id: 4,
      type: 'multiple-choice',
      category: 'statistics',
      question: "A weather forecasting service uses historical data and current conditions to predict tomorrow's temperature. Which statistical concept does this best demonstrate?",
      options: [
        "Measuring variation only",
        "Understanding variation only",
        "Reducing/adapting to variation",
        "Creating variation"
      ],
      correctAnswer: "Reducing/adapting to variation",
      explanation: "Weather forecasting attempts to reduce uncertainty about future conditions by using statistical models to make the best possible predictions despite natural variation.",
      points: 15
    },
    {
      id: 5,
      type: 'scenario',
      category: 'populations',
      question: "In the smartphone preference study, what would be considered the 'statistic'?",
      scenario: "Recall: 500 smartphone users were surveyed, and 45% preferred iOS.",
      options: [
        "All smartphone users",
        "The 500 surveyed users", 
        "45% (the sample result)",
        "The true preference of all users"
      ],
      correctAnswer: "45% (the sample result)",
      explanation: "A statistic is a number calculated from sample data. The 45% is what we calculated from our sample of 500 users. The true preference of all users would be the parameter.",
      points: 15
    },
    {
      id: 6,
      type: 'multiple-choice',
      category: 'variables',
      question: "A fitness app tracks 'workout intensity level' as: Light, Moderate, Vigorous, High, Maximum. What type of variable is this?",
      options: [
        "Quantitative - Discrete",
        "Quantitative - Continuous",
        "Categorical - Nominal",
        "Categorical - Ordinal"
      ],
      correctAnswer: "Categorical - Ordinal",
      explanation: "These are categories (not numbers) but they have a clear order from least to most intense. Ordinal categorical data has meaningful ranking.",
      points: 10
    },
    {
      id: 7,
      type: 'multiple-choice',
      category: 'statistics',
      question: "Why is context important in statistics?",
      options: [
        "It makes the data look more impressive",
        "All data needs context to be meaningful and interpretable",
        "Context is only needed for complex analyses",
        "It helps make the numbers bigger"
      ],
      correctAnswer: "All data needs context to be meaningful and interpretable",
      explanation: "Numbers alone don't tell a story. Context helps us understand what the data represents, how it was collected, and what it means in the real world.",
      points: 10
    },
    {
      id: 8,
      type: 'scenario',
      category: 'variables',
      question: "A study measures 'reaction time in milliseconds' for video game players. What type of variable is this?",
      options: [
        "Categorical - Ordinal",
        "Quantitative - Discrete", 
        "Quantitative - Continuous",
        "Identifier"
      ],
      correctAnswer: "Quantitative - Continuous",
      explanation: "Time can be measured with increasing precision (milliseconds, microseconds, etc.) and can take any value within a range, making it continuous quantitative data.",
      points: 10
    },
    {
      id: 9,
      type: 'multiple-choice',
      category: 'populations',
      question: "What is the key difference between a parameter and a statistic?",
      options: [
        "Parameters are always larger than statistics",
        "Parameters describe populations; statistics describe samples",
        "Parameters are more accurate than statistics",
        "There is no difference"
      ],
      correctAnswer: "Parameters describe populations; statistics describe samples",
      explanation: "Parameters are true facts about entire populations (usually unknown), while statistics are calculations from sample data that estimate parameters.",
      points: 15
    },
    {
      id: 10,
      type: 'scenario',
      category: 'statistics',
      question: "A social media company analyzes user engagement patterns to improve their recommendation algorithm. This is primarily an example of:",
      scenario: "The company tracks when users like, share, comment, or scroll past content to understand preferences.",
      options: [
        "Measuring variation in user behavior",
        "Understanding variation to improve recommendations", 
        "Adapting to user preference variation",
        "All of the above"
      ],
      correctAnswer: "All of the above",
      explanation: "This demonstrates all three purposes of statistics: measuring engagement variation, understanding patterns in user behavior, and adapting the algorithm to work better despite varying preferences.",
      points: 20
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
    setCurrentQuestion(0);
    setScore(0);
    setTotalPoints(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
    setMatchingAnswers({});
    setTimeLeft(300);
    setAchievements([]);
  };

  const handleSubmit = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;
    let pointsEarned = 0;

    if (question.type === 'multiple-choice' || question.type === 'scenario') {
      isCorrect = selectedAnswer === question.correctAnswer;
    } else if (question.type === 'matching') {
      const correctPairs = question.matchingPairs || [];
      const correctCount = correctPairs.filter(pair => 
        matchingAnswers[pair.left] === pair.right
      ).length;
      isCorrect = correctCount === correctPairs.length;
    }

    if (isCorrect) {
      pointsEarned = question.points;
      setScore(prev => prev + 1);
      setTotalPoints(prev => prev + pointsEarned);
      
      // Achievement system
      const newAchievements = [...achievements];
      if (pointsEarned >= 20 && !achievements.includes('perfectionist')) {
        newAchievements.push('perfectionist');
      }
      if (currentQuestion === 0 && isCorrect && !achievements.includes('fast-starter')) {
        newAchievements.push('fast-starter');
      }
      setAchievements(newAchievements);

      confetti({
        particleCount: pointsEarned * 2,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer('');
        setMatchingAnswers({});
      } else {
        setGameEnded(true);
        // Final achievement
        if (score + (isCorrect ? 1 : 0) === questions.length) {
          setAchievements(prev => [...prev, 'perfect-score']);
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.6 }
          });
        }
      }
    }, 3500);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentQuestion(0);
    setScore(0);
    setTotalPoints(0);
    setShowFeedback(false);
    setSelectedAnswer('');
    setMatchingAnswers({});
    setTimeLeft(300);
    setAchievements([]);
  };

  const handleMatchingChange = (left: string, right: string) => {
    setMatchingAnswers(prev => ({ ...prev, [left]: right }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Introduction to Statistics
            </Link>
          </div>

          {/* Title Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#e7e7e7] rounded-lg p-4">
                <span role="img" aria-label="statistics game" className="text-4xl">🎮</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Statistics Game Challenge</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Test your mastery of all Chapter 1 concepts in this comprehensive challenge!
                </p>
              </div>
            </div>
          </div>

          {/* Game Overview */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">🏆 Challenge Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="font-semibold text-[#58595b] mb-2">Statistics Concepts</h3>
                <p className="text-sm text-gray-600">What is statistics, variation, and context</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-[#58595b] mb-2">Populations & Samples</h3>
                <p className="text-sm text-gray-600">Parameters vs statistics, data structure</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🏷️</div>
                <h3 className="font-semibold text-[#58595b] mb-2">Variable Types</h3>
                <p className="text-sm text-gray-600">Categorical, quantitative, and identifier variables</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">🎯 Game Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 10 challenging questions</li>
                  <li>• Multiple question types</li>
                  <li>• 5-minute time limit</li>
                  <li>• Points-based scoring</li>
                  <li>• Achievement system</li>
                  <li>• Detailed explanations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">🏅 Achievements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 🚀 Fast Starter: Nail the first question</li>
                  <li>• 💎 Perfectionist: Get a 20-point question right</li>
                  <li>• 🎯 Perfect Score: Answer all questions correctly</li>
                  <li>• ⚡ Speed Demon: Finish with time to spare</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start Game */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-gray-600 mb-8">
              This comprehensive challenge will test everything you've learned about statistics, 
              populations vs samples, and variable types. Good luck!
            </p>
            
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors text-lg"
            >
              🎮 Start Challenge
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (gameEnded) {
    const percentage = Math.round((score / questions.length) * 100);
    const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);
    
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Introduction to Statistics
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {percentage >= 90 ? '🏆' : percentage >= 80 ? '🎉' : percentage >= 70 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {percentage >= 90 ? 'Statistics Master!' : 
               percentage >= 80 ? 'Excellent Work!' : 
               percentage >= 70 ? 'Great Job!' : 'Keep Learning!'}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{percentage}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{totalPoints}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{formatTime(300 - timeLeft)}</div>
                <div className="text-sm text-gray-600">Time Used</div>
              </div>
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">🏅 Achievements Unlocked</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {achievements.map((achievement) => (
                    <span key={achievement} className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm">
                      {achievement === 'perfectionist' && '💎 Perfectionist'}
                      {achievement === 'fast-starter' && '🚀 Fast Starter'}
                      {achievement === 'perfect-score' && '🎯 Perfect Score'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Try Again
              </button>
              <Link
                href="/chapters/2"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Next Chapter
              </Link>
              <Link
                href="/chapters/1"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Review Chapter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const canSubmit = currentQuestionData.type === 'matching' 
    ? Object.keys(matchingAnswers).length === (currentQuestionData.matchingPairs?.length || 0)
    : selectedAnswer !== '';

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/1" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Introduction to Statistics
          </Link>
        </div>

        {/* Game Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#58595b]">Statistics Game Challenge</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Time: <span className="font-bold text-[#ff8200]">{formatTime(timeLeft)}</span></div>
              <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span> | Points: <span className="font-bold">{totalPoints}</span></div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm mr-3">
                {currentQuestionData.points} points
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {currentQuestionData.category}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-[#58595b] mb-4">
              {currentQuestionData.question}
            </h2>
            
            {currentQuestionData.scenario && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <p className="text-blue-800 text-sm font-medium">📊 Scenario Context:</p>
                <p className="text-blue-700">{currentQuestionData.scenario}</p>
              </div>
            )}
          </div>

          {/* Multiple Choice / Scenario Questions */}
          {(currentQuestionData.type === 'multiple-choice' || currentQuestionData.type === 'scenario') && (
            <div className="space-y-3 mb-8">
              {currentQuestionData.options?.map((option) => (
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
          )}

          {/* Matching Questions */}
          {currentQuestionData.type === 'matching' && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#58595b] mb-4">Variables</h3>
                  {currentQuestionData.matchingPairs?.map((pair) => (
                    <div key={pair.left} className="mb-3 p-3 bg-gray-50 rounded border">
                      {pair.left}
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#58595b] mb-4">Variable Types</h3>
                  {currentQuestionData.matchingPairs?.map((pair) => (
                    <div key={pair.left} className="mb-3">
                      <select
                        value={matchingAnswers[pair.left] || ''}
                        onChange={(e) => handleMatchingChange(pair.left, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select type...</option>
                        <option value="Categorical - Nominal">Categorical - Nominal</option>
                        <option value="Categorical - Ordinal">Categorical - Ordinal</option>
                        <option value="Quantitative - Discrete">Quantitative - Discrete</option>
                        <option value="Quantitative - Continuous">Quantitative - Continuous</option>
                        <option value="Identifier">Identifier</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || showFeedback}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !canSubmit || showFeedback
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
                  {(() => {
                    if (currentQuestionData.type === 'matching') {
                      const correctPairs = currentQuestionData.matchingPairs || [];
                      const correctCount = correctPairs.filter(pair => 
                        matchingAnswers[pair.left] === pair.right
                      ).length;
                      return correctCount === correctPairs.length ? '✅' : '❌';
                    }
                    return selectedAnswer === currentQuestionData.correctAnswer ? '✅' : '❌';
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                  {(() => {
                    let isCorrect = false;
                    if (currentQuestionData.type === 'matching') {
                      const correctPairs = currentQuestionData.matchingPairs || [];
                      const correctCount = correctPairs.filter(pair => 
                        matchingAnswers[pair.left] === pair.right
                      ).length;
                      isCorrect = correctCount === correctPairs.length;
                    } else {
                      isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
                    }
                    return isCorrect ? 'Correct!' : 'Not Quite';
                  })()}
                </h3>
                <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  +{(() => {
                    let isCorrect = false;
                    if (currentQuestionData.type === 'matching') {
                      const correctPairs = currentQuestionData.matchingPairs || [];
                      const correctCount = correctPairs.filter(pair => 
                        matchingAnswers[pair.left] === pair.right
                      ).length;
                      isCorrect = correctCount === correctPairs.length;
                    } else {
                      isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
                    }
                    return isCorrect ? currentQuestionData.points : 0;
                  })()} points
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-sm">{currentQuestionData.explanation}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">Next question in 3.5 seconds...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
