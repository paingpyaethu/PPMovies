import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesState, Movie} from './types';

const initialState: MoviesState = {
  upcoming: [],
  popular: [],
  favorites: [],
  loading: true,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(
      state,
      action: PayloadAction<{upcoming: Movie[]; popular: Movie[]}>,
    ) {
      state.loading = false;
      state.upcoming = action.payload.upcoming;
      state.popular = action.payload.popular;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    toggleFavoriteBulk(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload;
    },
  },
});

export const {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  toggleFavorite,
} = movieSlice.actions;

export default movieSlice.reducer;
