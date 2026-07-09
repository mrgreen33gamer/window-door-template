// libs/adminAuth.ts
// Helper: call in any admin API route to verify the request has a valid session.
// Usage:
//   const session = await requireAdminSession();
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session;
}

export type AdminSession = Awaited<ReturnType<typeof requireAdminSession>>;
