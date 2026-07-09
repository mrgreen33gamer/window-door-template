// src/app/services/graphic-design/layout.tsx
// FULL FILE — adds Temple + Killeen to areaServed

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/graphic-design`;

export const metadata: Metadata = {
  title: "Graphic Design Waco TX | Logos, Branding & Print | Scott Applications",
  description:
    "Professional graphic design in Waco, TX. Custom logos, brand identities, marketing materials, and print collateral for Central Texas businesses. Fast turnaround, unlimited revisions, you own everything.",
  keywords: [
    "graphic design Waco TX",
    "logo design Waco Texas",
    "branding Waco small business",
    "print design Central Texas",
    "brand identity Waco TX",
    "marketing materials Waco",
    "graphic designer Hewitt TX",
    "graphic designer Woodway TX",
    "business card design Waco",
    "Scott Applications graphic design",
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Graphic Design Waco TX | Logos, Branding & Print | Scott Applications",
    description:
      "Custom logos, brand identities, and marketing materials for Waco and Central Texas businesses. Fast turnaround, you own everything.",
    url,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/client-praseks.jpg`, alt: "Graphic design Waco TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphic Design Waco TX | Scott Applications",
    description: "Custom logos, branding, and print design for Waco and Central Texas businesses.",
    images: [`${BASE_URL}/pages/seo-template-resources/client-praseks.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Graphic Design Services",
  description:
    "Professional graphic design in Waco, TX including logo design, brand identities, marketing materials, signage, and print collateral for Central Texas businesses.",
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
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Robinson",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Valley Mills", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Graphic Design",
  url,
};

export default function GraphicDesignLayout({ children }: { children: React.ReactNode }) {
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