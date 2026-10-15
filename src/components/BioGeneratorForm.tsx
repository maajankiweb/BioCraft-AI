import React, { useState } from 'react';
import {
  Sparkles,
  AlertCircle,
  HelpCircle,
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
  Smile,
  Hash,
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

const EMOJI_OPTIONS: Array<{ key: EmojiPreference; label: string; sub: string }> = [
  { key: 'none', label: 'None', sub: 'Zero emojis' },
  { key: 'minimal', label: 'Minimal', sub: '1-2 clean emojis' },
  { key: 'creative', label: 'Creative', sub: '3-5 expressive emojis' },
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

  // Sync if initialData changed externally (e.g., from example template button)
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
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while communicating with the AI service.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="generator"
      className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-purple-200" />
            <h2 className="text-lg font-bold tracking-tight">AI Bio Configuration</h2>
          </div>
          <div className="text-xs text-purple-100 flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full w-fit">
            <span>Platform Target:</span>
            <strong className="text-white font-semibold">{currentPlatformConfig.name}</strong>
            <span>({currentPlatformConfig.charLimit} max chars)</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7" noValidate>
          {/* API Error Banner */}
          {apiError && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-900">Bio Generation Notice</p>
                <p className="mt-0.5">{apiError}</p>
                {apiError.toLowerCase().includes('gemini api key') && (
                  <p className="mt-2 text-xs text-red-700 bg-red-100/70 p-2 rounded">
                    Tip: Set your <strong>GEMINI_API_KEY</strong> environment secret in the AI Studio Secrets panel.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 1. Target Platform Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              1. Target Platform <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {PLATFORM_LIST.map(({ key, label, icon: IconComponent }) => {
                const isSelected = formData.platform === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleFieldChange('platform', key)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 ring-2 ring-indigo-500/30 shadow-xs'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}
                    />
                    <span className="text-xs font-semibold leading-tight">{label}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {PLATFORM_CONFIGS[key].charLimit}c
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <span>{currentPlatformConfig.description}</span>
              <span className="text-slate-400">•</span>
              <span className="italic">{currentPlatformConfig.docSource} ({currentPlatformConfig.verifiedDate})</span>
            </p>
          </div>

          {/* 2. Identity & Profession (Required) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-profession" className="text-sm font-semibold text-slate-800">
                2. Profession or Identity <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400">
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
              <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.profession}
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Quick ideas:</span>
                {QUICK_PROFESSIONS.slice(0, 5).map((q) => (
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

          {/* 3. Name (Optional) & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-name" className="text-sm font-semibold text-slate-800">
                  Name <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <span className="text-xs text-slate-400">{formData.name.length}/60</span>
              </div>
              <input
                id="field-name"
                type="text"
                maxLength={60}
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="e.g. Alex Rivera or leave blank"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-skills" className="text-sm font-semibold text-slate-800">
                  Skills & Interests <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <span className="text-xs text-slate-400">{formData.skills.length}/250</span>
              </div>
              <input
                id="field-skills"
                type="text"
                maxLength={250}
                value={formData.skills}
                onChange={(e) => handleFieldChange('skills', e.target.value)}
                placeholder="e.g. React, Distributed Systems, Marathon Runner, Coffee"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* 4. Personal Description (Optional Multiline) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-description" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span>Personal Description or Background</span>
                <span className="text-xs font-normal text-slate-400">(Optional)</span>
              </label>
              <span className="text-xs text-slate-400">{formData.description.length}/600</span>
            </div>
            <textarea
              id="field-description"
              rows={3}
              maxLength={600}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Tell us what makes you unique, key milestones, what you are building, or what your audience gets from your profile..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* 5. Tone & Language & Options Count Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            {/* Tone */}
            <div>
              <label htmlFor="field-tone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Bio Tone
              </label>
              <select
                id="field-tone"
                value={formData.tone}
                onChange={(e) => handleFieldChange('tone', e.target.value as BioTone)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="field-language" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Output Language
              </label>
              <select
                id="field-language"
                value={formData.language}
                onChange={(e) => handleFieldChange('language', e.target.value as OutputLanguage)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l === 'Hinglish' ? 'Hinglish (Hindi + English blend)' : l}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Bio Options */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Options to Generate
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {([3, 5, 10] as OptionCount[]).map((count) => {
                  const isSelected = formData.optionsCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleFieldChange('optionsCount', count)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {count} Bios
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 6. Emoji Preference */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Emoji Style
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {EMOJI_OPTIONS.map(({ key, label, sub }) => {
                const isSelected = formData.emojiPreference === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleFieldChange('emojiPreference', key)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {key === 'none' ? 'Ø' : key === 'minimal' ? '✨' : '🎨'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{label}</p>
                      <p className="text-[10px] text-slate-500">{sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Call To Action (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-cta" className="text-sm font-semibold text-slate-800">
                Call to Action <span className="text-xs font-normal text-slate-400">(Optional)</span>
              </label>
              <span className="text-xs text-slate-400">{formData.callToAction.length}/100</span>
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

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-indigo-500/25 active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Crafting {formData.optionsCount} custom bios with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white/90" />
                  <span>Generate My Bio ✨</span>
                </>
              )}
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">
              Personal data is processed in memory and never stored. Strict limit enforcement for {currentPlatformConfig.name}.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
