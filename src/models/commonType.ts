export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface ExplicitContents {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Owner {
  display_name?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  url?: string;
}
