"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ScenarioData {
  id: number;
  title: string;
  context: string;
  xVariable: string;
  yVariable: string;
  data: Array<{ x: number; y: number }>;
  correlationValue: number;
  direction: 'positive' | 'negative' | 'none';
  strength: 'strong' | 'moderate' | 'weak' | 'none';
  form: 'linear' | 'curved' | 'none';
  outliers: number[];
  interpretation: string;
  practicalImplication: string;
  causationWarning: string;
}

interface Challenge {
  id: number;
  scenario: ScenarioData;
  questionType: 'direction' | 'strength' | 'correlation' | 'causation' | 'outliers' | 'application';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function CorrelationGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameMode, setGameMode] = useState<'quick' | 'comprehensive'>('quick');

  const scenarios: ScenarioData[] = [
    {
      id: 1,
      title: "Student Success Study",
      context: "Academic performance research at a large university",
      xVariable: "Hours of Study per Week",
      yVariable: "Final GPA",
      data: [
        { x: 5, y: 2.1 }, { x: 10, y: 2.7 }, { x: 15, y: 3.2 }, { x: 20, y: 3.6 },
        { x: 25, y: 3.8 }, { x: 30, y: 3.9 }, { x: 35, y: 3.95 }, { x: 8, y: 2.4 },
        { x: 12, y: 2.9 }, { x: 18, y: 3.4 }, { x: 22, y: 3.7 }, { x: 28, y: 3.85 }
      ],
      correlationValue: 0.92,
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      outliers: [],
      interpretation: "Very strong positive linear relationship between study time and academic performance.",
      practicalImplication: "Students who study more hours per week achieve consistently higher GPAs, suggesting study time is a key predictor of academic success.",
      causationWarning: "While study time likely does cause better performance, motivated students might both study more AND perform better due to other factors."
    },
    {
      id: 2,
      title: "Vehicle Depreciation Analysis",
      context: "Used car market value research",
      xVariable: "Car Age (years)",
      yVariable: "Resale Value ($1000s)",
      data: [
        { x: 1, y: 28 }, { x: 2, y: 24 }, { x: 3, y: 20 }, { x: 4, y: 17 },
        { x: 5, y: 14 }, { x: 6, y: 12 }, { x: 7, y: 10 }, { x: 8, y: 8 },
        { x: 9, y: 7 }, { x: 10, y: 6 }, { x: 11, y: 5 }, { x: 12, y: 4 }
      ],
      correlationValue: -0.96,
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      outliers: [],
      interpretation: "Very strong negative linear relationship between car age and market value.",
      practicalImplication: "Cars depreciate very predictably, losing approximately $2,000-2,500 per year on average.",
      causationWarning: "Age itself doesn't cause depreciation - it's the wear, technology obsolescence, and style changes that come with age."
    },
    {
      id: 3,
      title: "Health & Exercise Study",
      context: "Fitness tracking and health outcomes",
      xVariable: "Weekly Exercise Hours",
      yVariable: "Resting Heart Rate (bpm)",
      data: [
        { x: 0, y: 85 }, { x: 2, y: 78 }, { x: 4, y: 72 }, { x: 6, y: 68 },
        { x: 8, y: 65 }, { x: 10, y: 62 }, { x: 12, y: 60 }, { x: 1, y: 82 },
        { x: 3, y: 75 }, { x: 5, y: 70 }, { x: 7, y: 66 }, { x: 9, y: 63 }
      ],
      correlationValue: -0.89,
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      outliers: [],
      interpretation: "Strong negative linear relationship between exercise frequency and resting heart rate.",
      practicalImplication: "Regular exercise is associated with improved cardiovascular fitness, as measured by lower resting heart rate.",
      causationWarning: "Exercise likely does improve heart health, but people who exercise more may also have better diets, genetics, or other healthy habits."
    },
    {
      id: 4,
      title: "Social Media & Well-being",
      context: "Digital wellness research among teenagers",
      xVariable: "Daily Social Media Hours",
      yVariable: "Self-Reported Happiness (1-10)",
      data: [
        { x: 1, y: 8.2 }, { x: 2, y: 7.8 }, { x: 3, y: 7.1 }, { x: 4, y: 6.5 },
        { x: 5, y: 5.9 }, { x: 6, y: 5.2 }, { x: 7, y: 4.8 }, { x: 8, y: 4.1 },
        { x: 1.5, y: 7.9 }, { x: 2.5, y: 7.4 }, { x: 3.5, y: 6.8 }, { x: 4.5, y: 6.1 }
      ],
      correlationValue: -0.74,
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      outliers: [],
      interpretation: "Strong negative linear relationship between social media usage and self-reported happiness.",
      practicalImplication: "Higher social media usage is associated with lower happiness scores, suggesting potential mental health concerns.",
      causationWarning: "Direction unclear: Does social media cause unhappiness, or do unhappy people use social media more? Likely bidirectional with confounding factors."
    },
    {
      id: 5,
      title: "Income & Education Analysis",
      context: "Economic outcomes and educational attainment",
      xVariable: "Years of Education",
      yVariable: "Annual Income ($1000s)",
      data: [
        { x: 12, y: 35 }, { x: 14, y: 42 }, { x: 16, y: 58 }, { x: 18, y: 72 },
        { x: 20, y: 85 }, { x: 13, y: 38 }, { x: 15, y: 48 }, { x: 17, y: 65 },
        { x: 19, y: 78 }, { x: 21, y: 92 }, { x: 11, y: 32 }, { x: 22, y: 95 }
      ],
      correlationValue: 0.81,
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      outliers: [],
      interpretation: "Strong positive linear relationship between educational attainment and income level.",
      practicalImplication: "Each additional year of education is associated with approximately $6,000-7,000 higher annual income.",
      causationWarning: "Education likely causes some income increase, but family background, natural ability, and motivation affect both education and income."
    },
    {
      id: 6,
      title: "Sleep & Performance Study",
      context: "Cognitive performance and sleep duration research",
      xVariable: "Hours of Sleep",
      yVariable: "Cognitive Test Score",
      data: [
        { x: 4, y: 65 }, { x: 5, y: 72 }, { x: 6, y: 78 }, { x: 7, y: 88 },
        { x: 8, y: 92 }, { x: 9, y: 89 }, { x: 10, y: 84 }, { x: 11, y: 78 },
        { x: 4.5, y: 68 }, { x: 5.5, y: 75 }, { x: 6.5, y: 82 }, { x: 7.5, y: 90 }
      ],
      correlationValue: 0.23,
      direction: 'positive',
      strength: 'weak',
      form: 'curved',
      outliers: [],
      interpretation: "Weak overall correlation due to curved relationship - optimal sleep around 7-8 hours.",
      practicalImplication: "Both too little and too much sleep hurt performance, with peak performance around 7-8 hours.",
      causationWarning: "Sleep likely affects performance, but this curved relationship shows linear correlation coefficient doesn't capture the full story."
    }
  ];

  const generateChallenges = (selectedScenarios: ScenarioData[]): Challenge[] => {
    const challenges: Challenge[] = [];
    
    selectedScenarios.forEach((scenario, index) => {
      // Direction challenge
      challenges.push({
        id: challenges.length + 1,
        scenario,
        questionType: 'direction',
        question: `What is the direction of the relationship between ${scenario.xVariable} and ${scenario.yVariable}?`,
        options: [
          "Positive - as one increases, the other increases",
          "Negative - as one increases, the other decreases",
          "No clear direction - variables are unrelated",
          "Cannot determine from the given data"
        ],
        correctAnswer: scenario.direction === 'positive' ? "Positive - as one increases, the other increases" :
                      scenario.direction === 'negative' ? "Negative - as one increases, the other decreases" :
                      "No clear direction - variables are unrelated",
        explanation: `The correlation of r = ${scenario.correlationValue} indicates a ${scenario.direction} relationship. ${scenario.interpretation}`,
        skillFocus: "Identifying relationship direction from correlation values and data patterns"
      });

      // Strength challenge
      challenges.push({
        id: challenges.length + 1,
        scenario,
        questionType: 'strength',
        question: `How would you classify the strength of this relationship (r = ${scenario.correlationValue})?`,
        options: [
          "Very weak relationship",
          "Weak relationship",
          "Moderate relationship",
          "Strong relationship"
        ],
        correctAnswer: Math.abs(scenario.correlationValue) >= 0.8 ? "Strong relationship" :
                      Math.abs(scenario.correlationValue) >= 0.5 ? "Moderate relationship" :
                      Math.abs(scenario.correlationValue) >= 0.3 ? "Weak relationship" :
                      "Very weak relationship",
        explanation: `|r| = ${Math.abs(scenario.correlationValue)} indicates a ${scenario.strength} relationship. ${scenario.practicalImplication}`,
        skillFocus: "Classifying correlation strength using standard guidelines"
      });

      // Causation challenge
      challenges.push({
        id: challenges.length + 1,
        scenario,
        questionType: 'causation',
        question: `Given this correlation, what can we conclude about causation?`,
        options: [
          `${scenario.xVariable} definitely causes changes in ${scenario.yVariable}`,
          "The correlation proves a causal relationship exists",
          "Correlation suggests association but doesn't prove causation",
          "No relationship exists between these variables"
        ],
        correctAnswer: "Correlation suggests association but doesn't prove causation",
        explanation: `${scenario.causationWarning} Remember: correlation ≠ causation, even with strong relationships.`,
        skillFocus: "Distinguishing between correlation and causation in real-world contexts"
      });
    });

    return challenges;
  };

  const quickChallenges = generateChallenges(scenarios.slice(0, 2));
  const comprehensiveChallenges = generateChallenges(scenarios);
  
  const currentChallenges = gameMode === 'quick' ? quickChallenges : comprehensiveChallenges;

  const startGame = (mode: 'quick' | 'comprehensive') => {
    setGameMode(mode);
    setGameStarted(true);
    setCurrentChallenge(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  const handleSubmit = () => {
    const challenge = currentChallenges[currentChallenge];
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
      if (currentChallenge < currentChallenges.length - 1) {
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
    const currentChallengeData = currentChallenges[currentChallenge];
    const scenario = currentChallengeData.scenario;

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
                <h1 className="text-2xl font-bold text-[#58595b]">Correlation Detective Challenge</h1>
                <p className="text-gray-600">
                  {gameMode === 'quick' ? 'Quick Mode' : 'Comprehensive Mode'} - 
                  Challenge {currentChallenge + 1} of {currentChallenges.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentChallenge + 1) / currentChallenges.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 {scenario.title}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Study Context:</h4>
                    <p className="text-gray-600 text-sm">{scenario.context}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Variables:</h4>
                    <p className="text-gray-600 text-sm">
                      <strong>X:</strong> {scenario.xVariable}<br />
                      <strong>Y:</strong> {scenario.yVariable}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ff8200] mb-2">
                      r = {scenario.correlationValue > 0 ? '+' : ''}{scenario.correlationValue}
                    </div>
                    <div className="text-sm text-gray-600">Correlation Coefficient</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border mb-4">
                  <h4 className="font-semibold text-blue-700 mb-2">Sample Data Points:</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                    {scenario.data.slice(0, 6).map((point, index) => (
                      <div key={index} className="bg-white p-2 rounded text-center">
                        ({point.x}, {point.y})
                      </div>
                    ))}
                  </div>
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
    const totalChallenges = currentChallenges.length;
    const percentage = Math.round((score / totalChallenges) * 100);

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
              {percentage >= 85 ? '🎉' : percentage >= 70 ? '👍' : percentage >= 50 ? '📚' : '💪'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {percentage >= 85 ? 'Correlation Master!' : 
               percentage >= 70 ? 'Great Detective Work!' : 
               percentage >= 50 ? 'Good Progress!' : 'Keep Practicing!'}
            </h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {totalChallenges}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{percentage}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{gameMode === 'quick' ? 'Quick' : 'Full'}</div>
                <div className="text-sm text-gray-600">Mode Completed</div>
              </div>
            </div>

            {/* Performance Feedback */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-[#58595b] mb-4">Performance Analysis</h3>
              <div className="text-sm text-gray-600 space-y-2">
                {percentage >= 85 && (
                  <p className="text-green-600">🌟 Excellent mastery of correlation concepts! You're ready for advanced statistical analysis.</p>
                )}
                {percentage >= 70 && percentage < 85 && (
                  <p className="text-blue-600">💪 Strong understanding with room for refinement. Consider reviewing causation concepts.</p>
                )}
                {percentage >= 50 && percentage < 70 && (
                  <p className="text-orange-600">📖 Good foundation but practice needed. Focus on correlation strength classification.</p>
                )}
                {percentage < 50 && (
                  <p className="text-red-600">🔄 More practice recommended. Review the basics of direction, form, and strength.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartGame}
                  className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg"
                >
                  Try Again
                </button>
                {gameMode === 'quick' && (
                  <button
                    onClick={() => startGame('comprehensive')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Full Challenge
                  </button>
                )}
              </div>
              <Link
                href="/chapters/6"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Chapter Complete!
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
              <span role="img" aria-label="detective game" className="text-4xl">🕵️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Correlation Detective Game</h1>
              <p className="text-xl text-gray-600 mt-2">
                Put your correlation mastery to the test! Analyze real research scenarios and demonstrate your statistical detective skills.
              </p>
            </div>
          </div>
        </div>

        {/* Game Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Your Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">What You'll Do</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze real research scenarios</li>
                <li>• Interpret correlation coefficients</li>
                <li>• Identify direction, form, and strength</li>
                <li>• Avoid causation traps</li>
                <li>• Make professional statistical conclusions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Demonstrate</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Complete correlation analysis</li>
                <li>• Critical thinking about relationships</li>
                <li>• Professional data interpretation</li>
                <li>• Research methodology understanding</li>
                <li>• Statistical communication skills</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="font-bold text-yellow-700 mb-2">Challenge Levels</h3>
                <p className="text-yellow-600">
                  Choose your difficulty: Quick Mode (6 challenges) for a focused practice session, 
                  or Comprehensive Mode (18 challenges) for complete mastery demonstration across all correlation concepts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Scenarios Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 Research Scenarios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.slice(0, 6).map((scenario) => (
              <div key={scenario.id} className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-bold text-[#58595b] mb-2">{scenario.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{scenario.context}</p>
                <div className="bg-white p-2 rounded border text-center">
                  <div className="font-bold text-[#ff8200]">r = {scenario.correlationValue}</div>
                  <div className="text-xs text-gray-500 capitalize">{scenario.strength} {scenario.direction}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Mode Selection */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Choose Your Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Mode */}
            <div className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Quick Mode</h3>
                <p className="text-blue-600">Perfect for focused practice</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Challenges:</span>
                  <span className="font-bold text-blue-700">6 scenarios</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-bold text-blue-700">~10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus:</span>
                  <span className="font-bold text-blue-700">Core concepts</span>
                </div>
              </div>

              <button
                onClick={() => startGame('quick')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Quick Challenge
              </button>
            </div>

            {/* Comprehensive Mode */}
            <div className="border-2 border-purple-200 rounded-lg p-6 hover:border-purple-400 transition-colors">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Comprehensive Mode</h3>
                <p className="text-purple-600">Complete mastery assessment</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Challenges:</span>
                  <span className="font-bold text-purple-700">18 scenarios</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-bold text-purple-700">~25 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus:</span>
                  <span className="font-bold text-purple-700">All concepts</span>
                </div>
              </div>

              <button
                onClick={() => startGame('comprehensive')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Full Challenge
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-[#58595b] mb-3">💡 Success Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Remember the Big Three:</strong> Always assess direction, form, and strength systematically.
              </div>
              <div>
                <strong>Correlation ≠ Causation:</strong> Strong correlations don't prove causal relationships.
              </div>
              <div>
                <strong>Context Matters:</strong> Consider real-world factors that might explain relationships.
              </div>
              <div>
                <strong>Think Critically:</strong> Look for confounding variables and alternative explanations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
