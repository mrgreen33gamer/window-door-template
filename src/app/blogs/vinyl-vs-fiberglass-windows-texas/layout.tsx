import type { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.clearviewwindowsdoors.com';
const url = BASE_URL + '/blogs/vinyl-vs-fiberglass-windows-texas';
export const metadata: Metadata = {
  title: "Vinyl vs Fiberglass Windows in Texas | ClearView",
  description: "Honest comparison of vinyl and fiberglass window frames for Central Texas heat, storms, and energy bills.",
  alternates: { canonical: url },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
