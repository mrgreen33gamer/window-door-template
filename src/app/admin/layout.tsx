// src/app/admin/layout.tsx
// Shared shell for all /admin/* pages except /admin/login.
// SessionProvider wraps everything so useSession() works in client components.
import type { Metadata } from 'next';
import AdminSessionProvider from './AdminSessionProvider';

export const metadata: Metadata = {
  title:  'Admin — Scott Applications',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // NOTE: Individual admin pages call getServerSession() directly for data protection.
  // The middleware.ts at project root handles redirect-to-login for all /admin/* routes
  // EXCEPT /admin/login itself (middleware matcher excludes it automatically via next-auth).
  return (
    <AdminSessionProvider>
      {children}
    </AdminSessionProvider>
  );
}
