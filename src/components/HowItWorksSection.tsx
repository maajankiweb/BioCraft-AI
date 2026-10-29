import React from 'react';
import { PenLine, Sliders, Copy, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onScrollToGenerator: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onScrollToGenerator }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter your profile details',
      desc: 'Provide your profession, key skills, and brief background. No fake credentials or exaggerated claims are ever generated.',
      icon: PenLine,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Factual Accuracy',
    },
    {
      step: '02',
      title: 'Choose platform & voice',
      desc: 'Select from 7 destinations (Instagram, LinkedIn, YouTube, etc.), your preferred tone, language, and emoji density.',
      icon: Sliders,
      color: 'from-indigo-600 to-sky-500',
      badge: 'Strict Limits',
    },
    {
      step: '03',
      title: 'Generate, edit & copy',
      desc: 'Get tailored bio variations in seconds. Use the inline editor to tweak wording, check live character counts, and copy with 1 click.',
      icon: Copy,
      color: 'from-purple-600 to-pink-500',
      badge: '1-Click Ready',
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intuitive 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How BioCraft AI Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From empty profile to high-converting bio in under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-mono group-hover:text-indigo-200 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                    {s.badge}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-2.5 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Step {idx + 1} of 3</span>
                  <span className="text-indigo-600 font-bold">Fast & Free</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onScrollToGenerator}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-[0.98] transition-all cursor-pointer ring-2 ring-indigo-500/20"
          >
            <span>Generate Your Bio Now ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
