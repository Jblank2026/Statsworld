"use client";
import Link from 'next/link';

export default function TheNormalModel() {
  const topics = [
    {
      title: "Normal Distribution Basics",
      description: "Discover the most important distribution in statistics! Learn why the bell curve appears everywhere and master the fundamental properties of normal distributions.",
      href: "/chapters/5/normal-basics",
      icon: "🔔"
    },
    {
      title: "Z-Scores & Standardization", 
      description: "Transform any normal distribution into the standard normal! Master Z-score calculations and learn how standardization enables powerful comparisons across different scales.",
      href: "/chapters/5/z-scores",
      icon: "🎯"
    },
    {
      title: "68-95-99.7 Rule",
      description: "Unlock the magic of the empirical rule! Learn how this simple pattern helps you quickly estimate probabilities and identify unusual values in normal data.",
      href: "/chapters/5/empirical-rule",
      icon: "📏"
    },
    {
      title: "Normal Probability Plots",
      description: "Become a normality detective! Learn to create and interpret QQ plots to determine if your data follows a normal distribution and understand when normal models apply.",
      href: "/chapters/5/normal-plots",
      icon: "📈"
    },
    {
      title: "Z-Score Calculator Game",
      description: "Master the ultimate normal distribution challenge! Calculate probabilities, find percentiles, and solve real-world problems using the standard normal model.",
      href: "/chapters/5/z-score-game",
      icon: "🎮"
    }
  ];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Chapters
          </Link>
        </div>

        {/* Chapter Title */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="normal model" className="text-4xl">🔔</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">The Normal Model</h1>
              <p className="text-xl text-gray-600 mt-2">
                Enter the elegant world of the bell curve! Master Z-scores, probabilities, and the most important distribution in statistics.
              </p>
            </div>
          </div>
        </div>

        {/* Why Normal Matters */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌟 Why the Normal Distribution Rules Statistics</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔔</span>
                <div>
                  <h3 className="font-bold text-blue-700 mb-2">The Universal Pattern</h3>
                  <p className="text-blue-600">
                    The normal distribution appears everywhere in nature and science - from human heights to measurement errors, 
                    from test scores to manufacturing quality. When many small, independent factors combine, they create the bell curve. 
                    This is the Central Limit Theorem in action!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">🎯 Predictable Patterns</h4>
                <p className="text-green-600 text-sm">68% within 1 standard deviation, 95% within 2, 99.7% within 3</p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">🔄 Standardization Power</h4>
                <p className="text-purple-600 text-sm">Any normal distribution can be converted to standard normal (Z) for easy calculations</p>
              </div>

              <div className="border border-orange-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-orange-700 mb-2">📊 Foundation for Inference</h4>
                <p className="text-orange-600 text-sm">Normal models enable hypothesis testing, confidence intervals, and statistical inference</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Master These Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#ff8200] pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🔔 Normal Properties</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Symmetric bell-shaped curve</li>
                <li>• Mean = Median = Mode</li>
                <li>• Defined by mean (μ) and standard deviation (σ)</li>
                <li>• Tails extend infinitely but approach zero</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🎯 Z-Score Mastery</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Formula: Z = (X - μ) / σ</li>
                <li>• Standardizes any normal distribution</li>
                <li>• Enables probability calculations</li>
                <li>• Compares values across different scales</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📏 Empirical Rule</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• 68% within μ ± 1σ</li>
                <li>• 95% within μ ± 2σ</li>
                <li>• 99.7% within μ ± 3σ</li>
                <li>• Quick probability estimation tool</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📈 Checking Normality</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Normal probability (QQ) plots</li>
                <li>• Histogram shape assessment</li>
                <li>• Goodness-of-fit tests</li>
                <li>• When normal models are appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Z-Score Formula Deep Dive */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧮 The Magic of Z = (X - μ) / σ</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Understanding the Z-Score Formula</h3>
                  <div className="text-yellow-600 space-y-2">
                    <p><strong>X - μ:</strong> How far is your value from the center?</p>
                    <p><strong>÷ σ:</strong> Express that distance in "standard deviation units"</p>
                    <p><strong>Result:</strong> A standardized score that works for ANY normal distribution!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-red-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-red-700 mb-2">📉 Z &lt; 0</h4>
                <p className="text-red-600 text-sm">Value is below the mean</p>
                <p className="text-xs text-red-500">The more negative, the farther below</p>
              </div>

              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">🎯 Z = 0</h4>
                <p className="text-green-600 text-sm">Value equals the mean</p>
                <p className="text-xs text-green-500">Right at the center of the distribution</p>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">📈 Z &gt; 0</h4>
                <p className="text-blue-600 text-sm">Value is above the mean</p>
                <p className="text-xs text-blue-500">The more positive, the farther above</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-700 mb-2">🏆 Real-World Example</h4>
              <p className="text-gray-600 text-sm">
                SAT scores: mean = 1000, standard deviation = 200. A score of 1400 has Z = (1400-1000)/200 = 2.0. 
                This means the score is 2 standard deviations above average - better than about 97.5% of test-takers!
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 gap-6">
          {topics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-[#e7e7e7] rounded-lg p-3">
                    <span role="img" aria-label={topic.title} className="text-2xl">
                      {topic.icon}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#58595b]">{topic.title}</h2>
                    <p className="text-gray-600 mt-1">{topic.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun Fact */}
        <div className="bg-gray-50 p-6 rounded-lg mt-12">
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Normal Distribution Wonder</h3>
          <p className="text-gray-600">
            The normal distribution is so fundamental that it's called "normal" not because it's common, 
            but because it was considered the "norm" or standard for mathematical analysis. Carl Friedrich Gauss 
            studied it extensively (it's also called the Gaussian distribution), and it appears in everything from 
            physics to psychology. The amazing 68-95-99.7 rule means that in any normal distribution, 
            you can predict where almost all the data will fall using just the mean and standard deviation! 🔔✨
          </p>
        </div>
      </div>
    </main>
  );
}
