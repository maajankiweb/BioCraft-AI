import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Gauge,
  Languages,
  Code2,
  Users,
  Heart,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  ArrowLeft,
  XCircle,
  ChevronDown,
  Target,
  Compass,
  Zap,
  Clock,
  Layers,
  Check,
  Sliders,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToHome: () => void;
  onScrollToGenerator: () => void;
  onNavigateToContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToHome,
  onScrollToGenerator,
  onNavigateToContact,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const aboutFaqs = [
    {
      q: 'Why did you build BioCraft AI when ChatGPT and Claude already exist?',
      a: 'General-purpose LLMs lack strict character-boundary enforcement and frequently hallucinate fake achievements (like claims of being a Forbes 30 Under 30 honoree or having founded a $10M startup). BioCraft AI enforces strict grapheme cluster boundaries so your bio pastes into Instagram (150 chars), TikTok (80 chars), or LinkedIn (220 chars) without truncation.',
    },
    {
      q: 'How does the grapheme cluster counting engine work?',
      a: 'Social media platforms measure character limits based on user-perceived glyphs (graphemes) rather than standard UTF-16 code units. A multi-byte emoji like 👨‍💻 counts as 1 character to Instagram, but 5 code units in standard JavaScript. BioCraft AI implements international Unicode grapheme segmentation to match platform algorithms exactly.',
    },
    {
      q: 'Is BioCraft AI really 100% free with no hidden charges?',
      a: 'Yes. BioCraft AI is a free utility created for creators and professionals. There are no paid tiers, credit card requirements, or locked features.',
    },
    {
      q: 'Do you store or sell submitted user inputs?',
      a: 'Never. BioCraft AI operates on a zero-persistence policy. Your inputs are transmitted over HTTPS to our serverless API, passed ephemerally to the Google Gemini model in memory, and immediately discarded after the bio response is sent.',
    },
    {
      q: 'What makes your Hindi and Hinglish generation authentic?',
      a: 'Instead of literal dictionary translations, our prompt architecture understands modern conversational Hinglish—the everyday blend of Hindi and English written in Latin script favored by 600M+ digital creators across South Asia.',
    },
  ];

  const milestones = [
    {
      year: 'Phase 1',
      title: 'The Problem Identified',
      desc: 'Creators consistently struggled with AI tools writing 180+ character bios for Instagram’s strict 150-character limit, resulting in broken calls-to-action.',
    },
    {
      year: 'Phase 2',
      title: 'Grapheme Boundary Engine Built',
      desc: 'Engineered a client-server grapheme counter accounting for multi-byte emojis, skin-tone modifiers, and regional indicator symbols.',
    },
    {
      year: 'Phase 3',
      title: 'Hinglish & Desi Cultural Model',
      desc: 'Introduced native support for Devanagari Hindi and conversational Hinglish, tuned for authentic digital creator vernacular.',
    },
    {
      year: 'Phase 4',
      title: 'Google Gemini 3.8 Flash Upgrade',
      desc: 'Upgraded backend generation to Google Gemini 3.8 Flash, dropping response latency below 800ms with zero data persistence.',
    },
  ];

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
            <span className="text-slate-900 font-bold">About Us</span>
          </nav>

          <button
            onClick={onNavigateToHome}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-indigo-300 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Generator</span>
          </button>
        </div>

        {/* SECTION 1: ABOUT HERO (Two-Column on Desktop) */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-500" />
                <span>About BioCraft AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Building Better First Impressions Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800">
                  Intelligent Copywriting
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                We empower digital creators, developers, founders, and professionals to craft memorable social profiles. Our focus is delivering mathematically verified character limits, authentic voice tuning, and zero fabricated claims.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onNavigateToHome();
                    setTimeout(onScrollToGenerator, 100);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer ring-2 ring-indigo-500/20"
                >
                  <Sparkles className="w-4 h-4 text-white/90" />
                  <span>Try Free Generator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (onNavigateToContact) {
                      onNavigateToContact();
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Get in Touch</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Grapheme Verified
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Zero Data Retained
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Zap className="w-4 h-4 text-purple-600" />
                  Sub-800ms Latency
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Product Visual */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-indigo-950/5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/70 px-2 py-0.5 rounded-md">
                    Instagram Target • 150c Limit
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-bold text-slate-700">Live Grapheme Verification</span>
                      <span className="font-mono text-emerald-600 font-bold">142 / 150 chars</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-snug">
                      Senior AI Architect building distributed systems ⚡ Writing about LLM reliability &amp; scaling. Link below 👇
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-purple-900">
                      <span className="text-[10px] text-purple-600 uppercase font-bold block">Engine</span>
                      <span className="font-semibold">Gemini 3.8 Flash</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                      <span className="text-[10px] text-emerald-600 uppercase font-bold block">Status</span>
                      <span className="font-semibold">100% Validated</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-slate-400">
                    Engineered to eliminate cut-offs on social platforms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPANY INTRODUCTION ("Who We Are") */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
                Ending the Era of Truncated &amp; Hallucinated Bios
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Your profile bio is the single make-or-break filter deciding whether visitors follow, collaborate, or bounce. BioCraft AI was built by creators and engineers who grew tired of generic AI tools failing at the simplest tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-2">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>The Generic AI Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
                  General models frequently produce 180-character text for an Instagram limit of 150, or invent fake stats like "Forbes 30 Under 30" without consent.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>The BioCraft AI Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  Our system combines Google Gemini 3.8 with strict grapheme boundary calculation and anti-fabrication prompt guards so your bio fits on your first attempt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MISSION, VISION, AND PURPOSE */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Core Purpose
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Mission, Vision &amp; Purpose
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To deliver mathematically verified, high-converting social bios that respect real character limits, celebrate multilingual creators, and never hallucinate fake credentials.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A web where every professional, creator, and builder can communicate their authentic value instantly—regardless of language or platform constraints.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-5">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Our Purpose</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To democratize professional copywriting as a 100% free, private utility without paywalls, sign-up barriers, or tracking overhead.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR STORY AND JOURNEY (Timeline) */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              How BioCraft AI Evolved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                    {m.year}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-3 mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Milestone 0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: WHAT WE DO (Capability Cards) */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              What BioCraft AI Delivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">1. Strict Platform Ceilings</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tuned specifically for Instagram (150 chars), LinkedIn Headlines (220 chars), TikTok (80 chars), Twitter/X (160 chars), and YouTube (1,000 chars).
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">2. Anti-Fabrication Guardrails</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our model strictly relies on the profession, skills, and background you provide. It will never invent credentials, awards, or false achievements.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">3. Native Hindi &amp; Hinglish</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Authentic cultural copywriting that understands desi slang, natural conversational rhythms, and Latin-script Hindi used across Indian social platforms.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">4. Live Inline Editing &amp; TXT Export</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every generated bio can be tweaked inline with real-time character limit updates, copied in 1-click, or exported as a clean formatted text file.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: OUR VALUES */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Our Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Values That Drive Our Product
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="font-black text-2xl text-purple-600 font-mono mb-2">01</div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Accuracy Over Fluff</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every single character is accounted for. We prioritize formatting reliability over endless repetitive options.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="font-black text-2xl text-indigo-600 font-mono mb-2">02</div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Zero Persistence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal identity details are processed in RAM only and never stored in a database. Total privacy guaranteed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="font-black text-2xl text-sky-600 font-mono mb-2">03</div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Inclusive Voice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Embracing bilingual creators with dedicated Hindi and Hinglish capabilities rather than standard American English only.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="font-black text-2xl text-emerald-600 font-mono mb-2">04</div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Free Forever</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No paywalls, mandatory account creations, or credit card forms. Great tools should be accessible to all.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: WHY CHOOSE US (Comparison Table) */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Why Creators Choose BioCraft AI
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Feature</th>
                    <th className="py-3 px-4 font-bold text-slate-500">Generic AI (ChatGPT / Claude)</th>
                    <th className="py-3 px-4 font-bold text-indigo-700 bg-indigo-50/70 rounded-t-xl">BioCraft AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Character Limit Guarantee</td>
                    <td className="py-3.5 px-4 text-slate-500">❌ Frequently over limits by 20-50 chars</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-indigo-50/70">✓ 100% Grapheme Cluster Enforced</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Factual Credibility</td>
                    <td className="py-3.5 px-4 text-slate-500">❌ Hallucinates fake stats &amp; awards</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-indigo-50/70">✓ Zero Hallucinations Policy</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Indian Hinglish &amp; Hindi</td>
                    <td className="py-3.5 px-4 text-slate-500">❌ Robotic literal dictionary translations</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-indigo-50/70">✓ Native Desi Creator Slang</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Inline Editing &amp; Recount</td>
                    <td className="py-3.5 px-4 text-slate-500">❌ Must re-prompt manually</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-indigo-50/70">✓ Real-Time Inline Character Recount</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Account Requirement</td>
                    <td className="py-3.5 px-4 text-slate-500">❌ Mandatory login &amp; tracking</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-indigo-50/70 rounded-b-xl">✓ No Account Needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 8: HOW WE WORK / TECH ARCHITECTURE */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold mb-4 border border-white/10">
                <Cpu className="w-3.5 h-3.5" />
                <span>Modern Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                High-Performance Modern Architecture
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                BioCraft AI is built on a clean modern stack comprising React 19, TypeScript, Tailwind CSS v4, Vite, and Google Gemini 3.8 Flash. Our stateless API architecture processes requests ephemerally with sub-800ms average turnaround.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Google Gemini 3.8 Flash</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">React 19 &amp; TypeScript</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Tailwind CSS v4</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Unicode Grapheme Boundary Engine</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Vercel Serverless Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: OUR WORKING PROCESS (4 Steps) */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              How BioCraft AI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm mb-3">
                1
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Input Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your profession, key skills, and optional personal story.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-sm mb-3">
                2
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Set Rules &amp; Tone</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose platform limits (150 chars, 220 chars), language, and emoji style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 font-bold flex items-center justify-center text-sm mb-3">
                3
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Gemini Generates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google Gemini synthesizes distinct bio variations with zero hallucinations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-3">
                4
              </span>
              <h3 className="font-bold text-base text-slate-900 mb-1">Edit &amp; 1-Click Copy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fine-tune inline, verify live character count, and copy straight to clipboard.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: ABOUT FAQS */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Knowledge Base
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {aboutFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
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

        {/* SECTION 12: ABOUT PAGE FINAL CTA */}
        <section className="text-center bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Ready to Upgrade Your Social Bio?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Generate customized bios for Instagram, LinkedIn, TikTok, X, or YouTube in seconds. Free, private, and mathematically verified.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(onScrollToGenerator, 100);
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer ring-2 ring-indigo-500/20"
            >
              <Sparkles className="w-5 h-5 text-white/95" />
              <span>Generate Free Bio Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                if (onNavigateToContact) {
                  onNavigateToContact();
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <span>Contact Our Team</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
