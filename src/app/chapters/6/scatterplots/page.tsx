"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ScatterplotExample {
  name: string;
  context: string;
  xVariable: string;
  yVariable: string;
  xUnit: string;
  yUnit: string;
  data: Array<{ x: number; y: number }>;
  direction: 'positive' | 'negative' | 'none';
  strength: 'strong' | 'moderate' | 'weak';
  form: 'linear' | 'curved' | 'none';
  interpretation: string;
  practicalImplication: string;
}

interface Challenge {
  id: number;
  scenario: string;
  plotDescription: string;
  questionType: 'direction' | 'strength' | 'form' | 'interpretation';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function Scatterplots() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: ScatterplotExample[] = [
    {
      name: "Study Time vs Test Scores",
      context: "Students tracking study hours and exam performance",
      xVariable: "Study Hours",
      yVariable: "Test Score",
      xUnit: "hours",
      yUnit: "points",
      data: [
        { x: 2, y: 65 }, { x: 4, y: 72 }, { x: 6, y: 78 }, { x: 8, y: 85 },
        { x: 10, y: 90 }, { x: 3, y: 68 }, { x: 5, y: 75 }, { x: 7, y: 82 },
        { x: 9, y: 88 }, { x: 1, y: 60 }, { x: 11, y: 92 }, { x: 12, y: 95 }
      ],
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong positive linear relationship: more study time consistently leads to higher test scores.",
      practicalImplication: "Students can expect approximately 3-4 point improvement per additional study hour."
    },
    {
      name: "Car Age vs Value",
      context: "Used car marketplace data showing depreciation",
      xVariable: "Car Age",
      yVariable: "Market Value",
      xUnit: "years",
      yUnit: "thousands $",
      data: [
        { x: 1, y: 28 }, { x: 2, y: 24 }, { x: 3, y: 20 }, { x: 4, y: 17 },
        { x: 5, y: 14 }, { x: 6, y: 12 }, { x: 7, y: 10 }, { x: 8, y: 8 },
        { x: 9, y: 7 }, { x: 10, y: 6 }, { x: 11, y: 5 }, { x: 12, y: 4 }
      ],
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong negative linear relationship: as cars age, their market value decreases consistently.",
      practicalImplication: "Cars lose approximately $2,000-2,500 in value per year on average."
    },
    {
      name: "Temperature vs Ice Cream Sales",
      context: "Daily temperature and ice cream sales at local shop",
      xVariable: "Temperature",
      yVariable: "Ice Cream Sales",
      xUnit: "°F",
      yUnit: "units sold",
      data: [
        { x: 65, y: 45 }, { x: 70, y: 55 }, { x: 75, y: 68 }, { x: 80, y: 85 },
        { x: 85, y: 95 }, { x: 90, y: 110 }, { x: 95, y: 125 }, { x: 68, y: 50 },
        { x: 73, y: 62 }, { x: 78, y: 75 }, { x: 83, y: 88 }, { x: 88, y: 102 }
      ],
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong positive linear relationship: warmer weather drives higher ice cream sales.",
      practicalImplication: "Each 5°F increase in temperature typically adds 15-20 units to daily sales."
    },
    {
      name: "Exercise vs Resting Heart Rate",
      context: "Weekly exercise hours vs resting heart rate in adults",
      xVariable: "Exercise Hours/Week",
      yVariable: "Resting Heart Rate",
      xUnit: "hours",
      yUnit: "bpm",
      data: [
        { x: 0, y: 85 }, { x: 2, y: 78 }, { x: 4, y: 72 }, { x: 6, y: 68 },
        { x: 8, y: 65 }, { x: 10, y: 62 }, { x: 12, y: 60 }, { x: 1, y: 82 },
        { x: 3, y: 75 }, { x: 5, y: 70 }, { x: 7, y: 66 }, { x: 9, y: 63 }
      ],
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong negative linear relationship: more exercise leads to lower resting heart rate.",
      practicalImplication: "Each additional 2 hours of weekly exercise typically reduces resting heart rate by 3-4 bpm."
    },
    {
      name: "Height vs Shoe Size",
      context: "Adult height and shoe size correlation study",
      xVariable: "Height",
      yVariable: "Shoe Size",
      xUnit: "inches",
      yUnit: "US size",
      data: [
        { x: 60, y: 6 }, { x: 62, y: 7 }, { x: 64, y: 8 }, { x: 66, y: 9 },
        { x: 68, y: 10 }, { x: 70, y: 11 }, { x: 72, y: 12 }, { x: 74, y: 13 },
        { x: 61, y: 6.5 }, { x: 63, y: 7.5 }, { x: 65, y: 8.5 }, { x: 67, y: 9.5 }
      ],
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong positive linear relationship: taller people tend to have larger shoe sizes.",
      practicalImplication: "Each 2-inch increase in height typically corresponds to 1 size increase in shoes."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Student GPA vs Hours of Sleep",
      plotDescription: "Points generally trend upward from left to right, with students getting more sleep having higher GPAs",
      questionType: 'direction',
      question: "What is the direction of the relationship between hours of sleep and GPA?",
      options: [
        "Positive - more sleep is associated with higher GPA",
        "Negative - more sleep is associated with lower GPA",
        "No relationship - sleep and GPA are unrelated",
        "Cannot determine from the description"
      ],
      correctAnswer: "Positive - more sleep is associated with higher GPA",
      explanation: "When points trend upward from left to right, it indicates a positive relationship. As one variable increases (sleep), the other variable also increases (GPA).",
      skillFocus: "Identifying positive relationships from scatterplot patterns"
    },
    {
      id: 2,
      scenario: "Social Media Usage vs Face-to-Face Conversations",
      plotDescription: "Points show a clear downward trend, with heavy social media users having fewer in-person conversations",
      questionType: 'direction',
      question: "What type of relationship does this scatterplot show?",
      options: [
        "Positive relationship",
        "Negative relationship",
        "No relationship",
        "Curved relationship only"
      ],
      correctAnswer: "Negative relationship",
      explanation: "A downward trend indicates a negative relationship. As social media usage increases, face-to-face conversations decrease. This is the hallmark of a negative association.",
      skillFocus: "Recognizing negative relationships from downward trending patterns"
    },
    {
      id: 3,
      scenario: "Advertising Spend vs Sales Revenue",
      plotDescription: "Points are tightly clustered around an upward sloping line with very little scatter",
      questionType: 'strength',
      question: "How would you describe the strength of this relationship?",
      options: [
        "Weak - lots of variability around the pattern",
        "Moderate - some scatter but clear pattern",
        "Strong - points closely follow the linear pattern",
        "No relationship - points are randomly scattered"
      ],
      correctAnswer: "Strong - points closely follow the linear pattern",
      explanation: "When points are tightly clustered around a clear pattern with little scatter, it indicates a strong relationship. You can predict sales revenue quite accurately from advertising spend.",
      skillFocus: "Assessing relationship strength based on how closely points follow a pattern"
    },
    {
      id: 4,
      scenario: "Age vs Reaction Time",
      plotDescription: "Points show an upward curve that starts gradually and becomes steeper as age increases",
      questionType: 'form',
      question: "What is the form of this relationship?",
      options: [
        "Linear - points follow a straight line pattern",
        "Curved - points follow a curved pattern",
        "No pattern - points are randomly distributed",
        "Clustered - points form distinct groups"
      ],
      correctAnswer: "Curved - points follow a curved pattern",
      explanation: "When points follow a curved rather than straight-line pattern, the relationship is nonlinear or curved. Age-related changes often accelerate, creating curved relationships.",
      skillFocus: "Distinguishing between linear and curved relationship patterns"
    },
    {
      id: 5,
      scenario: "Employee ID Number vs Salary",
      plotDescription: "Points appear randomly scattered with no discernible pattern or trend",
      questionType: 'interpretation',
      question: "What can you conclude about this relationship?",
      options: [
        "Strong positive relationship exists",
        "Moderate negative relationship exists",
        "No meaningful relationship exists",
        "Curved relationship exists"
      ],
      correctAnswer: "No meaningful relationship exists",
      explanation: "Employee ID numbers are assigned arbitrarily and have no logical connection to salary. Random scatter with no pattern indicates no relationship between these variables.",
      skillFocus: "Recognizing when variables have no meaningful relationship"
    },
    {
      id: 6,
      scenario: "Hours Worked vs Job Satisfaction",
      plotDescription: "Points form an inverted U-shape, with satisfaction increasing up to about 40 hours then decreasing",
      questionType: 'interpretation',
      question: "What does this pattern suggest about work hours and satisfaction?",
      options: [
        "More work always leads to higher satisfaction",
        "Less work always leads to higher satisfaction",
        "There's an optimal amount of work for maximum satisfaction",
        "Work hours and satisfaction are unrelated"
      ],
      correctAnswer: "There's an optimal amount of work for maximum satisfaction",
      explanation: "An inverted U-shape suggests that moderate work hours (around 40) maximize satisfaction, while both too few and too many hours reduce satisfaction. This shows a nonlinear relationship with an optimal point.",
      skillFocus: "Interpreting complex curved relationships in real-world contexts"
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

  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Scatterplot Expert</h1>
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
                📊 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Scatterplot Description:</h4>
                  <p className="text-gray-600 italic">{currentChallengeData.plotDescription}</p>
                </div>
                
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
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Scatterplot Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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
                href="/chapters/6"
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

  const selectedScatterExample = examples[selectedExample];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Correlation
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="scatterplot" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Scatterplots</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the foundation of correlation analysis! Learn to visualize and interpret relationships between two quantitative variables.
              </p>
            </div>
          </div>
        </div>

        {/* What Are Scatterplots */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 What Are Scatterplots?</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Your Relationship Detective Tool</h3>
                  <p className="text-yellow-600">
                    Scatterplots are graphs that show the relationship between two quantitative variables. Each point represents 
                    one observation, with its position determined by the values of both variables. They're the starting point 
                    for all correlation and regression analysis!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">📏 Structure</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• X-axis: Explanatory variable</li>
                  <li>• Y-axis: Response variable</li>
                  <li>• Each point: One observation</li>
                  <li>• Pattern reveals relationship</li>
                </ul>
              </div>

              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">🔍 What to Look For</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Direction: positive/negative</li>
                  <li>• Form: linear/curved</li>
                  <li>• Strength: strong/weak</li>
                  <li>• Outliers: unusual points</li>
                </ul>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">💡 Why They Matter</h4>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• Reveal hidden relationships</li>
                  <li>• Guide analysis decisions</li>
                  <li>• Identify outliers</li>
                  <li>• Support predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The Three Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔑 The Three Key Features</h2>
          
          <div className="space-y-8">
            {/* Direction */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-700 mb-4">1. Direction</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">↗️ Positive</div>
                  <div className="text-sm text-gray-600">As X increases, Y increases</div>
                  <div className="text-xs text-green-600 mt-2">Points trend upward</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">↘️ Negative</div>
                  <div className="text-sm text-gray-600">As X increases, Y decreases</div>
                  <div className="text-xs text-red-600 mt-2">Points trend downward</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-2">➡️ No Direction</div>
                  <div className="text-sm text-gray-600">No consistent pattern</div>
                  <div className="text-xs text-gray-600 mt-2">Random scatter</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-700 mb-4">2. Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">📏 Linear</div>
                  <div className="text-sm text-gray-600">Points follow straight line</div>
                  <div className="text-xs text-blue-600 mt-2">Constant rate of change</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">🌙 Curved</div>
                  <div className="text-sm text-gray-600">Points follow curved pattern</div>
                  <div className="text-xs text-purple-600 mt-2">Rate of change varies</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-2">❓ No Form</div>
                  <div className="text-sm text-gray-600">No clear pattern</div>
                  <div className="text-xs text-gray-600 mt-2">Random arrangement</div>
                </div>
              </div>
            </div>

            {/* Strength */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-700 mb-4">3. Strength</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">💪 Strong</div>
                  <div className="text-sm text-gray-600">Points close to pattern</div>
                  <div className="text-xs text-green-600 mt-2">Low scatter</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">👌 Moderate</div>
                  <div className="text-sm text-gray-600">Some scatter around pattern</div>
                  <div className="text-xs text-orange-600 mt-2">Medium scatter</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">🤏 Weak</div>
                  <div className="text-sm text-gray-600">Lots of scatter</div>
                  <div className="text-xs text-red-600 mt-2">High variability</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Scatterplot Examples</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedScatterExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedScatterExample.context}</p>
            </div>

            {/* Variables and Data Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">📊 Variable Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>X-Variable:</span>
                    <span className="font-bold">{selectedScatterExample.xVariable} ({selectedScatterExample.xUnit})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Y-Variable:</span>
                    <span className="font-bold">{selectedScatterExample.yVariable} ({selectedScatterExample.yUnit})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sample Size:</span>
                    <span className="font-bold">{selectedScatterExample.data.length} observations</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">🔍 Relationship Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Direction:</span>
                    <span className={`font-bold capitalize ${
                      selectedScatterExample.direction === 'positive' ? 'text-green-600' :
                      selectedScatterExample.direction === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>{selectedScatterExample.direction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Form:</span>
                    <span className="font-bold capitalize text-blue-600">{selectedScatterExample.form}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strength:</span>
                    <span className={`font-bold capitalize ${
                      selectedScatterExample.strength === 'strong' ? 'text-green-600' :
                      selectedScatterExample.strength === 'moderate' ? 'text-orange-600' : 'text-red-600'
                    }`}>{selectedScatterExample.strength}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Data Points */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-4">📈 Sample Data Points</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedScatterExample.data.slice(0, 8).map((point, index) => (
                  <div key={index} className="bg-white p-3 rounded border text-center">
                    <div className="text-sm text-gray-600">Point {index + 1}</div>
                    <div className="font-bold">({point.x}, {point.y})</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis and Implications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🔍 Interpretation</h4>
                <p className="text-blue-600 text-sm">{selectedScatterExample.interpretation}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">💼 Practical Implication</h4>
                <p className="text-green-600 text-sm">{selectedScatterExample.practicalImplication}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Scatterplots Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📖 How to Read Scatterplots</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">Step-by-Step Analysis:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <strong>Identify Variables:</strong> What's on each axis? Which is explanatory (X) and which is response (Y)?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <strong>Look for Overall Pattern:</strong> Do the points trend upward, downward, or show no pattern?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <strong>Assess Form:</strong> Is the pattern linear (straight) or curved? Any clusters or gaps?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <strong>Evaluate Strength:</strong> How tightly do points cluster around the pattern?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <strong>Identify Outliers:</strong> Any points that deviate dramatically from the pattern?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                  <div>
                    <strong>Interpret Context:</strong> What does the relationship mean in real-world terms?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">⚠️ Common Mistakes to Avoid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">❌ Wrong Variable Assignment</h4>
                <p className="text-red-600 text-sm">
                  Don't randomly assign variables to axes. The explanatory variable (what you think causes changes) goes on X-axis.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">❌ Ignoring Outliers</h4>
                <p className="text-orange-600 text-sm">
                  Outliers can dramatically affect your interpretation. Always identify and investigate unusual points.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-700 mb-2">❌ Forcing Linear Interpretation</h4>
                <p className="text-yellow-600 text-sm">
                  Not all relationships are linear! Look for curves, clusters, or other patterns that might be missed with linear thinking.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">❌ Implying Causation</h4>
                <p className="text-purple-600 text-sm">
                  Correlation ≠ Causation! A scatterplot shows association, not necessarily that one variable causes the other.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Scatterplot Analysis Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze scatterplot patterns and relationships</li>
                <li>• Identify direction, form, and strength</li>
                <li>• Interpret relationships in real-world contexts</li>
                <li>• Make evidence-based conclusions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Visual pattern recognition</li>
                <li>• Relationship characterization</li>
                <li>• Data interpretation skills</li>
                <li>• Professional data analysis</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Scatterplot Analysis
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
