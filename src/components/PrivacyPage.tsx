import React from 'react';
import {
  Shield,
  Lock,
  EyeOff,
  Server,
  Cpu,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface PrivacyPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
  onNavigateToContact: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
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
            <span className="text-slate-900 font-bold">Privacy Policy</span>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Data-Persistence Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            At BioCraft AI, we believe your personal professional identity belongs strictly to you. We operate on a strict ephemeral architecture with zero database storage.
          </p>
          <div className="mt-4 text-xs text-slate-400 font-mono">
            Last Updated: October 2026 • Effective Immediately
          </div>
        </header>

        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <EyeOff className="w-6 h-6 text-purple-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">No Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No advertising trackers, third-party profiling, or personal cookies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <Server className="w-6 h-6 text-indigo-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">RAM-Only Processing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your inputs exist only in memory during generation and are discarded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <Lock className="w-6 h-6 text-emerald-600 mb-2.5" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">Zero Accounts</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No mandatory sign-ups, passwords, or stored user profiles.
            </p>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">1.</span>
              <span>Information We Process</span>
            </h2>
            <p className="mb-3">
              When you use BioCraft AI to generate a bio, you optionally provide data such as your name, profession, skills, personal background, target platform, tone, and call to action.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <p>
                <strong>• Ephemeral Processing:</strong> This information is transmitted over encrypted HTTPS to our backend API, passed to Google Gemini API to produce your candidate bios, and returned to your browser.
              </p>
              <p>
                <strong>• Zero Retention:</strong> We do not log, persist, database, or archive your text inputs. Once your HTTP request completes, the data is instantly evicted from server memory.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">2.</span>
              <span>AI Model &amp; Third-Party Processing</span>
            </h2>
            <p className="mb-3">
              BioCraft AI uses the official Google Gemini API (model <code>gemini-3.8-flash</code>) to synthesize bio options.
            </p>
            <p>
              Your prompts are handled in accordance with enterprise data protection terms: user inputs sent via API calls are not used by default to train foundational Google AI models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">3.</span>
              <span>Rate Limiting &amp; Abuse Prevention</span>
            </h2>
            <p className="mb-3">
              To ensure system availability and prevent denial-of-service abuse, our server temporarily tallies incoming request counts per IP address in an in-memory table (capped at 25 requests per 5-minute window).
            </p>
            <p>
              These IP timestamps are stored in volatile RAM only and are cleared automatically every 10 minutes. They are never linked to any personal identity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">4.</span>
              <span>Cookies and Local Browser Storage</span>
            </h2>
            <p>
              BioCraft AI does not set tracking cookies, marketing cookies, or fingerprint your browser. Any temporary form state (such as an example template you click) is maintained solely in your local browser tab session.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">5.</span>
              <span>Your Data Rights</span>
            </h2>
            <p className="mb-3">
              Under international data regulations (including GDPR, UK GDPR, and CCPA/CPRA), you have rights to access, rectify, or erase personal data. Because BioCraft AI stores zero persistent user data, there are no databases or user logs to query, export, or delete.
            </p>
            <p>
              Your privacy is preserved by architectural design rather than administrative request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono">6.</span>
              <span>Privacy Inquiries &amp; Contact</span>
            </h2>
            <p className="mb-3">
              If you have any questions or security disclosures regarding our privacy architecture, contact our team:
            </p>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="font-bold text-purple-950 text-xs">Direct Privacy Contact</p>
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
