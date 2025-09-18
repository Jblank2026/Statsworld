"use client";
import Link from 'next/link';

export default function IntroductionToStatistics() {
  const topics = [
    {
      title: "What is Statistics?",
      description: "Discover the fundamental concepts of statistics, understanding variation, and how statistics helps us make sense of the world around us.",
      href: "/chapters/1/what-is-statistics",
      icon: "📈"
    },
    {
      title: "Populations & Samples",
      description: "Learn the crucial difference between populations and samples, and understand parameters vs statistics through interactive examples.",
      href: "/chapters/1/populations-samples", 
      icon: "👥"
    },
    {
      title: "Variables & Data Types",
      description: "Master the different types of variables - categorical, quantitative, and identifier - and learn how to structure data effectively.",
      href: "/chapters/1/variables-data-types",
      icon: "🏷️"
    },
    {
      title: "Statistics Game Challenge",
      description: "Put your new knowledge to the test! An interactive game covering all Chapter 1 concepts with real-world scenarios and immediate feedback.",
      href: "/chapters/1/statistics-game",
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
              <span role="img" aria-label="statistics introduction" className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Introduction to Statistics</h1>
              <p className="text-xl text-gray-600 mt-2">
                Start your statistical journey by learning what statistics is, understanding populations vs samples, and mastering variable types. Build the foundation for all statistical thinking!
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
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Did You Know?</h3>
          <p className="text-gray-600">
            Statistics is everywhere - from Netflix recommendations to medical breakthroughs, understanding variation is the key to unlocking insights! 
            The word "statistics" comes from the Latin "statisticus," meaning "of the state," because early statistics were used to collect data about nations.
          </p>
        </div>
      </div>
    </main>
  );
}