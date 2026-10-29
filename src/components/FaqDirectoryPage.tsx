import React, { useState, useMemo } from 'react';
import {
  Search,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  X,
} from 'lucide-react';
import { CENTRAL_FAQS, FaqCategory, FAQRecord, searchFaqs } from '../data/faqs.ts';

interface FaqDirectoryPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
  onNavigateToContact: () => void;
}

const CATEGORY_TABS: Array<{ id: FaqCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'twitter', label: 'Twitter / X' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'hinglish', label: 'Hinglish & Hindi' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'technical', label: 'Technical' },
  { id: 'terms', label: 'Terms' },
];

export const FaqDirectoryPage: React.FC<FaqDirectoryPageProps> = ({
  onNavigateToHome,
  onScrollToGenerator,
  onNavigateToContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | 'all'>('all');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([CENTRAL_FAQS[0]?.id || 'gen-01']);

  const filteredFaqs = useMemo(() => {
    let list = CENTRAL_FAQS;
    if (selectedCategory !== 'all') {
      list = list.filter((f) => f.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.shortAnswer.toLowerCase().includes(q) ||
          (f.detailedAnswer && f.detailedAnswer.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
            <span className="text-slate-900 font-bold">FAQ Knowledge Base</span>
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
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Searchable Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Answers &amp; Platform Guidelines
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Find answers on character limits, emoji counting, Hinglish copywriting, data privacy, and Gemini 3.8 Flash model rules.
          </p>
        </header>

        {/* Search Bar Input */}
        <div className="relative mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g. Instagram limit, emoji count, privacy, Hinglish..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong>{filteredFaqs.length}</strong> verified questions
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-14" role="region" aria-label="FAQ Directory Results">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">No matching questions found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                We couldn't find an answer matching "{searchQuery}". You can submit a direct question to our team.
              </p>
              <button
                onClick={onNavigateToContact}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Ask a Question
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              const contentId = `dir-content-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-indigo-300 shadow-md ring-1 ring-indigo-500/10'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <span className="flex-1 pr-2">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150"
                    >
                      <p className="text-slate-700">{faq.shortAnswer}</p>
                      {faq.detailedAnswer && (
                        <p className="mt-2.5 text-xs text-slate-500 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                          {faq.detailedAnswer}
                        </p>
                      )}

                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-400">Related:</span>
                            {faq.relatedLinks.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 bg-indigo-50/60 px-2 py-0.5 rounded-md"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          Verified: {faq.verifiedDate}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Need Help? CTA Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 text-center shadow-sm">
          <MessageSquare className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            Couldn't find the answer you were looking for?
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Reach out to our engineering and product team. We reply within 24 business hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md cursor-pointer transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(onScrollToGenerator, 100);
              }}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
            >
              Try Bio Generator Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
