export class Movie {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    id: number;
    title: string;
    poster_path: string;
    homepage: string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    popularity: number;
    overview: string;
    genre_ids: Array<number>;
    genres: string;
    revenue: number;
    spoken_languages: Array<string>;
    status: string;
    tagline: string;
    video: boolean;
}

export class Results {
    results: Array<Movie>;
    page: number;
    total_results: number;
}
