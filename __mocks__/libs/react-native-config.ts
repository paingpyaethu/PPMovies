jest.mock('react-native-config', () => ({
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY: 'dummy_api_key',
}));
