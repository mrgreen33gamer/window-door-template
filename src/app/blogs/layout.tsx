// src/app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Tips for Waco Businesses",
  description: "Practical advice on web design, software, graphic design, marketing, and growing your business in Waco and Central Texas.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}