import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BioGeneratorForm } from './components/BioGeneratorForm.tsx';
import { ResultsSection } from './components/ResultsSection.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { ExampleBiosSection } from './components/ExampleBiosSection.tsx';
import { PlatformLimitsGuide } from './components/PlatformLimitsGuide.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { SeoContentSection } from './components/SeoContentSection.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { ContactPage } from './components/ContactPage.tsx';
import { BlogPage } from './components/BlogPage.tsx';
import { PrivacyPage } from './components/PrivacyPage.tsx';
import { TermsPage } from './components/TermsPage.tsx';
import { FeedbackPage } from './components/FeedbackPage.tsx';
import { FaqDirectoryPage } from './components/FaqDirectoryPage.tsx';
import { Footer } from './components/Footer.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import { GeneratedBio, BioFormInput } from './types/bio.ts';
import { countGraphemes } from './utils/bioUtils.ts';
import { LANDING_PAGES, LandingPageConfig } from './data/landingPages.ts';
import { BLOG_POSTS } from './data/blogPosts.ts';
import { getFaqsForPage, generateFaqSchema } from './data/faqs.ts';

export type PageView = 'home' | 'about' | 'contact' | 'blog' | 'privacy' | 'terms' | 'feedback' | 'faq';

export default function App() {
  const [bios, setBios] = useState<GeneratedBio[]>([]);
  const [lastInputUsed, setLastInputUsed] = useState<BioFormInput | null>(null);
  const [formTemplateData, setFormTemplateData] = useState<BioFormInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'feedback' | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | undefined>(undefined);

  // Sync SEO metadata with current view & URL
  const applySeo = (view: PageView, platformSlug?: string, blogSlug?: string) => {
    if (typeof document === 'undefined') return;

    const updateFaqSchema = (pageKey: string) => {
      try {
        const faqs = getFaqsForPage(pageKey);
        let script = document.getElementById('dynamic-faq-schema') as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.id = 'dynamic-faq-schema';
          script.type = 'application/ld+json';
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(generateFaqSchema(faqs));
      } catch {
        // Fallback
      }
    };

    if (view === 'about') {
      document.title = 'About BioCraft AI | Our Mission & Technology';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Learn why BioCraft AI was built to end cut-off social bios and false hallucinations. Powered by Google Gemini 3.8 and strict grapheme counting.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/about');
      updateFaqSchema('about');
      return;
    }

    if (view === 'contact') {
      document.title = 'Contact & Support | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Have a question, feature suggestion, or platform limit update for BioCraft AI? Contact our team directly. We respond within 24 hours.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/contact');
      updateFaqSchema('contact');
      return;
    }

    if (view === 'blog') {
      if (blogSlug) {
        const post = BLOG_POSTS.find((p) => p.slug === blogSlug);
        if (post) {
          document.title = `${post.title} | BioCraft AI Blog`;
          document.querySelector('meta[name="description"]')?.setAttribute('content', post.excerpt);
          document.getElementById('canonical-url')?.setAttribute('href', `https://biocraft-ai.vercel.app/blog/${post.slug}`);
          updateFaqSchema('general');
          return;
        }
      }
      document.title = 'Social Profile Copywriting Guides & Playbooks | BioCraft AI Blog';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Read data-backed playbooks on Instagram bio limits, LinkedIn headline formulas, TikTok 80-character hooks, and Hinglish copywriting.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/blog');
      updateFaqSchema('general');
      return;
    }

    if (view === 'privacy') {
      document.title = 'Privacy Policy | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Learn about BioCraft AI zero-persistence architecture. Your personal inputs are processed ephemerally in RAM and never stored in a database.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/privacy');
      updateFaqSchema('privacy');
      return;
    }

    if (view === 'terms') {
      document.title = 'Terms of Use & License | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Review the terms of use for BioCraft AI. 100% ownership of generated bios for commercial and personal use with zero royalties.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/terms');
      updateFaqSchema('terms');
      return;
    }

    if (view === 'feedback') {
      document.title = 'Send Feedback & Feature Requests | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Help us improve BioCraft AI. Suggest new platforms, report character limit changes, or share your copywriting experience.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/feedback');
      updateFaqSchema('contact');
      return;
    }

    if (view === 'faq') {
      document.title = 'Frequently Asked Questions (FAQ) & Platform Limits | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Search 20+ verified answers on social media bio limits, character counts, emoji handling, Hinglish copywriting, and privacy guarantees.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/faq');
      updateFaqSchema('general');
      return;
    }

    // Generator / Platform Landing Page view
    if (platformSlug && LANDING_PAGES[platformSlug]) {
      const config = LANDING_PAGES[platformSlug];
      document.title = config.pageTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', config.metaDescription);
      document.getElementById('canonical-url')?.setAttribute('href', `https://biocraft-ai.vercel.app${config.canonicalPath}`);
      document.getElementById('og-title')?.setAttribute('content', config.pageTitle);
      document.getElementById('og-description')?.setAttribute('content', config.metaDescription);
      document.getElementById('og-url')?.setAttribute('href', `https://biocraft-ai.vercel.app${config.canonicalPath}`);
      document.getElementById('twitter-title')?.setAttribute('content', config.pageTitle);
      document.getElementById('twitter-description')?.setAttribute('content', config.metaDescription);
      updateFaqSchema(platformSlug);
    } else {
      document.title = 'Free AI Bio Generator for Instagram, LinkedIn, TikTok & X | BioCraft AI';
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        'Generate high-converting, personalized social media bios and professional headlines with AI. Strictly enforced platform limits, 3 languages, and zero login required.'
      );
      document.getElementById('canonical-url')?.setAttribute('href', 'https://biocraft-ai.vercel.app/');
      updateFaqSchema('general');
    }
  };

  // Resolve routing from window.location.pathname
  const resolveRouteFromPath = () => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');

    if (path === 'about') {
      setCurrentView('about');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('about');
      return;
    }

    if (path === 'contact') {
      setCurrentView('contact');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('contact');
      return;
    }

    if (path === 'blog') {
      setCurrentView('blog');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('blog');
      return;
    }

    if (path === 'privacy' || path === 'privacy-policy') {
      setCurrentView('privacy');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('privacy');
      return;
    }

    if (path === 'terms' || path === 'terms-of-use') {
      setCurrentView('terms');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('terms');
      return;
    }

    if (path === 'feedback' || path === 'send-feedback') {
      setCurrentView('feedback');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('feedback');
      return;
    }

    if (path === 'faq' || path === 'faqs' || path === 'help') {
      setCurrentView('faq');
      setActiveSlug('');
      setCurrentBlogSlug(undefined);
      applySeo('faq');
      return;
    }

    if (path.startsWith('blog/')) {
      const slug = path.replace(/^blog\//, '');
      setCurrentView('blog');
      setActiveSlug('');
      setCurrentBlogSlug(slug);
      applySeo('blog', undefined, slug);
      return;
    }

    if (LANDING_PAGES[path]) {
      setCurrentView('home');
      setActiveSlug(path);
      setCurrentBlogSlug(undefined);
      const config = LANDING_PAGES[path];
      applySeo('home', path);
      setFormTemplateData({
        name: '',
        profession: '',
        skills: '',
        description: '',
        platform: config.platform,
        tone: config.defaultTone,
        language: config.defaultLanguage,
        optionsCount: 3,
        callToAction: '',
        emojiPreference: 'minimal',
      });
      return;
    }

    // Default Home / Generator
    setCurrentView('home');
    setActiveSlug('');
    setCurrentBlogSlug(undefined);
    applySeo('home');
  };

  useEffect(() => {
    resolveRouteFromPath();

    const handlePopState = () => {
      resolveRouteFromPath();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToPage = (page: PageView, postSlug?: string) => {
    let url = '/';
    if (page === 'about') url = '/about';
    else if (page === 'contact') url = '/contact';
    else if (page === 'blog') url = postSlug ? `/blog/${postSlug}` : '/blog';
    else if (page === 'privacy') url = '/privacy';
    else if (page === 'terms') url = '/terms';
    else if (page === 'feedback') url = '/feedback';
    else if (page === 'faq') url = '/faq';

    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url);
    }

    setCurrentView(page);
    setActiveSlug('');
    setCurrentBlogSlug(postSlug);
    applySeo(page, undefined, postSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPlatform = (slug: string) => {
    const targetUrl = slug ? `/${slug}` : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    setCurrentView('home');
    setActiveSlug(slug);
    setCurrentBlogSlug(undefined);
    const config = LANDING_PAGES[slug];
    applySeo('home', slug);

    if (config) {
      setFormTemplateData((prev) => ({
        ...(prev || {
          name: '',
          profession: '',
          skills: '',
          description: '',
          optionsCount: 3,
          callToAction: '',
          emojiPreference: 'minimal',
        }),
        platform: config.platform,
        tone: config.defaultTone,
        language: config.defaultLanguage,
      }));
    }

    // Smooth scroll to top of generator
    const gen = document.getElementById('generator');
    if (gen) {
      gen.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToGenerator = () => {
    if (currentView !== 'home') {
      handleNavigateToPage('home');
      setTimeout(() => {
        const el = document.getElementById('generator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const professionInput = document.getElementById('field-profession');
        if (professionInput) professionInput.focus();
      }, 300);
    }
  };

  const handleScrollToExamples = () => {
    const el = document.getElementById('examples');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFaq = () => {
    const el = document.getElementById('faq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBiosGenerated = (newBios: GeneratedBio[], inputUsed: BioFormInput) => {
    setBios(newBios);
    setLastInputUsed(inputUsed);
  };

  const handleUpdateBio = (id: string, newText: string) => {
    setBios((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            bio: newText,
            characterCount: countGraphemes(newText),
          };
        }
        return b;
      })
    );
  };

  const handleSelectExample = (data: BioFormInput) => {
    setFormTemplateData({ ...data });
    handleScrollToGenerator();
  };

  const activeLandingConfig = activeSlug ? LANDING_PAGES[activeSlug] : undefined;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Sticky Navigation */}
      <Header
        onScrollToGenerator={handleScrollToGenerator}
        onNavigateToPlatform={handleNavigateToPlatform}
        onNavigateToPage={handleNavigateToPage}
        currentPage={currentView}
      />

      {/* Main Content: Switches between Generator, About, Contact, and Blog views */}
      <main className="flex-1">
        {currentView === 'about' && (
          <AboutPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
            onNavigateToContact={() => handleNavigateToPage('contact')}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToFaq={handleScrollToFaq}
            onOpenPrivacyModal={() => setModalType('privacy')}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            currentPostSlug={currentBlogSlug}
            onNavigateToPost={(slug) => handleNavigateToPage('blog', slug)}
            onNavigateToBlogIndex={() => handleNavigateToPage('blog')}
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
            onNavigateToContact={() => handleNavigateToPage('contact')}
          />
        )}

        {currentView === 'terms' && (
          <TermsPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
            onNavigateToContact={() => handleNavigateToPage('contact')}
          />
        )}

        {currentView === 'feedback' && (
          <FeedbackPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
          />
        )}

        {currentView === 'faq' && (
          <FaqDirectoryPage
            onNavigateToHome={() => handleNavigateToPage('home')}
            onScrollToGenerator={handleScrollToGenerator}
            onNavigateToContact={() => handleNavigateToPage('contact')}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onScrollToGenerator={handleScrollToGenerator}
              onScrollToExamples={handleScrollToExamples}
              landingConfig={activeLandingConfig}
              activeSlug={activeSlug}
              onNavigateToPlatform={handleNavigateToPlatform}
            />

            {/* Bio Generator Form */}
            <BioGeneratorForm
              initialData={formTemplateData}
              onBiosGenerated={handleBiosGenerated}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* Generated Results Section (if any bios exist) */}
            {bios.length > 0 && (
              <ResultsSection
                bios={bios}
                lastInputUsed={lastInputUsed}
                onUpdateBio={handleUpdateBio}
                onScrollToForm={handleScrollToGenerator}
              />
            )}

            {/* How It Works Section */}
            <HowItWorksSection onScrollToGenerator={handleScrollToGenerator} />

            {/* In-Depth SEO Content & Authority Breakdown */}
            <SeoContentSection
              onScrollToGenerator={handleScrollToGenerator}
              onNavigateToPost={(slug) => handleNavigateToPage('blog', slug)}
            />

            {/* Platform Limits & Documentation Guide */}
            <PlatformLimitsGuide />

            {/* Curated Example Bios Section */}
            <ExampleBiosSection onSelectExample={handleSelectExample} />

            {/* FAQ Section */}
            <FAQSection
              extraFaqs={activeLandingConfig?.tailoredFaqs}
              platformSlug={activeSlug}
              onNavigateToFaqDirectory={() => handleNavigateToPage('faq')}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={(type) => setModalType(type)}
        onNavigateToPlatform={handleNavigateToPlatform}
        onNavigateToPage={handleNavigateToPage}
      />

      {/* Modals */}
      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </div>
  );
}
