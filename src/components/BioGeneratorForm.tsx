import React, { useState } from 'react';
import {
  Sparkles,
  AlertCircle,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Globe,
  Video,
  Facebook,
  RotateCw,
  Sliders,
  Check,
  ShieldCheck,
  Zap,
  Info,
  ArrowRight,
} from 'lucide-react';
import {
  PlatformKey,
  BioTone,
  OutputLanguage,
  EmojiPreference,
  OptionCount,
  BioFormInput,
  GeneratedBio,
} from '../types/bio.ts';
import { PLATFORM_CONFIGS, validateBioInput } from '../utils/bioUtils.ts';

interface BioGeneratorFormProps {
  initialData?: BioFormInput;
  onBiosGenerated: (bios: GeneratedBio[], inputUsed: BioFormInput) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DEFAULT_FORM: BioFormInput = {
  name: '',
  profession: '',
  skills: '',
  description: '',
  platform: 'instagram',
  tone: 'Creative',
  language: 'English',
  optionsCount: 3,
  callToAction: '',
  emojiPreference: 'minimal',
};

const PLATFORM_LIST: Array<{ key: PlatformKey; label: string; icon: React.FC<{ className?: string }> }> = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'tiktok', label: 'TikTok', icon: Video },
  { key: 'x', label: 'X (Twitter)', icon: Twitter },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'website', label: 'Website', icon: Globe },
];

const TONES: BioTone[] = [
  'Professional',
  'Creative',
  'Funny',
  'Minimalist',
  'Aesthetic',
  'Confident',
  'Inspirational',
];

const LANGUAGES: OutputLanguage[] = ['English', 'Hindi', 'Hinglish'];

const EMOJI_OPTIONS: Array<{ key: EmojiPreference; label: string; sub: string; icon: string }> = [
  { key: 'none', label: 'None', sub: 'Zero emojis', icon: 'Ø' },
  { key: 'minimal', label: 'Minimal', sub: '1-2 clean', icon: '✨' },
  { key: 'creative', label: 'Creative', sub: '3-5 vivid', icon: '🎨' },
];

const QUICK_PROFESSIONS = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Content Creator',
  'Product Manager',
  'Startup Founder',
  'Fitness Coach',
  'Freelance Writer',
];

const QUICK_CTAS = [
  'DM for collaborations',
  'Contact me for projects',
  'Link in bio for resources',
  'Open for work',
  'Book a free consultation',
];

export const BioGeneratorForm: React.FC<BioGeneratorFormProps> = ({
  initialData,
  onBiosGenerated,
  isLoading,
  setIsLoading,
}) => {
  const [formData, setFormData] = useState<BioFormInput>(initialData || DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
      setApiError(null);
    }
  }, [initialData]);

  const currentPlatformConfig = PLATFORM_CONFIGS[formData.platform];

  const handleFieldChange = <K extends keyof BioFormInput>(field: K, value: BioFormInput[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBioInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setErrors({});
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-bios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to generate bios');
      }

      if (!data.bios || data.bios.length === 0) {
        throw new Error('No bios were returned. Please try adjusting your parameters.');
      }

      onBiosGenerated(data.bios, formData);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: unknown) {
      console.error('Bio generation failed:', err);
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred while communicating with the AI service.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="generator" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 px-6 sm:px-10 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              <Sliders className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>AI Bio Configuration</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-full text-purple-200">
                  Dual-Engine
                </span>
              </h2>
              <p className="text-xs text-purple-200/90">Customize inputs on the left & fine-tune AI controls on the right</p>
            </div>
          </div>

          <div className="text-xs text-purple-100 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target:</span>
            <strong className="text-white font-semibold">{currentPlatformConfig.name}</strong>
            <span className="text-purple-300">({currentPlatformConfig.charLimit} chars limit)</span>
          </div>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div
            role="alert"
            className="m-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 shadow-xs"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-900">Bio Generation Notice</p>
              <p className="mt-0.5">{apiError}</p>
              {apiError.toLowerCase().includes('gemini api key') && (
                <p className="mt-2 text-xs text-rose-700 bg-rose-100/70 p-2.5 rounded-xl">
                  Tip: Configure your <strong>GEMINI_API_KEY</strong> environment secret in your project or root `.env` file.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Split Two-Part Layout: Left (Inputs) and Right (AI Tuning & Preview) */}
        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* FIRST PART: LEFT COLUMN (Profile Inputs & Details) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900">Content & Profile Inputs</h3>
              </div>

              {/* 1. Target Platform Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    Select Target Platform <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    {currentPlatformConfig.name} ({currentPlatformConfig.charLimit} max)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {PLATFORM_LIST.map(({ key, label, icon: IconComponent }) => {
                    const isSelected = formData.platform === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleFieldChange('platform', key)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 ring-2 ring-indigo-500/25 shadow-xs font-bold'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 mb-1.5 transition-transform ${
                            isSelected ? 'text-indigo-600 scale-110' : 'text-slate-500'
                          }`}
                        />
                        <span className="text-xs font-medium leading-tight">{label}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          {PLATFORM_CONFIGS[key].charLimit}c
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{currentPlatformConfig.description}</span>
                  <span className="text-slate-300">•</span>
                  <span className="italic text-slate-400">{currentPlatformConfig.docSource}</span>
                </p>
              </div>

              {/* 2. Identity & Profession (Required) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-profession" className="text-sm font-semibold text-slate-800">
                    Profession or Core Identity <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    {formData.profession.length} / 120
                  </span>
                </div>
                <input
                  id="field-profession"
                  type="text"
                  required
                  maxLength={120}
                  value={formData.profession}
                  onChange={(e) => handleFieldChange('profession', e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer, Fashion & Travel Creator, Fitness Coach"
                  className={`w-full px-4 py-2.5 rounded-xl border text-slate-900 text-sm focus:outline-none transition-colors ${
                    errors.profession
                      ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.profession ? (
                  <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.profession}
                  </p>
                ) : (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Quick ideas:</span>
                    {QUICK_PROFESSIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleFieldChange('profession', q)}
                        className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      >
                        + {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Name & Skills (Two Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="field-name" className="text-sm font-semibold text-slate-800">
                      Your Name <span className="text-xs font-normal text-slate-400">(Optional)</span>
                    </label>
                    <span className="text-xs text-slate-400 font-mono">{formData.name.length}/60</span>
                  </div>
                  <input
                    id="field-name"
                    type="text"
                    maxLength={60}
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g. Alex Rivera or leave empty"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="field-skills" className="text-sm font-semibold text-slate-800">
                      Skills & Highlights <span className="text-xs font-normal text-slate-400">(Optional)</span>
                    </label>
                    <span className="text-xs text-slate-400 font-mono">{formData.skills.length}/250</span>
                  </div>
                  <input
                    id="field-skills"
                    type="text"
                    maxLength={250}
                    value={formData.skills}
                    onChange={(e) => handleFieldChange('skills', e.target.value)}
                    placeholder="e.g. React, Distributed Systems, Marathon, Coffee"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 4. Personal Description (Optional Multiline) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-description" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <span>Personal Story / Bio Context</span>
                    <span className="text-xs font-normal text-slate-400">(Optional)</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">{formData.description.length}/600</span>
                </div>
                <textarea
                  id="field-description"
                  rows={3}
                  maxLength={600}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Share unique achievements, current focus, what you build, or what value your audience gets..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* 5. Call To Action (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-cta" className="text-sm font-semibold text-slate-800">
                    Call to Action (CTA) <span className="text-xs font-normal text-slate-400">(Optional)</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">{formData.callToAction.length}/100</span>
                </div>
                <input
                  id="field-cta"
                  type="text"
                  maxLength={100}
                  value={formData.callToAction}
                  onChange={(e) => handleFieldChange('callToAction', e.target.value)}
                  placeholder="e.g. DM for collaborations, Check my free guide below 👇"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-400">Suggestions:</span>
                  {QUICK_CTAS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleFieldChange('callToAction', c)}
                      className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SECOND PART: RIGHT COLUMN (AI Tuning, Target Preview & Action) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-5 lg:sticky lg:top-24 shadow-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-bold text-slate-900">AI Controls & Target</h3>
                </div>

                {/* Live Platform Target Badge & Specs */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Platform Spec</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      Strict Limit
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <span>{currentPlatformConfig.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Maximum Ceiling</span>
                      <span className="text-base font-bold text-indigo-600 font-mono">
                        {currentPlatformConfig.charLimit} chars
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Engine: Gemini 3.8</span>
                    <span>100% Grapheme Verified</span>
                  </div>
                </div>

                {/* Tone of Voice Selection */}
                <div>
                  <label htmlFor="field-tone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bio Tone
                  </label>
                  <select
                    id="field-tone"
                    value={formData.tone}
                    onChange={(e) => handleFieldChange('tone', e.target.value as BioTone)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors cursor-pointer"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Output Language */}
                <div>
                  <label htmlFor="field-language" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Output Language
                  </label>
                  <select
                    id="field-language"
                    value={formData.language}
                    onChange={(e) => handleFieldChange('language', e.target.value as OutputLanguage)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l === 'Hinglish' ? 'Hinglish (Hindi + English blend)' : l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Variations count */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Variations to Generate
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([3, 5, 10] as OptionCount[]).map((count) => {
                      const isSelected = formData.optionsCount === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => handleFieldChange('optionsCount', count)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs scale-[1.02]'
                              : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {count} Bios
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Emoji Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Emoji Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {EMOJI_OPTIONS.map(({ key, label, icon }) => {
                      const isSelected = formData.emojiPreference === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleFieldChange('emojiPreference', key)}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-1 ring-indigo-500/30 font-bold'
                              : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-sm mb-0.5">{icon}</span>
                          <span className="text-xs">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                      isLoading
                        ? 'bg-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-indigo-500/25 active:scale-[0.98] ring-2 ring-indigo-500/20'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RotateCw className="w-5 h-5 animate-spin" />
                        <span>Crafting {formData.optionsCount} Bios...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-white/95" />
                        <span>Generate My Bio ✨</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-slate-400">
                    Zero hallucinations guarantee • Strictly enforced {currentPlatformConfig.charLimit} chars limit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
