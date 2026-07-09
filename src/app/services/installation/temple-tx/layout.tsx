// src/app/services/ac-repair/temple-tx/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/ac-repair/temple-tx`;

export const metadata: Metadata = {
  title: "AC Repair in Temple TX | Arctic Air HVAC | Central Texas",
  description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians in Temple, TX and throughout Bell County. Licensed & insured, no contracts.",
  keywords: [
    "AC repair Temple TX",
    "air conditioner repair Temple Texas",
    "HVAC repair Temple TX",
    "emergency AC service Temple",
    "AC not cooling Temple TX",
    "same day AC repair Temple",
    "Arctic Air HVAC",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "AC Repair in Temple TX | Arctic Air HVAC",
    description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians in Temple and Bell County.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Repair in Temple TX | Arctic Air HVAC",
    description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians — Temple, TX.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AC Repair – Temple TX",
  description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians serving Temple and Bell County.",
  provider: {
    "@type": "HVACBusiness",
    name: "Arctic Air HVAC",
    url: BASE_URL,
    telephone: "+12549001234",
    address: { "@type": "PostalAddress", streetAddress: "4521 Bosque Blvd", addressLocality: "Waco", addressRegion: "TX", postalCode: "76710", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Temple", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "AC Repair",
  url,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AC repair cost in Temple?",
      acceptedAnswer: { "@type": "Answer", text: "Most AC repairs in Temple range from $150–$650 depending on the issue. Capacitor and contactor replacements run $150–$250. Refrigerant recharges run $250–$500. We always provide a flat-rate written quote before starting any work." },
    },
    {
      "@type": "Question",
      name: "Can you come out the same day in Temple?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — same-day service is available for most Temple calls, especially when you contact us in the morning. We dispatch from Waco and keep common parts stocked on every truck." },
    },
    {
      "@type": "Question",
      name: "Do you service all AC brands in Temple?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we service all major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, and more. Any make, any model, in Temple and throughout Central Texas." },
    },
    {
      "@type": "Question",
      name: "Is there a diagnostic fee for Temple service calls?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — there's a standard diagnostic fee for coming out and diagnosing the issue. That fee is waived when you proceed with the recommended repair." },
    },
    {
      "@type": "Question",
      name: "Do you offer emergency AC service in Temple?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — emergency service is available 7 days a week including evenings. Call us anytime at (254) 900-1234 for Temple emergency AC service." },
    },
  ],
};

export default function TempleACRepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
