import { ExternalUrls, Image } from "./commonType";

export interface SimplifiedArtist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface Artist extends SimplifiedArtist {
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  images?: Image[];
  popularity?: number;
}
