"use client";
import Link from 'next/link';

export default function BivariateCategorialDisplays() {
  const topics = [
    {
      title: "Contingency Tables",
      description: "Master the foundation of bivariate categorical analysis! Learn to create and interpret two-way tables, calculate marginal and conditional distributions, and understand joint frequencies.",
      href: "/chapters/3/contingency-tables",
      icon: "📋"
    },
    {
      title: "Segmented Bar Charts", 
      description: "Visualize categorical relationships with stacked and side-by-side bar charts. Learn when to use each type and how they reveal different aspects of association between variables.",
      href: "/chapters/3/segmented-bar-charts",
      icon: "📊"
    },
    {
      title: "Independence vs Association",
      description: "Learn the crucial distinction between independent and associated variables. Understand when relationships exist and how to detect them using statistical reasoning.",
      href: "/chapters/3/independence-association",
      icon: "⚖️"
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
              <span role="img" aria-label="bivariate categorical displays" className="text-4xl">🔗</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Bivariate Categorical Displays</h1>
              <p className="text-xl text-gray-600 mt-2">
                Explore relationships between categorical variables! Learn to detect, visualize, and interpret associations in your data.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🧭 What You'll Master</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#ff8200] pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Data Relationships</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Two categorical variables at once</li>
                <li>• Joint, marginal, and conditional distributions</li>
                <li>• Understanding association patterns</li>
                <li>• Independence vs dependence</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📈 Visualization Tools</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Contingency tables and two-way tables</li>
                <li>• Segmented and clustered bar charts</li>
                <li>• Choosing the right display method</li>
                <li>• Visual association detection</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🔍 Analysis Skills</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Calculating conditional percentages</li>
                <li>• Comparing distributions across groups</li>
                <li>• Identifying meaningful patterns</li>
                <li>• Statistical vs practical significance</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Real-World Applications</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Customer behavior analysis</li>
                <li>• Medical treatment effectiveness</li>
                <li>• Survey data interpretation</li>
                <li>• Market research insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Big Picture Concepts */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Core Concepts</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔗</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Association: The Heart of Bivariate Analysis</h3>
                  <p className="text-yellow-600">
                    Association exists when the distribution of one variable changes depending on the level of another variable. 
                    It's about asking: "Does knowing Category A tell us something useful about Category B?"
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🆔 Marginal Distribution</h4>
                <p className="text-blue-600 text-sm mb-2">
                  The distribution of <strong>one variable by itself</strong>, ignoring the other variable.
                </p>
                <p className="text-blue-500 text-xs">
                  Example: Overall percentage who prefer coffee vs tea (ignoring age)
                </p>
              </div>

              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">📊 Conditional Distribution</h4>
                <p className="text-green-600 text-sm mb-2">
                  The distribution of one variable <strong>given a specific level</strong> of the other variable.
                </p>
                <p className="text-green-500 text-xs">
                  Example: Coffee vs tea preference among teenagers specifically
                </p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-700 mb-2">⚖️ Independence</h4>
                <p className="text-purple-600 text-sm mb-2">
                  When knowing one variable <strong>tells you nothing</strong> about the other variable.
                </p>
                <p className="text-purple-500 text-xs">
                  Example: Coffee preference is the same across all age groups
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-700 mb-2">🔗 Association</h4>
                <p className="text-red-600 text-sm mb-2">
                  When conditional distributions <strong>differ meaningfully</strong> across groups.
                </p>
                <p className="text-red-500 text-xs">
                  Example: Teenagers prefer energy drinks more than older adults
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
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Statistical Insight</h3>
          <p className="text-gray-600">
            Bivariate categorical analysis can reveal hidden patterns in data that might be invisible when looking at variables separately! 
            The power is in the comparisons - when conditional distributions differ meaningfully across groups, you've discovered an association.
            Many surprising discoveries in business and science started with someone noticing an unexpected pattern in a two-way table! 🔍✨
          </p>
        </div>
      </div>
    </main>
  );
} 