"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

type Question = {
  id: number;
  variable: string;
  categories: string[];
  correctAnswer: string;
  explanation: string;
};

type EncodingQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export default function EncodingIndicatorVariables() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [encodingAnswers, setEncodingAnswers] = useState<{[key: number]: string}>({});
  const [showEncodingResults, setShowEncodingResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      variable: "Education Level",
      categories: ["High School", "Bachelor's", "Master's", "PhD"],
      correctAnswer: "Bachelor's",
      explanation: "Alphabetically, 'Bachelor's' comes first, so it becomes the reference level."
    },
    {
      id: 2,
      variable: "Day of Week",
      categories: ["Monday", "Wednesday", "Friday", "Sunday"],
      correctAnswer: "Friday",
      explanation: "When arranged alphabetically: Friday, Monday, Sunday, Wednesday - so Friday is the reference."
    },
    {
      id: 3,
      variable: "Product Type",
      categories: ["Laptop", "Desktop", "Tablet", "Phone"],
      correctAnswer: "Desktop",
      explanation: "Alphabetically: Desktop, Laptop, Phone, Tablet - Desktop comes first."
    },
    {
      id: 4,
      variable: "Region",
      categories: ["West", "East", "North", "South"],
      correctAnswer: "East",
      explanation: "In alphabetical order: East, North, South, West - East is the reference level."
    }
  ];

  const encodingQuestions: EncodingQuestion[] = [
    {
      id: 1,
      question: "What are the values of the 3 new variables when it is Fall?",
      options: ["All 1s", "All 0s", "1, 0, 0", "0, 1, 1"],
      correctAnswer: "All 0s",
      explanation: "Fall is the reference level, so when it's Fall, all indicator variables (SeasonSpring, SeasonSummer, SeasonWinter) equal 0."
    },
    {
      id: 2,
      question: "Why doesn't Fall have its own indicator variable?",
      options: [
        "It's not important enough",
        "It's the reference level (first alphabetically)",
        "There was an error in the data",
        "Fall is not a real season"
      ],
      correctAnswer: "It's the reference level (first alphabetically)",
      explanation: "Fall doesn't need its own variable because it's the reference level. It's represented when all other season indicators equal 0."
    },
    {
      id: 3,
      question: "If a categorical variable has 5 levels, how many indicator variables are created?",
      options: ["5", "4", "6", "3"],
      correctAnswer: "4",
      explanation: "The N-1 rule: 5 levels means 4 indicator variables. One level becomes the reference (represented when all indicators = 0)."
    },
    {
      id: 4,
      question: "When analyzing Summer data, which variable gets encoded as 1?",
      options: ["SeasonSpring", "SeasonSummer", "SeasonWinter", "All of them"],
      correctAnswer: "SeasonSummer",
      explanation: "When analyzing a particular level (Summer), that specific indicator variable (SeasonSummer) gets encoded as 1, while all others are 0."
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id]);

  // Encoding quiz handlers
  const handleEncodingAnswerSelect = (questionId: number, answer: string) => {
    setEncodingAnswers({
      ...encodingAnswers,
      [questionId]: answer
    });
  };

  const handleEncodingSubmit = () => {
    setShowEncodingResults(true);
  };

  const handleEncodingReset = () => {
    setEncodingAnswers({});
    setShowEncodingResults(false);
  };

  const getEncodingScore = () => {
    let correct = 0;
    encodingQuestions.forEach(q => {
      if (encodingAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const allEncodingAnswered = encodingQuestions.every(q => encodingAnswers[q.id]);

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
              <span role="img" aria-label="encoding" className="text-4xl">🎨</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Encoding Indicator Variables</h1>
              <p className="text-xl text-gray-600 mt-2">Transform categories into regression-ready variables</p>
            </div>
          </div>

          {/* What are Indicator Variables */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">What are Indicator Variables?</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Indicator variables are categorical X's (predictor variables) in your regression model.</strong> 
                Unlike continuous variables like age or income, categorical variables represent distinct groups or categories 
                like gender, education level, or product type.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">✅ Categorical Variables</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Gender (Male, Female)</li>
                  <li>Education (High School, College, Graduate)</li>
                  <li>Region (North, South, East, West)</li>
                  <li>Product Type (Basic, Premium, Deluxe)</li>
                  <li>Day of Week (Monday, Tuesday, Wednesday...)</li>
                  <li>Season (Spring, Summer, Fall, Winter)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-red-800 mb-2">❌ Not Categorical</h3>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Age (25, 30, 45)</li>
                  <li>Income ($50K, $75K, $100K)</li>
                  <li>Temperature (70°F, 85°F, 90°F)</li>
                  <li>Sales Amount ($1,200, $2,500)</li>
                  <li>Years of Experience (2, 5, 10)</li>
                  <li>Number of Products Sold (15, 32, 48)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Reference Level Explanation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Understanding Reference Levels</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">🔤 The Alphabetical Rule</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>The reference level is automatically chosen as the first category alphabetically.</strong> 
                This becomes your "baseline" - the group that all other categories are compared against in the regression.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-gray-800 mb-2">Example: Education Level</h4>
                <p className="text-gray-600 mb-2">Categories: ["Master's", "Bachelor's", "High School", "PhD"]</p>
                <p className="text-gray-600 mb-2">Alphabetical order: Bachelor's, High School, Master's, PhD</p>
                <p className="font-semibold text-yellow-700">Reference Level: <span className="bg-yellow-200 px-2 py-1 rounded">Bachelor's</span></p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Why Does This Matter?</h4>
              <p className="text-gray-700">
                The reference level doesn't get its own indicator variable - it's represented when all other indicators equal 0. 
                All regression coefficients tell you the difference compared to this reference group.
              </p>
            </div>
          </section>

          {/* Interactive Activity for Reference Levels */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 Reference Level Challenge</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                For each categorical variable, select which category would be the reference level:
              </h3>
              
              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Question {question.id}: {question.variable}
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Categories: {question.categories.join(", ")}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {question.categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleAnswerSelect(question.id, category)}
                          disabled={showResults}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            selectedAnswers[question.id] === category
                              ? showResults
                                ? category === question.correctAnswer
                                  ? 'border-green-500 bg-green-50 text-green-800'
                                  : 'border-red-500 bg-red-50 text-red-800'
                                : 'border-[#ff8200] bg-[#fff5e6] text-[#ff8200]'
                              : showResults && category === question.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-[#ff8200] hover:bg-[#fff5e6]'
                          } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {category}
                          {showResults && category === question.correctAnswer && (
                            <span className="ml-2">✓</span>
                          )}
                          {showResults && selectedAnswers[question.id] === category && category !== question.correctAnswer && (
                            <span className="ml-2">✗</span>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {showResults && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                {!showResults ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      allAnswered
                        ? 'bg-[#ff8200] text-white hover:bg-[#ff9933]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-[#58595b]">
                        Score: {getScore()} / {questions.length}
                      </span>
                      <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                        getScore() === questions.length
                          ? 'bg-green-100 text-green-800'
                          : getScore() >= questions.length * 0.75
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getScore() === questions.length
                          ? 'Perfect!'
                          : getScore() >= questions.length * 0.75
                          ? 'Good Job!'
                          : 'Keep Practicing!'}
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Encoding Process Activity */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔢 How Encoding Actually Works</h2>
            
            <div className="bg-white border-2 border-purple-400 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                🎯 The Magic of 1s and 0s: When analyzing a particular level, it gets encoded as 1!
              </h3>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-800 mb-3">Example: Season Variable</h4>
                <p className="text-gray-700 mb-4">
                  Let's see how "Season" with 4 categories (Fall, Spring, Summer, Winter) gets transformed into indicator variables:
                </p>
                
                {/* Encoding Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Season</th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-semibold bg-red-100">Fall</th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-semibold bg-blue-100">Spring</th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-semibold bg-green-100">Summer</th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-semibold bg-yellow-100">Winter</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 bg-gray-100"></td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-50"></td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-50"></td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-50"></td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-50"></td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">SeasonSpring</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-red-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-blue-50 font-bold text-blue-800">1</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-green-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-yellow-50">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">SeasonSummer</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-red-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-blue-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-green-50 font-bold text-green-800">1</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-yellow-50">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">SeasonWinter</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-red-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-blue-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-green-50">0</td>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-yellow-50 font-bold text-yellow-800">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Interactive Encoding Questions */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-800">Test Your Understanding:</h4>
                {encodingQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">
                      {question.question}
                    </h5>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleEncodingAnswerSelect(question.id, option)}
                          disabled={showEncodingResults}
                          className={`p-3 rounded-lg border-2 transition-colors text-left ${
                            encodingAnswers[question.id] === option
                              ? showEncodingResults
                                ? option === question.correctAnswer
                                  ? 'border-green-500 bg-green-50 text-green-800'
                                  : 'border-red-500 bg-red-50 text-red-800'
                                : 'border-purple-500 bg-purple-50 text-purple-800'
                              : showEncodingResults && option === question.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-purple-500 hover:bg-purple-50'
                          } ${showEncodingResults ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {option}
                          {showEncodingResults && option === question.correctAnswer && (
                            <span className="ml-2">✓</span>
                          )}
                          {showEncodingResults && encodingAnswers[question.id] === option && option !== question.correctAnswer && (
                            <span className="ml-2">✗</span>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {showEncodingResults && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                {!showEncodingResults ? (
                  <button
                    onClick={handleEncodingSubmit}
                    disabled={!allEncodingAnswered}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      allEncodingAnswered
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-[#58595b]">
                        Score: {getEncodingScore()} / {encodingQuestions.length}
                      </span>
                      <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                        getEncodingScore() === encodingQuestions.length
                          ? 'bg-green-100 text-green-800'
                          : getEncodingScore() >= encodingQuestions.length * 0.75
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getEncodingScore() === encodingQuestions.length
                          ? 'Encoding Master!'
                          : getEncodingScore() >= encodingQuestions.length * 0.75
                          ? 'Almost There!'
                          : 'Keep Learning!'}
                      </span>
                    </div>
                    <button
                      onClick={handleEncodingReset}
                      className="px-6 py-3 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* N-1 Rule Explanation */}
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
              <h4 className="font-semibold text-orange-800 mb-3">📐 The N-1 Rule</h4>
              <p className="text-gray-700 mb-4">
                <strong>Mathematical relationship:</strong> If you have N levels in a categorical variable, 
                you create (N-1) indicator variables.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Season example:</strong> 4 levels → 3 indicator variables<br/>
                  <strong>Why?</strong> Fall (reference level) is represented when all other indicators = 0
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 