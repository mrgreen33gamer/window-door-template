// src/app/about/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url      = `${BASE_URL}/about`;

export const metadata: Metadata = {
  title: "About Arctic Air HVAC — Waco TX Heating & Cooling Company Since 2010",
  description:
    "Meet the Arctic Air HVAC team. Locally owned and operated in Waco, Texas since 2010. NATE-certified technicians, TDLR-licensed, honest pricing, and a 1-year warranty on every repair. Serving Waco, Hewitt, Woodway, Robinson, and all of Central Texas.",
  keywords: [
    "about Arctic Air HVAC",
    "Waco HVAC company",
    "HVAC contractor Waco TX",
    "locally owned HVAC Waco",
    "NATE certified HVAC Waco Texas",
    "Central Texas heating cooling company",
    "HVAC company history Waco",
    "Mike Hawkins Arctic Air HVAC",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "About Arctic Air HVAC — Waco TX Heating & Cooling Company Since 2010",
    description:
      "Locally owned and operated in Waco since 2010. NATE-certified, TDLR-licensed, flat-rate pricing, 1-year warranty on every repair. Serving all of Central Texas.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Arctic Air HVAC — Waco TX Since 2010",
    description:
      "Locally owned HVAC company in Waco, TX. NATE-certified, flat-rate pricing, 1-year repair warranty.",
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: "Arctic Air HVAC",
  url: BASE_URL,
  telephone: "+12549001234",
  email: "contact@arcticairhvac.com",
  foundingDate: "2010",
  founder: {
    "@type": "Person",
    name: "Mike Hawkins",
    jobTitle: "Owner & Master HVAC Technician",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "4521 Bosque Blvd",
    addressLocality: "Waco",
    addressRegion: "TX",
    postalCode: "76710",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Waco",         containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Hewitt",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Robinson",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Valley Mills", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  sameAs: [
    "https://www.facebook.com/arcticairhvac",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: url },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
