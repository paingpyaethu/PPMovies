import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  toggleFavorite,
  appendMovies,
  setUpcomingPage,
  setPopularPage,
  setScrollLoading,
} from './movieSlice';
import {
  saveFavoritesToStorage,
  loadFavoritesFromStorage,
  saveMoviesToCache,
  loadMoviesFromCache,
} from '@/utils/storage';
import {RootState} from '@/store';
import {TmdbMovieService} from '@/services/TmdbMovieService';
import {MovieService} from '@/services/MovieService';

const movieService: MovieService = TmdbMovieService;

function* fetchMoviesSaga(): Generator<any, void, any> {
  try {
    const cached = yield call(loadMoviesFromCache);
    if (cached.upcoming.length || cached.popular.length) {
      yield put(fetchMoviesSuccess(cached));
    }

    const upcoming = yield call(movieService.fetchUpcoming);
    const popular = yield call(movieService.fetchPopular);

    const freshData = {upcoming, popular};

    yield put(fetchMoviesSuccess(freshData));
    yield call(saveMoviesToCache, freshData);
  } catch (error: any) {
    console.log('🚀 ~ function*fetchMoviesSaga ~ error:', error);
    yield put(fetchMoviesFailure(error.message || 'Fetch failed'));
  }
}

function* fetchUpcomingPageSaga(): Generator<any, void, any> {
  try {
    yield put(setScrollLoading({type: 'upcoming', loading: true}));
    const page: number = yield select(
      (state: RootState) => state.movies.page.upcoming,
    );
    const results = yield call(() => movieService.fetchUpcoming(page));
    const hasNext = results.length > 0;

    yield put(appendMovies({type: 'upcoming', results, hasNextPage: hasNext}));
    if (hasNext) yield put(setUpcomingPage(page + 1));

    const updatedUpcoming: any[] = yield select(
      (state: RootState) => state.movies.upcoming,
    );
    const cachedPopular: any[] = yield select(
      (state: RootState) => state.movies.popular,
    );
    yield call(saveMoviesToCache, {
      upcoming: updatedUpcoming,
      popular: cachedPopular,
    });
  } catch (e) {
    console.warn('Upcoming pagination failed', e);
  } finally {
    yield put(setScrollLoading({type: 'upcoming', loading: false}));
  }
}

function* fetchPopularPageSaga(): Generator<any, void, any> {
  try {
    yield put(setScrollLoading({type: 'popular', loading: true}));
    const page: number = yield select(
      (state: RootState) => state.movies.page.popular,
    );
    const results = yield call(() => movieService.fetchPopular(page));
    const hasNext = results.length > 0;

    yield put(appendMovies({type: 'popular', results, hasNextPage: hasNext}));
    if (hasNext) {
      yield put(setPopularPage(page + 1));
    }

    const updatedUpcoming: any[] = yield select(
      (state: RootState) => state.movies.upcoming,
    );
    const cachedPopular: any[] = yield select(
      (state: RootState) => state.movies.popular,
    );
    yield call(saveMoviesToCache, {
      upcoming: updatedUpcoming,
      popular: cachedPopular,
    });
  } catch (e) {
    console.warn('Popular pagination failed', e);
  } finally {
    yield put(setScrollLoading({type: 'upcoming', loading: false}));
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
  yield takeLatest('movies/loadNextUpcomingPage', fetchUpcomingPageSaga);
  yield takeLatest('movies/loadNextPopularPage', fetchPopularPageSaga);
  yield call(loadFavoritesOnStartup);
}
