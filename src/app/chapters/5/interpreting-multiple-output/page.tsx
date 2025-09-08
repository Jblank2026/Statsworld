"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import ChapterNavigation from '@/app/components/ChapterNavigation';

type ExplanationKey = 'intercept' | 'weight' | 'age' | 'residualError' | 'rSquared' | 'adjRSquared';

export default function InterpretingMultipleOutput() {
  const [selectedSection, setSelectedSection] = useState<ExplanationKey | ''>('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Define the explanations text for multiple regression
  const explanationTexts: Record<ExplanationKey, string> = {
    intercept: "The average Y value when all predictors (X variables) are 0 is expected to be 42.21 units.",
    weight: "For two otherwise identical entities that differ in weight by 1 unit, the entity with the higher weight is expected to have a Y value that is 0.068 units higher.",
    age: "For two otherwise identical entities that differ in age by 1 unit, the entity with the higher age is expected to have a Y value that is 1.89 units higher.",
    residualError: "When using our X variables to predict Y, we typically miss by 2.754 units.",
    rSquared: "About 62.35% of the variation in Y is explained by the variation in our X variables.",
    adjRSquared: "About 62.23% of the variation in Y is explained by the variation in our X variables, after adjusting for the number of predictors."
  };

  // Handle typing animation
  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    if (selectedSection && explanationTexts[selectedSection]) {
      const fullText = explanationTexts[selectedSection];
      setIsTyping(true);
      setTypedText('');
      
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(prev => fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    }

    return () => {
      if (typingInterval) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    };
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

  // Explanation content for each section
  const explanations: Record<ExplanationKey, ReactNode> = {
    intercept: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Y-Intercept (42.21)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'intercept' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    ),
    weight: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Weight Coefficient (0.068)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'weight' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    ),
    age: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Age Coefficient (1.89)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'age' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    ),
    residualError: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Residual Standard Error (2.754)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'residualError' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    ),
    rSquared: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">R-squared (0.6235)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'rSquared' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    ),
    adjRSquared: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Adjusted R-squared (0.6223)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'adjRSquared' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    )
  };

  return (
    <main className={`min-h-screen py-12 bg-gray-50 ${isShaking ? 'animate-shake' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Multiple Regression
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="interpreting output" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Interpreting Output</h1>
              <p className="text-xl text-gray-600 mt-2">
                Understanding and analyzing multiple regression results
              </p>
            </div>
          </div>
        </div>

        {/* Top Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Key Interpretations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Interpretations</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                {/* Y-Intercept Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Y-Intercept (b₀)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      The average Y among entities whose predictors are all 0 is expected to be b₀.
                    </p>
                  </div>
                </div>

                {/* Coefficient Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Coefficient (bᵢ)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Two "otherwise identical" individuals that differ in xᵢ by 1 unit are expected to differ in y by βᵢ units. If βᵢ is positive, the individual with the larger value of xᵢ is expected to have the larger value of y, etc. "Otherwise identical" means these individuals have the same values for the other x variables (though their actual numerical values do not matter).
                    </p>
                  </div>
                </div>

                {/* RSE Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Residual Standard Error (RMSE)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      We typically miss by RMSE when predicting Y with all our X variables.
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
            <p className="text-gray-700">Click on the highlighted values in the multiple regression summary below to see detailed explanations.</p>
          </div>

          {/* Interactive Regression Summary */}
          <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <div className="mb-4">
              <div>Call: lm(formula = Height ~ Weight + Age)</div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Residuals:</div>
              <div className="overflow-x-auto">
                <table className="border-collapse mb-2 w-full">
                  <thead>
                    <tr>
                      <th className="py-1 pr-4 text-right">Min</th>
                      <th className="py-1 pr-4 text-right">1Q</th>
                      <th className="py-1 pr-4 text-right">Median</th>
                      <th className="py-1 pr-4 text-right">3Q</th>
                      <th className="py-1 text-right">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-right">-12.4962</td>
                      <td className="py-1 pr-4 text-right">-1.8248</td>
                      <td className="py-1 pr-4 text-right">0.0784</td>
                      <td className="py-1 pr-4 text-right">1.9425</td>
                      <td className="py-1 text-right">9.2742</td>
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
                      <th className="py-1 pr-4 text-left"></th>
                      <th className="py-1 pr-4 text-left">Estimate</th>
                      <th className="py-1 pr-4 text-left">Std. Error</th>
                      <th className="py-1 pr-4 text-left">t value</th>
                      <th className="py-1 text-left">Pr(&gt;|t|)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 border border-gray-300 text-left">(Intercept)</td>
                      <td 
                        className={`py-1 pr-4 border border-gray-300 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'intercept' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('intercept')}
                      >
                        42.21
                      </td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">0.762</td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">55.39</td>
                      <td className="py-1 border border-gray-300 text-right">&lt;2e-16 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 border border-gray-300 text-left">Weight</td>
                      <td 
                        className={`py-1 pr-4 border border-gray-300 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'weight' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('weight')}
                      >
                        0.068
                      </td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">0.0031</td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">21.94</td>
                      <td className="py-1 border border-gray-300 text-right">&lt;2e-16 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 border border-gray-300 text-left">Age</td>
                      <td 
                        className={`py-1 pr-4 border border-gray-300 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'age' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('age')}
                      >
                        1.89
                      </td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">0.0729</td>
                      <td className="py-1 pr-4 border border-gray-300 text-right">25.93</td>
                      <td className="py-1 border border-gray-300 text-right">&lt;2e-16 ***</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>---</div>
              <div>Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1</div>
            </div>
            
            <div className="mb-2 flex items-baseline">
              <span>Residual standard error: </span>
              <span 
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'residualError' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => setSelectedSection('residualError')}
              >
                2.754
              </span>
              <span> on 696 degrees of freedom</span>
            </div>
            
            <div className="mb-2 flex items-baseline">
              <span>Multiple R-squared: </span>
              <span 
                id="r2_easter_egg"
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'rSquared' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => {
                  setSelectedSection('rSquared');
                  triggerEasterEgg();
                }}
              >
                0.6235
              </span>
              <span>, Adjusted R-squared: </span>
              <span 
                className={`cursor-pointer px-1 hover:bg-gray-200 transition-colors ${selectedSection === 'adjRSquared' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                onClick={() => setSelectedSection('adjRSquared')}
              >
                0.6223
              </span>
            </div>
            
            <div className="mb-2">F-statistic: 577.1 on 2 and 696 DF,  p-value: &lt; 2.2e-16</div>
          </div>

          {selectedSection && explanations[selectedSection]}

          {/* Easter Egg Alert */}
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
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 