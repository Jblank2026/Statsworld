import Image from 'next/image';

const projects = [
  {
    title: "Market Analysis Dashboard",
    description: "Created an interactive Power BI dashboard for market trend analysis, enabling stakeholders to track key performance indicators and make data-driven decisions. The dashboard includes real-time sales metrics, customer behavior patterns, and competitive analysis.",
    tools: ["Power BI", "SQL", "Excel"],
    image: "/images/placeholder-project-1.jpg",
    highlights: [
      "Automated data integration from multiple sources",
      "Created interactive visualizations for key metrics",
      "Implemented drill-down capabilities for detailed analysis"
    ]
  },
  {
    title: "Predictive Sales Model",
    description: "Developed a machine learning model using Python and scikit-learn to forecast sales trends and optimize inventory management. The model incorporates historical sales data, seasonal patterns, and external factors to provide accurate predictions.",
    tools: ["Python", "scikit-learn", "Pandas"],
    image: "/images/placeholder-project-2.jpg",
    highlights: [
      "Achieved 85% prediction accuracy",
      "Reduced inventory costs by 15%",
      "Implemented automated retraining pipeline"
    ]
  },
  {
    title: "Customer Segmentation Analysis",
    description: "Conducted comprehensive customer segmentation analysis using R and Tableau, identifying key customer segments and their behavioral patterns. This analysis helped in developing targeted marketing strategies and improving customer retention.",
    tools: ["R", "Tableau", "Statistical Analysis"],
    image: "/images/placeholder-project-3.jpg",
    highlights: [
      "Identified 5 distinct customer segments",
      "Created interactive Tableau dashboards",
      "Developed actionable marketing recommendations"
    ]
  },
  {
    title: "Supply Chain Optimization",
    description: "Implemented an optimization model for supply chain efficiency using Python and linear programming. The project focused on minimizing transportation costs while maintaining service levels across distribution networks.",
    tools: ["Python", "Operations Research", "Excel"],
    image: "/images/placeholder-project-4.jpg",
    highlights: [
      "Reduced transportation costs by 20%",
      "Improved delivery times by 30%",
      "Developed interactive optimization tool"
    ]
  }
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Projects</h1>
      <p className="text-xl text-gray-600 mb-12">
        Explore my portfolio of analytics projects, showcasing my expertise in data 
        visualization, machine learning, and business intelligence.
      </p>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[300px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {project.description}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className="flex items-start space-x-2"
                      >
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 