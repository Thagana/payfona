// app/blog/page.tsx
import Link from "next/link";
import { blogPosts } from "../../lib/blog-post";

export const metadata = {
  title: "Blog - Payfona | Payment Insights for SA Businesses",
  description:
    "Learn about modern payment solutions, business growth strategies, and financial management for South African SMEs.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Payfona Blog
          </h1>
          <p className="text-xl text-purple-700 max-w-2xl">
            Insights on payment solutions, business growth, and financial
            management for South African businesses.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-lg overflow-hidden border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Category Badge */}
                <div className="p-6 pb-0">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full border border-purple-300">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-purple-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-700 mb-4 flex-1">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-purple-600 pt-4 border-t border-purple-100">
                    <span>{post.readTime}</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Read More */}
                <div className="px-6 pb-6">
                  <span className="text-purple-600 font-semibold group-hover:text-purple-800 inline-flex items-center">
                    Read Article
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
