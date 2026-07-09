// src/app/sitemap.xml/route.ts
// Arctic Air HVAC — XML Sitemap
// Covers: all static pages, all 6 core service pages, all 16 city subpages
import { NextResponse } from 'next/server';
import { getAllPosts } from '&/blog-posts';

export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://www.arcticairhvac.com';
  const today   = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const staticPages = [
    { url: '/',               priority: '1.0',  changefreq: 'weekly'  },
    { url: '/about',          priority: '0.9',  changefreq: 'monthly' },
    { url: '/services',       priority: '0.9',  changefreq: 'weekly'  },
    { url: '/contact',        priority: '0.8',  changefreq: 'monthly' },
    { url: '/blogs',          priority: '0.7',  changefreq: 'weekly'  },
    { url: '/privacy-policy', priority: '0.4',  changefreq: 'yearly'  },
  ];

  // ── Core service pages ─────────────────────────────────────────────────────
  const coreServices = [
    { url: '/services/ac-repair',          priority: '0.95', changefreq: 'weekly'  },
    { url: '/services/heating',            priority: '0.90', changefreq: 'weekly'  },
    { url: '/services/installation',       priority: '0.90', changefreq: 'weekly'  },
    { url: '/services/maintenance',        priority: '0.85', changefreq: 'monthly' },
    { url: '/services/duct-cleaning',      priority: '0.80', changefreq: 'monthly' },
    { url: '/services/indoor-air-quality', priority: '0.80', changefreq: 'monthly' },
  ];

  // ── Cities ─────────────────────────────────────────────────────────────────
  const cities = [
    'waco-tx', 'hewitt-tx', 'woodway-tx', 'robinson-tx',
    'china-spring-tx', 'killeen-tx', 'temple-tx', 'valley-mills-tx',
  ];

  // ── AC Repair city pages ───────────────────────────────────────────────────
  const acRepairCities = cities.map(city => ({
    url: `/services/ac-repair/${city}`,
    priority: city === 'waco-tx' ? '0.90' : '0.85',
    changefreq: 'weekly',
  }));

  // ── Heating city pages ─────────────────────────────────────────────────────
  const heatingCities = cities.map(city => ({
    url: `/services/heating/${city}`,
    priority: city === 'waco-tx' ? '0.90' : '0.85',
    changefreq: 'weekly',
  }));

  // ── Blog pages ─────────────────────────────────────────────────────────────
  const blogPages = getAllPosts().map((post: any) => ({
    url: `/blogs/${post.slug}`,
    priority: '0.70',
    changefreq: 'monthly',
  }));

  const allPages = [
    ...staticPages,
    ...coreServices,
    ...acRepairCities,
    ...heatingCities,
    ...blogPages,
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allPages.forEach(({ url, priority, changefreq }) => {
    xml += `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  });

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  });
}
