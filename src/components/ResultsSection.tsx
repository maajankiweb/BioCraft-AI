import React, { useState } from 'react';
import { Download, Sparkles, SlidersHorizontal, Check, CheckCircle2 } from 'lucide-react';
import { GeneratedBio, BioFormInput } from '../types/bio.ts';
import { BioCard } from './BioCard.tsx';
import { formatDownloadText, getPlatformLimit } from '../utils/bioUtils.ts';

interface ResultsSectionProps {
  bios: GeneratedBio[];
  lastInputUsed: BioFormInput | null;
  onUpdateBio: (id: string, newText: string) => void;
  onScrollToForm: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  bios,
  lastInputUsed,
  onUpdateBio,
  onScrollToForm,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (bios.length === 0) return null;

  const platformKey = bios[0]?.platform || 'instagram';
  const platformConfig = getPlatformLimit(platformKey);

  const handleDownloadAll = () => {
    try {
      const fullText = formatDownloadText(bios, lastInputUsed || undefined);
      const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `biocraft-${platformKey}-all-${bios.length}-options.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch {
      alert('Failed to initiate bulk download.');
    }
  };

  const handleCopyAll = async () => {
    try {
      const allText = bios.map((b, i) => `[Option ${i + 1} - ${b.style}]\n${b.bio}`).join('\n\n---\n\n');
      await navigator.clipboard.writeText(allText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="results-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Results Header Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 mb-2 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Generation Complete</span>
              <span>•</span>
              <span>{bios.length} Options Ready</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your Tailored {platformConfig.name} Bios
            </h2>
            <p className="mt-1 text-sm text-purple-200 max-w-xl">
              Strictly formatted for {platformConfig.name} ({platformConfig.charLimit} max characters).
              You can edit any bio inline, copy with 1-click, or export as a text file.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer flex items-center gap-2"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
              <span>{copiedAll ? 'All Copied!' : 'Copy All Bios'}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-purple-50 shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download All (.txt)'}</span>
            </button>

            <button
              onClick={onScrollToForm}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-transparent hover:bg-white/5 text-purple-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Adjust Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bios.map((bio, index) => (
          <BioCard
            key={bio.id}
            bio={bio}
            index={index}
            onUpdateBio={onUpdateBio}
          />
        ))}
      </div>
    </section>
  );
};
