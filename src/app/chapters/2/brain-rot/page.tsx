"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrainRot() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const causationPhrases = [
    "For each additional unit of [X], [Y] will increase/decrease by [Z].",
    "As [X] increases, [Y] will increase/decrease.",
    "A one-unit increase in [X] leads to an increase/decrease of [Y].",
    "An increase in [X] causes an increase/decrease in [Y].",
    "For every unit increase in [X], [Y] will go up/down by [Z].",
    "Each additional unit of [X] results in an increase/decrease of [Y]."
  ];

  const correlationPhrases = [
    "For each additional unit of [X], [Y] is expected to increase/decrease by [Z].",
    "Based on our model, as [X] increases, [Y] is expected to increase/decrease.",
    "Based on our model, for each additional unit in height, an individual is expected to gain 12 lb.",
    "For each additional unit of [X], [Y] is predicted to increase/decrease by [Z].",
    "According to our model, for each additional unit of [X], [Y] is predicted to increase/decrease by [Z]."
  ];

  const allPhrases = [...causationPhrases, ...correlationPhrases];

  const handleDragStart = (e: React.DragEvent, phrase: string) => {
    e.dataTransfer.setData('text/plain', phrase);
  };

  const handleDrop = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    const phrase = e.dataTransfer.getData('text/plain');
    setAnswers(prev => ({...prev, [phrase]: column}));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetGame = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Associations
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="ice cream" className="text-4xl">🍦</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Ice Cream and Shark Attacks</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding Correlation vs. Causation</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose max-w-none mb-12">
            {/* Brain Rot Concept Section with Shark Image */}
            <div className="flex gap-8 mb-8">
              {/* Association Text */}
              <div className="flex-1">
                <div className="bg-gray-50 p-6 rounded-lg h-full">
                  <h2 className="text-2xl font-bold text-[#58595b] mb-4">The Association</h2>
                  <p className="mb-4">
                    It might sound bizarre, but research has shown a curious association between rising ice cream sales and an increase in shark attacks. Both ice cream sales and shark attacks tend to peak during the warmer months, particularly in summer. As more people head to the beach to enjoy the sun and cool off with ice cream, shark attacks also seem to rise.
                  </p>
                </div>
              </div>

              {/* Shark Attack Image */}
              <div className="flex-none w-96">
                <div className="relative w-96 h-96">
                  <Image
                    src="/images/shark attack.png"
                    alt="Shark attack illustration"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Two Guys Image and Association Section */}
            <div className="flex gap-8 mb-8">
              {/* Image */}
              <div className="relative w-96 h-96">
                <div className="relative w-96 h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/hunger_games.gif"
                    alt="Stratified sampling visualization with Hunger Games"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Association Text */}
              <div className="flex-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-[#ff8200] mb-2">What's Really Happening?</h3>
                  <p className="mb-4">
                    While there's a correlation between ice cream sales and shark attacks, it doesn't mean one causes the other. The increase in both is actually linked to the same underlying factor—more people are out at the beach during the summer. With warmer weather, people spend more time swimming in the ocean, which unfortunately increases the likelihood of shark encounters. So, while ice cream sales might rise during this time, they're not directly causing shark attacks.
                  </p>
                  
                  <p className="text-2xl font-bold text-[#ff8200] tracking-wide text-center mt-6">
                    CORRELATION DOESN'T EQUAL CAUSATION!
                  </p>
                </div>
              </div>
            </div>

            {/* Quiz Section - Watch Your Words Game */}
            <section className="bg-[#ff8200] text-white rounded-lg p-8 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span role="img" aria-label="target" className="text-4xl">🎯</span>
                <h2 className="text-3xl font-bold">Watch Your Words!</h2>
              </div>
              <p className="text-xl mb-6">
                Can you tell the difference between causation and correlation language? Drag each phrase to the correct column!
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-block bg-white text-[#ff8200] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Game
              </button>
            </section>

            {/* Navigation Links */}
            <div className="flex justify-between items-center">
              <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Chapter Overview
              </Link>
              <Link href="/chapters/2/mosaic-plots" className="text-[#ff8200] hover:text-[#ff9933] flex items-center">
                Next: Mosaic Plot Mastery
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Game Modal */}
          {showQuiz && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#58595b] mb-6">Watch Your Words!</h2>
                  
                  {/* Game Area */}
                  <div className="flex gap-8">
                    {/* Phrases to Drag */}
                    <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-[#ff8200] mb-4">Drag These Phrases</h3>
                      <div className="space-y-2">
                        {allPhrases.map((phrase, index) => (
                          !answers[phrase] && (
                            <div
                            key={index}
                              draggable
                              onDragStart={(e) => handleDragStart(e, phrase)}
                              className="bg-white p-3 rounded border-2 border-gray-200 cursor-move hover:border-[#ff8200]"
                            >
                              {phrase}
                            </div>
                          )
                        ))}
                      </div>
                    </div>

                    {/* Drop Zones */}
                    <div className="w-2/3 space-y-6">
                      {/* Causation Column */}
                      <div
                        onDrop={(e) => handleDrop(e, 'causation')}
                        onDragOver={handleDragOver}
                        className="bg-gray-50 p-4 rounded-lg min-h-[200px]"
                      >
                        <h3 className="font-bold text-[#ff8200] mb-4">Causation</h3>
                        <div className="space-y-2">
                          {Object.entries(answers).map(([phrase, column], index) => (
                            column === 'causation' && (
                              <div
                                key={index}
                                className={`p-3 rounded ${
                                  showResults
                                    ? causationPhrases.includes(phrase)
                                      ? 'bg-green-50 border-2 border-green-500'
                                      : 'bg-red-50 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                              >
                                {phrase}
                              </div>
                            )
                          ))}
                        </div>
                      </div>

                      {/* Correlation Column */}
                      <div
                        onDrop={(e) => handleDrop(e, 'correlation')}
                        onDragOver={handleDragOver}
                        className="bg-gray-50 p-4 rounded-lg min-h-[200px]"
                      >
                        <h3 className="font-bold text-[#ff8200] mb-4">Correlation</h3>
                        <div className="space-y-2">
                          {Object.entries(answers).map(([phrase, column], index) => (
                            column === 'correlation' && (
                              <div
                                key={index}
                                className={`p-3 rounded ${
                                  showResults
                                    ? correlationPhrases.includes(phrase)
                                      ? 'bg-green-50 border-2 border-green-500'
                                      : 'bg-red-50 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                              >
                                {phrase}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-between">
                        <button
                      onClick={() => setShowQuiz(false)}
                          className="px-6 py-2 rounded-lg border-2 border-[#ff8200] text-[#ff8200] hover:bg-[#ff8200] hover:text-white transition-colors"
                        >
                      Close Game
                        </button>
                    {showResults ? (
                        <button
                        onClick={resetGame}
                          className="px-6 py-2 rounded-lg bg-[#ff8200] text-white hover:bg-[#ff8200]/80 transition-colors"
                        >
                          Try Again
                        </button>
                    ) : (
                      <button
                        onClick={checkAnswers}
                        className="px-6 py-2 rounded-lg bg-[#ff8200] text-white hover:bg-[#ff8200]/80 transition-colors"
                        disabled={Object.keys(answers).length !== allPhrases.length}
                      >
                        Check Answers
                      </button>
                    )}
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 