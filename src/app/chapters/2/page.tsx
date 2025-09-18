"use client";
import Link from 'next/link';

export default function UnivariateDisplays() {
  const topics = [
    {
      title: "Categorical Displays",
      description: "Master bar charts, Pareto charts, pie charts, and frequency tables. Learn when to use each visualization type and how to create compelling displays for categorical data.",
      href: "/chapters/2/categorical-displays",
      icon: "📊"
    },
    {
      title: "Quantitative Displays", 
      description: "Explore histograms, stem-and-leaf plots, and dot plots. Understand how bin width affects histogram interpretation and learn to reveal data patterns effectively.",
      href: "/chapters/2/quantitative-displays",
      icon: "📈"
    },
    {
      title: "Center & Spread",
      description: "Master measures of center (mean, median) and spread (range, IQR, standard deviation). Understand how skewness affects these measures and when to use each.",
      href: "/chapters/2/center-spread",
      icon: "🎯"
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
              <span role="img" aria-label="univariate displays" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Univariate Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the art of displaying and describing single variables! Learn to create compelling visualizations and describe distributions with precision.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📋 What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#ff8200] pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Categorical Data</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Bar charts and variations</li>
                <li>• Pie charts and when to avoid them</li>
                <li>• Frequency and relative frequency tables</li>
                <li>• Pareto charts for prioritization</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📈 Quantitative Data</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Histograms and bin width effects</li>
                <li>• Stem-and-leaf plots</li>
                <li>• Dot plots for smaller datasets</li>
                <li>• Choosing the right display</li>
              </ul>
            </div>


            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🎯 Center & Spread</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Mean vs median comparisons</li>
                <li>• Range, IQR, and standard deviation</li>
                <li>• How skewness affects measures</li>
                <li>• Percentiles and their interpretation</li>
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
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Data Visualization Insight</h3>
          <p className="text-gray-600">
            The shape of a distribution can tell you more about your data than any single number! A histogram can reveal hidden patterns, 
            outliers, and data quality issues that summary statistics might miss. As the saying goes: "A picture is worth a thousand data points!" 📊
          </p>
        </div>
      </div>
    </main>
  );
}