import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Heart,
  ThumbsUp,
  Lightbulb,
  Bug,
  Github,
  Mail,
} from 'lucide-react';

interface FeedbackPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({
  onNavigateToHome,
  onScrollToGenerator,
}) => {
  const [formData, setFormData] = useState({
    rating: 'loved',
    category: 'Feature Request',
    platform: 'Instagram',
    feedback: '',
    name: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ratings = [
    { id: 'loved', label: 'Loved It', icon: '✨' },
    { id: 'great', label: 'Great', icon: '👍' },
    { id: 'idea', label: 'Have an Idea', icon: '💡' },
    { id: 'issue', label: 'Found an Issue', icon: '🛠️' },
  ];

  const categories = [
    'Feature Request',
    'Character Limit Update / Bug',
    'New Social Platform Request',
    'Hinglish / Language Tuning',
    'UI / UX Improvement',
    'General Compliment / Feedback',
  ];

  const platforms = [
    'Instagram',
    'LinkedIn',
    'TikTok',
    'Twitter / X',
    'YouTube',
    'Hinglish & Hindi',
    'General / All Platforms',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.feedback.trim() || formData.feedback.trim().length < 10) {
      setError('Please provide feedback of at least 10 characters.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen py-10 md:py-16 bg-gradient-to-b from-purple-50/50 via-white to-slate-50 overflow-hidden">
      {/* Background Decorative Mesh & Glows */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(79, 70, 229) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/25 to-sky-200/20 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={onNavigateToHome}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Send Feedback</span>
          </nav>

          <button
            onClick={onNavigateToHome}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-indigo-300 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Generator</span>
          </button>
        </div>

        {/* Hero Header */}
        <header className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
            <span>Community-Driven Product</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Help Us Improve{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800">
              BioCraft AI
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Your feedback directly shapes our character limit accuracy, new platform integrations, and bilingual copywriting models. We review every note.
          </p>
        </header>

        {/* Main Feedback Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-11 shadow-xl shadow-slate-200/40">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Thank You for Your Feedback!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                Your thoughts and suggestions help make BioCraft AI the best bio generation tool on the web.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      rating: 'loved',
                      category: 'Feature Request',
                      platform: 'Instagram',
                      feedback: '',
                      name: '',
                      email: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Send More Feedback
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateToHome();
                    setTimeout(onScrollToGenerator, 100);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-md cursor-pointer transition-colors"
                >
                  Return to Generator
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Sentiment / Experience buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  How was your experience?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ratings.map((r) => {
                    const isSelected = formData.rating === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: r.id })}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/25 font-bold shadow-xs'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700'
                        }`}
                      >
                        <span className="text-xl">{r.icon}</span>
                        <span className="text-xs">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="feedback-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    id="feedback-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-platform" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Relevant Platform
                  </label>
                  <select
                    id="feedback-platform"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all cursor-pointer"
                  >
                    {platforms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feedback text */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="feedback-text" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Feedback, Feature Request or Report <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">{formData.feedback.length} chars</span>
                </div>
                <textarea
                  id="feedback-text"
                  required
                  rows={5}
                  placeholder="Tell us what you liked, what could be better, or details of the limit change..."
                  value={formData.feedback}
                  onChange={(e) => {
                    setFormData({ ...formData, feedback: e.target.value });
                    if (error) setError(null);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all resize-y focus:outline-none ${
                    error
                      ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                      : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {error && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                  </p>
                )}
              </div>

              {/* Optional Name & Email for follow up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                <div>
                  <label htmlFor="feedback-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    placeholder="e.g. Alex"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email for Follow-up <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  We read and log all community feedback.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 ring-2 ring-indigo-500/20"
                >
                  {isSubmitting ? (
                    <span>Submitting feedback...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternative Community Channels */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://github.com/AshishKmj/BioCraft-AI/issues"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-xs flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                GitHub Issue Tracker ↗
              </h3>
              <p className="text-xs text-slate-500">File bug reports or submit pull requests</p>
            </div>
          </a>

          <a
            href="mailto:support@biocraft.ai"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-xs flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                Direct Email Support ↗
              </h3>
              <p className="text-xs text-slate-500">Reach the team directly at support@biocraft.ai</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
