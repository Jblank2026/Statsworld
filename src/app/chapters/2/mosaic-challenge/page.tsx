"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface Challenge {
  id: number;
  title: string;
  task: string;
  image: string;
  correctAnswer: string;
  displayAnswer: string;
  explanation: string;
  hint: string;
  isSignificanceQuestion?: boolean;
  significanceAnswer?: boolean;
}

interface DataDictionaryEntry {
  name: string;
  description: string;
  type: string;
  values: string;
}

export default function MosaicChallenge() {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: string; message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [currentChallengeId, setCurrentChallengeId] = useState(1);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDataDictionary, setShowDataDictionary] = useState(false);
  const [significanceAnswer, setSignificanceAnswer] = useState<boolean | null>(null);

  const dataDictionary: DataDictionaryEntry[] = [
    {
      name: "Survived",
      description: "Survival status of the passenger",
      type: "Categorical",
      values: "0 = Did not survive, 1 = Survived"
    },
    {
      name: "Pclass",
      description: "Passenger class (1st, 2nd, or 3rd class)",
      type: "Categorical",
      values: "1 = First class, 2 = Second class, 3 = Third class"
    },
    {
      name: "Sex",
      description: "Gender of the passenger",
      type: "Categorical",
      values: "male, female"
    },
    {
      name: "Age",
      description: "Age of the passenger (in years)",
      type: "Numeric",
      values: "Numeric value (e.g., 22, 24.5, 18)"
    },
    {
      name: "SibSp",
      description: "Number of siblings/spouses aboard",
      type: "Numeric",
      values: "Integer values (0, 1, 2, ...)"
    },
    {
      name: "Parch",
      description: "Number of parents/children aboard",
      type: "Numeric",
      values: "Integer values (0, 1, 2, ...)"
    },
    {
      name: "Embarked",
      description: "Port of embarkation",
      type: "Categorical",
      values: "C = Cherbourg, Q = Queenstown, S = Southampton"
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Survival by Sex",
      task: "Write the mosaic plot code to visualize the relationship between Survival and Sex variables from the Titanic dataset, with Survival on the y-axis.",
      image: "/images/m1.png",
      correctAnswer: "mosaic(Survived ~ Sex, data = titanic_train)",
      displayAnswer: "mosaic(Survived ~ Sex, data = titanic_train)",
      explanation: "This mosaic plot shows the relationship between survival rates and passenger sex. The formula Survived ~ Sex places Survived on the y-axis and Sex on the x-axis.",
      hint: "Use the formula syntax: dependent ~ independent, with Survived as the dependent variable"
    },
    {
      id: 2,
      title: "Sex by Survival",
      task: "Write the mosaic plot code to visualize the relationship between Sex and Survival variables, with Sex on the y-axis.",
      image: "/images/m2.png",
      correctAnswer: "mosaic(Sex ~ Survived, data = titanic_train)",
      displayAnswer: "mosaic(Sex ~ Survived, data = titanic_train)",
      explanation: "This mosaic plot shows the same variables but with Sex on the y-axis, giving a different perspective on the relationship.",
      hint: "Switch the order of variables from the previous plot to put Sex on the y-axis"
    },
    {
      id: 3,
      title: "Another Survival Analysis",
      task: "Create another mosaic plot showing Survival by Sex, matching the visualization shown.",
      image: "/images/m3.png",
      correctAnswer: "mosaic(Survived ~ Sex, data = titanic_train)",
      displayAnswer: "mosaic(Survived ~ Sex, data = titanic_train)",
      explanation: "This is another view of survival rates by sex, demonstrating how the same code can be used to create similar visualizations.",
      hint: "This plot uses the same formula as Challenge 1"
    },
    {
      id: 4,
      title: "Port of Embarkation by Class",
      task: "Write the mosaic plot code to show the relationship between passenger class and port of embarkation.",
      image: "/images/m4.png",
      correctAnswer: "mosaic(Embarked ~ Pclass, data = titanic_train)",
      displayAnswer: "mosaic(Embarked ~ Pclass, data = titanic_train)",
      explanation: "This mosaic plot reveals patterns between where passengers embarked and their passenger class.",
      hint: "Use Embarked as the dependent variable and Pclass as the independent variable"
    },
    {
      id: 5,
      title: "Association: Sex and Survival",
      task: "Use the associate function to analyze the relationship between passenger sex and survival status.",
      image: "/images/m1.png",
      correctAnswer: "associate(Sex ~ Survived, data = titanic_train)",
      displayAnswer: "associate(Sex ~ Survived, data = titanic_train)",
      explanation: "The associate function from regclass helps us analyze the relationship between Sex and Survival. The order of variables affects how the results are presented.",
      hint: "Use the formula syntax: Sex ~ Survived with the associate function"
    },
    {
      id: 6,
      title: "Association: Survival by Sex",
      task: "Write the associate function code to analyze survival rates based on passenger sex.",
      image: "/images/m2.png",
      correctAnswer: "associate(Survived ~ Sex, data = titanic_train)",
      displayAnswer: "associate(Survived ~ Sex, data = titanic_train)",
      explanation: "By switching the order of variables, we can examine how survival rates differ between male and female passengers.",
      hint: "Switch the order from the previous question to put Survived as the dependent variable"
    },
    {
      id: 7,
      title: "Association: Class and Port",
      task: "Use the associate function to analyze the relationship between passenger class and port of embarkation.",
      image: "/images/m4.png",
      correctAnswer: "associate(Pclass ~ Embarked, data = titanic_train)",
      displayAnswer: "associate(Pclass ~ Embarked, data = titanic_train)",
      explanation: "This analysis reveals patterns between passenger class and their port of embarkation, helping us understand if certain ports had more passengers of particular classes.",
      hint: "Use Pclass and Embarked variables in the associate function"
    },
    {
      id: 8,
      title: "Association: Port by Class",
      task: "Write the associate function code to analyze embarkation patterns across different passenger classes.",
      image: "/images/m4.png",
      correctAnswer: "associate(Embarked ~ Pclass, data = titanic_train)",
      displayAnswer: "associate(Embarked ~ Pclass, data = titanic_train)",
      explanation: "By analyzing embarkation patterns by class, we can see if certain ports were more common for specific passenger classes.",
      hint: "Switch the order from the previous question to examine embarkation patterns by class"
    },
    {
      id: 9,
      title: "Testing Association Significance",
      task: "Based on the associate function output shown in the image, is there a significant relationship between Sex and Survival? (p < 0.05)",
      image: "/images/m5.png",
      correctAnswer: "Yes",
      displayAnswer: "Yes - The chi-square test shows a p-value less than 0.05, indicating a significant relationship.",
      explanation: "The chi-square test of independence shows a significant relationship between Sex and Survival (p < 0.05). This means the survival rates were significantly different between male and female passengers.",
      hint: "Look at the p-value in the chi-square test output. If p < 0.05, the relationship is significant.",
      isSignificanceQuestion: true,
      significanceAnswer: true
    }
  ];

  const currentChallenge = challenges.find(c => c.id === currentChallengeId) || challenges[0];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });

    fire(0.2, {
      spread: 60
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
      startVelocity: 45
    });
  };

  const checkAnswer = async () => {
    if (isLoading) return;
    
    if (currentChallenge.isSignificanceQuestion) {
      const isCorrect = significanceAnswer === currentChallenge.significanceAnswer;
      
      if (isCorrect) {
        setIsLoading(true);
        setFeedback({ type: "success", message: currentChallenge.explanation });
        if (!completedChallenges.includes(currentChallenge.id)) {
          const newCompletedChallenges = [...completedChallenges, currentChallenge.id];
          setCompletedChallenges(newCompletedChallenges);
          if (newCompletedChallenges.length === challenges.length) {
            setShowCompletionModal(true);
            triggerConfetti();
          }
        }
        setWrongAttempts(0);
        setTimeout(() => {
          setIsLoading(false);
          if (currentChallengeId < challenges.length) {
            setCurrentChallengeId(currentChallengeId + 1);
            setSignificanceAnswer(null);
            setFeedback(null);
            setShowHint(false);
            setShowAnswer(false);
          }
        }, 2000);
      } else {
        setFeedback({ type: "error", message: "Try again! Check the p-value carefully." });
        setWrongAttempts(prev => prev + 1);
      }
      return;
    }
    
    const normalizedUserAnswer = answer
      .replace(/[\s\n\r]+/g, '')
      .toLowerCase();
    
    const normalizedCorrectAnswer = currentChallenge.correctAnswer
      .replace(/[\s\n\r]+/g, '')
      .toLowerCase();

    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    if (isCorrect) {
      setIsLoading(true);
      setFeedback({ type: "success", message: currentChallenge.explanation });
      if (!completedChallenges.includes(currentChallenge.id)) {
        const newCompletedChallenges = [...completedChallenges, currentChallenge.id];
        setCompletedChallenges(newCompletedChallenges);
        if (newCompletedChallenges.length === challenges.length) {
          setShowCompletionModal(true);
          triggerConfetti();
        }
      }
      setWrongAttempts(0);
      setTimeout(() => {
        setIsLoading(false);
        if (currentChallengeId < challenges.length) {
          setCurrentChallengeId(currentChallengeId + 1);
          setAnswer('');
          setFeedback(null);
          setShowHint(false);
          setShowAnswer(false);
        }
      }, 2000);
    } else {
      setFeedback({ type: "error", message: "Try again! Check your syntax carefully." });
      setWrongAttempts(prev => prev + 1);
    }
  };

  const jumpToQuestion = (challengeId: number) => {
    setCurrentChallengeId(challengeId);
    setAnswer('');
    setFeedback(null);
    setWrongAttempts(0);
    setIsMenuOpen(false);
    setShowHint(false);
    setShowAnswer(false);
  };

  const restartGame = () => {
    setCompletedChallenges([]);
    setCurrentChallengeId(1);
    setAnswer('');
    setFeedback(null);
    setWrongAttempts(0);
    setShowCompletionModal(false);
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation and Menu */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4">
            <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Associations
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/games" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Games
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {/* Game Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="game" className="text-4xl">🎨</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Mosaic Plot Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Match the R code to create these mosaic plots!
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-2">
            <div 
              className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
              style={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
            />
          </div>
          <p className="text-gray-600 text-sm mb-8">
            Challenge {currentChallenge.id} of {challenges.length}
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Completed: {completedChallenges.length} challenges
          </p>

          {/* Challenge */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">
              {currentChallenge.task}
            </h2>
            <div className="relative h-64 mb-6">
              <Image
                src={currentChallenge.image}
                alt="Mosaic Plot"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-4">
            {currentChallenge.isSignificanceQuestion ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setSignificanceAnswer(true)}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      significanceAnswer === true
                        ? 'bg-[#ff8200] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={isLoading}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setSignificanceAnswer(false)}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      significanceAnswer === false
                        ? 'bg-[#ff8200] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={isLoading}
                  >
                    No
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={checkAnswer}
                    disabled={isLoading || significanceAnswer === null}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                      isLoading || significanceAnswer === null
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#ff8200] hover:bg-[#ff9933]'
                    }`}
                  >
                    {isLoading ? "Loading..." : "Check"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => !isLoading && setAnswer(e.target.value)}
                  placeholder="Type your R code here..."
                  rows={3}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8200] font-mono text-sm resize-none ${
                    isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                  disabled={isLoading}
                />

                <div className="flex justify-between items-center">
                  <button
                    onClick={checkAnswer}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#ff8200] hover:bg-[#ff9933]'
                    }`}
                  >
                    {isLoading ? "Loading..." : "Check"}
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-[#ff8200] hover:text-[#ff9933]"
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                    <button
                      onClick={() => setShowDataDictionary(true)}
                      className="text-[#ff8200] hover:text-[#ff9933] flex items-center gap-2"
                    >
                      <span>📚</span>
                      Data Dictionary
                    </button>
                  </div>
                </div>

                {/* Hint Display */}
                {showHint && (
                  <div className="mt-4 p-4 bg-[#fff4e6] rounded-lg">
                    <p className="text-gray-700">{currentChallenge.hint}</p>
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
                    <p className="text-gray-700 mb-2">Here's the correct code:</p>
                    <pre className="font-mono text-sm bg-gray-100 p-2 rounded">
                      {currentChallenge.displayAnswer}
                    </pre>
                  </div>
                )}
              </>
            )}

            {/* Feedback */}
            {feedback && (
              <div
                className={`p-4 rounded-lg mt-4 ${
                  feedback.type === "success" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#58595b]">Challenges</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {challenges.map(challenge => (
                <button
                  key={challenge.id}
                  onClick={() => jumpToQuestion(challenge.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    completedChallenges.includes(challenge.id)
                      ? 'bg-green-100 text-green-800'
                      : currentChallengeId === challenge.id
                      ? 'bg-[#ff8200] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {challenge.id}. {challenge.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                You've mastered mosaic plots in R! Ready for another round?
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

      {/* Data Dictionary Modal */}
      {showDataDictionary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#58595b]">
                Titanic Dataset Dictionary
              </h2>
              <button
                onClick={() => setShowDataDictionary(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                Reference this dictionary to understand the variables used in the Titanic dataset for creating mosaic plots.
              </p>
              <div className="grid gap-4">
                {dataDictionary.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <h3 className="font-bold text-[#ff8200] mb-2">
                      {entry.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Description</p>
                        <p className="text-gray-700">{entry.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Type</p>
                        <p className="text-gray-700">{entry.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Possible Values</p>
                        <p className="text-gray-700">{entry.values}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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