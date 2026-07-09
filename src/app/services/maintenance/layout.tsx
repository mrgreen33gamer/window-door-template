// src/app/services/software-engineering/layout.tsx
// FULL FILE — adds Temple + Killeen to areaServed

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/services/software-engineering`;

export const metadata: Metadata = {
  title: "Custom Software Development Waco TX | Web Apps & Business Tools | Scott Applications",
  description:
    "Custom software, web applications, CRMs, automation tools, and business platforms built for Waco and Central Texas companies. You own the code. No SaaS lock-in. Built exactly for your workflow.",
  keywords: [
    "custom software development Waco TX",
    "web app development Waco Texas",
    "business software Waco",
    "CRM development Central Texas",
    "software developer Waco TX",
    "business automation Waco",
    "custom web application Waco",
    "software company Waco TX",
    "Next.js developer Waco",
    "Scott Applications software",
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Custom Software Development Waco TX | Scott Applications",
    description:
      "Custom web apps, CRMs, and automation tools built for Waco and Central Texas businesses. You own the code — no SaaS lock-in, no bloated agency overhead.",
    url,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`, alt: "Custom software development Waco TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Waco TX | Scott Applications",
    description: "Custom web apps and business tools built for Waco and Central Texas companies. You own everything.",
    images: [`${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development",
  description:
    "Custom software development for Waco, TX businesses including web applications, CRMs, inventory systems, business automation tools, and client portals built with modern technology stacks.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waco",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "City", name: "Waco",         containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Hewitt",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Woodway",      containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Robinson",     containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "China Spring", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Valley Mills", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Temple",       containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Killeen",      containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Custom Software Development",
  url,
};

export default function SoftwareEngineeringLayout({ children }: { children: React.ReactNode }) {
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