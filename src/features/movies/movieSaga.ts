import {call, put, takeLatest} from 'redux-saga/effects';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from './movieSlice';
import {Movie} from './types';
import {fetchPopularMovies, fetchUpcomingMovies} from '@/api/client';

function* fetchMoviesSaga(): Generator<any, void, any> {
  try {
    const upcomingRes = yield call(fetchUpcomingMovies);
    const popularRes = yield call(fetchPopularMovies);

    yield put(
      fetchMoviesSuccess({
        upcoming: upcomingRes.data.results,
        popular: popularRes.data.results,
      }),
    );

    yield put(
      fetchMoviesSuccess({
        upcoming: upcomingRes.data.results as Movie[],
        popular: popularRes.data.results as Movie[],
      }),
    );
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message || 'Failed to load movies'));
  }
}

export function* movieSaga() {
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
}
