"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface RelationshipExample {
  name: string;
  context: string;
  direction: 'positive' | 'negative' | 'none';
  form: 'linear' | 'curved' | 'none';
  strength: 'strong' | 'moderate' | 'weak';
  description: string;
  realWorldMeaning: string;
  visualCues: string[];
}

interface Challenge {
  id: number;
  scenario: string;
  plotDescription: string;
  questionType: 'direction' | 'form' | 'strength' | 'overall';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
}

export default function DirectionFormStrength() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: RelationshipExample[] = [
    {
      name: "Strong Positive Linear",
      context: "Hours studied vs exam scores",
      direction: 'positive',
      form: 'linear',
      strength: 'strong',
      description: "As study hours increase, exam scores increase consistently in a straight-line pattern with little scatter.",
      realWorldMeaning: "More studying reliably leads to better performance. You can predict scores accurately from study time.",
      visualCues: ["Points trend clearly upward", "Points close to straight line", "Little scatter around pattern", "Predictable relationship"]
    },
    {
      name: "Strong Negative Linear", 
      context: "Car age vs resale value",
      direction: 'negative',
      form: 'linear',
      strength: 'strong',
      description: "As car age increases, resale value decreases consistently in a straight-line pattern with little scatter.",
      realWorldMeaning: "Cars depreciate predictably. Age is a reliable predictor of value loss.",
      visualCues: ["Points trend clearly downward", "Points close to straight line", "Consistent rate of decrease", "Strong predictive power"]
    },
    {
      name: "Moderate Positive Linear",
      context: "Height vs shoe size",
      direction: 'positive',
      form: 'linear',
      strength: 'moderate',
      description: "As height increases, shoe size tends to increase in a roughly linear pattern with moderate scatter.",
      realWorldMeaning: "Height gives a reasonable prediction of shoe size, but there's noticeable individual variation.",
      visualCues: ["General upward trend", "Some scatter around pattern", "Relationship visible but not perfect", "Moderate predictive ability"]
    },
    {
      name: "Weak Positive Linear",
      context: "Income vs happiness score",
      direction: 'positive',
      form: 'linear',
      strength: 'weak',
      description: "Higher income is slightly associated with higher happiness, but with lots of scatter and many exceptions.",
      realWorldMeaning: "Money has some association with happiness, but many other factors are more important.",
      visualCues: ["Slight upward trend", "Lots of scatter", "Many exceptions to pattern", "Low predictive power"]
    },
    {
      name: "Strong Curved Positive",
      context: "Years of experience vs salary (early career)",
      direction: 'positive',
      form: 'curved',
      strength: 'strong',
      description: "Salary increases rapidly at first with experience, then levels off, creating a curved upward pattern.",
      realWorldMeaning: "Experience has diminishing returns - early years bring big salary jumps, later years smaller increases.",
      visualCues: ["Clear upward curve", "Steep at beginning", "Levels off later", "Non-linear but predictable"]
    },
    {
      name: "No Relationship",
      context: "Student ID number vs GPA",
      direction: 'none',
      form: 'none', 
      strength: 'weak',
      description: "Points are randomly scattered with no discernible pattern or trend in any direction.",
      realWorldMeaning: "ID numbers are assigned arbitrarily and have no logical connection to academic performance.",
      visualCues: ["Random scatter", "No directional trend", "No pattern visible", "Zero predictive power"]
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Exercise Hours vs Resting Heart Rate",
      plotDescription: "Points show a clear downward trend from left to right, with people who exercise more having consistently lower resting heart rates",
      questionType: 'direction',
      question: "What is the direction of this relationship?",
      options: [
        "Positive - as exercise increases, heart rate increases",
        "Negative - as exercise increases, heart rate decreases",
        "No direction - exercise and heart rate are unrelated",
        "Cannot determine direction from this description"
      ],
      correctAnswer: "Negative - as exercise increases, heart rate decreases",
      explanation: "A downward trend indicates a negative relationship. More exercise is associated with lower (better) resting heart rates, which makes biological sense.",
      skillFocus: "Identifying negative relationships and understanding their real-world meaning"
    },
    {
      id: 2,
      scenario: "Temperature vs Ice Cream Sales",
      plotDescription: "Points follow a straight upward line very closely, with almost all points near the line and very little scatter",
      questionType: 'strength',
      question: "How would you describe the strength of this relationship?",
      options: [
        "Weak - lots of variability around the pattern",
        "Moderate - some scatter but pattern is visible",
        "Strong - points closely follow the pattern with little scatter",
        "No relationship - points are randomly distributed"
      ],
      correctAnswer: "Strong - points closely follow the pattern with little scatter",
      explanation: "When points are very close to the pattern line with minimal scatter, it indicates a strong relationship. Temperature is an excellent predictor of ice cream sales.",
      skillFocus: "Assessing relationship strength by evaluating scatter around the pattern"
    },
    {
      id: 3,
      scenario: "Age vs Reaction Time",
      plotDescription: "Points start low and gradually curve upward, with the rate of increase becoming steeper as age increases",
      questionType: 'form',
      question: "What is the form of this relationship?",
      options: [
        "Linear - points follow a straight line",
        "Curved - points follow a curved, non-linear pattern",
        "No form - points show no pattern",
        "Clustered - points form distinct groups"
      ],
      correctAnswer: "Curved - points follow a curved, non-linear pattern",
      explanation: "The description indicates an accelerating upward curve, not a straight line. Aging effects often accelerate over time, creating curved rather than linear relationships.",
      skillFocus: "Distinguishing between linear and curved relationship patterns"
    },
    {
      id: 4,
      scenario: "Advertising Spend vs Sales Revenue",
      plotDescription: "Points show a clear upward trend that closely follows a straight line with minimal deviation",
      questionType: 'overall',
      question: "How would you characterize this relationship overall?",
      options: [
        "Strong positive linear relationship",
        "Weak positive curved relationship",
        "Strong negative linear relationship",
        "Moderate positive relationship with outliers"
      ],
      correctAnswer: "Strong positive linear relationship",
      explanation: "The relationship has all three key characteristics: positive direction (upward), linear form (straight line), and strong strength (minimal deviation). This suggests advertising reliably drives sales.",
      skillFocus: "Integrating direction, form, and strength into a complete relationship description"
    },
    {
      id: 5,
      scenario: "Hours of Sleep vs Cognitive Performance",
      plotDescription: "Points form an inverted U-shape, with performance increasing up to about 7-8 hours then decreasing with more sleep",
      questionType: 'form',
      question: "What does this curved pattern suggest about sleep and performance?",
      options: [
        "More sleep always improves performance",
        "Less sleep always improves performance",
        "There's an optimal amount of sleep for peak performance",
        "Sleep and performance are unrelated"
      ],
      correctAnswer: "There's an optimal amount of sleep for peak performance",
      explanation: "An inverted U-shape indicates that moderate amounts (7-8 hours) optimize performance, while both too little and too much sleep hurt performance. This shows a non-linear relationship with an optimal point.",
      skillFocus: "Interpreting complex curved relationships and optimal points"
    },
    {
      id: 6,
      scenario: "Years of Education vs Lifetime Earnings",
      plotDescription: "Points show an upward trend but with considerable scatter, where the general pattern is visible but individual variation is substantial",
      questionType: 'strength',
      question: "What does the 'considerable scatter' tell us about this relationship?",
      options: [
        "Education perfectly predicts earnings",
        "Education has no effect on earnings",
        "Education influences earnings but other factors matter too",
        "The data contains measurement errors"
      ],
      correctAnswer: "Education influences earnings but other factors matter too",
      explanation: "Considerable scatter around an upward trend indicates a moderate relationship. Education matters for earnings, but individual variation suggests other factors (skills, opportunities, choices) also play important roles.",
      skillFocus: "Understanding how scatter relates to the influence of unmeasured factors"
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
                <h1 className="text-2xl font-bold text-[#58595b]">Relationship Analysis Expert</h1>
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
                  <h4 className="font-semibold text-gray-700 mb-2">Scatterplot Pattern:</h4>
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
              {score >= 5 ? 'Relationship Analysis Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
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

  const selectedRelExample = examples[selectedExample];

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
              <span role="img" aria-label="direction form strength" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Direction, Form & Strength</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the three fundamental characteristics of relationships! Learn to analyze and describe the key features of any scatterplot.
              </p>
            </div>
          </div>
        </div>

        {/* The Big Three Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 The Big Three Framework</h2>
          
          <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔑</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Your Complete Analysis Toolkit</h3>
                  <p className="text-yellow-600">
                    Every scatterplot relationship can be completely described using just three characteristics: 
                    Direction (which way?), Form (what shape?), and Strength (how close?). Master these three, 
                    and you can analyze any relationship like a pro!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Direction */}
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">1️⃣ Direction</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600 mb-2 text-center">📈 Positive</div>
                    <div className="text-sm text-gray-600 text-center">As X increases, Y increases</div>
                    <div className="text-xs text-green-600 mt-2 text-center italic">"Upward trend"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-red-600 mb-2 text-center">📉 Negative</div>
                    <div className="text-sm text-gray-600 text-center">As X increases, Y decreases</div>
                    <div className="text-xs text-red-600 mt-2 text-center italic">"Downward trend"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-gray-600 mb-2 text-center">➡️ None</div>
                    <div className="text-sm text-gray-600 text-center">No consistent direction</div>
                    <div className="text-xs text-gray-600 mt-2 text-center italic">"Random scatter"</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">2️⃣ Form</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-blue-600 mb-2 text-center">📏 Linear</div>
                    <div className="text-sm text-gray-600 text-center">Points follow straight line</div>
                    <div className="text-xs text-blue-600 mt-2 text-center italic">"Constant rate of change"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-purple-600 mb-2 text-center">🌙 Curved</div>
                    <div className="text-sm text-gray-600 text-center">Points follow curved pattern</div>
                    <div className="text-xs text-purple-600 mt-2 text-center italic">"Rate of change varies"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-gray-600 mb-2 text-center">❓ No Pattern</div>
                    <div className="text-sm text-gray-600 text-center">No clear shape</div>
                    <div className="text-xs text-gray-600 mt-2 text-center italic">"Random arrangement"</div>
                  </div>
                </div>
              </div>

              {/* Strength */}
              <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-700 mb-4 text-center">3️⃣ Strength</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600 mb-2 text-center">💪 Strong</div>
                    <div className="text-sm text-gray-600 text-center">Points close to pattern</div>
                    <div className="text-xs text-green-600 mt-2 text-center italic">"High predictability"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-orange-600 mb-2 text-center">👌 Moderate</div>
                    <div className="text-sm text-gray-600 text-center">Some scatter around pattern</div>
                    <div className="text-xs text-orange-600 mt-2 text-center italic">"Fair predictability"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-red-600 mb-2 text-center">🤏 Weak</div>
                    <div className="text-sm text-gray-600 text-center">Lots of scatter</div>
                    <div className="text-xs text-red-600 mt-2 text-center italic">"Low predictability"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Relationship Types in Action</h2>
          
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
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedRelExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedRelExample.context}</p>
            </div>

            {/* Characteristic Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h4 className="font-bold text-blue-700 mb-3">📊 Direction</h4>
                <div className={`text-2xl font-bold mb-2 capitalize ${
                  selectedRelExample.direction === 'positive' ? 'text-green-600' :
                  selectedRelExample.direction === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {selectedRelExample.direction === 'positive' ? '📈 Positive' :
                   selectedRelExample.direction === 'negative' ? '📉 Negative' : '➡️ None'}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedRelExample.direction === 'positive' ? 'Both variables increase together' :
                   selectedRelExample.direction === 'negative' ? 'One increases, other decreases' : 'No consistent pattern'}
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <h4 className="font-bold text-purple-700 mb-3">🎨 Form</h4>
                <div className={`text-2xl font-bold mb-2 capitalize ${
                  selectedRelExample.form === 'linear' ? 'text-blue-600' :
                  selectedRelExample.form === 'curved' ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {selectedRelExample.form === 'linear' ? '📏 Linear' :
                   selectedRelExample.form === 'curved' ? '🌙 Curved' : '❓ No Pattern'}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedRelExample.form === 'linear' ? 'Points follow straight line' :
                   selectedRelExample.form === 'curved' ? 'Points follow curved path' : 'No clear shape'}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <h4 className="font-bold text-orange-700 mb-3">💪 Strength</h4>
                <div className={`text-2xl font-bold mb-2 capitalize ${
                  selectedRelExample.strength === 'strong' ? 'text-green-600' :
                  selectedRelExample.strength === 'moderate' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {selectedRelExample.strength === 'strong' ? '💪 Strong' :
                   selectedRelExample.strength === 'moderate' ? '👌 Moderate' : '🤏 Weak'}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedRelExample.strength === 'strong' ? 'Points very close to pattern' :
                   selectedRelExample.strength === 'moderate' ? 'Some scatter around pattern' : 'Lots of scatter'}
                </div>
              </div>
            </div>

            {/* Description and Visual Cues */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">📖 Description</h4>
                <p className="text-gray-600">{selectedRelExample.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-700 mb-3">🔍 Visual Cues</h4>
                  <ul className="text-blue-600 text-sm space-y-1">
                    {selectedRelExample.visualCues.map((cue, index) => (
                      <li key={index}>• {cue}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-700 mb-3">🌍 Real-World Meaning</h4>
                  <p className="text-green-600 text-sm">{selectedRelExample.realWorldMeaning}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Decision Tree */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌳 Analysis Decision Tree</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">Step-by-Step Analysis Process:</h3>
              <div className="space-y-6">
                
                {/* Step 1: Direction */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-700 mb-3">Step 1: Determine Direction 📊</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-green-600">Ask:</strong> "As X increases, what happens to Y?"
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-orange-600">Look for:</strong> Overall trend in the cloud of points
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-purple-600">Ignore:</strong> Individual points that don't follow the trend
                    </div>
                  </div>
                </div>

                {/* Step 2: Form */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-700 mb-3">Step 2: Identify Form 🎨</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-blue-600">Linear:</strong> Could you draw a straight line through the pattern?
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-purple-600">Curved:</strong> Does the rate of change speed up or slow down?
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-gray-600">None:</strong> Is there any pattern at all?
                    </div>
                  </div>
                </div>

                {/* Step 3: Strength */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-700 mb-3">Step 3: Assess Strength 💪</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-green-600">Strong:</strong> Points hug the pattern line closely
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-orange-600">Moderate:</strong> Clear pattern with some scatter
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-red-600">Weak:</strong> Pattern barely visible through the scatter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Combinations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔄 Common Combinations You'll See</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">💪 Strong Relationships</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• <strong>Strong Positive Linear:</strong> Height vs Weight, Study Time vs Grades</li>
                  <li>• <strong>Strong Negative Linear:</strong> Car Age vs Value, Price vs Demand</li>
                  <li>• <strong>Strong Curved:</strong> Bacteria Growth, Compound Interest</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-2">👌 Moderate Relationships</h4>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• <strong>Moderate Positive:</strong> Education vs Income, Exercise vs Health</li>
                  <li>• <strong>Moderate Negative:</strong> TV Time vs Grades, Stress vs Performance</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">🤏 Weak Relationships</h4>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>• <strong>Weak Positive:</strong> Income vs Happiness (many exceptions)</li>
                  <li>• <strong>Weak Negative:</strong> Class Size vs Learning (many other factors)</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-700 mb-2">❌ No Relationship</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Random Patterns:</strong> Phone Number vs GPA, Shoe Size vs IQ</li>
                  <li>• <strong>Artificial Variables:</strong> ID Numbers vs Performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Direction, Form & Strength Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze scatterplot relationships systematically</li>
                <li>• Identify direction, form, and strength</li>
                <li>• Practice with diverse real-world examples</li>
                <li>• Build pattern recognition skills</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Skills You'll Master</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Complete relationship characterization</li>
                <li>• Professional data interpretation</li>
                <li>• Visual pattern analysis</li>
                <li>• Statistical communication skills</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Relationship Analysis
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
