import {Movie} from '@/features/movies/types';

export interface MovieService {
  fetchUpcoming: (page?: number) => Promise<Movie[]>;
  fetchPopular: (page?: number) => Promise<Movie[]>;
}
