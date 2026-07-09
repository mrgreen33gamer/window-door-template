import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const cityPath = `${BASE_URL}/services/software-engineering/waco-tx`;

export const metadata: Metadata = {
  title: "Custom Software Development in Waco TX | Web Apps & Business Tools | Scott Applications",
  description: "Custom software, web applications, CRMs, and business automation for Waco and Central Texas companies by Scott Applications.",
  keywords: [
    "custom software Waco TX",
    "web app development Waco Texas",
    "business software Waco",
    "software developer Waco TX",
    "business automation Waco",
    "client portal Waco",
    "Scott Applications Waco software",
  ],
  alternates: { canonical: cityPath },
  openGraph: {
    title: "Custom Software Development in Waco TX | Scott Applications",
    description: "Custom software, web applications, CRMs, and business automation for Waco and Central Texas companies.",
    url: cityPath,
    siteName: "Scott Applications",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`, alt: "Custom software Waco TX – Scott Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Waco TX | Scott Applications",
    description: "Custom software, web applications, CRMs, and business automation for Waco and Central Texas companies.",
    images: [`${BASE_URL}/pages/seo-template-resources/project-invoicing.jpg`],
  },
};

const localSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development – Waco TX",
  description: "Custom software, web applications, CRMs, and business automation for Waco and Central Texas companies by Scott Applications.",
  provider: {
    "@type": "LocalBusiness",
    name: "Scott Applications",
    url: BASE_URL,
    telephone: "+12549002520",
    address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" },
  },
  areaServed: { "@type": "City", name: "Waco", containedInPlace: { "@type": "State", name: "Texas" } },
  serviceType: "Custom Software Development",
  url: cityPath,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What industries in Waco do you build software for?",
      acceptedAnswer: { "@type": "Answer", text: "Construction, healthcare, retail, real estate, professional services, nonprofits, agriculture, and more. If your Waco business has a repeatable process, we can build software around it — regardless of industry." },
    },
    {
      "@type": "Question",
      name: "How much does custom software cost for a Waco business?",
      acceptedAnswer: { "@type": "Answer", text: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always." },
    },
    {
      "@type": "Question",
      name: "Can you replace multiple SaaS tools with one custom solution?",
      acceptedAnswer: { "@type": "Answer", text: "Often yes — many Waco businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them within 12–18 months on cost alone, and works better for your specific workflow." },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support after launch?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — optional ongoing support packages and ad-hoc feature additions are available. Since you own the code, you can also bring it to any developer in the future with zero lock-in." },
    },
    {
      "@type": "Question",
      name: "How long does a Waco software project take?",
      acceptedAnswer: { "@type": "Answer", text: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Waco team benefits before the whole project is done." },
    }
  ],
};

export default function WacoSoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
