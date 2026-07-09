// src/app/contact/layout.tsx
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = `${BASE_URL}/contact`;

export const metadata: Metadata = {
  title: 'Contact ClearView Windows & Doors | Schedule Service in Waco & Central Texas',
  description:
    'Contact ClearView Windows & Doors to schedule window and door repair, panel upgrades, or a free estimate. Serving Waco, Hewitt, Killeen, Temple, and all of Central Texas. Call (254) 740-3300.',
  keywords: [
    'contact ClearView Windows & Doors',
    'window and door service Waco TX',
    'schedule window and door repair Waco',
    'window and door estimate Central Texas',
    'ClearView contact',
    '254-740-3300',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Contact ClearView Windows & Doors | Schedule Service in Waco & Central Texas',
    description:
      'Call, text, or submit a request. Same-day service available. Flat-rate pricing, 10-Year Installation Warranty, factory-certified installers.',
    url,
    siteName: 'ClearView Windows & Doors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ClearView Windows & Doors | Waco & Central Texas',
    description: 'Schedule window and door service or get a free estimate. Call (254) 740-3300.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
