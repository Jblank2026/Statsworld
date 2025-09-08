"use client";
import Link from 'next/link';
import Image from 'next/image';
import ChapterNavigation from '../../../components/ChapterNavigation';

// Seeded random number generator
class SeededRandom {
  private seed: number;
  private initialSeed: number;
  
  constructor(seed: number = 12345) {
    this.initialSeed = seed;
    this.seed = seed;
  }
  
  random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  reset(): void {
    this.seed = this.initialSeed;
  }
}

const rng = new SeededRandom(12345);

export default function QuantitativeQuantitative() {
  // Generate example data points for different patterns
  const generatePoints = (
    pattern: 'monotonic' | 'heteroskedastic' | 'nonlinear' | 'outlier' | 
    'positive' | 'negative' | 'strong' | 'weak' | 'nonmonotonic' | 'linear' |
    'quadratic' | 'circular' | 'sine' | 'diamond' | 'extreme_hetero' | 'extreme_nonlinear' | 'extreme_outliers',
    n: number = 50
  ) => {
    rng.reset();  // Reset the seed before generating each pattern
    const points: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1) * 6;
      let y;
      switch (pattern) {
        case 'positive':
          y = 0.7 * x + rng.random() * 1.5;
          break;
        case 'negative':
          y = -0.7 * x + 8 + rng.random() * 1.5;
          break;
        case 'strong':
          y = 0.8 * x + rng.random() * 0.8;
          break;
        case 'weak':
          y = rng.random() * 10;
          break;
        case 'nonmonotonic':
          y = -0.05 * Math.pow(x - 5, 2) + 8 + rng.random() * 0.8;
          break;
        case 'monotonic':
          // Consistently increasing but not linear (using square root function)
          y = Math.sqrt(x) * 3 + rng.random() * 0.5;
          break;
        case 'heteroskedastic':
          // Much more extreme spread using exponential growth in variance
          y = 0.5 * x + rng.random() * (0.02 + Math.pow(x/3, 4) * 0.3);
          break;
        case 'linear':
          // Simple linear relationship
          y = 0.7 * x + rng.random() * 0.5;
          break;
        case 'nonlinear':
          // Exponential curve with increasing slope
          y = Math.exp(x/3) + rng.random() * 0.5;
          break;
        case 'outlier':
          y = 0.5 * x + rng.random() * 0.3;
          if (i === Math.floor(n * 0.3)) y += 4;
          if (i === Math.floor(n * 0.6)) y -= 3;
          if (i === Math.floor(n * 0.8)) y += 5;
          break;
        case 'quadratic':
          // U-shaped quadratic pattern
          y = 0.2 * Math.pow(x - 5, 2) + 2 + rng.random() * 0.5;
          break;
        case 'circular':
          // Circular pattern
          y = 5 + 3 * Math.cos(x) + rng.random() * 0.5;
          break;
        case 'sine':
          // Sine wave pattern
          y = 5 + 2 * Math.sin(x * 1.5) + rng.random() * 0.5;
          break;
        case 'diamond':
          // Diamond-like pattern
          y = 5 + (x <= 5 ? x : 10 - x) + rng.random() * 0.5;
          break;
        case 'extreme_hetero':
          // Funnel shape heteroskedasticity centered at y=2
          const spread = Math.exp(x/2) * 0.15;  // Exponential spread for funnel effect
          y = 2 + (rng.random() * spread * 2 - spread);  // Center at 2 with +/- spread
          break;
        case 'extreme_nonlinear':
          // Smooth transition from flat to exponential using sigmoid-like blending
          const transitionPoint = 2;
          const sigmoid = 1 / (1 + Math.exp(-(x - transitionPoint) * 2)); // Smooth transition factor
          const flatPart = 1;
          const expPart = Math.exp((x - transitionPoint) * 0.8);
          y = flatPart + sigmoid * (expPart - 1) + rng.random() * 0.2;
          break;
        case 'extreme_outliers':
          // More dramatic outliers for the unusual features section
          y = 0.3 * x + rng.random() * 0.2;
          if (i === Math.floor(n * 0.2)) y += 6;
          if (i === Math.floor(n * 0.5)) y -= 5;
          if (i === Math.floor(n * 0.8)) y += 7;
          break;
        default:
          y = x;
      }
      points.push({ x, y });
    }
    return points;
  };

  // Reusable scatter plot component
  const ScatterPlot = ({ 
    points, 
    title, 
    description, 
    color,
    height = 200,
    maxX = 10
  }: { 
    points: Array<{ x: number; y: number }>;
    title: string;
    description: string;
    color: string;
    height?: number;
    maxX?: number;
  }) => {
    // Map color prop to Tailwind color classes
    const getColorClasses = (color: string) => {
      const colorMap: Record<string, { bg: string, text: string, border: string, fill: string }> = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', fill: '#2563eb' },
        red: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200', fill: '#dc2626' },
        green: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200', fill: '#16a34a' },
        yellow: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', fill: '#ca8a04' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200', fill: '#9333ea' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200', fill: '#4f46e5' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200', fill: '#ea580c' },
        teal: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200', fill: '#0d9488' },
        pink: { bg: 'bg-pink-50', text: 'text-pink-800', border: 'border-pink-200', fill: '#db2777' }
      };
      return colorMap[color] || colorMap.blue; // Default to blue if color not found
    };

    const colorClasses = getColorClasses(color);

    return (
      <div className={`${colorClasses.bg} p-6 rounded-lg`}>
        <h3 className={`text-lg font-semibold ${colorClasses.text} mb-3`}>{title}</h3>
        <div className={`bg-white p-4 rounded-lg border ${colorClasses.border}`}>
          <svg width="300" height={height} className="w-full">
            <rect width="100%" height="100%" fill="white" />
            {/* Grid lines */}
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i} className="text-gray-300">
                {/* Vertical grid lines */}
                <line
                  x1={30 + (i * 24)}
                  y1={height - 30}
                  x2={30 + (i * 24)}
                  y2={30}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              </g>
            ))}
            {/* Data points */}
            {points.map((point, i) => (
              <circle
                key={i}
                cx={30 + point.x * 24}
                cy={height - 30 - point.y * ((height - 60) / maxX)}
                r="4"
                fill={colorClasses.fill}
              />
            ))}
          </svg>
          <p className={`text-sm ${colorClasses.text} mt-2`}>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="quantitative-quantitative" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#58595b]">Quantitative-Quantitative</h1>
              <p className="text-lg text-gray-600 mt-2">
                Explore relationships between two quantitative variables using scatterplots and correlation tests.
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
                <h4 className="font-medium text-blue-700 mb-2">Pearson Correlation</h4>
                <p className="text-sm text-blue-600">For linear relationships and normally distributed data</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Spearman Correlation</h4>
                <p className="text-sm text-blue-600">For non-linear monotonic relationships or non-normal data</p>
              </div>
            </div>
          </div>

          {/* What to Look For */}
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">👀 What to Look For</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-sm text-red-700 font-semibold">1. Check if relationship changes direction (non-monotonic)</p>
                <p className="text-sm text-red-600 mt-1">If it does, correlation coefficients will be misleading!</p>
              </div>
              <div className="bg-white p-3 rounded border border-orange-200">
                <p className="text-sm text-orange-700 font-semibold">2. Look for unusual features</p>
                <p className="text-sm text-orange-600 mt-1">Check for outliers, changing spread, and non-linear patterns</p>
              </div>
              <div className="bg-white p-3 rounded border border-blue-200">
                <p className="text-sm text-blue-700 font-semibold">3. Choose correlation method</p>
                <p className="text-sm text-blue-600 mt-1">Pearson if no unusual features, Spearman if unusual features present</p>
              </div>
            </div>
          </div>

          {/* Visuals Used */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 mb-3">📊 Visuals Used</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Scatterplot</h4>
                <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                  <li>Primary visualization</li>
                  <li>Shows relationship pattern</li>
                  <li>Reveals outliers</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Correlation Plot</h4>
                <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                  <li>Shows strength and direction</li>
                  <li>Ranges from -1 to 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Direction Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">Direction of Relationship</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScatterPlot
              points={generatePoints('positive')}
              title="Positive Relationship"
              description="As x increases, y tends to increase. Points flow upward from left to right."
              color="blue"
            />
            <ScatterPlot
              points={generatePoints('negative')}
              title="Negative Relationship"
              description="As x increases, y tends to decrease. Points flow downward from left to right."
              color="red"
            />
          </div>
        </div>

        {/* Strength Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">Strength of Relationship</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScatterPlot
              points={generatePoints('strong')}
              title="Strong Relationship"
              description="Knowing x gives you a good idea of y. Points cluster tightly around a pattern."
              color="green"
            />
            <ScatterPlot
              points={generatePoints('weak')}
              title="Weak Relationship"
              description="Knowing x tells you little about y. Points are widely scattered."
              color="yellow"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">Form of Relationship</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ScatterPlot
              points={generatePoints('linear')}
              title="Linear"
              description="The relationship follows a straight line pattern. Points cluster around a line."
              color="purple"
            />
            <ScatterPlot
              points={generatePoints('nonlinear')}
              title="Non-linear"
              description="The relationship follows a curved or cyclical pattern. Points form a clear curve."
              color="indigo"
            />
          </div>
        </div>

        {/* Unusual Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">Unusual Features to Watch For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScatterPlot
              points={generatePoints('extreme_hetero', 40)}
              title="Heteroskedasticity"
              description="Spread of points increases/decreases with X. Fan or funnel shape."
              color="orange"
              height={300}
              maxX={6}
            />
            <ScatterPlot
              points={generatePoints('extreme_nonlinear', 40)}
              title="Non-linear Pattern"
              description="Relationship follows a clear curve rather than a straight line."
              color="teal"
              height={300}
              maxX={6}
            />
            <ScatterPlot
              points={generatePoints('extreme_outliers', 40)}
              title="Outliers"
              description="Points that deviate substantially from the overall pattern."
              color="pink"
              height={300}
              maxX={6}
            />
          </div>
        </div>

        {/* Decision Making Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">What to Look For</h2>
          
          {/* Three Step Process at Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-lg shadow border-l-4 border-red-500">
              <div className="text-red-600 font-bold text-lg mb-2">Step 1</div>
              <p className="text-gray-700">Check if relationship changes direction (non-monotonic)</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow border-l-4 border-orange-500">
              <div className="text-orange-600 font-bold text-lg mb-2">Step 2</div>
              <p className="text-gray-700">Look for unusual features (outliers, spread changes, curves)</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="text-blue-600 font-bold text-lg mb-2">Step 3</div>
              <p className="text-gray-700">Choose appropriate correlation method (Pearson or Spearman)</p>
            </div>
          </div>
          
          {/* Critical Warning */}
          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ STEP 1: Check for Non-Monotonic Relationships</h3>
            <p className="text-red-700 mb-4">
              If a relationship is non-monotonic (changes direction), there is NO LINEAR RELATIONSHIP and correlation coefficients will be MISLEADING!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScatterPlot
                points={generatePoints('circular', 30)}
                title="r ≈ 0"
                description="No linear relationship"
                color="red"
                height={300}
              />
              <ScatterPlot
                points={generatePoints('diamond', 30)}
                title="r ≈ 0"
                description="No linear relationship"
                color="red"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* QQ Visual Image - Moved to bottom */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Visual Examples</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/QQ Visual.png" alt="QQ Visual Example" width={400} height={250} className="rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Key Components:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><span className="font-medium">Top Visual:</span> Scatterplot of Age (X) and Fare (Y) showing the relationship pattern</li>
                <li><span className="font-medium">Bottom Visuals:</span> Histograms from the permutation procedure, showing Null and Alternative distributions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* QQ Output Image - Moved to bottom */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">Statistical Output</h2>
          <div className="flex flex-col items-center">
            <Image src="/images/QQ output.png" alt="QQ Output" width={800} height={400} className="w-full rounded mb-4" />
            <div className="text-gray-600 text-sm max-w-2xl">
              <p className="font-semibold mb-2">Interpreting the Output:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check the correlation coefficient (r) for strength and direction</li>
                <li>Examine the p-value for statistical significance</li>
                <li>Consider practical significance alongside statistical significance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 