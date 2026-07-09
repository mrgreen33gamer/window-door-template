// src/proxy.ts
// Next.js 16: renamed from middleware.ts → proxy.ts, function renamed middleware → proxy.
// Place this file at src/proxy.ts (same level as src/app/).
// Functionality is identical — protects all /admin/* routes and redirects to /admin/login
// when the NextAuth JWT token is absent or expired.
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function proxy(req) {
    // Token is verified by withAuth — proceed normally
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Always allow the login page itself (no token needed)
        if (pathname.startsWith('/admin/login')) return true;

        // Allow NextAuth API routes
        if (pathname.startsWith('/api/auth')) return true;

        // All other /admin/* routes require a valid JWT token
        if (pathname.startsWith('/admin')) {
          return !!token;
        }

        // All public routes are allowed
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
