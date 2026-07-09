// src/app/services/installation/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/installation`;

export const metadata: Metadata = {
  title: "New HVAC Installation Waco TX | AC & Heating System Replacement | Arctic Air",
  description:
    "New HVAC system installation for Waco and Central Texas homes. Right-sized equipment, licensed crew, financing available, and a full manufacturer warranty. Carrier & Trane authorized dealer.",
  keywords: [
    "HVAC installation Waco TX",
    "new AC installation Waco Texas",
    "furnace installation Waco",
    "heat pump installation Central Texas",
    "HVAC replacement Waco TX",
    "air conditioner installation Waco",
    "Carrier dealer Waco TX",
    "Trane dealer Waco TX",
    "Arctic Air HVAC installation",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "New HVAC Installation Waco TX | Arctic Air HVAC",
    description: "Right-sized HVAC installations for Waco and Central Texas homes. Licensed crew, flat-rate pricing, financing available.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New HVAC Installation Waco TX | Arctic Air HVAC",
    description: "Right-sized installations, licensed crew, financing available. Serving Waco and Central Texas.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HVAC System Installation",
  description: "New HVAC system installation for residential and commercial properties in Waco, TX and Central Texas. Carrier and Trane authorized dealer. Financing available.",
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
  serviceType: "HVAC Installation",
  url,
};

export default function InstallationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
