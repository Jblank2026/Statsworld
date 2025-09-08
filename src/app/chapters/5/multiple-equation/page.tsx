"use client";
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function MultipleEquation() {
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
              <span role="img" aria-label="multiple equation" className="text-4xl">🧮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Multiple Equation</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding the building blocks of multiple regression</p>
            </div>
          </div>

          {/* Content sections */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">The Multiple Regression Equation</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold font-mono">μ<sub>y|x₁,x₂,...,xₚ</sub> = β<sub>0</sub> + β<sub>1</sub>x<sub>1</sub> + β<sub>2</sub>x<sub>2</sub> + ... + β<sub>p</sub>x<sub>p</sub></span>
              </div>
              <p className="text-gray-700 mb-4">
                This equation represents the population relationship between one response variable and multiple predictor variables. Each coefficient represents the unique effect of that predictor while holding all other predictors constant.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>μ<sub>y|x₁,x₂,...,xₚ</sub></strong>: The population mean of y given specific values of all predictors</li>
                <li><strong>β<sub>0</sub></strong>: The y-intercept (population parameter)</li>
                <li><strong>β<sub>j</sub></strong>: The partial regression coefficient for predictor x<sub>j</sub></li>
                <li><strong>x<sub>j</sub></strong>: The jth predictor variable</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Sample vs Population</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Population Equation</h3>
                <p className="text-blue-700 font-mono text-sm mb-2">μ<sub>y|x₁,x₂,...,xₚ</sub> = β<sub>0</sub> + β<sub>1</sub>x<sub>1</sub> + ... + β<sub>p</sub>x<sub>p</sub></p>
                <p className="text-blue-600 text-sm">Uses β (beta) parameters - the true values we're trying to estimate</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Sample Equation</h3>
                <p className="text-green-700 font-mono text-sm mb-2">ŷ = b<sub>0</sub> + b<sub>1</sub>x<sub>1</sub> + ... + b<sub>p</sub>x<sub>p</sub></p>
                <p className="text-green-600 text-sm">Uses b coefficients - our estimates from sample data</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Definitions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top w-1/4">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">μ<sub>y|x₁,x₂,...,xₚ</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The average value of y among all individuals in the population who share common values of all x variables
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">ȳ</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The average value of y of the individuals in the dataset
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-start">
                        <span className="font-mono font-bold text-lg text-[#58595b]">y and ŷ</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The observed value of y in the data and the value of y predicted by the multiple regression, respectively
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">β<sub>j</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The partial regression coefficient for variable x<sub>j</sub>, representing its effect when all other variables are held constant
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">b<sub>j</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The sample estimate of β<sub>j</sub>, calculated from the dataset
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 