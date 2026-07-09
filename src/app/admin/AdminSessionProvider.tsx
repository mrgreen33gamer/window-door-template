// src/app/admin/AdminSessionProvider.tsx
// Thin client wrapper — NextAuth's SessionProvider needs 'use client'.
// Imported by the server component admin layout.
'use client';
import { SessionProvider } from 'next-auth/react';

export default function AdminSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
