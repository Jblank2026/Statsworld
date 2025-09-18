"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface CausationExample {
  name: string;
  scenario: string;
  correlation: string;
  relationship: 'causal' | 'confounding' | 'coincidental' | 'reverse';
  explanation: string;
  thirdVariable?: string;
  whyMisleading: string;
  correctInterpretation: string;
}

interface Challenge {
  id: number;
  scenario: string;
  correlation: string;
  questionType: 'causation' | 'confounding' | 'interpretation' | 'design';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function CorrelationCausation() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: CausationExample[] = [
    {
      name: "Ice Cream & Drowning",
      scenario: "Strong positive correlation between ice cream sales and drowning incidents",
      correlation: "r = +0.87 (very strong positive)",
      relationship: 'confounding',
      explanation: "Ice cream doesn't cause drowning! Both increase during hot summer weather.",
      thirdVariable: "Temperature/Season",
      whyMisleading: "People assume ice cream consumption somehow leads to drowning risk",
      correctInterpretation: "Both variables are caused by a third factor (hot weather) that increases both ice cream sales and swimming activity"
    },
    {
      name: "Education & Income",
      scenario: "Positive correlation between years of education and lifetime earnings",
      correlation: "r = +0.65 (strong positive)",
      relationship: 'causal',
      explanation: "Education likely does cause higher income through increased skills and opportunities.",
      whyMisleading: "While not the only factor, education genuinely develops marketable skills",
      correctInterpretation: "Education is a genuine causal factor, though other variables (family background, personal drive) also matter"
    },
    {
      name: "Shoe Size & Reading Ability",
      scenario: "Positive correlation between shoe size and reading test scores in children",
      correlation: "r = +0.73 (strong positive)",
      relationship: 'confounding',
      explanation: "Larger feet don't make you smarter! Both increase as children get older.",
      thirdVariable: "Age",
      whyMisleading: "The correlation suggests foot size affects intelligence",
      correctInterpretation: "Age is the true cause - older children have both larger feet and better reading skills"
    },
    {
      name: "Exercise & Heart Health",
      scenario: "Negative correlation between weekly exercise hours and resting heart rate",
      correlation: "r = -0.82 (strong negative)",
      relationship: 'causal',
      explanation: "Exercise training actually does strengthen the heart and lower resting heart rate.",
      whyMisleading: "This is one case where the correlation likely reflects true causation",
      correctInterpretation: "Regular exercise causes physiological adaptations that improve cardiovascular fitness"
    },
    {
      name: "Fire Damage & Firefighters",
      scenario: "Positive correlation between number of firefighters at a scene and property damage",
      correlation: "r = +0.71 (strong positive)",
      relationship: 'reverse',
      explanation: "Firefighters don't cause damage! Bigger fires require more firefighters AND cause more damage.",
      whyMisleading: "More firefighters appears to lead to more damage",
      correctInterpretation: "Fire severity is the true cause - it determines both the number of firefighters needed and the amount of damage"
    },
    {
      name: "Organic Food & Health",
      scenario: "Positive correlation between organic food purchases and better health outcomes",
      correlation: "r = +0.58 (moderate positive)",
      relationship: 'confounding',
      explanation: "Organic food buyers tend to be wealthier and health-conscious in many ways.",
      thirdVariable: "Socioeconomic status & health consciousness",
      whyMisleading: "Suggests organic food itself is the key to better health",
      correctInterpretation: "Wealth and health consciousness drive both organic food purchases and other healthy behaviors (exercise, healthcare access, etc.)"
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Coffee Consumption & Productivity",
      correlation: "Strong positive correlation (r = 0.78) between daily coffee consumption and work productivity ratings",
      questionType: 'causation',
      question: "What can we conclude about the relationship between coffee and productivity?",
      options: [
        "Coffee directly causes increased productivity",
        "Higher productivity causes people to drink more coffee",
        "Correlation suggests association but doesn't prove causation",
        "The correlation is too strong to be anything but causal"
      ],
      correctAnswer: "Correlation suggests association but doesn't prove causation",
      explanation: "Even very strong correlations don't prove causation. Other factors might explain this relationship: motivated people might drink more coffee AND be more productive, or productive people might work longer hours requiring more caffeine.",
      skillFocus: "Distinguishing between correlation and causation regardless of correlation strength"
    },
    {
      id: 2,
      scenario: "Screen Time & Sleep Quality",
      correlation: "Negative correlation (r = -0.64) between daily screen time before bed and sleep quality ratings",
      questionType: 'confounding',
      question: "What third variable might explain this correlation?",
      options: [
        "Age - older people use screens less and sleep better",
        "Stress levels - stressed people use screens more and sleep worse",
        "Income - wealthy people have better sleep environments",
        "Gender - men and women have different screen habits"
      ],
      correctAnswer: "Stress levels - stressed people use screens more and sleep worse",
      explanation: "Stress is a plausible confounding variable that could cause both increased screen time (seeking distraction) and poor sleep quality (anxiety, racing thoughts). This makes the correlation misleading about direct causation.",
      skillFocus: "Identifying plausible confounding variables that could create spurious correlations"
    },
    {
      id: 3,
      scenario: "Hospital Size & Patient Deaths",
      correlation: "Positive correlation (r = 0.69) between hospital size (number of beds) and total annual patient deaths",
      questionType: 'interpretation',
      question: "What's the most reasonable interpretation of this correlation?",
      options: [
        "Larger hospitals provide worse care, causing more deaths",
        "Larger hospitals treat more patients, naturally leading to more total deaths",
        "Hospital size directly causes patient mortality",
        "The data must contain errors because this correlation is impossible"
      ],
      correctAnswer: "Larger hospitals treat more patients, naturally leading to more total deaths",
      explanation: "This is a classic example where the correlation is explained by scale, not causation. Larger hospitals handle more cases (including more severe ones), so they naturally have more total deaths even if their death rates per patient are actually lower.",
      skillFocus: "Recognizing when correlations reflect scale or volume rather than causal relationships"
    },
    {
      id: 4,
      scenario: "Smoking Cessation Programs",
      correlation: "Strong negative correlation (r = -0.83) between participation in a smoking cessation program and lung cancer rates",
      questionType: 'design',
      question: "To establish causation, what type of study would be most convincing?",
      options: [
        "Survey more people to get a larger correlation",
        "Randomized controlled trial assigning people to program vs. control group",
        "Collect data over a longer time period",
        "Study different types of cessation programs"
      ],
      correctAnswer: "Randomized controlled trial assigning people to program vs. control group",
      explanation: "Randomized controlled trials are the gold standard for establishing causation because they control for confounding variables. Random assignment ensures that motivated/health-conscious people aren't systematically placed in one group, isolating the true effect of the program.",
      skillFocus: "Understanding experimental design requirements for establishing causal relationships"
    },
    {
      id: 5,
      scenario: "Vitamin Supplements & Energy Levels",
      correlation: "Moderate positive correlation (r = 0.52) between vitamin supplement use and self-reported energy levels",
      questionType: 'confounding',
      question: "Why might this correlation be misleading about vitamin effectiveness?",
      options: [
        "People who take vitamins may be more health-conscious overall",
        "The correlation isn't strong enough to be meaningful",
        "Self-reported energy is too subjective to measure",
        "Vitamins only work for people with deficiencies"
      ],
      correctAnswer: "People who take vitamins may be more health-conscious overall",
      explanation: "People who take vitamins often engage in many healthy behaviors (better diet, more exercise, better sleep habits). These other behaviors, not the vitamins themselves, might be the real cause of higher energy levels.",
      skillFocus: "Recognizing how self-selection bias creates confounding in observational studies"
    },
    {
      id: 6,
      scenario: "Social Media & Depression",
      correlation: "Positive correlation (r = 0.41) between hours spent on social media and depression scores in teenagers",
      questionType: 'interpretation',
      question: "What's the most scientifically cautious conclusion?",
      options: [
        "Social media causes depression in teenagers",
        "Depressed teenagers use social media more as coping mechanism",
        "There's an association that warrants further investigation",
        "Parents should immediately ban social media use"
      ],
      correctAnswer: "There's an association that warrants further investigation",
      explanation: "The relationship could run either direction (social media → depression OR depression → social media use) or involve confounding factors (loneliness, family problems). More research with better designs is needed to understand the true relationship.",
      skillFocus: "Making appropriately cautious interpretations when causation is unclear"
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
                <h1 className="text-2xl font-bold text-[#58595b]">Causation Detective</h1>
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
                🔍 {currentChallengeData.scenario}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Observed Correlation:</h4>
                  <p className="text-gray-600 italic">{currentChallengeData.correlation}</p>
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
              {score >= 5 ? 'Causation Detective Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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

  const selectedCausationExample = examples[selectedExample];

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
              <span role="img" aria-label="correlation vs causation" className="text-4xl">🚫</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Correlation vs Causation</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the most important distinction in statistics! Learn to separate association from causation and avoid the trap that catches even professionals.
              </p>
            </div>
          </div>
        </div>

        {/* The Golden Rule */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🏆 The Golden Rule of Statistics</h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-700 mb-4">
                  CORRELATION ≠ CAUSATION
                </h3>
                <p className="text-xl text-red-600 mb-4">
                  "Just because two things are related doesn't mean one causes the other!"
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-red-500 text-sm italic">
                    This single principle will save you from more statistical errors than any other concept in this course.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">📊 What Correlation Shows</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• Variables change together</li>
                  <li>• Statistical association exists</li>
                  <li>• Pattern in the relationship</li>
                  <li>• Predictive value</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">⚡ What Causation Means</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• One variable directly influences another</li>
                  <li>• Change in X produces change in Y</li>
                  <li>• Mechanism of influence exists</li>
                  <li>• Intervention would work</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">🔍 Why They're Different</h4>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• Many correlations aren't causal</li>
                  <li>• Third variables create false links</li>
                  <li>• Direction can be unclear</li>
                  <li>• Coincidences happen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Non-Causal Correlations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🕵️ Types of Misleading Correlations</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Confounding Variables */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-orange-700 mb-4">🔄 Confounding Variables</h3>
                <div className="space-y-3">
                  <p className="text-orange-600 text-sm">
                    A third variable causes both X and Y, creating a false appearance of direct relationship.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <strong className="text-orange-700">Example:</strong> Ice cream sales ↔ Drowning incidents
                    <br />
                    <small className="text-gray-600">Real cause: Hot weather increases both</small>
                  </div>
                  <div className="text-center text-orange-600">
                    <div className="font-mono text-sm">
                      Third Variable → X<br />
                      Third Variable → Y<br />
                      <span className="text-red-500">X ↔ Y (false link)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reverse Causation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">↩️ Reverse Causation</h3>
                <div className="space-y-3">
                  <p className="text-blue-600 text-sm">
                    The direction of causation is opposite to what it appears - Y actually causes X, not X causes Y.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <strong className="text-blue-700">Example:</strong> Firefighters ↔ Fire damage
                    <br />
                    <small className="text-gray-600">Reality: Big fires require more firefighters</small>
                  </div>
                  <div className="text-center text-blue-600">
                    <div className="font-mono text-sm">
                      X ← Y (true direction)<br />
                      <span className="text-red-500">X → Y (assumed direction)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spurious Correlation */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">🎲 Spurious Correlation</h3>
                <div className="space-y-3">
                  <p className="text-purple-600 text-sm">
                    Pure coincidence - two unrelated variables happen to change together by random chance.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <strong className="text-purple-700">Example:</strong> Nicolas Cage movies ↔ Pool drownings
                    <br />
                    <small className="text-gray-600">Just a coincidental statistical pattern</small>
                  </div>
                  <div className="text-center text-purple-600">
                    <div className="font-mono text-sm">
                      X ↔ Y<br />
                      <span className="text-red-500">(Pure coincidence)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bidirectional Causation */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">↔️ Bidirectional Causation</h3>
                <div className="space-y-3">
                  <p className="text-green-600 text-sm">
                    Both variables influence each other, creating a feedback loop that strengthens the correlation.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <strong className="text-green-700">Example:</strong> Exercise ↔ Energy levels
                    <br />
                    <small className="text-gray-600">Exercise boosts energy, high energy enables more exercise</small>
                  </div>
                  <div className="text-center text-green-600">
                    <div className="font-mono text-sm">
                      X → Y<br />
                      Y → X<br />
                      <span className="text-green-500">(Mutual influence)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real-World Examples</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedCausationExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedCausationExample.scenario}</p>
            </div>

            {/* Correlation Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">📊 Observed Correlation:</h4>
                  <div className="bg-white p-3 rounded border font-mono text-[#ff8200]">
                    {selectedCausationExample.correlation}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">🔍 Relationship Type:</h4>
                  <div className={`bg-white p-3 rounded border font-bold capitalize ${
                    selectedCausationExample.relationship === 'causal' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedCausationExample.relationship === 'causal' ? '✅ Likely Causal' : '❌ Not Causal'}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">💡 What's Really Happening</h4>
                <p className="text-blue-600 text-sm">{selectedCausationExample.explanation}</p>
                {selectedCausationExample.thirdVariable && (
                  <div className="mt-2 bg-white p-2 rounded border">
                    <strong className="text-blue-700">Third Variable:</strong> {selectedCausationExample.thirdVariable}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-700 mb-2">⚠️ Why It's Misleading</h4>
                  <p className="text-red-600 text-sm">{selectedCausationExample.whyMisleading}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-700 mb-2">✅ Correct Interpretation</h4>
                  <p className="text-green-600 text-sm">{selectedCausationExample.correctInterpretation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Establish Causation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧪 How to Establish Causation</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-700 mb-3">🏆 The Gold Standard: Randomized Controlled Trials (RCTs)</h3>
              <p className="text-yellow-600 mb-4">
                Random assignment to treatment/control groups eliminates confounding variables and allows causal conclusions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <strong className="text-yellow-700">Random Assignment:</strong> Eliminates selection bias
                </div>
                <div className="bg-white p-3 rounded">
                  <strong className="text-yellow-700">Control Group:</strong> Shows what would happen without treatment
                </div>
                <div className="bg-white p-3 rounded">
                  <strong className="text-yellow-700">Manipulation:</strong> Researcher controls the "cause"
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-3">📋 Bradford Hill Criteria (for observational studies)</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• <strong>Strength:</strong> Strong correlation</li>
                  <li>• <strong>Consistency:</strong> Replicated across studies</li>
                  <li>• <strong>Temporality:</strong> Cause precedes effect</li>
                  <li>• <strong>Gradient:</strong> Dose-response relationship</li>
                  <li>• <strong>Plausibility:</strong> Biological mechanism makes sense</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-3">🔍 Additional Evidence Types</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• <strong>Natural Experiments:</strong> Random-like assignment by nature</li>
                  <li>• <strong>Longitudinal Studies:</strong> Follow people over time</li>
                  <li>• <strong>Instrumental Variables:</strong> Statistical techniques for confounding</li>
                  <li>• <strong>Meta-Analysis:</strong> Combining multiple studies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🚩 Red Flags: When to Be Suspicious</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">⚠️ Language Red Flags</h4>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• "Studies show X causes Y"</li>
                  <li>• "X leads to Y" (from correlational data)</li>
                  <li>• "Because of X, Y happens"</li>
                  <li>• "X is responsible for Y"</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">📊 Study Design Red Flags</h4>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• Cross-sectional surveys (one time point)</li>
                  <li>• Self-selected groups</li>
                  <li>• No control group</li>
                  <li>• Observational data only</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-700 mb-2">🤔 Context Red Flags</h4>
                <ul className="text-yellow-600 text-sm space-y-1">
                  <li>• Correlation seems too perfect</li>
                  <li>• No plausible mechanism</li>
                  <li>• Contradicts other research</li>
                  <li>• Financially motivated conclusions</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">✅ Safer Language</h4>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• "X is associated with Y"</li>
                  <li>• "X correlates with Y"</li>
                  <li>• "X and Y are related"</li>
                  <li>• "More research is needed"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Causation Detective Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze correlation scenarios critically</li>
                <li>• Identify confounding variables</li>
                <li>• Distinguish correlation from causation</li>
                <li>• Make evidence-based interpretations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Critical thinking about research claims</li>
                <li>• Confounding variable identification</li>
                <li>• Scientific interpretation skills</li>
                <li>• Media literacy for statistics</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Become a Causation Detective
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
