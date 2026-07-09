import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = `${BASE_URL}/service-areas`;

export const metadata: Metadata = {
  title: 'Window & Door Service Areas | Waco, Hewitt, Killeen, Temple & Central Texas | ClearView',
  description:
    'ClearView Windows & Doors serves Waco, Hewitt, Woodway, McGregor, China Spring, Bellmead, Killeen, Temple, and all of Central Texas. Flat-rate pricing, same-day service, 2-Year Workmanship Warranty.',
  keywords: [
    'window and door service areas Central Texas',
    'electrician Waco TX',
    'electrician Hewitt TX',
    'electrician Killeen TX',
    'electrician Temple TX',
    'ClearView Windows & Doors service areas',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Window & Door Service Areas | ClearView Windows & Doors — Central Texas',
    description:
      'Serving Waco and all of Central Texas with flat-rate window and door repair, panel upgrades, and installation. Same-day service available.',
    url,
    siteName: 'ClearView Windows & Doors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Window & Door Service Areas | ClearView Windows & Doors — Central Texas',
    description: 'Waco, Temple, Killeen, and surrounding Central Texas — factory-certified window and door service.',
  },
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
