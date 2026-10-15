import React, { useState, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BioGeneratorForm } from './components/BioGeneratorForm.tsx';
import { ResultsSection } from './components/ResultsSection.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { ExampleBiosSection } from './components/ExampleBiosSection.tsx';
import { PlatformLimitsGuide } from './components/PlatformLimitsGuide.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import { GeneratedBio, BioFormInput } from './types/bio.ts';
import { countGraphemes } from './utils/bioUtils.ts';

export default function App() {
  const [bios, setBios] = useState<GeneratedBio[]>([]);
  const [lastInputUsed, setLastInputUsed] = useState<BioFormInput | null>(null);
  const [formTemplateData, setFormTemplateData] = useState<BioFormInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'feedback' | null>(null);

  const handleScrollToGenerator = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus on the required profession field
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Sticky Navigation */}
      <Header onScrollToGenerator={handleScrollToGenerator} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToGenerator={handleScrollToGenerator}
          onScrollToExamples={handleScrollToExamples}
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

        {/* Platform Limits & Documentation Guide */}
        <PlatformLimitsGuide />

        {/* Curated Example Bios Section */}
        <ExampleBiosSection onSelectExample={handleSelectExample} />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenModal={(type) => setModalType(type)} />

      {/* Modals */}
      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </div>
  );
}
