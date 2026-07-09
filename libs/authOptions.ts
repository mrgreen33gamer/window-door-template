// libs/authOptions.ts
// ─────────────────────────────────────────────────────────────────────────────
// Shared NextAuth config. Defined here (not in the route file) so it can be
// imported by both the [...nextauth] route AND adminAuth.ts without circular deps.
// ─────────────────────────────────────────────────────────────────────────────
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDB } from './mongodb';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const db   = await MongoDB.getDb();
          const user = await db.collection('AdminUsers').findOne({
            email: credentials.email.toLowerCase().trim(),
          });

          if (!user) return null;

          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;

          // Update lastLoginAt non-blocking
          db.collection('AdminUsers').updateOne(
            { _id: user._id },
            { $set: { lastLoginAt: new Date() } },
          ).catch(() => {});

          return {
            id:    user._id.toString(),
            email: user.email,
            name:  user.name,
          };
        } catch (err) {
          console.error('[NextAuth] authorize error:', err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge:   24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/admin/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
