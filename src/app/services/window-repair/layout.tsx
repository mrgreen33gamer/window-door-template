import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/window-repair';

export const metadata: Metadata = {
  title: "Window Repair Waco TX | Fogged Glass & Hardware | ClearView Windows & Doors",
  description: "Window repair in Waco and Central Texas. Fogged glass, failed seals, balances, and hardware. Honest repair-vs-replace advice.",
  keywords: [
    "window repair Waco TX",
    "fogged window repair",
    "window balance repair Central Texas",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Window Repair Waco TX | Fogged Glass & Hardware | ClearView Windows & Doors",
    description: "Window repair in Waco and Central Texas. Fogged glass, failed seals, balances, and hardware. Honest repair-vs-replace advice.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Repair Waco TX | Fogged Glass & Hardware | ClearView Windows & Doors",
    description: "Window repair in Waco and Central Texas. Fogged glass, failed seals, balances, and hardware. Honest repair-vs-replace advice.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Window Repair",
  description: "Window repair in Waco and Central Texas. Fogged glass, failed seals, balances, and hardware. Honest repair-vs-replace advice.",
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
  serviceType: "Window Repair",
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
