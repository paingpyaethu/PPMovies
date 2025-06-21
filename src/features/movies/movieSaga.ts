import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  toggleFavorite,
} from './movieSlice';
import {fetchPopularMovies, fetchUpcomingMovies} from '@/api/client';
import {
  saveFavoritesToStorage,
  loadFavoritesFromStorage,
  saveMoviesToCache,
  loadMoviesFromCache,
} from '@/utils/storage';
import {RootState} from '@/store';

function* fetchMoviesSaga(): Generator<any, void, any> {
  try {
    const cached = yield call(loadMoviesFromCache);
    if (cached.upcoming.length || cached.popular.length) {
      yield put(fetchMoviesSuccess(cached)); // display cached
    }

    const upcomingRes = yield call(fetchUpcomingMovies);
    const popularRes = yield call(fetchPopularMovies);

    const freshData = {
      upcoming: upcomingRes.data.results,
      popular: popularRes.data.results,
    };

    yield put(fetchMoviesSuccess(freshData));
    yield call(saveMoviesToCache, freshData);
  } catch (error: any) {
    console.log('🚀 ~ function*fetchMoviesSaga ~ error:', error);
    yield put(fetchMoviesFailure(error.message || 'Fetch failed'));
  }
}

function* persistFavoritesSaga() {
  const favorites: number[] = yield select(
    (state: RootState) => state.movies.favorites,
  );
  yield call(saveFavoritesToStorage, favorites);
}

function* loadFavoritesOnStartup(): Generator<any, void, any> {
  const favorites = yield call(loadFavoritesFromStorage);
  yield put({type: 'movies/toggleFavoriteBulk', payload: favorites});
}

export function* movieSaga() {
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
  yield takeLatest(toggleFavorite.type, persistFavoritesSaga);
  yield call(loadFavoritesOnStartup);
}
