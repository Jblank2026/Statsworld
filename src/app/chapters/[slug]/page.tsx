"use client";
import { useParams } from 'next/navigation';

interface Section {
  title: string;
  content: string;
  activity: string;
  icon: string;
}

interface ProTip {
  tip: string;
  icon: string;
}

interface Chapter {
  title: string;
  subtitle: string;
  introduction: string;
  sections: Section[];
  proTips?: ProTip[];
}

interface ChapterContent {
  [key: string]: Chapter;
}

const chapterContent: ChapterContent = {
  "1": {
    title: "🎉 Welcome to the World of Business Analytics! 🌟",
    subtitle: "Mission: Become a Data Detective! 🔍",
    introduction: "Your task is to uncover how data drives business decisions and changes industries. From predicting customer behavior to optimizing NFL strategies, each concept is a stepping stone in your journey to becoming a business analytics expert! Get ready to turn numbers into insights and hunches into proven strategies!",
    sections: [
      {
        title: "1. What is Business Analytics?",
        content: "Business analytics turns hunches into insights! Think of it as your business superpower - using data, statistics, and models to understand processes and predict outcomes. Instead of guessing what customers want, you'll know it before they do! It's like having a crystal ball, but powered by spreadsheets instead of magic. 🔮",
        activity: "🎯 Detective Exercise: Put on your business owner hat! List three ways you'd use data to improve decisions. Would you track which products fly off the shelves? Monitor which ads make phones ring? Get creative - there's no wrong answer in brainstorming!",
        icon: "🕵️‍♂️"
      },
      {
        title: "2. Regression: Your Mathematical Superpower!",
        content: "Remember wondering when you'd ever use math in real life? Well, regression is your answer! It's like having X-ray vision for business relationships - seeing how different factors connect and influence each other. Whether you're predicting sales or understanding customer satisfaction, regression is your trusty sidekick!",
        activity: "🎬 Movie Magic Time! Pick your favorite movie and play producer. Use our formula to predict weekend box office: Weekend Gross = 0.38 + 15.3 × Ad Spending (in millions). Would you bet your popcorn budget on these predictions?",
        icon: "🦸‍♂️"
      },
      {
        title: "3. The Explosion of Data",
        content: "We're living in a data tsunami! Every click, swipe, and purchase adds to the wave. From Walmart tracking inventory to jet engines sending performance data, we're swimming in information. But don't worry - we'll teach you to surf these data waves like a pro! 🏄‍♂️",
        activity: "🔍 Data Detective Challenge: Be a data sleuth! Research your favorite app or company's data collection. How much do they gather? What secrets could be hiding in those numbers? Present your findings like a true investigator!",
        icon: "💥"
      },
      {
        title: "4. Real-World Examples: Business Analytics in Action",
        content: "From baseball diamonds to casino floors, data is changing the game! The MLB's Moneyball revolution showed us that numbers can find hidden talents, while Harrah's Casino used analytics to hit the jackpot in customer service. These aren't just success stories - they're your playbook for the future!",
        activity: "🎲 Choose Your Adventure: Pick your arena - Sports, Retail, or Finance. How would you use data to be the MVP? Draft a game plan for using analytics to score big in your chosen field!",
        icon: "🌍"
      },
      {
        title: "5. Kaggle.com: Your Analytics Playground",
        content: "Welcome to Kaggle - where data scientists flex their analytical muscles! It's like a gym for your brain, but instead of lifting weights, you're lifting insights from data. Compete in real-world challenges, from predicting customer behavior to optimizing business performance. Warning: May cause addiction to data crunching!",
        activity: "🏆 Treasure Hunt: Visit Kaggle.com and explore the competitions. Find one that makes your inner data nerd jump for joy! Share what excites you about it - the weirder, the better!",
        icon: "🎮"
      },
      {
        title: "6. Friendship Analytics: The Science of Connections",
        content: "Can data predict friendships? We're using analytics to understand what makes people click (literally and figuratively)! From analyzing profile pictures to studying interaction patterns, we're decoding the science of relationships. It's either brilliant innovation or proof that data scientists need more friends! 😄",
        activity: "👥 Social Scientist Mode: Channel your inner researcher! Create a list of friendship factors you could measure. How would you collect this data? Bonus points for creative metrics like 'high-five frequency' or 'shared meme appreciation index'!",
        icon: "❤️"
      },
      {
        title: "7. The Analytics Gold Rush",
        content: "The business world is hungry for data wizards! Companies are racing to hire analytics experts faster than you can say 'spreadsheet.' Your future career could be turning mountains of data into goldmines of insights. No pickaxe required - just bring your analytical mind and a love for problem-solving!",
        activity: "🎯 Future You Challenge: Map your path to analytics stardom! Create a ranked list of must-have skills (Excel, SQL, R, etc.). Think of it as your personal power-up sequence in the game of business analytics!",
        icon: "📈"
      }
    ],
    proTips: [
      {
        tip: "Visualize First: If your graph looks like modern art, you might be onto something... or you might need coffee. ☕",
        icon: "👁️"
      },
      {
        tip: "Keep It Real: If you can't explain your analysis to a 5-year-old (or your pet), simplify it!",
        icon: "🔍"
      },
      {
        tip: "Learn By Doing: Every expert started as a beginner who refused to give up. Your first analysis might not be perfect, but it's a start!",
        icon: "💪"
      }
    ]
  },
  "2": {
    title: "🎉 Dive into the World of Associations with Fun & Analytics! 🌟",
    subtitle: "Mission Objective: Master the Art of Association Analysis",
    introduction: "Welcome, data detective! You've been hired by the Department of Statistical Sleuths to uncover the secrets of relationships in datasets. Your tools? R programming, mosaic plots, and your sharp analytical mind. Your mission? Identify meaningful connections between variables and differentiate statistical significance from practical importance.",
    sections: [
      {
        title: "1. Define Association",
        content: `What is an association? Picture two variables as dance partners: when one moves, the other follows—sometimes gracefully, sometimes clumsily. Your task is to learn their rhythm!`,
        activity: "Think of everyday associations. Does the amount of coffee consumed relate to productivity? Or how about the time spent on TikTok vs. GPA? Write your hypotheses!",
        icon: "🧩"
      },
      {
        title: "2. Categorical Variables & Mosaic Magic",
        content: "Learn how to visualize categorical data relationships with mosaic plots. Imagine painting with data—each color tells a story.",
        activity: "Use R to create a mosaic plot. Experiment with the TIPS dataset to see relationships between weekday and time of day for tips collected. What patterns emerge?",
        icon: "🎨"
      },
      {
        title: "3. Contingency Tables: A Data Buffet!",
        content: "Create a contingency table to summarize variable pairings. Think of it as your statistical menu, showing combinations like 'Occasionally drops calls' and 'Verizon users.'",
        activity: "Build a contingency table for dropped call frequencies across carriers. Can you guess the 'Most Reliable' award winner?",
        icon: "📊"
      },
      {
        title: "4. Statistical vs. Practical Significance: Reality Check",
        content: "Not all associations matter in real life. A p-value might scream 'statistical significance,' but does it mean anything for your bottom line? Learn to spot the difference.",
        activity: "Compare mosaic plots and p-values. Ask yourself: If this were a business decision, would the association change your strategy?",
        icon: "🤔"
      },
      {
        title: "5. Permutation Power!",
        content: "Simulate datasets to understand the power of randomness. It's like shuffling cards—do patterns still emerge, or are they just chance?",
        activity: "Perform a permutation test for dropped call data in R. Plot the resulting D values and highlight the observed D. Where does it stand?",
        icon: "🎲"
      },
      {
        title: "6. Bonus: Friendship Analytics",
        content: "Explore the 'Friendship Survey' dataset. What makes someone friend material? Use statistical tests to find the key traits.",
        activity: "Create side-by-side boxplots for friendship scores based on 'smiling' vs. 'not smiling.' Which group has the edge?",
        icon: "❤️"
      }
    ]
  },
  "3": {
    title: "🎉 Welcome to the World of Simple Linear Regression! 🌟",
    subtitle: "Mission: Build Your Regression Superpowers! 📈",
    introduction: "Ready to unlock the secrets of prediction? Welcome to Simple Linear Regression - where math meets crystal ball! Your mission: master the art of finding relationships, making predictions, and testing their significance. Grab your calculator (or better yet, R Studio) and let's dive into the world where every line tells a story!",
    sections: [
      {
        title: "1. The Philosophy of Regression",
        content: "Think of regression as your data's matchmaker! It's not just about crunching numbers - it's about understanding relationships and making smart predictions. Like a detective piecing together clues, you'll learn to spot patterns and connections that others might miss. Remember: behind every great prediction is a carefully crafted regression model! 🔍",
        activity: "🎯 Real-Life Connections: Time to play 'Spot the Relationship!' Think about two variables in your daily life (study time ⏰ vs. grades 📚, sleep hours 😴 vs. coffee consumption ☕). Sketch out how you think they're related. Bonus points for creative but logical connections!",
        icon: "🤔"
      },
      {
        title: "2. The Magic Formula: y = β₀ + β₁x",
        content: "Meet your new best friend: the simple linear regression equation! β₀ (beta-zero) is your y-intercept - where your line starts its journey. β₁ (beta-one) is your slope - the story of how y changes when x takes a step. Together, they're like the GPS coordinates for your predictions! 🗺️",
        activity: "🎬 Salary Sleuth: Imagine you're a career counselor. Use the magic formula to predict salaries! If entry-level salary (β₀) is $40,000 and each year of experience (β₁) adds $5,000, create predictions for years 0-5. Plot your predictions - you're now a salary fortune teller! 🔮",
        icon: "📐"
      },
      {
        title: "3. Least Squares: Finding the Perfect Fit",
        content: "Welcome to the 'Line of Best Fit' game show! Your challenge: find the line that gets as close as possible to ALL your data points. The secret weapon? The Sum of Squared Errors (SSE) - your mathematical measuring tape for finding the perfect fit. The smaller the SSE, the better your line hugs the data! 🎯",
        activity: "📊 R Studio Challenge: Load up your favorite dataset (or use our trusty tips data). Calculate residuals and SSE. Then plot your line of best fit. Does it look like a superhero cape swooping through your data points? That's the goal!",
        icon: "🎯"
      },
      {
        title: "4. Statistical vs. Practical Significance",
        content: "Just because something is statistically significant doesn't mean it's useful in real life! It's like having a metal detector that beeps at every paperclip - technically accurate, but not very helpful for treasure hunting. Learn to distinguish between 'mathematically interesting' and 'actually useful' relationships! 🧐",
        activity: "⚖️ The Significance Showdown: Compare two regression models - one predicting ice cream sales from temperature, another from the number of clouds in the sky. Which one is both statistically significant AND practically useful? Defend your champion!",
        icon: "⚡"
      },
      {
        title: "5. Residuals: The Story in the Leftovers",
        content: "Residuals are like the critics of your regression line - they point out where your predictions missed the mark! These 'leftovers' between actual and predicted values can tell you if your model is a hit or needs a rewrite. Think of them as your model's report card! 📝",
        activity: "🎨 Residual Art Gallery: Create the most beautiful (or revealing) residual plot you can! Look for patterns - are your predictions consistently off somewhere? Is your plot telling you to rethink your model? Present your findings like an art critic! 🖼️",
        icon: "🔍"
      },
      {
        title: "6. Simulating Significance",
        content: "Time to play 'What If?' with your data! Permutation tests are like shuffling a deck of cards - if your regression results still look good after randomly mixing up your data, maybe they weren't so special after all. It's your statistical reality check! 🃏",
        activity: "🎲 The Shuffle Challenge: Take your dataset, shuffle it like a Vegas dealer, and rerun your regression. Do this 100 times (thank goodness for computers!). How special does your original model look now? Welcome to the world of simulation!",
        icon: "🎲"
      },
      {
        title: "7. R-squared: Your Model's Report Card",
        content: "R-squared is like your model's grade point average - it tells you how much of the variation in y your x variable explains. A perfect 1.0 is like getting 100% on a test (rare!), while 0.0 means your x variable is about as useful as a chocolate teapot! 📊",
        activity: "🏠 House Price Challenge: Analyze house prices using square footage as your predictor. Calculate R-squared. Then add a second model using number of bathrooms. Which model gets the better grade? Why might some variation remain unexplained?",
        icon: "📈"
      },
      {
        title: "8. Real-World Regression in Action",
        content: "Time to put your regression superpowers to work! From predicting sales to estimating project timelines, regression is everywhere. But remember: models are like maps - useful simplifications of reality, not perfect replicas! 🌍",
        activity: "💼 The Consultant's Challenge: You're hired to predict employee performance scores based on training hours. Use R to build your model, make predictions, and present your findings. Don't forget to explain why your model is (or isn't) trustworthy!",
        icon: "🌟"
      }
    ],
    proTips: [
      {
        tip: "Context is King: A regression without context is like a joke without a punchline - technically complete but missing the point! 👑",
        icon: "🎯"
      },
      {
        tip: "Plot Everything: Your eyes are powerful statistical tools. If something looks weird in a plot, investigate! 📊",
        icon: "👀"
      },
      {
        tip: "Test, Don't Trust: Always check your model's assumptions. Even beautiful lines can lie! 🔍",
        icon: "⚖️"
      }
    ]
  }
};

export default function ChapterPage() {
  const params = useParams();
  const chapter = chapterContent[params.slug as string];

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#58595b] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              {chapter.title}
            </h1>
            <p className="text-xl text-[#ff8200] font-semibold mb-4">
              {chapter.subtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {chapter.introduction}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {chapter.sections.map((section: Section, index: number) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-[#ff8200] transition-all duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{section.icon}</span>
                <h2 className="text-2xl font-bold text-[#58595b]">
                  {section.title}
                </h2>
              </div>
              <div className="pl-12">
                <p className="text-gray-600 mb-4">
                  {section.content}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#ff8200] mb-2">
                    🎯 Activity
                  </h3>
                  <p className="text-gray-600">
                    {section.activity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Pro Tips Section */}
          {chapter.proTips && (
            <div className="bg-[#58595b] rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 text-center">🌟 Pro Tips for Success</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {chapter.proTips.map((tip: ProTip, index: number) => (
                  <div 
                    key={index}
                    className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{tip.icon}</span>
                      <p className="text-white">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 