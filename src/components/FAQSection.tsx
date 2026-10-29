import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { CENTRAL_FAQS, FAQRecord } from '../data/faqs.ts';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  extraFaqs?: FAQItem[];
  platformSlug?: string;
  onNavigateToFaqDirectory?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  extraFaqs,
  platformSlug,
  onNavigateToFaqDirectory,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Derive relevant FAQs based on platform or default central FAQs
  const defaultList = React.useMemo(() => {
    if (platformSlug) {
      const categoryMap: Record<string, string> = {
        'instagram-bio-generator': 'instagram',
        'linkedin-bio-generator': 'linkedin',
        'tiktok-bio-generator': 'tiktok',
        'twitter-bio-generator': 'twitter',
        'youtube-bio-generator': 'youtube',
        'hinglish-bio-generator': 'hinglish',
      };
      const cat = categoryMap[platformSlug];
      if (cat) {
        return CENTRAL_FAQS.filter((f) => f.category === cat || f.category === 'general');
      }
    }
    return CENTRAL_FAQS.filter((f) => f.category === 'general' || f.category === 'technical').slice(0, 6);
  }, [platformSlug]);

  const mergedFaqs = React.useMemo(() => {
    if (extraFaqs && extraFaqs.length > 0) {
      const converted: FAQRecord[] = extraFaqs.map((item, i) => ({
        id: `extra-${i}`,
        question: item.question,
        shortAnswer: item.answer,
        category: 'general',
        searchIntent: 'informational',
        verifiedDate: 'October 2026',
      }));
      return [...converted, ...defaultList];
    }
    return defaultList;
  }, [extraFaqs, defaultList]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Search &amp; AI Answer Engine Optimized</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about BioCraft AI, platform character rules, and copywriting standards.
          </p>
        </div>

        <div className="space-y-3.5 mb-10" role="region" aria-label="Frequently Asked Questions list">
          {mergedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `home-faq-answer-${faq.id || idx}`;
            const headerId = `home-faq-header-${faq.id || idx}`;

            return (
              <div
                key={faq.id || idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-indigo-300 shadow-md ring-1 ring-indigo-500/10' : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggle(idx)}
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
                    aria-labelledby={headerId}
                    className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150"
                  >
                    <p className="font-normal text-slate-700">{faq.shortAnswer}</p>
                    {faq.detailedAnswer && (
                      <p className="mt-2.5 text-xs text-slate-500 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        {faq.detailedAnswer}
                      </p>
                    )}

                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {faq.relatedLinks && faq.relatedLinks.length > 0 ? (
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
                      ) : (
                        <span />
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
          })}
        </div>

        {/* Directory Link Card */}
        <div className="text-center">
          <a
            href="/faq"
            onClick={(e) => {
              if (onNavigateToFaqDirectory) {
                e.preventDefault();
                onNavigateToFaqDirectory();
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-indigo-700 bg-white hover:bg-indigo-50/80 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>Browse Complete Searchable FAQ Knowledge Base (20+ Questions)</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </a>
        </div>
      </div>
    </section>
  );
};
