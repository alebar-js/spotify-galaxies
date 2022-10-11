import { JWT } from 'next-auth/jwt';
import { SpotifyProfile } from 'next-auth/providers/spotify';

declare module 'next-auth/client' {
  export interface Session {
    token: JWT;
  }
}

type SpotifyUrls = {
  spotify: string;
};

type Followers = {
  href: string;
  total: number;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyAPIResponse<T> = {
  items: Array<T>;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  id: string;
  name: string;
  preview_url: string;
};

export type PlaylistItem = {
  added_at: string;
  added_by: SpotifyProfile;
  is_local: boolean;
  track: Track;
};
export type Artist = {
  name: string;
  genres?: string[];
  images: Image[];
  external_urls?: SpotifyUrls;
  followers?: Followers;
  id?: string;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  images: Image[];
  id: string;
  name: string;
  release_date: string;
};

type Planet = {
  position: THREE.Vector3;
  artist: Artist;
};

type LayoutName = 'helix' | 'sphere' | 'table' | 'grid';

// @react-three/fiber
type FontData = {
  boundingBox: {
    yMax: number;
    yMin: number;
  };
  familyName: string;
  glyphs: {
    [k: string]: Glyph;
  };
  resolution: number;
  underlineThickness: number;
};

type Glyph = {
  _cachedOutline: string[];
  ha: number;
  o: string;
};
