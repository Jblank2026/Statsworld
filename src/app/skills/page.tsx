import Image from 'next/image';

const technicalSkills = [
  {
    category: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "R", level: 85 },
      { name: "SQL", level: 90 }
    ]
  },
  {
    category: "Data Visualization",
    skills: [
      { name: "Tableau", level: 95 },
      { name: "Power BI", level: 90 },
      { name: "D3.js", level: 75 }
    ]
  },
  {
    category: "Analytics Tools",
    skills: [
      { name: "Excel", level: 95 },
      { name: "SPSS", level: 80 },
      { name: "SAS", level: 75 }
    ]
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "scikit-learn", level: 85 },
      { name: "TensorFlow", level: 70 },
      { name: "Statistical Modeling", level: 85 }
    ]
  }
];

const softSkills = [
  {
    name: "Problem Solving",
    description: "Strong analytical and critical thinking abilities to tackle complex business challenges."
  },
  {
    name: "Communication",
    description: "Excellent verbal and written skills in presenting data insights to technical and non-technical audiences."
  },
  {
    name: "Collaboration",
    description: "Experience working in cross-functional teams and leading data-driven projects."
  },
  {
    name: "Project Management",
    description: "Proven ability to manage multiple projects and meet deadlines effectively."
  }
];

const certifications = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2023",
    image: "/images/placeholder-cert-1.jpg"
  },
  {
    name: "Tableau Desktop Specialist",
    issuer: "Tableau",
    date: "2023",
    image: "/images/placeholder-cert-2.jpg"
  },
  {
    name: "Microsoft Power BI Data Analyst Associate",
    issuer: "Microsoft",
    date: "2023",
    image: "/images/placeholder-cert-3.jpg"
  }
];

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-600">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Skills & Expertise</h1>
      
      {/* Technical Skills Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {technicalSkills.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {category.category}
              </h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skillIndex}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Soft Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {skill.name}
              </h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Certifications & Badges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 