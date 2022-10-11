import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  getArtist,
  getArtistRelated,
  getArtistTop,
  getTrack,
} from '../../../../lib/spotify';

const relatedArtists = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const response = await getArtistRelated(accessToken, artistId);
  console.log(response);
  const items = await response.json();
  return res.status(200).json({ items });
};

const artistTopTracks = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const items = await (await getArtistTop(accessToken, artistId)).json();
  return res.status(200).json({ items });
};

const artistRandomTopTrack = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const items = await (await getArtistTop(accessToken, artistId)).json();
  let response = items.tracks?.[0];
  return res.status(200).json({ track: response });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const artistId = slug?.[0];
  const method = slug?.[1];
  const session = await getSession({ req });
  if (!session) return;
  if (!artistId) {
    return;
  }

  switch (method) {
    case 'albums': {
      return;
    }
    case 'top-tracks': {
      return artistTopTracks(artistId, req, res, session.token.accessToken);
    }
    case 'related-artists': {
      return relatedArtists(artistId, req, res, session.token.accessToken);
    }
    case 'random-top-track': {
      return artistRandomTopTrack(
        artistId,
        req,
        res,
        session.token.accessToken
      );
    }
  }
};

export default handler;
