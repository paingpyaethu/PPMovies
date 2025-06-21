export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface MoviesState {
  upcoming: Movie[];
  popular: Movie[];
  favorites: number[];
  loading: boolean;
  error: string | null;
}
