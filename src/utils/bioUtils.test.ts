import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countGraphemes,
  validateBioInput,
  getPlatformLimit,
  getCharacterStatus,
  buildBioPrompt,
  formatDownloadText,
  PLATFORM_CONFIGS,
} from './bioUtils.ts';
import type { BioFormInput, GeneratedBio } from '../types/bio.ts';

test('countGraphemes handles standard ASCII strings', () => {
  assert.equal(countGraphemes(''), 0);
  assert.equal(countGraphemes('Hello World'), 11);
});

test('countGraphemes handles multi-byte emoji properly', () => {
  // Single emoji should count as 1 character in grapheme cluster counting
  assert.equal(countGraphemes('✨'), 1);
  assert.equal(countGraphemes('Coder 🚀'), 7);
});

test('validateBioInput requires profession', () => {
  const result = validateBioInput({ profession: '' });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.profession);
});

test('validateBioInput passes with valid inputs', () => {
  const result = validateBioInput({
    profession: 'Full-Stack Engineer',
    name: 'Alex Rivera',
    skills: 'TypeScript, React, Node.js',
    description: 'Building AI tools for modern developers.',
    callToAction: 'DM for collaborations',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateBioInput rejects overly long fields', () => {
  const longText = 'a'.repeat(150);
  const result = validateBioInput({ profession: longText });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.profession);
});

test('getPlatformLimit returns correct limit for Instagram and YouTube', () => {
  const insta = getPlatformLimit('instagram');
  assert.equal(insta.charLimit, 150);
  assert.equal(insta.name, 'Instagram');

  const yt = getPlatformLimit('youtube');
  assert.equal(yt.charLimit, 1000);
});

test('getCharacterStatus calculates safe, warning, and danger thresholds', () => {
  const limit = 100;
  assert.equal(getCharacterStatus(50, limit).status, 'safe');
  assert.equal(getCharacterStatus(92, limit).status, 'warning');
  assert.equal(getCharacterStatus(105, limit).status, 'danger');
});

test('buildBioPrompt includes critical platform limit and tone constraints', () => {
  const sampleInput: BioFormInput = {
    name: 'Priya Sharma',
    profession: 'UI/UX Designer',
    skills: 'Figma, Design Systems',
    description: 'Obsessed with micro-interactions',
    platform: 'instagram',
    tone: 'Creative',
    language: 'English',
    optionsCount: 3,
    callToAction: 'DM for projects',
    emojiPreference: 'minimal',
  };

  const { systemPrompt, userPrompt } = buildBioPrompt(sampleInput);
  assert.ok(systemPrompt.includes('150'));
  assert.ok(systemPrompt.includes('Instagram'));
  assert.ok(userPrompt.includes('UI/UX Designer'));
  assert.ok(userPrompt.includes('Creative'));
});

test('formatDownloadText formats exported text cleanly', () => {
  const bios: GeneratedBio[] = [
    {
      id: '1',
      bio: 'Crafting pixel-perfect designs. ✨',
      style: 'Punchy',
      characterCount: 34,
      platform: 'instagram',
    },
  ];
  const output = formatDownloadText(bios, { profession: 'Designer' });
  assert.ok(output.includes('BioCraft AI'));
  assert.ok(output.includes('Crafting pixel-perfect designs'));
  assert.ok(output.includes('Designer'));
});
