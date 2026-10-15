import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, Zap } from 'lucide-react';

interface HeaderProps {
  onScrollToGenerator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToGenerator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 text-slate-900 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  BioCraft<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> AI</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded px-1.5 py-0.5">
                  Gemini 3.8
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollTo('how-it-works')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('examples')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Examples
            </button>
            <button
              onClick={() => scrollTo('platform-limits')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Platform Limits
            </button>
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
              onClick={onScrollToGenerator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
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
            <button
              onClick={() => scrollTo('how-it-works')}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('examples')}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Example Bios
            </button>
            <button
              onClick={() => scrollTo('platform-limits')}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Platform Limits Guide
            </button>
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
                  onScrollToGenerator();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
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
