import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-secret',
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'demo@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Demo: Accept any valid email/password combination with password > 6 chars
        if (credentials.password.length >= 6) {
          const user = {
            id: credentials.email.replace(/[^a-z0-9]/g, ''),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
          };
          return user;
        }

        throw new Error('Invalid credentials. Password must be at least 6 characters.');
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'skill-radar-secret-key-2026',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message);
    },
  },
};
