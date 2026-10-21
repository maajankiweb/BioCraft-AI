import React from 'react';
import { Sparkles, ArrowDown, CheckCircle2, ShieldCheck, Languages, Gauge, Instagram, Linkedin, Video, Twitter, Youtube, Globe } from 'lucide-react';
import { LandingPageConfig, LANDING_PAGES } from '../data/landingPages.ts';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
  onScrollToExamples: () => void;
  landingConfig?: LandingPageConfig;
  activeSlug?: string;
  onNavigateToPlatform?: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToGenerator,
  onScrollToExamples,
  landingConfig,
  activeSlug,
  onNavigateToPlatform,
}) => {
  const isProgrammatic = Boolean(landingConfig);

  const platformTabs = [
    { slug: '', label: 'All Platforms', icon: Globe },
    { slug: 'instagram-bio-generator', label: 'Instagram', icon: Instagram },
    { slug: 'linkedin-bio-generator', label: 'LinkedIn', icon: Linkedin },
    { slug: 'tiktok-bio-generator', label: 'TikTok', icon: Video },
    { slug: 'twitter-bio-generator', label: 'Twitter / X', icon: Twitter },
    { slug: 'youtube-bio-generator', label: 'YouTube', icon: Youtube },
    { slug: 'hinglish-bio-generator', label: 'Hinglish & Hindi', icon: Languages },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-22 bg-linear-to-b from-purple-50/50 via-white to-slate-50">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10 bg-linear-to-tr from-purple-300 via-indigo-200 to-sky-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Platform Switcher Chips Bar (SEO & Internal Linking Navigation) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto py-1 px-2 no-scrollbar">
          {platformTabs.map((tab) => {
            const isActive = (tab.slug === '' && !activeSlug) || activeSlug === tab.slug;
            const Icon = tab.icon;
            return (
              <a
                key={tab.slug || 'all'}
                href={tab.slug ? `/${tab.slug}` : '/'}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateToPlatform) onNavigateToPlatform(tab.slug);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-500" />
          <span>{landingConfig ? landingConfig.heroBadge : 'Next-Gen Profile Copywriting with Gemini 3.8'}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="hidden sm:inline-block text-purple-700">
            {landingConfig ? landingConfig.characterLimitBadge : '7 Platforms Supported'}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          {isProgrammatic ? (
            <>
              {landingConfig?.heroTitlePrefix}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-indigo-800">
                {landingConfig?.heroTitleHighlight}
              </span>{' '}
              {landingConfig?.heroTitleSuffix}
            </>
          ) : (
            <>
              Create Your{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-indigo-800">
                Perfect Bio
              </span>{' '}
              in Seconds
            </>
          )}
        </h1>

        {/* Subheading */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {landingConfig
            ? landingConfig.heroDescription
            : 'Generate personalized bios for Instagram, LinkedIn, YouTube, and more with the power of AI. Tailored tone, strict platform character limits, and zero fabricated claims.'}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={onScrollToGenerator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white/90" />
            <span>Generate Free {landingConfig?.shortName || ''} Bio ✨</span>
            <ArrowDown className="w-4 h-4 ml-0.5" />
          </button>

          <button
            onClick={onScrollToExamples}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
          >
            Explore Sample Bios
          </button>
        </div>

        {/* Key trust badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 border border-slate-100 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-slate-900">Zero Fabrications</p>
              <p className="text-slate-500">Only facts you provide</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 border border-slate-100 shadow-xs">
            <Gauge className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-slate-900">Character Limits</p>
              <p className="text-slate-500">{landingConfig ? landingConfig.characterLimitBadge : 'Platform-verified counts'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 border border-slate-100 shadow-xs">
            <Languages className="w-5 h-5 text-purple-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-slate-900">3 Languages</p>
              <p className="text-slate-500">English, Hindi & Hinglish</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 border border-slate-100 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-slate-900">Inline Editing</p>
              <p className="text-slate-500">1-click copy & TXT export</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
