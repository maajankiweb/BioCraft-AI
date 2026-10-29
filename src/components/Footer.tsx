import React from 'react';
import { Sparkles, Heart, ExternalLink, BookOpen, Mail, Github, ShieldCheck, Zap } from 'lucide-react';
import { LANDING_PAGES } from '../data/landingPages.ts';

interface FooterProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'feedback') => void;
  onNavigateToPlatform?: (slug: string) => void;
  onNavigateToPage?: (page: 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq', postSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenModal,
  onNavigateToPlatform,
  onNavigateToPage,
}) => {
  const tools = [
    { slug: 'instagram-bio-generator', label: 'Instagram Bio Generator (150 chars)' },
    { slug: 'linkedin-bio-generator', label: 'LinkedIn Headline & Bio (220 chars)' },
    { slug: 'tiktok-bio-generator', label: 'TikTok Bio Generator (80 chars)' },
    { slug: 'twitter-bio-generator', label: 'Twitter / X Bio Generator (160 chars)' },
    { slug: 'youtube-bio-generator', label: 'YouTube About Generator (1,000 chars)' },
    { slug: 'hinglish-bio-generator', label: 'Hinglish & Hindi Bios (Desi Slang)' },
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

  const handlePageLink = (e: React.MouseEvent, page: 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq', postSlug?: string) => {
    e.preventDefault();
    if (onNavigateToPage) onNavigateToPage(page, postSlug);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info (2 columns wide on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BioCraft <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              BioCraft AI is an intelligent profile copywriting utility built to eliminate cut-off social bios and hallucinated credentials. Powered by Google Gemini 3.8 Flash with international grapheme boundary verification.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero Data Retained
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-indigo-400" />
                Sub-800ms Latency
              </span>
            </div>
          </div>

          {/* Platform Tools Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform Tools
            </h3>
            <ul className="space-y-2.5 text-xs">
              {tools.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`/${t.slug}`}
                    onClick={(e) => handleToolLink(e, t.slug)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Guides &amp; Playbooks
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handlePageLink(e, 'blog')}
                  className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore All Playbooks</span>
                  <span>→</span>
                </a>
              </li>
              {articles.map((art) => (
                <li key={art.slug}>
                  <a
                    href={`/blog/${art.slug}`}
                    onClick={(e) => handlePageLink(e, 'blog', art.slug)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {art.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handlePageLink(e, 'about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About BioCraft AI
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handlePageLink(e, 'contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact &amp; Support
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handlePageLink(e, 'privacy')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handlePageLink(e, 'terms')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handlePageLink(e, 'faq')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  FAQ Knowledge Base
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  onClick={(e) => handlePageLink(e, 'feedback')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Send Feedback
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://github.com/AshishKmj/BioCraft-AI"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BioCraft AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              support@biocraft.ai
            </span>
            <span className="text-slate-700">•</span>
            <span>100% Free &amp; Open Utility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
