import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Clock, Sparkles, Github, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigateToHome: () => void;
  onScrollToFaq: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToHome, onScrollToFaq }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Feature Suggestion',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button
            onClick={onNavigateToHome}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900">Contact &amp; Support</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>We'd Love to Hear From You</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact &amp; Support
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Have a feature request, spotted an updated social platform limit, or want to partner? Drop us a note below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Info */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Direct Email</h2>
              <p className="text-xs text-slate-500 mb-3">For general inquiries, collaborations and security notices.</p>
              <a
                href="mailto:support@biocraft.ai"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                support@biocraft.ai
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Response Time</h2>
              <p className="text-xs text-slate-500 mb-1">We typically reply within</p>
              <p className="text-sm font-bold text-slate-800">24 Hours (Mon – Fri)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Github className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Open Source &amp; Issues</h2>
              <p className="text-xs text-slate-500 mb-3">Report bugs or contribute pull requests on GitHub.</p>
              <a
                href="https://github.com/AshishKmj/BioCraft-AI"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1"
              >
                <span>github.com/AshishKmj/BioCraft-AI</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you for reaching out. A member of the BioCraft AI team will review your note and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', category: 'Feature Suggestion', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Topic
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
                  >
                    <option value="Feature Suggestion">Feature Suggestion</option>
                    <option value="Bug Report">Bug Report / Character Limit Update</option>
                    <option value="Partnership">Creator or Tool Partnership</option>
                    <option value="API Inquiry">API &amp; Developer Integration</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">
                    Your details are used solely to reply to your request.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
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
        </div>
      </div>
    </div>
  );
};
