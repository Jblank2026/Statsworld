import Link from 'next/link';

// This would typically come from a database or CMS
const moduleContent = {
  'regression-modeling': {
    title: "Regression Modeling",
    description: "Master the fundamentals of regression analysis and its applications in business analytics.",
    image: "/images/placeholder-module-1.jpg",
    objectives: [
      "Understand the principles of linear regression",
      "Apply multiple regression techniques to real-world problems",
      "Evaluate model performance and assumptions",
      "Interpret regression results for business decisions"
    ],
    sections: [
      {
        title: "Linear Regression Fundamentals",
        content: "Introduction to simple linear regression, including key concepts and assumptions.",
        resources: [
          { type: "PDF", name: "Linear Regression Guide", url: "#" },
          { type: "Dataset", name: "Sample Data for Practice", url: "#" },
          { type: "Video", name: "Regression Tutorial", url: "#" }
        ],
        quiz: {
          title: "Linear Regression Quiz",
          questions: 10,
          timeLimit: "20 minutes"
        }
      },
      {
        title: "Multiple Regression Analysis",
        content: "Advanced techniques for handling multiple independent variables.",
        resources: [
          { type: "PDF", name: "Multiple Regression Manual", url: "#" },
          { type: "Dataset", name: "Advanced Practice Dataset", url: "#" },
          { type: "Code", name: "R Script Examples", url: "#" }
        ],
        quiz: {
          title: "Multiple Regression Assessment",
          questions: 15,
          timeLimit: "30 minutes"
        }
      }
    ]
  }
  // Add other modules here
};

function ResourceIcon({ type }: { type: string }) {
  switch (type) {
    case 'PDF':
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4v12h12V4H4zm11 11H5V5h10v10z" />
        </svg>
      );
    case 'Dataset':
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
        </svg>
      );
    case 'Video':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553-3.106l4.618 2.51A1 1 0 0120 6.31v7.38a1 1 0 01-.829.907l-4.618 2.51A1 1 0 0113 16.31V3.69a1 1 0 011.553-.796z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      );
  }
}

export default function ModulePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const module = moduleContent[params.slug as keyof typeof moduleContent];

  if (!module) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <p className="text-xl text-gray-600">
            The requested module could not be found. Please return to the{' '}
            <Link href="/instruction" className="text-blue-600 hover:text-blue-700">
              instruction page
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Module Header */}
      <div className="mb-12">
        <Link
          href="/instruction"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Modules
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{module.title}</h1>
        <p className="text-xl text-gray-600">{module.description}</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Objectives</h2>
        <ul className="grid gap-4">
          {module.objectives.map((objective, index) => (
            <li key={index} className="flex items-start">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-600">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Module Sections */}
      <div className="space-y-12">
        {module.sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-6">{section.content}</p>

              {/* Resources */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Learning Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.resources.map((resource, resourceIndex) => (
                    <a
                      key={resourceIndex}
                      href={resource.url}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ResourceIcon type={resource.type} />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {resource.name}
                        </div>
                        <div className="text-xs text-gray-500">{resource.type}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quiz Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {section.quiz.title}
                </h3>
                <div className="text-gray-600 mb-4">
                  <p>{section.quiz.questions} questions • {section.quiz.timeLimit}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracker */}
      <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Overall Completion</span>
              <span>25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>Resources Accessed: 3/12</div>
            <div>Quizzes Completed: 1/4</div>
          </div>
        </div>
      </div>
    </div>
  );
} 