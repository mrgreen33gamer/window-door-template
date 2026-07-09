import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/energy-efficiency-upgrades';

export const metadata: Metadata = {
  title: "Energy Efficient Windows Waco TX | Low-E Upgrades | ClearView Windows & Doors",
  description: "Energy efficiency window and door upgrades in Waco and Central Texas. Low-E packages, weatherization, and targeted replacements that cut cooling costs.",
  keywords: [
    "energy efficient windows Waco TX",
    "Low-E window upgrade",
    "weatherization Central Texas",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Energy Efficient Windows Waco TX | Low-E Upgrades | ClearView Windows & Doors",
    description: "Energy efficiency window and door upgrades in Waco and Central Texas. Low-E packages, weatherization, and targeted replacements that cut cooling costs.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy Efficient Windows Waco TX | Low-E Upgrades | ClearView Windows & Doors",
    description: "Energy efficiency window and door upgrades in Waco and Central Texas. Low-E packages, weatherization, and targeted replacements that cut cooling costs.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Energy Efficiency Upgrades",
  description: "Energy efficiency window and door upgrades in Waco and Central Texas. Low-E packages, weatherization, and targeted replacements that cut cooling costs.",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "ClearView Windows & Doors",
    url: BASE_URL,
    telephone: "+12547403300",
    address: {
      "@type": "PostalAddress",
      streetAddress: "501 Lake Air Dr",
      addressLocality: "Waco",
      addressRegion: "TX",
      postalCode: "76710",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "City", name: "Waco",        containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Hewitt",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Bellmead",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "McGregor",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Energy Efficiency Upgrades",
  url,
};

export default function Layout({ children }: { children: React.ReactNode }) {
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
