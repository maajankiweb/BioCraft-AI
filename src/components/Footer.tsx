import React from 'react';
import { Sparkles, Heart, ExternalLink, BookOpen } from 'lucide-react';
import { LANDING_PAGES } from '../data/landingPages.ts';

interface FooterProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'feedback') => void;
  onNavigateToPlatform?: (slug: string) => void;
  onNavigateToPage?: (page: 'home' | 'about' | 'contact' | 'blog', postSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenModal,
  onNavigateToPlatform,
  onNavigateToPage,
}) => {
  const tools = [
    { slug: 'instagram-bio-generator', label: 'Instagram Bio Generator' },
    { slug: 'linkedin-bio-generator', label: 'LinkedIn Headline Generator' },
    { slug: 'tiktok-bio-generator', label: 'TikTok Bio Generator' },
    { slug: 'twitter-bio-generator', label: 'Twitter / X Bio Generator' },
    { slug: 'youtube-bio-generator', label: 'YouTube About Generator' },
    { slug: 'hinglish-bio-generator', label: 'Hinglish & Hindi Bios' },
  ];

  const articles = [
    { slug: 'instagram-bio-limits-guide-2026', label: 'Instagram 150-Char Bio Limits' },
    { slug: 'high-converting-linkedin-headlines', label: 'LinkedIn Headline Frameworks' },
    { slug: 'hinglish-social-media-bio-secrets', label: 'Hinglish Desi Bio Strategies' },
    { slug: 'tiktok-bio-optimization-80-characters', label: 'TikTok 80-Char Hook Formula' },
  ];

  const handleToolLink = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    if (onNavigateToPlatform) onNavigateToPlatform(slug);
  };

  const handlePageLink = (e: React.MouseEvent, page: 'home' | 'about' | 'contact' | 'blog', postSlug?: string) => {
    e.preventDefault();
    if (onNavigateToPage) onNavigateToPage(page, postSlug);
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                BioCraft <span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              BioCraft AI is a free AI-powered bio generator for Instagram, LinkedIn, TikTok, YouTube, and X.
              We strictly enforce verified platform character limits, support 3 languages, and store zero user data.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              ⚡ Powered by Google Gemini 3.8 Flash • Real-time Grapheme Counting
            </div>
          </div>

          {/* Programmatic Tools Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform Tools
            </h3>
            <ul className="space-y-2 text-xs">
              {tools.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`/${t.slug}`}
                    onClick={(e) => handleToolLink(e, t.slug)}
                    className="text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Bio Guides &amp; Blog
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handlePageLink(e, 'blog')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  All Blog Playbooks →
                </a>
              </li>
              {articles.map((art) => (
                <li key={art.slug}>
                  <a
                    href={`/blog/${art.slug}`}
                    onClick={(e) => handlePageLink(e, 'blog', art.slug)}
                    className="text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    {art.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handlePageLink(e, 'about')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  About BioCraft AI
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handlePageLink(e, 'contact')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Contact &amp; Support
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('feedback')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BioCraft AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Zero data persisted • Ephemeral AI generation
          </p>
        </div>
      </div>
    </footer>
  );
};
