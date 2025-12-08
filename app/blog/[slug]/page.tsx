// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "../../../lib/blog-post";
import { Metadata } from "next";
import SanitizedHTML from "../../../components/SanitizedHTML";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - Payfona",
    };
  }

  return {
    title: `${post.title} - Payfona Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="border-b border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full border border-purple-300">
              {post.category}
            </span>
            <span className="text-purple-600 text-sm">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-purple-600 text-sm">
            <span>{post.author}</span>
            <span className="mx-3">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-ZA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-purple-900 prose-a:text-purple-600 prose-strong:text-purple-800">
          <SanitizedHTML
            html={post.content}
            className="text-gray-800 leading-relaxed"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to try {post.feature}?
          </h3>
          <p className="text-purple-100 mb-6">
            Start with Payfona`s free plan and upgrade when you`re ready. No
            credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </article>
    </div>
  );
}
