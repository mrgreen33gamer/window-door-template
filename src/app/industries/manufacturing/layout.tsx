// src/app/industries/manufacturing/layout.tsx
// ✅ v9 SEO: Added keywords array (was missing — only HVAC had it)
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/industries/manufacturing`;

export const metadata: Metadata = {
  title: "Web Design & Software for Manufacturing Companies | Scott Applications",
  description: "B2B websites, RFQ portals, distributor web apps, and production tracking software for manufacturing companies in Texas.",
  keywords: [
    "manufacturing website design Texas",
    "B2B manufacturing website Waco",
    "RFQ portal software manufacturer",
    "distributor web app development Texas",
    "production tracking software manufacturing",
    "industrial website design Texas",
    "Scott Applications manufacturing",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Web Design & Software for Manufacturing Companies | Scott Applications",
    description: "B2B websites, RFQ portals, and production tracking software for manufacturing companies in Texas.",
    url, siteName: "Scott Applications", locale: "en_US", type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/about-hero.png`, alt: "Manufacturing web design – Scott Applications" }],
  },
  twitter: { card: "summary_large_image", title: "Web Design & Software for Manufacturing Companies | Scott Applications", description: "B2B websites, RFQ portals, and production tracking software for manufacturing companies in Texas.", images: [`${BASE_URL}/pages/seo-template-resources/about-hero.png`] },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Services for Manufacturing Companies",
  description: "B2B websites, RFQ portals, distributor web apps, and production tracking software for manufacturing companies in Texas.",
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL, telephone: "+12549002520", address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" } },
  serviceType: "Web Design, Digital Marketing, Custom Software",
  areaServed: { "@type": "State", name: "Texas" },
  url,
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Scott Applications — Manufacturing Digital Services",
  description: "B2B websites, RFQ portals, distributor web apps, and production tracking software for manufacturing companies in Texas.",
  url,
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL },
  areaServed: { "@type": "State", name: "Texas" },
  serviceType: ["Manufacturing Website Design", "RFQ Portal Development", "Distributor Portal Software", "B2B Manufacturing SEO"],
};

export default function ManufacturingIndustryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      {children}
    </>
  );
}
