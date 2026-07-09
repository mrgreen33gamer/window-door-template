import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/services/storm-impact-windows';

export const metadata: Metadata = {
  title: "Storm & Impact Windows Waco TX | Wind & Security | ClearView Windows & Doors",
  description: "Storm and impact-rated window solutions in Waco and Central Texas. Wind protection, security, and efficiency. Factory-certified installers.",
  keywords: [
    "impact windows Waco TX",
    "storm windows Central Texas",
    "hurricane impact glass Temple",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Storm & Impact Windows Waco TX | Wind & Security | ClearView Windows & Doors",
    description: "Storm and impact-rated window solutions in Waco and Central Texas. Wind protection, security, and efficiency. Factory-certified installers.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Storm & Impact Windows Waco TX | Wind & Security | ClearView Windows & Doors",
    description: "Storm and impact-rated window solutions in Waco and Central Texas. Wind protection, security, and efficiency. Factory-certified installers.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Storm & Impact Windows",
  description: "Storm and impact-rated window solutions in Waco and Central Texas. Wind protection, security, and efficiency. Factory-certified installers.",
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
  serviceType: "Storm & Impact Windows",
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
