import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITES';
const MOVIE_CACHE_KEY = 'MOVIE_CACHE';

export const saveFavoritesToStorage = async (favorites: number[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.log('🚀 ~ Error SaveFavoritesToStorage ~ e:', e);
  }
};

export const loadFavoritesFromStorage = async (): Promise<number[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};

export const saveMoviesToCache = async (data: {
  upcoming: any[];
  popular: any[];
}) => {
  try {
    await AsyncStorage.setItem(MOVIE_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.log('🚀 ~ Error saveMoviesToCache ~ e:', e);
  }
};

export const loadMoviesFromCache = async (): Promise<{
  upcoming: any[];
  popular: any[];
}> => {
  try {
    const json = await AsyncStorage.getItem(MOVIE_CACHE_KEY);
    return json ? JSON.parse(json) : {upcoming: [], popular: []};
  } catch {
    return {upcoming: [], popular: []};
  }
};
