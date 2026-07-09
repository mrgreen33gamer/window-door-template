// src/app/robots.ts
// Arctic Air HVAC — robots.ts
// Explicitly allows all major AI crawlers (best practice 2026 for GEO/LLM visibility)
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin'],
      },
      // ── AI Crawlers — explicitly allowed for GEO visibility ────────────────
      { userAgent: 'GPTBot',            allow: '/' },
      { userAgent: 'OAI-SearchBot',     allow: '/' },
      { userAgent: 'ChatGPT-User',      allow: '/' },
      { userAgent: 'ClaudeBot',         allow: '/' },
      { userAgent: 'anthropic-ai',      allow: '/' },
      { userAgent: 'Google-Extended',   allow: '/' },
      { userAgent: 'PerplexityBot',     allow: '/' },
      { userAgent: 'Grok',              allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'cohere-ai',         allow: '/' },
    ],
    sitemap: 'https://www.arcticairhvac.com/sitemap.xml',
  };
}
