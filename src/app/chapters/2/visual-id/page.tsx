"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// All possible visualization types
const allVisualizations = [
  "Bar Chart",
  "Pie Chart",
  "Dot Plot",
  "Frequency Table",
  "Histogram",
  "Box Plot",
  "Stem-and-Leaf Plot",
  "Mosaic Plot",
  "Scatter Plot",
  "Contingency Table"
];

// Sample visualization challenges
const allChallenges = [
  {
    id: 1,
    image: "/images/viz-1.svg",
    type: "Scatter Plot",
    variables: "Bivariate",
    varTypes: "Quantitative",
    correctAnswers: {
      type: "Scatter Plot",
      variables: "Bivariate",
      varTypes: "Quantitative"
    }
  },
  {
    id: 2,
    image: "/images/viz-2.svg",
    type: "Histogram",
    variables: "Univariate",
    varTypes: "Quantitative",
    correctAnswers: {
      type: "Histogram",
      variables: "Univariate",
      varTypes: "Quantitative"
    }
  },
  {
    id: 3,
    image: "/images/viz-3.svg",
    type: "Bar Chart",
    variables: "Univariate",
    varTypes: "Categorical",
    correctAnswers: {
      type: "Bar Chart",
      variables: "Univariate",
      varTypes: "Categorical"
    }
  },
  {
    id: 4,
    image: "/images/viz-4.svg",
    type: "Frequency Table",
    variables: "Univariate",
    varTypes: "Categorical",
    correctAnswers: {
      type: "Frequency Table",
      variables: "Univariate",
      varTypes: "Categorical"
    }
  },
  {
    id: 5,
    image: "/images/viz-5.svg",
    type: "Mosaic Plot",
    variables: "Bivariate",
    varTypes: "Categorical",
    correctAnswers: {
      type: "Mosaic Plot",
      variables: "Bivariate",
      varTypes: "Categorical"
    }
  },
  {
    id: 6,
    image: "/images/viz-6.svg",
    type: "Box Plot",
    variables: "Bivariate",
    varTypes: "Both",
    correctAnswers: {
      type: "Box Plot",
      variables: "Bivariate",
      varTypes: "Both"
    }
  },
  {
    id: 7,
    image: "/images/viz-7.svg",
    type: "Pie Chart",
    variables: "Univariate",
    varTypes: "Categorical",
    correctAnswers: {
      type: "Pie Chart",
      variables: "Univariate",
      varTypes: "Categorical"
    }
  },
  {
    id: 8,
    image: "/images/viz-8.svg",
    type: "Dot Plot",
    variables: "Univariate",
    varTypes: "Quantitative",
    correctAnswers: {
      type: "Dot Plot",
      variables: "Univariate",
      varTypes: "Quantitative"
    }
  },
  {
    id: 9,
    image: "/images/viz-9.svg",
    type: "Stem-and-Leaf Plot",
    variables: "Univariate",
    varTypes: "Quantitative",
    correctAnswers: {
      type: "Stem-and-Leaf Plot",
      variables: "Univariate",
      varTypes: "Quantitative"
    }
  },
  {
    id: 10,
    image: "/images/viz-10.svg",
    type: "Contingency Table",
    variables: "Bivariate",
    varTypes: "Categorical",
    correctAnswers: {
      type: "Contingency Table",
      variables: "Bivariate",
      varTypes: "Categorical"
    }
  }
];

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get 4 random options including the correct answer
function getFourOptions(correctAnswer: string, allOptions: string[]): string[] {
  const otherOptions = allOptions.filter(option => option !== correctAnswer);
  const shuffledOtherOptions = shuffleArray(otherOptions);
  const selectedOtherOptions = shuffledOtherOptions.slice(0, 3);
  return shuffleArray([...selectedOtherOptions, correctAnswer]);
}

export default function VisualIDChallengePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challenges, setChallenges] = useState(allChallenges);
  const [selectedAnswers, setSelectedAnswers] = useState({
    type: '',
    variables: '',
    varTypes: ''
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<Array<{
    visualization: string;
    userAnswers: {
      type: string;
      variables: string;
      varTypes: string;
    };
    correctAnswers: {
      type: string;
      variables: string;
      varTypes: string;
    };
    score: number;
  }>>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    correct: number;
    points: number;
    feedback: { category: string; isCorrect: boolean; userAnswer: string; correctAnswer: string }[];
  } | null>(null);
  const [tooltipImage, setTooltipImage] = useState<{ src: string; x: number; y: number } | null>(null);

  // Options for each category
  const [shuffledOptions, setShuffledOptions] = useState({
    type: getFourOptions(challenges[0].correctAnswers.type, allVisualizations),
    variables: shuffleArray(["Univariate", "Bivariate"]),
    varTypes: shuffleArray(["Categorical", "Quantitative", "Both"])
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameEnded) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameEnded(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameEnded]);

  const handleStart = () => {
    const shuffledChallenges = shuffleArray(allChallenges);
    setChallenges(shuffledChallenges);
    setShuffledOptions({
      type: getFourOptions(shuffledChallenges[0].correctAnswers.type, allVisualizations),
      variables: shuffleArray(["Univariate", "Bivariate"]),
      varTypes: shuffleArray(["Categorical", "Quantitative", "Both"])
    });
    setGameStarted(true);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setAnsweredQuestions(0);
  };

  const handleSelect = (category: string, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = () => {
    const challenge = challenges[currentChallenge];
    let correct = 0;
    const feedback = [];
    
    // Check type
    const typeCorrect = selectedAnswers.type === challenge.correctAnswers.type;
    if (typeCorrect) correct++;
    feedback.push({
      category: 'Type',
      isCorrect: typeCorrect,
      userAnswer: selectedAnswers.type,
      correctAnswer: challenge.correctAnswers.type
    });

    // Check variables
    const variablesCorrect = selectedAnswers.variables === challenge.correctAnswers.variables;
    if (variablesCorrect) correct++;
    feedback.push({
      category: 'Variables',
      isCorrect: variablesCorrect,
      userAnswer: selectedAnswers.variables,
      correctAnswer: challenge.correctAnswers.variables
    });

    // Check varTypes
    const varTypesCorrect = selectedAnswers.varTypes === challenge.correctAnswers.varTypes;
    if (varTypesCorrect) correct++;
    feedback.push({
      category: 'Variable Types',
      isCorrect: varTypesCorrect,
      userAnswer: selectedAnswers.varTypes,
      correctAnswer: challenge.correctAnswers.varTypes
    });

    const points = correct * 10;
    setScore(prev => prev + points);
    setAnsweredQuestions(prev => prev + 1);
    
    if (correct === 3) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Save answer history
    setAnswerHistory(prev => [...prev, {
      visualization: challenge.type,
      userAnswers: { ...selectedAnswers },
      correctAnswers: { ...challenge.correctAnswers },
      score: points
    }]);

    // Show feedback with data
    setFeedbackData({ correct, points, feedback });
    setShowFeedback(true);

    // Auto-hide feedback and move to next question after 3 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackData(null);
      // Move to next challenge and update options
      const nextIndex = (currentChallenge + 1) % challenges.length;
      setCurrentChallenge(nextIndex);
      setShuffledOptions({
        type: getFourOptions(challenges[nextIndex].correctAnswers.type, allVisualizations),
        variables: shuffleArray(["Univariate", "Bivariate"]),
        varTypes: shuffleArray(["Categorical", "Quantitative", "Both"])
      });
      setSelectedAnswers({ type: '', variables: '', varTypes: '' });
    }, 3000);
  };

  const handleVisualHover = (event: React.MouseEvent, imageSrc: string) => {
    setTooltipImage({
      src: imageSrc,
      x: 0,
      y: 0
    });
  };

  const handleVisualLeave = () => {
    setTooltipImage(null);
  };

  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Normalized Transitions - Top: Back to parent chapter */}
          <div className="mb-8">
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933] flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Associations
            </Link>
          </div>

          {/* Title Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#e7e7e7] rounded-lg p-4">
                <span role="img" aria-label="visual id challenge" className="text-4xl">🎯</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#58595b]">Visual ID Challenge</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Test your knowledge of data visualizations! Identify chart types, variables, and characteristics to earn points and climb the leaderboard.
                </p>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Your Results</h2>
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
                  {answeredQuestions > 0 ? Math.round((score / (answeredQuestions * 30)) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            {/* Answer History */}
            <h3 className="text-xl font-bold text-[#58595b] mb-4">Answer History</h3>
            <div className="space-y-6">
              {answerHistory.map((answer, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-4"
                  onMouseEnter={(e) => handleVisualHover(e, `/images/viz-${allChallenges.find(c => c.type === answer.visualization)?.id}.svg`)}
                  onMouseLeave={handleVisualLeave}
                >
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                      <h4 className="font-bold text-lg text-[#58595b] cursor-help">{answer.visualization}</h4>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <div className="text-sm text-gray-600">Type</div>
                          <div className={answer.userAnswers.type === answer.correctAnswers.type ? 'text-green-600' : 'text-red-600'}>
                            {answer.userAnswers.type}
                          </div>
                          {answer.userAnswers.type !== answer.correctAnswers.type && (
                            <div className="text-green-600 text-sm">→ {answer.correctAnswers.type}</div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Variables</div>
                          <div className={answer.userAnswers.variables === answer.correctAnswers.variables ? 'text-green-600' : 'text-red-600'}>
                            {answer.userAnswers.variables}
                          </div>
                          {answer.userAnswers.variables !== answer.correctAnswers.variables && (
                            <div className="text-green-600 text-sm">→ {answer.correctAnswers.variables}</div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Variable Types</div>
                          <div className={answer.userAnswers.varTypes === answer.correctAnswers.varTypes ? 'text-green-600' : 'text-red-600'}>
                            {answer.userAnswers.varTypes}
                          </div>
                          {answer.userAnswers.varTypes !== answer.correctAnswers.varTypes && (
                            <div className="text-green-600 text-sm">→ {answer.correctAnswers.varTypes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#58595b]">{answer.score}/30</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {tooltipImage && (
              <div className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-[280px] h-[280px]">
                <Image
                  src={tooltipImage.src}
                  alt="Visualization Preview"
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}

            <button 
              onClick={handleStart}
              className="utk-button text-lg px-8 py-4 mt-8"
            >
              Play Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="mb-8">
          <Link 
            href="/chapters/2"
            className="text-[#ff8200] hover:text-[#ff9933] transition-colors"
          >
            ← Back to Chapter
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-[#ff8200] to-orange-600 rounded-lg p-4">
              <span role="img" aria-label="visual id challenge" className="text-4xl text-white">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Visual ID Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Test your knowledge of data visualizations! Identify chart types, variables, and characteristics to earn points and climb the leaderboard.
              </p>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {!gameStarted && (
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">How to Play</h2>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• You'll be shown different statistical visualizations</li>
                <li>• Identify the type of chart, number of variables, and variable types</li>
                <li>• Score points for correct answers and build your streak</li>
                <li>• Complete as many challenges as you can in 1 minute</li>
              </ul>
              <button
                onClick={handleStart}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {gameStarted && !gameEnded && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Game Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-[#58595b]">Current Challenge</h2>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">Time: <span className="font-bold">{timeLeft}s</span></div>
                        <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
                        <div className="text-sm text-gray-600">Streak: <span className="font-bold">{streak}</span></div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Identify the type of visualization and its characteristics.
                    </p>
                  </div>

                  {/* Visualization Display */}
                  <div className="mb-8">
                    <div className="relative h-96 bg-white rounded-lg mb-6 overflow-hidden">
                      <Image
                        src={challenges[currentChallenge].image}
                        alt="Statistical Visualization"
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>

                    {/* Question Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#58595b] mb-2">
                          What type of visualization is this?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {shuffledOptions.type.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleSelect('type', type)}
                              className={`utk-button-outline ${
                                selectedAnswers.type === type ? 'bg-[#58595b] text-white hover:text-white' : ''
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#58595b] mb-2">
                          How many variables are depicted?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {shuffledOptions.variables.map((vars) => (
                            <button
                              key={vars}
                              onClick={() => handleSelect('variables', vars)}
                              className={`utk-button-outline ${
                                selectedAnswers.variables === vars ? 'bg-[#58595b] text-white hover:text-white' : ''
                              }`}
                            >
                              {vars}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#58595b] mb-2">
                          What types of variables are involved?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {shuffledOptions.varTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleSelect('varTypes', type)}
                              className={`utk-button-outline ${
                                selectedAnswers.varTypes === type ? 'bg-[#58595b] text-white hover:text-white' : ''
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <button className="utk-button-outline">
                      Get Hint
                    </button>
                    <button 
                      className="utk-button"
                      onClick={handleSubmit}
                      disabled={!selectedAnswers.type || !selectedAnswers.variables || !selectedAnswers.varTypes}
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>

              {/* Game Info Panel */}
              <div className="space-y-6">
                {/* Timer */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#58595b] mb-4">Time Remaining</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-[#ff8200] h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${(timeLeft / 60) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#58595b] mb-4">Quick Tips</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#ff8200] rounded-full mr-2 mt-2"></span>
                      Look for the relationship between axes and data points
                    </li>
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#ff8200] rounded-full mr-2 mt-2"></span>
                      Consider how the data is distributed
                    </li>
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#ff8200] rounded-full mr-2 mt-2"></span>
                      Pay attention to the scale and units on each axis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {gameEnded && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Your Results</h2>
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
                    {answeredQuestions > 0 ? Math.round((score / (answeredQuestions * 30)) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>

              {/* Answer History */}
              <h3 className="text-xl font-bold text-[#58595b] mb-4">Answer History</h3>
              <div className="space-y-6">
                {answerHistory.map((answer, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-4"
                    onMouseEnter={(e) => handleVisualHover(e, `/images/viz-${allChallenges.find(c => c.type === answer.visualization)?.id}.svg`)}
                    onMouseLeave={handleVisualLeave}
                  >
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                      <div>
                        <h4 className="font-bold text-lg text-[#58595b] cursor-help">{answer.visualization}</h4>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <div className="text-sm text-gray-600">Type</div>
                            <div className={answer.userAnswers.type === answer.correctAnswers.type ? 'text-green-600' : 'text-red-600'}>
                              {answer.userAnswers.type}
                            </div>
                            {answer.userAnswers.type !== answer.correctAnswers.type && (
                              <div className="text-green-600 text-sm">→ {answer.correctAnswers.type}</div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Variables</div>
                            <div className={answer.userAnswers.variables === answer.correctAnswers.variables ? 'text-green-600' : 'text-red-600'}>
                              {answer.userAnswers.variables}
                            </div>
                            {answer.userAnswers.variables !== answer.correctAnswers.variables && (
                              <div className="text-green-600 text-sm">→ {answer.correctAnswers.variables}</div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Variable Types</div>
                            <div className={answer.userAnswers.varTypes === answer.correctAnswers.varTypes ? 'text-green-600' : 'text-red-600'}>
                              {answer.userAnswers.varTypes}
                            </div>
                            {answer.userAnswers.varTypes !== answer.correctAnswers.varTypes && (
                              <div className="text-green-600 text-sm">→ {answer.correctAnswers.varTypes}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#58595b]">{answer.score}/30</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tooltip */}
              {tooltipImage && (
                <div className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-[280px] h-[280px]">
                  <Image
                    src={tooltipImage.src}
                    alt="Visualization Preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}

              <button 
                onClick={handleStart}
                className="utk-button text-lg px-8 py-4 mt-8"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Normalized Transitions - Bottom: Previous/Next navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div className="flex-1">
            <Link
              href="/chapters/2/categorical-categorical"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          </div>
          
          <div className="flex-1 text-right">
            <Link
              href="/chapters/2"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center justify-end group"
            >
              Next
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedback && feedbackData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {feedbackData.correct === 3 ? '🎉' : feedbackData.correct > 0 ? '👍' : '😢'}
              </div>
              <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                {feedbackData.correct === 3 ? 'Perfect!' : feedbackData.correct > 0 ? 'Good Try!' : 'Keep Learning!'}
              </h3>
              <p className="text-gray-600">
                You scored {feedbackData.points} points
                {feedbackData.correct === 3 && ' and increased your streak!'}
              </p>
            </div>

            <div className="space-y-4">
              {feedbackData.feedback.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${item.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {item.userAnswer}
                    </span>
                    {!item.isCorrect && (
                      <span className="text-green-600 ml-2">
                        → {item.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">Next question in 3 seconds...</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 