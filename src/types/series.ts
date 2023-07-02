
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