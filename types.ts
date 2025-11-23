export interface NasaImageLink {
  href: string;
  rel: string;
  render?: string;
}

export interface NasaImageData {
  center: string;
  title: string;
  nasa_id: string;
  date_created: string;
  keywords?: string[];
  media_type: string;
  description_508?: string;
  secondary_creator?: string;
  description?: string;
}

export interface NasaItem {
  href: string;
  data: NasaImageData[];
  links?: NasaImageLink[];
}

export interface NasaCollection {
  version: string;
  href: string;
  items: NasaItem[];
  metadata: {
    total_hits: number;
  };
}

export interface NasaApiResponse {
  collection: NasaCollection;
}

export interface Artifact {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  keywords: string[];
  type: 'archive' | 'news';
  sourceUrl?: string;
}

export type CollectionType = 'lost_missions' | 'ancient_light' | 'planetary_ghosts' | 'human_debris' | 'search' | 'news';

export interface MuseumCollection {
  id: CollectionType;
  label: string;
  query: string;
  description: string;
}