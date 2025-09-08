"use client";
import Link from 'next/link';
import SimplePageTracker from '../components/SimplePageTracker';

const CAUTION_MESSAGES = [
  "🚧 STATISTICS POLICE - DO NOT CROSS 🚨",
  "🚧 MATH ZONE - DO NOT CROSS 🚧",
  "⚠️ REGRESSION IN PROGRESS - DO NOT CROSS ⚠️",
  "🔒 CLASSIFIED DATA - DO NOT CROSS 🔒",
  "⛔ STATISTICAL CRIME SCENE - DO NOT CROSS ⛔",
  "🚫 DATA ANALYSIS IN PROGRESS - DO NOT CROSS 🚫"
];

const COMING_SOON_MESSAGES = [
  "Coming Soonest",
  "Coming Sooner",
  "Coming Soon",
  "Coming Eventually",
  "Never Coming",
  "Might Come"
];

const chapters = [
  {
    number: 1,
    title: "R Basics",
    description: "Master the fundamentals of R programming through interactive games and challenges. Practice arithmetic operations, vector manipulation, data frames, and summary functions. Get hands-on experience with real-world examples and immediate feedback.",
    topics: [
      "🎮 R Arithmetic Practice",
      "🎯 Vector Challenge",
      "📊 Data Frame Challenge",
      "🎲 Summary Functions Game"
    ],
    emoji: "📊",
    funFact: "Did you know? R was created by statisticians and named after their first initials (Ross Ihaka and Robert Gentleman)!",
    locked: false,
    slug: "/chapters/3"
  },
  {
    number: 2,
    title: "Associations",
    description: "Explore relationships between variables through engaging examples and interactive visualizations. Learn about contingency tables, mosaic plots, and discover the difference between statistical and practical significance.",
    topics: [
      "🧠 Is Brain Rot Real?",
      "🎨 Mosaic Plot Mastery",
      "📊 Contingency Table Creation",
      "🤔 Statistical vs. Practical Significance"
    ],
    emoji: "🔍",
    funFact: "Did you know? The same statistical techniques we use to analyze customer behavior can reveal why some TikTok videos go viral!",
    locked: false,
    slug: "/chapters/2"
  },
  {
    number: 3,
    title: "Simple Linear Regression: Where Math Meets Reality! 📈",
    description: "Join us on a journey where we turn relationships into predictions! From caffeine-productivity correlations to ice cream sales forecasts, discover the power of regression.",
    topics: [
      "🎯 The Magic Formula",
      "📐 Finding the Perfect Fit",
      "💡 Coefficient Stories",
      "🔍 Residual Detective Work",
      "🎲 Statistical Adventures",
      "📊 Model Performance Checks"
    ],
    emoji: "🚀",
    funFact: "Did you know? The same regression techniques that predict pizza delivery times are used by NASA for rocket trajectories! 🍕🚀",
    locked: false,
    slug: "/chapters/4"
  },
  {
    number: 4,
    title: "Multiple Regression: Level Up Your Prediction Game! 🎮",
    description: "Welcome to the multiverse of regression! From house prices to customer behavior, discover how combining variables creates more powerful predictions.",
    topics: [
      "🎯 Beyond Simple Regression",
      "🔍 Hidden Assumption Hunt",
      "💡 Coefficient Mysteries",
      "🕵️‍♂️ Lurking Variable Chase",
      "🎪 Multicollinearity Magic",
      "📊 Model Evaluation Time"
    ],
    emoji: "📊",
    funFact: "Did you know? Netflix uses multiple regression to predict your next favorite show! That's how it knows about your midnight habits! 🐱",
    locked: false,
    slug: "/chapters/5"
  },
  {
    number: 5,
    title: "Categorical Variables: The Secret Sauce of Regression! 🎭",
    description: "Welcome to the colorful world of categorical variables! From gender studies to weekend shopping patterns, learn how to turn categories into powerful insights.",
    topics: [
      "🎨 Indicator Variable Magic",
      "🎭 Reference Level Mastery",
      "🔄 Interaction Adventures",
      "📊 Visualization Secrets",
      "⚖️ Real-World Applications",
      "🎪 Multiple Category Fun"
    ],
    emoji: "🎭",
    funFact: "Did you know? Website success varies by both day and location - proving that timing and place make the perfect match! 🎯",
    locked: false,
    slug: "/chapters/6"
  },
  {
    number: 6,
    title: "Logistic Regression: Your Crystal Ball for Yes/No Questions! 🔮",
    description: "Step into the probability palace where we turn maybes into predictions! From customer choices to medical outcomes, master the art of binary prediction.",
    topics: [
      "🎲 Probability Foundations",
      "🌈 The S-Curve Journey",
      "🎯 Binary Prediction Power",
      "📊 Odds Ratio Magic",
      "🌟 Multiple Predictor Fun",
      "🔍 Model Testing Time"
    ],
    emoji: "🎲",
    funFact: "Did you know? The same models that predict ad clicks help doctors make medical decisions! Start with customers first! 🧠",
    locked: false,
    slug: "/chapters/7"
  },
  {
    number: 7,
    title: "Model Building: The Art of Crafting Perfect Predictions! 🏗️",
    description: "Master the strategic process of building statistical models! From variable selection to model validation, learn how to construct robust, reliable predictions that stand the test of time.",
    topics: [
      "🎯 Variable Selection Strategy",
      "🔍 Forward & Backward Selection",
      "⚖️ Model Comparison Techniques",
      "🎪 Cross-Validation Adventures",
      "📊 Performance Evaluation",
      "🛠️ Model Diagnostics & Tuning"
    ],
    emoji: "🏗️",
    funFact: "Did you know? Netflix tests thousands of model variations to recommend your next binge-watch - it's like having a personal statistician! 🎬",
    locked: false,
    slug: "/chapters/8"
  }
];

export default function Chapters() {
  return (
    <main className="min-h-screen">
      <SimplePageTracker />
      {/* Hero Section */}
      <div className="bg-[#58595b] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Course Chapters
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Start your journey with fundamental statistical concepts, master R programming, 
              and progress to advanced data analysis techniques. Each chapter builds your skills 
              through interactive games and hands-on practice with NetID tracking.
            </p>
            <p className="text-[#ff8200] text-xl font-semibold">
              Learn at your own pace and turn insights into action!
            </p>
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter) => (
              <div 
                key={chapter.number}
                className="group"
              >
                {!chapter.locked ? (
                  <Link href={chapter.slug || `/chapters/${chapter.number}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-[#ff8200] transition-all duration-300 cursor-pointer">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-3xl">{chapter.emoji}</span>
                          </div>
                          {!chapter.locked && (
                            <svg 
                              className="w-6 h-6 text-gray-400 group-hover:text-[#ff8200] transform group-hover:translate-x-1 transition-all" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                          {chapter.locked && (
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </div>
                        <h2 className={`text-xl font-bold mb-3 ${
                          chapter.locked ? 'text-gray-500' : 'text-[#58595b] group-hover:text-[#ff8200]'
                        } transition-colors`}>
                          {chapter.title}
                        </h2>
                        <p className={`mb-4 ${chapter.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {chapter.description}
                        </p>
                        <div className="space-y-2">
                          {chapter.topics.map((topic, index) => (
                            <div key={index} className={`flex items-center text-sm ${
                              chapter.locked ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                chapter.locked ? 'bg-gray-300' : 'bg-[#ff8200]'
                              }`}></span>
                              {topic}
                            </div>
                          ))}
                        </div>
                        {chapter.funFact && (
                          <div className={`mt-4 p-3 rounded-lg ${
                            chapter.locked ? 'bg-gray-100' : 'bg-gray-50'
                          }`}>
                            <p className={`text-sm italic ${
                              chapter.locked ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {chapter.funFact}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 opacity-75 cursor-not-allowed">
                    {/* Caution Tape */}
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform rotate-[-12deg] z-10">
                      <div className="bg-yellow-400 text-black py-2 text-center font-bold text-lg" style={{ 
                        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10%, #FFD700 10%, #FFD700 20%)',
                        textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
                      }}>
                        {CAUTION_MESSAGES[chapter.number % CAUTION_MESSAGES.length]}
                      </div>
                    </div>
                    <div className="p-6" style={{ opacity: 0.5 }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl">{chapter.emoji}</span>
                        </div>
                        {!chapter.locked && (
                          <svg 
                            className="w-6 h-6 text-gray-400 group-hover:text-[#ff8200] transform group-hover:translate-x-1 transition-all" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                        {chapter.locked && (
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                      <h2 className={`text-xl font-bold mb-3 ${
                        chapter.locked ? 'text-gray-500' : 'text-[#58595b] group-hover:text-[#ff8200]'
                      } transition-colors`}>
                        {chapter.title}
                      </h2>
                      <p className={`mb-4 ${chapter.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                        {chapter.description}
                      </p>
                      <div className="space-y-2">
                        {chapter.topics.map((topic, index) => (
                          <div key={index} className={`flex items-center text-sm ${
                            chapter.locked ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              chapter.locked ? 'bg-gray-300' : 'bg-[#ff8200]'
                            }`}></span>
                            {topic}
                          </div>
                        ))}
                      </div>
                      {chapter.funFact && (
                        <div className={`mt-4 p-3 rounded-lg ${
                          chapter.locked ? 'bg-gray-100' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm italic ${
                            chapter.locked ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {chapter.funFact}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {chapter.locked && (
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                      {COMING_SOON_MESSAGES[(chapter.number - 2) % COMING_SOON_MESSAGES.length]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 