import React from 'react';
import { ShieldCheck, Calendar, ExternalLink, Info, CheckCircle2, Sparkles } from 'lucide-react';
import { PLATFORM_CONFIGS } from '../utils/bioUtils.ts';

export const PlatformLimitsGuide: React.FC = () => {
  const platforms = Object.values(PLATFORM_CONFIGS);

  return (
    <section id="platform-limits" className="scroll-mt-24 py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Documented Limit Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Platform Character Limits & Verification
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Social network specifications change periodically. BioCraft AI references active documentation
            and enforces real constraints so your generated bios never get cut off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.key}
              className="group p-6 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-indigo-300 transition-all duration-200 shadow-xs hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-lg text-slate-900">{platform.name}</h3>
                  <span className="font-mono font-bold text-xs bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-lg shadow-2xs">
                    {platform.charLimit} chars
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium mb-3.5 leading-relaxed">
                  {platform.description}
                </p>

                <div className="p-3.5 bg-white group-hover:bg-slate-50/80 rounded-2xl border border-slate-200/70 text-xs text-slate-700 space-y-1.5 mb-4 transition-colors">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Best Practice Format</span>
                  </div>
                  <p className="text-slate-600 pl-5 leading-normal">{platform.formatGuide}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Verified: {platform.verifiedDate}
                </span>
                <span className="text-indigo-600 font-semibold">{platform.docSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
