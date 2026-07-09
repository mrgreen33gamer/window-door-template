// src/app/services/ac-repair/waco-tx/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/ac-repair/waco-tx`;

export const metadata: Metadata = {
  title: "AC Repair in Waco TX | Arctic Air HVAC | Central Texas",
  description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians in Waco, TX and throughout McLennan County. Licensed & insured, no contracts.",
  keywords: [
    "AC repair Waco TX",
    "air conditioner repair Waco Texas",
    "HVAC repair Waco TX",
    "emergency AC service Waco",
    "AC not cooling Waco TX",
    "same day AC repair Waco",
    "Arctic Air HVAC",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "AC Repair in Waco TX | Arctic Air HVAC",
    description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians in Waco and McLennan County.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Repair in Waco TX | Arctic Air HVAC",
    description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians — Waco, TX.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AC Repair – Waco TX",
  description: "Same-day AC repair for all makes and models. Flat-rate pricing, 1-year warranty, NATE-certified technicians serving Waco and McLennan County.",
  provider: {
    "@type": "HVACBusiness",
    name: "Arctic Air HVAC",
    url: BASE_URL,
    telephone: "+12549001234",
    address: { "@type": "PostalAddress", streetAddress: "4521 Bosque Blvd", addressLocality: "Waco", addressRegion: "TX", postalCode: "76710", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Waco", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "AC Repair",
  url,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AC repair cost in Waco?",
      acceptedAnswer: { "@type": "Answer", text: "Most AC repairs in Waco range from $150–$650 depending on the issue. Capacitor and contactor replacements run $150–$250. Refrigerant recharges run $250–$500. We always provide a flat-rate written quote before starting any work." },
    },
    {
      "@type": "Question",
      name: "Can you come out the same day in Waco?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — same-day service is available for most Waco calls, especially when you contact us in the morning. We dispatch from Waco and keep common parts stocked on every truck." },
    },
    {
      "@type": "Question",
      name: "Do you service all AC brands in Waco?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we service all major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, and more. Any make, any model, in Waco and throughout Central Texas." },
    },
    {
      "@type": "Question",
      name: "Is there a diagnostic fee for Waco service calls?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — there's a standard diagnostic fee for coming out and diagnosing the issue. That fee is waived when you proceed with the recommended repair." },
    },
    {
      "@type": "Question",
      name: "Do you offer emergency AC service in Waco?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — emergency service is available 7 days a week including evenings. Call us anytime at (254) 900-1234 for Waco emergency AC service." },
    },
  ],
};

export default function WacoACRepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
