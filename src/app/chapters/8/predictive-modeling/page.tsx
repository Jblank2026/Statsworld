"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function PredictiveModeling() {
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
              <span role="img" aria-label="predictive modeling" className="text-4xl">🔮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Predictive Modeling</h1>
              <p className="text-xl text-gray-600 mt-2">Building models for prediction and forecasting</p>
            </div>
          </div>

          {/* Generalization Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Generalization & RMSE</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Generalization</strong> is the ultimate goal of predictive modeling. We want our model to perform well not just on the data we used to build it, but on <em>new, unseen data</em>.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h3 className="font-semibold text-blue-800 mb-2">RMSE_generalization</h3>
                <p className="text-blue-700">
                  This represents how well our model will perform on new data. It's the metric we truly care about in predictive modeling.
                </p>
              </div>
              
              <p className="text-gray-700 mt-4">
                The challenge? We can't directly measure RMSE_generalization because we don't have access to all future data. 
                This is where data splitting strategies become crucial.
              </p>
            </div>
          </section>

          {/* Overfitting Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">The Overfitting Challenge</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-3">Overfitting: The Primary Enemy</h3>
              <p className="text-red-700 mb-3">
                <strong>Overfitting</strong> occurs when a model learns the training data <em>too well</em>, including its noise and peculiarities. 
                The result? Excellent performance on training data but poor performance on new data.
              </p>
              
              <div className="bg-white p-4 rounded border border-red-200">
                <p className="text-gray-700">
                  <span className="font-semibold">Example:</span> A model that memorizes that "customer #47 always buys on Tuesdays" 
                  instead of learning general patterns like "customers tend to buy more on weekdays."
                </p>
              </div>
            </div>
          </section>

          {/* Data Splitting Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Data Splitting Strategy</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="text-gray-700 mb-6">
                To combat overfitting and estimate generalization performance, we split our data into three sets:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">🏗️ Training Set</h3>
                  <p className="text-blue-700 text-sm mb-2"><strong>Purpose:</strong> Build the model</p>
                  <p className="text-blue-700 text-sm"><strong>Typical Size:</strong> 60-70% of data</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-2">🔍 Validation Set</h3>
                  <p className="text-yellow-700 text-sm mb-2"><strong>Purpose:</strong> Model selection & tuning</p>
                  <p className="text-yellow-700 text-sm"><strong>Typical Size:</strong> 15-20% of data</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2">🎯 Test Set</h3>
                  <p className="text-green-700 text-sm mb-2"><strong>Purpose:</strong> Final performance estimate</p>
                  <p className="text-green-700 text-sm"><strong>Typical Size:</strong> 15-20% of data</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Key Insight</h4>
                <p className="text-gray-700">
                  The test set acts as a "time machine" - it simulates how your model will perform on truly new data. 
                  Never use the test set for model building or selection!
                </p>
              </div>
            </div>
          </section>

          {/* Occam's Razor Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Occam's Razor in Model Selection</h2>
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">The Simplicity Principle</h3>
              <p className="text-green-700 mb-4">
                <strong>Occam's razor</strong> tells us to prefer simpler models when they perform similarly to complex ones. 
                In predictive modeling, this principle helps us choose models that generalize better.
              </p>
              
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">The 1 Standard Deviation Rule</h4>
                <p className="text-gray-700 mb-3">
                  When comparing models, choose the simplest model whose validation error is within 1 standard deviation 
                  of the best-performing model's error.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Benefits of Simpler Models:</h5>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Better generalization</li>
                      <li>Easier to interpret</li>
                      <li>Faster to train and predict</li>
                      <li>More robust to new data</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Costs of Complex Models:</h5>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Higher risk of overfitting</li>
                      <li>Harder to understand</li>
                      <li>More computational resources</li>
                      <li>Sensitive to data quirks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Demonstration */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Visual Demonstration: Model Complexity vs Performance</h2>
            <div className="bg-white border rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/buildmodel.png" 
                  alt="Model Complexity vs Performance" 
                  width={600} 
                  height={400}
                  className="rounded shadow-sm"
                />
              </div>
              <div className="text-gray-600 text-sm">
                <p className="mb-2">
                  <strong>Key Observations:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="text-red-600">Red line (validation error):</span> Shows the U-shaped curve typical in model selection</li>
                  <li><span className="text-blue-600">Blue dots (training error):</span> Always decreases as complexity increases</li>
                  <li><span className="text-gray-500">Dotted line:</span> The 1 standard deviation threshold for model selection</li>
                  <li><span className="font-semibold">Circled model:</span> The optimal choice according to Occam's razor - simplest model within the threshold</li>
                </ul>
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