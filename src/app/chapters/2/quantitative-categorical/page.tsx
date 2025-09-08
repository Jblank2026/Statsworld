"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

// Function to generate normally distributed data
const generateNormalData = (n: number, mean: number = 0, std: number = 1): number[] => {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    // Box-Muller transform
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    data.push(z * std + mean);
  }
  return data.sort((a, b) => a - b);
};

// Function to generate skewed data
const generateSkewedData = (n: number): number[] => {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    // Generate exponential distribution
    const x = -Math.log(1 - Math.random()) * 2;
    data.push(x);
  }
  return data.sort((a, b) => a - b);
};

// Function to generate bimodal data
const generateBimodalData = (n: number): number[] => {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    // Generate mixture of two normal distributions
    const u = Math.random();
    if (u < 0.5) {
      data.push(generateNormalData(1, -2, 0.5)[0]);
    } else {
      data.push(generateNormalData(1, 2, 0.5)[0]);
    }
  }
  return data.sort((a, b) => a - b);
};

// Function to generate heavy-tailed data
const generateHeavyTailedData = (n: number): number[] => {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    // Generate t-distribution with 3 degrees of freedom
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const t = z / Math.sqrt(3);
    data.push(t);
  }
  return data.sort((a, b) => a - b);
};

// QQ Plot Component
const QQPlot = ({ 
  isNormal = true,
  height = 300 
}: { 
  isNormal?: boolean;
  height?: number;
}) => {
  // Generate data based on selected distribution
  const n = 50;
  const data = isNormal ? generateNormalData(n) : generateSkewedData(n);
  
  // Generate theoretical quantiles
  const theoreticalQuantiles = data.map((_, i) => {
    const p = (i + 0.5) / n;
    // Approximation of inverse normal distribution
    return Math.sqrt(2) * (Math.pow(p, 0.14) - Math.pow(1 - p, 0.14));
  });

  // Calculate plot dimensions
  const padding = 40;
  const width = 300;
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  // Scale data to plot dimensions
  const xMin = Math.min(...theoreticalQuantiles);
  const xMax = Math.max(...theoreticalQuantiles);
  const yMin = Math.min(...data);
  const yMax = Math.max(...data);

  const scaleX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const scaleY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * plotHeight;

  // Generate points
  const points = data.map((y, i) => ({
    x: scaleX(theoreticalQuantiles[i]),
    y: scaleY(y)
  }));

  return (
    <svg width={width} height={height} className="bg-white rounded border border-gray-200">
      {/* Background */}
      <rect width={width} height={height} fill="white" />
      
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((p) => {
        const x = scaleX(xMin + p * (xMax - xMin));
        const y = scaleY(yMin + p * (yMax - yMin));
        return (
          <g key={p} className="text-gray-300">
            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="currentColor" strokeDasharray="4,4" />
            <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="currentColor" strokeDasharray="4,4" />
          </g>
        );
      })}
      
      {/* Reference line */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={padding}
        stroke="#4B5563"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
      
      {/* Points */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#3B82F6"
        />
      ))}
      
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
      <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="black" />
      
      {/* Labels */}
      <text x={width/2} y={height - 5} textAnchor="middle" className="text-sm">Theoretical Quantiles</text>
      <text x={15} y={height/2} textAnchor="middle" transform={`rotate(-90 15 ${height/2})`} className="text-sm">Sample Quantiles</text>
    </svg>
  );
};

export default function QuantitativeCategorical() {
  const [isNormal, setIsNormal] = useState(true);

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="quantitative-categorical" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#58595b]">Quantitative-Categorical</h1>
              <p className="text-lg text-gray-600 mt-2">
                Explore relationships between a quantitative and a categorical variable using side-by-side box plots.
              </p>
            </div>
          </div>
        </div>

        {/* Three Main Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Test Used */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🧪 Test Used</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Mean Comparison</h4>
                <p className="text-sm text-blue-600">t-test or ANOVA for comparing group means</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Median Comparison</h4>
                <p className="text-sm text-blue-600">Wilcoxon or Kruskal-Wallis for non-normal data</p>
              </div>
            </div>
          </div>

          {/* What to Look For */}
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">👀 What to Look For</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-sm text-purple-700">Check QQ plots to determine appropriate test (parametric vs non-parametric)</p>
              </div>
            </div>
          </div>

          {/* Visuals Used */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 mb-3">📊 Visuals Used</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Side-by-Side Box Plots</h4>
                <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                  <li>Primary visualization</li>
                  <li>Shows distribution by group</li>
                  <li>Identifies outliers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* QC Visual Image */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Visual Examples</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/QC Visual.png" alt="QC Visual Example" width={400} height={250} className="rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Key Components:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><span className="font-medium">Top Visual:</span> Side-by-Side Box Plot with Fare (Y) and Sex (X) showing distribution differences</li>
                <li><span className="font-medium">Bottom Visuals:</span> Histograms from the permutation procedure, demonstrating the sampling distribution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* QC Output Image */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Statistical Output</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/QC Output.png" alt="QC Output" width={800} height={400} className="w-full rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Interpreting the Output:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Compare group means/medians for practical differences</li>
                <li>Check the p-value for statistical significance</li>
                <li>Consider effect size alongside significance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Interactive QQ Plots Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">Understanding QQ Plots</h2>
          <p className="text-gray-600 mb-6">
            Imagine your little brother trying to trace a line with dots. How well do they follow the line?
          </p>

          {/* Distribution Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setIsNormal(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isNormal
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-green-100'
              }`}
            >
              Normal Distribution
            </button>
            <button
              onClick={() => setIsNormal(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !isNormal
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-red-100'
              }`}
            >
              Non-Normal Distribution
            </button>
          </div>

          {/* QQ Plot Display */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isNormal ? 'Normal Distribution' : 'Non-Normal (Skewed) Distribution'}
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <QQPlot isNormal={isNormal} height={300} />
              </div>
              <div className="flex-1 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-700 mb-2">What grade would you give?</h4>
                  <p className="text-gray-600">
                    {isNormal 
                      ? "If your brother traced this line, you'd give him an A+! The dots follow the line almost perfectly! 🌟"
                      : "Uh oh... that's an F. The dots are all over the place - they're not following the line at all! 📝"
                    }
                  </p>
                </div>
                <div className={`${isNormal ? 'bg-green-50' : 'bg-red-50'} p-4 rounded-lg`}>
                  <h4 className={`font-semibold ${isNormal ? 'text-green-700' : 'text-red-700'} mb-2`}>Distribution Details</h4>
                  <p className={isNormal ? 'text-green-600' : 'text-red-600'}>
                    {isNormal 
                      ? "These dots are like perfect little soldiers marching in a straight line! Great job! 🌟"
                      : "These dots are like butterflies that forgot their formation - flying everywhere but where they should be! 🦋"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Key Points for QQ Plot Interpretation:</h4>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>When dots follow the line = Perfect A+ score!</li>
              <li>When dots make curves = F grade, needs lots of practice</li>
              <li>The straighter the line, the better the grade</li>
              <li>Use these plots to decide which statistical tests to use</li>
            </ul>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 