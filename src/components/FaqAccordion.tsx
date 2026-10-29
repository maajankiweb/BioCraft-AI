import React, { useState } from 'react';
import { ChevronDown, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { FAQRecord } from '../data/faqs.ts';

interface FaqAccordionProps {
  faqs: FAQRecord[];
  title?: string;
  subtitle?: string;
  badge?: string;
  allowMultipleOpen?: boolean;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about BioCraft AI, platform limits, and copywriting rules.',
  badge = 'Knowledge Base',
  allowMultipleOpen = false,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    if (allowMultipleOpen) {
      setOpenIndices((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`py-12 md:py-16 ${className}`} aria-labelledby="faq-section-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>
          )}
          <h2 id="faq-section-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            const contentId = `faq-answer-${faq.id || idx}`;
            const headerId = `faq-header-${faq.id || idx}`;

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
                    className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors cursor-pointer"
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
                    {/* Direct Answer First */}
                    <p className="font-normal text-slate-700">{faq.shortAnswer}</p>

                    {/* Optional Detailed Supporting Context */}
                    {faq.detailedAnswer && (
                      <p className="mt-2.5 text-xs text-slate-500 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        {faq.detailedAnswer}
                      </p>
                    )}

                    {/* Contextual Internal Links & Metadata */}
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
      </div>
    </section>
  );
};
