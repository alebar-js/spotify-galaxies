import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getUserTopItems } from '../../../../lib/spotify';
import { SpotifyAPIResponse } from '../../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  var { timeRange, limit, type } = req.query;

  timeRange = Array.isArray(timeRange) ? timeRange[0] : timeRange;
  timeRange = timeRange || '';
  type = Array.isArray(type) ? type[0] : type;
  type = type || '';
  limit = Array.isArray(limit) ? limit[0] : limit;
  let lim = Number(limit) || 50;

  const accessToken = session?.token?.accessToken;

  //@ts-ignore
  const response: SpotifyAPIResponse = await getUserTopItems(
    accessToken!,
    type,
    timeRange,
    lim
  );
  return res.json(response.data.items);
};

export default handler;
