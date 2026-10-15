import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is an AI bio generator?',
    answer:
      'An AI bio generator is a copywriting tool that uses large language models (such as Google Gemini) to craft concise, compelling profile descriptions. It tailors the text to specific social networks, tone of voice, character constraints, and the factual details you provide—saving time while maximizing profile conversion.',
  },
  {
    question: 'Is BioCraft AI free to use?',
    answer:
      'Yes! BioCraft AI is free to use when hosted with your Google AI Studio or Gemini API key. There are no paywalls, mandatory user accounts, or hidden subscriptions.',
  },
  {
    question: 'Which platforms are supported?',
    answer:
      'BioCraft AI officially supports 7 destinations: Instagram (150 chars), LinkedIn Headlines (220 chars), YouTube Channel About (1000 chars), TikTok (80 chars), X / Twitter (160 chars), Facebook Profile Intro (101 chars), and Personal Portfolio / Websites (approx 600 chars). Each limit is enforced strictly.',
  },
  {
    question: 'Can I generate a bio in Hindi or Hinglish?',
    answer:
      'Yes! In addition to standard English, BioCraft AI supports pure Hindi as well as Hinglish (the conversational blend of Hindi and English written in Latin script commonly used across Indian social media like Instagram, Twitter, and LinkedIn).',
  },
  {
    question: 'Can I edit and copy my bio?',
    answer:
      'Absolutely. Every generated bio card includes an "Edit" button for live inline modifications, complete with real-time character limit recalculation. You can copy any single bio to your clipboard with 1 click, or download all generated options as a formatted .txt file.',
  },
  {
    question: 'Are my personal details stored?',
    answer:
      'No. BioCraft AI does not store, database, or persist any of your submitted details or generated bios. Each request is processed ephemerally in server memory solely to generate your response via the Gemini API and then immediately discarded.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Everything you need to know about BioCraft AI, platform limits, and data privacy.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-indigo-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/70">
                    {faq.answer}
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
