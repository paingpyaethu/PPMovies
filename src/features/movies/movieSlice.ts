import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesState, Movie} from './types';

const initialState: MoviesState = {
  upcoming: [],
  popular: [],
  favorites: [],
  loading: true,
  error: null,
  page: {
    upcoming: 1,
    popular: 1,
  },
  hasNextPage: {
    upcoming: true,
    popular: true,
  },
  scrollLoading: {
    upcoming: false,
    popular: false,
  },
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
    setUpcomingPage(state, action: PayloadAction<number>) {
      state.page.upcoming = action.payload;
    },
    setPopularPage(state, action: PayloadAction<number>) {
      state.page.popular = action.payload;
    },
    appendMovies(
      state,
      action: PayloadAction<{
        type: 'popular' | 'upcoming';
        results: Movie[];
        hasNextPage: boolean;
      }>,
    ) {
      const {type, results, hasNextPage} = action.payload;
      if (type === 'upcoming') {
        state.upcoming = [...state.upcoming, ...results];
        state.hasNextPage.upcoming = hasNextPage;
      } else {
        state.popular = [...state.popular, ...results];
        state.hasNextPage.popular = hasNextPage;
      }
    },
    setScrollLoading(
      state,
      action: PayloadAction<{type: 'upcoming' | 'popular'; loading: boolean}>,
    ) {
      state.scrollLoading[action.payload.type] = action.payload.loading;
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
  setUpcomingPage,
  setPopularPage,
  appendMovies,
  setScrollLoading,
  toggleFavoriteBulk,
  toggleFavorite,
} = movieSlice.actions;

export default movieSlice.reducer;
