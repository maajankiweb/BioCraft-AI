import React from 'react';
import { Check, X, ShieldAlert, Sparkles, BookOpen, Layers, ArrowUpRight } from 'lucide-react';

interface SeoContentSectionProps {
  onScrollToGenerator: () => void;
  onNavigateToPost?: (slug: string) => void;
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({
  onScrollToGenerator,
  onNavigateToPost,
}) => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Profile Optimization Science</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Your Social Media Bio Drives More Conversions Than Your Posts
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Every viral video, retweet, or LinkedIn comment directs visitors back to your profile.
            Your bio is the single make-or-break filter deciding whether they follow, click your link, or bounce.
          </p>
        </div>

        {/* 3 Core Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="text-indigo-600 font-extrabold text-2xl mb-2">01.</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              The 150-Character Instagram Ceiling
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instagram strictly cuts off text at 150 characters. An aesthetic Instagram bio generator must account for multi-byte emojis and spacing so your call to action stays visible without truncation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="text-purple-600 font-extrabold text-2xl mb-2">02.</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              LinkedIn Recruiter Search Algorithms
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your 220-character LinkedIn headline directly impacts your search ranking when hiring managers search for skills. BioCraft AI infuses targeted industry keywords with zero corporate fluff.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="text-pink-600 font-extrabold text-2xl mb-2">03.</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Viral TikTok FYP Conversions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With only 80 characters available on TikTok, long sentences fail. Our AI bio writer crafts punchy, high-energy hooks that turn fleeting FYP views into profile link clicks.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 mb-16 overflow-x-auto">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 text-center">
            How BioCraft AI Compares to Generic AI Tools
          </h3>
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-125">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 text-indigo-700 bg-indigo-50/70 rounded-t-lg">BioCraft AI</th>
                <th className="py-3 px-4">ChatGPT / Generic AI</th>
                <th className="py-3 px-4">Manual Writing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 text-slate-700 font-medium">
              <tr>
                <td className="py-3.5 px-4 font-semibold">Strict Platform Character Limits</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-indigo-50/70 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Verified Graphemes</span>
                </td>
                <td className="py-3.5 px-4 text-rose-600 flex items-center gap-1.5">
                  <X className="w-4 h-4" />
                  <span>Frequently Exceeds</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Requires manual counting</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Native Hindi &amp; Hinglish</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-indigo-50/70 font-bold">
                  ✅ 100% Native Dialects
                </td>
                <td className="py-3.5 px-4 text-slate-500">Stilted literal translation</td>
                <td className="py-3.5 px-4 text-slate-500">Time-consuming</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Anti-Fabrication Guardrails</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-indigo-50/70 font-bold">
                  ✅ Zero False Claims
                </td>
                <td className="py-3.5 px-4 text-rose-600">Invents fake stats</td>
                <td className="py-3.5 px-4 text-emerald-600">Accurate but slow</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Cost &amp; Sign-Up Friction</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-indigo-50/70 font-bold">
                  ✅ Free, No Sign-up
                </td>
                <td className="py-3.5 px-4 text-slate-500">Requires login / Paid tier</td>
                <td className="py-3.5 px-4 text-slate-500">Free, high effort</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Helpful Copywriting Playbook Callout */}
        <div className="bg-linear-to-r from-purple-50 via-indigo-50 to-sky-50 rounded-3xl border border-indigo-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Recommended Reading</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              Want to master social profile copywriting?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Read our in-depth guides on Instagram bio formatting, LinkedIn headline algorithms, and viral TikTok hook strategies.
            </p>
          </div>
          <button
            onClick={() => onNavigateToPost ? onNavigateToPost('instagram-bio-limits-guide-2026') : null}
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Bio Playbooks</span>
            <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
