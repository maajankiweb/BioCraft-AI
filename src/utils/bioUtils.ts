import type { PlatformKey, PlatformConfig, BioFormInput, GeneratedBio } from '../types/bio.ts';

export const PLATFORM_CONFIGS: Record<PlatformKey, PlatformConfig> = {
  instagram: {
    key: 'instagram',
    name: 'Instagram',
    charLimit: 150,
    docSource: 'Meta Instagram Help Center',
    verifiedDate: 'October 2024',
    description: 'Profile bio. Concise, vertical line breaks, high visual punch.',
    iconName: 'Instagram',
    formatGuide: 'Keep under 150 characters. Use crisp bullet points or tight clauses. Leave room for a link.',
  },
  linkedin: {
    key: 'linkedin',
    name: 'LinkedIn',
    charLimit: 220,
    docSource: 'LinkedIn Help Center (Headline Limit)',
    verifiedDate: 'October 2024',
    description: 'Professional headline & short value proposition.',
    iconName: 'Linkedin',
    formatGuide: 'Keep under 220 characters. Highlight role, domain impact, and measurable value proposition.',
  },
  youtube: {
    key: 'youtube',
    name: 'YouTube',
    charLimit: 1000,
    docSource: 'YouTube Studio Help (Channel About)',
    verifiedDate: 'September 2024',
    description: 'Channel About description & upload schedule.',
    iconName: 'Youtube',
    formatGuide: 'Supports up to 1000 characters. Clarify what viewers learn, why subscribe, and upload schedule.',
  },
  tiktok: {
    key: 'tiktok',
    name: 'TikTok',
    charLimit: 80,
    docSource: 'TikTok Creator Guidelines',
    verifiedDate: 'October 2024',
    description: 'Ultra-concise hook & niche statement.',
    iconName: 'Video',
    formatGuide: 'Strict 80 characters limit. Needs an immediate punchy hook and clear niche.',
  },
  x: {
    key: 'x',
    name: 'X (Twitter)',
    charLimit: 160,
    docSource: 'X Help Center (Bio Specifications)',
    verifiedDate: 'September 2024',
    description: 'Fast, witty, or authoritative profile bio.',
    iconName: 'Twitter',
    formatGuide: '160 character limit. Great for witty statements, current builds, tags, or domain authority.',
  },
  facebook: {
    key: 'facebook',
    name: 'Facebook',
    charLimit: 101,
    docSource: 'Facebook Profile Intro Documentation',
    verifiedDate: 'September 2024',
    description: 'Personal profile intro / page quick bio.',
    iconName: 'Facebook',
    formatGuide: 'Strict 101 character limit for intro field. Short, friendly snapshot.',
  },
  website: {
    key: 'website',
    name: 'Personal Website',
    charLimit: 600,
    docSource: 'Web Design & Portfolio Bio Best Practices',
    verifiedDate: 'October 2024',
    description: 'Expanded founder, developer, or creator biography.',
    iconName: 'Globe',
    formatGuide: 'Recommended 300–600 characters. Perfect for about sections, hero cards, or press kits.',
  },
};

/**
 * Counts characters accurately.
 * Uses Array.from or Intl.Segmenter for grapheme cluster counting when available.
 */
export function countGraphemes(text: string): number {
  if (!text) return 0;
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text)).length;
  }
  return Array.from(text).length;
}

export function getPlatformLimit(platform: PlatformKey): PlatformConfig {
  return PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.instagram;
}

export function getCharacterStatus(count: number, limit: number): {
  status: 'safe' | 'warning' | 'danger';
  percent: number;
  remaining: number;
} {
  const remaining = limit - count;
  const percent = Math.min(100, Math.round((count / limit) * 100));

  if (count > limit) {
    return { status: 'danger', percent: 100, remaining };
  }
  if (count >= limit * 0.88) {
    return { status: 'warning', percent, remaining };
  }
  return { status: 'safe', percent, remaining };
}

export function validateBioInput(input: Partial<BioFormInput>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.profession || input.profession.trim().length === 0) {
    errors.profession = 'Profession or identity is required (e.g. Full-Stack Engineer, Content Creator).';
  } else if (input.profession.trim().length > 120) {
    errors.profession = 'Profession must be 120 characters or fewer.';
  }

  if (input.name && input.name.length > 60) {
    errors.name = 'Name must be 60 characters or fewer.';
  }

  if (input.skills && input.skills.length > 250) {
    errors.skills = 'Skills and interests must be 250 characters or fewer.';
  }

  if (input.description && input.description.length > 600) {
    errors.description = 'Personal description must be 600 characters or fewer.';
  }

  if (input.callToAction && input.callToAction.length > 100) {
    errors.callToAction = 'Call to action must be 100 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildBioPrompt(input: BioFormInput): {
  systemPrompt: string;
  userPrompt: string;
} {
  const platform = getPlatformLimit(input.platform);

  const systemPrompt = `You are an elite biographical copywriter and social media strategist.
Your task is to generate distinct, platform-optimized, and captivating bios based strictly on the user's provided information.

CRITICAL INSTRUCTIONS:
1. FAITHFUL TO USER DETAILS: Do NOT fabricate qualifications, fake companies, fake job titles, or unsupported claims. Use only what the user entered.
2. PLATFORM TARGET: ${platform.name}.
   - Character limit constraint: STRICT MAXIMUM ${platform.charLimit} characters.
   - Platform format: ${platform.formatGuide}
   - For Instagram/TikTok/X: must be punchy, high conversion, fit inside character limits.
   - For LinkedIn: professional, clear domain authority, value proposition.
   - For YouTube: channel description, clear viewer value, upload info if provided.
   - For Website: cohesive bio paragraph suitable for About section.
3. TONE: ${input.tone}. Ensure the personality shines through authentically.
4. LANGUAGE: ${input.language}.
   - If 'English': natural, modern English.
   - If 'Hindi': authentic Devnagari Hindi or natural contemporary Hindi.
   - If 'Hinglish': popular Latin-script conversational blend of Hindi & English as used on social media (e.g., "Code likhna aur coffee peena is my therapy").
5. EMOJI PREFERENCE: ${input.emojiPreference}.
   - 'none': Zero emojis.
   - 'minimal': Exactly 1-2 tastefully placed emojis.
   - 'creative': 3-5 relevant, expressive emojis.
6. VARIATIONS: Provide exactly ${input.optionsCount} distinct variations with different phrasing styles (e.g., 'Punchy & Direct', 'Storyteller', 'Bullet Points', 'Elevator Pitch', 'Creative Hook').
7. RETURN STRICT JSON ONLY according to the schema provided. No markdown code blocks, no extraneous text.`;

  const userPromptParts = [
    input.name?.trim() ? `User Name: ${input.name.trim()}` : null,
    `Profession / Identity: ${input.profession.trim()}`,
    input.skills?.trim() ? `Skills & Interests: ${input.skills.trim()}` : null,
    input.description?.trim() ? `Background / Description: ${input.description.trim()}` : null,
    input.callToAction?.trim() ? `Call To Action: ${input.callToAction.trim()}` : null,
    `Target Platform: ${platform.name} (Limit: ${platform.charLimit} chars)`,
    `Tone: ${input.tone}`,
    `Language: ${input.language}`,
    `Emoji Level: ${input.emojiPreference}`,
    `Number of options requested: ${input.optionsCount}`,
  ].filter(Boolean);

  const userPrompt = `Generate ${input.optionsCount} distinct bio options for the following profile:\n\n${userPromptParts.join('\n')}`;

  return { systemPrompt, userPrompt };
}

export function formatDownloadText(bios: GeneratedBio[], input?: Partial<BioFormInput>): string {
  const timestamp = new Date().toISOString().split('T')[0];
  const platformName = bios[0]?.platform ? PLATFORM_CONFIGS[bios[0].platform]?.name : 'Social Media';

  let output = `========================================\n`;
  output += `BioCraft AI — Generated Bios\n`;
  output += `Platform: ${platformName}\n`;
  output += `Date: ${timestamp}\n`;
  if (input?.profession) {
    output += `Profile: ${input.profession}\n`;
  }
  output += `========================================\n\n`;

  bios.forEach((b, index) => {
    output += `[Option ${index + 1}: ${b.style}] (${b.characterCount} chars)\n`;
    output += `----------------------------------------\n`;
    output += `${b.bio}\n\n`;
  });

  output += `Generated with BioCraft AI (https://biocraft.ai)\n`;
  return output;
}
