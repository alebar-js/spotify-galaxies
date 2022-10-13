import { url } from 'inspector';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getUserTopItems } from '../../../../lib/spotify';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { timeRange, limit, type } = req.query;

  const accessToken = session?.token?.accessToken;

  //@ts-ignore
  const response = await getUserTopItems(accessToken, type, timeRange, limit);
  console.log(response);
  const { items } = await response.json();
  console.log(items);
  return res.status(200).json({ items });
};

export default handler;
