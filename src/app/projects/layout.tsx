// src/app/projects/layout.tsx
// ✅ v8 SEO: NEW FILE — Adds CollectionPage schema + metadata (was missing entirely)
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/projects`;

export const metadata: Metadata = {
  title: 'Client Projects & Portfolio | Scott Applications — Waco, TX',
  description: 'Real projects built by Scott Applications for businesses across Central Texas — web design, custom software, and graphic design work in Waco, Killeen, Temple, Hewitt, and beyond.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Client Projects & Portfolio | Scott Applications',
    description: 'Real projects built by Scott Applications for Central Texas businesses.',
    url, siteName: 'Scott Applications', locale: 'en_US', type: 'website',
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/about-hero.png`, alt: 'Scott Applications portfolio — Waco TX' }],
  },
  twitter: { card: 'summary_large_image', title: 'Client Projects & Portfolio | Scott Applications', description: 'Real projects for Central Texas businesses.', images: [`${BASE_URL}/pages/seo-template-resources/about-hero.png`] },
  robots: { index: true, follow: true },
};

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Scott Applications — Client Projects & Portfolio',
  description: 'A portfolio of web design, custom software, and graphic design projects completed by Scott Applications for businesses across Central Texas, including Waco, China Spring, Hewitt, Robinson, Woodway, and surrounding areas.',
  url,
  about: {
    '@type': 'LocalBusiness',
    name: 'Scott Applications',
    url: BASE_URL,
    address: { '@type': 'PostalAddress', addressLocality: 'Waco', addressRegion: 'TX', addressCountry: 'US' },
  },
  hasPart: [
    { '@type': 'CreativeWork', name: 'F5 Portable Solutions Website', description: 'Website design for Waco portable restroom rental company.', locationCreated: { '@type': 'City', name: 'Waco', containedInPlace: { '@type': 'State', name: 'Texas' } } },
    { '@type': 'CreativeWork', name: 'Cen-Tex Utilities Website', description: 'Full website for utility construction company in Central Texas.', locationCreated: { '@type': 'City', name: 'Waco', containedInPlace: { '@type': 'State', name: 'Texas' } } },
    { '@type': 'CreativeWork', name: 'Bennington HHC Website', description: 'Web presence for home health care provider.', locationCreated: { '@type': 'City', name: 'Waco', containedInPlace: { '@type': 'State', name: 'Texas' } } },
    { '@type': 'CreativeWork', name: 'Cen-Tex Landscaping Website', description: 'Website and graphics for landscaping company.', locationCreated: { '@type': 'City', name: 'Waco', containedInPlace: { '@type': 'State', name: 'Texas' } } },
    { '@type': 'CreativeWork', name: 'Gallery 11 Waco Website', description: 'Online presence for Waco crystal and jewelry shop.', locationCreated: { '@type': 'City', name: 'Waco', containedInPlace: { '@type': 'State', name: 'Texas' } } },
    { '@type': 'CreativeWork', name: 'GTS Digs Website', description: 'Brand and website for arrowhead dig services.', locationCreated: { '@type': 'City', name: 'China Spring', containedInPlace: { '@type': 'State', name: 'Texas' } } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: url },
  ],
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
