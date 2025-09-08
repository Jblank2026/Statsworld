"use client";
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function ConfusionMatrices() {
  const [selectedExample, setSelectedExample] = useState('basic');

  // Example data for different scenarios
  const examples = {
    basic: {
      title: "Basic Example",
      description: "A typical confusion matrix",
      data: {
        tp: 35, // True Positives
        tn: 45, // True Negatives  
        fp: 12, // False Positives
        fn: 8   // False Negatives
      }
    },
    medical: {
      title: "Medical Test",
      description: "High accuracy, low false negatives preferred",
      data: {
        tp: 38,
        tn: 55,
        fp: 5,
        fn: 2
      }
    },
    spam: {
      title: "Spam Detection", 
      description: "Low false positives preferred",
      data: {
        tp: 42,
        tn: 50,
        fp: 3,
        fn: 5
      }
    }
  };

  const currentExample = examples[selectedExample as keyof typeof examples];
  const { tp, tn, fp, fn } = currentExample.data;
  const total = tp + tn + fp + fn;
  const accuracy = ((tp + tn) / total * 100).toFixed(1);
  const misclassificationRate = ((fp + fn) / total * 100).toFixed(1);
  const sensitivity = (tp / (tp + fn) * 100).toFixed(1);
  const specificity = (tn / (tn + fp) * 100).toFixed(1);

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
              <span role="img" aria-label="confusion matrix" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Confusion Matrices & Accuracy</h1>
              <p className="text-xl text-gray-600 mt-2">Evaluating logistic regression performance</p>
            </div>
          </div>

          {/* Concept Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📊 What is a Confusion Matrix?</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 The Big Picture</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    A confusion matrix shows how well your logistic regression predicts by comparing 
                    <strong> actual outcomes</strong> vs <strong>predicted outcomes</strong>.
                  </p>
                  <p className="text-blue-700 text-sm">
                    It breaks down your predictions into four categories: correct predictions and two types of errors.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">📈 Why It Matters</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Unlike just looking at overall accuracy, confusion matrices show you 
                    <strong> what types of mistakes</strong> your model makes.
                  </p>
                  <p className="text-blue-700 text-sm">
                    This helps you understand if your model is better at predicting one outcome vs another.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Confusion Matrix */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎮 Interactive Confusion Matrix</h2>
            <div className="bg-white border-2 border-[#ff8200] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Explore Different Scenarios
              </h3>
              
              {/* Controls */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap">
                  <button
                    onClick={() => setSelectedExample('basic')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'basic'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Basic Example
                  </button>
                  <button
                    onClick={() => setSelectedExample('medical')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'medical'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Medical Test
                  </button>
                  <button
                    onClick={() => setSelectedExample('spam')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedExample === 'spam'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Spam Detection
                  </button>
                </div>
              </div>

              {/* Confusion Matrix Visualization */}
              <div className="flex justify-center mb-6">
                <div className="bg-white p-6 rounded-lg border border-gray-300">
                  <h4 className="text-center font-bold text-gray-800 mb-4">{currentExample.title}</h4>
                  
                  {/* Matrix with Marginal Distributions */}
                  <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
                    {/* Header row */}
                    <div></div>
                    <div className="text-center font-bold text-sm bg-gray-100 p-2 rounded">Predicted: YES</div>
                    <div className="text-center font-bold text-sm bg-gray-100 p-2 rounded">Predicted: NO</div>
                    <div className="text-center font-bold text-sm bg-blue-100 p-2 rounded">Row Total</div>
                    
                    {/* Actual YES row */}
                    <div className="font-bold text-sm bg-gray-100 p-2 rounded text-center">Actual: YES</div>
                    <div className="bg-green-100 border-2 border-green-400 p-4 rounded text-center">
                      <div className="font-bold text-green-800">TRUE POSITIVE</div>
                      <div className="text-2xl font-bold text-green-700">{tp}</div>
                      <div className="text-xs text-green-600">Correctly predicted YES</div>
                    </div>
                    <div className="bg-red-100 border-2 border-red-400 p-4 rounded text-center">
                      <div className="font-bold text-red-800">FALSE NEGATIVE</div>
                      <div className="text-2xl font-bold text-red-700">{fn}</div>
                      <div className="text-xs text-red-600">Missed (should be YES)</div>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-300 p-4 rounded text-center">
                      <div className="font-bold text-blue-800">ACTUAL YES</div>
                      <div className="text-2xl font-bold text-blue-700">{tp + fn}</div>
                      <div className="text-xs text-blue-600">Total actual positives</div>
                    </div>
                    
                    {/* Actual NO row */}
                    <div className="font-bold text-sm bg-gray-100 p-2 rounded text-center">Actual: NO</div>
                    <div className="bg-red-100 border-2 border-red-400 p-4 rounded text-center">
                      <div className="font-bold text-red-800">FALSE POSITIVE</div>
                      <div className="text-2xl font-bold text-red-700">{fp}</div>
                      <div className="text-xs text-red-600">False alarm (should be NO)</div>
                    </div>
                    <div className="bg-green-100 border-2 border-green-400 p-4 rounded text-center">
                      <div className="font-bold text-green-800">TRUE NEGATIVE</div>
                      <div className="text-2xl font-bold text-green-700">{tn}</div>
                      <div className="text-xs text-green-600">Correctly predicted NO</div>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-300 p-4 rounded text-center">
                      <div className="font-bold text-blue-800">ACTUAL NO</div>
                      <div className="text-2xl font-bold text-blue-700">{fp + tn}</div>
                      <div className="text-xs text-blue-600">Total actual negatives</div>
                    </div>
                    
                    {/* Column totals row */}
                    <div className="font-bold text-sm bg-blue-100 p-2 rounded text-center">Column Total</div>
                    <div className="bg-blue-100 border-2 border-blue-300 p-4 rounded text-center">
                      <div className="font-bold text-blue-800">PREDICTED YES</div>
                      <div className="text-2xl font-bold text-blue-700">{tp + fp}</div>
                      <div className="text-xs text-blue-600">Total predicted positives</div>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-300 p-4 rounded text-center">
                      <div className="font-bold text-blue-800">PREDICTED NO</div>
                      <div className="text-2xl font-bold text-blue-700">{fn + tn}</div>
                      <div className="text-xs text-blue-600">Total predicted negatives</div>
                    </div>
                    <div className="bg-purple-100 border-2 border-purple-300 p-4 rounded text-center">
                      <div className="font-bold text-purple-800">GRAND TOTAL</div>
                      <div className="text-2xl font-bold text-purple-700">{total}</div>
                      <div className="text-xs text-purple-600">All observations</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-blue-800">📊 Accuracy</h4>
                  <div className="text-2xl font-bold text-blue-700">{accuracy}%</div>
                  <div className="text-xs text-blue-600">Overall correct predictions</div>
                  <div className="text-xs text-blue-500 mt-1">({tp + tn}/{total})</div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-red-800">❌ Misclassification Rate</h4>
                  <div className="text-2xl font-bold text-red-700">{misclassificationRate}%</div>
                  <div className="text-xs text-red-600">Overall incorrect predictions</div>
                  <div className="text-xs text-red-500 mt-1">({fp + fn}/{total})</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-green-800">🎯 Sensitivity</h4>
                  <div className="text-2xl font-bold text-green-700">{sensitivity}%</div>
                  <div className="text-xs text-green-600">Correctly identified positives</div>
                  <div className="text-xs text-green-500 mt-1">({tp}/{tp + fn})</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-purple-800">🛡️ Specificity</h4>
                  <div className="text-2xl font-bold text-purple-700">{specificity}%</div>
                  <div className="text-xs text-purple-600">Correctly identified negatives</div>
                  <div className="text-xs text-purple-500 mt-1">({tn}/{tn + fp})</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {currentExample.description}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedExample === 'basic' && 'A well-balanced model with good performance across all metrics.'}
                  {selectedExample === 'medical' && 'Medical tests prioritize catching all positive cases (high sensitivity) to avoid missing diseases.'}
                  {selectedExample === 'spam' && 'Spam filters prioritize avoiding false positives to prevent blocking important emails.'}
                </p>
              </div>
            </div>
          </section>

          {/* Key Concepts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🔑 Understanding the Four Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ True Positive (TP)</h4>
                <p className="text-green-700 text-sm">
                  Model predicted YES and it was actually YES. These are correct positive predictions.
                </p>
                <p className="text-green-600 text-xs mt-2"><strong>Example:</strong> Predicted spam, was actually spam</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ True Negative (TN)</h4>
                <p className="text-green-700 text-sm">
                  Model predicted NO and it was actually NO. These are correct negative predictions.
                </p>
                <p className="text-green-600 text-xs mt-2"><strong>Example:</strong> Predicted not spam, was actually not spam</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">❌ False Positive (FP)</h4>
                <p className="text-red-700 text-sm">
                  Model predicted YES but it was actually NO. These are "false alarms."
                </p>
                <p className="text-red-600 text-xs mt-2"><strong>Example:</strong> Predicted spam, but was actually legitimate email</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">❌ False Negative (FN)</h4>
                <p className="text-red-700 text-sm">
                  Model predicted NO but it was actually YES. These are "missed detections."
                </p>
                <p className="text-red-600 text-xs mt-2"><strong>Example:</strong> Predicted not spam, but was actually spam</p>
              </div>
            </div>
          </section>

          {/* Accuracy & Misclassification Formulas */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">📐 Key Performance Metrics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Accuracy */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Accuracy Formula</h3>
                
                <div className="bg-white p-4 rounded border text-center mb-4">
                  <div className="text-xl font-mono font-bold text-gray-800 mb-2">
                    Accuracy = (TP + TN) / Total
                  </div>
                  <div className="text-sm text-gray-600">
                    Correct Predictions / All Predictions
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-1">What it measures:</h4>
                    <p className="text-green-700 text-sm">
                      Overall percentage of correct predictions (both positive and negative)
                    </p>
                  </div>
                  
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-1">When to use:</h4>
                    <p className="text-green-700 text-sm">
                      When you care equally about both types of correct predictions
                    </p>
                  </div>
                </div>
              </div>

              {/* Misclassification Rate */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Misclassification Rate</h3>
                
                <div className="bg-white p-4 rounded border text-center mb-4">
                  <div className="text-xl font-mono font-bold text-gray-800 mb-2">
                    Error Rate = (FP + FN) / Total
                  </div>
                  <div className="text-sm text-gray-600">
                    Incorrect Predictions / All Predictions
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-red-100 p-3 rounded">
                    <h4 className="font-semibold text-red-800 mb-1">What it measures:</h4>
                    <p className="text-red-700 text-sm">
                      Overall percentage of incorrect predictions (both false positives and false negatives)
                    </p>
                  </div>
                  
                  <div className="bg-red-100 p-3 rounded">  
                    <h4 className="font-semibold text-red-800 mb-1">Key relationship:</h4>
                    <p className="text-red-700 text-sm">
                      Misclassification Rate = 1 - Accuracy (they always add up to 100%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Pro Tip:</strong> While accuracy shows what percentage you got right, 
                misclassification rate shows what percentage you got wrong. Both are useful - 
                accuracy for positive framing, error rate for understanding risk and areas for improvement!
              </p>
            </div>
          </section>

          {/* Naive Model Baseline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">🎯 The Naive Model Baseline</h2>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              
              {/* Key Message */}
              <div className="bg-white p-6 rounded border text-center mb-6">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">
                  The naive model classifies everyone as having whatever level was the <span className="text-orange-600">majority</span> in the dataset.
                </h3>
              </div>

              {/* Visual Demonstration */}
              <div className="bg-white p-6 rounded border">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Visual Example</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Dataset */}
                  <div className="text-center">
                    <h5 className="font-bold text-gray-700 mb-3">Your Dataset</h5>
                    <div className="bg-gray-100 p-4 rounded">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 font-medium">❌ NO:</span>
                          <span className="font-bold">{fp + tn} cases</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">✅ YES:</span>
                          <span className="font-bold">{tp + fn} cases</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 font-medium">Majority:</span>
                          <span className="font-bold text-blue-700">
                            {(fp + tn) > (tp + fn) ? 'NO' : 'YES'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-4xl text-orange-500">→</div>
                    <div className="text-sm text-gray-600 mt-2">Naive Model</div>
                  </div>

                  {/* Naive Predictions */}
                  <div className="text-center">
                    <h5 className="font-bold text-gray-700 mb-3">Naive Model Predictions</h5>
                    <div className="bg-orange-100 p-4 rounded">
                                             <div className="text-2xl font-bold text-orange-700 mb-2">
                         Predict {(fp + tn) > (tp + fn) ? 'NO' : 'YES'}
                       </div>
                      <div className="text-sm text-orange-600">
                        Accuracy: {(fp + tn) > (tp + fn) ? 
                          ((fp + tn) / total * 100).toFixed(1) : 
                          ((tp + fn) / total * 100).toFixed(1)
                        }%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-700 text-sm">
                    Your logistic regression should beat this naive accuracy to be considered useful!
                  </p>
                </div>
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