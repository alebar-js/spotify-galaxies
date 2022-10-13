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
  console.log(response);
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
  console.log('getUserTop', type, refreshToken, timeRange, limit);
  const { access_token } = await getAccessToken(refreshToken);
  let lim = limit as unknown as string;
  const params = new URLSearchParams({});
  timeRange && params.append('time_range', timeRange);
  lim && params.append('limit', lim);
  const queryParams = params.toString();
  console.log('accessToken', access_token);
  return fetch(`${SPOTIFY_API}/me/top/${type}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getArtist = async (refreshToken: string, artistId: string) => {
  console.log('getArtist', refreshToken, artistId);
  const { access_token } = await getAccessToken(refreshToken);
  return fetch(`${SPOTIFY_API}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getArtistRelated = async (
  refreshToken: string,
  artistId: string
) => {
  console.log('getArtistRelated', refreshToken, artistId);
  const { access_token } = await getAccessToken(refreshToken);
  return fetch(`${SPOTIFY_API}/artists/${artistId}/related-artists`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getArtistTop = async (refreshToken: string, artistId: string) => {
  console.log('getArtistTop', refreshToken, artistId);
  const { access_token } = await getAccessToken(refreshToken);
  return fetch(`${SPOTIFY_API}/artists/${artistId}/top-tracks?market=US`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getTrack = async (refreshToken: string, trackId: string) => {
  console.log('getTrack', refreshToken, trackId);
  const { access_token } = await getAccessToken(refreshToken);
  console.log(access_token, trackId);
  return fetch(`${SPOTIFY_API}/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getPlaylist = async (refreshToken: string, playlistId: string) => {
  const { access_token } = await getAccessToken(refreshToken);
  console.log('getPlaylist', access_token, playlistId);
  return fetch(`${SPOTIFY_API}/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
