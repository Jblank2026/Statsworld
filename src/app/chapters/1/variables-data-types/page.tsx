"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface VariableChallenge {
  id: number;
  context: string;
  variable: string;
  description: string;
  examples: string[];
  correctType: string;
  explanation: string;
  commonMistake?: string;
}

export default function VariablesDataTypes() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const challenges: VariableChallenge[] = [
    {
      id: 1,
      context: "Student Survey",
      variable: "Favorite Season",
      description: "Students are asked to choose their favorite season from a list of options.",
      examples: ["Spring", "Summer", "Fall", "Winter"],
      correctType: "Categorical - Nominal",
      explanation: "Seasons are categories with no natural order. Spring isn't 'greater than' or 'better than' winter - they're just different categories with no meaningful ranking.",
      commonMistake: "Some might think there's an order based on temperature or calendar, but statistically these are just labels with no inherent hierarchy."
    },
    {
      id: 2,
      context: "Course Evaluation",
      variable: "Satisfaction Rating",
      description: "Students rate their course satisfaction on a scale from Very Dissatisfied to Very Satisfied.",
      examples: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"],
      correctType: "Categorical - Ordinal",
      explanation: "These ratings have a clear order from worst to best satisfaction. 'Very Satisfied' is definitely better than 'Dissatisfied', creating a meaningful hierarchy.",
      commonMistake: "These are still categories (not numbers), but unlike nominal data, they have a clear ranking order."
    },
    {
      id: 3,
      context: "Sports Analytics",
      variable: "Number of Goals Scored",
      description: "Recording how many goals a soccer player scores in each game.",
      examples: ["0", "1", "2", "3", "4"],
      correctType: "Quantitative - Discrete",
      explanation: "Goals are countable whole numbers. You can't score 2.5 goals! Discrete quantitative data involves counting separate, distinct items.",
      commonMistake: "Remember: discrete = countable individual items, continuous = measurable on a scale."
    },
    {
      id: 4,
      context: "Health Study",
      variable: "Body Weight",
      description: "Measuring participants' weight in pounds during a fitness program.",
      examples: ["145.2 lbs", "178.7 lbs", "160.0 lbs", "192.3 lbs"],
      correctType: "Quantitative - Continuous",
      explanation: "Weight can be measured to any level of precision (145.2, 145.23, 145.234 lbs). It's continuous because it can take any value within a range.",
      commonMistake: "Even though we round to one decimal place, weight is inherently continuous - the rounding is just for practical measurement."
    },
    {
      id: 5,
      context: "University Database",
      variable: "Student ID Number",
      description: "Unique identification numbers assigned to each student at registration.",
      examples: ["UT12345", "UT67890", "UT11111", "UT54321"],
      correctType: "Identifier",
      explanation: "Student IDs are unique labels that never repeat. They don't represent quantities or categories - they're just unique identifiers for each person.",
      commonMistake: "Even though they contain numbers, IDs aren't quantitative. You can't meaningfully add or average them."
    },
    {
      id: 6,
      context: "Medical Research",
      variable: "Blood Type",
      description: "Recording patients' blood types for a medical study.",
      examples: ["A", "B", "AB", "O"],
      correctType: "Categorical - Nominal",
      explanation: "Blood types are distinct categories with no natural ordering. Type A isn't 'better' or 'higher' than Type B - they're just different categories.",
      commonMistake: "Letters might suggest an order (A, B, AB), but medically there's no hierarchy among blood types."
    },
    {
      id: 7,
      context: "Academic Records",
      variable: "Letter Grade",
      description: "Final letter grades assigned in a statistics course.",
      examples: ["A", "B", "C", "D", "F"],
      correctType: "Categorical - Ordinal",
      explanation: "Letter grades have a clear academic hierarchy. An 'A' represents better performance than a 'B', which is better than a 'C', creating a meaningful order.",
      commonMistake: "These are categories (letters), not numbers, but they have a clear ranking based on academic achievement."
    },
    {
      id: 8,
      context: "Time Tracking",
      variable: "Response Time",
      description: "Measuring how long it takes users to complete a task on a website (in seconds).",
      examples: ["2.34 sec", "5.67 sec", "1.89 sec", "8.12 sec"],
      correctType: "Quantitative - Continuous",
      explanation: "Time can be measured with increasing precision (seconds, milliseconds, microseconds). It's continuous because it flows seamlessly and can take any value within a range.",
      commonMistake: "Even if we only measure to 2 decimal places, time is inherently continuous."
    },
    {
      id: 9,
      context: "Social Media",
      variable: "Number of Likes",
      description: "Counting the number of likes on social media posts.",
      examples: ["15", "203", "1,247", "56"],
      correctType: "Quantitative - Discrete",
      explanation: "Likes are countable individual actions. You get exactly 15 likes, not 15.3 likes. Discrete data involves counting distinct, separate items.",
      commonMistake: "Large numbers might seem continuous, but likes are still individual, countable events."
    },
    {
      id: 10,
      context: "Customer Survey",
      variable: "Income Level",
      description: "Customers select their income bracket from predefined ranges.",
      examples: ["Under $25k", "$25k-$50k", "$50k-$75k", "$75k-$100k", "Over $100k"],
      correctType: "Categorical - Ordinal",
      explanation: "These income brackets are categories with a clear order from lowest to highest earning potential. Higher categories represent greater income levels.",
      commonMistake: "Even though these represent numerical ranges, they're presented as ordered categories rather than exact measurements."
    }
  ];

  const variableTypes = [
    "Categorical - Nominal",
    "Categorical - Ordinal", 
    "Quantitative - Discrete",
    "Quantitative - Continuous",
    "Identifier"
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
    const isCorrect = selectedAnswer === challenge.correctType;
    
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
                <span role="img" aria-label="variables and data types" className="text-4xl">🏷️</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Variables & Data Types</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Master the different types of variables and learn how to classify data effectively!
                </p>
              </div>
            </div>
          </div>

          {/* Learning Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">Types of Variables</h2>
            
            <div className="space-y-6">
              {/* Categorical Variables */}
              <div className="border-l-4 border-[#ff8200] pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-3">🏷️ Categorical (Qualitative)</h3>
                <p className="text-gray-600 mb-4">Variables that represent groupings or categories, not numbers.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-700 mb-2">📝 Nominal</h4>
                    <p className="text-sm text-gray-600 mb-2">Categories with no inherent order</p>
                    <p className="text-xs text-gray-500">Examples: Favorite color, eye color, brand preference</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-700 mb-2">📊 Ordinal</h4>
                    <p className="text-sm text-gray-600 mb-2">Categories with meaningful order</p>
                    <p className="text-xs text-gray-500">Examples: Satisfaction ratings, education levels, class rank</p>
                  </div>
                </div>
              </div>

              {/* Quantitative Variables */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-3">📊 Quantitative (Numeric)</h3>
                <p className="text-gray-600 mb-4">Variables where values must be numbers that represent amounts or quantities.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">🔢 Discrete</h4>
                    <p className="text-sm text-gray-600 mb-2">Countable whole numbers</p>
                    <p className="text-xs text-gray-500">Examples: Number of pets, goals scored, students in class</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">📏 Continuous</h4>
                    <p className="text-sm text-gray-600 mb-2">Measurable values on a scale</p>
                    <p className="text-xs text-gray-500">Examples: Height, weight, time, temperature</p>
                  </div>
                </div>
              </div>

              {/* Identifier Variables */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-3">🔑 Identifier</h3>
                <p className="text-gray-600 mb-4">Unique labels that never repeat, used for identification only.</p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Used to uniquely identify each observation</p>
                  <p className="text-xs text-gray-500">Examples: Student ID, Social Security Number, License Plate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎲 What is Simulation?</h2>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-3">Mimicking Reality with Random Numbers</h3>
              <p className="text-gray-600 mb-4">
                Simulation uses random numbers to represent outcomes of real events. It's like creating a virtual version 
                of reality to test "what if" scenarios without real-world consequences.
              </p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-700 mb-2">🎯 Example</h4>
                <p className="text-sm text-gray-600">
                  Instead of flipping a coin 1000 times, we can simulate it by generating random numbers: 
                  if the number is 0.5 or higher, it's "heads"; if lower, it's "tails". This helps us understand 
                  probability patterns without physical coin flipping!
                </p>
              </div>
            </div>
          </div>

          {/* Game Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Variable Type Detective Challenge</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Read the variable description and context</li>
                  <li>• Look at the example values provided</li>
                  <li>• Classify the variable type correctly</li>
                  <li>• Learn from detailed explanations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Tips for Success</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Ask: "Can I order these meaningfully?"</li>
                  <li>• Ask: "Can I do math with these numbers?"</li>
                  <li>• Ask: "Is this just a unique label?"</li>
                  <li>• Consider the context and examples</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
              >
                Start Detective Challenge
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
              ← Back to Introduction to Statistics
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 8 ? '🎉' : score >= 6 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 8 ? 'Variable Type Master!' : score >= 6 ? 'Great Progress!' : 'Keep Practicing!'}
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
                <div className="text-sm text-gray-600">Accuracy</div>
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
                href="/chapters/1"
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

  const currentChallengeData = challenges[currentChallenge];

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
              <h1 className="text-2xl font-bold text-[#58595b]">Variable Type Detective</h1>
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
            <h2 className="text-xl font-semibold text-[#58595b] mb-4">
              🔍 {currentChallengeData.context}
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold text-gray-700">Variable:</span>
                  <p className="text-lg font-medium text-[#58595b]">{currentChallengeData.variable}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Context:</span>
                  <p className="text-gray-600">{currentChallengeData.context}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Description:</span>
                <p className="text-gray-600">{currentChallengeData.description}</p>
              </div>
              
              <div>
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
            
            <div className="border-l-4 border-[#ff8200] pl-4">
              <p className="font-medium text-[#58595b]">What type of variable is this?</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {variableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedAnswer(type)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedAnswer === type
                    ? 'border-[#ff8200] bg-[#fff4e6]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{type}</span>
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
                  {selectedAnswer === currentChallengeData.correctType ? '✅' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                  {selectedAnswer === currentChallengeData.correctType ? 'Correct!' : 'Not Quite'}
                </h3>
                <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Correct Answer: {currentChallengeData.correctType}
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#58595b] mb-2">📚 Explanation</h4>
                  <p className="text-gray-700 text-sm">{currentChallengeData.explanation}</p>
                </div>
                
                {currentChallengeData.commonMistake && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Common Mistake</h4>
                    <p className="text-yellow-700 text-sm">{currentChallengeData.commonMistake}</p>
                  </div>
                )}
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
