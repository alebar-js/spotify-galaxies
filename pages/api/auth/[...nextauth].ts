import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { JWT, NextAuthOptions, Session, User } from 'next-auth';
import Spotify, { SpotifyProfile } from 'next-auth/providers/spotify';

const options: NextAuthOptions = {
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      profile: (profile: SpotifyProfile) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0].url,
        };
      },
    }),
  ],
  jwt: {
    secret: 'test',
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    session: async ({ token, user, session }) => {
      //@ts-ignore
      session = { ...session, token, ...user };
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
