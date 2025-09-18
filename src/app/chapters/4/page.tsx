"use client";
import Link from 'next/link';

export default function ComparingDistributions() {
  const topics = [
    {
      title: "Stacked Histograms",
      description: "Learn to compare quantitative distributions across groups using overlapping and side-by-side histograms. Master the art of choosing appropriate scales and interpreting group differences.",
      href: "/chapters/4/stacked-histograms",
      icon: "📊"
    },
    {
      title: "Five-Number Summary", 
      description: "Master the five key values that summarize any distribution: minimum, Q1, median, Q3, and maximum. Learn to calculate quartiles and understand what they reveal about your data.",
      href: "/chapters/4/five-number-summary",
      icon: "📋"
    },
    {
      title: "Boxplots & Outliers",
      description: "Master boxplots and outlier detection! Learn to read boxes, whiskers, and identify unusual values using the 1.5×IQR rule. Perfect for comparing distributions and spotting data anomalies.",
      href: "/chapters/4/boxplots",
      icon: "📦"
    },
    {
      title: "Boxplot Association Analysis",
      description: "Discover how to determine relationships between categorical and quantitative variables using side-by-side boxplots. Learn to identify patterns, compare groups, and detect associations through visual analysis.",
      href: "/chapters/4/boxplot-association",
      icon: "🔍"
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
              <span role="img" aria-label="comparing distributions" className="text-4xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Comparing Distributions</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the art of comparing groups! Learn to use histograms, boxplots, and summary statistics to reveal meaningful differences.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Comparison Mastery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#ff8200] pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Visual Comparisons</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Side-by-side histograms with same scales</li>
                <li>• Overlapping distributions for direct comparison</li>
                <li>• Boxplots for multiple group analysis</li>
                <li>• Choosing appropriate visualization methods</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📈 Statistical Summaries</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Five-number summary calculation</li>
                <li>• Quartile interpretation and meaning</li>
                <li>• Robust vs sensitive measures</li>
                <li>• Interquartile range applications</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🔍 Outlier Analysis</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• 1.5×IQR rule for outlier detection</li>
                <li>• Understanding fence calculations</li>
                <li>• When outliers indicate problems vs insights</li>
                <li>• Impact of outliers on different measures</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Practical Applications</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Comparing performance across teams</li>
                <li>• Medical treatment effectiveness</li>
                <li>• Quality control in manufacturing</li>
                <li>• Educational assessment analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Power of Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔥 Why Comparison Matters</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Context Through Comparison</h3>
                  <p className="text-yellow-600">
                    A single distribution tells you about one group, but comparison reveals relationships, 
                    differences, and insights that transform data into actionable knowledge. Is 85% a good test score? 
                    It depends on how others performed!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">📊 Same Scale Principle</h4>
                <p className="text-blue-600 text-sm mb-2">
                  When comparing groups visually, <strong>always use the same scale</strong> on both axes.
                </p>
                <p className="text-blue-500 text-xs">
                  Different scales can make identical distributions look completely different!
                </p>
              </div>

              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">📦 Boxplot Advantage</h4>
                <p className="text-green-600 text-sm mb-2">
                  Boxplots excel at <strong>comparing multiple groups</strong> simultaneously.
                </p>
                <p className="text-green-500 text-xs">
                  You can easily compare 5+ groups side-by-side where histograms would be cluttered.
                </p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">🎯 Focus on Differences</h4>
                <p className="text-purple-600 text-sm mb-2">
                  Look for differences in <strong>center, spread, and shape</strong> between groups.
                </p>
                <p className="text-purple-500 text-xs">
                  These three characteristics tell the complete comparison story.
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">⚠️ Outlier Impact</h4>
                <p className="text-red-600 text-sm mb-2">
                  Outliers can <strong>dramatically skew</strong> means and standard deviations.
                </p>
                <p className="text-red-500 text-xs">
                  Boxplots show outliers explicitly, making them easier to identify and analyze.
                </p>
              </div>
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
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Distribution Comparison Insight</h3>
          <p className="text-gray-600">
            Boxplots were invented by statistician John Tukey in 1977 as part of "Exploratory Data Analysis." 
            He wanted a simple way to show five key numbers at once while highlighting outliers. 
            Today, boxplots are everywhere - from medical research comparing treatment groups to 
            business analytics comparing sales performance across regions. They're like the Swiss Army knife 
            of statistical visualization! 📦✨
          </p>
        </div>
      </div>
    </main>
  );
}