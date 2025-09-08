"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function DescriptiveVsPredictive() {
  const [selectedAIC, setSelectedAIC] = useState<number | null>(null);
  const [aicQuizSubmitted, setAicQuizSubmitted] = useState(false);
  const [truthQuizAnswers, setTruthQuizAnswers] = useState<{[key: number]: number}>({});
  const [truthQuizSubmitted, setTruthQuizSubmitted] = useState(false);

  // AIC interpretation scenarios
  const aicScenarios = [
    { id: 1, model1: 245.7, model2: 247.2, difference: 1.5, interpretation: "Models are essentially equivalent" },
    { id: 2, model1: 312.4, model2: 318.9, difference: 6.5, interpretation: "Reasonable evidence that Model 1 is closer to truth" },
    { id: 3, model1: 189.3, model2: 203.7, difference: 14.4, interpretation: "Model 1 is almost certainly better" }
  ];

  const truthQuestions = [
    {
      id: 1,
      question: "What is the primary goal when building a descriptive model?",
      options: [
        "Make the most accurate predictions possible",
        "Create the most complex model with all variables",
        "Find the model closest to 'the truth' about relationships",
        "Minimize the number of predictors used"
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Why do we want to eliminate redundant predictors in descriptive modeling?",
      options: [
        "To reduce standard errors of important predictors",
        "To make the model run faster",
        "To impress reviewers with simplicity",
        "To reduce the dataset size"
      ],
      correct: 0
    },
    {
      id: 3,
      question: "How should you interpret AIC values?",
      options: [
        "Higher AIC means better model",
        "The actual AIC value tells you model quality",
        "Only the difference between models matters",
        "AIC should always be positive"
      ],
      correct: 2
    }
  ];

  const handleTruthQuizSubmit = () => {
    setTruthQuizSubmitted(true);
  };

  const resetTruthQuiz = () => {
    setTruthQuizAnswers({});
    setTruthQuizSubmitted(false);
  };

  const resetAICQuiz = () => {
    setSelectedAIC(null);
    setAicQuizSubmitted(false);
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
              <span role="img" aria-label="descriptive vs predictive" className="text-4xl">🔍</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Descriptive vs Predictive Modeling</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding different modeling approaches</p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-4">
                <span role="img" aria-label="principles" className="text-4xl">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Core Principles</h2>
                <p className="text-blue-600 mt-2">What makes a good descriptive model</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-blue-800 mb-2">Identify Important Variables</h3>
                <p className="text-blue-700 text-sm">
                  Determine which predictors have meaningful relationships with the outcome. Remove redundant variables.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">📏</div>
                <h3 className="font-bold text-blue-800 mb-2">Precise Estimates</h3>
                <p className="text-blue-700 text-sm">
                  Minimize standard errors of coefficients to get more reliable estimates of relationships.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-bold text-blue-800 mb-2">Interpretability</h3>
                <p className="text-blue-700 text-sm">
                  Keep models simple enough to understand and explain the relationships clearly.
                </p>
              </div>
            </div>
          </div>

          {/* Truth Quiz */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-purple-100 rounded-lg p-4">
                <span role="img" aria-label="quiz" className="text-4xl">🧠</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-purple-800">Knowledge Check</h2>
                <p className="text-purple-600 mt-2">Test your understanding of descriptive modeling</p>
              </div>
            </div>

            <div className="space-y-6">
              {truthQuestions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-700 font-semibold mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start space-x-3">
                        <input 
                          type="radio" 
                          id={`truth-${q.id}-${optionIndex}`}
                          name={`truth-q${q.id}`}
                          value={optionIndex}
                          onChange={(e) => setTruthQuizAnswers({...truthQuizAnswers, [q.id]: parseInt(e.target.value)})}
                          className="mt-1"
                          disabled={truthQuizSubmitted}
                        />
                        <label htmlFor={`truth-${q.id}-${optionIndex}`} className="text-gray-700">
                          {String.fromCharCode(65 + optionIndex)}) {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleTruthQuizSubmit}
                disabled={Object.keys(truthQuizAnswers).length < 3 || truthQuizSubmitted}
                className="bg-[#ff8200] text-white px-6 py-2 rounded-lg hover:bg-[#ff9933] transition-colors disabled:bg-gray-400"
              >
                Submit All Answers
              </button>
              
              {truthQuizSubmitted && (
                <button
                  onClick={resetTruthQuiz}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>

            {truthQuizSubmitted && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-3">Results:</h3>
                <div className="space-y-2">
                  {truthQuestions.map((q, index) => (
                    <div key={q.id} className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Q{index + 1}:</span>
                      <span className={`text-sm font-semibold ${
                        truthQuizAnswers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {truthQuizAnswers[q.id] === q.correct ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                      {truthQuizAnswers[q.id] !== q.correct && (
                        <span className="text-xs text-gray-500">
                          (Correct: {String.fromCharCode(65 + q.correct)})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  Score: {truthQuestions.filter(q => truthQuizAnswers[q.id] === q.correct).length} / {truthQuestions.length}
                </div>
              </div>
            )}
          </div>

          {/* AIC: Model Comparison Tool */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-orange-100 rounded-lg p-4">
                <span role="img" aria-label="comparison" className="text-4xl">📈</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-orange-800">AIC: Model Comparison Tool</h2>
                <p className="text-orange-600 mt-2">Use AIC to compare models and select the best one</p>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-xl font-bold text-orange-800">Understanding AIC</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">What AIC measures:</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Model fit quality (lower = better fit)</li>
                    <li>• Penalty for model complexity</li>
                    <li>• Balance between accuracy and simplicity</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">Key Rule:</h4>
                  <p className="text-orange-700 text-sm font-semibold">
                    Compare AIC differences between models, not absolute values
                  </p>
                </div>
              </div>
            </div>

            {/* AIC Interpretation Game */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-[#58595b] mb-4">📊 AIC Comparison Practice</h3>
              <p className="text-gray-700 mb-4">
                Practice interpreting AIC differences. Click on a scenario to see the interpretation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aicScenarios.map((scenario) => (
                  <div 
                    key={scenario.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAIC === scenario.id ? 'border-[#ff8200] bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAIC(selectedAIC === scenario.id ? null : scenario.id)}
                  >
                    <div className="text-center mb-3">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-bold text-gray-800">Scenario {scenario.id}</h4>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model A:</span>
                        <span className="font-mono">{scenario.model1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model B:</span>
                        <span className="font-mono">{scenario.model2}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Difference:</span>
                        <span className="font-mono font-bold">{scenario.difference}</span>
                      </div>
                    </div>

                    {selectedAIC === scenario.id && (
                      <div className="mt-4 p-3 bg-[#ff8200] text-white rounded text-center">
                        <div className="text-xs font-bold mb-1">INTERPRETATION:</div>
                        <div className="text-sm">{scenario.interpretation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">📋 AIC Interpretation Guidelines</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-800">≤ 2</div>
                    <div className="text-green-700">Essentially equivalent</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-800">4 - 7</div>
                    <div className="text-yellow-700">Reasonable evidence</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-red-800">{'>'} 10</div>
                    <div className="text-red-700">Almost certainly better</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Guide */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-green-100 rounded-lg p-4">
                <span role="img" aria-label="strategy" className="text-4xl">📋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-800">Descriptive Modeling Tasks</h2>
                <p className="text-green-600 mt-2">Three core tasks for building descriptive models</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-blue-800 mb-2">The Model Structure</h3>
              <div className="bg-white p-3 rounded font-mono text-center text-lg">
                μy|x (or logit(p)) = β₀ + β₁x₁ + ... + βₖxₖ
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Determine What the x's Should Be</h3>
                  <p className="text-gray-700">Decide on original columns in the data, interactions, transformations, etc.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Determine Which x's and Their Coefficients</h3>
                  <p className="text-gray-700">Select which x's should be in the model and estimate their coefficients as accurately as possible.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Describe the Relationships</h3>
                  <p className="text-gray-700">Explain what the relationship between y and the relevant x's looks like in intuitive and easy-to-understand terms.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-orange-800 mb-2">📊 Criteria</h3>
                <p className="text-orange-700 text-sm">
                  Have the model reproduce the distribution of observed y values as closely as possible.
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-800 mb-2">⚠️ Requirement</h3>
                <p className="text-red-700 text-sm">
                  Assumptions of the regression need to hold - model needs to be a reasonable reflection of reality.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🎯 In Short</h3>
              <div className="flex items-center justify-center space-x-8 text-lg font-semibold text-gray-700">
                <span>1. Pick Variables</span>
                <span className="text-gray-400">→</span>
                <span>2. Assign Coefficients</span>
                <span className="text-gray-400">→</span>
                <span>3. Interpret</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 