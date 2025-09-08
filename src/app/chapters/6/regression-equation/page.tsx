"use client";
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function RegressionEquation() {
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
              <span role="img" aria-label="regression equation" className="text-4xl">🔢</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Regression Equation with Categorical Variables</h1>
              <p className="text-xl text-gray-600 mt-2">Building equations with indicator variables</p>
            </div>
          </div>

          <section className="mb-8">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="bg-[#f8f4e3] mb-4 py-2 px-4 rounded-md inline-block">
                <span className="font-semibold text-[#58595b]">Population Equation with Categories</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-2xl font-bold font-mono">μ<sub>y|x</sub> = β₀ + β₁x₁ + β₂x₂ + β₃I₃ + β₄I₄</span>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">The Components:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li><strong>β₀ (intercept):</strong> Expected Y when all continuous variables = 0 and all categorical variables are at reference level</li>
                    <li><strong>β₁, β₂ (continuous slopes):</strong> Expected change in Y per unit increase in x₁ or x₂, holding other variables constant</li>
                    <li><strong>β₃, β₄ (category effects):</strong> Expected difference in Y for each category compared to reference level</li>
                    <li><strong>I₃, I₄ (indicator variables):</strong> Equal 1 if observation belongs to that category, 0 otherwise</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-[#f8f4e3] mb-4 py-2 px-4 rounded-md inline-block">
                <span className="font-semibold text-[#58595b]">Sample Equation with Categories</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-2xl font-bold font-mono">ŷ = b₀ + b₁x₁ + b₂x₂ + b₃I₃ + b₄I₄</span>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#58595b] mb-2">The Components:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li><strong>b₀ (intercept):</strong> Predicted Y when all continuous variables = 0 and all categorical variables are at reference level</li>
                    <li><strong>b₁, b₂ (continuous slopes):</strong> Predicted change in Y per unit increase in x₁ or x₂, holding other variables constant</li>
                    <li><strong>b₃, b₄ (category effects):</strong> Predicted difference in Y for each category compared to reference level</li>
                    <li><strong>I₃, I₄ (indicator variables):</strong> Equal 1 if observation belongs to that category, 0 otherwise</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Real Example: Restaurant Tips</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="bg-[#f8f4e3] mb-4 py-2 px-4 rounded-md inline-block">
                <span className="font-semibold text-[#58595b]">Actual Equation</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-xl font-bold font-mono text-blue-800">
                  TipPercentage = 20.586 - 0.271(Bill) + 0.592(PartySize) - 1.000(DaySaturday) + 0.914(DaySunday)
                </span>
              </div>
              
              <div className="space-y-6 mt-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Variable Definitions:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>TipPercentage:</strong> Outcome variable (Y)</p>
                      <p><strong>Bill:</strong> Bill amount in dollars (continuous)</p>
                      <p><strong>PartySize:</strong> Number of people (continuous)</p>
                    </div>
                    <div>
                      <p><strong>DaySaturday:</strong> 1 if Saturday, 0 otherwise</p>
                      <p><strong>DaySunday:</strong> 1 if Sunday, 0 otherwise</p>
                      <p><strong>Reference Level:</strong> Friday (both indicators = 0)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Example Predictions:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                      <p className="font-semibold text-green-800">Friday, $50 bill, party of 4:</p>
                      <p className="font-mono text-green-700">
                        TipPercentage = 20.586 - 0.271(50) + 0.592(4) - 1.000(0) + 0.914(0)
                      </p>
                      <p className="font-mono text-green-700">
                        = 20.586 - 13.55 + 2.368 - 0 + 0 = <strong>9.40%</strong>
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="font-semibold text-yellow-800">Saturday, $50 bill, party of 4:</p>
                      <p className="font-mono text-yellow-700">
                        TipPercentage = 20.586 - 0.271(50) + 0.592(4) - 1.000(1) + 0.914(0)
                      </p>
                      <p className="font-mono text-yellow-700">
                        = 20.586 - 13.55 + 2.368 - 1.000 + 0 = <strong>8.40%</strong>
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                      <p className="font-semibold text-purple-800">Sunday, $50 bill, party of 4:</p>
                      <p className="font-mono text-purple-700">
                        TipPercentage = 20.586 - 0.271(50) + 0.592(4) - 1.000(0) + 0.914(1)
                      </p>
                      <p className="font-mono text-purple-700">
                        = 20.586 - 13.55 + 2.368 - 0 + 0.914 = <strong>10.32%</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Definitions for Categorical Variables</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top w-1/4">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">μ<sub>y|x</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The average value of y among all individuals in the population who share the same values of all x variables (continuous and categorical)
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">I<sub>j</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      Indicator variable that equals 1 if the observation belongs to category j, and 0 otherwise
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-start">
                        <span className="font-mono font-bold text-lg text-[#58595b]">Reference Level</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The category that is represented when all indicator variables equal 0 (typically the first category alphabetically)
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">β<sub>j</sub> (category)</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The expected difference in Y between category j and the reference category, holding all other variables constant
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">β<sub>k</sub> (continuous)</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The expected change in Y per unit increase in continuous variable x<sub>k</sub>, holding all other variables constant
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">N-1 Rule</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      For a categorical variable with N categories, we include N-1 indicator variables in the regression (one category serves as reference)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Insight */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-3">🔑 Key Insight</h3>
            <p className="text-yellow-700 mb-3">
              <strong>Categorical variables create "parallel lines"</strong> - each category has the same relationship with continuous variables (same slopes), 
              but different intercepts (vertical shifts).
            </p>
            <p className="text-yellow-700 text-sm">
              In our tip example, the effect of bill amount (-0.271%) is the same regardless of day, 
              but each day starts from a different baseline compared to Friday.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 