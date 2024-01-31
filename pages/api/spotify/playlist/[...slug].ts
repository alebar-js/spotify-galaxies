import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getPlaylist } from '../../../../lib/spotify';

const getPlaylistById = async (
  playlistId: string,
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
  return getPlaylistById(playlistId, res, session.token.accessToken);
};

export default handler;
