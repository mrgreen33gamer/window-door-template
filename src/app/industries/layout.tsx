// src\app\industries\layout.tsx
// src/app/industries/layout.tsx
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url      = `${BASE_URL}/industries`;

export const metadata: Metadata = {
  title: "Industries We Serve | Web Design & Marketing for Texas Businesses | Scott Applications",
  description:
    "Scott Applications builds industry-specific websites, software, and marketing for automotive, HVAC, construction, roofing, electrical, plumbing, finance, manufacturing, aviation, and oil & gas businesses across Central Texas.",
  keywords: [
    "industry web design Waco TX",
    "HVAC website design Texas",
    "construction website Central Texas",
    "roofing marketing Waco",
    "automotive web design Texas",
    "plumbing website design Waco",
    "electrical contractor website Texas",
    "manufacturing digital marketing Central Texas",
    "oil gas web design Texas",
    "finance website Waco TX",
    "industry specific web design",
    "Scott Applications industries",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Industries We Serve | Scott Applications — Waco, TX",
    description:
      "Industry-specific websites, software, and marketing for 10+ verticals across Central Texas. Built for how your industry actually works.",
    url,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/logos/scott-apps-banner.png`, alt: "Scott Applications — Industries Served" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Scott Applications",
    description: "Industry-specific web design, software & marketing for Texas businesses across 10+ verticals.",
    images: [`${BASE_URL}/logos/scott-apps-banner.png`],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Industries", item: url },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Industry-Specific Digital Services — Waco TX",
  description:
    "Scott Applications provides industry-tailored web design, custom software, and digital marketing for automotive, HVAC, construction, roofing, electrical, plumbing, finance, manufacturing, aviation, and oil & gas businesses across Central Texas.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    telephone: "+12549002520",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waco",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  areaServed: { "@type": "State", name: "Texas" },
  serviceType: "Web Design, Digital Marketing, Custom Software",
  url,
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}