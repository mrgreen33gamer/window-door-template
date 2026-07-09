// src/app/services/heating/killeen-tx/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/heating/killeen-tx`;

export const metadata: Metadata = {
  title: "Heating Repair in Killeen TX | Arctic Air HVAC | Central Texas",
  description: "Furnace repair, heat pump service, and emergency heating calls. Flat-rate pricing, 1-year warranty, same-day service in Killeen, TX and throughout Bell County. Licensed & insured, no contracts.",
  keywords: [
    "heating repair Killeen TX",
    "furnace repair Killeen Texas",
    "heat pump repair Killeen TX",
    "HVAC heating service Killeen",
    "no heat Killeen TX",
    "emergency heating repair Killeen",
    "Arctic Air HVAC",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Heating Repair in Killeen TX | Arctic Air HVAC",
    description: "Furnace repair, heat pump service, and emergency heating calls. Flat-rate pricing, 1-year warranty, same-day service in Killeen and Bell County.",
    url,
    siteName: "Arctic Air HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heating Repair in Killeen TX | Arctic Air HVAC",
    description: "Furnace repair, heat pump service, and emergency heating calls. Flat-rate pricing, 1-year warranty, same-day service — Killeen, TX.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Heating Repair – Killeen TX",
  description: "Furnace repair, heat pump service, and emergency heating calls. Flat-rate pricing, 1-year warranty, same-day service serving Killeen and Bell County.",
  provider: {
    "@type": "HVACBusiness",
    name: "Arctic Air HVAC",
    url: BASE_URL,
    telephone: "+12549001234",
    address: { "@type": "PostalAddress", streetAddress: "4521 Bosque Blvd", addressLocality: "Waco", addressRegion: "TX", postalCode: "76710", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Killeen", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "Heating Repair",
  url,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does furnace repair cost in Killeen?",
      acceptedAnswer: { "@type": "Answer", text: "Furnace repairs in Killeen typically range from $150–$600. Ignitor replacement runs $150–$250. Gas valve repair is $250–$400. We provide a flat-rate written quote before any work starts." },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day heating service in Killeen?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — same-day and emergency heating service is available for Killeen. When the heat goes out, it's a genuine emergency. Call us at (254) 900-1234 and we'll get someone out fast." },
    },
    {
      "@type": "Question",
      name: "What heating systems do you repair in Killeen?",
      acceptedAnswer: { "@type": "Answer", text: "We repair gas furnaces, electric furnaces, heat pumps, and dual-fuel systems in Killeen. All brands, all fuel types — if it heats your home, we service it." },
    },
    {
      "@type": "Question",
      name: "Do you check for carbon monoxide during heating calls?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we perform a CO safety check and heat exchanger inspection on every heating service call. It's part of our standard diagnostic process, not an add-on." },
    },
    {
      "@type": "Question",
      name: "When should I replace my furnace instead of repairing it in Killeen?",
      acceptedAnswer: { "@type": "Answer", text: "If your furnace is over 15 years old and a repair costs more than 40% of replacement cost, replacement usually wins on long-term value. We'll give you an honest recommendation — not the most profitable one for us." },
    },
  ],
};

export default function KilleenHeatingRepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
