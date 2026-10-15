import React from 'react';
import { PenLine, Sliders, Copy, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onScrollToGenerator: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onScrollToGenerator }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter your details',
      desc: 'Provide your profession, key skills, and brief background. No fake credentials or exaggerated claims are ever generated.',
      icon: PenLine,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      step: '02',
      title: 'Choose platform & style',
      desc: 'Select from 7 platforms (Instagram, LinkedIn, YouTube, etc.), your desired tone, language (English, Hindi, Hinglish), and emoji level.',
      icon: Sliders,
      color: 'from-indigo-500 to-sky-500',
    },
    {
      step: '03',
      title: 'Generate, edit & copy',
      desc: 'Get 3, 5, or 10 tailored bio variations in seconds. Use the inline editor to tweak wording, check live character counts, and copy with 1-click.',
      icon: Copy,
      color: 'from-purple-600 to-pink-500',
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How BioCraft AI Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From empty profile to high-converting bio in under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onScrollToGenerator}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Try It Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
