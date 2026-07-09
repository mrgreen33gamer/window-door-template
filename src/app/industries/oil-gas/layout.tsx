// src/app/industries/oil-gas/layout.tsx
// ✅ v9 SEO: Added keywords array (was missing — only HVAC had it)
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/industries/oil-gas`;

export const metadata: Metadata = {
  title: "Web Design & Software for Oil & Gas Companies | Scott Applications",
  description: "Enterprise B2B websites, field operations software, and digital branding for oilfield service companies in Texas.",
  keywords: [
    "oil gas website design Texas",
    "oilfield service company website",
    "energy sector website design Texas",
    "field operations software oil gas",
    "upstream oil gas digital marketing",
    "oilfield services branding Texas",
    "Scott Applications oil gas",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Web Design & Software for Oil & Gas Companies | Scott Applications",
    description: "Enterprise B2B websites and field operations software for oilfield service companies in Texas.",
    url, siteName: "Scott Applications", locale: "en_US", type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/about-hero.png`, alt: "Oil & Gas web design – Scott Applications" }],
  },
  twitter: { card: "summary_large_image", title: "Web Design & Software for Oil & Gas Companies | Scott Applications", description: "Enterprise B2B websites and field operations software for oilfield service companies in Texas.", images: [`${BASE_URL}/pages/seo-template-resources/about-hero.png`] },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Services for Oil & Gas Companies",
  description: "Enterprise B2B websites, field operations software, and digital branding for oilfield service companies in Texas.",
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL, telephone: "+12549002520", address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" } },
  serviceType: "Web Design, Digital Marketing, Custom Software",
  areaServed: { "@type": "State", name: "Texas" },
  url,
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Scott Applications — Oil & Gas Digital Services",
  description: "Enterprise B2B websites, field operations software, and digital branding for oilfield service companies in Texas.",
  url,
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL },
  areaServed: { "@type": "State", name: "Texas" },
  serviceType: ["Oil & Gas Website Design", "Field Operations Software", "Oilfield Branding", "Energy Sector SEO"],
};

export default function OilAndGasIndustryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      {children}
    </>
  );
}
