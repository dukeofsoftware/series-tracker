
export interface Series {
    id: number;
    name: string;
    permalink: string;
    start_date: string;
    end_date: string;
    country: string;
    network: string;
    status: string;
    image_thumbnail_path: string;
        
}

export interface SeriesResponse {
    tv_shows: Series[];
    total: string;
    page: number;
    pages: number;
}
export interface SeriesDetailsResponse {
    id: number;
    name: string;
    permalink: string;
    url: string;
    description: string;
    description_source: string;
    start_date: string;
    end_date: string | null;
    country: string;
    status: string;
    runtime: number;
    network: string;
    youtube_link: string | null;
    image_path: string;
    image_thumbnail_path: string;
    rating: string;
    rating_count: string;
    countdown: string | null;
    genres: string[];
    pictures: string[];
    episodes: Episode[];
  }
  
  interface Episode {
    season: number;
    episode: number;
    name: string;
    air_date: string;
  }