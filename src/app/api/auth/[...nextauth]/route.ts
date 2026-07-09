// src/app/api/auth/[...nextauth]/route.ts
// Thin handler — authOptions config lives in libs/authOptions.ts to avoid circular imports.
import NextAuth from 'next-auth';
import { authOptions } from '&/authOptions';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };
