export type FaqCategory =
  | 'general'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'twitter'
  | 'youtube'
  | 'hinglish'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'technical';

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational' | 'technical';

export interface FAQRecord {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer?: string;
  category: FaqCategory;
  searchIntent: SearchIntent;
  relatedLinks?: Array<{ label: string; url: string }>;
  verifiedDate: string;
}

export const CENTRAL_FAQS: FAQRecord[] = [
  // ==================== GENERAL / HOMEPAGE ====================
  {
    id: 'gen-01',
    question: 'What is BioCraft AI and how does it generate social media bios?',
    shortAnswer:
      'BioCraft AI is a free AI copywriting tool powered by Google Gemini 3.8 Flash that creates high-converting bios and headlines for Instagram, LinkedIn, TikTok, YouTube, and X. It uses international grapheme clustering to strictly enforce platform character limits with zero hallucinated credentials.',
    detailedAnswer:
      'Unlike general-purpose chatbots that produce text exceeding character boundaries, BioCraft AI calculates user-perceived emoji and glyph boundaries so your generated bio pastes into your destination profile without truncation.',
    category: 'general',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'Try Bio Generator', url: '/' },
      { label: 'About BioCraft AI', url: '/about' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'gen-02',
    question: 'Is BioCraft AI really free, and is an account or credit card required?',
    shortAnswer:
      'BioCraft AI is 100% free with no account creation, login, or credit card required. You can generate unlimited bio variations, tweak them using the inline editor, and copy them directly to your clipboard in seconds.',
    detailedAnswer:
      'There are no hidden subscriptions, paywalls, or locked features. We built this as an accessible, public web utility for digital creators, founders, and professionals.',
    category: 'general',
    searchIntent: 'transactional',
    relatedLinks: [
      { label: 'Platform Tools', url: '/' },
      { label: 'Terms of Use', url: '/terms' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'gen-03',
    question: 'Which social media platforms does BioCraft AI support?',
    shortAnswer:
      'BioCraft AI supports 7 destinations: Instagram (150 chars), LinkedIn Headlines (220 chars), TikTok (80 chars), Twitter / X (160 chars), YouTube Channel About (1,000 chars), Facebook Profile Intro (101 chars), and Websites/Portfolios (600 chars). Each limit is strictly enforced.',
    category: 'general',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'Platform Limits Guide', url: '/#platform-limits' },
      { label: 'Instagram Generator', url: '/instagram-bio-generator' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'gen-04',
    question: 'Can I generate social bios in Hindi and Hinglish?',
    shortAnswer:
      'Yes. In addition to standard English, BioCraft AI provides native support for pure Devanagari Hindi and modern conversational Hinglish (Hindi written in Latin script with desi slang and natural rhythm) tailored for 600M+ digital creators across South Asia.',
    category: 'general',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'Hinglish & Hindi Generator', url: '/hinglish-bio-generator' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'gen-05',
    question: 'Can I edit the generated bios before copying them?',
    shortAnswer:
      'Yes. Every generated bio card includes an interactive "Edit" button. When you modify words or emojis, the live grapheme counter recalculates your character count in real time to ensure you never exceed the platform ceiling.',
    detailedAnswer:
      'You can also copy any single bio with 1-click or export all generated options as a formatted text file (.txt) for backup.',
    category: 'general',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'How It Works', url: '/#how-it-works' }],
    verifiedDate: 'October 2026',
  },

  // ==================== INSTAGRAM ====================
  {
    id: 'ig-01',
    question: 'What is the maximum character limit for an Instagram bio in 2026?',
    shortAnswer:
      'Instagram enforces a strict limit of 150 characters for profile bios. This includes all letters, numbers, punctuation, spaces, and multi-byte emojis.',
    detailedAnswer:
      'Because Instagram counts characters strictly, exceeding 150 characters results in an error message or cuts off your call to action. BioCraft AI guarantees every bio stays at or below 150 characters.',
    category: 'instagram',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'Instagram Bio Generator', url: '/instagram-bio-generator' },
      { label: 'Instagram Bio Limits Playbook', url: '/blog/instagram-bio-limits-guide-2026' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'ig-02',
    question: 'How do emojis affect the Instagram 150-character limit?',
    shortAnswer:
      'In Instagram, most standard emojis count as 1 or 2 visual characters, but complex emojis with skin-tone modifiers or zero-width joiners can consume multiple bytes in UTF-16. BioCraft AI calculates grapheme clusters to ensure multi-byte emojis never push you over the 150-character limit.',
    category: 'instagram',
    searchIntent: 'technical',
    relatedLinks: [{ label: 'Instagram Generator', url: '/instagram-bio-generator' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'ig-03',
    question: 'How do I add line breaks to my Instagram bio without awkward formatting?',
    shortAnswer:
      'BioCraft AI formats candidate bios with clean, mobile-optimized line breaks. When you click "Copy", standard newline characters (\n) are preserved in your clipboard, allowing you to paste directly into the Instagram mobile or desktop editor without needing extra symbols.',
    category: 'instagram',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'Instagram Bio Generator', url: '/instagram-bio-generator' }],
    verifiedDate: 'October 2026',
  },

  // ==================== LINKEDIN ====================
  {
    id: 'li-01',
    question: 'What is the character limit for a LinkedIn headline in 2026?',
    shortAnswer:
      'LinkedIn provides a 220-character limit for personal headlines on desktop and mobile. Your headline is the primary indexed field for recruiter and client searches, making keyword placement critical.',
    detailedAnswer:
      'BioCraft AI crafts headlines that balance relevant industry search keywords, core technical stack, and a concise value proposition within the 220-character allowance.',
    category: 'linkedin',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'LinkedIn Headline Generator', url: '/linkedin-bio-generator' },
      { label: 'LinkedIn Headline Frameworks', url: '/blog/high-converting-linkedin-headlines' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'li-02',
    question: 'How does BioCraft AI avoid corporate buzzwords on LinkedIn?',
    shortAnswer:
      'Our AI prompting architecture strictly filters out vague clichés like "ninja", "guru", "visionary", and "rockstar". Instead, it highlights concrete roles, quantifiable milestones, and specific skills provided in your input.',
    category: 'linkedin',
    searchIntent: 'commercial',
    relatedLinks: [{ label: 'LinkedIn Headline Generator', url: '/linkedin-bio-generator' }],
    verifiedDate: 'October 2026',
  },

  // ==================== TIKTOK ====================
  {
    id: 'tt-01',
    question: 'Why is the TikTok bio limit only 80 characters?',
    shortAnswer:
      'TikTok limits profile bios to exactly 80 characters to optimize mobile viewing speed on the For You Page (FYP). Long paragraphs do not fit on mobile screens, requiring creators to convey their niche and call-to-action in a single punchy sentence.',
    category: 'tiktok',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'TikTok Bio Generator', url: '/tiktok-bio-generator' },
      { label: 'TikTok 80-Char Hook Playbook', url: '/blog/tiktok-bio-optimization-80-characters' },
    ],
    verifiedDate: 'October 2026',
  },
  {
    id: 'tt-02',
    question: 'How can I maximize conversions with only 80 characters on TikTok?',
    shortAnswer:
      'The most effective formula for TikTok is: [What You Create] + [Target Audience] + [Arrow/Emoji pointing to link]. BioCraft AI crafts punchy hooks tailored to this exact 80-character constraint.',
    category: 'tiktok',
    searchIntent: 'commercial',
    relatedLinks: [{ label: 'TikTok Bio Generator', url: '/tiktok-bio-generator' }],
    verifiedDate: 'October 2026',
  },

  // ==================== TWITTER / X ====================
  {
    id: 'tw-01',
    question: 'What is the character limit for a Twitter / X bio?',
    shortAnswer:
      'Twitter / X allows a maximum of 160 characters for your profile bio. This limit applies equally across mobile apps and web browsers.',
    category: 'twitter',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'Twitter / X Bio Generator', url: '/twitter-bio-generator' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'tw-02',
    question: 'What should a tech founder or engineer include in an X bio?',
    shortAnswer:
      'High-performing X bios state: 1) What you are currently building, 2) Your key domain or engineering stack, and 3) What topics you tweet about or your direct messages (DMs) status—all within 160 characters.',
    category: 'twitter',
    searchIntent: 'commercial',
    relatedLinks: [{ label: 'Twitter / X Bio Generator', url: '/twitter-bio-generator' }],
    verifiedDate: 'October 2026',
  },

  // ==================== YOUTUBE ====================
  {
    id: 'yt-01',
    question: 'What is the character limit for a YouTube channel description / About section?',
    shortAnswer:
      'YouTube allows up to 1,000 characters for your channel description. BioCraft AI organizes this space into an engaging hook, your uploading schedule, core topics, and collaboration contact details.',
    category: 'youtube',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'YouTube About Generator', url: '/youtube-bio-generator' }],
    verifiedDate: 'October 2026',
  },

  // ==================== HINGLISH & HINDI ====================
  {
    id: 'hi-01',
    question: 'What is Hinglish copywriting and why is it useful?',
    shortAnswer:
      'Hinglish is the modern, conversational blend of Hindi and English written in Latin script. It is the dominant communication style across Indian social media (Instagram Reels, LinkedIn, Twitter). BioCraft AI writes natural Hinglish that feels authentic rather than like a robotic machine translation.',
    category: 'hinglish',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'Hinglish Bio Generator', url: '/hinglish-bio-generator' },
      { label: 'Hinglish Bio Secrets Playbook', url: '/blog/hinglish-social-media-bio-secrets' },
    ],
    verifiedDate: 'October 2026',
  },

  // ==================== PRIVACY & DATA ====================
  {
    id: 'priv-01',
    question: 'Are my personal details or generated bios saved in a database?',
    shortAnswer:
      'No. BioCraft AI operates on a strict zero-persistence policy. We do not store, log, or persist user names, skills, or generated bios in any database. Everything is processed ephemerally in RAM during the API request and immediately discarded.',
    category: 'privacy',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'Full Privacy Policy', url: '/privacy' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'priv-02',
    question: 'Are my prompts used to train Google AI models?',
    shortAnswer:
      'No. BioCraft AI connects to Google Gemini via standard enterprise API endpoints. Prompts sent through our backend API service are not used by default to train foundational Google AI models, safeguarding your personal identity details.',
    category: 'privacy',
    searchIntent: 'technical',
    relatedLinks: [{ label: 'Privacy Policy', url: '/privacy' }],
    verifiedDate: 'October 2026',
  },

  // ==================== TERMS & OWNERSHIP ====================
  {
    id: 'terms-01',
    question: 'Who owns the bios generated by BioCraft AI?',
    shortAnswer:
      'You own 100% of the bios generated through BioCraft AI. You are free to edit, publish, monetize, and distribute them across any social network or website with zero royalties, licensing fees, or attribution requirements.',
    category: 'terms',
    searchIntent: 'informational',
    relatedLinks: [{ label: 'Terms of Use', url: '/terms' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'terms-02',
    question: 'What happens if a social network changes its character limit?',
    shortAnswer:
      'While we verify platform documentation regularly, social networks may alter their limits at any time. We recommend testing your final bio in your social app profile editor. If you notice a limit change, please report it via our feedback form so we can update our engine immediately.',
    category: 'terms',
    searchIntent: 'informational',
    relatedLinks: [
      { label: 'Report Limit Change', url: '/feedback' },
      { label: 'Terms of Use', url: '/terms' },
    ],
    verifiedDate: 'October 2026',
  },

  // ==================== ABOUT & TECHNICAL ====================
  {
    id: 'tech-01',
    question: 'How does the grapheme cluster counting engine prevent cut-off bios?',
    shortAnswer:
      'Standard JavaScript measures strings by UTF-16 code units, which counts compound emojis like 👩‍💻 as 5 characters instead of 1. BioCraft AI implements international Unicode grapheme segmentation to match platform algorithms exactly, guaranteeing your bio pastes cleanly.',
    category: 'technical',
    searchIntent: 'technical',
    relatedLinks: [{ label: 'About Our Architecture', url: '/about' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'tech-02',
    question: 'Which AI model powers BioCraft AI bio generation?',
    shortAnswer:
      'BioCraft AI is powered by Google Gemini 3.8 Flash. We chose Gemini 3.8 Flash for its exceptional multilingual fluency, sub-800ms generation speed, and strict adherence to negative prompt constraints (anti-hallucination rules).',
    category: 'technical',
    searchIntent: 'technical',
    relatedLinks: [{ label: 'About BioCraft AI', url: '/about' }],
    verifiedDate: 'October 2026',
  },

  // ==================== CONTACT & SUPPORT ====================
  {
    id: 'cont-01',
    question: 'How can I contact the BioCraft AI team for support or partnerships?',
    shortAnswer:
      'You can reach our team directly at support@biocraft.ai or submit a message through our Contact & Support page. We typically respond within 24 business hours (Monday through Friday).',
    category: 'contact',
    searchIntent: 'navigational',
    relatedLinks: [{ label: 'Contact & Support Page', url: '/contact' }],
    verifiedDate: 'October 2026',
  },
  {
    id: 'cont-02',
    question: 'Where can I file a bug report or suggest a new social platform?',
    shortAnswer:
      'You can submit feature ideas and limit updates via our Send Feedback page or directly file an issue on our official open-source GitHub repository at github.com/AshishKmj/BioCraft-AI.',
    category: 'contact',
    searchIntent: 'navigational',
    relatedLinks: [
      { label: 'Send Feedback', url: '/feedback' },
      { label: 'Contact Us', url: '/contact' },
    ],
    verifiedDate: 'October 2026',
  },
];

// Helper functions for filtering and querying
export function getFaqsByCategory(category: FaqCategory): FAQRecord[] {
  return CENTRAL_FAQS.filter((f) => f.category === category);
}

export function getFaqsForPage(page: string): FAQRecord[] {
  if (page === 'instagram-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'instagram' || f.category === 'general');
  }
  if (page === 'linkedin-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'linkedin' || f.category === 'general');
  }
  if (page === 'tiktok-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'tiktok' || f.category === 'general');
  }
  if (page === 'twitter-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'twitter' || f.category === 'general');
  }
  if (page === 'youtube-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'youtube' || f.category === 'general');
  }
  if (page === 'hinglish-bio-generator') {
    return CENTRAL_FAQS.filter((f) => f.category === 'hinglish' || f.category === 'general');
  }
  if (page === 'about') {
    return CENTRAL_FAQS.filter((f) => f.category === 'about' || f.category === 'technical' || f.category === 'general');
  }
  if (page === 'contact') {
    return CENTRAL_FAQS.filter((f) => f.category === 'contact' || f.category === 'general');
  }
  if (page === 'privacy') {
    return CENTRAL_FAQS.filter((f) => f.category === 'privacy' || f.category === 'general');
  }
  if (page === 'terms') {
    return CENTRAL_FAQS.filter((f) => f.category === 'terms' || f.category === 'general');
  }
  // Default home page selection
  return CENTRAL_FAQS.filter((f) => f.category === 'general' || f.category === 'technical').slice(0, 7);
}

export function searchFaqs(query: string, category?: FaqCategory): FAQRecord[] {
  const q = query.toLowerCase().trim();
  return CENTRAL_FAQS.filter((faq) => {
    const matchesCategory = !category || category === 'general' || faq.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.shortAnswer.toLowerCase().includes(q) ||
      (faq.detailedAnswer && faq.detailedAnswer.toLowerCase().includes(q))
    );
  });
}

// Generate valid Schema.org FAQPage JSON-LD object
export function generateFaqSchema(faqs: FAQRecord[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.detailedAnswer ? `${faq.shortAnswer} ${faq.detailedAnswer}` : faq.shortAnswer,
      },
    })),
  };
}
