// src/app/service-areas/layout.tsx
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/service-areas`;

export const metadata: Metadata = {
  title: 'HVAC Service Areas | Waco, Hewitt, Killeen, Temple & Central Texas | Arctic Air',
  description:
    'Arctic Air HVAC serves Waco, Hewitt, Woodway, Robinson, China Spring, Killeen, Temple, Valley Mills, Hillsboro, and all of Central Texas. Flat-rate pricing, same-day service, 1-year warranty.',
  keywords: [
    'HVAC service areas Central Texas',
    'HVAC Waco TX',
    'HVAC Hewitt TX',
    'HVAC Killeen TX',
    'HVAC Temple TX',
    'AC repair Central Texas',
    'heating repair Waco',
    'Arctic Air HVAC service areas',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'HVAC Service Areas | Arctic Air HVAC — Central Texas',
    description:
      'Serving Waco and all of Central Texas with flat-rate HVAC repair, installation, and maintenance. Same-day service available.',
    url,
    siteName: 'Arctic Air HVAC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Service Areas | Arctic Air HVAC — Central Texas',
    description: 'Serving Waco and all of Central Texas. Flat-rate pricing, same-day service, 1-year warranty.',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  name: 'Arctic Air HVAC',
  url: BASE_URL,
  telephone: '+12549001234',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4521 Bosque Blvd',
    addressLocality: 'Waco',
    addressRegion: 'TX',
    postalCode: '76710',
    addressCountry: 'US',
  },
  areaServed: [
    'Waco, TX', 'Hewitt, TX', 'Woodway, TX', 'Robinson, TX',
    'China Spring, TX', 'Killeen, TX', 'Temple, TX', 'Valley Mills, TX', 'Hillsboro, TX',
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '14:00' },
  ],
  priceRange: '$$',
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  );
}
