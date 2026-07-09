import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/patio-sliding-doors';

export const metadata: Metadata = {
  title: "Patio & Sliding Doors Waco TX | French & Sliding Glass | ClearView Windows & Doors",
  description: "Patio doors, French doors, and sliding glass doors in Waco and Central Texas. Smooth operation, tight seals, Low-E glass. Factory-certified installers.",
  keywords: [
    "patio doors Waco TX",
    "sliding glass door replacement",
    "French doors Central Texas",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Patio & Sliding Doors Waco TX | French & Sliding Glass | ClearView Windows & Doors",
    description: "Patio doors, French doors, and sliding glass doors in Waco and Central Texas. Smooth operation, tight seals, Low-E glass. Factory-certified installers.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patio & Sliding Doors Waco TX | French & Sliding Glass | ClearView Windows & Doors",
    description: "Patio doors, French doors, and sliding glass doors in Waco and Central Texas. Smooth operation, tight seals, Low-E glass. Factory-certified installers.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Patio & Sliding Doors",
  description: "Patio doors, French doors, and sliding glass doors in Waco and Central Texas. Smooth operation, tight seals, Low-E glass. Factory-certified installers.",
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
  serviceType: "Patio & Sliding Doors",
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
