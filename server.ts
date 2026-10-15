import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { buildBioPrompt, countGraphemes, validateBioInput, PLATFORM_CONFIGS } from './src/utils/bioUtils.ts';
import type { BioFormInput, GeneratedBio, PlatformKey } from './src/types/bio.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Basic request body limits
app.use(express.json({ limit: '512kb' }));

// In-memory rate limiting: max 25 requests per 5 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 25;

  const record = rateLimits.get(ip);
  if (!record || now > record.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up stale rate limits every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimits.entries()) {
    if (now > record.resetTime) {
      rateLimits.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'BioCraft AI',
    hasApiKey: Boolean(apiKey && apiKey.length > 5),
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/generate-bios', async (req: Request, res: Response): Promise<void> => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: 'Rate limit exceeded. Please wait a few minutes before generating more bios.',
    });
    return;
  }

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '' || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is configured in your environment or Secrets panel in AI Studio.',
    });
    return;
  }

  const input: BioFormInput = req.body;

  // Server-side validation
  const validation = validateBioInput(input);
  if (!validation.isValid) {
    res.status(400).json({
      error: 'Validation failed',
      details: validation.errors,
    });
    return;
  }

  const validPlatforms: PlatformKey[] = ['instagram', 'linkedin', 'youtube', 'tiktok', 'x', 'facebook', 'website'];
  if (!validPlatforms.includes(input.platform)) {
    res.status(400).json({ error: 'Invalid platform selected.' });
    return;
  }

  const allowedCounts = [3, 5, 10];
  const requestedCount = allowedCounts.includes(Number(input.optionsCount)) ? Number(input.optionsCount) : 3;
  input.optionsCount = requestedCount as 3 | 5 | 10;

  const startTime = Date.now();

  try {
    const { systemPrompt, userPrompt } = buildBioPrompt(input);

    let response;
    let attempts = 0;
    const maxAttempts = 3;
    let lastError: unknown = null;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.85,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              description: `Array of exactly ${requestedCount} distinct bio options.`,
              items: {
                type: Type.OBJECT,
                properties: {
                  bio: {
                    type: Type.STRING,
                    description: 'The complete generated bio text.',
                  },
                  style: {
                    type: Type.STRING,
                    description: 'Short style archetype, e.g. "Punchy & Direct", "Value-Driven", "Storyteller", "Creative Hook".',
                  },
                },
                required: ['bio', 'style'],
              },
            },
          },
        });
        if (response && response.text) break;
      } catch (err: unknown) {
        lastError = err;
        const errMsg = err instanceof Error ? err.message : String(err);
        const isTransient = errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('high demand') || errMsg.includes('429');
        if (isTransient && attempts < maxAttempts) {
          // Wait 1.5s before retry
          await new Promise((resolve) => setTimeout(resolve, 1500 * attempts));
          continue;
        }
        throw err;
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('No response received from Gemini');
    }

    const rawText = response.text?.trim() || '[]';
    let parsed: Array<{ bio?: string; style?: string }> = [];

    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Fallback extraction if model enclosed inside code fences
      const match = rawText.match(/\[[\s\S]*\]/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse AI JSON response');
      }
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error('AI returned an empty list of bios. Please try again.');
    }

    const platformConfig = PLATFORM_CONFIGS[input.platform];

    // Format & validate each bio
    const bios: GeneratedBio[] = parsed.slice(0, requestedCount).map((item, index) => {
      let bioText = (item.bio || '').trim();
      const styleName = (item.style || `Variation ${index + 1}`).trim();

      // Ensure platform limit integrity
      let charLen = countGraphemes(bioText);
      if (charLen > platformConfig.charLimit) {
        // If slightly over due to model variation, trim to clean boundary
        const words = bioText.split(' ');
        while (countGraphemes(words.join(' ')) > platformConfig.charLimit && words.length > 1) {
          words.pop();
        }
        bioText = words.join(' ');
        charLen = countGraphemes(bioText);
      }

      return {
        id: `bio-${Date.now()}-${index + 1}`,
        bio: bioText,
        style: styleName,
        characterCount: charLen,
        platform: input.platform,
      };
    });

    const duration = Date.now() - startTime;

    res.json({
      bios,
      count: bios.length,
      generationTimeMs: duration,
      modelUsed: 'gemini-3.8-flash',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown generation error';
    console.error('Gemini generation error:', err);
    res.status(500).json({
      error: 'Bio generation failed. Please check your internet connection or try again in a moment.',
      details: errorMsg,
    });
  }
});

// Startup Dev vs Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BioCraft AI server active on http://0.0.0.0:${PORT}`);
  });
}

// Only start the standalone listener if not running in a Vercel serverless environment
if (process.env.VERCEL !== '1') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export { app };
export default app;
