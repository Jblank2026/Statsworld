"use client";
import Link from 'next/link';
import Image from 'next/image';
import ChapterNavigation from '../../../components/ChapterNavigation';
import { useState, useEffect } from 'react';
import { ReactNode } from 'react';

type ExplanationKey = 'intercept' | 'bill' | 'partySize' | 'daySaturday' | 'daySunday' | 'residualError' | 'rSquared' | 'adjRSquared';

export default function InterpretingSummaryOutput() {
  const [selectedSection, setSelectedSection] = useState<ExplanationKey | ''>('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Define the explanations text
  const explanationTexts: Record<ExplanationKey, string> = {
    intercept: "The average tip percentage among entities whose predictors are all 0 is expected to be 20.586%.",
    bill: "Two otherwise identical parties that differ in bill amount by $1 are expected to differ in tip percentage by 0.271%, where parties with higher bills are expected to have lower tip percentages.",
    partySize: "Two otherwise identical parties that differ in party size by 1 person are expected to differ in tip percentage by 0.592%, where larger parties are expected to have higher tip percentages.",
    daySaturday: "Among equal sized parties with equal sized bills, tip percentages on Saturday are, on average, 1.000% smaller than on Friday.",
    daySunday: "Among equal sized parties with equal sized bills, tip percentages on Sunday are, on average, 0.914% larger than on Friday.",
    residualError: "We typically miss by 2.845 percentage points when predicting tip percentages with our model.",
    rSquared: "14.2% of the variation in tip percentages is explained by the variation in bill amount, party size, and day of week.",
    adjRSquared: "12.8% of the variation in tip percentages is explained by the variation in bill amount, party size, and day of week, adjusted for the number of predictors."
  };

  // Handle typing animation
  useEffect(() => {
    if (selectedSection) {
      const fullText = explanationTexts[selectedSection];
      setIsTyping(true);
      setTypedText('');
      
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20); // Speed of typing

      return () => clearInterval(typingInterval);
    }
  }, [selectedSection]);

  // Handle Easter Egg
  const triggerEasterEgg = () => {
    setIsShaking(true);
    
    // Stop shaking after 1 second
    setTimeout(() => {
      setIsShaking(false);
      setShowEasterEgg(true);
    }, 1000);
  };

  const explanations: Record<ExplanationKey, ReactNode> = {
    intercept: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Intercept (20.586%)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'intercept' && <span className="animate-pulse">|</span>}
        </p>
        {!isTyping && selectedSection === 'intercept' && (
          <p className="text-gray-700 text-sm mt-2">
            While a party of 0 people with a $0 bill on Friday isn't realistic, the intercept provides the baseline for calculating all predictions in the model.
          </p>
        )}
      </div>
    ),
    bill: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Bill Coefficient (-0.271%)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'bill' && <span className="animate-pulse">|</span>}
        </p>
        {!isTyping && selectedSection === 'bill' && (
          <p className="text-gray-700 text-sm mt-2">
            This suggests that people tend to tip a smaller percentage on larger bills - a common behavioral pattern in tipping.
          </p>
        )}
      </div>
    ),
    partySize: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Party Size Coefficient (0.592%)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'partySize' && <span className="animate-pulse">|</span>}
        </p>

      </div>
    ),
    daySaturday: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Saturday Coefficient (-1.000%)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'daySaturday' && <span className="animate-pulse">|</span>}
        </p>

      </div>
    ),
    daySunday: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Sunday Coefficient (0.914%)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'daySunday' && <span className="animate-pulse">|</span>}
        </p>

      </div>
    ),
    residualError: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Residual Standard Error (2.845)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'residualError' && <span className="animate-pulse">|</span>}
        </p>
        {!isTyping && selectedSection === 'residualError' && (
          <p className="text-gray-700 text-sm mt-2">
            This tells us the typical size of prediction errors - smaller values indicate more accurate predictions.
          </p>
        )}
      </div>
    ),
    rSquared: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">R-Squared (0.142)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'rSquared' && <span className="animate-pulse">|</span>}
        </p>
        {!isTyping && selectedSection === 'rSquared' && (
          <p className="text-gray-700 text-sm mt-2">
            Higher values (closer to 1 or 100%) indicate that the model explains more of the variation in the outcome variable.
          </p>
        )}
      </div>
    ),
    adjRSquared: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Adjusted R-Squared (0.128)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'adjRSquared' && <span className="animate-pulse">|</span>}
        </p>
        {!isTyping && selectedSection === 'adjRSquared' && (
          <p className="text-gray-700 text-sm mt-2">
            Higher values (closer to 1 or 100%) indicate that the model explains more of the variation in the outcome variable, adjusted for the number of predictors.
          </p>
        )}
      </div>
    )
  };

  return (
    <main className={`min-h-screen py-12 bg-gray-50 ${isShaking ? 'shake' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="interpreting summary" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Interpreting Summary Output with Categories</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding regression results with categorical variables</p>
            </div>
          </div>

          {/* Key Interpretations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Interpretations for Categorical Variables</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                {/* Intercept Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Intercept (β₀)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      The average Y among entities whose predictors are all 0 is expected to be b₀.
                    </p>
                  </div>
                </div>

                {/* Continuous Variable Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Continuous Variables (e.g., Bill, Party Size)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Two otherwise identical entities that differ in this variable by 1 unit are expected to differ in Y by this coefficient amount, where entities with higher values are expected to have higher Y (if coefficient is positive, lower if negative).
                    </p>
                  </div>
                </div>

                {/* Categorical Variable Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Categorical Variables (e.g., Day Saturday, Day Sunday)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Among otherwise identical entities, those in this category have Y values that are, on average, this coefficient amount different from the reference category.
                    </p>
                  </div>
                </div>

                {/* RSE Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Residual Standard Error (RMSE)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      We typically miss by RMSE when predicting Y with our model.
                    </p>
                  </div>
                </div>

                {/* R-Squared Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">R-Squared</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      R-Squared % of the variation in Y is explained by the variation in all X variables combined.
                    </p>
                  </div>
                </div>

                {/* Adjusted R-Squared Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Adjusted R-Squared</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Adjusted R-Squared accounts for the number of predictors and penalizes models with unnecessary variables. It represents the percentage of variation in Y explained by all X variables, adjusted for the number of predictors. It's especially useful when comparing models with different numbers of predictors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <div className="mb-6 bg-[#e7e7e7] p-4 rounded-lg">
            <p className="text-gray-700">Click on the highlighted values in the regression summary below to see detailed explanations.</p>
          </div>

          {/* Interactive Regression Summary */}
          <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <div className="mb-4">
              <div>Call:</div>
              <div>lm(formula = TipPercentage ~ Bill + PartySize + Day)</div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Residuals:</div>
              <div className="overflow-x-auto">
                <table className="border-collapse mb-2 w-full">
                  <thead>
                    <tr>
                      <th className="py-1 pr-6 text-right">Min</th>
                      <th className="py-1 pr-6 text-right">1Q</th>
                      <th className="py-1 pr-6 text-right">Median</th>
                      <th className="py-1 pr-6 text-right">3Q</th>
                      <th className="py-1 text-right">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-6 text-right">-8.245</td>
                      <td className="py-1 pr-6 text-right">-1.832</td>
                      <td className="py-1 pr-6 text-right">0.127</td>
                      <td className="py-1 pr-6 text-right">1.963</td>
                      <td className="py-1 text-right">7.892</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Coefficients:</div>
              <div className="overflow-x-auto">
                <table className="border-collapse mb-2">
                  <thead>
                    <tr>
                      <th className="py-1 pr-8 text-left w-24"></th>
                      <th className="py-1 pr-8 text-right w-20">Estimate</th>
                      <th className="py-1 pr-8 text-right w-20">Std. Error</th>
                      <th className="py-1 pr-8 text-right w-16">t value</th>
                      <th className="py-1 text-left w-24">Pr(&gt;|t|)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-8 text-left">(Intercept)</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'intercept' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('intercept')}
                      >
                        20.586
                      </td>
                      <td className="py-1 pr-8 text-right">1.589</td>
                      <td className="py-1 pr-8 text-right">12.963</td>
                      <td className="py-1 text-left">&lt; 2e-16 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">Bill</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'bill' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('bill')}
                      >
                        -0.271
                      </td>
                      <td className="py-1 pr-8 text-right">0.062</td>
                      <td className="py-1 pr-8 text-right">-4.332</td>
                      <td className="py-1 text-left">4.6e-07 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">PartySize</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'partySize' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('partySize')}
                      >
                        0.592
                      </td>
                      <td className="py-1 pr-8 text-right">0.492</td>
                      <td className="py-1 pr-8 text-right">1.204</td>
                      <td className="py-1 text-left">0.309    </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">DaySaturday</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'daySaturday' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('daySaturday')}
                      >
                        -1.000
                      </td>
                      <td className="py-1 pr-8 text-right">1.466</td>
                      <td className="py-1 pr-8 text-right">-0.682</td>
                      <td className="py-1 text-left">0.496    </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">DaySunday</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'daySunday' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('daySunday')}
                      >
                        0.914
                      </td>
                      <td className="py-1 pr-8 text-right">1.520</td>
                      <td className="py-1 pr-8 text-right">0.602</td>
                      <td className="py-1 text-left">0.548    </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>---</div>
              <div>Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1</div>
            </div>
            
            <div className="mb-2">
              <span>Residual standard error: </span>
              <span 
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'residualError' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => setSelectedSection('residualError')}
              >
                2.845
              </span>
              <span> on 243 degrees of freedom</span>
            </div>
            
            <div className="mb-2">
              <span>Multiple R-squared:  </span>
              <span 
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'rSquared' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => {
                  setSelectedSection('rSquared');
                  triggerEasterEgg();
                }}
              >
                0.142
              </span>
              <span>,	Adjusted R-squared:  </span>
              <span 
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'adjRSquared' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => setSelectedSection('adjRSquared')}
              >
                0.128
              </span>
            </div>
            
            <div>
              F-statistic: 10.06 on 4 and 243 DF,  p-value: 4.65e-07
            </div>
          </div>

          {/* Explanation Section */}
          {selectedSection && explanations[selectedSection as ExplanationKey]}

          {/* Easter Egg */}
          {showEasterEgg && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setShowEasterEgg(false)}></div>
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl relative z-10 transform transition-all border-4 border-[#ff1493]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#ff1493]">⚠️ STATISTICS GOTCHA! ⚠️</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowEasterEgg(false)}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mb-4 flex justify-center">
                  <img 
                    src="/images/gotcha.gif" 
                    alt="Gotcha!" 
                    className="h-48 rounded"
                  />
                </div>
                <div className="text-gray-700">
                  <p className="mb-3 font-bold text-[#ff1493]">For multiple regression, you should use Adjusted R-squared, not regular R-squared!</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Adjusted R-squared is a fairer measure of how well the model fits the data than R²</li>
                    <li>Regular R² will always increase when adding variables, even useless ones</li>
                    <li>Adjusted R² can be negative, indicating a worthless model</li>
                    <li>Having R²adj ≈ R² is a good sign that most predictors belong in the model</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Shake Animation Styles */}
          <style jsx global>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              10% { transform: translateX(-5px) rotate(-1deg); }
              20% { transform: translateX(5px) rotate(1deg); }
              30% { transform: translateX(-5px) rotate(-1deg); }
              40% { transform: translateX(5px) rotate(1deg); }
              50% { transform: translateX(-5px) rotate(-1deg); }
              60% { transform: translateX(5px) rotate(1deg); }
              70% { transform: translateX(-5px) rotate(-1deg); }
              80% { transform: translateX(5px) rotate(1deg); }
              90% { transform: translateX(-5px) rotate(-1deg); }
            }
            .shake {
              animation: shake 0.5s ease-in-out;
            }
          `}</style>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 