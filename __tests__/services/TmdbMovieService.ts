import axios from 'axios';
import {TmdbMovieService} from '@/services/TmdbMovieService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TmdbMovieService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchUpcoming should return movie list from API', async () => {
    const mockData = {data: {results: [{id: 1}, {id: 2}]}};
    mockedAxios.get.mockResolvedValueOnce(mockData);

    const result = await TmdbMovieService.fetchUpcoming(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/upcoming',
      {
        params: {api_key: 'dummy_api_key', page: 1},
      },
    );
    expect(result).toEqual(mockData.data.results);
  });

  it('fetchPopular should return movie list from API', async () => {
    const mockData = {data: {results: [{id: 3}, {id: 4}]}};
    mockedAxios.get.mockResolvedValueOnce(mockData);

    const result = await TmdbMovieService.fetchPopular(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {api_key: 'dummy_api_key', page: 2},
      },
    );
    expect(result).toEqual(mockData.data.results);
  });
});
