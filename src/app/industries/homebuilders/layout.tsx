import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/industries/homebuilders';

export const metadata: Metadata = {
  title: "Windows & Doors for Homebuilders | ClearView Windows & Doors",
  description: "Builder-ready window and door packages for new construction and specs in Waco and Central Texas.",
  alternates: { canonical: url },
  openGraph: {
    title: "Windows & Doors for Homebuilders | ClearView Windows & Doors",
    description: "Builder-ready window and door packages for new construction and specs in Waco and Central Texas.",
    url,
    siteName: "ClearView Windows & Doors",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
