"use client";
import { useState } from 'react';
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

function ModelHierarchyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "You want to include the interaction term Height×Weight in your model. According to model hierarchy, what else must you include?",
      options: [
        "Just the interaction term Height×Weight is sufficient",
        "Both main effects Height and Weight", 
        "Only one of the main effects (either Height or Weight)",
        "The intercept term only"
      ],
      correct: 1,
      explanation: "Model hierarchy requires that when you include an interaction term, you must also include ALL supporting main effects. For Height×Weight, you need both Height and Weight as individual terms."
    },
    {
      question: "You have a categorical variable 'Education Level' with 4 categories: High School, Bachelor's, Master's, PhD. How many indicator variables should you include in your model?",
      options: [
        "Include just 1-2 indicator variables for the most important categories",
        "Include all 3 indicator variables (using one category as reference)",
        "Include all 4 indicator variables",
        "Don't include any indicator variables"
      ],
      correct: 1,
      explanation: "For a categorical variable with 4 levels, you need 3 indicator variables (with one category as the reference level). Model hierarchy says include ALL indicators or NONE."
    },
    {
      question: "Your model includes the term X³. According to polynomial hierarchy, what other terms must be included?",
      options: [
        "No other terms needed - just X³",
        "Only X² (one power down)",
        "Both X² and X (all lower powers)",
        "X⁴ and X⁵ (higher powers)"
      ],
      correct: 2,
      explanation: "Polynomial hierarchy requires including ALL lower powers up to your highest term. For X³, you must include X² and X (linear term)."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct ? 1 : 0);
  }, 0);

  if (showResults) {
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-[#ff8200]">
        <h3 className="text-2xl font-bold text-[#58595b] mb-4 text-center">🎯 Quiz Results</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-[#ff8200] mb-2">{score}/{questions.length}</div>
          <p className="text-lg text-gray-700">
            {score === questions.length ? "Perfect! 🎉" : 
             score >= questions.length * 0.7 ? "Great job! 👍" : 
             "Keep studying! 📚"}
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded">
              <p className="font-bold mb-2">Question {index + 1}: {q.question}</p>
              <p className={`text-sm mb-2 ${selectedAnswers[index] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                Your answer: {q.options[selectedAnswers[index]]} {selectedAnswers[index] === q.correct ? '✅' : '❌'}
              </p>
              <p className="text-sm text-green-600">
                Correct answer: {q.options[q.correct]}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={resetQuiz}
            className="bg-[#ff8200] text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#ff8200]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#58595b]">Question {currentQuestion + 1} of {questions.length}</h3>
        <div className="bg-[#ff8200] text-white px-3 py-1 rounded-full text-sm font-bold">
          {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-gray-800 mb-4">{currentQ.question}</p>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswers[currentQuestion] === index 
                  ? 'border-[#ff8200] bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <span className="font-bold text-[#ff8200] mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <button 
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-[#ff8200] text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

export default function ModelHierarchy() {
  const [selectedPrinciple, setSelectedPrinciple] = useState('interactions');

  const principles = {
    interactions: {
      title: "Interactions",
      icon: "🔗",
      color: "blue",
      description: "When interactions are involved, include main effects too"
    },
    indicators: {
      title: "Indicator Variables", 
      icon: "🏷️",
      color: "green",
      description: "For categorical variables, include all indicators or none"
    },
    polynomial: {
      title: "Polynomial Models",
      icon: "📈", 
      color: "purple",
      description: "Include all powers up to the highest polynomial term"
    },

  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="model hierarchy" className="text-4xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Model Hierarchy</h1>
              <p className="text-xl text-gray-600 mt-2">Three key principles for building well-structured models</p>
            </div>
          </div>


        </div>

        <section className="mb-8 mt-12">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">📋 The Three Key Principles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(principles).map(([key, principle]) => (
              <button
                key={key}
                onClick={() => setSelectedPrinciple(key)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedPrinciple === key
                    ? `border-${principle.color}-500 bg-${principle.color}-50`
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-2">{principle.icon}</div>
                <div className={`font-bold text-sm ${
                  selectedPrinciple === key ? `text-${principle.color}-800` : 'text-gray-700'
                }`}>
                  {principle.title}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
            {selectedPrinciple === 'interactions' && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">�� Interactions</h3>
                <p className="text-blue-700 text-lg mb-6">
                  <strong>If an interaction between x₁ and x₂ is considered in a model, model hierarchy suggests that it should also have x₁ and x₂ as well.</strong>
                </p>

                {/* Visual Hierarchy */}
                <div className="bg-white p-6 rounded border mb-6">
                  <h4 className="font-bold text-blue-800 mb-4 text-center">📊 Hierarchy Visualization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Good Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-green-800 mb-4">✅ Follows Hierarchy</h5>
                      <div className="bg-green-50 p-4 rounded">
                        <div className="mb-4">
                          <div className="bg-green-200 px-4 py-2 rounded font-mono text-lg font-bold text-green-800 mx-auto inline-block">
                            x₁x₂
                          </div>
                          <div className="text-green-600 text-sm mt-1">Interaction</div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╱</div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╲</div>
                        </div>
                        <div className="flex justify-center space-x-8 mt-2">
                          <div>
                            <div className="bg-green-300 px-3 py-2 rounded font-mono font-bold text-green-800">x₁</div>
                            <div className="text-green-600 text-xs mt-1">Main Effect</div>
                          </div>
                          <div>
                            <div className="bg-green-300 px-3 py-2 rounded font-mono font-bold text-green-800">x₂</div>
                            <div className="text-green-600 text-xs mt-1">Main Effect</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bad Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-red-800 mb-4">❌ Violates Hierarchy</h5>
                      <div className="bg-red-50 p-4 rounded">
                        <div className="mb-4">
                          <div className="bg-red-200 px-4 py-2 rounded font-mono text-lg font-bold text-red-800 mx-auto inline-block">
                            x₁x₂
                          </div>
                          <div className="text-red-600 text-sm mt-1">Interaction</div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╱</div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╲</div>
                        </div>
                        <div className="flex justify-center space-x-8 mt-2">
                          <div>
                            <div className="bg-gray-300 px-3 py-2 rounded font-mono font-bold text-gray-500 line-through">x₁</div>
                            <div className="text-red-600 text-xs mt-1">Missing!</div>
                          </div>
                          <div>
                            <div className="bg-red-300 px-3 py-2 rounded font-mono font-bold text-red-800">x₂</div>
                            <div className="text-red-600 text-xs mt-1">Present</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6 p-3 bg-blue-50 rounded">
                    <p className="text-blue-800 text-sm font-medium">
                      <strong>Rule:</strong> You cannot have the interaction without BOTH supporting main effects
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-green-800 mb-3">✅ Good (Follows Hierarchy)</h4>
                    <div className="bg-green-100 p-3 rounded font-mono text-sm mb-2">
                      μy = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂
                    </div>
                    <p className="text-green-700 text-sm">
                      Includes both main effects (x₁, x₂) AND the interaction (x₁x₂)
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-red-800 mb-3">❌ Bad (Violates Hierarchy)</h4>
                    <div className="space-y-2">
                      <div className="bg-red-100 p-3 rounded font-mono text-xs">
                        μy = β₀ + β₁x₁x₂
                      </div>
                      <div className="bg-red-100 p-3 rounded font-mono text-xs">
                        μy = β₀ + β₁x₁ + β₂x₁x₂
                      </div>
                      <div className="bg-red-100 p-3 rounded font-mono text-xs">
                        μy = β₀ + β₁x₂ + β₂x₁x₂
                      </div>
                    </div>
                    <p className="text-red-700 text-sm">
                      Missing one or both main effects
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-2">💡 Why This Matters</h5>
                  <p className="text-yellow-700 text-sm">
                    Including the interaction without main effects makes it difficult to interpret coefficients and can lead to misleading conclusions about the individual effects of x₁ and x₂.
                  </p>
                </div>
              </div>
            )}

            {selectedPrinciple === 'indicators' && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-green-800 mb-4">🏷️ Indicator Variables</h3>
                <p className="text-green-700 text-lg mb-6">
                  <strong>When a categorical variable has 3+ levels, model hierarchy suggests that either all the indicator variables required to represent it or none of them should be in the model.</strong>
                </p>

                <div className="bg-white p-4 rounded border mb-6">
                  <h4 className="font-bold text-green-800 mb-3">Example: Handedness (Ambidextrous/Left/Right)</h4>
                  <p className="text-green-700 text-sm mb-3">
                    This categorical variable needs 2 indicator variables: Left and Right (with Ambidextrous as reference)
                  </p>
                </div>

                {/* Visual Hierarchy for Indicators */}
                <div className="bg-white p-6 rounded border mb-6">
                  <h4 className="font-bold text-green-800 mb-4 text-center">📊 Indicator Variable Hierarchy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Good Indicator Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-green-800 mb-4">✅ All or None</h5>
                      <div className="bg-green-50 p-4 rounded">
                        <div className="mb-4">
                          <div className="bg-green-100 px-4 py-2 rounded font-bold text-green-800 mx-auto inline-block">
                            Handedness
                          </div>
                          <div className="text-green-600 text-sm mt-1">Categorical Variable</div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╱</div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╲</div>
                        </div>
                        <div className="flex justify-center space-x-4 mt-2">
                          <div>
                            <div className="bg-green-300 px-2 py-1 rounded font-mono text-sm font-bold text-green-800">Left</div>
                            <div className="text-green-600 text-xs mt-1">Indicator 1</div>
                          </div>
                          <div>
                            <div className="bg-green-300 px-2 py-1 rounded font-mono text-sm font-bold text-green-800">Right</div>
                            <div className="text-green-600 text-xs mt-1">Indicator 2</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-green-600">
                          (Ambidextrous = reference level)
                        </div>
                      </div>
                    </div>

                    {/* Bad Indicator Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-red-800 mb-4">❌ Partial Inclusion</h5>
                      <div className="bg-red-50 p-4 rounded">
                        <div className="mb-4">
                          <div className="bg-red-100 px-4 py-2 rounded font-bold text-red-800 mx-auto inline-block">
                            Handedness
                          </div>
                          <div className="text-red-600 text-sm mt-1">Categorical Variable</div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╱</div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>╲</div>
                        </div>
                        <div className="flex justify-center space-x-4 mt-2">
                          <div>
                            <div className="bg-red-300 px-2 py-1 rounded font-mono text-sm font-bold text-red-800">Left</div>
                            <div className="text-red-600 text-xs mt-1">Included</div>
                          </div>
                          <div>
                            <div className="bg-gray-300 px-2 py-1 rounded font-mono text-sm font-bold text-gray-500 line-through">Right</div>
                            <div className="text-red-600 text-xs mt-1">Missing!</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-red-600">
                          Partial representation breaks model
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6 p-3 bg-green-50 rounded">
                    <p className="text-green-800 text-sm font-medium">
                      <strong>Rule:</strong> Either include ALL indicators for a categorical variable, or include NONE
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-green-800 mb-3">✅ Good (Follows Hierarchy)</h4>
                    <div className="space-y-2">
                      <div className="bg-green-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁ + β₂Left + β₃Right
                      </div>
                      <div className="bg-green-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁
                      </div>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Either include ALL indicators for handedness, or include NONE
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-red-800 mb-3">❌ Bad (Violates Hierarchy)</h4>
                    <div className="space-y-2">
                      <div className="bg-red-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁ + β₂Left
                      </div>
                      <div className="bg-red-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁ + β₂Right
                      </div>
                    </div>
                    <p className="text-red-700 text-sm mt-2">
                      Including only some indicators for a categorical variable
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-2">💡 Why This Matters</h5>
                  <p className="text-yellow-700 text-sm">
                    Partial inclusion of indicator variables can create biased estimates and makes it impossible to properly test the overall effect of the categorical variable.
                  </p>
                </div>
              </div>
            )}

            {selectedPrinciple === 'polynomial' && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">📈 Polynomial Models</h3>
                <p className="text-purple-700 text-lg mb-6">
                  <strong>If the model predicts y using a polynomial in x (i.e., with the predictors x, x², x³, ..., xᵏ), then all powers of x up to xᵏ are to be included.</strong>
                </p>

                {/* Visual Hierarchy for Polynomials */}
                <div className="bg-white p-6 rounded border mb-6">
                  <h4 className="font-bold text-purple-800 mb-4 text-center">📊 Polynomial Hierarchy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Good Polynomial Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-green-800 mb-4">✅ Follows Hierarchy</h5>
                      <div className="bg-green-50 p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <div className="bg-green-200 px-3 py-2 rounded font-mono text-lg font-bold text-green-800 mx-auto inline-block">
                              x³
                            </div>
                            <div className="text-green-600 text-xs mt-1">Cubic</div>
                          </div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>│</div>
                          <div>
                            <div className="bg-green-300 px-3 py-2 rounded font-mono font-bold text-green-800 mx-auto inline-block">
                              x²
                            </div>
                            <div className="text-green-600 text-xs mt-1">Quadratic</div>
                          </div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>│</div>
                          <div>
                            <div className="bg-green-400 px-3 py-2 rounded font-mono font-bold text-green-800 mx-auto inline-block">
                              x
                            </div>
                            <div className="text-green-600 text-xs mt-1">Linear</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bad Polynomial Hierarchy */}
                    <div className="text-center">
                      <h5 className="font-bold text-red-800 mb-4">❌ Violates Hierarchy</h5>
                      <div className="bg-red-50 p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <div className="bg-red-200 px-3 py-2 rounded font-mono text-lg font-bold text-red-800 mx-auto inline-block">
                              x³
                            </div>
                            <div className="text-red-600 text-xs mt-1">Cubic</div>
                          </div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>│</div>
                          <div>
                            <div className="bg-gray-300 px-3 py-2 rounded font-mono font-bold text-gray-500 line-through mx-auto inline-block">
                              x²
                            </div>
                            <div className="text-red-600 text-xs mt-1">Missing!</div>
                          </div>
                          <div className="text-2xl font-bold" style={{color: '#6b7280'}}>│</div>
                          <div>
                            <div className="bg-gray-300 px-3 py-2 rounded font-mono font-bold text-gray-500 line-through mx-auto inline-block">
                              x
                            </div>
                            <div className="text-red-600 text-xs mt-1">Missing!</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6 p-3 bg-purple-50 rounded">
                    <p className="text-purple-800 text-sm font-medium">
                      <strong>Rule:</strong> Include ALL lower powers leading up to your highest polynomial term
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-green-800 mb-3">✅ Good (Follows Hierarchy)</h4>
                    <div className="bg-green-100 p-3 rounded font-mono text-sm">
                      μy = β₀ + β₁x₁ + β₂x₂ + β₃x₂² + β₄x₃²
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Includes x₁ (linear), x₂ (linear), x₂² (quadratic), and x₃² but also includes x₃ (linear) if needed
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-bold text-red-800 mb-3">❌ Bad (Violates Hierarchy)</h4>
                    <div className="space-y-2">
                      <div className="bg-red-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁ + β₂x₂ + β₃x₃²
                      </div>
                      <div className="bg-red-100 p-3 rounded font-mono text-sm">
                        μy = β₀ + β₁x₁ + β₂x₃²
                      </div>
                    </div>
                    <p className="text-red-700 text-sm mt-2">
                      Includes x₃² but missing x₃ (linear term)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-4">
                  <h5 className="font-bold text-blue-800 mb-2">🔬 Exception: Physical/Mathematical Laws</h5>
                  <p className="text-blue-700 text-sm mb-2">
                    When theory dictates a specific relationship, you can violate hierarchy.
                  </p>
                  <div className="bg-white p-3 rounded font-mono text-sm">
                    L = β₀ + β₁T⁴
                  </div>
                  <p className="text-blue-700 text-sm mt-2">
                    <strong>Example:</strong> Physics suggests light output ∝ temperature⁴, so this model is acceptable.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-2">💡 Why This Matters</h5>
                  <p className="text-yellow-700 text-sm">
                    Skipping lower-order terms can lead to poor model fit and makes it difficult to understand the shape of the relationship between x and y.
                  </p>
                </div>
              </div>
            )}


          </div>
        </section>

        {/* Enhanced Quick Check */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#ff8200] to-orange-400 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">⚡ QUICK CHECK - Model Hierarchy Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <div className="text-4xl mb-3 text-center">🔗</div>
                <h3 className="font-bold text-xl mb-3 text-center">Interactions</h3>
                <p className="text-center text-lg">Include ALL main effects when using interaction terms</p>
                <div className="mt-3 text-sm text-center bg-white bg-opacity-30 p-2 rounded">
                  X₁X₂ → Must include X₁ AND X₂
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <div className="text-4xl mb-3 text-center">🏷️</div>
                <h3 className="font-bold text-xl mb-3 text-center">Categorical</h3>
                <p className="text-center text-lg">All indicators or NONE for 3+ level variables</p>
                <div className="mt-3 text-sm text-center bg-white bg-opacity-30 p-2 rounded">
                  Can't use just "Left" without "Right"
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <div className="text-4xl mb-3 text-center">📈</div>
                <h3 className="font-bold text-xl mb-3 text-center">Polynomial</h3>
                <p className="text-center text-lg">Include ALL lower powers up to highest term</p>
                <div className="mt-3 text-sm text-center bg-white bg-opacity-30 p-2 rounded">
                  X³ → Must include X² AND X
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Choice Activity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">🧠 Test Your Knowledge</h2>
          <ModelHierarchyQuiz />
        </section>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 