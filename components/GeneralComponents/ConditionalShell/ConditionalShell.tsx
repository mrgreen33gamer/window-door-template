// components/GeneralComponents/ConditionalShell/ConditionalShell.tsx
// Renders children only when the current path does NOT start with /admin
// Used in the root layout to hide Header + Footer on admin pages.
'use client';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function ConditionalShell({ children }: Props) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
