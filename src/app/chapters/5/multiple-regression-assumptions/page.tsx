"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

type AssumptionTest = {
  name: string;
  pValue: number;
  passed: boolean;
  subTests?: Array<{
    name: string;
    pValue: number;
    passed: boolean;
  }>;
};

export default function MultipleRegressionAssumptions() {
  const [selectedAssumption, setSelectedAssumption] = useState<string | null>(null);

  // Sample data for the assumptions tests
  const assumptionTests: AssumptionTest[] = [
    {
      name: "Linearity",
      pValue: 0.0471,
      passed: 0.0471 >= 0.05,
      subTests: [
        {
          name: "weight",
          pValue: 0,
          passed: 0 >= 0.05
        },
        {
          name: "GPA",
          pValue: 0.0338,
          passed: 0.0338 >= 0.05
        }
      ]
    },
    {
      name: "Equal Spread",
      pValue: 0.0039,
      passed: 0.0039 >= 0.05,
    },
    {
      name: "Normality",
      pValue: 0,
      passed: 0 >= 0.05,
    }
  ];

  const handlePValueClick = (testName: string) => {
    setSelectedAssumption(testName);
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
              <span role="img" aria-label="multiple regression assumptions" className="text-4xl">📏</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Multiple Regression Assumptions</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding when multiple regression is valid</p>
            </div>
          </div>

          {/* Content Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Assumptions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-6">
                Multiple regression is useful when the regression model gives a reasonable reflection of reality.
                To use any of its results, the regression must be validated.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li><strong>Linearity:</strong> The relationship between the average value of y and each
                predictor must look linear.</li>
                <li><strong>Equal Spread:</strong> The errors (residuals) of the model must be about the
                same size everywhere. In other words, errors can't be small for individuals
                with certain characteristics (i.e., some combinations of x's) and large for
                individuals with other characteristics.</li>
                <li><strong>Normality:</strong> The shape of the overall distribution of the errors (residuals)
                should be well-described by a Normal curve.</li>
              </ul>
            </div>
          </section>

          {/* Tabs for Assumptions */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setSelectedAssumption('decision_process')} 
                  className="py-2 px-4 text-center border-b-2 font-medium text-sm border-[#ff8200] text-[#ff8200]"
                >
                  Decision Process
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-4">Practical Decision Process</h3>
                  <div className="bg-gray-50 p-5 rounded-lg mb-4">
                    <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                      <li><strong>Always start out by checking the p-values of the tests.</strong></li>
                      <li>If they are all passed (p-values of 5% or greater), the model is ok to use.</li>
                      <li>If any are failed and n &lt; 25, stop (the model is not a reasonable enough reflection of reality to use).</li>
                      <li>If any are failed and n ≥ 25, check the diagnostic plots corresponding to the failed tests to see if the violations are severe. If they are not, it still should be ok to use the model.</li>
                    </ol>
                    <div className="border-l-4 border-[#ff8200] pl-4 py-2 mt-4">
                      <p className="text-gray-700 italic">
                        Remember: A larger sample size (n ≥ 25) provides some protection against minor violations of assumptions.
                      </p>
                    </div>
                    
                    {/* Decision Tree Visualization */}
                    <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-[#58595b] mb-4">Decision Tree</h4>
                      <div className="flex justify-center">
                        <Image 
                          src="/images/regression-decision-tree.svg" 
                          alt="Decision tree for evaluating regression assumptions" 
                          width={700} 
                          height={380} 
                          className="mx-auto"
                        />
                      </div>
                      <p className="text-gray-600 text-sm mt-4 text-center">
                        Follow this decision tree to determine if your regression model is usable.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Assumptions Test Output Section - Moved up */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Tests of Assumptions Output</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="font-mono text-sm overflow-x-auto">
                <div className="mb-4">
                  <strong>Tests of Assumptions: (sample size n = 699):</strong>
                </div>
                
                {assumptionTests.map((test, index) => (
                  <div key={index} className="mb-3">
                    <div className="mb-1"><strong>{test.name}</strong></div>
                    
                    {test.subTests && test.subTests.map((subTest, subIndex) => (
                      <div key={subIndex} className="ml-4 mb-1">
                        p-value for {subTest.name} : {' '}
                        <button 
                          onClick={() => handlePValueClick(`${test.name}-${subTest.name}`)}
                          className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                            selectedAssumption === `${test.name}-${subTest.name}` 
                              ? subTest.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
                              : 'bg-yellow-50 hover:bg-gray-200'
                          }`}
                        >
                          {subTest.pValue}
                        </button>
                        {selectedAssumption === `${test.name}-${subTest.name}` && (
                          <span className={`${subTest.passed ? 'text-green-600' : 'text-red-600'} font-semibold ml-2`}>
                            {subTest.passed ? 'PASS' : 'FAIL'}
                          </span>
                        )}
                      </div>
                    ))}
                    
                    {test.subTests && (
                      <div className="ml-4 mb-1">
                        p-value for overall model : {' '}
                        <button 
                          onClick={() => handlePValueClick(`${test.name}-overall`)}
                          className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                            selectedAssumption === `${test.name}-overall` 
                              ? test.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
                              : 'bg-yellow-50 hover:bg-gray-200'
                          }`}
                        >
                          {test.pValue}
                        </button>
                        {selectedAssumption === `${test.name}-overall` && (
                          <span className={`${test.passed ? 'text-green-600' : 'text-red-600'} font-semibold ml-2`}>
                            {test.passed ? 'PASS' : 'FAIL'}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {!test.subTests && (
                      <div className="ml-4">
                        p-value is {' '}
                        <button 
                          onClick={() => handlePValueClick(test.name)}
                          className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                            selectedAssumption === test.name 
                              ? test.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
                              : 'bg-yellow-50 hover:bg-gray-200'
                          }`}
                        >
                          {test.pValue}
                        </button>
                        {selectedAssumption === test.name && (
                          <span className={`${test.passed ? 'text-green-600' : 'text-red-600'} font-semibold ml-2`}>
                            {test.passed ? 'PASS' : 'FAIL'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-[#f8f4e3] p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Understanding p-values in assumption tests:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="font-medium">p-value ≥ 0.05:</span> <span className="text-green-600 font-semibold">PASS</span> - The assumption is likely met</li>
                  <li><span className="font-medium">p-value &lt; 0.05:</span> <span className="text-red-600 font-semibold">FAIL</span> - The assumption may be violated</li>
                </ul>
                <div className="mt-4 text-gray-700">
                  <p>For this example, all assumptions are violated. However, with a large sample size (n = 699), 
                  the model may still be usable after examining the diagnostic plots for the severity of the violations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CR Multi Visual Section - Moved down */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#58595b] mb-3">Checking Regression Assumptions - Visual Guide</h3>
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/CR Multi Visuals.png" 
                  alt="Checking Multiple Regression Assumptions Output" 
                  width={600} 
                  height={400}
                  className="rounded shadow-sm"
                />
              </div>
              <div className="text-gray-600 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2">Simple Ways to Visually Assess Assumptions:</h4>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Linearity Check:</strong> Do the points follow the lines on the residual plot in a linear manner?
                    <p className="mt-1 text-sm">If the points are randomly scattered around the horizontal line in the residuals vs. fitted plot without clear patterns or curves, linearity is likely met.</p>
                  </li>
                  <li>
                    <strong>Equal Spread Check:</strong> Is there equal vertical spread across the entire residual plot?
                    <p className="mt-1 text-sm">Look for consistent vertical spread of points across the entire width of the plot. A funnel shape suggests unequal variance.</p>
                  </li>
                  <li>
                    <strong>Normality Check:</strong> Imagine your 10-year-old little sibling tried to trace the center red line. What letter grade would you give them? Did they pass?
                    <p className="mt-1 text-sm">If the points closely follow the diagonal line on the QQ plot (like a good tracing job), normality is likely satisfied.</p>
                  </li>
                </ol>
                <div className="mt-4 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-sm font-medium">
                    Remember: The visual assessment is often more important than the p-values, especially with large sample sizes where even minor deviations can lead to failed tests.
                  </p>
                </div>
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