// src/app/services/duct-cleaning/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/duct-cleaning`;

export const metadata: Metadata = {
  title: "Duct Cleaning Waco TX | HVAC Duct Cleaning Service | Arctic Air",
  description:
    "Professional duct cleaning for Waco and Central Texas homes. Full mechanical cleaning — every supply and return run. Flat-rate pricing, before/after documentation, licensed HVAC crew.",
  keywords: [
    "duct cleaning Waco TX",
    "air duct cleaning Waco Texas",
    "HVAC duct cleaning Central Texas",
    "air vent cleaning Waco",
    "duct cleaning near me Waco",
    "Arctic Air duct cleaning",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Duct Cleaning Waco TX | Arctic Air HVAC",
    description: "Full mechanical duct cleaning for Waco homes. Flat-rate pricing, before/after documentation, licensed crew.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duct Cleaning Waco TX | Arctic Air HVAC",
    description: "Professional duct cleaning for Waco and Central Texas. Full system clean, flat-rate pricing.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Air Duct Cleaning",
  description: "Professional air duct cleaning for residential properties in Waco, TX and Central Texas. Full mechanical cleaning of all supply and return ducts.",
  provider: {
    "@type": "HVACBusiness",
    name: "Arctic Air HVAC",
    url: BASE_URL,
    telephone: "+12549001234",
    address: { "@type": "PostalAddress", streetAddress: "4521 Bosque Blvd", addressLocality: "Waco", addressRegion: "TX", postalCode: "76710", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Waco",         containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Hewitt",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Robinson",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Air Duct Cleaning",
  url,
};

export default function DuctCleaningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
