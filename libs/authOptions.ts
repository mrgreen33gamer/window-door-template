// libs/authOptions.ts
// Shared NextAuth config — real AdminUsers + global demo credentials for templates.
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDB } from './mongodb';
import bcrypt from 'bcryptjs';
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_ID,
  DEMO_ADMIN_NAME,
  isDemoCredentials,
} from './demoAuth';

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

        // ── Demo preview (no DB write; sample data only) ─────────────────────
        if (isDemoCredentials(credentials.email, credentials.password)) {
          return {
            id:     DEMO_ADMIN_ID,
            email:  DEMO_ADMIN_EMAIL,
            name:   DEMO_ADMIN_NAME,
            isDemo: true,
          } as any;
        }

        try {
          const db   = await MongoDB.getDb();
          const user = await db.collection('AdminUsers').findOne({
            email: credentials.email.toLowerCase().trim(),
          });

          if (!user) return null;

          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;

          db.collection('AdminUsers').updateOne(
            { _id: user._id },
            { $set: { lastLoginAt: new Date() } },
          ).catch(() => {});

          return {
            id:     user._id.toString(),
            email:  user.email,
            name:   user.name,
            isDemo: false,
          } as any;
        } catch (err) {
          console.error('[NextAuth] authorize error:', err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge:   24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/admin/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id     = user.id;
        token.isDemo = (user as any).isDemo === true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id     = token.id;
        (session.user as any).isDemo = token.isDemo === true;
      }
      return session;
    },
  },
};
