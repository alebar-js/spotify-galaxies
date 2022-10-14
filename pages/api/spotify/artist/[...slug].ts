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
  return res.status(200).json(response.data.items);
};

const artistTopTracks = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const response = await getArtistTop(accessToken, artistId);

  return res.status(200).json(response.data.items);
};

const artistRandomTopTrack = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const items = await getArtistTop(accessToken, artistId);
  return res
    .status(200)
    .json(
      items.data.tracks[Math.floor(Math.random() * items.data.tracks.length)]
    );
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
