// libs/adminAuth.ts
// Helper: call in any admin API route to verify the request has a valid session.
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import { isDemoSessionUser } from './demoAuth';

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session;
}

/** True when the signed-in user is the global template demo account. */
export function sessionIsDemo(session: Awaited<ReturnType<typeof requireAdminSession>>): boolean {
  if (!session?.user) return false;
  return isDemoSessionUser(session.user as any);
}

export type AdminSession = Awaited<ReturnType<typeof requireAdminSession>>;
