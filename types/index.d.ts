import { JWT } from 'next-auth/jwt';

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

export type Artist = {
  name: string;
  genres?: string[];
  images?: Image[];
  external_urls?: SpotifyUrls;
  followers?: Followers;
  id?: string;
};

type Planet = {
  position: THREE.Vector3;
  artist: Artist;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  images: Image[];
  id: string;
  name: string;
  release_date: string;
};

type LayoutName = 'helix' | 'sphere' | 'table' | 'grid';

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  id: string;
  name: string;
  preview_url: string;
};
