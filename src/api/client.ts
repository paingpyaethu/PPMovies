import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.TMDB_API_KEY;
const BASE_URL = Config.TMDB_BASE_URL;

export const fetchUpcomingMovies = async () => {
  return axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {api_key: API_KEY},
  });
};

export const fetchPopularMovies = async () => {
  return axios.get(`${BASE_URL}/movie/popular`, {
    params: {api_key: API_KEY},
  });
};
