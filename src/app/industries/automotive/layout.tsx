// src/app/industries/automotive/layout.tsx
// ✅ v9 SEO: Added keywords array (was missing — only HVAC had it)
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/industries/automotive`;

export const metadata: Metadata = {
  title: "Web Design & Software for Automotive Companies | Scott Applications",
  description: "Websites, inventory management tools, and digital branding for automotive dealerships and repair shops in Central Texas.",
  keywords: [
    "automotive website design Texas",
    "auto repair shop website Waco",
    "car dealership website design Texas",
    "automotive inventory software",
    "auto shop local SEO Texas",
    "automotive digital marketing Central Texas",
    "Scott Applications automotive",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Web Design & Software for Automotive Companies | Scott Applications",
    description: "Inventory pages, online booking, and Google optimization for auto repair shops and dealerships in Central Texas.",
    url, siteName: "Scott Applications", locale: "en_US", type: "website",
    images: [{ url: `${BASE_URL}/pages/seo-template-resources/about-hero.png`, alt: "Automotive web design – Scott Applications" }],
  },
  twitter: { card: "summary_large_image", title: "Web Design & Software for Automotive Companies | Scott Applications", description: "Inventory pages, online booking, and Google optimization for auto repair shops and dealerships in Central Texas.", images: [`${BASE_URL}/pages/seo-template-resources/about-hero.png`] },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Services for Automotive Companies",
  description: "Websites, inventory management tools, and digital branding for automotive dealerships and repair shops in Central Texas.",
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL, telephone: "+12549002520", address: { "@type": "PostalAddress", addressLocality: "Waco", addressRegion: "TX", addressCountry: "US" } },
  serviceType: "Web Design, Digital Marketing, Custom Software",
  areaServed: { "@type": "State", name: "Texas" },
  url,
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Scott Applications — Automotive Digital Services",
  description: "Websites, inventory management tools, and digital branding for automotive dealerships and repair shops in Central Texas.",
  url,
  provider: { "@type": "LocalBusiness", name: "Scott Applications", url: BASE_URL },
  areaServed: { "@type": "State", name: "Texas" },
  serviceType: ["Automotive Website Design", "Automotive Inventory Software", "Automotive Branding", "Automotive Local SEO"],
};

export default function AutomotiveIndustryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      {children}
    </>
  );
}
