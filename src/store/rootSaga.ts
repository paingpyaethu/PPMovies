import {all} from 'redux-saga/effects';
import {movieSaga} from '@/features/movies/movieSaga';

export function* rootSaga() {
  yield all([movieSaga()]);
}
