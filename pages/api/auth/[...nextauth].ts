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
  debug: true,
  jwt: {
    secret: 'test',
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      console.log('=====JWT CALLBACK=====');
      console.log('token', token);
      console.log('account', account);
      console.log('user', user);
      return token;
    },
    session: async ({ token, user, session }) => {
      console.log('=====SESSION CALLBACK======');
      console.log('token', token);
      console.log('session', session);
      console.log('user', user);
      //@ts-ignore
      session = { ...session, token, ...user };
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
