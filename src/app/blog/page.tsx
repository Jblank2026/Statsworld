import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: "Top 5 Python Libraries for Business Analysts",
    excerpt: "Discover the most powerful Python libraries that every business analyst should know. From data manipulation with Pandas to visualization with Seaborn, these tools will supercharge your analytics workflow.",
    date: "December 15, 2023",
    readTime: "8 min read",
    category: "Programming",
    image: "/images/placeholder-blog-1.jpg",
    slug: "top-python-libraries"
  },
  {
    title: "How to Tell a Story with Data Visualization",
    excerpt: "Learn the art of data storytelling through effective visualization techniques. We'll explore best practices for creating compelling narratives that drive decision-making.",
    date: "December 1, 2023",
    readTime: "10 min read",
    category: "Data Visualization",
    image: "/images/placeholder-blog-2.jpg",
    slug: "data-storytelling"
  },
  {
    title: "Lessons from My First Predictive Modeling Project",
    excerpt: "A deep dive into the challenges and insights gained from implementing a predictive model in a real-world business scenario. Learn from my experience and avoid common pitfalls.",
    date: "November 20, 2023",
    readTime: "12 min read",
    category: "Machine Learning",
    image: "/images/placeholder-blog-3.jpg",
    slug: "predictive-modeling-lessons"
  },
  {
    title: "The Future of Business Analytics: Trends to Watch",
    excerpt: "Explore emerging trends in business analytics, from automated machine learning to real-time analytics. Stay ahead of the curve with these insights into the future of data science.",
    date: "November 10, 2023",
    readTime: "15 min read",
    category: "Industry Insights",
    image: "/images/placeholder-blog-4.jpg",
    slug: "analytics-trends"
  }
];

const categories = [
  "All",
  "Programming",
  "Data Visualization",
  "Machine Learning",
  "Industry Insights"
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Insights, tutorials, and reflections on business analytics and data science.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Read More
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
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-20 bg-blue-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Subscribe to My Newsletter
        </h2>
        <p className="text-blue-100 mb-6">
          Get the latest insights and tutorials delivered straight to your inbox.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
} 