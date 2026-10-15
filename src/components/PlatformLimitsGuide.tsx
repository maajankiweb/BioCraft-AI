import React from 'react';
import { ShieldCheck, Calendar, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { PLATFORM_CONFIGS } from '../utils/bioUtils.ts';
import { PlatformKey } from '../types/bio.ts';

export const PlatformLimitsGuide: React.FC = () => {
  const platforms = Object.values(PLATFORM_CONFIGS);

  return (
    <section id="platform-limits" className="scroll-mt-24 py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Documented Limit Specifications</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Platform Character Limits & Verification
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Social network specifications change periodically. BioCraft AI references active documentation
            and enforces real constraints so your generated bios never get cut off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.key}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-indigo-300 transition-colors shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-slate-900">{platform.name}</h3>
                  <span className="font-mono font-bold text-sm bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-indigo-600 shadow-xs">
                    {platform.charLimit} chars
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium mb-3">
                  {platform.description}
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1 mb-4">
                  <div className="flex items-start gap-1.5 font-medium text-slate-800">
                    <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Best Practice Format:</span>
                  </div>
                  <p className="text-slate-600 pl-5">{platform.formatGuide}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[170px]" title={platform.docSource}>
                  Source: {platform.docSource}
                </span>
                <span className="flex items-center gap-1 shrink-0 font-medium text-slate-600">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {platform.verifiedDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on platform policy changes */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Limits Policy Transparency</p>
            <p className="mt-0.5 text-amber-800">
              Platform character limits are periodically updated by social networks. All character counts in BioCraft AI are verified against official help documentation as of late 2024. If a platform modifies its bio character quota, you can always use the inline editor to trim or expand your copy accordingly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
