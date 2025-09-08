import Image from 'next/image';
import Link from 'next/link';

const modules = [
  {
    title: "Regression Modeling",
    description: "Master the fundamentals of regression analysis and its applications in business analytics.",
    progress: 0,
    topics: ["Linear Regression", "Multiple Regression", "Logistic Regression", "Model Evaluation"],
    image: "/images/placeholder-module-1.jpg",
    slug: "regression-modeling"
  },
  {
    title: "Data Visualization",
    description: "Learn to create compelling visualizations that effectively communicate data insights.",
    progress: 0,
    topics: ["Principles of Data Viz", "Tableau Fundamentals", "Interactive Dashboards", "Storytelling with Data"],
    image: "/images/placeholder-module-2.jpg",
    slug: "data-visualization"
  },
  {
    title: "Machine Learning Basics",
    description: "Understand core machine learning concepts and their business applications.",
    progress: 0,
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Selection", "Feature Engineering"],
    image: "/images/placeholder-module-3.jpg",
    slug: "machine-learning"
  },
  {
    title: "SQL and Database Management",
    description: "Develop proficiency in SQL queries and database management fundamentals.",
    progress: 0,
    topics: ["SQL Basics", "Advanced Queries", "Database Design", "Performance Optimization"],
    image: "/images/placeholder-module-4.jpg",
    slug: "sql-database"
  }
];

function ModuleCard({ module }: { module: typeof modules[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
      <div className="relative h-48">
        <Image
          src={module.image}
          alt={module.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
        <p className="text-gray-600 mb-4">{module.description}</p>
        
        {/* Topics List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics Covered:</h4>
          <ul className="grid grid-cols-2 gap-2">
            {module.topics.map((topic, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{module.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>

        <Link
          href={`/instruction/${module.slug}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
        >
          Start Learning
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function Instruction() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Supplemental Instruction
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore my curated eLearning system designed to help students excel in 
          business analytics and related disciplines. Each module offers comprehensive 
          resources, hands-on exercises, and practical insights.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Modules", value: "4" },
          { label: "Topics", value: "16+" },
          { label: "Resources", value: "50+" },
          { label: "Students", value: "100+" }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module, index) => (
          <ModuleCard key={index} module={module} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-blue-100 mb-6">
          Join our learning community and enhance your business analytics skills 
          with comprehensive modules and hands-on exercises.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Create Free Account
        </button>
      </div>
    </div>
  );
} 