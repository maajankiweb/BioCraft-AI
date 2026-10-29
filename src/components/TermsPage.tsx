import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

interface TermsPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
  onNavigateToContact: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigateToHome,
  onScrollToGenerator,
  onNavigateToContact,
}) => {
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
            <span className="text-slate-900 font-bold">Terms of Use</span>
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
        <header className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>Fair &amp; Transparent Terms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Terms of Use
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            By accessing or using BioCraft AI, you agree to these fair and straightforward terms. We protect your rights and output ownership.
          </p>
          <div className="mt-4 text-xs text-slate-400 font-mono">
            Last Updated: October 2026 • Effective Immediately
          </div>
        </header>

        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">100% Output Ownership</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every bio you generate belongs to you. Free to use commercially without royalties.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <FileText className="w-6 h-6 text-indigo-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">No Hidden Fees</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Free utility for creators, founders, and professionals worldwide.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <AlertTriangle className="w-6 h-6 text-purple-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">Platform Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Limits are strictly verified, but social networks may adjust rules over time.
            </p>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">1.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, or utilizing the BioCraft AI application (the "Service"), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please refrain from using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">2.</span>
              <span>Permitted Use &amp; Acceptable Behavior</span>
            </h2>
            <p className="mb-3">
              BioCraft AI is designed to help creators, developers, founders, and professionals generate concise, compelling biography copy for social media and web profiles.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <p>
                <strong>• Lawful Use Only:</strong> You agree not to submit prompts that are unlawful, abusive, harassing, defamatory, impersonating another person, or intended to commit fraud.
              </p>
              <p>
                <strong>• System Integrity:</strong> You agree not to attempt automated denial-of-service attacks, rate-limit bypassing, reverse engineering of the backend infrastructure, or vulnerability exploitation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">3.</span>
              <span>Ownership of Generated Outputs</span>
            </h2>
            <p className="mb-3">
              You own the outputs generated through your use of BioCraft AI. We do not claim any copyright, trademark, or proprietary interest in the bios produced from your inputs.
            </p>
            <p>
              You are free to edit, publish, commercially monetize, and distribute your generated bios across Instagram, LinkedIn, TikTok, X, YouTube, portfolios, or any other publication platform without paying royalties, licensing fees, or providing attribution to BioCraft AI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">4.</span>
              <span>AI Output Disclaimer &amp; Third-Party Platform Rules</span>
            </h2>
            <p className="mb-3">
              BioCraft AI employs sophisticated prompt engineering and grapheme cluster counting to align with platform limits (e.g. 150 characters for Instagram, 80 for TikTok).
            </p>
            <p>
              However, third-party social networks (Instagram, Meta, LinkedIn, ByteDance, Google, X Corp.) may modify their profile UI constraints, character rules, link policies, or bio counting methods at any time without notice. BioCraft AI provides outputs "as is" and recommends testing final bio pasting in your destination profile editor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">5.</span>
              <span>Modifications &amp; Service Availability</span>
            </h2>
            <p>
              We reserve the right to improve, update, temporarily pause, or modify parts of the Service to implement new AI models, support new social networks, or maintain infrastructure security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">6.</span>
              <span>Questions &amp; Contact</span>
            </h2>
            <p className="mb-3">
              If you have any questions regarding these Terms of Use, please reach out to our team:
            </p>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="font-bold text-purple-950 text-xs">Direct Support Contact</p>
                <p className="text-xs text-purple-700">support@biocraft.ai</p>
              </div>
              <button
                onClick={onNavigateToContact}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Open Contact Form
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(onScrollToGenerator, 100);
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer ring-2 ring-indigo-500/20"
          >
            <Sparkles className="w-4 h-4 text-white/95" />
            <span>Launch BioCraft AI Generator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
