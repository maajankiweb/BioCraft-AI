import { PlatformKey, BioTone, OutputLanguage } from '../types/bio.ts';

export interface LandingPageConfig {
  slug: string;
  platform: PlatformKey;
  navLabel: string;
  shortName: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalPath: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroDescription: string;
  defaultTone: BioTone;
  defaultLanguage: OutputLanguage;
  characterLimitBadge: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  tailoredFaqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  'instagram-bio-generator': {
    slug: 'instagram-bio-generator',
    platform: 'instagram',
    navLabel: 'Instagram Bios',
    shortName: 'Instagram',
    pageTitle: 'Free AI Instagram Bio Generator (150 Chars) | BioCraft AI',
    metaDescription: 'Generate aesthetic, witty, or professional Instagram bios under the 150-character limit with Gemini AI. Includes emojis and line breaks. 100% free with no sign-up.',
    keywords: 'instagram bio generator, aesthetic instagram bio, ig bio maker, instagram bio ideas with emojis, free instagram bio generator',
    canonicalPath: '/instagram-bio-generator',
    heroBadge: 'Optimized for Instagram Profiles & Influencers',
    heroTitlePrefix: 'Free AI ',
    heroTitleHighlight: 'Instagram Bio',
    heroTitleSuffix: 'Generator',
    heroDescription: 'Craft catchy, aesthetic, and high-converting Instagram bios strictly under the 150-character limit. Perfect for creators, brands, and personal profiles.',
    defaultTone: 'Aesthetic',
    defaultLanguage: 'English',
    characterLimitBadge: '150 Character Limit',
    highlights: [
      { title: 'Strict 150-Char Ceiling', description: 'Grapheme-counted so you never get cut off on Instagram.' },
      { title: 'Aesthetic & Emojis', description: 'Curated emoji pairings and clean line-break formats.' },
      { title: 'Zero Signup Required', description: 'Generate unlimited variations instantly and copy with 1 click.' },
    ],
    tailoredFaqs: [
      {
        question: 'What is the maximum character limit for an Instagram bio?',
        answer: 'Instagram enforces a strict limit of 150 characters (including spaces and emojis). BioCraft AI continuously verifies character counts using grapheme clustering so your bio fits on the first try.',
      },
      {
        question: 'How do I add line breaks in my Instagram bio?',
        answer: 'BioCraft AI automatically structures your bio with clean line breaks. When you click "Copy", the exact formatting with line breaks is preserved for pasting directly into the Instagram app.',
      },
      {
        question: 'Can I include a Call to Action (CTA) in my Instagram bio?',
        answer: 'Yes! You can enter custom CTA text (like "Check the link below" or "DM for collabs"), and BioCraft AI will integrate it smoothly without exceeding the 150-character limit.',
      },
    ],
  },

  'linkedin-bio-generator': {
    slug: 'linkedin-bio-generator',
    platform: 'linkedin',
    navLabel: 'LinkedIn Headlines',
    shortName: 'LinkedIn',
    pageTitle: 'Free AI LinkedIn Headline & Summary Generator | BioCraft AI',
    metaDescription: 'Create high-impact LinkedIn headlines (under 220 chars) and summaries that attract recruiters and clients. Powered by Google Gemini AI with zero fluff.',
    keywords: 'linkedin bio generator, linkedin headline generator, professional bio generator, linkedin summary generator, executive bio ai',
    canonicalPath: '/linkedin-bio-generator',
    heroBadge: 'Recruiter-Optimized & Career-Focused Copy',
    heroTitlePrefix: 'AI ',
    heroTitleHighlight: 'LinkedIn Headline & Bio',
    heroTitleSuffix: 'Generator',
    heroDescription: 'Transform your LinkedIn profile into a recruiter magnet. Generate punchy, value-driven headlines and summaries that showcase your credentials and impact.',
    defaultTone: 'Confident',
    defaultLanguage: 'English',
    characterLimitBadge: '220 Chars Headline Limit',
    highlights: [
      { title: 'Recruiter Search Ready', description: 'Naturally integrates key skills and industry buzzwords.' },
      { title: '220-Char Headline Sync', description: 'Perfect fit for desktop and mobile LinkedIn header views.' },
      { title: 'Zero Hallucinations', description: 'Only formats facts you provide—no false accolades.' },
    ],
    tailoredFaqs: [
      {
        question: 'What is the character limit for a LinkedIn headline?',
        answer: 'LinkedIn headlines allow up to 220 characters. BioCraft AI keeps your headline concise, keyword-rich, and within the 220-character limit so recruiters see your full title on mobile.',
      },
      {
        question: 'Can I use this for my LinkedIn About / Summary section?',
        answer: 'Yes! You can use the generated copy directly as your opening elevator pitch in your LinkedIn About section, or switch the platform setting to Website/Portfolio for longer summary intros.',
      },
      {
        question: 'How does BioCraft AI ensure professional tone?',
        answer: 'BioCraft AI uses specialized prompting to avoid cringe marketing clichés. It frames your achievements, technical stack, and value proposition cleanly.',
      },
    ],
  },

  'tiktok-bio-generator': {
    slug: 'tiktok-bio-generator',
    platform: 'tiktok',
    navLabel: 'TikTok Bios',
    shortName: 'TikTok',
    pageTitle: 'Free AI TikTok Bio Generator (80 Chars Max) | BioCraft AI',
    metaDescription: 'Generate viral, funny, and aesthetic TikTok bios that fit the strict 80-character limit. Fast, free, and designed for creator conversion.',
    keywords: 'tiktok bio generator, aesthetic tiktok bio, funny tiktok bio, short bio generator, tiktok profile bio ideas',
    canonicalPath: '/tiktok-bio-generator',
    heroBadge: 'Designed for Viral Creators & Fast Hooks',
    heroTitlePrefix: 'Free AI ',
    heroTitleHighlight: 'TikTok Bio',
    heroTitleSuffix: 'Generator',
    heroDescription: 'TikTok only gives you 80 characters. BioCraft AI crafts hyper-concise, funny, or aesthetic bios that grab attention and drive link clicks on the FYP.',
    defaultTone: 'Creative',
    defaultLanguage: 'English',
    characterLimitBadge: '80 Chars Strict Limit',
    highlights: [
      { title: '80-Character Precision', description: 'Built specifically for TikTok’s extremely tight character constraint.' },
      { title: 'Punchy & Viral Hooks', description: 'Designed to turn casual viewers into loyal followers.' },
      { title: '1-Click Clipboard Copy', description: 'Copy and paste straight into the TikTok mobile app.' },
    ],
    tailoredFaqs: [
      {
        question: 'Why is TikTok bio limit so short?',
        answer: 'TikTok limits profile bios to only 80 characters to keep mobile profiles clean and fast to read. BioCraft AI ensures every character packs maximum punch.',
      },
      {
        question: 'Can I use emojis in my TikTok bio?',
        answer: 'Yes! Note that emojis count toward the 80-character limit. Our tool uses proper grapheme clustering to prevent your emojis from pushing you over the limit.',
      },
    ],
  },

  'twitter-bio-generator': {
    slug: 'twitter-bio-generator',
    platform: 'x',
    navLabel: 'Twitter / X Bios',
    shortName: 'X (Twitter)',
    pageTitle: 'Free AI Twitter / X Bio Generator (160 Chars) | BioCraft AI',
    metaDescription: 'Generate witty, authoritative, and minimalist Twitter / X bios under 160 characters. Boost follower growth with smart AI copywriting.',
    keywords: 'twitter bio generator, x bio generator, funny twitter bio, tech twitter bio maker, free x bio ai',
    canonicalPath: '/twitter-bio-generator',
    heroBadge: 'Built for Tech, Founders & Thought Leaders',
    heroTitlePrefix: 'AI ',
    heroTitleHighlight: 'Twitter / X Bio',
    heroTitleSuffix: 'Generator',
    heroDescription: 'Craft sharp, punchy X/Twitter bios that capture your niche authority within 160 characters. Ideal for founders, engineers, creators, and journalists.',
    defaultTone: 'Minimalist',
    defaultLanguage: 'English',
    characterLimitBadge: '160 Character Limit',
    highlights: [
      { title: '160 Chars Exact', description: 'Matches Twitter / X desktop and mobile profile limits.' },
      { title: 'Niche Authority', description: 'Balanced blend of what you build, what you write, and how to reach you.' },
      { title: 'Multiple Archetypes', description: 'Choose from Minimalist, Confident, Funny, or Creative.' },
    ],
    tailoredFaqs: [
      {
        question: 'What is the limit for a Twitter / X bio?',
        answer: 'Twitter / X allows a maximum of 160 characters for your profile bio. BioCraft AI guarantees every suggested option stays strictly within 160 characters.',
      },
      {
        question: 'Should I put hashtags in my X / Twitter bio?',
        answer: 'Generally, 0 to 1 relevant hashtag is recommended. BioCraft AI focuses on high-impact wording rather than spammy hashtag walls so your bio looks authoritative.',
      },
    ],
  },

  'youtube-bio-generator': {
    slug: 'youtube-bio-generator',
    platform: 'youtube',
    navLabel: 'YouTube Channel',
    shortName: 'YouTube',
    pageTitle: 'Free AI YouTube Channel About & Bio Generator | BioCraft AI',
    metaDescription: 'Generate engaging YouTube channel descriptions and About sections with AI. Include channel schedule, niche keywords, and subscriber CTAs.',
    keywords: 'youtube bio generator, youtube about description generator, youtube channel bio, channel description ai maker',
    canonicalPath: '/youtube-bio-generator',
    heroBadge: 'SEO-Optimized for Video Creators & Channel Growth',
    heroTitlePrefix: 'Free AI ',
    heroTitleHighlight: 'YouTube About',
    heroTitleSuffix: 'Generator',
    heroDescription: 'Turn video viewers into loyal channel subscribers. Generate clear, structured YouTube About descriptions complete with content focus, upload schedule, and links.',
    defaultTone: 'Inspirational',
    defaultLanguage: 'English',
    characterLimitBadge: 'Up to 1,000 Chars',
    highlights: [
      { title: 'Channel SEO Friendly', description: 'Embeds your niche keywords naturally for YouTube search discovery.' },
      { title: 'Upload Schedule Framing', description: 'Prominently features when your audience can expect new videos.' },
      { title: 'Clear Subscriber CTA', description: 'Encourages viewers to hit subscribe and join your community.' },
    ],
    tailoredFaqs: [
      {
        question: 'How long can a YouTube channel description be?',
        answer: 'YouTube permits up to 1,000 characters for your channel About description. BioCraft AI provides structured paragraphs highlighting your channel theme and upload schedule.',
      },
      {
        question: 'Does a YouTube channel description help with SEO?',
        answer: 'Yes! YouTube search indexes the keywords in your channel About page. Including your core topics helps YouTube recommend your channel to interested viewers.',
      },
    ],
  },

  'hinglish-bio-generator': {
    slug: 'hinglish-bio-generator',
    platform: 'instagram',
    navLabel: 'Hinglish & Hindi',
    shortName: 'Hinglish & Hindi',
    pageTitle: 'Free AI Hinglish & Hindi Bio Generator for Instagram & X | BioCraft AI',
    metaDescription: 'Create stylish Hinglish and Hindi bios for Instagram, Facebook, and X. Stand out with relatable desi slang, attitude bios, and modern conversational charm.',
    keywords: 'hinglish bio generator, hindi bio for instagram, attitude bio generator in hindi, cool desi bio maker, aesthetic hindi bio',
    canonicalPath: '/hinglish-bio-generator',
    heroBadge: "India's #1 Dedicated Hinglish Bio Creator",
    heroTitlePrefix: 'AI ',
    heroTitleHighlight: 'Hinglish & Hindi Bio',
    heroTitleSuffix: 'Generator',
    heroDescription: 'Ditch boring bios. Generate authentic, relatable bios written in Latin-script Hinglish or Devanagari Hindi. Perfect for creators, entrepreneurs, and students across India.',
    defaultTone: 'Creative',
    defaultLanguage: 'Hinglish',
    characterLimitBadge: 'Native Hindi & Hinglish',
    highlights: [
      { title: 'Relatable Desi Slang', description: 'Natural Hinglish phrased the way young India talks.' },
      { title: 'Devanagari or Latin Script', description: 'Choose conversational Hinglish or pure Hindi.' },
      { title: 'Platform Limit Aware', description: '150 chars for Instagram, 160 for X, and 80 for TikTok.' },
    ],
    tailoredFaqs: [
      {
        question: 'What is a Hinglish bio?',
        answer: 'A Hinglish bio blends Hindi vocabulary with English words, written using the standard English/Latin alphabet. It is the most popular conversational style on Instagram in India.',
      },
      {
        question: 'Can I generate a bio in pure Hindi (Devanagari script)?',
        answer: 'Yes! BioCraft AI allows you to select either pure Hindi (with Devanagari script) or Hinglish from the language dropdown.',
      },
    ],
  },
};

export const LANDING_PAGE_SLUGS = Object.keys(LANDING_PAGES);
