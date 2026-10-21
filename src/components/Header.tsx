import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, Zap, ChevronDown, Instagram, Linkedin, Video, Twitter, Youtube, Languages, BookOpen, Info, Mail } from 'lucide-react';
import { LANDING_PAGES } from '../data/landingPages.ts';

interface HeaderProps {
  onScrollToGenerator: () => void;
  onNavigateToPlatform?: (slug: string) => void;
  onNavigateToPage?: (page: 'home' | 'about' | 'contact' | 'blog', postSlug?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToGenerator,
  onNavigateToPlatform,
  onNavigateToPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    // If not on home page, first navigate home
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
    { slug: 'instagram-bio-generator', label: 'Instagram Bio Generator', limit: '150 chars', icon: Instagram },
    { slug: 'linkedin-bio-generator', label: 'LinkedIn Headline & Bio', limit: '220 chars', icon: Linkedin },
    { slug: 'tiktok-bio-generator', label: 'TikTok Bio Generator', limit: '80 chars', icon: Video },
    { slug: 'twitter-bio-generator', label: 'Twitter / X Bio Generator', limit: '160 chars', icon: Twitter },
    { slug: 'youtube-bio-generator', label: 'YouTube About Generator', limit: '1,000 chars', icon: Youtube },
    { slug: 'hinglish-bio-generator', label: 'Hinglish & Hindi Bios', limit: 'Desi Slang', icon: Languages },
  ];

  const handlePlatformClick = (slug: string) => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    if (onNavigateToPlatform) {
      onNavigateToPlatform(slug);
    }
  };

  const handlePageClick = (page: 'home' | 'about' | 'contact' | 'blog') => {
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage(page);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
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
              className="flex items-center gap-2.5 text-slate-900 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  BioCraft<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600"> AI</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded px-1.5 py-0.5">
                  Gemini 3.8
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
            {/* Platforms Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPlatformsDropdownOpen(!platformsDropdownOpen)}
                onBlur={() => setTimeout(() => setPlatformsDropdownOpen(false), 200)}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700"
                aria-expanded={platformsDropdownOpen}
              >
                <span>Platform Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${platformsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {platformsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Targeted Bio Generators
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
                        className="flex items-center justify-between px-3.5 py-2.5 hover:bg-purple-50/70 text-slate-700 hover:text-indigo-900 transition-colors text-xs font-medium rounded-lg mx-1"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-indigo-600" />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                          {item.limit}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('blog');
              }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Blog
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('about');
              }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              About
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('contact');
              }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Contact
            </a>

            <button
              onClick={() => scrollTo('faq')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                if (onNavigateToPage) onNavigateToPage('home');
                setTimeout(onScrollToGenerator, 100);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white/20" />
              <span>Generate Bio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 py-3 space-y-1 bg-white">
            <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform Tools
            </div>
            <div className="grid grid-cols-2 gap-1 px-2 pb-2">
              {platformLinks.map((item) => (
                <a
                  key={item.slug}
                  href={`/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlatformClick(item.slug);
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('blog');
              }}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Blog &amp; Playbooks
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('about');
              }}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              About BioCraft AI
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('contact');
              }}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Contact &amp; Support
            </a>
            <button
              onClick={() => scrollTo('faq')}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              FAQ
            </button>
            <div className="pt-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToPage) onNavigateToPage('home');
                  setTimeout(onScrollToGenerator, 100);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-purple-600 to-indigo-600 shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>Generate My Bio ✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
