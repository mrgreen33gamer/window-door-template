import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/entry-door-installation';

export const metadata: Metadata = {
  title: "Entry Door Installation Waco TX | Fiberglass & Steel | ClearView Windows & Doors",
  description: "Entry door installation in Waco and Central Texas. Fiberglass, steel, and wood doors with proper flashing and weather sealing. Factory-certified installers.",
  keywords: [
    "entry door installation Waco TX",
    "fiberglass entry door Waco",
    "front door replacement Central Texas",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Entry Door Installation Waco TX | Fiberglass & Steel | ClearView Windows & Doors",
    description: "Entry door installation in Waco and Central Texas. Fiberglass, steel, and wood doors with proper flashing and weather sealing. Factory-certified installers.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entry Door Installation Waco TX | Fiberglass & Steel | ClearView Windows & Doors",
    description: "Entry door installation in Waco and Central Texas. Fiberglass, steel, and wood doors with proper flashing and weather sealing. Factory-certified installers.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Entry Door Installation",
  description: "Entry door installation in Waco and Central Texas. Fiberglass, steel, and wood doors with proper flashing and weather sealing. Factory-certified installers.",
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
  serviceType: "Entry Door Installation",
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
