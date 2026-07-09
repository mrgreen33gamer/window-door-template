import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/marketing-solutions`;

export const metadata: Metadata = {
  title: "Digital Marketing Waco TX | SEO, Google Ads & Social Media | Scott Applications",
  description:
    "Results-driven digital marketing for Waco and Central Texas businesses. Local SEO, Google Ads, social media management, and monthly reporting that brings real customers — not just clicks.",
  keywords: [
    "digital marketing Waco TX",
    "local SEO Waco Texas",
    "Google Ads Waco",
    "social media marketing Waco",
    "SEO agency Waco TX",
    "marketing agency Central Texas",
    "Google Ads Central Texas",
    "online marketing Hewitt TX",
    "digital marketing agency Waco",
    "Scott Applications marketing",
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Digital Marketing Waco TX | SEO, Google Ads & Social Media | Scott Applications",
    description:
      "Local SEO, Google Ads, and social media strategies built specifically for Waco and Central Texas businesses. Real leads, transparent reporting, no contracts.",
    url,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/project-hvac.jpg`, alt: "Digital marketing Waco TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Waco TX | Scott Applications",
    description: "Local SEO, Google Ads, and social media for Waco and Central Texas businesses.",
    images: [`${BASE_URL}/pages/seo-template-resources/project-hvac.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Services",
  description:
    "Results-driven digital marketing for Waco, TX businesses including local SEO, Google Ads management, social media marketing, and content strategy for Central Texas companies.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waco",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "City", name: "Waco",         containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Hewitt",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Robinson",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Valley Mills", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Digital Marketing",
  url,
};

export default function MarketingSolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}