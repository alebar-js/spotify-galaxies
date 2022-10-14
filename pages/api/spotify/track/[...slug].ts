import { access } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth';
import { getSession } from 'next-auth/react';
import { getTrack } from '../../../../lib/spotify';

const getTrackById = async (
  trackId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const response = await getTrack(accessToken, trackId);

  return res.status(200).json(response.data.items);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const trackId = slug?.[0];
  const session = await getSession({ req });
  console.log('SESSION', session);
  if (!session) return;

  if (!trackId) return;
  return getTrackById(trackId, req, res, session.token.accessToken);
};

export default handler;
