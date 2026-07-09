import type { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/blogs/when-to-replace-windows-energy-bills';
export const metadata: Metadata = {
  title: "When to Replace Windows for High Energy Bills | ClearView",
  description: "Learn when high cooling bills point to failing windows — and which openings to replace first in Central Texas.",
  alternates: { canonical: url },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
