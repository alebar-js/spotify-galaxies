import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getArtistRelated } from '../../../../lib/spotify';

const relatedArtists = async (
  artistId: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  if (!session) return;

  const accessToken = session.token.accessToken;
  const response = await getArtistRelated(accessToken, artistId);
  const items = await response.json();
  return res.status(200).json({ items });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const artistId = slug?.[0];
  const method = slug?.[1];

  if (!artistId) {
    return;
  }

  switch (method) {
    case 'albums': {
      return;
    }
    case 'related-artists': {
      return relatedArtists(artistId, req, res);
    }
  }
};

export default handler;
