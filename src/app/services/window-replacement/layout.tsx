import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/window-replacement';

export const metadata: Metadata = {
  title: "Window Replacement Waco TX | Low-E Vinyl & Fiberglass | ClearView Windows & Doors",
  description: "Window replacement in Waco and Central Texas. Low-E vinyl, fiberglass, and wood-clad options. Free measurements, factory-certified installers, 10-Year Installation Warranty.",
  keywords: [
    "window replacement Waco TX",
    "Low-E windows Waco",
    "vinyl windows Central Texas",
    "fiberglass windows Waco",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Window Replacement Waco TX | Low-E Vinyl & Fiberglass | ClearView Windows & Doors",
    description: "Window replacement in Waco and Central Texas. Low-E vinyl, fiberglass, and wood-clad options. Free measurements, factory-certified installers, 10-Year Installation Warranty.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Replacement Waco TX | Low-E Vinyl & Fiberglass | ClearView Windows & Doors",
    description: "Window replacement in Waco and Central Texas. Low-E vinyl, fiberglass, and wood-clad options. Free measurements, factory-certified installers, 10-Year Installation Warranty.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Window Replacement",
  description: "Window replacement in Waco and Central Texas. Low-E vinyl, fiberglass, and wood-clad options. Free measurements, factory-certified installers, 10-Year Installation Warranty.",
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
  serviceType: "Window Replacement",
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
