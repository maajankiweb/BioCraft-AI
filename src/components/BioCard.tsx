import React, { useState } from 'react';
import {
  Copy,
  Check,
  Edit3,
  Download,
  RotateCw,
  Save,
  X,
  AlertTriangle,
  Sparkles,
  FileText,
} from 'lucide-react';
import { GeneratedBio, PlatformKey } from '../types/bio.ts';
import { countGraphemes, getCharacterStatus, getPlatformLimit } from '../utils/bioUtils.ts';

interface BioCardProps {
  bio: GeneratedBio;
  index: number;
  onUpdateBio: (id: string, newText: string) => void;
  onRegenerateSingle?: (id: string) => void;
  isRegenerating?: boolean;
}

export const BioCard: React.FC<BioCardProps> = ({
  bio,
  index,
  onUpdateBio,
  onRegenerateSingle,
  isRegenerating = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(bio.bio);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const platformConfig = getPlatformLimit(bio.platform);
  const currentCount = isEditing ? countGraphemes(draftText) : bio.characterCount;
  const { status, percent, remaining } = getCharacterStatus(currentCount, platformConfig.charLimit);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bio.bio);
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for clipboard if permission issue
      try {
        const textarea = document.createElement('textarea');
        textarea.value = bio.bio;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        setCopyError('Could not copy to clipboard. Please copy manually.');
        setTimeout(() => setCopyError(null), 3500);
      }
    }
  };

  const handleSaveEdit = () => {
    onUpdateBio(bio.id, draftText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraftText(bio.bio);
    setIsEditing(false);
  };

  const handleDownloadTxt = () => {
    try {
      const content = `BioCraft AI — ${platformConfig.name} Bio\nStyle: ${bio.style}\nCharacter Count: ${bio.characterCount} / ${platformConfig.charLimit}\nDate: ${new Date().toLocaleDateString()}\n\n${bio.bio}\n\nGenerated with BioCraft AI`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `biocraft-${bio.platform}-option-${index + 1}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2200);
    } catch {
      alert('Unable to initiate download.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-900 bg-purple-100/70 border border-purple-200/60 px-2.5 py-0.5 rounded-md">
            {bio.style}
          </span>
        </div>

        {/* Live Limit Gauge */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span
              className={`text-xs font-mono font-bold ${
                status === 'danger'
                  ? 'text-rose-600'
                  : status === 'warning'
                  ? 'text-amber-600'
                  : 'text-slate-600'
              }`}
            >
              {currentCount} / {platformConfig.charLimit}
            </span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">chars</span>
          </div>
          <div className="w-12 h-2 rounded-full bg-slate-200 overflow-hidden shrink-0">
            <div
              className={`h-full transition-all duration-300 ${
                status === 'danger'
                  ? 'bg-rose-500'
                  : status === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {isEditing ? (
          <div className="space-y-3 flex-1 flex flex-col">
            <label className="text-xs font-medium text-slate-600 flex items-center justify-between">
              <span>Edit Bio Content:</span>
              <span className="text-[11px] text-slate-400">
                {remaining >= 0 ? `${remaining} chars remaining` : `${Math.abs(remaining)} chars over limit!`}
              </span>
            </label>
            <textarea
              aria-label="Edit bio text"
              rows={4}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="w-full p-3 rounded-xl border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 text-sm leading-relaxed resize-y focus:outline-none"
            />
            {status === 'danger' && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                This text exceeds the {platformConfig.name} limit of {platformConfig.charLimit} characters.
              </p>
            )}
            <div className="flex items-center gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal selection:bg-purple-100 selection:text-purple-900">
              {bio.bio}
            </p>

            {copyError && (
              <p className="mt-2 text-xs text-rose-600 bg-rose-50 p-1.5 rounded">
                {copyError}
              </p>
            )}

            {downloadSuccess && (
              <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 p-1.5 rounded flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Bio downloaded as text file!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-3 sm:px-5 sm:py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Edit bio option ${index + 1}`}
            onClick={() => {
              if (isEditing) {
                handleCancelEdit();
              } else {
                setDraftText(bio.bio);
                setIsEditing(true);
              }
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Edit bio text inline"
          >
            <Edit3 className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Edit</span>
          </button>

          <button
            type="button"
            aria-label={`Download bio option ${index + 1} as text`}
            onClick={handleDownloadTxt}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download single bio as .txt"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>

        {/* Primary Copy Action */}
        <button
          type="button"
          aria-label={`Copy bio option ${index + 1}`}
          onClick={handleCopy}
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white'
          }`}
          title="Copy bio to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Bio</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
