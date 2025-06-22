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
  page: {
    upcoming: number;
    popular: number;
  };
  hasNextPage: {
    upcoming: boolean;
    popular: boolean;
  };
  scrollLoading: {
    upcoming: boolean;
    popular: boolean;
  };
}
