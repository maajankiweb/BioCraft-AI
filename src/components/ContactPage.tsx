import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Github,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  MessageSquare,
  AlertCircle,
  Globe,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ContactPageProps {
  onNavigateToHome: () => void;
  onScrollToFaq: () => void;
  onOpenPrivacyModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateToHome,
  onScrollToFaq,
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'Feature Suggestion',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const contactFaqs = [
    {
      q: 'How quickly does the BioCraft AI team respond?',
      a: 'We review messages during standard business hours (Monday through Friday) and typically respond to support inquiries, bug reports, and partnership notes within 24 hours.',
    },
    {
      q: 'How do I report a social media character limit change?',
      a: 'If Instagram, TikTok, LinkedIn, or YouTube updates their bio limits, choose "Character Limit Update / Bug" in the form above or open an issue on our GitHub repository. We test and patch limits rapidly.',
    },
    {
      q: 'Can I request a new platform or language?',
      a: 'Absolutely! We actively welcome community requests for additional platforms (such as Threads, Medium, or Pinterest) or additional Indian regional languages. Select "Feature Suggestion" in the dropdown.',
    },
    {
      q: 'What is your privacy policy regarding submitted form messages?',
      a: 'Your name, email, and message are used solely to reply to your inquiry. We never share your contact information with advertisers or third parties.',
    },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a brief message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate swift client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-slate-900 font-bold">Contact &amp; Support</span>
          </nav>

          <button
            onClick={onNavigateToHome}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-indigo-300 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Generator</span>
          </button>
        </div>

        {/* SECTION 1: CONTACT HERO */}
        <section className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>We'd Love to Hear From You</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Let's Start a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800">
              Conversation
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Have a question, want to suggest a new platform, spotted an updated character limit, or interested in a creator collaboration? Tell us below.
          </p>
        </section>

        {/* SECTION 2 & 3: SPLIT 2-COLUMN VIEW (Left Cards + Right Form) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT COLUMN: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4 shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Direct Email</h2>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                For general inquiries, creator partnerships, and security notices.
              </p>
              <a
                href="mailto:support@biocraft.ai"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1.5"
              >
                <span>support@biocraft.ai</span>
              </a>
            </div>

            {/* Response Time Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Support
                </span>
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Response Time</h2>
              <p className="text-xs text-slate-500 mb-1">We typically reply within</p>
              <p className="text-sm font-extrabold text-slate-800">24 Hours (Monday – Friday)</p>
            </div>

            {/* GitHub & Issue Tracker Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-4 shadow-2xs">
                <Github className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Open Source &amp; Issue Tracker</h2>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Report platform character limit changes or file bug tickets directly on GitHub.
              </p>
              <a
                href="https://github.com/AshishKmj/BioCraft-AI"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1.5"
              >
                <span>github.com/AshishKmj/BioCraft-AI</span>
                <span>↗</span>
              </a>
            </div>

            {/* Remote First Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-3">
              <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-indigo-900">Serving Creators Globally</p>
                <p className="text-indigo-700 mt-0.5 leading-relaxed">
                  BioCraft AI operates as a 100% digital cloud utility. We serve creators and developers across 140+ countries.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out. A member of the BioCraft AI team will review your inquiry and get back to you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', organization: '', category: 'Feature Suggestion', message: '' });
                    setErrors({});
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Fill out the quick form and we’ll get back to you shortly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.name
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Topic / Category
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all cursor-pointer"
                    >
                      <option value="Feature Suggestion">Feature Suggestion</option>
                      <option value="Limit Update">Character Limit Update / Bug</option>
                      <option value="Partnership">Creator or Tool Partnership</option>
                      <option value="API Inquiry">API &amp; Integration</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-org" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company or Channel <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      placeholder="e.g. @yourhandle or Company"
                      value={formData.organization}
                      onChange={(e) => handleFieldChange('organization', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-slate-400 font-mono">{formData.message.length} chars</span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind, suggest an improvement, or report an issue..."
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all resize-y focus:outline-none ${
                      errors.message
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                        : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-400">
                    Your details are used solely to reply to your inquiry. No marketing spam.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 ring-2 ring-indigo-500/20"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 5: WHAT HAPPENS NEXT? (Process Timeline) */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Expectations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              What Happens After You Submit?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-sm mb-3">
                1
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Receipt &amp; Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your message is securely queued and categorized for direct review.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm mb-3">
                2
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Human Engineering Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our product and developer team investigates the limit change, feedback, or inquiry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-3">
                3
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Detailed Reply</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You receive a clear, actionable email response within 24 business hours.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT FAQS */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Quick Answers
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Frequently Asked Contact Questions
              </h2>
            </div>

            <div className="space-y-3">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 8: FINAL CONTACT CTA */}
        <section className="text-center bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Looking to Generate Your Profile Bio Right Away?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            No signup or contact needed. Choose your social platform, enter your profession, and generate custom bios in seconds.
          </p>
          <button
            onClick={() => {
              onNavigateToHome();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer ring-2 ring-indigo-500/20"
          >
            <Sparkles className="w-5 h-5 text-white/95" />
            <span>Launch Free Bio Generator</span>
          </button>
        </section>
      </div>
    </div>
  );
};
