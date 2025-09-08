"use client";
import Link from 'next/link';

export default function MagicFormula() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/4" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Simple Linear Regression
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="magic formula" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">The Magic Formula</h1>
              <p className="text-xl text-gray-600 mt-2">The simple linear regression equation y = β₀ + β₁x</p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Understanding the Equation</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold font-mono">y = β₀ + β₁x</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">Variables</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>y</strong>: Dependent variable (outcome)</li>
                    <li><strong>x</strong>: Independent variable (predictor)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">Parameters</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>β₀</strong>: Y-intercept (value of y when x=0)</li>
                    <li><strong>β₁</strong>: Slope (change in y per unit change in x)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              The simple linear regression equation represents a straight line that best fits your data points. 
              It allows you to make predictions about y based on values of x.
            </p>
            
            <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded mb-6">
              <p className="text-gray-700">
                <strong>Example:</strong> If we're predicting exam scores (y) based on study hours (x), and find that 
                β₀ = 50 and β₁ = 5, our equation would be: y = 50 + 5x. This means a student who doesn't study at all (x=0) 
                is expected to score 50, and each additional hour of study adds 5 points to the expected score.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#58595b] mb-4">Interpreting the Coefficients</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">The Y-Intercept (β₀)</h3>
              <p className="text-gray-600 mb-4">
                The y-intercept represents the expected value of y when x equals zero. It's where the regression line 
                crosses the y-axis. However, be careful with interpretation - sometimes x=0 isn't practically meaningful!
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">The Slope (β₁)</h3>
              <p className="text-gray-600 mb-4">
                The slope tells us how much y changes for each one-unit increase in x. It represents the rate of change 
                and the direction of the relationship:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li><strong>Positive slope (β₁ &gt; 0)</strong>: As x increases, y tends to increase</li>
                <li><strong>Negative slope (β₁ &lt; 0)</strong>: As x increases, y tends to decrease</li>
                <li><strong>Zero slope (β₁ = 0)</strong>: Changes in x are not associated with changes in y</li>
              </ul>
            </div>
          </section>

          {/* Navigation Links */}
          <div className="flex justify-between items-center">
            <Link
              href="/chapters/4"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chapter Overview
            </Link>
            <Link
              href="/chapters/4/perfect-fit"
              className="text-[#ff8200] hover:text-[#ff9933] flex items-center"
            >
              Next: Finding the Perfect Fit
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 