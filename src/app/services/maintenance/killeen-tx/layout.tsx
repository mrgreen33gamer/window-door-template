import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const cityPath = `${BASE_URL}/services/software-engineering/killeen-tx`;

export const metadata: Metadata = {
  title: "Custom Software Development in Killeen TX | Web Apps & Business Tools | Scott Applications",
  description: "Custom software and business tools for Killeen and Fort Cavazos-area businesses by Scott Applications.",
  keywords: [
    "custom software Killeen TX",
    "web app development Killeen Texas",
    "business software Killeen",
    "software developer Killeen TX",
    "business automation Killeen",
    "client portal Killeen",
    "Scott Applications Killeen software",
  ],
  alternates: { canonical: cityPath },
  openGraph: {
    title: "Custom Software Development in Killeen TX | Scott Applications",
    description: "Custom software and business tools for Killeen and Fort Cavazos-area businesses.",
    url: cityPath,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`, alt: "Custom software Killeen TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Killeen TX | Scott Applications",
    description: "Custom software and business tools for Killeen and Fort Cavazos-area businesses.",
    images: [`${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`],
  },
};

const localSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development – Killeen TX",
  description: "Custom software and business tools for Killeen and Fort Cavazos-area businesses by Scott Applications.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    telephone: "+12549002520",
    address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Killeen", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "Custom Software Development",
  url: cityPath,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you serve Killeen, TX businesses for custom software?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we're based in Waco, about an hour north of Killeen, and regularly build software for Bell County and Fort Cavazos-area businesses. Everything runs remotely with video calls, staged demos, and fast delivery." },
    },
    {
      "@type": "Question",
      name: "My Killeen business has high staff turnover. Will custom software handle that?",
      acceptedAnswer: { "@type": "Answer", text: "That's exactly why custom software makes sense for the Killeen market. We build interfaces that are intuitive enough to train in an hour, with role-based access and guided workflows — so new staff are productive fast regardless of turnover." },
    },
    {
      "@type": "Question",
      name: "How much does custom software cost for a Killeen business?",
      acceptedAnswer: { "@type": "Answer", text: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always." },
    },
    {
      "@type": "Question",
      name: "How long does a Killeen software project take?",
      acceptedAnswer: { "@type": "Answer", text: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Killeen team benefits before the whole project is done." },
    },
    {
      "@type": "Question",
      name: "Can you replace multiple SaaS subscriptions with one custom tool?",
      acceptedAnswer: { "@type": "Answer", text: "Often yes — many Killeen businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them and pays for itself within 12–18 months in subscription savings alone." },
    }
  ],
};

export default function KilleenSoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
