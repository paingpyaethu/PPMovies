import axios from 'axios';

const API_KEY = 'a3453eb7bb98bd3d358994d3d1f85040';
const BASE_URL = 'https://api.themoviedb.org/3';

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
