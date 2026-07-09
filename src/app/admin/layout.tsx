// src/app/admin/layout.tsx
// Shared shell for all /admin/* pages.
// SessionProvider + theme root so useSession / useAdminTheme work everywhere.
import type { Metadata } from 'next';
import AdminSessionProvider from './AdminSessionProvider';
import AdminThemeProvider from './AdminThemeProvider';

export const metadata: Metadata = {
  title:  'Admin — window door',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSessionProvider>
      <AdminThemeProvider>
        {children}
      </AdminThemeProvider>
    </AdminSessionProvider>
  );
}
