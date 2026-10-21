import React from 'react';
import { Sparkles, ShieldCheck, Gauge, Languages, Code2, Users, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToHome, onScrollToGenerator }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button
            onClick={onNavigateToHome}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900">About BioCraft AI</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs sm:text-sm font-medium mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-500" />
            <span>Our Mission & Technology</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ending the Era of{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-indigo-800">
              Cut-Off &amp; Fake
            </span>{' '}
            Social Bios
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            We built BioCraft AI because generic AI tools kept generating bios that exceeded platform limits, hallucinated fake credentials, and offered zero support for bilingual creators.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Why BioCraft AI Exists
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Your bio is your digital handshake. Whether you are an open-source engineer seeking advisory roles, a fitness coach signing clients from Instagram, or a creator growing on TikTok, you have only a fraction of a second to make an impression.
            </p>
            <p>
              When we tested existing AI bio generators, we noticed two glaring problems:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900">
                <p className="font-bold text-sm mb-1">❌ Character Limit Hallucinations</p>
                <p className="text-xs text-rose-700 leading-normal">
                  Standard AI generates 180-character text for an Instagram limit of 150, resulting in truncated ellipses or upload errors.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-900">
                <p className="font-bold text-sm mb-1">❌ Fabricated Claims</p>
                <p className="text-xs text-amber-700 leading-normal">
                  Tools invent stats like "Forbes 30 Under 30" or "$10M Founder" without your consent, ruining your authentic personal credibility.
                </p>
              </div>
            </div>
            <p>
              BioCraft AI was engineered to solve this fundamentally. By pairing **Google Gemini 3.8 Flash** with client-side grapheme cluster counting and strict anti-fabrication prompt rules, we deliver clean, verified bios that fit on your very first try.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Our 4 Foundational Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">1. Strict Grapheme Verification</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Multi-byte emojis, non-Latin scripts, and accented letters are verified with international grapheme boundary standards. Your 150-char Instagram bio is guaranteed to paste cleanly.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">2. Native Hindi & Hinglish</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We celebrate linguistic diversity. BioCraft AI supports English, pure Devanagari Hindi, and conversational Hinglish written in Latin script—tailored for 600M+ desi digital creators.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">3. Zero Data Persistence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe in total privacy. We do not store, database, or sell your submitted names, skills, or generated bios. Everything is processed ephemerally in memory and discarded.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">4. 100% Free & Open Utility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No credit card walls, no monthly subscription surprises, and no mandatory login barriers. Create and copy what you need in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-16 shadow-lg">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Engineering</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
              Modern, High-Speed Architecture
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              BioCraft AI is built on a modern stack comprising React 19, TypeScript, Tailwind CSS v4, Vite, and Google's flagship Gemini 3.8 Flash model. Average bio generation requests complete in under 800ms.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">Google Gemini 3.8 Flash</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">React 19 & TypeScript</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">Tailwind CSS v4</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">Vercel Serverless</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">Zero-State Ephemeral API</span>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Ready to Upgrade Your Social Bio?
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mb-8">
            Try BioCraft AI today for Instagram, LinkedIn, TikTok, X, or YouTube. It’s free and takes under 30 seconds.
          </p>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(onScrollToGenerator, 100);
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-white/90" />
            <span>Generate Free Bio Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
