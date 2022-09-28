import { SpotifyImage, SpotifyProfile } from 'next-auth/providers/spotify';
import { NextRequest, NextResponse } from 'next/server';
import SPOTIFY_API from '../../../util/apiConstants';
import { getToken } from 'next-auth/jwt';

// will only retrieve currently logged in user, no id needed
export const getUser = async (req: NextRequest, res: NextResponse) => {
  let token;
  getToken({ req, raw: true }).then((tok) => (token = tok));
  console.log(token);
  fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    console.log(data);
  });
  return res.json();
};

const handler = (req: NextRequest, res: NextResponse) => {
  return getUser(req, res);
};

export default handler;
