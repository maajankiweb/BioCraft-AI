import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, Tag, Sparkles, ChevronLeft, Share2, Check } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts.ts';

interface BlogPageProps {
  currentPostSlug?: string;
  onNavigateToPost: (slug: string) => void;
  onNavigateToBlogIndex: () => void;
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  currentPostSlug,
  onNavigateToPost,
  onNavigateToBlogIndex,
  onNavigateToHome,
  onScrollToGenerator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const activePost = currentPostSlug
    ? BLOG_POSTS.find((p) => p.slug === currentPostSlug)
    : undefined;

  const categories = ['All', 'Instagram', 'LinkedIn', 'TikTok', 'Multilingual'];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // If viewing a single post
  if (activePost) {
    return (
      <div className="bg-slate-50 min-h-screen py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
            <button
              onClick={onNavigateToHome}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={onNavigateToBlogIndex}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-xs">{activePost.title}</span>
          </div>

          <button
            onClick={onNavigateToBlogIndex}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 mb-8 cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header Card */}
          <article className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs mb-12">
            <div className="flex items-center gap-2.5 mb-5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
                {activePost.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{activePost.readTime}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePost.publishedDate}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {activePost.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-100 mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {activePost.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{activePost.author}</p>
                  <p className="text-xs text-slate-500">{activePost.authorRole}</p>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4
              [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-4
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-3
              [&>p]:text-slate-600 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:text-slate-600
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:text-slate-600
              [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-indigo-900 [&>blockquote]:bg-indigo-50/50 [&>blockquote]:py-2 [&>blockquote]:rounded-r-lg
              [&_.sample-box]:p-4 [&_.sample-box]:rounded-2xl [&_.sample-box]:bg-purple-50/70 [&_.sample-box]:border [&_.sample-box]:border-purple-200/80 [&_.sample-box]:text-slate-800 [&_.sample-box]:my-4 [&_.sample-box]:font-mono [&_.sample-box]:text-xs [&_.sample-box]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
            />

            {/* Bottom Keywords Pills */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Related Topics:</span>
              </span>
              {activePost.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </article>

          {/* Embedded Generator CTA */}
          <div className="bg-linear-to-r from-purple-600 via-indigo-600 to-indigo-800 rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg mb-12">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Craft Your Bio With BioCraft AI
            </h2>
            <p className="text-indigo-100 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              Generate platform-compliant, fact-checked bios for Instagram, LinkedIn, and more in seconds.
            </p>
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(onScrollToGenerator, 100);
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md cursor-pointer transition-transform active:scale-95 text-sm"
            >
              <span>Try Bio Generator Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Blog Archive / List View
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button
            onClick={onNavigateToHome}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900">Blog &amp; Copywriting Guides</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Profile Optimization Playbooks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Social Copywriting &amp;{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600">
              Profile Guides
            </span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Data-backed guides on character limits, platform algorithms, aesthetic formatting, and multilingual copywriting.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => onNavigateToPost(post.slug)}
              className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{post.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[10px]">
                    {post.author[0]}
                  </div>
                  <span>{post.author}</span>
                </div>

                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
