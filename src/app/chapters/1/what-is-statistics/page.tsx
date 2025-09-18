"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  statisticalConcept: string;
}

export default function WhatIsStatistics() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Netflix Recommendations",
      description: "Netflix tracks what shows you watch, when you pause, and what you skip to recommend new content.",
      question: "How is Netflix using statistics here?",
      options: [
        "To make random suggestions",
        "To measure and understand viewing variation patterns",
        "To count total users only",
        "To display pretty charts"
      ],
      correctAnswer: "To measure and understand viewing variation patterns",
      explanation: "Netflix measures variation in viewing patterns (what different people watch, when they stop watching) to understand preferences and reduce uncertainty in recommendations!",
      statisticalConcept: "Measuring and Understanding Variation"
    },
    {
      id: 2,
      title: "Weather Forecasting",
      description: "Meteorologists collect temperature, humidity, and pressure data from thousands of stations to predict tomorrow's weather.",
      question: "What is the main statistical goal here?",
      options: [
        "To collect as much data as possible",
        "To reduce variation and adapt to weather uncertainty",
        "To create complex mathematical formulas",
        "To compete with other weather services"
      ],
      correctAnswer: "To reduce variation and adapt to weather uncertainty",
      explanation: "Weather forecasting uses statistics to reduce uncertainty about future conditions by understanding patterns in atmospheric variation. They can't control the weather, but they can adapt predictions to it!",
      statisticalConcept: "Reducing and Adapting to Variation"
    },
    {
      id: 3,
      title: "Quality Control in Manufacturing",
      description: "A smartphone factory tests random phones from each production batch to ensure they meet quality standards.",
      question: "Which statistical principle is most important here?",
      options: [
        "Testing every single phone produced",
        "Measuring variation in product quality",
        "Using the most expensive testing equipment",
        "Hiring more quality inspectors"
      ],
      correctAnswer: "Measuring variation in product quality",
      explanation: "Quality control is all about measuring variation! By understanding how much phones vary in quality, manufacturers can identify problems and maintain consistent standards.",
      statisticalConcept: "Measuring Variation"
    },
    {
      id: 4,
      title: "Medical Drug Trials",
      description: "Researchers test a new medication on 1,000 patients to see if it's more effective than existing treatments.",
      question: "What is statistics helping us do in this context?",
      options: [
        "Prove the drug works for everyone",
        "Understand treatment variation and reduce uncertainty about effectiveness",
        "Make the drug cheaper to produce",
        "Speed up the approval process"
      ],
      correctAnswer: "Understand treatment variation and reduce uncertainty about effectiveness",
      explanation: "Drug trials use statistics to understand how treatment effects vary across different patients and reduce uncertainty about whether the drug actually works better than alternatives!",
      statisticalConcept: "Understanding Variation and Reducing Uncertainty"
    },
    {
      id: 5,
      title: "Social Media Engagement",
      description: "TikTok analyzes when users scroll past videos vs. watch them completely to improve their algorithm.",
      question: "How does this relate to the core purpose of statistics?",
      options: [
        "It helps count total video views",
        "It measures engagement variation to understand user preferences",
        "It makes videos load faster",
        "It reduces server costs"
      ],
      correctAnswer: "It measures engagement variation to understand user preferences",
      explanation: "TikTok measures variation in user engagement (how long different people watch different types of content) to understand what captures attention and adapt their algorithm accordingly!",
      statisticalConcept: "Measuring and Understanding Variation"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentScenario(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  const handleSubmit = () => {
    const scenario = scenarios[currentScenario];
    const isCorrect = selectedAnswer === scenario.correctAnswer;
    
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
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setGameEnded(true);
      }
    }, 3000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentScenario(0);
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
                <span role="img" aria-label="statistics" className="text-4xl">📈</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#58595b]">What is Statistics?</h1>
                <p className="text-xl text-gray-600 mt-2">
                  Discover how statistics helps us understand the world through measuring, understanding, and adapting to variation!
                </p>
              </div>
            </div>
          </div>

          {/* Learning Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">Key Concepts</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-[#ff8200] pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 What is Statistics?</h3>
                <p className="text-gray-600">
                  <strong>Statistics (noun):</strong> Numbers, values, data, and calculations used to understand the world.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">🎯 The Core Mission</h3>
                <p className="text-gray-600 mb-3">Statistics is fundamentally about three things:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Measuring variation:</strong> Quantifying how things differ</li>
                  <li><strong>Understanding variation:</strong> Finding patterns in the differences</li>
                  <li><strong>Reducing or adapting to variation:</strong> Making better decisions despite uncertainty</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Why Context Matters</h3>
                <p className="text-gray-600">
                  <strong>All data needs context!</strong> Numbers alone don't tell the story - we need to understand 
                  what they represent, how they were collected, and what they mean in the real world.
                </p>
              </div>
            </div>
          </div>

          {/* Game Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Statistics in Action Challenge</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">How to Play</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Read real-world scenarios</li>
                  <li>• Identify how statistics is being used</li>
                  <li>• Connect scenarios to the three core purposes</li>
                  <li>• Earn points for correct answers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#58595b] mb-4">Learning Objectives</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Recognize statistics in everyday situations</li>
                  <li>• Understand the three purposes of statistics</li>
                  <li>• Connect theory to real-world applications</li>
                  <li>• Develop statistical thinking</li>
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
              {score >= 4 ? 'Statistical Superstar!' : score >= 3 ? 'Great Job!' : 'Keep Learning!'}
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {scenarios.length}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {Math.round((score / scenarios.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Play Again
              </button>
              <Link
                href="/chapters/1"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Back to Chapter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentScenarioData = scenarios[currentScenario];

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
              <h1 className="text-2xl font-bold text-[#58595b]">Statistics in Action Challenge</h1>
              <p className="text-gray-600">Scenario {currentScenario + 1} of {scenarios.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#58595b] mb-4">
              📊 {currentScenarioData.title}
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">{currentScenarioData.description}</p>
              <div className="border-l-4 border-[#ff8200] pl-4">
                <p className="font-medium text-[#58595b]">{currentScenarioData.question}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {currentScenarioData.options.map((option) => (
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
            <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">
                  {selectedAnswer === currentScenarioData.correctAnswer ? '✅' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                  {selectedAnswer === currentScenarioData.correctAnswer ? 'Correct!' : 'Not Quite'}
                </h3>
                <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  {currentScenarioData.statisticalConcept}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-sm">{currentScenarioData.explanation}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">Next scenario in 3 seconds...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
