import React from 'react';
import {
  Sparkles,
  ArrowDown,
  CheckCircle2,
  ShieldCheck,
  Languages,
  Gauge,
  ArrowRight,
} from 'lucide-react';
import { LandingPageConfig } from '../data/landingPages.ts';

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
}) => {
  const isProgrammatic = Boolean(landingConfig);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-purple-50/60 via-white to-slate-50">
      {/* Background Decorative Mesh & Glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(79, 70, 229) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        {/* Colorful ambient orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-tr from-purple-400/25 via-indigo-300/30 to-sky-200/25 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-32 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-medium mb-6 shadow-xs hover:border-purple-300 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-500 animate-pulse" />
          <span>{landingConfig ? landingConfig.heroBadge : 'Next-Gen Profile Copywriting with Gemini 3.8'}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="hidden sm:inline-block text-purple-700 font-semibold">
            {landingConfig ? landingConfig.characterLimitBadge : '7 Platforms Supported'}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          {isProgrammatic ? (
            <>
              {landingConfig?.heroTitlePrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800">
                {landingConfig?.heroTitleHighlight}
              </span>{' '}
              {landingConfig?.heroTitleSuffix}
            </>
          ) : (
            <>
              Create Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800">
                Perfect Bio
              </span>{' '}
              in Seconds
            </>
          )}
        </h1>

        {/* Subheading */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {landingConfig
            ? landingConfig.heroDescription
            : 'Generate personalized bios for Instagram, LinkedIn, YouTube, and more with the power of AI. Tailored tone, strict platform character limits, and zero fabricated claims.'}
        </p>

        {/* Action Buttons (In One Row) */}
        <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-2xl mx-auto px-2">
          <button
            onClick={onScrollToGenerator}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer ring-2 ring-indigo-500/20 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/95 shrink-0" />
            <span>Generate Free {landingConfig?.shortName || ''} Bio ✨</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 animate-bounce shrink-0" />
          </button>

          <button
            onClick={onScrollToExamples}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-base text-slate-700 bg-white hover:bg-slate-50/90 border border-slate-300/80 shadow-xs hover:shadow-sm hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Explore Sample Bios</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        {/* Key Trust Badges */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-emerald-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">Zero Fabrications</p>
              <p className="text-slate-500 mt-0.5">Only facts you provide</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-indigo-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Gauge className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">Character Limits</p>
              <p className="text-slate-500 mt-0.5">{landingConfig ? landingConfig.characterLimitBadge : 'Platform-verified counts'}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-purple-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Languages className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">3 Languages</p>
              <p className="text-slate-500 mt-0.5">English, Hindi & Hinglish</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-sky-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">Inline Editing</p>
              <p className="text-slate-500 mt-0.5">1-click copy & TXT export</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
