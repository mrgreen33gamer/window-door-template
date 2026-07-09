import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/industries/property-management';

export const metadata: Metadata = {
  title: "Windows & Doors for Property Management | ClearView Windows & Doors",
  description: "Multi-unit window and door repair and replacement for property managers in Waco and Central Texas.",
  alternates: { canonical: url },
  openGraph: {
    title: "Windows & Doors for Property Management | ClearView Windows & Doors",
    description: "Multi-unit window and door repair and replacement for property managers in Waco and Central Texas.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
