import React, { useState } from 'react';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Zap,
  ChevronDown,
  Instagram,
  Linkedin,
  Video,
  Twitter,
  Youtube,
  Languages,
  BookOpen,
  Info,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { LANDING_PAGES } from '../data/landingPages.ts';

interface HeaderProps {
  onScrollToGenerator: () => void;
  onNavigateToPlatform?: (slug: string) => void;
  onNavigateToPage?: (page: 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq', postSlug?: string) => void;
  currentPage?: 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq';
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToGenerator,
  onNavigateToPlatform,
  onNavigateToPage,
  currentPage = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const platformLinks = [
    { slug: 'instagram-bio-generator', label: 'Instagram Bio', limit: '150 chars', icon: Instagram },
    { slug: 'linkedin-bio-generator', label: 'LinkedIn Headline', limit: '220 chars', icon: Linkedin },
    { slug: 'tiktok-bio-generator', label: 'TikTok Bio', limit: '80 chars', icon: Video },
    { slug: 'twitter-bio-generator', label: 'Twitter / X Bio', limit: '160 chars', icon: Twitter },
    { slug: 'youtube-bio-generator', label: 'YouTube About', limit: '1,000 chars', icon: Youtube },
    { slug: 'hinglish-bio-generator', label: 'Hinglish & Hindi', limit: 'Desi Slang', icon: Languages },
  ];

  const handlePlatformClick = (slug: string) => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    if (onNavigateToPlatform) {
      onNavigateToPlatform(slug);
    }
  };

  const handlePageClick = (page: 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq') => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage(page);
    }
  };

  return (
    <>
      {/* Optional Slim Announcement Bar */}
      {!announcementDismissed && (
        <aside
          aria-label="Product announcement"
          className="bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 text-white text-xs py-2 px-4 relative z-50 flex items-center justify-between border-b border-indigo-900/40"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center flex-1">
            <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full bg-white/15 text-[11px]">
              <Sparkles className="w-3 h-3 text-purple-200" />
              <span>v2.4 Live</span>
            </span>
            <span className="text-purple-100 hidden sm:inline">
              Powered by Google Gemini 3.8 Flash with 100% Grapheme-Verified Character Limits.
            </span>
            <span className="text-purple-100 sm:hidden">
              Gemini 3.8 Flash • Verified 100% Character Limits.
            </span>
            <button
              onClick={() => {
                handlePageClick('home');
                setTimeout(onScrollToGenerator, 100);
              }}
              className="text-white underline font-bold hover:text-purple-200 ml-1 cursor-pointer transition-colors"
            >
              Try it free →
            </button>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="text-purple-200 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Sticky Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick('home');
                }}
                className="flex items-center gap-2.5 text-slate-900 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-1"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    BioCraft<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800"> AI</span>
                  </span>
                  <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-md px-1.5 py-0.5">
                    Gemini 3.8
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick('home');
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentPage === 'home'
                    ? 'text-indigo-600 font-bold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Home
              </a>

              {/* Platform Tools Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPlatformsDropdownOpen(!platformsDropdownOpen)}
                  onBlur={() => setTimeout(() => setPlatformsDropdownOpen(false), 200)}
                  className="px-3 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700"
                  aria-expanded={platformsDropdownOpen}
                >
                  <span>Platform Tools</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      platformsDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {platformsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3.5 py-1 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Supported Networks</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    {platformLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.slug}
                          href={`/${item.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePlatformClick(item.slug);
                          }}
                          className="flex items-center justify-between px-3.5 py-2 hover:bg-purple-50/70 text-slate-700 hover:text-indigo-900 transition-colors text-xs font-medium rounded-xl mx-1"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-mono">
                            {item.limit}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick('about');
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentPage === 'about'
                    ? 'text-indigo-600 font-bold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                About Us
              </a>

              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick('blog');
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentPage === 'blog'
                    ? 'text-indigo-600 font-bold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Blog &amp; Playbooks
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick('contact');
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentPage === 'contact'
                    ? 'text-indigo-600 font-bold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Contact Us
              </a>

              <button
                onClick={() => scrollTo('faq')}
                className="px-3 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </nav>

            {/* Right Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => {
                  if (onNavigateToPage) onNavigateToPage('home');
                  setTimeout(onScrollToGenerator, 100);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer ring-2 ring-indigo-500/20"
              >
                <Zap className="w-4 h-4 fill-white/20" />
                <span>Generate Bio ✨</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu hamburger toggle */}
            <div className="flex sm:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-slate-200 py-4 space-y-3 bg-white">
              <div className="grid grid-cols-2 gap-2 px-2">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick('home');
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                    currentPage === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  Home
                </a>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick('about');
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                    currentPage === 'about' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  About Us
                </a>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick('blog');
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                    currentPage === 'blog' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick('contact');
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                    currentPage === 'contact' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  Contact Us
                </a>
              </div>

              <div className="px-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Targeted Bio Generators
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {platformLinks.map((item) => (
                    <a
                      key={item.slug}
                      href={`/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePlatformClick(item.slug);
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.limit}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="px-3 pt-2">
                <button
                  onClick={() => {
                    handlePageClick('home');
                    setTimeout(onScrollToGenerator, 100);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white/20" />
                  <span>Generate Free Bio Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
