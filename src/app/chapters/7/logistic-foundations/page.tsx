"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function LogisticFoundations() {
  const [quiz1Answers, setQuiz1Answers] = useState<{[key: number]: number}>({});
  const [quiz1Submitted, setQuiz1Submitted] = useState(false);
  const [quiz2Answers, setQuiz2Answers] = useState<{[key: number]: number}>({});
  const [quiz2Submitted, setQuiz2Submitted] = useState(false);
  const [goldenRuleAnswer, setGoldenRuleAnswer] = useState('');
  const [goldenRuleSubmitted, setGoldenRuleSubmitted] = useState(false);

  const handleQuiz1Submit = () => {
    setQuiz1Submitted(true);
  };

  const handleQuiz2Submit = () => {
    setQuiz2Submitted(true);
  };

  const handleGoldenRuleSubmit = () => {
    setGoldenRuleSubmitted(true);
  };

  const quiz1Questions = [
    {
      id: 1,
      question: "Which scenario is perfect for logistic regression?",
      options: [
        "Predicting house prices ($100k to $2M)",
        "Predicting whether a customer will buy (Yes/No)",
        "Predicting movie ratings (1-5 stars)",
        "Predicting temperature in degrees"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "What type of response variable does logistic regression require?",
      options: [
        "Any continuous number",
        "A two-level categorical variable",
        "Multiple categories (3 or more)",
        "Ordinal rankings"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Which of these is NOT appropriate for logistic regression?",
      options: [
        "Pass/Fail on an exam",
        "Spam/Not Spam emails",
        "Student GPA (0.0 to 4.0)",
        "Accept/Reject college applications"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "What does logistic regression predict?",
      options: [
        "The exact category an observation belongs to",
        "A continuous score between 0 and 100",
        "The probability of each level occurring",
        "The ranking of different options"
      ],
      correct: 2
    },
    {
      id: 5,
      question: "Which scenario would benefit from logistic regression?",
      options: [
        "Predicting daily rainfall amounts",
        "Predicting if it will rain tomorrow (Yes/No)",
        "Predicting exact stock prices",
        "Predicting customer satisfaction scores (1-10)"
      ],
      correct: 1
    }
  ];

  const quiz2Questions = [
    {
      id: 1,
      question: "For 'Pass' vs 'Fail', what is the level of interest?",
      options: [
        "Pass (comes last alphabetically)",
        "Fail (comes first alphabetically)",
        "Both are equally likely",
        "It depends on the context"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "For 'Yes' vs 'No', what is the level of interest?",
      options: [
        "No (comes first alphabetically)",
        "Yes (comes last alphabetically)",
        "Neither one",
        "The one that occurs more frequently"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "For 'Buy' vs 'Don't Buy', what is the reference level?",
      options: [
        "Buy (our level of interest)",
        "Don't Buy (comes first alphabetically)",
        "Don't Buy (comes last alphabetically)",
        "Buy (comes first alphabetically)"
      ],
      correct: 1
    },
    {
      id: 4,
      question: "For 'Spam' vs 'Not Spam', what do we predict the probability of?",
      options: [
        "Not Spam (reference level)",
        "Spam (level of interest)",
        "Both equally",
        "Whichever is more common"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "The reference level is always:",
      options: [
        "The category that comes last alphabetically",
        "The category that comes first alphabetically",
        "The more important category",
        "The category we want to predict"
      ],
      correct: 1
    }
  ];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={true} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="logistic foundations" className="text-4xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Logistic Regression Foundations</h1>
              <p className="text-xl text-gray-600 mt-2">Building the foundation for logistic regression</p>
            </div>
          </div>

          {/* Fun Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎭 Welcome to the Binary Universe!</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg mb-4">
                Imagine you're a fortune teller with a magic crystal ball, but instead of predicting vague futures, 
                you specialize in <strong>yes/no questions</strong>! Will this customer buy? Will this email be spam? 
                Will this student pass? That's exactly what logistic regression does - it's your statistical crystal ball 
                for binary predictions! 🔮
              </p>
            </div>
          </div>

          {/* Introduction to Logistic Regression */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 When to Use Logistic Regression</h2>
            <div className="bg-[#f8f4e3] p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg">
                When the response <strong>y</strong> is a two-level categorical variable, we can use logistic 
                regression to predict the probability that each level occurs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h3 className="font-semibold text-green-800 mb-2">✅ Perfect for Logistic Regression</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Will it rain tomorrow? (Yes/No)</li>
                  <li>• Customer purchase decision (Buy/Don't Buy)</li>
                  <li>• Email classification (Spam/Not Spam)</li>
                  <li>• Medical diagnosis (Disease/Healthy)</li>
                  <li>• College admission (Accept/Reject)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-semibold text-red-800 mb-2">❌ Not for Logistic Regression</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• House prices ($100k - $2M)</li>
                  <li>• Temperature in degrees (any number)</li>
                  <li>• Movie ratings (1-5 stars)</li>
                  <li>• Student test scores (0-100)</li>
                  <li>• Height in inches (continuous)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quiz 1: Can you perform logistic regression? */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 Quiz 1: Logistic Regression Basics</h2>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-yellow-800 font-semibold">🕵️‍♀️ Detective Challenge:</p>
              <p className="text-yellow-700 mt-1">
                Test your understanding of when and how to use logistic regression!
              </p>
            </div>
            
            <div className="space-y-6">
              {quiz1Questions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-700 font-semibold mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start space-x-3">
                        <input 
                          type="radio" 
                          id={`q1-${q.id}-${optionIndex}`}
                          name={`quiz1-q${q.id}`}
                          value={optionIndex}
                          onChange={(e) => setQuiz1Answers({...quiz1Answers, [q.id]: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                        <label htmlFor={`q1-${q.id}-${optionIndex}`} className="text-gray-700">
                          {String.fromCharCode(65 + optionIndex)}) {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleQuiz1Submit}
              disabled={Object.keys(quiz1Answers).length < 5 || quiz1Submitted}
              className="mt-6 bg-[#ff8200] text-white px-6 py-2 rounded-lg hover:bg-[#ff9933] transition-colors disabled:bg-gray-400"
            >
              Submit All Answers
            </button>
            
            {quiz1Submitted && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-3">Results:</h3>
                <div className="space-y-2">
                  {quiz1Questions.map((q, index) => (
                    <div key={q.id} className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Q{index + 1}:</span>
                      <span className={`text-sm font-semibold ${
                        quiz1Answers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {quiz1Answers[q.id] === q.correct ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                      {quiz1Answers[q.id] !== q.correct && (
                        <span className="text-xs text-gray-500">
                          (Correct: {String.fromCharCode(65 + q.correct)})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  Score: {quiz1Questions.filter(q => quiz1Answers[q.id] === q.correct).length} / {quiz1Questions.length}
                </div>
              </div>
            )}
          </div>

          {/* Level of Interest Explanation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 Understanding the "Level of Interest"</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-indigo-800 mb-3">🏆 The Alphabetical Championship</h3>
              <p className="text-indigo-700 mb-4">
                Imagine all your categories are competing in an alphabetical race! The winner (the one that comes 
                <strong> last alphabetically</strong>) gets the crown and becomes our <strong>"level of interest"</strong> 
                - the star of our prediction show! 🌟
              </p>
            </div>
            
            <div className="bg-[#f8f4e3] p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg">
                By convention, we will predict the probability of the level that comes <strong>last alphabetically</strong>. 
                This will be referred to as the <strong>level of interest</strong>.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">🏁 Race Results - Who Wins the Alphabet Marathon?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-purple-800">🛒 Shopping Decision</h4>
                  <p className="text-sm text-gray-600 mt-1">Runners: "Buy" vs "Don't Buy"</p>
                  <p className="text-purple-700 font-semibold mt-2">🏆 Winner: "Don't Buy"</p>
                  <p className="text-xs text-gray-500">(D comes after B)</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800">📚 Exam Result</h4>
                  <p className="text-sm text-gray-600 mt-1">Runners: "Pass" vs "Fail"</p>
                  <p className="text-green-700 font-semibold mt-2">🏆 Winner: "Pass"</p>
                  <p className="text-xs text-gray-500">(P comes after F)</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800">🤔 Simple Choice</h4>
                  <p className="text-sm text-gray-600 mt-1">Runners: "Yes" vs "No"</p>
                  <p className="text-blue-700 font-semibold mt-2">🏆 Winner: "Yes"</p>
                  <p className="text-xs text-gray-500">(Y comes after N)</p>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>🎪 Pro Tip:</strong> Think of it like this - we're predicting the probability of the "underdog" 
                  that comes last in the alphabet race. It's like rooting for the team that bats last in baseball! ⚾
                </p>
              </div>
            </div>
          </div>

          {/* Quiz 2: Level of Interest and Reference Levels */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 Quiz 2: Levels and References</h2>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-purple-800 font-semibold">🏆 Alphabetical Championship:</p>
              <p className="text-purple-700 mt-1">
                Master the concepts of level of interest and reference levels!
              </p>
            </div>
            
            <div className="space-y-6">
              {quiz2Questions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-700 font-semibold mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start space-x-3">
                        <input 
                          type="radio" 
                          id={`q2-${q.id}-${optionIndex}`}
                          name={`quiz2-q${q.id}`}
                          value={optionIndex}
                          onChange={(e) => setQuiz2Answers({...quiz2Answers, [q.id]: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                        <label htmlFor={`q2-${q.id}-${optionIndex}`} className="text-gray-700">
                          {String.fromCharCode(65 + optionIndex)}) {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleQuiz2Submit}
              disabled={Object.keys(quiz2Answers).length < 5 || quiz2Submitted}
              className="mt-6 bg-[#ff8200] text-white px-6 py-2 rounded-lg hover:bg-[#ff9933] transition-colors disabled:bg-gray-400"
            >
              Submit All Answers
            </button>
            
            {quiz2Submitted && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-3">Results:</h3>
                <div className="space-y-2">
                  {quiz2Questions.map((q, index) => (
                    <div key={q.id} className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Q{index + 1}:</span>
                      <span className={`text-sm font-semibold ${
                        quiz2Answers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {quiz2Answers[q.id] === q.correct ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                      {quiz2Answers[q.id] !== q.correct && (
                        <span className="text-xs text-gray-500">
                          (Correct: {String.fromCharCode(65 + q.correct)})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  Score: {quiz2Questions.filter(q => quiz2Answers[q.id] === q.correct).length} / {quiz2Questions.length}
                </div>
              </div>
            )}
          </div>

          {/* Converting Probabilities to Predictions */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 The Golden Rule: Converting Probabilities to Predictions</h2>
            
            {/* Big 0.5 Rule Box */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-lg mb-6 text-center">
              <h3 className="text-3xl font-bold mb-4">🚨 THE 0.5 RULE 🚨</h3>
              <div className="text-2xl font-bold mb-4">
                Probability ≥ 0.5 → Predict LEVEL OF INTEREST
              </div>
              <div className="text-2xl font-bold">
                Probability &lt; 0.5 → Predict NOT LEVEL OF INTEREST
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg border-4 border-green-400">
                <h3 className="font-bold text-green-800 mb-3 text-xl">✅ If p ≥ 0.5</h3>
                <div className="text-green-700 text-lg font-semibold mb-2">
                  → Predict the LEVEL OF INTEREST
                </div>
                <p className="text-green-600">
                  (The category that comes last alphabetically)
                </p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border-4 border-red-400">
                <h3 className="font-bold text-red-800 mb-3 text-xl">❌ If p &lt; 0.5</h3>
                <div className="text-red-700 text-lg font-semibold mb-2">
                  → Predict NOT the level of interest
                </div>
                <p className="text-red-600">
                  (The category that comes first alphabetically)
                </p>
              </div>
            </div>

            {/* Quick Application Quiz */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-300">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">🧩 Quick Challenge: Apply the Golden Rule!</h3>
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-gray-700 font-semibold mb-2">Scenario:</p>
                <p className="text-gray-700 mb-3">
                  You're building a model to predict college admissions. The possible outcomes are "Accept" and "Reject". 
                  Your model outputs a probability of <strong>0.75</strong> for a particular student.
                </p>
                <p className="text-indigo-700 font-semibold">
                  What should you predict for this student? 🤔
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <input 
                    type="radio" 
                    id="golden-a" 
                    name="golden-rule" 
                    value="accept"
                    onChange={(e) => setGoldenRuleAnswer(e.target.value)}
                    className="mt-1"
                  />
                  <label htmlFor="golden-a" className="text-gray-700">
                    A) Accept (because 0.75 ≥ 0.5, and "Accept" comes first alphabetically)
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input 
                    type="radio" 
                    id="golden-b" 
                    name="golden-rule" 
                    value="reject"
                    onChange={(e) => setGoldenRuleAnswer(e.target.value)}
                    className="mt-1"
                  />
                  <label htmlFor="golden-b" className="text-gray-700">
                    B) Reject (because 0.75 ≥ 0.5, and "Reject" comes last alphabetically)
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input 
                    type="radio" 
                    id="golden-c" 
                    name="golden-rule" 
                    value="cant-tell"
                    onChange={(e) => setGoldenRuleAnswer(e.target.value)}
                    className="mt-1"
                  />
                  <label htmlFor="golden-c" className="text-gray-700">
                    C) Can't determine without knowing which is the level of interest
                  </label>
                </div>
              </div>
              
              <div className="mt-4 bg-yellow-100 p-3 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>💡 Hint:</strong> Remember the alphabetical rule and the 0.5 threshold!
                </p>
              </div>

              <button
                onClick={handleGoldenRuleSubmit}
                disabled={!goldenRuleAnswer || goldenRuleSubmitted}
                className="mt-4 bg-[#ff8200] text-white px-6 py-2 rounded-lg hover:bg-[#ff9933] transition-colors disabled:bg-gray-400"
              >
                Submit Answer
              </button>
              
              {goldenRuleSubmitted && (
                <div className="mt-4 bg-blue-100 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-800">
                    {goldenRuleAnswer === 'reject' ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  <p className="text-blue-700 text-sm mt-2">
                    <strong>Answer: B) Reject</strong> - Since "Reject" comes last alphabetically (R comes after A), 
                    it's our level of interest. With probability 0.75 ≥ 0.5, we predict the level of interest: "Reject". 
                    The model is 75% confident this student will be rejected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8">
          <ChapterNavigation showBottomNavigation={true} />
        </div>
      </div>
    </main>
  );
} 