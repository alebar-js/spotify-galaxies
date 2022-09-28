const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const SPOTIFY_API = 'https://api.spotify.com/v1';
const TOKEN_API = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async (refreshToken: string) => {
  const response = await fetch(TOKEN_API, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  return response.json();
};

export const getUser = async (refreshToken: string) => {
  console.log('getUser');
  const { accessToken } = await getAccessToken(refreshToken);
  console.log(accessToken);
  return fetch(`${SPOTIFY_API}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUserPlaylists = async (refreshToken: string) => {
  console.log('getPlaylists');
  const auth = await getAccessToken(refreshToken);
  const accessToken = auth.access_token;
  return fetch(`${SPOTIFY_API}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUserTopItems = async (
  refreshToken: string,
  type: 'artists' | 'tracks',
  timeRange: 'short_term' | 'medium_term' | 'long_term' | '',
  limit: number
) => {
  const { access_token } = await getAccessToken(refreshToken);
  let lim = limit as unknown as string;
  const params = new URLSearchParams({});
  timeRange && params.append('time_range', timeRange);
  lim && params.append('limit', lim);
  const queryParams = params.toString();
  return fetch(`${SPOTIFY_API}/me/top/${type}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
