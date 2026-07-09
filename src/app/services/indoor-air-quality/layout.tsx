// src/app/services/indoor-air-quality/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/indoor-air-quality`;

export const metadata: Metadata = {
  title: "Indoor Air Quality Waco TX | UV Purifiers, Humidifiers & Filtration | Arctic Air",
  description:
    "Indoor air quality solutions for Waco and Central Texas homes. UV air purifiers, whole-home humidifiers, HEPA-grade filtration, and fresh-air ventilation — all integrated with your existing HVAC system.",
  keywords: [
    "indoor air quality Waco TX",
    "UV air purifier installation Waco",
    "whole home humidifier Waco Texas",
    "HEPA filtration HVAC Waco",
    "air purifier installation Central Texas",
    "HVAC air quality Waco TX",
    "Arctic Air indoor air quality",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Indoor Air Quality Waco TX | Arctic Air HVAC",
    description: "UV purifiers, humidifiers, and HEPA filtration for Waco homes. Honest assessment, integrated installation.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indoor Air Quality Waco TX | Arctic Air HVAC",
    description: "UV air purifiers, whole-home humidifiers, and filtration upgrades for Waco and Central Texas.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Indoor Air Quality Services",
  description: "Indoor air quality solutions for Waco, TX homes including UV air purifiers, whole-home humidifiers, high-efficiency filtration, and fresh-air ventilation.",
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
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Indoor Air Quality",
  url,
};

export default function IndoorAirQualityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
