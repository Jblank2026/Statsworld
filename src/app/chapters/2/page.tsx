"use client";
import Link from 'next/link';

export default function Associations() {
  const topics = [
    {
      title: "Visual Arsenal",
      description: "Explore your complete toolkit of data visualization types and when to use them.",
      href: "/chapters/2/visualizations",
      icon: "📊"
    },
    {
      title: "Association Types",
      description: "Learn about different types of associations between variables.",
      href: "/chapters/2/association-types",
      icon: "🔗"
    },
    {
      title: "Quantitative-Quantitative",
      description: "Explore relationships between two quantitative variables.",
      href: "/chapters/2/quantitative-quantitative",
      icon: "📈"
    },
    {
      title: "Quantitative-Categorical",
      description: "Explore relationships between a quantitative and a categorical variable.",
      href: "/chapters/2/quantitative-categorical",
      icon: "📊"
    },
    {
      title: "Categorical-Categorical",
      description: "Explore relationships between two categorical variables.",
      href: "/chapters/2/categorical-categorical",
      icon: "🟦"
    },
    {
      title: "Visual ID Challenge",
      description: "Test your ability to identify different types of visualizations in an interactive game.",
      href: "/chapters/2/visual-id",
      icon: "🎯"
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
              <span role="img" aria-label="detective" className="text-4xl">🕵️‍♂️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Associations</h1>
              <p className="text-xl text-gray-600 mt-2">
                Explore relationships between variables through engaging examples and interactive visualizations.
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
          <h3 className="text-lg font-bold text-[#58595b] mb-2">💡 Fun Fact</h3>
          <p className="text-gray-600 italic">
            Did you know? The same statistical techniques we use to analyze customer behavior can reveal why some TikTok videos go viral!
          </p>
        </div>
      </div>
    </main>
  );
} 