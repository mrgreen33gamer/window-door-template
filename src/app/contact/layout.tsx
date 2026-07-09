// src/app/contact/layout.tsx
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const url = `${BASE_URL}/contact`;

export const metadata: Metadata = {
  title: 'Contact Arctic Air HVAC | Schedule Service in Waco & Central Texas',
  description:
    'Contact Arctic Air HVAC to schedule AC repair, heating service, or a free estimate. Serving Waco, Hewitt, Killeen, Temple, and all of Central Texas. Call (254) 900-1234.',
  keywords: [
    'contact Arctic Air HVAC',
    'HVAC service Waco TX',
    'schedule AC repair Waco',
    'HVAC estimate Central Texas',
    'Arctic Air contact',
    '254-900-1234',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Contact Arctic Air HVAC | Schedule Service in Waco & Central Texas',
    description:
      'Call, text, or submit a request. Same-day service available. Flat-rate pricing, 1-year warranty, NATE-certified techs.',
    url,
    siteName: 'Arctic Air HVAC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Arctic Air HVAC | Waco & Central Texas',
    description: 'Schedule HVAC service or get a free estimate. Call (254) 900-1234.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
