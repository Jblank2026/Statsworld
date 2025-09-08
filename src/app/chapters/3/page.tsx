"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function RBasics() {
  const topics = [
    {
      title: "R Studio Setup",
      description: "Learn how to set up and configure R Studio for data analysis.",
      href: "/chapters/3/r-studio-setup",
      icon: "⚙️"
    },
    {
      title: "R Arithmetic Practice",
      description: "Test your knowledge of basic R calculations with this interactive game.",
      href: "/chapters/3/r-arithmetic-game",
      icon: "🎮"
    },
    {
      title: "Vector Challenge",
      description: "Practice creating and manipulating vectors in R with this interactive game.",
      href: "/chapters/3/vector-challenge",
      icon: "🎯"
    },
    {
      title: "Data Frame Challenge",
      description: "Master data frame operations in R through hands-on practice and interactive challenges.",
      href: "/chapters/3/data-frame-challenge",
      icon: "📊"
    },
    {
      title: "Summary Functions",
      description: "Match R functions with their descriptions in this interactive game.",
      href: "/chapters/3/summary-functions",
      icon: "🎲"
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
              <span role="img" aria-label="r programming" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">R Basics</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the fundamentals of R programming for data analysis
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
      </div>
    </main>
  );
} 