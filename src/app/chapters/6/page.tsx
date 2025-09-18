"use client";
import Link from 'next/link';

export default function Correlation() {
  const topics = [
    {
      title: "Scatterplots",
      description: "Master the foundation of correlation analysis! Learn to create and interpret scatterplots that reveal relationships between quantitative variables and identify patterns at a glance.",
      href: "/chapters/6/scatterplots",
      icon: "🎯"
    },
    {
      title: "Direction, Form & Strength", 
      description: "Develop your pattern recognition skills! Learn to identify positive/negative direction, linear/curved form, and weak/strong relationships in bivariate data.",
      href: "/chapters/6/direction-form-strength",
      icon: "🧭"
    },
    {
      title: "Correlation Coefficient",
      description: "Unlock the power of 'r'! Master the correlation coefficient calculation, understand what values from -1 to +1 really mean, and learn when correlation is meaningful.",
      href: "/chapters/6/correlation-coefficient",
      icon: "📊"
    },
    {
      title: "Correlation vs Causation",
      description: "Navigate the most important distinction in statistics! Learn why correlation doesn't imply causation, identify confounding variables, and avoid common logical pitfalls.",
      href: "/chapters/6/correlation-causation",
      icon: "⚠️"
    },
    {
      title: "Correlation Detective Game",
      description: "Become a correlation expert! Analyze real datasets, calculate correlation coefficients, and solve challenging scenarios that test your complete understanding of relationships.",
      href: "/chapters/6/correlation-game",
      icon: "🕵️"
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
              <span role="img" aria-label="correlation" className="text-4xl">🔗</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Correlation</h1>
              <p className="text-xl text-gray-600 mt-2">
                Discover hidden connections! Master scatterplots, correlation coefficients, and the crucial difference between correlation and causation.
              </p>
            </div>
          </div>
        </div>

        {/* The Power of Correlation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔗 Why Correlation Drives Discovery</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔗</span>
                <div>
                  <h3 className="font-bold text-blue-700 mb-2">Relationships Reveal Reality</h3>
                  <p className="text-blue-600">
                    Correlation analysis uncovers hidden relationships that drive decisions across every field. 
                    From predicting customer behavior to understanding health outcomes, discovering how variables 
                    relate to each other is often the first step toward breakthrough insights and better decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">📈 Predictive Power</h4>
                <p className="text-green-600 text-sm">Strong correlations enable predictions: knowing one variable helps predict another</p>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">🎯 Pattern Recognition</h4>
                <p className="text-purple-600 text-sm">Scatterplots reveal patterns invisible in tables of numbers</p>
              </div>

              <div className="border border-orange-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-orange-700 mb-2">⚠️ Critical Thinking</h4>
                <p className="text-orange-600 text-sm">Understanding correlation vs causation prevents costly logical errors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 Correlation Mastery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#ff8200] pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🎯 Scatterplot Analysis</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Explanatory (X) vs Response (Y) variables</li>
                <li>• Identifying direction: positive or negative</li>
                <li>• Assessing form: linear, curved, or no pattern</li>
                <li>• Evaluating strength: tight clustering vs scatter</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">📊 Correlation Coefficient (r)</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Range: always between -1 and +1</li>
                <li>• Sign indicates direction (+ or -)</li>
                <li>• Magnitude indicates strength (closer to ±1 = stronger)</li>
                <li>• Only measures linear relationships</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">🔍 Conditions for Correlation</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Both variables must be quantitative</li>
                <li>• Relationship should be "straight enough"</li>
                <li>• No extreme outliers distorting the pattern</li>
                <li>• Data should show linear association</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-[#58595b] mb-2">⚠️ Correlation ≠ Causation</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Association doesn't prove cause and effect</li>
                <li>• Confounding variables can create spurious correlations</li>
                <li>• Reverse causation is possible</li>
                <li>• Experimental design needed to establish causation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Correlation Strength Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">📏 Understanding Correlation Strength</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">The r Value Decoder</h3>
                  <p className="text-yellow-600">
                    The correlation coefficient r tells you both direction (sign) and strength (magnitude). 
                    But remember: even "weak" correlations can be meaningful in large datasets, and "strong" 
                    correlations don't guarantee practical importance!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="border border-red-200 rounded-lg p-3 text-center">
                <h4 className="font-bold text-red-700 mb-1">Perfect Negative</h4>
                <div className="text-2xl font-bold text-red-600">r = -1</div>
                <p className="text-xs text-red-500">Exact linear relationship, opposite direction</p>
              </div>

              <div className="border border-orange-200 rounded-lg p-3 text-center">
                <h4 className="font-bold text-orange-700 mb-1">Strong Negative</h4>
                <div className="text-2xl font-bold text-orange-600">r ≈ -0.8</div>
                <p className="text-xs text-orange-500">Clear negative pattern with some scatter</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <h4 className="font-bold text-gray-700 mb-1">No Correlation</h4>
                <div className="text-2xl font-bold text-gray-600">r ≈ 0</div>
                <p className="text-xs text-gray-500">No linear relationship visible</p>
              </div>

              <div className="border border-blue-200 rounded-lg p-3 text-center">
                <h4 className="font-bold text-blue-700 mb-1">Strong Positive</h4>
                <div className="text-2xl font-bold text-blue-600">r ≈ +0.8</div>
                <p className="text-xs text-blue-500">Clear positive pattern with some scatter</p>
              </div>

              <div className="border border-green-200 rounded-lg p-3 text-center">
                <h4 className="font-bold text-green-700 mb-1">Perfect Positive</h4>
                <div className="text-2xl font-bold text-green-600">r = +1</div>
                <p className="text-xs text-green-500">Exact linear relationship, same direction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Famous Correlation Warnings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">⚠️ Correlation Pitfalls to Avoid</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
              <span className="text-2xl">🍦</span>
              <div>
                <h3 className="font-semibold text-[#58595b]">Ice Cream & Drowning</h3>
                <p className="text-gray-600 text-sm">Ice cream sales correlate with drowning incidents. Does ice cream cause drowning? No! Hot weather causes both - a classic confounding variable example.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <span className="text-2xl">📺</span>
              <div>
                <h3 className="font-semibold text-[#58595b]">Internet Users & Lemon Imports</h3>
                <p className="text-gray-600 text-sm">These show 99.8% correlation! Both trends happen to increase over time, creating spurious correlation. Always question whether relationships make logical sense.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-semibold text-[#58595b]">Education & Income</h3>
                <p className="text-gray-600 text-sm">These correlate strongly, but does education cause higher income, or do wealthy families afford more education? Correlation suggests relationship but can't prove direction.</p>
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
          <h3 className="text-lg font-semibold text-[#58595b] mb-2">💡 Correlation Discovery</h3>
          <p className="text-gray-600">
            The correlation coefficient was developed by Karl Pearson in the 1890s, building on Francis Galton's work. 
            Pearson wanted a single number to measure how closely two variables relate. His "r" (for regression) 
            has become one of the most widely used statistics in the world! Interestingly, some of the strongest 
            correlations ever recorded are between seemingly unrelated things that just happen to trend together over time - 
            which is why understanding the difference between correlation and causation is so crucial! 🔗✨
          </p>
        </div>
      </div>
    </main>
  );
}