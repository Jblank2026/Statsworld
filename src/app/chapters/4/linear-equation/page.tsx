"use client";
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function LinearEquation() {
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
              <span role="img" aria-label="linear equation" className="text-4xl">🔢</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Linear Equation</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding the building blocks of regression</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">The Linear Regression Equation</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold font-mono">μ<sub>y|x</sub> = β<sub>0</sub> + β<sub>1</sub>x</span>
              </div>
              <p className="text-gray-700 mb-4">
                This equation represents the population relationship between two variables. Here's what each component means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>μ<sub>y|x</sub></strong>: The population mean of y given a specific value of x</li>
                <li><strong>β<sub>0</sub></strong>: The y-intercept (population parameter)</li>
                <li><strong>β<sub>1</sub></strong>: The slope (population parameter)</li>
                <li><strong>x</strong>: The independent variable (predictor)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Sample vs Population</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Population Equation</h3>
                <p className="text-blue-700 font-mono text-lg mb-2">μ<sub>y|x</sub> = β<sub>0</sub> + β<sub>1</sub>x</p>
                <p className="text-blue-600 text-sm">Uses β (beta) parameters - the true values we're trying to estimate</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Sample Equation</h3>
                <p className="text-green-700 font-mono text-lg mb-2">ŷ = b<sub>0</sub> + b<sub>1</sub>x</p>
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
                        <span className="font-mono font-bold text-lg text-[#58595b]">μ<sub>y|x</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The average value of y among all individuals in the population who share some common value of x (not just those in the dataset)
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
                      The observed value of y in the data and the value of y predicted by the regression, respectively
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">SD<sub>y</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The standard deviation of y values in the dataset (i.e., typical difference between the values and the average)
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">x̄ and SD<sub>x</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The mean and standard deviation of the observed values of x
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">β<sub>0</sub> and β<sub>1</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The intercept and slope of the regression line "<strong>in the population</strong>", constructed from a census, data on every potential individual
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-3 pr-4 align-top">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg text-[#58595b]">b<sub>0</sub> and b<sub>1</sub></span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      The intercept and slope of the regression line "<strong>in the sample</strong>", the line we fit using individuals in our dataset
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