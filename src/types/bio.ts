export type PlatformKey =
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'x'
  | 'facebook'
  | 'website';

export type BioTone =
  | 'Professional'
  | 'Creative'
  | 'Funny'
  | 'Minimalist'
  | 'Aesthetic'
  | 'Confident'
  | 'Inspirational';

export type OutputLanguage = 'English' | 'Hindi' | 'Hinglish';

export type EmojiPreference = 'none' | 'minimal' | 'creative';

export type OptionCount = 3 | 5 | 10;

export interface PlatformConfig {
  key: PlatformKey;
  name: string;
  charLimit: number;
  docSource: string;
  verifiedDate: string;
  description: string;
  iconName: string;
  formatGuide: string;
}

export interface BioFormInput {
  name: string;
  profession: string;
  skills: string;
  description: string;
  platform: PlatformKey;
  tone: BioTone;
  language: OutputLanguage;
  optionsCount: OptionCount;
  callToAction: string;
  emojiPreference: EmojiPreference;
}

export interface GeneratedBio {
  id: string;
  bio: string;
  style: string;
  characterCount: number;
  platform: PlatformKey;
}

export interface GenerateBioResponse {
  bios: GeneratedBio[];
  generationTimeMs?: number;
  modelUsed?: string;
}

export interface ExampleProfile {
  id: string;
  role: string;
  badge: string;
  data: BioFormInput;
  sampleBio: string;
  sampleStyle: string;
}
