"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

type ExplanationKey = 'weight';

export default function InterpretingOutput() {
  const [selectedSection, setSelectedSection] = useState<ExplanationKey | ''>('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Typing animation effect
  useEffect(() => {
  // Define the explanations text
  const explanationTexts: Record<ExplanationKey, string> = {
    weight: "Individuals who weigh more are more likely to be Male or individuals who weigh more have a higher probability of being Male."
  };

    if (selectedSection && explanationTexts[selectedSection]) {
      setIsTyping(true);
      setTypedText('');
      
      const text = explanationTexts[selectedSection];
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30);
      
      return () => clearInterval(typeInterval);
    }
  }, [selectedSection]);

  // Easter egg handler
  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => setShowEasterEgg(false), 5000);
  };

  // Explanation content for each section
  const explanations: Record<ExplanationKey, React.ReactNode> = {
    weight: (
      <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#58595b] mb-2">Weight Coefficient (0.055494)</h3>
        <p className="text-gray-700 min-h-6">
          {typedText}
          {isTyping && selectedSection === 'weight' && <span className="animate-pulse">|</span>}
        </p>
      </div>
    )
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className={`bg-white rounded-lg shadow-lg p-8 ${isShaking ? 'shake' : ''}`}>
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="interpreting output" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Interpreting Logistic Output</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding logistic regression results</p>
            </div>
          </div>

          {/* Key Interpretations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Interpretations for Logistic Regression</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                {/* Coefficient Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Coefficients</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700 mb-2">
                      <strong>Positive coefficients (+):</strong> Entities with a larger value of this variable have a higher probability of the level of interest.
                    </p>
                    <p className="text-gray-700">
                      <strong>Negative coefficients (-):</strong> Entities with a larger value of this variable have a lower probability of the level of interest.
                    </p>
                  </div>
                </div>

                {/* Important Note */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">⚠️ Important Note</h3>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-gray-700 font-semibold">
                      A logistic regression makes no comment on what would happen to an individual's value of p if his or her x value increased by one unit.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Logistic regression tells us about the direction of relationships and overall patterns, but cannot predict exact probability changes for specific individuals.
                    </p>
                  </div>
                </div>

                {/* Model Fit Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Model Fit (Deviance, AIC)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Deviance measures model fit. Lower residual deviance compared to null deviance indicates better fit. <strong>AIC is used for model comparison.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <div className="mb-6 bg-[#e7e7e7] p-4 rounded-lg">
            <p className="text-gray-700">Click on the highlighted values in the logistic regression summary below to see detailed explanations.</p>
          </div>

          {/* Interactive Regression Summary */}
          <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <div className="mb-4">
              <div>Call:</div>
              <div>glm(formula = Gender ~ Weight, family = binomial, data = SURVEY10)</div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Response Variable: Gender (Female vs Male)</div>
              <div className="mb-2">Level of Interest: Male (comes last alphabetically)</div>
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
                      <th className="py-1 pr-8 text-right w-16">z value</th>
                      <th className="py-1 text-left w-24">Pr(&gt;|z|)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-8 text-left">(Intercept)</td>
                      <td className="py-1 pr-8 text-right">
                        -8.761068
                      </td>
                      <td className="py-1 pr-8 text-right">0.655515</td>
                      <td className="py-1 pr-8 text-right">-13.37</td>
                      <td className="py-1 text-left">&lt;2e-16 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">Weight</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'weight' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => setSelectedSection('weight')}
                      >
                        0.055494
                      </td>
                      <td className="py-1 pr-8 text-right">0.004245</td>
                      <td className="py-1 pr-8 text-right">13.07</td>
                      <td className="py-1 text-left">&lt;2e-16 ***</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>---</div>
              <div>Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1</div>
            </div>

            <div className="mb-4">
              <div>(Dispersion parameter for binomial family taken to be 1)</div>
            </div>

            <div className="mb-4">
              <div>
                    Null deviance: 961.38  on 698  degrees of freedom
              </div>
            </div>

            <div className="mb-4">
              <div>Residual deviance: 649.40  on 697  degrees of freedom</div>
            </div>

            <div className="mb-4">
              <div>
                AIC: 653.4
              </div>
            </div>

            <div>
              <div>Number of Fisher Scoring iterations: 5</div>
            </div>
          </div>

          {/* Display explanation */}
          {selectedSection && explanations[selectedSection]}

          {/* Easter Egg */}
          {showEasterEgg && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg shadow-lg max-w-md">
                <div className="flex items-center space-x-4">
                  <img src="/images/gotcha.gif" alt="Gotcha!" className="w-16 h-16 rounded-full border-4 border-white" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">🎭 Detective Alert!</h3>
                    <p className="text-sm">
                      Remember: In logistic regression, we're predicting the probability of the level of interest (alphabetically last)! 
                      Odds ratios below 1 are protective, above 1 are risk factors! 🕵️‍♀️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Easter Egg Trigger */}
          <div 
            className="w-4 h-4 opacity-0 cursor-pointer absolute bottom-4 right-4"
            onClick={handleEasterEgg}
          ></div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>

      <style jsx>{`
        .shake {
          animation: shake 0.6s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </main>
  );
} 