"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';
import { useStudentTracking } from '../../../hooks/useStudentTracking';
import SimplePageTracker from '../../../components/SimplePageTracker';

type ExplanationKey = 'intercept' | 'slope' | 'rse' | 'rsquared';

export default function InterpretingSummaryOutput() {
  const [selectedSection, setSelectedSection] = useState<ExplanationKey | ''>('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { trackInteraction } = useStudentTracking();

  // Define the explanations text
  const explanationTexts: Record<ExplanationKey, string> = {
    intercept: "The average height of a newborn (age = 0) is expected to be 19.2 inches.",
    slope: "Two children that differ in age by 1 month are expected to differ in height by 0.54 inches, where older children are expected to be taller.",
    rse: "We typically miss by 1.23 inches when predicting a child's height with our model.",
    rsquared: "29.1% of the variation in children's heights is explained by the variation in their ages."
  };

  // Typing animation effect
  useEffect(() => {
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

  const handleExplanationClick = (section: ExplanationKey) => {
    setSelectedSection(section);
    
    // Track the interaction
    trackInteraction('explanation_click', section, section);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <SimplePageTracker />
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
              <h1 className="text-4xl font-bold text-[#58595b]">Interpreting Summary Output</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding and analyzing regression results</p>
            </div>
          </div>

          {/* Key Interpretations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Interpretations</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                {/* Intercept Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Y-Intercept (β₀)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      The average Y-value when x-value is 0 is expected to be β₀ units.
                    </p>
                  </div>
                </div>

                {/* Slope Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Slope (β₁)</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      Two entities that differ in x-value by 1 are expected to differ in y-value by β₁ units, where higher x-values correspond to higher y-values.
                    </p>
                  </div>
                </div>

                {/* RSE Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">Residual Mean Standard Error</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      We typically miss by RMSE units when predicting Y with our model.
                    </p>
                  </div>
                </div>

                {/* R-squared Interpretation */}
                <div>
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">R-squared</h3>
                  <div className="bg-[#f8f4e3] border-l-4 border-[#ff8200] p-4 rounded">
                    <p className="text-gray-700">
                      R² % of the variation in Y is explained by the variation in X.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <div className="mb-6 bg-[#e7e7e7] p-4 rounded-lg">
            <p className="text-gray-700">Click on the highlighted values in the regression summary below to see detailed explanations of how age predicts height in children.</p>
          </div>

          {/* Interactive Regression Summary */}
          <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <div className="mb-4">
              <div>Call:</div>
              <div>lm(formula = Height ~ Age)</div>
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
                      <th className="py-1 text-left w-24">Pr(>|t|)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-8 text-left">(Intercept)</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'intercept' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => handleExplanationClick('intercept')}
                      >
                        19.2
                      </td>
                      <td className="py-1 pr-8 text-right">0.23</td>
                      <td className="py-1 pr-8 text-right">83.48</td>
                      <td className="py-1 text-left">p {`<`} 2e-16 ***</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-8 text-left">Age</td>
                      <td 
                        className={`py-1 pr-8 text-right cursor-pointer hover:bg-gray-200 transition-colors ${selectedSection === 'slope' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                        onClick={() => handleExplanationClick('slope')}
                      >
                        0.54
                      </td>
                      <td className="py-1 pr-8 text-right">0.08</td>
                      <td className="py-1 pr-8 text-right">6.75</td>
                      <td className="py-1 text-left">3.27e-10 ***</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>---</div>
              <div>Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1</div>
            </div>

            <div className="mb-4">
              <div>Residual standard error: 
                <span 
                  className={`cursor-pointer hover:bg-gray-200 transition-colors px-1 ${selectedSection === 'rse' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                  onClick={() => handleExplanationClick('rse')}
                >
                  1.23
                </span> 
                on 98 degrees of freedom
              </div>
              <div>Multiple R-squared: 
                <span 
                  className={`cursor-pointer hover:bg-gray-200 transition-colors px-1 ${selectedSection === 'rsquared' ? 'bg-gray-200 outline outline-2 outline-[#ff8200]' : 'bg-yellow-50'}`}
                  onClick={() => handleExplanationClick('rsquared')}
                >
                  0.291
                </span>
              </div>
              <div>F-statistic: 45.56 on 1 and 98 DF, p-value: 3.27e-10</div>
            </div>
          </div>

          {/* Dynamic Explanation Box */}
          {selectedSection && (
            <div className="mt-4 bg-[#f8f4e3] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">
                {selectedSection === 'intercept' && 'Height at Birth (19.2 inches)'}
                {selectedSection === 'slope' && 'Monthly Growth Rate (0.54 inches)'}
                {selectedSection === 'rse' && 'Typical Prediction Error (1.23 inches)'}
                {selectedSection === 'rsquared' && 'Age Explains 29.1% of Height Variation'}
              </h3>
              <p className="text-gray-700 min-h-6">
                {typedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 