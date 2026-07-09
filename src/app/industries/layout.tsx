import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';

export const metadata: Metadata = {
  title: "Industries We Serve | Homebuilders, Property Management & Storefronts",
  description: "ClearView Windows & Doors serves homebuilders, property management companies, and commercial storefronts across Central Texas with factory-certified window and door installs.",
  alternates: { canonical: `${BASE_URL}/industries` },
  openGraph: {
    title: "Industries We Serve | ClearView Windows & Doors",
    description: "Window and door programs for builders, property managers, and commercial storefronts.",
    url: `${BASE_URL}/industries`,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
