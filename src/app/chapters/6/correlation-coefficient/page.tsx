"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface CorrelationExample {
  name: string;
  context: string;
  data: Array<{ x: number; y: number }>;
  correlationValue: number;
  interpretation: string;
  strengthDescription: string;
  practicalMeaning: string;
  visualDescription: string;
}

interface Challenge {
  id: number;
  scenario: string;
  correlationValue: number;
  questionType: 'interpretation' | 'strength' | 'comparison' | 'application';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function CorrelationCoefficient() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [calculatorDataX, setCalculatorDataX] = useState('1,2,3,4,5');
  const [calculatorDataY, setCalculatorDataY] = useState('2,4,6,8,10');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: CorrelationExample[] = [
    {
      name: "Perfect Positive Correlation",
      context: "Hours studied vs points gained on exam (idealized)",
      data: [
        { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 },
        { x: 5, y: 10 }, { x: 6, y: 12 }, { x: 7, y: 14 }, { x: 8, y: 16 }
      ],
      correlationValue: 1.0,
      interpretation: "Perfect positive linear relationship - every increase in study time produces an exact, predictable increase in exam points.",
      strengthDescription: "Perfect (r = +1.0): Strongest possible positive relationship",
      practicalMeaning: "In this idealized scenario, study time perfectly predicts exam improvement with zero variation.",
      visualDescription: "All points lie exactly on a straight upward-sloping line with no scatter whatsoever."
    },
    {
      name: "Strong Positive Correlation",
      context: "Height vs weight in healthy adults",
      data: [
        { x: 65, y: 140 }, { x: 67, y: 155 }, { x: 69, y: 170 }, { x: 71, y: 185 },
        { x: 73, y: 200 }, { x: 66, y: 148 }, { x: 68, y: 162 }, { x: 70, y: 178 }
      ],
      correlationValue: 0.85,
      interpretation: "Strong positive linear relationship - taller people tend to weigh more, with some individual variation.",
      strengthDescription: "Strong (r = +0.85): Very reliable relationship with some scatter",
      practicalMeaning: "Height is an excellent predictor of weight, though individual body composition creates some variation.",
      visualDescription: "Points cluster tightly around an upward-sloping line with minimal scatter."
    },
    {
      name: "Moderate Positive Correlation",
      context: "Years of education vs annual income",
      data: [
        { x: 12, y: 35000 }, { x: 14, y: 42000 }, { x: 16, y: 55000 }, { x: 18, y: 68000 },
        { x: 20, y: 75000 }, { x: 13, y: 38000 }, { x: 15, y: 48000 }, { x: 17, y: 62000 }
      ],
      correlationValue: 0.65,
      interpretation: "Moderate positive linear relationship - more education generally leads to higher income, but with considerable variation.",
      strengthDescription: "Moderate (r = +0.65): Clear relationship but substantial individual differences",
      practicalMeaning: "Education matters for income, but many other factors (skills, opportunities, field) also play important roles.",
      visualDescription: "Points show clear upward trend but with noticeable scatter around the pattern line."
    },
    {
      name: "Weak Positive Correlation",
      context: "Hours of TV watched vs body weight",
      data: [
        { x: 2, y: 160 }, { x: 4, y: 170 }, { x: 6, y: 180 }, { x: 8, y: 190 },
        { x: 3, y: 155 }, { x: 5, y: 185 }, { x: 7, y: 165 }, { x: 9, y: 195 }
      ],
      correlationValue: 0.35,
      interpretation: "Weak positive linear relationship - slight tendency for more TV watching to associate with higher weight, but lots of individual variation.",
      strengthDescription: "Weak (r = +0.35): Relationship barely visible through the scatter",
      practicalMeaning: "TV watching has minimal predictive value for weight - many other lifestyle factors are more important.",
      visualDescription: "Slight upward trend visible but with substantial scatter making pattern hard to see."
    },
    {
      name: "Strong Negative Correlation",
      context: "Car age vs resale value",
      data: [
        { x: 1, y: 28000 }, { x: 3, y: 22000 }, { x: 5, y: 16000 }, { x: 7, y: 10000 },
        { x: 9, y: 4000 }, { x: 2, y: 25000 }, { x: 4, y: 19000 }, { x: 6, y: 13000 }
      ],
      correlationValue: -0.92,
      interpretation: "Strong negative linear relationship - as cars age, their value decreases very predictably.",
      strengthDescription: "Strong Negative (r = -0.92): Very reliable inverse relationship",
      practicalMeaning: "Car age is an excellent predictor of depreciation - older cars are consistently worth less.",
      visualDescription: "Points cluster tightly around a downward-sloping line with minimal scatter."
    },
    {
      name: "No Correlation",
      context: "Shoe size vs GPA in college students",
      data: [
        { x: 8, y: 3.2 }, { x: 9, y: 2.8 }, { x: 10, y: 3.7 }, { x: 11, y: 3.1 },
        { x: 8.5, y: 3.9 }, { x: 9.5, y: 2.5 }, { x: 10.5, y: 3.4 }, { x: 11.5, y: 3.6 }
      ],
      correlationValue: 0.02,
      interpretation: "No linear relationship - shoe size and academic performance are unrelated.",
      strengthDescription: "No Correlation (r ≈ 0): No linear relationship exists",
      practicalMeaning: "Shoe size provides no information about academic performance - these variables are independent.",
      visualDescription: "Points are randomly scattered with no discernible pattern in any direction."
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Student Performance Analysis",
      correlationValue: 0.73,
      questionType: 'interpretation',
      question: "The correlation between study hours and test scores is r = 0.73. What does this tell us?",
      options: [
        "Study hours perfectly predict test scores",
        "There's a strong positive relationship - more study generally means higher scores",
        "Study hours and test scores are unrelated",
        "The relationship is weak and not meaningful"
      ],
      correctAnswer: "There's a strong positive relationship - more study generally means higher scores",
      explanation: "r = 0.73 indicates a strong positive correlation. Values above 0.7 show strong relationships, meaning study hours are a good (but not perfect) predictor of test scores.",
      skillFocus: "Interpreting correlation coefficients in terms of relationship strength and direction"
    },
    {
      id: 2,
      scenario: "Market Research Data",
      correlationValue: -0.45,
      questionType: 'strength',
      question: "A correlation of r = -0.45 between price and sales volume should be classified as:",
      options: [
        "Strong negative correlation",
        "Moderate negative correlation",
        "Weak negative correlation",
        "No correlation"
      ],
      correctAnswer: "Moderate negative correlation",
      explanation: "r = -0.45 falls in the moderate range (typically 0.3 to 0.7 in absolute value). The negative sign indicates that higher prices are associated with lower sales volume, which makes business sense.",
      skillFocus: "Classifying correlation strength using standard guidelines"
    },
    {
      id: 3,
      scenario: "Health Study Results",
      correlationValue: 0.15,
      questionType: 'application',
      question: "Exercise frequency and cholesterol levels show r = 0.15. What should a doctor conclude?",
      options: [
        "Exercise is highly effective for reducing cholesterol",
        "Exercise has little individual effect on cholesterol levels",
        "Exercise increases cholesterol levels",
        "The study methodology was flawed"
      ],
      correctAnswer: "Exercise has little individual effect on cholesterol levels",
      explanation: "r = 0.15 is a very weak positive correlation. While there might be a slight relationship, exercise alone is not a strong predictor of cholesterol levels. Other factors (diet, genetics, age) likely have much greater influence.",
      skillFocus: "Making practical decisions based on correlation strength in professional contexts"
    },
    {
      id: 4,
      scenario: "Quality Control Analysis",
      correlationValue: -0.89,
      questionType: 'comparison',
      question: "Which correlation indicates the strongest relationship?",
      options: [
        "r = 0.76 (temperature vs ice cream sales)",
        "r = -0.89 (defect rate vs customer satisfaction)", 
        "r = 0.82 (advertising spend vs revenue)",
        "r = -0.34 (price vs demand)"
      ],
      correctAnswer: "r = -0.89 (defect rate vs customer satisfaction)",
      explanation: "Correlation strength is determined by the absolute value (ignoring the sign). |-0.89| = 0.89 is the highest, making this the strongest relationship regardless of being negative.",
      skillFocus: "Comparing correlation strengths by focusing on absolute values"
    },
    {
      id: 5,
      scenario: "Educational Research",
      correlationValue: 0.91,
      questionType: 'interpretation',
      question: "Class size and student achievement show r = 0.91. What's the most accurate interpretation?",
      options: [
        "Large classes cause poor student performance",
        "There's a very strong positive association that needs investigation",
        "Class size perfectly predicts achievement",
        "This correlation is impossible and indicates data error"
      ],
      correctAnswer: "There's a very strong positive association that needs investigation",
      explanation: "r = 0.91 shows a very strong positive relationship, but correlation doesn't prove causation. The positive value is surprising (usually smaller classes are better), so this needs investigation - perhaps larger classes occur in better-funded schools with more resources.",
      skillFocus: "Interpreting unexpected correlation results and avoiding causal assumptions"
    },
    {
      id: 6,
      scenario: "Manufacturing Process",
      correlationValue: -0.02,
      questionType: 'application',
      question: "Machine age and product quality show r = -0.02. What should the production manager do?",
      options: [
        "Immediately replace all old machines",
        "Focus on other factors affecting quality since age isn't important",
        "Conclude that older machines produce better quality",
        "Collect more data because the correlation is too weak"
      ],
      correctAnswer: "Focus on other factors affecting quality since age isn't important",
      explanation: "r = -0.02 indicates essentially no relationship between machine age and quality. The manager should investigate other factors like operator training, maintenance, materials, or environmental conditions that might affect quality.",
      skillFocus: "Using correlation analysis to guide practical decision-making and resource allocation"
    }
  ];

  const calculateCorrelation = (xData: number[], yData: number[]): number => {
    if (xData.length !== yData.length || xData.length < 2) return NaN;
    
    const n = xData.length;
    const meanX = xData.reduce((sum, x) => sum + x, 0) / n;
    const meanY = yData.reduce((sum, y) => sum + y, 0) / n;
    
    let numerator = 0;
    let denomX = 0;
    let denomY = 0;
    
    for (let i = 0; i < n; i++) {
      const diffX = xData[i] - meanX;
      const diffY = yData[i] - meanY;
      numerator += diffX * diffY;
      denomX += diffX * diffX;
      denomY += diffY * diffY;
    }
    
    const denominator = Math.sqrt(denomX * denomY);
    return denominator === 0 ? NaN : numerator / denominator;
  };

  const interpretCorrelation = (r: number): string => {
    const absR = Math.abs(r);
    const direction = r > 0 ? 'positive' : r < 0 ? 'negative' : 'no';
    
    if (absR >= 0.9) return `Very strong ${direction} correlation`;
    if (absR >= 0.7) return `Strong ${direction} correlation`;
    if (absR >= 0.5) return `Moderate ${direction} correlation`;
    if (absR >= 0.3) return `Weak ${direction} correlation`;
    if (absR >= 0.1) return `Very weak ${direction} correlation`;
    return 'No meaningful correlation';
  };

  const parseData = (dataString: string): number[] => {
    return dataString.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  };

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
                <h1 className="text-2xl font-bold text-[#58595b]">Correlation Coefficient Master</h1>
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
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-[#ff8200] mb-2">
                    r = {currentChallengeData.correlationValue > 0 ? '+' : ''}{currentChallengeData.correlationValue}
                  </div>
                  <div className="text-sm text-gray-600">Correlation Coefficient</div>
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
              {score >= 5 ? 'Correlation Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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

  const selectedCorrExample = examples[selectedExample];
  const calculatorXData = parseData(calculatorDataX);
  const calculatorYData = parseData(calculatorDataY);
  const calculatorR = calculateCorrelation(calculatorXData, calculatorYData);

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
              <span role="img" aria-label="correlation coefficient" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Correlation Coefficient</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the numerical measurement of relationships! Learn to calculate, interpret, and apply the correlation coefficient (r).
              </p>
            </div>
          </div>
        </div>

        {/* What is the Correlation Coefficient */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 What is the Correlation Coefficient?</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📏</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">The Relationship Ruler</h3>
                  <p className="text-yellow-600">
                    The correlation coefficient (r) is a single number between -1 and +1 that captures both the 
                    direction and strength of a linear relationship. It's like having a precision measuring tool 
                    that tells you exactly how closely two variables are related!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">📏 Scale: -1 to +1</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• +1: Perfect positive relationship</li>
                  <li>• 0: No linear relationship</li>
                  <li>• -1: Perfect negative relationship</li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">🧭 Direction</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• Positive r: Variables increase together</li>
                  <li>• Negative r: One increases, other decreases</li>
                  <li>• Sign tells you the direction</li>
                </ul>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">💪 Strength</h4>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• Closer to ±1: Stronger relationship</li>
                  <li>• Closer to 0: Weaker relationship</li>
                  <li>• Absolute value shows strength</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Correlation Scale */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📊 The Correlation Scale</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 via-yellow-100 via-green-100 to-blue-100 p-6 rounded-lg">
              <h3 className="text-center font-bold text-gray-700 mb-6">Correlation Strength Guidelines</h3>
              
              <div className="relative">
                {/* Scale Line */}
                <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full mb-4"></div>
                
                {/* Scale Labels */}
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-red-600">-1.0</span>
                  <span className="text-red-500">-0.7</span>
                  <span className="text-orange-500">-0.5</span>
                  <span className="text-yellow-600">-0.3</span>
                  <span className="text-gray-600">0</span>
                  <span className="text-green-600">+0.3</span>
                  <span className="text-green-500">+0.5</span>
                  <span className="text-blue-500">+0.7</span>
                  <span className="text-blue-600">+1.0</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                <div className="text-center bg-white p-3 rounded shadow">
                  <div className="font-bold text-red-600">Perfect</div>
                  <div className="text-xs text-gray-600">r = ±1.0</div>
                  <div className="text-xs text-red-500">All points on line</div>
                </div>
                <div className="text-center bg-white p-3 rounded shadow">
                  <div className="font-bold text-orange-600">Strong</div>
                  <div className="text-xs text-gray-600">|r| ≥ 0.7</div>
                  <div className="text-xs text-orange-500">Close to pattern</div>
                </div>
                <div className="text-center bg-white p-3 rounded shadow">
                  <div className="font-bold text-yellow-600">Moderate</div>
                  <div className="text-xs text-gray-600">|r| = 0.3-0.7</div>
                  <div className="text-xs text-yellow-600">Clear pattern</div>
                </div>
                <div className="text-center bg-white p-3 rounded shadow">
                  <div className="font-bold text-green-600">Weak</div>
                  <div className="text-xs text-gray-600">|r| = 0.1-0.3</div>
                  <div className="text-xs text-green-600">Slight pattern</div>
                </div>
                <div className="text-center bg-white p-3 rounded shadow">
                  <div className="font-bold text-gray-600">None</div>
                  <div className="text-xs text-gray-600">|r| < 0.1</div>
                  <div className="text-xs text-gray-500">No pattern</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 Interactive Correlation Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#58595b]">Enter Your Data:</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    X Values (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={calculatorDataX}
                    onChange={(e) => setCalculatorDataX(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                    placeholder="e.g., 1,2,3,4,5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Y Values (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={calculatorDataY}
                    onChange={(e) => setCalculatorDataY(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                    placeholder="e.g., 2,4,6,8,10"
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <strong>Sample datasets to try:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Perfect positive: X: 1,2,3,4,5 Y: 2,4,6,8,10</li>
                      <li>• Strong negative: X: 1,2,3,4,5 Y: 10,8,6,4,2</li>
                      <li>• No correlation: X: 1,2,3,4,5 Y: 3,7,2,9,5</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#58595b]">Calculation Results:</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-[#ff8200] mb-2">
                    r = {isNaN(calculatorR) ? '---' : (calculatorR >= 0 ? '+' : '') + calculatorR.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-600">Correlation Coefficient</div>
                </div>
                
                {!isNaN(calculatorR) && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border">
                      <div className="font-semibold text-gray-700 mb-2">Interpretation:</div>
                      <div className="text-gray-600 text-sm">
                        {interpretCorrelation(calculatorR)}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="font-semibold text-gray-700 mb-2">Practical Meaning:</div>
                      <div className="text-gray-600 text-sm">
                        {Math.abs(calculatorR) > 0.7 ? 'Strong predictive relationship - one variable is a good predictor of the other.' :
                         Math.abs(calculatorR) > 0.3 ? 'Moderate relationship - variables are related but with substantial individual variation.' :
                         'Weak or no relationship - variables provide little predictive value for each other.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Correlation Examples</h2>
          
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
                r = {example.correlationValue}
              </button>
            ))}
          </div>

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedCorrExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedCorrExample.context}</p>
            </div>

            {/* Correlation Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#ff8200] mb-2">
                  r = {selectedCorrExample.correlationValue > 0 ? '+' : ''}{selectedCorrExample.correlationValue}
                </div>
                <div className="text-lg font-semibold text-gray-700">{selectedCorrExample.strengthDescription}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-700 mb-2">Sample Data Points:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedCorrExample.data.slice(0, 6).map((point, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded text-center">
                        ({point.x}, {point.y})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-700 mb-2">Visual Pattern:</h4>
                  <p className="text-gray-600 text-sm">{selectedCorrExample.visualDescription}</p>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🔍 Statistical Interpretation</h4>
                <p className="text-blue-600 text-sm">{selectedCorrExample.interpretation}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">💼 Practical Meaning</h4>
                <p className="text-green-600 text-sm">{selectedCorrExample.practicalMeaning}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Properties */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔑 Key Properties of Correlation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📏 Scale Independence</h4>
                <p className="text-blue-600 text-sm">
                  Correlation is unitless - changing from inches to centimeters or dollars to euros doesn't change r. 
                  This makes it perfect for comparing relationships across different measurement scales.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">📐 Linear Relationships Only</h4>
                <p className="text-green-600 text-sm">
                  Correlation measures only linear relationships. Variables with strong curved relationships 
                  might have low correlation coefficients - always look at scatterplots first!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">⚠️ Outlier Sensitivity</h4>
                <p className="text-purple-600 text-sm">
                  Single extreme points can dramatically change correlation values. Always check for outliers 
                  and consider their impact on your interpretation.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">🚫 Not Causation</h4>
                <p className="text-orange-600 text-sm">
                  High correlation doesn't prove causation! Ice cream sales and drowning incidents are correlated, 
                  but ice cream doesn't cause drowning - both increase in summer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Correlation Coefficient Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interpret correlation coefficients accurately</li>
                <li>• Classify relationship strength</li>
                <li>• Apply correlation in real-world contexts</li>
                <li>• Make professional statistical decisions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Correlation interpretation fluency</li>
                <li>• Strength classification accuracy</li>
                <li>• Professional statistical communication</li>
                <li>• Evidence-based decision making</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Correlation Coefficients
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
