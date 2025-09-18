"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface NormalExample {
  name: string;
  context: string;
  mean: number;
  standardDeviation: number;
  unit: string;
  realWorldInfo: string;
  whyNormal: string;
}

interface Challenge {
  id: number;
  questionType: 'identify' | 'properties' | 'apply' | 'compare';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function NormalBasics() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: NormalExample[] = [
    {
      name: "Human Heights",
      context: "Adult male heights in the US",
      mean: 70,
      standardDeviation: 3,
      unit: "inches",
      realWorldInfo: "Most men are close to average height (70\"), with fewer very tall or very short individuals.",
      whyNormal: "Heights result from many small genetic and environmental factors adding up - perfect for normal distribution!"
    },
    {
      name: "IQ Scores",
      context: "Standardized intelligence test scores",
      mean: 100,
      standardDeviation: 15,
      unit: "points",
      realWorldInfo: "By design, IQ tests are standardized so the average score is 100 with most people scoring between 85-115.",
      whyNormal: "Intelligence measures are designed to follow normal distribution, making comparisons meaningful across populations."
    },
    {
      name: "Test Scores",
      context: "Final exam scores in statistics class",
      mean: 82,
      standardDeviation: 8,
      unit: "points",
      realWorldInfo: "Most students score around 82%, with fewer getting very high or very low scores.",
      whyNormal: "When many students of similar ability take a well-designed test, scores naturally cluster around the class average."
    },
    {
      name: "Manufacturing Quality",
      context: "Bolt lengths from a precision machine",
      mean: 2.5,
      standardDeviation: 0.02,
      unit: "inches",
      realWorldInfo: "Machine produces bolts very close to 2.5\", with small random variations due to minor mechanical factors.",
      whyNormal: "Manufacturing processes with good quality control produce normally distributed measurements around the target value."
    },
    {
      name: "Reaction Times",
      context: "Response times in cognitive psychology experiment",
      mean: 450,
      standardDeviation: 75,
      unit: "milliseconds",
      realWorldInfo: "Most people respond around 450ms, with natural variation in cognitive processing speed.",
      whyNormal: "Biological processes involving many neural pathways tend to produce normally distributed response times."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      questionType: 'identify',
      question: "Looking at this normal distribution, what percentage of values fall within ONE standard deviation of the mean (the middle green section)?",
      options: [
        "About 34%",
        "About 68%",
        "About 95%",
        "About 99.7%"
      ],
      correctAnswer: "About 68%",
      explanation: "The green section in the middle represents μ ± 1σ (one standard deviation from the mean). According to the 68-95-99.7 rule, approximately 68% of all values in a normal distribution fall within this range.",
      skillFocus: "Reading and interpreting the empirical rule from a normal distribution diagram"
    },
    {
      id: 2,
      questionType: 'identify',
      question: "In this normal distribution diagram, what percentage of values fall within TWO standard deviations of the mean (green + purple sections combined)?",
      options: [
        "About 68%",
        "About 95%",
        "About 99.7%",
        "About 50%"
      ],
      correctAnswer: "About 95%",
      explanation: "The combined green and purple sections represent μ ± 2σ (within two standard deviations). The empirical rule tells us that approximately 95% of values fall within two standard deviations of the mean in any normal distribution.",
      skillFocus: "Understanding the cumulative percentages in the empirical rule"
    },
    {
      id: 3,
      questionType: 'identify',
      question: "Looking at this normal distribution, what percentage of values fall within THREE standard deviations of the mean?",
      options: [
        "About 68%",
        "About 95%", 
        "About 99.7%",
        "About 100%"
      ],
      correctAnswer: "About 99.7%",
      explanation: "All the colored sections together (green + purple + red) represent μ ± 3σ (within three standard deviations). The empirical rule shows that approximately 99.7% of values fall within three standard deviations of the mean.",
      skillFocus: "Recognizing the complete empirical rule coverage in normal distributions"
    },
    {
      id: 4,
      questionType: 'apply',
      question: "If test scores are normally distributed with mean 75 and standard deviation 10, approximately what percentage of students scored between 65 and 85?",
      options: [
        "About 34%",
        "About 68%",
        "About 95%",
        "About 99.7%"
      ],
      correctAnswer: "About 68%",
      explanation: "65 to 85 represents 75 ± 10, which is exactly one standard deviation from the mean (like the green section in the diagram). Using the empirical rule, approximately 68% of students scored in this range.",
      skillFocus: "Applying the empirical rule to real-world scenarios with specific values"
    },
    {
      id: 5,
      questionType: 'apply',
      question: "For heights that are normally distributed with mean 68 inches and standard deviation 3 inches, what percentage of people are between 62 and 74 inches tall?",
      options: [
        "About 68%",
        "About 95%",
        "About 99.7%",
        "About 50%"
      ],
      correctAnswer: "About 95%",
      explanation: "62 to 74 inches represents 68 ± 6, which is 68 ± (2×3) = μ ± 2σ. This matches the green + purple sections in the diagram. The empirical rule tells us approximately 95% of people fall within two standard deviations.",
      skillFocus: "Calculating standard deviation multiples and applying the empirical rule"
    }
  ];

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

  // Normal curve visualization helper
  const generateNormalCurve = (mean: number, sd: number, min: number, max: number) => {
    const points = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const x = min + (max - min) * (i / steps);
      const z = (x - mean) / sd;
      const y = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
      points.push({ x, y });
    }
    return points;
  };

  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Normal Distribution Master</h1>
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
              <h2 className="text-xl font-semibold text-[#58595b] mb-6 text-center">📊 Empirical Rule Challenge</h2>
              
              {/* Normal Distribution Image */}
              <div className="text-center mb-6">
                <Image
                  src="/images/normal.png"
                  alt="Normal Distribution showing 68-95-99.7 rule with colored regions"
                  width={500}
                  height={350}
                  className="mx-auto rounded-lg border border-gray-300"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Use this diagram to answer the question below
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="border-l-4 border-[#ff8200] pl-4">
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

            <div className="flex justify-end">
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
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent!' : 'Not Quite Right'}
                  </h3>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Explanation</h4>
                    <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">🎯 Skill Focus</h4>
                    <p className="text-green-600 text-sm">{currentChallengeData.skillFocus}</p>
                  </div>
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
            <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to The Normal Model
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 3 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Empirical Rule Expert!' : score >= 3 ? 'Great Work!' : 'Keep Learning!'}
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
                <div className="text-sm text-gray-600">Success Rate</div>
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
                href="/chapters/5"
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

  const selectedNormalExample = examples[selectedExample];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to The Normal Model
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="normal distribution" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Normal Distribution Basics</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the most important distribution in statistics! Learn why the bell curve appears everywhere in nature and science.
              </p>
            </div>
          </div>
        </div>


        {/* What Makes It Normal */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔔 What Makes a Distribution "Normal"?</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">The Magic of the Bell Curve</h3>
                  <p className="text-yellow-600">
                    The normal distribution is the most important pattern in statistics! It shows up everywhere because 
                    it naturally emerges when many small, random factors combine to influence an outcome.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">🔔 Bell-Shaped</h4>
                <p className="text-blue-600 text-sm">Symmetric curve that looks like a bell, with most values clustered around the center.</p>
              </div>

              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">⚖️ Perfectly Symmetric</h4>
                <p className="text-green-600 text-sm">The left and right sides are mirror images. Mean = Median = Mode.</p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">🎛️ Two Parameters</h4>
                <p className="text-purple-600 text-sm">Completely defined by just the mean (center) and standard deviation (spread).</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Famous 68-95-99.7 Rule Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📏 The 68-95-99.7 Rule (Preview)</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">In ANY Normal Distribution:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">~68%</div>
                  <div className="text-sm text-gray-600">within 1 standard deviation</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">~95%</div>
                  <div className="text-sm text-gray-600">within 2 standard deviations</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">~99.7%</div>
                  <div className="text-sm text-gray-600">within 3 standard deviations</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 italic">
                💡 This means virtually all values (99.7%) fall within 3 standard deviations of the mean!
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Normal Distributions in the Real World</h2>
          
          {/* Example Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedExample === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedNormalExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedNormalExample.context}</p>
            </div>

            {/* Distribution Parameters */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{selectedNormalExample.mean}</div>
                  <div className="text-sm text-gray-600">Mean (μ)</div>
                  <div className="text-xs text-gray-500">{selectedNormalExample.unit}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#58595b]">{selectedNormalExample.standardDeviation}</div>
                  <div className="text-sm text-gray-600">Std Dev (σ)</div>
                  <div className="text-xs text-gray-500">{selectedNormalExample.unit}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <div className="text-sm text-gray-600">Within</div>
                  <div className="text-xs text-gray-500">
                    {selectedNormalExample.mean - selectedNormalExample.standardDeviation} - {selectedNormalExample.mean + selectedNormalExample.standardDeviation}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Within</div>
                  <div className="text-xs text-gray-500">
                    {selectedNormalExample.mean - 2*selectedNormalExample.standardDeviation} - {selectedNormalExample.mean + 2*selectedNormalExample.standardDeviation}
                  </div>
                </div>
              </div>
            </div>

            {/* Normal Distribution Image */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h4 className="font-semibold text-gray-700 mb-4">📈 Bell Curve Visualization:</h4>
              <Image
                src="/images/normal.png"
                alt="Normal Distribution Bell Curve with percentages"
                width={500}
                height={350}
                className="mx-auto rounded-lg border border-gray-300"
              />
              <p className="text-gray-600 mt-3 text-sm">
                The normal distribution showing the classic bell shape with standard deviation regions.
              </p>
            </div>

            {/* Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🔍 Real-World Context</h4>
                <p className="text-blue-600 text-sm">{selectedNormalExample.realWorldInfo}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">🤔 Why It's Normal</h4>
                <p className="text-green-600 text-sm">{selectedNormalExample.whyNormal}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Empirical Rule Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use the normal distribution diagram to answer questions</li>
                <li>• Read percentages from the colored regions</li>
                <li>• Apply the 68-95-99.7 rule to real scenarios</li>
                <li>• Calculate standard deviation ranges</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reading empirical rule diagrams</li>
                <li>• Understanding the 68-95-99.7 percentages</li>
                <li>• Applying standard deviation ranges</li>
                <li>• Visual interpretation of normal distributions</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master the Empirical Rule
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
