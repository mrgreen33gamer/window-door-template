import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';

export const metadata: Metadata = {
  title: "Window & Door Services Waco TX | Replacement, Repair & Upgrades",
  description: "Window replacement, entry doors, patio doors, storm windows, repairs, and energy upgrades in Waco and Central Texas. Factory-certified installers, free measurements.",
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: "Window & Door Services | ClearView Windows & Doors",
    description: "Full window and door services for Central Texas homes and businesses.",
    url: `${BASE_URL}/services`,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
