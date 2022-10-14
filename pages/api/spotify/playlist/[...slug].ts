import { access } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth';
import { getSession } from 'next-auth/react';
import { getPlaylist } from '../../../../lib/spotify';

const getPlaylistById = async (
  playlistId: string,
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const response = await getPlaylist(accessToken, playlistId);
  return res.status(200).json(response.data);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const playlistId = slug?.[0];
  const session = await getSession({ req });
  console.log('/API/PLAYLIST');
  console.log('SESSION', session);
  if (!session) return;

  if (!playlistId) return;
  return getPlaylistById(playlistId, req, res, session.token.accessToken);
};

export default handler;
