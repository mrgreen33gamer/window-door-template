// libs/demoAuth.ts
// Global template demo credentials — always work, never touch real production data.
// Shown on /admin/login so marketplace buyers can preview the dashboard.

export const DEMO_ADMIN_EMAIL    = 'demo@template.local';
export const DEMO_ADMIN_PASSWORD = 'demo123456';
export const DEMO_ADMIN_NAME     = 'Demo Preview';
export const DEMO_ADMIN_ID       = 'demo-user';

export function isDemoCredentials(email: string, password: string): boolean {
  return (
    email.toLowerCase().trim() === DEMO_ADMIN_EMAIL &&
    password === DEMO_ADMIN_PASSWORD
  );
}

export function isDemoSessionUser(user: { email?: string | null; id?: string } | null | undefined): boolean {
  if (!user) return false;
  if ((user as { isDemo?: boolean }).isDemo === true) return true;
  if (user.id === DEMO_ADMIN_ID) return true;
  if ((user.email ?? '').toLowerCase() === DEMO_ADMIN_EMAIL) return true;
  return false;
}
