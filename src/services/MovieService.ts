import {Movie} from '@/features/movies/types';

export interface MovieService {
  fetchUpcoming: () => Promise<Movie[]>;
  fetchPopular: () => Promise<Movie[]>;
}
