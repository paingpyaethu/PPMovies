import Config from 'react-native-config';
import axios from 'axios';
import {MovieService} from './MovieService';

const BASE_URL = Config.TMDB_BASE_URL;
const API_KEY = Config.TMDB_API_KEY;

export const TmdbMovieService: MovieService = {
  fetchUpcoming: async () => {
    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {api_key: API_KEY},
    });
    return res.data.results;
  },
  fetchPopular: async () => {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {api_key: API_KEY},
    });
    return res.data.results;
  },
};
