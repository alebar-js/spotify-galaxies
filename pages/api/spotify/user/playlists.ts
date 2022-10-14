import { getUserPlaylists } from '../../../../lib/spotify';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  //@ts-ignore
  const response = await getUserPlaylists(session?.token?.accessToken);

  return res.status(200).json(response.data);
};

export default handler;
