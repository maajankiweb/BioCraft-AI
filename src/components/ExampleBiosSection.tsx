import React from 'react';
import { Sparkles, ArrowUpRight, Copy, Check, UserCheck } from 'lucide-react';
import { EXAMPLE_PROFILES } from '../data/examples.ts';
import { ExampleProfile, BioFormInput } from '../types/bio.ts';

interface ExampleBiosSectionProps {
  onSelectExample: (data: BioFormInput) => void;
}

export const ExampleBiosSection: React.FC<ExampleBiosSectionProps> = ({ onSelectExample }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopySample = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="examples" className="scroll-mt-24 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Curated Demonstration Samples</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Example Bios Across Niches
          </h2>
          <p className="mt-3 text-base text-slate-600">
            See how different roles, platforms, and tones shape the bio output.
            <span className="block mt-1 font-semibold text-purple-900 text-xs uppercase tracking-wide">
              (Note: The cards below are pre-crafted illustrative examples, not live AI generations.)
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXAMPLE_PROFILES.map((profile) => (
            <div
              key={profile.id}
              className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-7 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-md">
                      {profile.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {profile.role}
                    </h3>
                  </div>

                  <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg capitalize">
                    {profile.data.platform} • {profile.data.tone}
                  </span>
                </div>

                {/* Sample Bio Box */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-2 border-b border-slate-100 pb-1.5">
                    <span>Style: {profile.sampleStyle}</span>
                    <span>Sample Bio</span>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
                    {profile.sampleBio}
                  </p>
                </div>

                {/* Input Snapshot */}
                <div className="text-xs text-slate-500 space-y-1 mb-5">
                  <p>
                    <strong className="text-slate-700 font-medium">Input Profile:</strong> {profile.data.profession}
                  </p>
                  <p>
                    <strong className="text-slate-700 font-medium">Skills:</strong> {profile.data.skills}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopySample(profile.id, profile.sampleBio)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === profile.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Sample</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectExample(profile.data)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <span>Load Into Generator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
