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
      title: "Z-Score Calculations",
      description: "Master Z-scores with cool examples from NBA heights to Netflix binges! Interactive challenges show how Z-scores reveal where you stand relative to the mean and standard deviation.",
      href: "/chapters/5/z-scores",
      icon: "🎯"
    },
    {
      title: "Understanding Percentiles",
      description: "Discover what percentiles really mean! Learn how they connect to Z-scores and reveal your ranking compared to everyone else with real-world examples.",
      href: "/chapters/5/percentiles",
      icon: "📊"
    },
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
                Enter the elegant world of the bell curve! Discover the most important distribution in statistics and learn to work with normal probability models.
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
                <p className="text-green-600 text-sm">Symmetric bell-shaped curve with well-defined mathematical properties</p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">🔄 Mathematical Foundation</h4>
                <p className="text-purple-600 text-sm">Enables precise probability calculations and statistical modeling</p>
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
            physics to psychology. This elegant mathematical curve helps us understand and model countless natural phenomena! 🔔✨
          </p>
        </div>
      </div>
    </main>
  );
}
