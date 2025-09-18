"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Example {
  id: number;
  scenario: string;
  description: string;
  question: string;
  population: string;
  sample: string;
  parameter: string;
  statistic: string;
  explanation: string;
}

export default function PopulationsSamples() {
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({
    population: '',
    sample: '',
    parameter: '',
    statistic: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: Example[] = [
    {
      id: 1,
      scenario: "UT Dining Survey",
      description: "Researchers want to understand UT students' thoughts on campus dining. They survey 100 randomly selected UT students and find that 60% say they like the dining options.",
      question: "Identify the population, sample, parameter, and statistic in this study:",
      population: "All UT students",
      sample: "100 randomly selected UT students",
      parameter: "True proportion of all UT students who like dining",
      statistic: "60% of the surveyed students who like dining",
      explanation: "The population is everyone we want to know about (all UT students). The sample is who we actually asked (100 students). The parameter is the true unknown fact about all students, while the statistic (60%) is what we calculated from our sample."
    },
    {
      id: 2,
      scenario: "Netflix Viewing Habits",
      description: "Netflix wants to know the average hours per week that US subscribers watch content. They analyze data from 5,000 randomly selected US accounts and find an average of 12.3 hours per week.",
      question: "Identify the population, sample, parameter, and statistic:",
      population: "All US Netflix subscribers",
      sample: "5,000 randomly selected US Netflix accounts",
      parameter: "True average weekly viewing hours for all US subscribers",
      statistic: "12.3 hours per week (from the 5,000 accounts)",
      explanation: "We want to know about all US Netflix users (population), but we only studied 5,000 accounts (sample). The true average for everyone is the parameter, while 12.3 hours is our sample statistic that estimates it."
    },
    {
      id: 3,
      scenario: "Social Media Usage Study",
      description: "A researcher studies smartphone addiction among college students. They survey 200 students from various universities and find that 78% check their phones more than 50 times per day.",
      question: "Identify the population, sample, parameter, and statistic:",
      population: "All college students",
      sample: "200 surveyed college students",
      parameter: "True percentage of all college students who check phones 50+ times daily",
      statistic: "78% of surveyed students who check phones 50+ times daily",
      explanation: "The population includes all college students everywhere. Our sample is the 200 we actually surveyed. The parameter is the unknown truth about all college students, while 78% is our sample statistic."
    },
    {
      id: 4,
      scenario: "Election Polling",
      description: "A polling company wants to predict the outcome of a mayoral election. They call 800 likely voters and find that 52% plan to vote for Candidate A.",
      question: "Identify the population, sample, parameter, and statistic:",
      population: "All likely voters in the election",
      sample: "800 likely voters who were called",
      parameter: "True percentage of all likely voters who will vote for Candidate A",
      statistic: "52% of the 800 polled voters who plan to vote for Candidate A",
      explanation: "We want to know how all likely voters will vote (population), but we only asked 800 people (sample). The true election outcome is the parameter, while our 52% finding is the statistic."
    },
    {
      id: 5,
      scenario: "Product Quality Control",
      description: "A smartphone manufacturer wants to know the defect rate for their latest model. They test 500 phones from the production line and find that 3% have defects.",
      question: "Identify the population, sample, parameter, and statistic:",
      population: "All phones of this model produced",
      sample: "500 phones tested from the production line",
      parameter: "True defect rate for all phones of this model",
      statistic: "3% defect rate found in the 500 tested phones",
      explanation: "The population is all phones of this model that are or will be produced. The sample is the 500 phones actually tested. The parameter is the true quality of all phones, while 3% is our sample statistic."
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentExample(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswers({
      population: '',
      sample: '',
      parameter: '',
      statistic: ''
    });
  };

  const handleSubmit = () => {
    const example = examples[currentExample];
    let correctCount = 0;
    
    if (selectedAnswers.population === example.population) correctCount++;
    if (selectedAnswers.sample === example.sample) correctCount++;
    if (selectedAnswers.parameter === example.parameter) correctCount++;
    if (selectedAnswers.statistic === example.statistic) correctCount++;
    
    if (correctCount >= 3) {
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
      if (currentExample < examples.length - 1) {
        setCurrentExample(prev => prev + 1);
        setSelectedAnswers({
          population: '',
          sample: '',
          parameter: '',
          statistic: ''
        });
      } else {
        setGameEnded(true);
      }
    }, 4000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentExample(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswers({
      population: '',
      sample: '',
      parameter: '',
      statistic: ''
    });
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
                <span role="img" aria-label="populations and samples" className="text-4xl">👥</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">Populations & Samples</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Learn the crucial difference between populations and samples, and understand parameters vs statistics!
                </p>
              </div>
            </div>
          </div>

          {/* Learning Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">Key Concepts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-[#ff8200] pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">🌍 Population</h3>
                <p className="text-gray-600 mb-2">
                  The <strong>entire group</strong> of people or things you want to study.
                </p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> All UT students (if studying UT student opinions)
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">👨‍👩‍👧‍👦 Sample</h3>
                <p className="text-gray-600 mb-2">
                  A <strong>subset</strong> of the population that you actually study.
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> 100 randomly selected UT students
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📏 Parameter</h3>
                <p className="text-gray-600 mb-2">
                  A <strong>true fact</strong> about the population (usually unknown).
                </p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> The true percentage of all UT students who like dining
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Statistic</h3>
                <p className="text-gray-600 mb-2">
                  An <strong>estimate</strong> calculated from your sample data.
                </p>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> 60% of the 100 surveyed students like dining
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-[#58595b] mb-2">Key Insight</h4>
                  <p className="text-gray-700">
                    We use <strong>statistics</strong> (from samples) to estimate <strong>parameters</strong> (about populations) 
                    because we usually can't study everyone! The sample statistic is our best guess about the population parameter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Structure Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">📋 Data Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-[#ff8200] pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📝 Rows (Who's)</h3>
                <p className="text-gray-600 mb-2">
                  Each row represents one <strong>observation</strong> or <strong>individual</strong> in your study.
                </p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> Each row = one student surveyed
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Columns (What's)</h3>
                <p className="text-gray-600 mb-2">
                  Each column represents one <strong>variable</strong> or piece of information collected.
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> Age, Major, Dining Opinion, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Population vs Sample Challenge</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Read real research scenarios</li>
                  <li>• Identify population, sample, parameter, and statistic</li>
                  <li>• Match each concept to the correct description</li>
                  <li>• Get 3 out of 4 correct to earn points</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Learning Goals</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Distinguish populations from samples</li>
                  <li>• Recognize parameters vs statistics</li>
                  <li>• Apply concepts to real scenarios</li>
                  <li>• Understand data structure basics</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
              >
                Start Challenge
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
              {score >= 4 ? '🎉' : score >= 3 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 4 ? 'Population Expert!' : score >= 3 ? 'Great Work!' : 'Keep Practicing!'}
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {examples.length}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {Math.round((score / examples.length) * 100)}%
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

  const currentExampleData = examples[currentExample];

  const options = [
    currentExampleData.population,
    currentExampleData.sample,
    currentExampleData.parameter,
    currentExampleData.statistic,
    "Not applicable to this scenario",
    "Cannot be determined from the information given"
  ];

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
              <h1 className="text-2xl font-bold text-[#58595b]">Population vs Sample Challenge</h1>
              <p className="text-gray-600">Scenario {currentExample + 1} of {examples.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExample + 1) / examples.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#58595b] mb-4">
              📊 {currentExampleData.scenario}
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">{currentExampleData.description}</p>
              <div className="border-l-4 border-[#ff8200] pl-4">
                <p className="font-medium text-[#58595b]">{currentExampleData.question}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Population */}
            <div className="border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-[#58595b] mb-3">🌍 Population</h3>
              <select
                value={selectedAnswers.population}
                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, population: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select the population...</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Sample */}
            <div className="border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-[#58595b] mb-3">👨‍👩‍👧‍👦 Sample</h3>
              <select
                value={selectedAnswers.sample}
                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, sample: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select the sample...</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Parameter */}
            <div className="border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-[#58595b] mb-3">📏 Parameter</h3>
              <select
                value={selectedAnswers.parameter}
                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, parameter: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select the parameter...</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Statistic */}
            <div className="border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-[#58595b] mb-3">📊 Statistic</h3>
              <select
                value={selectedAnswers.statistic}
                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, statistic: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select the statistic...</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswers.population || !selectedAnswers.sample || !selectedAnswers.parameter || !selectedAnswers.statistic || showFeedback}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !selectedAnswers.population || !selectedAnswers.sample || !selectedAnswers.parameter || !selectedAnswers.statistic || showFeedback
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#ff8200] hover:bg-[#ff9933] text-white'
              }`}
            >
              Submit Answers
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
                    let correctCount = 0;
                    if (selectedAnswers.population === currentExampleData.population) correctCount++;
                    if (selectedAnswers.sample === currentExampleData.sample) correctCount++;
                    if (selectedAnswers.parameter === currentExampleData.parameter) correctCount++;
                    if (selectedAnswers.statistic === currentExampleData.statistic) correctCount++;
                    return correctCount >= 3 ? '✅' : '❌';
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                  Results
                </h3>
              </div>

              <div className="mb-6 space-y-2 text-sm">
                <div className={`p-2 rounded ${selectedAnswers.population === currentExampleData.population ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <strong>Population:</strong> {currentExampleData.population}
                </div>
                <div className={`p-2 rounded ${selectedAnswers.sample === currentExampleData.sample ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <strong>Sample:</strong> {currentExampleData.sample}
                </div>
                <div className={`p-2 rounded ${selectedAnswers.parameter === currentExampleData.parameter ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <strong>Parameter:</strong> {currentExampleData.parameter}
                </div>
                <div className={`p-2 rounded ${selectedAnswers.statistic === currentExampleData.statistic ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <strong>Statistic:</strong> {currentExampleData.statistic}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-sm">{currentExampleData.explanation}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">Next scenario in 4 seconds...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
