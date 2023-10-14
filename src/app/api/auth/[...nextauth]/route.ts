import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { login, refresh, registerViaGoogle, whoAmI } from '../auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1296000,
  },
  pages: {
    signIn: 'auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      switch (account?.provider) {
        case 'google':
          const registerResponse = await registerViaGoogle(
            account.id_token as string,
            { viaGoogle: true, email: user.email as string }
          );

          console.log(registerResponse);

          if (!registerResponse) {
            return '/unauthorized';
          }

          const loginResponse = await login({ email: registerResponse.email });

          console.log(loginResponse);

          if (!loginResponse) {
            return '/unauthorized';
          }

          account.access_token = loginResponse.accessToken;
          account.expires_at = loginResponse.exp;
          account.refresh_token = loginResponse.refreshToken;

          return true;

        default:
          return '/unknownProvider';
      }
    },

    async jwt({ account, token, user }) {
      if (account) {
        return {
          access_token: account.access_token,
          picture: user.image,
          expires_at: Math.floor(
            Date.now() / 1000 + (account.expires_at as number)
          ),
          refresh_token: account.refresh_token,
        } as JWT;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await refresh(token.refresh_token);

          if (!response) {
            throw response;
          }

          return {
            ...token,
            access_token: response.accessToken,
            refresh_token: response.refreshToken ?? token.refresh_token,
            expires_at: response.exp,
          };
        } catch (error) {
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },

    async session({ session, token }) {
      const company = await whoAmI(token.access_token);

      if (company) {
        session.user = {
          ...company,
          accessToken: token.access_token,
          image: company.image as string | null,
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
