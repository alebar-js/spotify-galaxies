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
