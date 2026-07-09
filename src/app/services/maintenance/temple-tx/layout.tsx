import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const cityPath = `${BASE_URL}/services/software-engineering/temple-tx`;

export const metadata: Metadata = {
  title: "Custom Software Development in Temple TX | Web Apps & Business Tools | Scott Applications",
  description: "Custom software, client portals, and business tools for Temple and Bell County businesses by Scott Applications.",
  keywords: [
    "custom software Temple TX",
    "web app development Temple Texas",
    "business software Temple",
    "software developer Temple TX",
    "business automation Temple",
    "client portal Temple",
    "Scott Applications Temple software",
  ],
  alternates: { canonical: cityPath },
  openGraph: {
    title: "Custom Software Development in Temple TX | Scott Applications",
    description: "Custom software, client portals, and business tools for Temple and Bell County businesses.",
    url: cityPath,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`, alt: "Custom software Temple TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Temple TX | Scott Applications",
    description: "Custom software, client portals, and business tools for Temple and Bell County businesses.",
    images: [`${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`],
  },
};

const localSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development – Temple TX",
  description: "Custom software, client portals, and business tools for Temple and Bell County businesses by Scott Applications.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    telephone: "+12549002520",
    address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Temple", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "Custom Software Development",
  url: cityPath,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you serve Temple, TX businesses for custom software?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we're based in Waco, about 35 miles north of Temple, and regularly build software for Bell County businesses. Everything runs remotely with video calls, staged demos, and fast delivery." },
    },
    {
      "@type": "Question",
      name: "My Temple business is in healthcare. Can you build software for that?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we've built intake tools, scheduling systems, and client portals for healthcare-adjacent businesses. We're not a HIPAA-certified EHR vendor, but we can build the practice management, scheduling, and client communication tools that connect around your clinical systems." },
    },
    {
      "@type": "Question",
      name: "How much does custom software cost for a Temple business?",
      acceptedAnswer: { "@type": "Answer", text: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always." },
    },
    {
      "@type": "Question",
      name: "How long does a Temple software project take?",
      acceptedAnswer: { "@type": "Answer", text: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Temple team benefits before the whole project is done." },
    },
    {
      "@type": "Question",
      name: "Can you replace multiple SaaS subscriptions with one custom tool?",
      acceptedAnswer: { "@type": "Answer", text: "Often yes — many Temple businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them and pays for itself within 12–18 months in subscription savings alone." },
    }
  ],
};

export default function TempleSoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
