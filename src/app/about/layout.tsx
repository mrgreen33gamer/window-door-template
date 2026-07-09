import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';

export const metadata: Metadata = {
  title: "About ClearView Windows & Doors | Waco TX Since 2012",
  description: "ClearView Windows & Doors is a Waco-owned window and door company founded in 2012 by Daniel Crowe. Factory-certified installers, bonded & insured, 3,500+ installs.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About ClearView Windows & Doors | Waco TX",
    description: "Locally owned since 2012. Factory-certified window and door installers serving Central Texas.",
    url: `${BASE_URL}/about`,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
