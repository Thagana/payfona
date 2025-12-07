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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payfona Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
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
              <article className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300 h-full flex flex-col">
                {/* Category Badge */}
                <div className="p-6 pb-0">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 mb-4 flex-1">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
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
                  <span className="text-orange-400 font-semibold group-hover:text-orange-300 inline-flex items-center">
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
