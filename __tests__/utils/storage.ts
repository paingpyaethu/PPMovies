import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveFavoritesToStorage,
  loadFavoritesFromStorage,
  saveMoviesToCache,
  loadMoviesFromCache,
} from '@/utils/storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('storage utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('saves favorites to AsyncStorage', async () => {
    const favorites = [1, 2, 3];
    await saveFavoritesToStorage(favorites);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'FAVORITES',
      JSON.stringify(favorites),
    );
  });

  it('loads favorites from AsyncStorage', async () => {
    const mockData = [10, 20];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockData),
    );

    const result = await loadFavoritesFromStorage();
    expect(result).toEqual(mockData);
  });

  it('loads empty favorites if no value exists', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const result = await loadFavoritesFromStorage();
    expect(result).toEqual([]);
  });

  it('saves movies to cache', async () => {
    const data = {upcoming: [{id: 1}], popular: [{id: 2}]};
    await saveMoviesToCache(data);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MOVIE_CACHE',
      JSON.stringify(data),
    );
  });

  it('loads movies from cache', async () => {
    const mockData = {upcoming: [{id: 1}], popular: [{id: 2}]};
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockData),
    );

    const result = await loadMoviesFromCache();
    expect(result).toEqual(mockData);
  });

  it('returns default cache structure if cache is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const result = await loadMoviesFromCache();
    expect(result).toEqual({upcoming: [], popular: []});
  });
});
