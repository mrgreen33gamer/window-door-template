import type { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/blogs/choosing-entry-door-curb-appeal';
export const metadata: Metadata = {
  title: "Choosing an Entry Door for Curb Appeal | ClearView",
  description: "Material, glass, hardware, and weather sealing — a practical guide to entry doors for Central Texas homes.",
  alternates: { canonical: url },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
