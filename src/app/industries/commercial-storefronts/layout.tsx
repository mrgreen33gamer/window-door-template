import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/industries/commercial-storefronts';

export const metadata: Metadata = {
  title: "Commercial Storefront Windows & Doors | ClearView Windows & Doors",
  description: "Storefront glass, entry systems, and commercial door installs for Central Texas retail and offices.",
  alternates: { canonical: url },
  openGraph: {
    title: "Commercial Storefront Windows & Doors | ClearView Windows & Doors",
    description: "Storefront glass, entry systems, and commercial door installs for Central Texas retail and offices.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
